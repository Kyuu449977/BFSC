import subprocess, sys

repos = [
    ("ui-ux-pro-max-skill", "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"),
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

for name, url in repos:
    try:
        res = subprocess.run(["git", "ls-remote", "--heads", url], capture_output=True, text=True, timeout=15)
        if res.returncode == 0:
            print(f"[OK] {name} ({url})")
        else:
            print(f"[FAIL] {name} ({url}) -> code {res.returncode}: {res.stderr.strip()[:100]}")
    except Exception as e:
        print(f"[ERR] {name} -> {e}")
