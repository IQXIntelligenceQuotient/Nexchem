"""Build the shared assets after editing CSS or JavaScript (requires Node/npm)."""

from pathlib import Path
import shutil
import subprocess
import re


root = Path(__file__).resolve().parent.parent
subprocess.run([shutil.which("python") or "python", "scripts/responsive-images.py"], cwd=root, check=True)
npm = shutil.which("npm.cmd") or shutil.which("npm")
if not npm:
    raise SystemExit("Install Node.js/npm to build the shared assets.")
command = [npm, "exec", "--yes", "--package=esbuild@0.28.2", "--", "esbuild"]

subprocess.run(command + ["assets/css/site-core.css", "--bundle", "--minify",
                         "--external:../fonts/*", "--external:../img/*",
                         "--outfile=assets/css/site.min.css", "--log-level=error"],
               cwd=root, check=True)
css = (root / "assets/css/site.min.css").read_text(encoding="utf-8")
classes = set(re.findall(r"\.([a-zA-Z][a-zA-Z0-9_-]+)", css))
dynamic = sorted(name for name in classes if name.startswith(("slick-", "odometer-", "dropdown-", "site-menu-")))
dynamic += ["show", "hide", "active", "loaded", "collapse", "collapsing", "fade", "animated",
            "viewport-lg", "viewport-sm", "menu-visible", "menu-open", "dropdown-open"]
subprocess.run([npm, "exec", "--yes", "--package=purgecss@7.0.2", "--", "purgecss",
                "--css", "assets/css/site.min.css", "--content", "*.html", "assets/js/main.js",
                "assets/js/quote-request.js", "assets/js/solvents.js", "--output", ".",
                "--keyframes", "--safelist"] + dynamic, cwd=root, check=True)

scripts = ["vendor/jquery-1.12.4.min.js", "vendor/waypoints.min.js", "vendor/slick.min.js", "vendor/jquery.smoothscroll.min.js",
           "vendor/jquery.ajaxchimp.min.js", "vendor/odometer.min.js", "vendor/wow.min.js", "main.js"]
source = b"\n;\n".join((root / "assets/js" / name).read_bytes() for name in scripts)
result = subprocess.run(command + ["--minify", "--target=es2018", "--legal-comments=eof",
                                  "--loader=js", "--log-level=error"],
                        input=source, cwd=root, check=True, capture_output=True)
(root / "assets/js/site.min.js").write_bytes(result.stdout)

styles = [f"assets/css/{name}.css" for name in ["home", "catalogue", "contact", "industrial-catalogue", "solvents"]]
subprocess.run(command + styles + ["--minify", "--outdir=assets/css", "--out-extension:.css=.min.css",
                                  "--log-level=error"], cwd=root, check=True)

# Embed the small, filtered page styles to avoid blocking stylesheet round trips.
names = "site|home|catalogue|contact|industrial-catalogue|solvents"
pattern = re.compile(r'<link rel="stylesheet" href="assets/css/(' + names + r')\.min\.css(?:\?[^\"]*)?">|<style data-performance-style="(' + names + r')">.*?</style>', re.S)
for page in root.glob("*.html"):
    original = page.read_bytes()

    def embed_style(match):
        name = match[1] or match[2]
        css = (root / "assets/css" / (name + ".min.css")).read_text(encoding="utf-8")
        css = css.replace("../fonts/", "assets/fonts/").replace("../img/", "assets/img/")
        return '<style data-performance-style="' + name + '">' + css + '</style>'

    updated = pattern.sub(embed_style, original.decode("utf-8"))
    page.write_bytes(updated.encode("utf-8"))

subprocess.run([shutil.which("python") or "python", "scripts/version-assets.py"], cwd=root, check=True)
print("Built shared CSS/JavaScript and updated page asset versions.")
