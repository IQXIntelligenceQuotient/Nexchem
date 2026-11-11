"""Generate appropriately sized homepage photos and logo variants without changing layout."""
from hashlib import sha256
from functools import cache
from io import BytesIO
import json
from pathlib import Path
import re
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / 'scripts/image-map.json').read_text())

@cache
def variant(original, width, quality=70):
    with Image.open(root / original) as source:
        image = ImageOps.exif_transpose(source).convert('RGBA' if 'A' in source.getbands() or 'transparency' in source.info else 'RGB')
        image.thumbnail((width, 2000))
        output = BytesIO()
        image.save(output, 'WEBP', quality=quality, method=6)
        data = output.getvalue()
        slug = re.sub('[^a-z0-9]+', '-', Path(original).stem.lower()).strip('-')
        path = f'assets/img/optimized/{slug}-w{image.width}-{sha256(data).hexdigest()[:10]}.webp'
        (root / path).write_bytes(data)
        return path, image.width

targets = {
    'Containers of butyl acetate': ('assets/img/Butyl Acetate.jpg', [74, 148], '74px'),
    'Blue white oil drum': ('assets/img/White Oil.jpg', [74, 148], '74px'),
    'Premium UV adhesive container': ('assets/img/premium-tpu-uv-adhesive-high-strength-seam-sealant-football-industrial-use.jpg', [65, 130], '65px'),
    'Lahore Chemical House logo': ('assets/img/LCH.png', [150, 300], '150px'),
    'Industrial solvent processing equipment': ('assets/img/dl-slider-3.jpg', [480, 900, 1200], '(max-width: 767px) calc(100vw - 40px), 44vw'),
    'Chemical handling and industrial adhesive illustration': ('assets/img/dl-slider-4.jpg', [480, 900, 1200], '(max-width: 767px) calc(100vw - 40px), 44vw'),
}
for page in root.glob('*.html'):
    text = page.read_text(encoding='utf-8')
    text = re.sub(r'<picture data-mobile-image>\s*<source[^>]*>(<img\b[^>]*>)</picture>', r'\1', text)
    def update(match):
        tag = match[0]
        alt = re.search(r'alt="([^"]*)"', tag)
        mobile_original = None
        if page.name == 'index.html':
            if alt and alt[1] == 'Illustration of industrial lubricant drums':
                mobile_original = 'assets/img/hero-industrial-lubricant-drums.webp'
            elif 'about-bg-1' in tag:
                mobile_original = 'assets/img/about-bg-1.png'
        if mobile_original:
            mobile, _ = variant(mobile_original, 420, 55)
            return '<picture data-mobile-image><source media="(max-width: 767px)" srcset="' + mobile + '">' + tag + '</picture>'
        if not alt or alt[1] not in targets:
            return tag
        original, widths, sizes = targets[alt[1]]
        if page.name != 'index.html' and original != 'assets/img/LCH.png':
            return tag
        images = [variant(original, w, 60 if 'dl-slider' in original else 70) for w in widths]
        lazy = 'data-lazy=' in tag
        tag = re.sub(r'\s(?:data-srcset|srcset|data-sizes|sizes|data-mobile-src)="[^"]*"', '', tag)
        attr = 'data-lazy' if lazy else 'src'
        tag = re.sub(r'(?<![\w-])' + attr + r'="[^"]*"', attr + '="' + images[0][0] + '"', tag)
        srcset = ', '.join(f'{path} {width}w' for path, width in images)
        prefix = 'data-' if lazy else ''
        tag = tag[:-1] + f' {prefix}srcset="{srcset}" {prefix}sizes="{sizes}">'
        if 'dl-slider' in original:
            tag = tag[:-1] + f' data-mobile-src="{images[0][0]}">'
            return '<picture data-mobile-image><source media="(max-width: 767px)" srcset="' + images[0][0] + '">' + tag + '</picture>'
        return tag
    updated = re.sub(r'<img\b[^>]*>', update, text)
    if page.name == 'index.html':
        mobile, _ = variant('assets/img/hero-industrial-lubricant-drums.webp', 420, 55)
        # Preload the matching source only: avoid downloading both mobile and desktop hero files.
        updated = re.sub(r'[ \t]*<link rel="preload"[^>]*as="image"[^>]*>', '', updated)
        desktop = manifest['assets/img/hero-industrial-lubricant-drums.webp']
        preload = f'<link rel="preload" as="image" href="{mobile}" media="(max-width: 767px)" fetchpriority="high">\n<link rel="preload" as="image" href="{desktop}" media="(min-width: 768px)" fetchpriority="high">'
        updated = updated.replace('</head>', preload + '\n</head>')
    if updated != text:
        page.write_text(updated, encoding='utf-8')
print('Generated responsive slider, thumbnail and logo WebP variants.')
