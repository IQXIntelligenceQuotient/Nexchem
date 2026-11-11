"""Create WebP assets from referenced raster images, preserving the originals."""

from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re
from urllib.parse import quote, unquote

from PIL import Image, ImageOps


root = Path(__file__).resolve().parent.parent
sources = list(root.glob("*.html")) + list((root / "assets/css").glob("*.css"))
references = set()
for source in sources:
    text = source.read_text(encoding="utf-8-sig")
    for path in re.findall(r"(?:assets/img/|\.\./img/)([^\"')<>]+?\.(?:png|jpe?g|webp))", text, re.I):
        image = root / "assets/img" / unquote(path)
        if image.is_file() and "optimized" not in image.parts:
            references.add(image)

destination = root / "assets/img/optimized"
destination.mkdir(exist_ok=True)
manifest_path = root / "scripts/image-map.json"
manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
previous = dict(manifest)
references.update(root / name for name in manifest if (root / name).is_file())
before = after = 0
for original in sorted(references):
    size = original.stat().st_size
    if original.suffix.lower() == ".webp" and size < 85000:
        continue
    with Image.open(original) as source:
        transparent = "A" in source.getbands() or "transparency" in source.info
        image = ImageOps.exif_transpose(source).convert("RGBA" if transparent else "RGB")
        limit = 1200
        if "page-heroes" in original.parts or "hero-industrial" in original.name:
            limit = 900
        if "logo" in original.name.lower() or original.name == "LCH.png":
            limit = 320
        if original.name.startswith("sponsor-"):
            limit = 280
        if "favicon" in original.name:
            limit = 64
        image.thumbnail((limit, limit))
        output = BytesIO()
        quality = 60 if original.name in {"dl-slider-3.jpg", "dl-slider-4.jpg"} else 80
        image.save(output, "WEBP", quality=quality, method=6)
        content = output.getvalue()
        slug = re.sub(r"[^a-z0-9]+", "-", original.stem.lower()).strip("-")
        asset = destination / f"{slug}-{sha256(content).hexdigest()[:10]}.webp"
        asset.write_bytes(content)
        old = original.relative_to(root).as_posix()
        manifest[old] = asset.relative_to(root).as_posix()
        before += size
        after += len(content)

for source in sources + list(root.glob("*.xml")) + [root / "site.webmanifest"]:
    if not source.exists():
        continue
    raw = source.read_bytes()
    text = raw.decode("utf-8-sig")
    for original, replacement in manifest.items():
        for old, new in [(previous.get(original, original), replacement), (original, replacement), (quote(original), quote(replacement)),
                         (original.replace("assets/img/", "../img/"), replacement.replace("assets/img/", "../img/")),
                         (previous.get(original, original).replace("assets/img/", "../img/"), replacement.replace("assets/img/", "../img/")),
                         (quote(original.replace("assets/img/", "../img/")), quote(replacement.replace("assets/img/", "../img/")))]:
            text = text.replace(old, new)
    if source.suffix == ".html":
        text = text.replace('type="image/x-icon"', 'type="image/webp"')
    if text != raw.decode("utf-8-sig"):
        source.write_bytes(text.encode("utf-8"))

manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"Converted {len(references)} referenced images. Processed assets: {before:,} -> {after:,} bytes.")
