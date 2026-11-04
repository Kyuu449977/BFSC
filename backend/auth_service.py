"""User authentication, daily tickets, and star evolution gacha service."""
import datetime
import json
import os
from pathlib import Path
import random
import threading
import uuid

ROOT = Path(__file__).resolve().parents[1]
USERS_FILE = Path(os.environ.get('BFSC_USERS_FILE', ROOT / 'backend' / 'data' / 'users.json')).resolve()
USERS_LOCK = threading.RLock()

# Evolution thresholds
# starLevel < 3: 3 shards needed to reach 3★
# starLevel == 3: 5 shards needed to reach 4★
# starLevel == 4: 10 shards needed to reach 5★
# starLevel == 5: maxed out (0 needed)
SHARDS_MAP = {
    1: 3,
    2: 3,
    3: 5,
    4: 10,
    5: 0
}

_CATALOG_CACHE = None

def load_catalog_dishes():
    global _CATALOG_CACHE
    if _CATALOG_CACHE is not None:
        return _CATALOG_CACHE
    dishes = []
    data_js_path = ROOT / 'src' / 'js' / 'data.js'
    if data_js_path.exists():
        lines = data_js_path.read_text(encoding='utf-8').splitlines()
        # FOOD_DATABASE ends at line 2564
        json_lines = []
        for line in lines[1:2564]:
            json_lines.append(line)
        json_str = '\n'.join(json_lines).strip()
        if json_str.startswith('const FOOD_DATABASE ='):
            json_str = json_str[len('const FOOD_DATABASE ='):].strip()
        if json_str.endswith(';'):
            json_str = json_str[:-1].strip()
        try:
            data = json.loads(json_str)
            for banner in data.values():
                dishes.extend(banner.get('dishes', []))
        except Exception:
            pass
    _CATALOG_CACHE = dishes
    return _CATALOG_CACHE

def _today_str():
    return datetime.date.today().isoformat()

def _refresh_tickets(user):
    today = _today_str()
    if user.get("tickets", {}).get("date") != today:
        user["tickets"] = {
            "date": today,
            "remaining": 20,
            "max": 20
        }

def _read_users():
    with USERS_LOCK:
        if not USERS_FILE.exists():
            return {}
        try:
            return json.loads(USERS_FILE.read_text(encoding='utf-8'))
        except Exception:
            return {}

def _write_users(users):
    with USERS_LOCK:
        USERS_FILE.parent.mkdir(parents=True, exist_ok=True)
        USERS_FILE.write_text(json.dumps(users, ensure_ascii=False, indent=2), encoding='utf-8')

def login_or_register(payload):
    """
    Accepts payload: email, name, avatar.
    Returns user dict with refreshed tickets and auth token.
    """
    users = _read_users()
    email = (payload.get('email') or '').strip().lower()
    name = (payload.get('name') or '').strip() or 'Ẩm Thực Khách'
    avatar = payload.get('avatar') or ''

    user_id = None
    for uid, u in users.items():
        if email and u.get('email') == email:
            user_id = uid
            break

    if not user_id:
        user_id = f"user_{uuid.uuid4().hex[:10]}"
        user = {
            "id": user_id,
            "email": email or f"{user_id}@angiday.local",
            "name": name,
            "avatar": avatar,
            "token": uuid.uuid4().hex,
            "created_at": datetime.datetime.now().isoformat(),
            "tickets": {
                "date": _today_str(),
                "remaining": 20,
                "max": 20
            },
            "inventory": {}
        }
        users[user_id] = user
    else:
        user = users[user_id]
        if name:
            user["name"] = name
        if avatar:
            user["avatar"] = avatar
        user["token"] = uuid.uuid4().hex
        _refresh_tickets(user)

    _write_users(users)
    return user

def get_user_by_token(token):
    if not token:
        return None
    users = _read_users()
    for uid, u in users.items():
        if u.get('token') == token:
            today = _today_str()
            if u.get("tickets", {}).get("date") != today:
                _refresh_tickets(u)
                _write_users(users)
            return u
    return None

def roll_wish(user, count):
    if count not in (1, 10):
        raise ValueError("Số lượng mở phải là 1 hoặc 10")

    _refresh_tickets(user)
    if user["tickets"]["remaining"] < count:
        raise ValueError("INSUFFICIENT_TICKETS")

    user["tickets"]["remaining"] -= count

    catalog_dishes = load_catalog_dishes()
    dish_map = {d["id"]: d for d in catalog_dishes if "id" in d}
    catalog_ids = list(dish_map.keys())
    if not catalog_ids:
        raise ValueError("Catalog rỗng")

    owned_ids = list(user["inventory"].keys())
    unowned_ids = [did for did in catalog_ids if did not in user["inventory"]]

    results = []

    for _ in range(count):
        # 5% new dish chance (if unowned dishes exist), else 95% duplicate drop
        is_new_roll = bool(unowned_ids) and (not owned_ids or random.random() < 0.05)

        if is_new_roll:
            chosen_id = random.choice(unowned_ids)
            unowned_ids.remove(chosen_id)
            dish = dish_map[chosen_id]

            base_rarity = dish.get("rarity", 3)
            user["inventory"][chosen_id] = {
                "id": chosen_id,
                "starLevel": base_rarity,
                "shards": 0,
                "shardsNeeded": SHARDS_MAP.get(base_rarity, 5),
                "unlockedAt": datetime.datetime.now().isoformat()
            }
            owned_ids.append(chosen_id)
            results.append({
                "dish": dish,
                "isNew": True,
                "starLevel": base_rarity,
                "shards": 0,
                "shardsNeeded": SHARDS_MAP.get(base_rarity, 5),
                "breakthrough": False
            })
        else:
            # Duplicate drop
            chosen_id = random.choice(owned_ids) if owned_ids else random.choice(catalog_ids)
            dish = dish_map[chosen_id]

            if chosen_id not in user["inventory"]:
                base_rarity = dish.get("rarity", 3)
                user["inventory"][chosen_id] = {
                    "id": chosen_id,
                    "starLevel": base_rarity,
                    "shards": 0,
                    "shardsNeeded": SHARDS_MAP.get(base_rarity, 5),
                    "unlockedAt": datetime.datetime.now().isoformat()
                }
                owned_ids.append(chosen_id)

            inv = user["inventory"][chosen_id]
            current_stars = inv.get("starLevel", 3)
            current_shards = inv.get("shards", 0) + 1
            breakthrough = False

            # Check star evolution threshold
            if current_stars < 3 and current_shards >= 3:
                current_stars = 3
                current_shards -= 3
                breakthrough = True
            elif current_stars == 3 and current_shards >= 5:
                current_stars = 4
                current_shards -= 5
                breakthrough = True
            elif current_stars == 4 and current_shards >= 10:
                current_stars = 5
                current_shards = 10
                breakthrough = True

            inv["starLevel"] = current_stars
            inv["shards"] = current_shards
            inv["shardsNeeded"] = SHARDS_MAP.get(current_stars, 0)

            results.append({
                "dish": dish,
                "isNew": False,
                "starLevel": current_stars,
                "shards": current_shards,
                "shardsNeeded": inv["shardsNeeded"],
                "breakthrough": breakthrough
            })

    # Save to disk
    users = _read_users()
    users[user["id"]] = user
    _write_users(users)

    return {
        "results": results,
        "tickets": user["tickets"],
        "inventoryStats": {
            "totalOwned": len(user["inventory"]),
            "fiveStars": sum(1 for item in user["inventory"].values() if item.get("starLevel") == 5)
        }
    }
