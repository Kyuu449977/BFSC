"""Build a static-only public/ directory from the explicit file allowlist."""
from pathlib import Path
import os
import shutil
import tempfile
from scripts.public_files import PUBLIC_FILES, STYLE_SOURCES, source_path
ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = ROOT / 'public'

def build_public():
    if PUBLIC_ROOT.is_symlink() or PUBLIC_ROOT.resolve() != ROOT.resolve() / 'public':
        raise RuntimeError('Unsafe public output directory')
    PUBLIC_ROOT.mkdir(exist_ok=True)
    wanted = set(PUBLIC_FILES)
    for name in PUBLIC_FILES:
        relative = Path(name)
        if relative.is_absolute() or '..' in relative.parts:
            raise RuntimeError('Invalid public asset path')
        source = source_path(ROOT, name)
        if not source.resolve().is_relative_to(ROOT) or not source.is_file():
            raise RuntimeError('Missing or unsafe public asset: ' + name)
        destination = PUBLIC_ROOT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        if not destination.parent.resolve().is_relative_to(PUBLIC_ROOT):
            raise RuntimeError('Unsafe public asset destination')
        with tempfile.NamedTemporaryFile(dir=destination.parent, prefix='.build-', delete=False) as temporary:
            temporary_path = Path(temporary.name)
            if name == 'style.css':
                for stylesheet in STYLE_SOURCES:
                    css = ROOT / 'src' / 'styles' / stylesheet
                    temporary.write(css.read_bytes())
                    temporary.write(b'\n')
            else:
                with source.open('rb') as original:
                    shutil.copyfileobj(original, temporary)
        os.replace(temporary_path, destination)
    # Remove stale output files only, without following links or deleting the checkout.
    for folder, directories, filenames in os.walk(PUBLIC_ROOT, topdown=False, followlinks=False):
        for name in filenames:
            item = Path(folder) / name
            if not item.parent.resolve().is_relative_to(PUBLIC_ROOT):
                raise RuntimeError('Unsafe stale output path')
            if item.is_symlink() or item.relative_to(PUBLIC_ROOT).as_posix() not in wanted:
                item.unlink()
        for name in directories:
            item = Path(folder) / name
            if item.is_symlink():
                item.unlink()
            elif item.resolve().is_relative_to(PUBLIC_ROOT) and not any(item.iterdir()):
                item.rmdir()
    return PUBLIC_ROOT

if __name__ == '__main__':
    print('Static public directory:', build_public())
