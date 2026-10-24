"""Static build entry point. Implementation: scripts/build_public.py."""
from scripts.build_public import ROOT, PUBLIC_ROOT, build_public

if __name__ == "__main__":
    print("Static public directory:", build_public())
