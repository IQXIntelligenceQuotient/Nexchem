"""Refresh local CSS/JS URLs after edits so cached deployments get matching files."""

from hashlib import sha256
from pathlib import Path
import re
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


root = Path(__file__).resolve().parent.parent
asset_reference = re.compile(rb'(\b(?:href|src)=["\x27])([^"\x27]+)(["\x27])')

for page in sorted(root.glob("*.html")):
    original = page.read_bytes()

    def version_reference(match):
        url = urlsplit(match[2].decode("utf-8"))
        if url.scheme or url.netloc or Path(url.path).suffix not in (".css", ".js"):
            return match[0]
        asset = (root / url.path.lstrip("/")).resolve()
        if not asset.is_relative_to(root) or not asset.is_file():
            raise ValueError(f"Missing local asset in {page.name}: {url.path}")
        version = sha256(asset.read_bytes()).hexdigest()[:12]
        query = [(key, value) for key, value in parse_qsl(url.query) if key != "v"]
        query.append(("v", version))
        updated = urlunsplit(url._replace(query=urlencode(query)))
        return match[1] + updated.encode("utf-8") + match[3]

    updated = asset_reference.sub(version_reference, original)
    if updated != original:
        page.write_bytes(updated)
        print(f"Updated asset versions in {page.name}")
