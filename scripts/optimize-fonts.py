"""Create local WOFF2 text fonts and icon subsets for the current site."""

from hashlib import sha256
from io import BytesIO
from pathlib import Path
import re
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont


root = Path(__file__).resolve().parent.parent
folder = root / "assets/fonts"
source = (folder / "google-fonts-source.css").read_text(encoding="utf-8")
rules = []


def save_font(font, characters, name):
    options = subset.Options()
    reducer = subset.Subsetter(options=options)
    reducer.populate(unicodes=characters)
    reducer.subset(font)
    font.flavor = "woff2"
    output = BytesIO()
    font.save(output)
    data = output.getvalue()
    filename = f"{name}-{sha256(data).hexdigest()[:10]}.woff2"
    (folder / filename).write_bytes(data)
    return filename


def face(family, weight, filename):
    rules.append(f"@font-face{{font-family:'{family}';font-style:normal;font-weight:{weight};font-display:swap;src:url('../fonts/{filename}') format('woff2')}}")


for block in re.findall(r"@font-face\s*\{([^}]+)\}", source):
    family = re.search(r"font-family: '([^']+)'", block)[1]
    weight = re.search(r"font-weight: (\d+)", block)[1]
    url = re.search(r"url\(([^)]+)\)", block)[1]
    with urlopen(url, timeout=30) as response:
        font = TTFont(BytesIO(response.read()), recalcTimestamp=False)
    characters = list(range(0x20, 0x250)) + list(range(0x2000, 0x2070)) + [0x20AC, 0x2713, 0x2714, 0x2192]
    stem = family.lower().replace(" ", "-") + "-" + weight
    filename = save_font(font, characters, stem)
    face(family, weight, filename)
    for page in root.glob("*.html"):
        raw = page.read_bytes()
        updated = re.sub(rb"assets/fonts/" + stem.encode() + rb"-[a-f0-9]+\.woff2", b"assets/fonts/" + filename.encode(), raw)
        if updated != raw:
            page.write_bytes(updated)

content = "\n".join(path.read_text(encoding="utf-8-sig") for path in [*root.glob("*.html"), *(root / "assets/js").glob("*.js")])
for name, prefix, family, weight in [
    ("fa-brands-400", "fa", "Font Awesome 5 Brands", 400),
    ("fa-solid-900", "fa", "Font Awesome 5 Free", 900),
    ("fa-regular-400", "fa", "Font Awesome 5 Free", 400),
    ("dl-construction", "dl", "dl-construction", 400),
]:
    stylesheet = "fontawesome.min.css" if prefix == "fa" else "dl-construction-icons.min.css"
    css = (root / "assets/css" / stylesheet).read_text(encoding="utf-8-sig")
    classes = set(re.findall(r"\b" + prefix + r"-[a-z0-9-]+\b", content))
    characters = set()
    for selectors, code in re.findall(r'''([^{}]+)\{content:["']\\([a-fA-F0-9]+)["']\}''', css):
        if any("." + token + ":before" in selectors for token in classes):
            characters.add(int(code, 16))
    extension = ".ttf" if prefix == "dl" else ".woff2"
    font = TTFont(folder / (name + extension), recalcTimestamp=False)
    filename = save_font(font, characters, name + "-subset")
    face(family, weight, filename)

(root / "assets/css/fonts.css").write_text("\n".join(rules) + "\n", encoding="utf-8")
print("Local text fonts and icon subsets generated. Run build-assets.py next.")
