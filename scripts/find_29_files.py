import sys, urllib.request, urllib.parse, json
sys.stdout.reconfigure(encoding='utf-8')

headers = {'User-Agent': 'BestFoodAppBot/3.0 (https://github.com/phamp/BFSC; food education application)'}

def search_files(q):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(q)}&srnamespace=6&format=json&srlimit=8"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return [r['title'] for r in data.get('query', {}).get('search', [])]
    except Exception as e:
        return [str(e)]

targets = {
    "ja_l_4": "miso butter corn ramen",
    "ja_a_8": "roasted sweet potato yakiimo",
    "ja_d_9": "tsukemen noodles broth",
    "ja_d_10": "gindara saikyo yaki",
    "ja_dr_6": "royal milk tea glass",
    "ja_dr_7": "draft beer glass foam Asahi",
    "ko_d_8": "altang fish roe soup",
    "ko_s_7": "dalgona honeycomb candy",
    "ko_dr_6": "green grape ade cafe",
    "zh_m_7": "chaoshu wonton sichuan chili oil",
    "zh_dr_6": "chinese tea oolong cup gongfu",
    "en_d_6": "jambalaya skillet shrimp",
    "en_d_7": "fettuccine alfredo pasta bowl",
    "en_dr_1": "iced latte glass milk",
    "en_dr_2": "cold brew coffee glass ice",
    "chieu_banh_dap": "banh dap Quang Nam",
    "toi_5_1": "lau rieu cua",
    "toi_4_1": "oc huong",
    "toi_lau_bo": "bo nhung giam",
    "vat_5_2": "che suong sa",
    "nuoc_coca_zero": "nuoc mo ngam",
    "nuoc_sprite": "coconut coffee",
    "nuoc_ngot_4": "nuoc sam mia lau",
    "nuoc_sting_vang": "tra sen",
    "nuoc_ngot_5": "sapodilla smoothie",
    "nuoc_revive": "dragon fruit tea",
    "hl_freeze_tra_xanh": "matcha frappe",
    "pl_tra_mang_cau": "tra mang cau"
}

for k, q in targets.items():
    print(f"\n[{k}] {q}:")
    files = search_files(q)
    for f in files[:4]:
        print("  ", f)
