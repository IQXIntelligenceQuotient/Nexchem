# Nexchem SEO, GEO and AEO audit

Research date **10 November 2026**. Market **Pakistan**, with Lahore modifiers for procurement and technical buyers. Language **English**, using UK spelling. Research used public search results and direct page fetches. Search volume, keyword difficulty, actual rankings and conversion rates were unavailable.

## 1. Main issues and evidence

| Priority | Affected live URL | Observed evidence | Fix and status |
|---|---|---|---|
| P0 | All ten HTML routes | All ten returned 200 in the direct crawl. All ten used the same template meta description. Nine shared the same generic title and FAQ had the theme vendor title. Eight lacked an H1. None had a canonical or X-Robots-Tag. | Applied unique titles, descriptions, canonicals and social metadata to the local HTML. The local pages now use one H1 per route. |
| P0 | /, /index.html, www homepage | All three served the same homepage with 200 responses. HTTP bare-domain redirected to HTTPS. A random missing URL returned 404. | Local canonical points to the bare HTTPS homepage and sitemap lists it once. Permanent host and homepage alias redirects require hosting configuration. Test query strings and fragments before rollout. |
| P0 | /robots.txt, /sitemap.xml, /sitemap-index.xml, /image-sitemap.xml, /llms.txt | Direct requests returned 404. Missing robots.txt alone is not evidence of crawl blocking. | Files added at the root of the static project. Check content types, fetches and URL coverage after deployment. |
| P0 | /faq.html | Live theme navigation exposed 15 same-site 404 targets, including /company.html, /service.html and /blog-single.html. The live FAQ used house-construction copy. | The current local shared header eliminates the broken theme destinations. Replaced the six accordion questions and answers without changing the accordion. Remaining placeholder media requires a decision. |
| P0 | /Industrial-Lubricants.html, /Industrial-Adhesives.html, /Quality-Policy.html | Live links referenced missing #lubricant-products, #products and #contact anchors. | Current local catalogue CTAs point to existing sections. The quality page documentation CTA now points to the Contact Us form. |
| P0 | /, /about.html, /contact.html | ISL and LCH appeared under duplicate names. About said 1975 while the joint brochure says 2010. The live footer said open Monday–Sunday while Contact says Sunday closed. The live displayed WhatsApp number differed from the link/form destination. | Corrected the company copy and counter labels, and aligned footer hours to the existing contact page. Preserved separate contact routes already in use locally and left their ownership for confirmation. |
| P1 | /Industrial-Solvents.html | Live product catalogue text exists in HTML. The current local version enhances native details with a dialog. All 18 descriptions are in the source and can be opened without JS. Only three products have gallery fragment links. Fragments are positions within the category page. | Preserved the dialog, search, gallery and no-JS product details. Add standalone detail URLs only when the approved data and design are available. |
| P1 | /Industrial-Lubricants.html, /Industrial-Adhesives.html | The categories have product cards and quote routes. A product name in a fragment provides navigation but no independent indexing target. | Added stable fragment IDs to the six lubricant cards. Kept Adhesives and Solvents product anchors and enquiry routing. |
| P1 | / and /Industrial-Solvents.html | Single Chromium observation at 390 px showed no horizontal overflow. Home had 71 same-origin resources and about 754 KB transferred, with load ending around 2.42 s. Solvents had 34 and about 663 KB, with load ending around 2.00 s. Contact returned 403 in this browser run and 200 in the direct crawl. | Investigate the Contact browser response and caching conditions. Inspect sponsor images, third-party resources and render-blocking scripts before altering loading behaviour. These are lab observations, not field CWV measurements. |

