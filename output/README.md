# Website Screenshot Capture Report

## Summary

- HTML-backed pages discovered: 17
- Pages successfully captured at all three viewports: 17
- Total full-page screenshots generated: 51
- Desktop: 17 (1440 x 900)
- Tablet: 17 (768 x 1024)
- Mobile: 17 (390 x 844)
- Pages requiring multiple screenshots: 0
- Viewport capture failures: 0
- HTML-backed routes with empty source files: 9
- Page-like linked destinations without a locally served page: 25

Each page and viewport was loaded independently. Fonts were awaited, pages were scrolled from top to bottom with instant scroll positioning to trigger lazy loading, image decoding was awaited (up to 10 seconds), and full-page PNGs were captured at scroll position zero. No application files were modified.

## Viewport failures

- None.

## Empty source pages

- `/contact/` (`contact/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/insights/` (`insights/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/arbitration/` (`practice-areas/arbitration/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/banking-recovery/` (`practice-areas/banking-recovery/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/civil-commercial/` (`practice-areas/civil-commercial/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/criminal-ni-act/` (`practice-areas/criminal-ni-act/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/high-court-writ/` (`practice-areas/high-court-writ/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/legal-drafting-advisory/` (`practice-areas/legal-drafting-advisory/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.
- `/practice-areas/property/` (`practice-areas/property/index.html`) is an empty 0-byte HTML file; the blank rendering was captured for all three viewports.

## Linked destinations unavailable locally

These page-like internal links were checked against the local static site. They have no matching local HTML page and do not return HTTP 200, so they were not treated as accessible project pages and no screenshots were generated for them.

- `/courts/dwarka/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/courts/karkardooma/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/courts/patiala-house/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/courts/rohini/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/courts/saket/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/courts/tis-hazari/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/article-commercial-dispute-resolution/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/banking-recovery-proceedings/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/delhi-high-court-banking-dispute/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/important-recovery-matter/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/pradeep-bhardwaj-v-priya/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/property-disputes-delhi/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/ramneesh-pal-singh-v-sugandhi-aggarwal/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/shahjahan-v-state-of-uttar-pradesh/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/shivangi-bansal-v-sahib-bansal/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/sonal-talpada-v-veerbhan-singh/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/sugirtha-v-gowtham/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/featured/understanding-ni-act-prosecutions/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/child-custody-welfare-of-child/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/cruelty-under-bns/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/irretrievable-breakdown-of-marriage/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/maintenance-under-bnss/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/matrimonial-disputes-specific-allegations/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/insights/visitation-rights-during-divorce/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.
- `/term-of-use/` - HTTP 404; Linked route has no corresponding local HTML page and returns HTTP 404.

## Discovery notes

- The project contains static HTML, not a framework router or build manifest. Every local HTML file was included, including the directly addressable /standerd.html template.
- The sitemap did not enumerate routes. Page-like internal links were checked separately; static assets and file downloads were excluded.
- The captured page inventory and filenames are recorded in [manifest.json](./manifest.json).
