# Nexchem performance improvements

Existing static HTML, page layouts and conversion paths are retained. No React conversion.

## Measured results

Lighthouse on local Chrome with mobile/desktop presets, identical gzip server configuration for before and after. These are lab runs, not production PageSpeed Insights results.

| Test | Performance | LCP |
| --- | --- | --- |
| Mobile before | 51 | 11.6 s |
| Mobile after | 93 | 3.1 s |
| Desktop after | 100 | 0.7 s |

Mobile is not 100. Hosting, CDN compression, device conditions and third-party content can affect production results. Re-run PageSpeed Insights after deploying the entire package.

## Changes

- 76 referenced image assets converted or recompressed to hashed WebP files: 5,586,564 to 1,725,490 bytes (69.1% smaller). Already small WebP files retained. Originals retained for editing.
- Below-fold images lazy load with intrinsic dimensions. First hero image is prioritised; later slides load on demand.
- Exact existing font families self-hosted as WOFF2 with font-display swap. Icon fonts subset to used icons.
- Shared CSS reduced from about 391 KB to 63 KB; filtered CSS embedded per page to remove stylesheet network blocking.
- Core JavaScript bundled/minified, unused plugins removed, scripts deferred. Bootstrap JS retained only on the FAQ page that needs collapse.
- Sponsor carousels initialise near the viewport; their static fallback retains a horizontal row.
- .htaccess enables compression and asset caching where supported. HTML revalidates; changed external assets use versioned URLs.

## Maintenance

Install Python dependencies once:

    python -m pip install -r scripts/requirements-performance.txt

After adding or replacing images:

    python scripts/optimize-images.py

After introducing icons or changing fonts:

    python scripts/optimize-fonts.py

After changing CSS, JavaScript or HTML:

    python scripts/build-assets.py

The build uses pinned npm exec tools and requires Node/npm. Edit original CSS/JS files, then rebuild; generated bundles and embedded styles are replaced. Image and font source files remain available.

## Deployment and verification

1. Back up the current hosting files.
2. Upload all HTML, assets, .htaccess and root SEO files together. Uploading only HTML will break references to new assets.
3. Purge hosting/CDN caches once after upload.
4. Confirm HTML revalidation, gzip/Brotli and long-lived caching for versioned static assets on the actual host.
5. Test hero/sponsor sliders, mobile drawer, solvent pop-ups, FAQ and quote/contact forms. Review WhatsApp drafts before sending.
6. Run mobile and desktop PageSpeed Insights against https://nexchem.pk/ and representative product pages. Keep the production reports for comparison.

Better Design automated review was unavailable because its monthly quota was exhausted; browser layout checks were used instead.

## Follow-up: image delivery audit

Responsive WebP variants now serve the two later hero slides, homepage product thumbnails and LCH logo. Slider images use Slick data-srcset/data-sizes; regular thumbnails use native srcset/sizes. Desktop variants and 2x thumbnail/logo variants preserve sharpness. The build regenerates these through scripts/responsive-images.py.

At a 390px viewport and device pixel ratio 1, the six flagged images total 30,814 bytes (30.1 KiB), compared with 172.7 KiB reported by the supplied live audit, about 83% less. Slider 3 is 13,734 bytes; slider 4 is 10,628 bytes. Higher density or desktop browsers choose larger variants as appropriate. Browser checks at 390px and 1440px verified currentSrc selection, both slider images, no JavaScript errors and no horizontal overflow. The previous Lighthouse scores above were measured before this follow-up; new production scores are not yet measured.

The reported bfcache failures explicitly come from Chrome flags/command-line configuration and are not actionable website fixes. Retest with a normal browser profile if checking back/forward caching.

## Mobile high-density image follow-up

The newer audit selected 900px slides on high-density mobile screens. Dedicated mobile picture sources now cap the two landscape slides at 480px. Slick's separate preload Image also receives the mobile source before initialisation, avoiding an extra desktop download. The first hero and About image have 420px mobile variants; desktop image sources remain available. Matching media-specific hero preloads prevent double downloads.

Four mobile images: slider 3 13,734 bytes, first hero 16,464 bytes, slider 4 10,628 bytes, About 8,560 bytes. Total 49,386 bytes (48.2 KiB) versus the supplied 133.7 KiB audit. Browser checks at 390px and 1440px, DPR 2, verified mobile currentSrc selection, no desktop slide downloads on mobile, successful slider transitions, no JavaScript errors and no horizontal overflow. These bytes are measured locally, not a new live PageSpeed score. The reported 1,070ms TTFB requires host/CDN investigation after deployment; no speculative preload connections were added.