Live URLs checked include the [homepage](https://nexchem.pk/), [About](https://nexchem.pk/about.html), [Industries](https://nexchem.pk/industry.html), [Solvents](https://nexchem.pk/Industrial-Solvents.html), [Lubricants](https://nexchem.pk/Industrial-Lubricants.html), [Adhesives](https://nexchem.pk/Industrial-Adhesives.html), [Quality Policy](https://nexchem.pk/Quality-Policy.html), [Testing Facility](https://nexchem.pk/Testing-Facility.html), [Contact](https://nexchem.pk/contact.html) and [FAQ](https://nexchem.pk/faq.html). Search Console is needed to establish indexed and excluded URLs, selected canonicals and search performance. Field data and analytics are needed for real user experience and quote conversion. Host access is needed for redirects, headers and any firewall investigation.

## 2. Competitor findings

Public Pakistan-oriented queries included industrial solvent supplier Lahore, ethyl acetate supplier Pakistan, pharma-grade white oil supplier Pakistan and footwear adhesives Lahore. Presence in these results establishes relevance to the query, without establishing stable ranks or search volume.

| Type | Page reviewed | Structure and intent | Trust, documentation and quote path | Opportunity for Nexchem |
|---|---|---|---|---|
| Direct solvents | [Bin Arif Chemicals products](https://binarifchemicals.com/products/) | Core acetates plus imported solvents and several IPA concentrations on one product page. | Lahore facility named. Grade breakdown visible. A grade-specific SDS or buyer FAQ was not observed on the reviewed page. | Explain how to select a grade and link directly to a product-specific documentation request. |
| Direct solvents | [Imperial Chemical Industries chemicals](https://imperialchemical.com.pk/chemicals) | Short chemical list covers butyl acetate, ethyl acetate and IPA. | Lahore address and several contact options. The reviewed page provides limited product-level details and no visible product-specific FAQ. | Show actual buying inputs and connect each listed chemical to its quote and SDS actions. |
| Direct white oils | [Reliance Petrochem business](https://reliancepetrochem.com/our-business/) | White oil applications and base-oil sourcing are grouped by business line. | Manufacturer positioning and supplier names. Grade-specific quotation and document flow were not evident in the reviewed section. | Give industrial and pharma-grade buyers separate entry points and ask for the intended application and specification. |
| Direct footwear materials | [BinRasheed footwear](https://binrasheed.com/footwear/) | Organises products by footwear materials and lists adhesive and sole applications. | Product manager and Lahore contact are prominent. Grade-specific documentation and FAQs were not evident in the reviewed section. | Make the four Nexchem adhesives easy to compare by application and ask buyers for substrates and curing conditions. |
| Direct solvents and documentation benchmark | [Walchem ethyl acetate SDS](https://walchem.com.pk/wp-content/uploads/2021/08/Walchem_MSDS.pdf.pdf) | Indexable supplier PDF for ethyl acetate and a technical search result. | Identifies the chemical and supplier and provides hazard and handling sections. The PDF serves document intent. | Publish Nexchem-approved grade-specific PDFs with a visible version date and product-to-document links when supplied. |
| Informational result | [NIOSH ethyl acetate reference](https://www.cdc.gov/niosh/npg/npgd0260.html) | Chemical identity, properties and workplace hazard reference. | Authoritative technical reference with no commercial quote flow. | Cite authoritative chemistry sources where relevant and connect general facts to a request for the actual supplied grade's SDS. |

The ISL website surfaced in Pakistan supplier research. Treat it as a related entity and potential search overlap until Nexchem confirms site ownership, brand roles and the preferred cross-links. [ISL Chemicals](https://islchemicals.com/)

## 3. Keyword-to-URL map

| Cluster | Primary keyword | Supporting and long-tail terms | Search intent | Existing or proposed URL | Page action | Priority |
|---|---|---|---|---|---|---|
| Supplier | industrial chemical supplier Pakistan | industrial chemical supplier Lahore, chemical distributor, chemical supply quote | Commercial | / | Rewrite existing copy | P0 |
| Company | Nexchem ISL LCH | Industrial Solution Leaders, Lahore Chemical House, Nexchem group | Navigational | /about.html | Rewrite profiles and clarify roles | P0 |
| Solvents | industrial solvent supplier Pakistan | bulk industrial solvents, industrial cleaning solvents, acetate esters, IPA supplier Lahore | Commercial | /Industrial-Solvents.html | Keep catalogue and rewrite intro | P0 |
| Lubricants | industrial lubricants supplier Pakistan | white oil supplier Lahore, specialty lubricant quote, pack sizes | Commercial | /Industrial-Lubricants.html | Keep catalogue and form | P0 |
| Adhesives | industrial adhesives supplier Pakistan | footwear adhesive Lahore, sports goods bonding, lamination adhesive | Commercial | /Industrial-Adhesives.html | Keep catalogue and product quote links | P0 |
| Ethyl acetate | ethyl acetate supplier Pakistan | ethyl acetate Lahore, CAS 141-78-6, bulk ethyl acetate, ethyl acetate SDS | Product purchase and document request | /Industrial-Solvents.html#solvent-ethyl-acetate now, /products/ethyl-acetate.html proposed | Keep anchor now, create detail page after approval and document review | P1 |
| IPA | isopropyl alcohol supplier Pakistan | IPA 85–99.9%, isopropanol, IPA SDS, IPA pack size | Product purchase and document request | /Industrial-Solvents.html#solvent-ipa now, /products/isopropyl-alcohol.html proposed | Confirm individual grades before creating detail page | P1 |
| Other solvents | butyl acetate supplier Pakistan | n-propyl acetate, methyl acetate, MEG, DEG, DMF, DAA, xylene | Product discovery | /Industrial-Solvents.html | Keep entries. Create detail URLs only after validating demand and data | P2 |
| White oil | white oil supplier Pakistan | industrial white oil, pharma-grade white oil, white oil specifications, white oil drum | Product purchase | /Industrial-Lubricants.html#industrial-white-oil now, /products/white-oil.html proposed | Use one grade-comparison URL when approved | P1 |
| Specialty lubricants | spindle oil supplier Pakistan | silicone oil, rubber processing oil, solvent oil, application and grade enquiries | Product discovery | /Industrial-Lubricants.html | Keep product anchors | P2 |
| TPR adhesive | TPR footwear lamination adhesive Pakistan | Diamond Solution, TPR adhesive TDS, footwear bonding enquiry | Product purchase | /Industrial-Adhesives.html#tpr-adhesive now, /products/tpr-adhesive.html proposed | Confirm substrate compatibility and curing data first | P1 |
| Other adhesives | footwear paste adhesive Pakistan | Kacha Solution, Pakka Solution, TPU UV adhesive, thermal bonded football | Product discovery | /Industrial-Adhesives.html | Keep named product anchors | P2 |
| Documentation | chemical SDS and TDS request | MSDS, technical data sheet, available GC report, batch documentation | Technical support | /Testing-Facility.html | Keep as central document request route | P0 |
| Buying questions | how to request a chemical quote | how to choose grade, packaging, MOQ, specifications, delivery | Informational | /faq.html | Rewrite existing accordion and link it internally | P1 |
| Industries | industrial chemical applications | automotive manufacturing, mechanical engineering, oil and gas applications | Use-case research | /industry.html | Clarify application focus to distinguish from catalogue pages | P1 |
| Local enquiries | Nexchem Lahore contact | Nexchem office, address, opening hours, WhatsApp, directions | Navigational and transactional | /contact.html | Keep contact form and map, clarify purpose | P0 |

When a product page is approved, that URL becomes the primary target for its product purchase intent. Keep the category card as an overview and link to the product page. Keep /industry.html application-led and link it to category pages. Use the Testing Facility for shared documentation instructions and the relevant product page for the actual approved PDF when available.

## 4. Page copy and preservation plan

Full copy for the six priority pages is in [NEXCHEM-PAGE-COPY.md](NEXCHEM-PAGE-COPY.md), exported from the edited components in display order. The HTML is the implementation source.

| Page | Keep | Fix or replace in place | Add within existing components |
|---|---|---|---|
| / | Hero slider, company cards, catalogues, gallery, CTA, buyer guide and reviews section | Category-led slide copy, distinct ISL and LCH labels, application-led adhesive cards and defensible catalogue counts | Profile deep links, direct product anchors and an FAQ link |
| /about.html | Company profile cards, brochure, process and CTA blocks | Brochure-supported company relationship and date, supplier positioning and verifiable catalogue counts | Clearer documentation and delivery enquiry copy inside existing lists |
| /Industrial-Solvents.html | Hero, families, searchable 18-entry portfolio, dialogs and packaging gallery | Category and packaging copy, visible grade and document prompts | Product intent in the existing portfolio intro, with quote and SDS links already in each dialog |
| /Industrial-Lubricants.html | Hero, six illustrated cards and WhatsApp quotation form | Grade-led introduction, careful pharma copy and clearer request instructions | Stable card IDs for deep links |
| /Industrial-Adhesives.html | Hero, four product cards, quote form and direct WhatsApp route | Footwear and sports goods terminology, concise process and quote guidance | Product names and document requests in the existing quote actions |
| /contact.html | Lahore office details, map, directions, labelled form and existing destinations | State the page’s product quote, document and technical enquiry purpose | Metadata for local and navigational search |
| /faq.html | Six existing accordion entries and support callout | Replace home-building template text with industrial grade, packaging, documents, quote, suitability and office questions | Link from the existing homepage buyer guide |
| /Quality-Policy.html and /Testing-Facility.html | Existing content and documentation routes | Unique metadata, corrected quality documentation link and consistent footer links | Traceable paths from existing footer and buyer guide |

### Proposed product detail template

Use the existing catalogue page's typography, colours and actions when approved. Publish one H1 with the chemical or trade name, then a one-sentence answer identifying what the product is and where it fits. Use existing image and enquiry components. Present available grades, verified specifications, packaging and minimum quantity, applications, document links, a direct buyer question and a closing quote action. For any unavailable field use “Ask Nexchem to confirm” or omit the field. A document button should open the current approved SDS or TDS where supplied, and otherwise open a product-specific request. Never substitute another supplier's SDS for Nexchem's grade.

### Proposed example A — Ethyl Acetate

**URL** /products/ethyl-acetate.html  
**SEO title** Ethyl Acetate Supplier in Pakistan | Nexchem  
**Meta description** Request a quote or safety data sheet for ethyl acetate. Ask Nexchem’s Lahore office about available grades, pack sizes and lead times.  
**Eyebrow** Industrial solvents  
**H1** Ethyl Acetate  
**Opening** Ethyl acetate is an acetate ester listed in Nexchem’s industrial solvent catalogue. Its CAS number is 141-78-6.  
**Applications** If you are sourcing ethyl acetate for a coating, ink or formulation, tell us your required grade and specification.  
**Packaging and availability** Share your quantity, preferred pack size and delivery location so the team can check what is available.  
**Documentation** Request the current SDS for the supplied grade. Ask for a technical data sheet if your purchasing specification requires one.  
**FAQ** Can I request an ethyl acetate quote without knowing the grade? Yes. Describe the intended use and share any existing specification so Nexchem can discuss the available options.  
**Buttons** Request a quote and Request SDS, with ethyl acetate in the enquiry text.  
**Closing** Send your grade, quantity and delivery location to Nexchem’s Lahore office.  
**Evidence** [Nexchem catalogue](https://nexchem.pk/Industrial-Solvents.html), [NIOSH ethyl acetate identity](https://www.cdc.gov/niosh/npg/npgd0260.html).

### Proposed example B — White Oil

**URL** /products/white-oil.html  
**SEO title** Industrial and Pharma-Grade White Oil | Nexchem  
**Meta description** Compare Nexchem’s industrial and pharma-grade white oil listings. Ask about grade specifications, pack sizes and quotations.  
**Eyebrow** Industrial lubricants  
**H1** Industrial and Pharma-Grade White Oil  
**Opening** Nexchem lists industrial and pharma-grade white oils. Ask for the grade specification that applies to your process before ordering.  
**Applications** The industrial listing covers plastics, textiles and general processing. The pharma-grade listing covers pharmaceutical and personal care enquiries. Confirm suitability against your own specification and the supplied product documentation.  
**Packaging and availability** Ask for pack sizes and availability by grade and order quantity.  
**Documentation** Request the TDS and SDS for the grade you are considering. Ask which applicable specification is supported by the supplied documents.  
**FAQ** Are the two grades interchangeable? Confirm the specification for your application before choosing a grade.  
**Buttons** Request industrial white oil quote and Request pharma-grade white oil quote. Use the existing quote form with the chosen grade preselected.  
**Closing** Tell Nexchem the grade, application, quantity and delivery location.  
**Evidence** [Nexchem lubricant catalogue](https://nexchem.pk/Industrial-Lubricants.html) and the [joint brochure](https://nexchem.pk/assets/img/ISL-LCH%20Brochure.pdf). Pharmacopeial compliance and viscosity values require grade-specific documentation.

### Proposed example C — TPR Adhesive

**URL** /products/tpr-adhesive.html  
**SEO title** TPR Adhesive for Footwear Lamination | Nexchem  
**Meta description** Ask Nexchem about TPR Adhesive, also listed as Diamond Solution, for footwear lamination. Request pricing, available packaging and the TDS.  
**Eyebrow** Industrial adhesives  
**H1** TPR Adhesive, Diamond Solution  
**Opening** Nexchem lists Diamond Solution as a TPR adhesive for lamination in footwear and sports goods manufacturing.  
**Application** Share the two materials you need to bond and your production process. Confirm suitability with the current TDS and a trial before changing your process.  
**Packaging and availability** Ask about pack sizes, sample availability and lead times.  
**FAQ** What should I send when asking about TPR adhesive? Include the substrates, application method, quantity and any curing conditions or performance requirements.  
**Buttons** Request pricing and Request TDS, with TPR Adhesive and Diamond Solution in the enquiry text.  
**Closing** Share your substrate and process details with Nexchem before selecting an adhesive.  
**Evidence** [Nexchem adhesive catalogue](https://nexchem.pk/Industrial-Adhesives.html) and the [joint brochure](https://nexchem.pk/assets/img/ISL-LCH%20Brochure.pdf).

## 5. Business details to confirm

- The joint brochure gives the ISL and LCH names, describes them as sister companies, and dates them to 2010. Confirm separate legal identities, category ownership, billing entities, documentation responsibilities and public-facing brand relationship. Confirm the current status of the Sialkot office before adding it to Nexchem's public entity data.
- The Lahore address agrees between the brochure and Contact Us. Confirm the official listing, map pin and holiday hours. Public search exposed the Nexchem contact page, but did not establish a verified business profile or its management status.
- Confirm the landline, mobile +92 332 3533800, form WhatsApp +92 332 8737406 and the separate Adhesives pricing/TDS WhatsApp route +92 334 4478886. Confirm whether info@nexchem.pk.com is monitored and how it relates to the brochure email info@islchemicals.com. The production and local contact paths differ and ownership could not be independently verified.
- Supply current ISO 9001 certificate and scope, test-method and quality records, and evidence for any sponsor, service-hours or performance claims before promoting them in copy or markup. The existing certification badges and sponsor artwork require separate approval to alter.
- Supply current grade-specific SDS/TDS, CAS and composition for Prop-BH and T-20, exact Perklone grade, IPA concentrations, white oil grades/specifications, approved pack sizes, minimum orders and lead times. Confirm any legacy technical claims against these documents.
- Supply original Nexchem customer reviews, product context and approved attribution before adding testimonials. No review or aggregate rating markup was added.

## 6. Implementation and verification backlog

| Priority | Impact / effort | URL or template | Action and verification |
|---|---|---|---|
| P0 | High / low | All ten routes | Deploy the static HTML and new root discovery files. Compare source canonical, description and JSON-LD to rendered output. Request every canonical and image sitemap asset on production. |
| P0 | High / host access | www, HTTP, /index.html | Configure one-hop permanent redirects to bare HTTPS and / where appropriate. Verify with headers, check current 404 behaviour and retain case-sensitive product URLs. |
| P0 | High / owner input | /contact.html, sitewide footer, product form routing | Confirm contact identities and each WhatsApp destination. Test drafts with sample data and confirm the intended destination before sending any test messages. |
| P1 | High / Search Console access | Sitemap and production routes | Submit sitemap index, inspect home and category URLs, check selected canonicals and exclusions, and review indexing and impressions by route. |
| P1 | Medium / owner input | /Testing-Facility.html and relevant product entries | Attach approved SDS/TDS files with version dates and grade context. Check HTTP status, readable PDF text and matching product identity. |
| P1 | Medium / analytics access | Quote buttons, documentation links, directions | Track catalogue product selection, valid form submission and outbound WhatsApp opens separately. Never capture names, emails, phone numbers or message content in analytics. Count confirmed enquiries separately from outbound clicks. |
| P1 | Medium / medium | Homepage, catalogues and Contact Us | Check actual mobile devices and keyboard focus, product dialog open/close and focus return, form validation and correct product preselection, and directions with Google Maps loaded. Recheck field CWV after deployment. |
| P2 | Medium / approval and documents | Proposed product detail pages | Create and link the detail pages only after approving the template and evidence. Verify unique canonicals, source HTML and direct internal links. |

**Structured data applied locally** includes WebSite and Organization on the homepage and appropriate page types elsewhere. The Organization uses the published Lahore address, without unresolved contact details. Google has retired FAQ rich results and its product-snippet eligibility requires supported product evidence such as offers, reviews or aggregate ratings. The existing quote-only listings should not be given invented price, availability or rating data. Google’s AI search guidance does not require a separate schema or llms.txt. The latter is a supplemental navigation file. [Google Search updates](https://developers.google.com/search/updates), [product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet), [image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

### Visual proposals requiring approval

- **/products/ethyl-acetate.html, /products/isopropyl-alcohol.html, /products/white-oil.html and /products/tpr-adhesive.html.** New routes and a detail template would serve distinct buyer queries and make approved documentation easier to link.
- **/faq.html.** Replace the legacy video artwork and nonfunctional play control when a genuine company video is supplied, or approve converting it into a static documentation link. The current layout and control were preserved.
- **/ and /about.html.** Replace or remove sponsor imagery, certification badges or other remaining claims only after verifying the underlying relationships and approvals. The existing review section can accept real testimonials once supplied.
- **Product categories.** Consider adding document or grade comparison blocks only when the underlying data is available. Existing cards, pop-ups and forms already support the core quote journey.

The work was applied to the workspace. Production deployment and Search Console, analytics, business profile and hosting updates remain separate.

## Local verification completed

- Parsed ten unique titles, descriptions and canonicals, plus ten page JSON-LD graphs. Checked that Open Graph URLs match canonicals.
- Parsed all three XML files. Main sitemap URLs exactly match the ten canonicals. All 31 image sitemap entries resolve to project assets.
- Checked static local links and fragments, missing image alt attributes and duplicate IDs. Placeholder controls that have no destination are noted separately.
- Rendered all ten pages in Chrome at 320, 390 and 1440 px. Checked the solvent dialog with Escape, lubricant card preselection, the generated WhatsApp draft and the contact directions URL. The two buttons next to signature images needed shorter visible labels to fit the existing narrow layout. Their final labels passed at all three widths.
- Better Design did not return an automated review because its quota was exhausted. Browser checks were used instead.
