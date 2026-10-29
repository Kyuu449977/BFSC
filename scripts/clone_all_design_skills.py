import subprocess, os, sys

repos = [
    ("awesome-design-md", "https://github.com/VoltAgent/awesome-design-md"),
    ("open-design", "https://github.com/nexu-io/open-design"),
    ("taste-skill", "https://github.com/Leonxlnx/taste-skill"),
    ("impeccable", "https://github.com/pbakaus/impeccable"),
    ("react-bits", "https://github.com/DavidHDev/react-bits"),
    ("skills-emil", "https://github.com/emilkowalski/skills"),
    ("hallmark", "https://github.com/nutlope/hallmark"),
    ("google-design-md", "https://github.com/google-labs-code/design.md"),
    ("gsap-skills", "https://github.com/greensock/gsap-skills"),
    ("scroll-world", "https://github.com/oso95/scroll-world"),
    ("canvas-ui", "https://github.com/DavidHDev/canvas-ui"),
]

base_dir = os.path.abspath("design-skills/sources")
os.makedirs(base_dir, exist_ok=True)

for name, url in repos:
    target = os.path.join(base_dir, name)
    if os.path.exists(target):
        print(f"[EXISTS] {name}")
        continue
    print(f"Cloning {name} from {url}...")
    try:
        res = subprocess.run(["git", "clone", "--depth", "1", url, target], capture_output=True, text=True, timeout=60)
        if res.returncode == 0:
            print(f"[SUCCESS] {name}")
        else:
            print(f"[FAIL] {name}: {res.stderr.strip()[:200]}")
    except Exception as e:
        print(f"[ERR] {name}: {e}")

print("\nAll clone attempts finished.")
