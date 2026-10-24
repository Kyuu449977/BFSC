from contextlib import closing
import importlib.util
import os
from pathlib import Path
import sqlite3
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import backend.places_budget as budget
import backend.places_service as places

class BudgetTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.path = Path(self.directory.name) / 'usage.sqlite3'
        self.now = 2000000000

    def test_daily_limit_survives_new_module_and_concurrent_calls(self):
        def reserve(_):
            try:
                budget.reserve_request(self.path, self.now)
                return True
            except budget.BudgetBlocked:
                return False
        with ThreadPoolExecutor(max_workers=10) as executor:
            accepted = list(executor.map(reserve, range(40)))
        self.assertEqual(sum(accepted),25)
        spec = importlib.util.spec_from_file_location('restarted_budget', Path(budget.__file__))
        fresh = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(fresh)
        with self.assertRaises(fresh.BudgetBlocked) as error:
            fresh.reserve_request(self.path,self.now)
        self.assertEqual(error.exception.code,'DAILY_LIMIT')
        self.assertEqual(fresh.reserve_request(self.path,self.now+86401)['remaining24Hours'],24)

    def test_window_cap_and_expiry(self):
        budget.reserve_request(self.path,self.now-90000)
        with closing(sqlite3.connect(self.path)) as connection:
            connection.executemany('INSERT INTO attempts VALUES (?)', [(self.now-90000,)]*899)
            connection.commit()
        with self.assertRaises(budget.BudgetBlocked) as error:
            budget.reserve_request(self.path,self.now)
        self.assertEqual(error.exception.code,'WINDOW_LIMIT')
        result = budget.reserve_request(self.path,self.now+budget.WINDOW_SECONDS)
        self.assertEqual(result['remaining35Days'],899)

    def test_storage_failure_and_serverless_block(self):
        self.path.write_bytes(b'broken database')
        with self.assertRaises(budget.BudgetBlocked) as error:
            budget.reserve_request(self.path,self.now)
        self.assertEqual(error.exception.code,'BUDGET_UNAVAILABLE')
        with patch.dict(os.environ,{'VERCEL':'1'}), self.assertRaises(budget.BudgetBlocked) as error:
            budget.reserve_request(self.path,self.now)
        self.assertEqual(error.exception.code,'BUDGET_STORAGE_REQUIRED')

    def test_no_google_call_after_budget_denied(self):
        payload={'dishId':next(iter(places.DISHES)),'latitude':10.77,'longitude':106.69}
        with patch.dict(os.environ,{'GOOGLE_PLACES_API_KEY':'test-only'}), patch.object(places,'reserve_request',side_effect=budget.BudgetBlocked('DAILY_LIMIT','Hết lượt')), patch.object(places,'google_search') as upstream:
            with self.assertRaises(places.PlacesError) as error:
                places.search_places(payload)
            self.assertEqual(error.exception.status,429)
            upstream.assert_not_called()

    def test_failed_upstream_still_consumes_reserved_attempt(self):
        payload={'dishId':next(iter(places.DISHES)),'latitude':10.77,'longitude':106.69}
        with patch.dict(os.environ,{'GOOGLE_PLACES_API_KEY':'test-only'}), patch.object(places,'reserve_request',side_effect=lambda:budget.reserve_request(self.path,self.now)), patch.object(places,'google_search',side_effect=places.PlacesError('PROVIDER_ERROR','test',502)):
            with self.assertRaises(places.PlacesError):
                places.search_places(payload)
        with closing(sqlite3.connect(self.path)) as connection:
            self.assertEqual(connection.execute('SELECT COUNT(*) FROM attempts').fetchone()[0],1)

if __name__ == '__main__':
    unittest.main()
