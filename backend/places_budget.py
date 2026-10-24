"""Durable, atomic reservations before any paid Places request.

Only attempt timestamps are stored; no Google content, coordinates or API keys.
"""
import os
from pathlib import Path
import sqlite3
import time

DAILY_LIMIT = 25
WINDOW_LIMIT = 900
DAY_SECONDS = 24 * 60 * 60
WINDOW_SECONDS = 35 * DAY_SECONDS


class BudgetBlocked(Exception):
    def __init__(self, code, message):
        super().__init__(message)
        self.code = code
        self.message = message


def reserve_request(db_path=None, now=None):
    # Ephemeral serverless files cannot enforce a shared durable budget.
    if os.environ.get('VERCEL') or os.environ.get('AWS_LAMBDA_FUNCTION_NAME'):
        raise BudgetBlocked('BUDGET_STORAGE_REQUIRED', 'Tìm quán tạm dừng vì chưa có bộ đếm hạn mức bền vững. Bạn vẫn có thể mở Google Maps.')
    target = Path(db_path) if db_path is not None else Path(__file__).resolve().parents[1] / '.private' / 'places-usage.sqlite3'
    stamp = time.time() if now is None else now
    connection = None
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(str(target), timeout=5, isolation_level=None)
        connection.execute('BEGIN IMMEDIATE')
        connection.execute('CREATE TABLE IF NOT EXISTS attempts (created_at REAL NOT NULL)')
        connection.execute('CREATE INDEX IF NOT EXISTS attempts_by_time ON attempts(created_at)')
        connection.execute('DELETE FROM attempts WHERE created_at <= ?', (stamp - WINDOW_SECONDS,))
        total = connection.execute('SELECT COUNT(*) FROM attempts').fetchone()[0]
        daily = connection.execute('SELECT COUNT(*) FROM attempts WHERE created_at > ?', (stamp - DAY_SECONDS,)).fetchone()[0]
        if daily >= DAILY_LIMIT:
            raise BudgetBlocked('DAILY_LIMIT', 'Đã đạt 25 lượt tìm quán trong 24 giờ gần nhất. Web đã ngừng gọi API; bạn vẫn có thể mở Google Maps.')
        if total >= WINDOW_LIMIT:
            raise BudgetBlocked('WINDOW_LIMIT', 'Đã đạt hạn mức 900 lượt trong 35 ngày gần nhất. Web đã ngừng gọi API; bạn vẫn có thể mở Google Maps.')
        connection.execute('INSERT INTO attempts(created_at) VALUES (?)', (stamp,))
        connection.commit()
        return {'remaining24Hours': DAILY_LIMIT - daily - 1, 'remaining35Days': WINDOW_LIMIT - total - 1}
    except (sqlite3.Error, OSError):
        raise BudgetBlocked('BUDGET_UNAVAILABLE', 'Không đọc được bộ đếm hạn mức. Web tạm ngừng gọi API để tránh phát sinh phí.') from None
    finally:
        if connection is not None:
            connection.close()
