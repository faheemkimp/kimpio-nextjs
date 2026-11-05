# kimp.io Redesign: Site Structure & SEO Preservation Plan

**Status:** Draft for approval. Redesign work starts only after this document is approved.
**Baseline captured:** 4 November 2026, from the live site https://www.kimp.io and the theme backup `kimpan_2025`.
**Main rule:** for kimp.io, every SEO signal Google sees today must be identical after a page is redesigned, unless a change is explicitly approved in [Section 10](#10-decisions-needed).

---

## Contents

1. [Site structure and URL inventory](#1-site-structure-and-url-inventory)
2. [Live SEO baseline: what kimp.io outputs today](#2-live-seo-baseline-what-kimpio-outputs-today)
3. [Existing SEO issues on the live site (not changed without approval)](#3-existing-seo-issues-on-the-live-site-not-changed-without-approval)
4. [SEO rules for every redesigned page](#4-seo-rules-for-every-redesigned-page)
5. [WordPress content connections](#5-wordpress-content-connections)
6. [Tracking, analytics and integrations to keep](#6-tracking-analytics-and-integrations-to-keep)
7. [Scope: what this project is and is not](#7-scope-what-this-project-is-and-is-not)
8. [How the page-by-page redesign works](#8-how-the-page-by-page-redesign-works)
9. [Per-page launch checklist and validation](#9-per-page-launch-checklist-and-validation)
10. [Decisions needed](#10-decisions-needed)
11. [Security notes found during the audit](#11-security-notes-found-during-the-audit)
- [Appendix A: Live SEO values for every page (`page-sitemap.xml`)](#appendix-a-live-seo-values-for-every-page-page-sitemapxml)
- [Appendix B: Audit files in this repository](#appendix-b-audit-files-in-this-repository)

---

## 1. Site structure and URL inventory

### 1.1 Totals (from the live Yoast sitemap index)

| Sitemap | URLs | URL pattern |
|---|---:|---|
| `post-sitemap.xml` + `post-sitemap2.xml` | 1,357 | `/{post-slug}/` (blog posts at the site root) |
| `page-sitemap.xml` | 98 | `/{page}/` and `/{parent}/{child}/` |
| `casestudy-sitemap.xml` | 13 | `/case-study/` and `/case-study/{slug}/` |
| `enterprise-case-sitemap.xml` | 12 | `/enterprise-case/{slug}/` |
| `allcanvafaq-sitemap.xml` | 18 | `/allcanvafaq/{slug}/` |
| `video_portfolio-sitemap.xml` | 13 | `/video_portfolio/{slug}/` |
| `allvideoportfolio-category-sitemap.xml` | 13 | `/allvideoportfolio-category/{slug}/` |
| `category-sitemap.xml` | 17 | `/category/{slug}/` |
| `post_tag-sitemap.xml` | 73 | `/tag/{slug}/` |
| `author-sitemap.xml` | 3 | `/author/{slug}/` |
| **Total** | **≈1,628** | |

WordPress also has 42 pages that are **not** in the sitemap (checkout, cart, account sub-pages, old variants, internal tools). Most are `noindex`. They stay on WordPress unchanged.

### 1.2 Site organisation (main navigation, as live today)

Logged-out main menu (from the live header):

- **Services:** Kimp Graphics `/graphic-design-services/` · Kimp Video `/video-design-services/` · Salary Cost Calculator `/salary-cost-calculator/`
- **KIMP360:** About the Platform `/kimp360-platform/` · Platform Updates `/kimp360-product-updates/`
- **Pricing:** `/pricing/`
- **Our Work:** Graphics Samples `/our-work/` · Video Samples `/our-work/video-samples/` · Us vs. Them `/compare-service/` · Testimonials `/reviews/` · Case Studies `/case-study`
- **Kimp For:** Agencies `/white-label-graphic-design/` · Entrepreneurs `/entrepreneurs/` · Fitness/Health Brands `/fitness-health-brands/` · Professional Services `/professional-services/`
- **FAQ:** `/faq/`
- **More:** About Us `/about-us/` · Contact Us `/contact-us/` · Blog `/blog/` · Book A Call `/book-a-call/` · Affiliates `/affiliates/` · Design Categories `/design-categories/` · Brand Assets `/brand-assets/` · Media Kit (PDF `/media-kit/KimpSales-Marketing-MediaKit-AN-2025-V3.pdf`) · Careers `/careers/`
- **Buttons:** Start Free Trial `/register-now/` · Schedule Demo `/book-a-call/` · Sign in `/my-account/`

Logged-in visitors get a different WordPress menu (`login-main-menu`).

Footer menus (WordPress menus "Footer Menu 1/2/3"):

- **Service:** Pricing · Our Work · FAQ
- **Company:** About Us · Book A Call · Brand Assets · Media Kit · Blog
- **Others:** Contact Us · Affiliates · Careers · Design Categories · Cookie Policy (EU)
- **Bottom bar:** Privacy policy `/privacy-policy` · Terms of services `/terms-of-service` · LLM Guidance `/llm-information-guidance`
- Social: Facebook, Instagram, LinkedIn. Contact: hello@kimp.io, 1-800-946-9778. Address: 7030 Woodbine Avenue, Suite 500, Markham ON, L3R 6G2, Canada. Logos: "In Collaboration With" Yspace, Microsoft.

### 1.3 Page groups

| Group | Pages | Redesign phase |
|---|---|---|
| Home | `/` | Phase 1 |
| Core sales pages | `/pricing/`, `/graphic-design-services/`, `/video-design-services/`, `/canva-designers/`, `/white-label-graphic-design/` | Phase 1–2 |
| Trust & proof | `/about-us/`, `/reviews/`, `/compare-service/`, `/our-work/`, `/our-work/video-samples/` | Phase 2 |
| KIMP360 | `/kimp360-platform/`, `/kimp360-product-updates/` | Phase 2 |
| Audience landing pages | `/entrepreneurs/`, `/fitness-health-brands/`, `/professional-services/`, `/small-business/`, `/startups/`, `/marketing/`, `/enterprise-clients/`, `/yspace/` | Phase 3 |
| Company | `/contact-us/`, `/faq/`, `/careers/` (+5 roles), `/brand-assets/`, `/affiliates/`, `/design-categories/`, `/salary-cost-calculator/` | Phase 3 |
| Legal | `/privacy-policy/`, `/terms-of-services/`, `/cookie-policy-eu/`, `/llm-information-guidance/` | Phase 3 |
| Campaigns | `/black-friday-sale/`, `/internet-marketing-deals/`, `/save-more-plans*/`, `/visa-plans/` | On request |
| **WordPress content (not redesigned now)** | Blog, categories, tags, authors, case studies, enterprise cases, Canva FAQ, video portfolio | Later, separate approval |
| **WordPress app flows (never redesigned in this project)** | `/register-now/`, booking/demo/confirm pages, checkout, `/my-account/` and all subscription pages, affiliate area | Stay on WordPress |

---

## 2. Live SEO baseline: what kimp.io outputs today

### 2.1 Global settings

| Setting | Live value |
|---|---|
| SEO plugin | Yoast SEO Premium v25.2 (Yoast SEO v28.8) |
| Domain | `https://www.kimp.io` (www, HTTPS) |
| Trailing slash | All URLs end with `/`. `/pricing` → **301** → `/pricing/` |
| Language | `<html lang="en-US">`, `og:locale` = `en_US` |
| Title pattern | `{Page title} - Kimp` (some pages have custom titles, see Appendix A) |
| Site name | `og:site_name` = `Kimp` |
| Twitter card | `summary_large_image` |
| Search Console | `<meta name="google-site-verification" content="feAl1hPD-VEmi0OtnJHhF1LcW8y7ppSIGrSlKljjIIY">` (hardcoded in the theme header on marketing pages) |
| Favicons | Theme `favicon.png` + WordPress site icon `cropped-favicon2` (32×32, 192×192, apple-touch 180×180) |
| hreflang | None (English only) |
| Server | Cloudflare in front of WordPress, WP Rocket page cache |

### 2.2 `robots.txt` (kept exactly)

```
User-agent: *
Allow: /
Disallow: /wp-login.php
Disallow: /register-new
Disallow: /service-plans
Disallow: /service-plans-upgrade
Disallow: /invoice-download
Disallow: /book-a-call-introductory
Disallow: /v1
Disallow: /v2
Disallow: /v3
Disallow: /new-clients

Sitemap: https://www.kimp.io/sitemap_index.xml
```

### 2.3 Sitemaps (kept exactly)

`https://www.kimp.io/sitemap_index.xml` (Yoast) → `post-sitemap.xml`, `post-sitemap2.xml`, `page-sitemap.xml`, `casestudy-sitemap.xml`, `allcanvafaq-sitemap.xml`, `video_portfolio-sitemap.xml`, `enterprise-case-sitemap.xml`, `category-sitemap.xml`, `post_tag-sitemap.xml`, `allvideoportfolio-category-sitemap.xml`, `author-sitemap.xml`.

Yoast keeps generating these. Redesigned pages keep the same URLs, so the sitemaps stay correct without any change.

### 2.4 Exact head tags per page type (live, in order)

**Homepage `/`**
```html
<meta name="google-site-verification" content="feAl1hPD-VEmi0OtnJHhF1LcW8y7ppSIGrSlKljjIIY" />
<meta property="og:image" content="https://www.kimp.io/wp-content/themes/kimpan_2023/assets/images/meta-icon.png" />
<link rel="icon" type="image/png" href=".../kimpan_2025/assets/images/favicon.png" />
<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
<title>Kimp - Unlimited Graphic Design &amp; Video Design - Flat Fee Subscriptions</title>
<meta property="og:locale" content="en_US" />
<meta property="og:site_name" content="Kimp" />
<meta property="article:modified_time" content="2022-02-25T05:06:41+00:00" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<link rel="icon" href=".../2023/05/cropped-favicon2-32x32.png" sizes="32x32" />
<link rel="icon" href=".../2023/05/cropped-favicon2-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon" href=".../2023/05/cropped-favicon2-180x180.png" />
<meta property="og:title" content="Kimp - Unlimited Graphic Design &amp; Video Design - Flat Fee Subscriptions">
<meta name="twitter:title" content="(same as og:title)">
<meta name="description" content="Get unlimited graphic design &amp; unlimited video design for a flat monthly fee. Start a free trial to see how a dedicated design team scales your marketing.">
<meta property="og:description" content="(same as description)">
<meta name="twitter:description" content="(same as description)">
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```
No canonical, no `og:url`, no JSON-LD.

**Standard marketing page** (e.g. `/pricing/`): same set as the homepage, except `og:type` = `article`, no `og:image:width/height/type`, and its own title/description/`article:modified_time`.

**Blog post** (e.g. `/custom-logo/`): generic `og:image` (meta-icon), robots, title, `og:locale`, `og:site_name`, `article:published_time`, `article:modified_time`, `og:image:width/height/type`, `twitter:label1` "Written by" / `twitter:data1` author, `twitter:label2` "Est. reading time" / `twitter:data2`, site icons, description, `og:description`, `twitter:description`, `og:type` = `article`, `twitter:card`. No canonical, no `og:title`, no `og:url`, no JSON-LD. (Blog stays on WordPress in this phase.)

**Case study** (e.g. `/case-study/bdyc/`): generic `og:image`, robots, title `BDYC - Kimp`, `og:locale`, `og:site_name`, `og:type` = `article`, `twitter:card`. No description, no canonical, no JSON-LD.

**Category** (e.g. `/category/branding/`): title `Branding Archives - Kimp`, `og:title`/`twitter:title` "Branding", otherwise as above.

**Account pages** (e.g. `/my-account/`): `robots` = `noindex, follow`.

### 2.5 Crawl summary (312 URLs crawled: all non-post URLs + 40 sample posts + `/blog/`)

| Check | Result |
|---|---|
| HTTP 200 | 308 (297 HTML pages + 11 sitemap XML files) |
| HTTP 500 | 4: `/upgrade-plans/`, `/downgrade-upgrade-plan/`, `/change-payment-method/`, `/our-work-old/` |
| Redirect inside sitemap | `/upgrade-downgrade-plan/` → `/my-subscriptions/` |
| Canonical tag present | **5 of 297** (`/blog/`, `/case-study/`, 3 author pages) |
| JSON-LD structured data present | **5 of 297** (same pages) |
| Meta description present | 48 of 297 HTML pages |
| Exactly one H1 | 92 pages; **201 have no H1**; 4 have several |
| Images without alt text | 5,271 of 12,123 (43%) |
| `noindex` URLs in sitemap | 1 (`/my-account/`) |
| Duplicate titles | `My Subscriptions - Kimp` on `/my-subscriptions/` and `/upgrade-downgrade-plan/` |

### 2.6 What Yoast has configured (WordPress REST API, not currently all output)

Yoast's data in WordPress is complete and correct. For every URL it holds a self-referencing canonical, `og:url`, the correct `og:image` (featured image for posts), and a full schema graph. For posts that is Article, WebPage (95 as FAQPage), BreadcrumbList, ImageObject, Organization, WebSite and Person, with 369 FAQ Question items. Something on the live stack (a plugin, filter or optimisation setting, not the theme) removes most of these tags from the HTML. Of the 1,357 posts, 1,356 are `index` and 1 is `noindex`, and 48 have no meta description.

---

## 3. Existing SEO issues on the live site (not changed without approval)

These are documented so the team knows the current state. **By default the redesign reproduces today's output exactly.** Each item is only changed if approved in [Section 10](#10-decisions-needed).

| # | Issue | Impact | Recommendation |
|---|---|---|---|
| 1 | No canonical tag on 292 of 297 pages | Google picks canonicals itself; parameter/duplicate URLs can split signals | Output Yoast's self-referencing canonical (same URL as today, so no ranking risk) |
| 2 | No structured data on 292 of 297 pages | No Organization/WebSite/Breadcrumb/FAQ rich results | Output Yoast's schema graph |
| 3 | Every page's first `og:image` is the generic `meta-icon.png`; the theme hardcodes it before Yoast | Same preview image for every share; posts lose their featured image | Use Yoast's `og:image` per page |
| 4 | No `og:url` / no `og:title` on many pages | Weaker social previews | Use Yoast's values |
| 5 | 201 pages have no H1 (main heading is an H2) | Weaker heading structure | Make the existing main heading text the single H1 (same words, new tag level) |
| 6 | Most pages have no meta description | Google writes its own snippet | SEO team adds descriptions in Yoast (content task, not code) |
| 7 | 43% of images have no alt text; some client logos are mislabeled (alt "Greentoe" shows the Abbott logo, alt "Market Health" shows the Aldi logo) | Accessibility and image search | Correct alt text on redesigned pages |
| 8 | Sitemap lists ~30 logged-in/app pages as indexable (e.g. `/my-cards/`, `/my-subscriptions/`, `/edit-my-account/`, `/service-plans/`), and 4 of them return 500 | Crawl budget and index quality | Set these to `noindex` in Yoast (WordPress setting) |
| 9 | `/service-plans/` and `/service-plans-upgrade/` are in the sitemap but blocked in `robots.txt` | Conflicting signals | Remove them from the sitemap via Yoast |
| 10 | Footer links to `/terms-of-service` (301 → `/terms-of-services/`) and other internal links use URLs without a trailing slash (e.g. `/book-a-call`, `/register-now`) | An extra redirect hop on every click/crawl | Link directly to the final URL with a trailing slash |
| 11 | Blog pagination works only via JavaScript (admin-ajax); `/category/{slug}/page/2/` returns 404 | Older posts are hard for Google to discover | Out of scope now (blog stays on WordPress) |
| 12 | Test/old pages are indexable and in the sitemap: `/home-new/`, `/compare-v1/`, `/register-now-old/`, `/our-work-old/…`, `/case-study-patterns/` | Thin or duplicate content | Decide per page: noindex or keep |
| 13 | `page-sitemap.xml` lists `/` twice | Harmless, untidy | No action needed |

Items 6, 8, 9 and 12 are WordPress/Yoast settings and need no code.

---

## 4. SEO rules for every redesigned page

Each redesigned page must match its live version on every item below before it goes live. The live values are recorded in [Section 2](#2-live-seo-baseline-what-kimpio-outputs-today) and [Appendix A](#appendix-a-live-seo-values-for-every-page-page-sitemapxml).

| # | Item | Rule |
|---|---|---|
| 1 | URL | Byte-identical path, lowercase, with trailing `/`. The non-slash version keeps 301-redirecting to the slash version. |
| 2 | HTTP status | `200` for live pages. No new redirect hops. |
| 3 | `<title>` | Identical text, pulled from the same Yoast field in WordPress. |
| 4 | Meta description | Identical. Pages that have none today keep having none unless approved. |
| 5 | Meta robots | Identical (`index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` on public pages; `noindex, follow` where set today). No accidental `noindex`. |
| 6 | Canonical | Same as live (see [Section 3, issue 1](#3-existing-seo-issues-on-the-live-site-not-changed-without-approval)). |
| 7 | Open Graph / Twitter tags | Same tags and values (`og:locale`, `og:site_name`, `og:type`, `og:title`, `og:description`, `og:image`, `twitter:card`, etc.). |
| 8 | Structured data | Same as live (see [Section 3, issue 2](#3-existing-seo-issues-on-the-live-site-not-changed-without-approval)). |
| 9 | Headings | The same heading text keeps the same level (H1/H2/H3). Copy is not rewritten. |
| 10 | Body content | All existing text, FAQs, lists, prices, testimonials and images kept. Nothing valuable removed. |
| 11 | Internal links | Every link on the live page is still present with the same destination URL. Header and footer menus keep all their links. |
| 12 | Image alt text | Kept (or corrected where it is wrong today, if approved). |
| 13 | `lang` | `<html lang="en-US">`, same as today. |
| 14 | Verification and favicon | `google-site-verification` meta and the same favicons/site icons. |
| 15 | Tracking | GTM container, dataLayer variables and consent events identical (see [Section 6](#6-tracking-analytics-and-integrations-to-keep)). |
| 16 | Performance | Must be equal or better than today (Core Web Vitals). |

SEO values are **read from Yoast in WordPress at build/render time** (the same data Yoast already manages), with a saved copy of the live values (`src/data/seo-baseline.json`) as a fallback. The SEO team keeps editing titles and descriptions in WordPress exactly as today.

---

## 5. WordPress content connections

### 5.1 How content is stored and served

| Content | WordPress type | URL | REST API | In this phase |
|---|---|---|---|---|
| Blog posts (1,357) | `post` | `/{slug}/` | ✅ `/wp-json/wp/v2/posts` (with `yoast_head_json`) | Served by WordPress, unchanged |
| Blog index | page "Blog" (posts page) | `/blog/` | ✅ | Served by WordPress, unchanged |
| Categories (17) | `category` | `/category/{slug}/` | ✅ `/wp/v2/categories` | Served by WordPress, unchanged |
| Tags (73 in sitemap) | `post_tag` | `/tag/{slug}/` | ✅ `/wp/v2/tags` | Served by WordPress, unchanged |
| Authors (3) | user | `/author/{slug}/` | ✅ `/wp/v2/users` | Served by WordPress, unchanged |
| Case studies (13) | `casestudy` CPT + hardcoded templates (`template-casestudy_*.php`) | `/case-study/{slug}/` | ❌ not exposed | Served by WordPress, unchanged |
| Enterprise cases (12) | `enterprise-case` CPT | `/enterprise-case/{slug}/` | ✅ `/wp/v2/enterprise-case` | Served by WordPress, unchanged |
| Canva FAQs (18) | `allcanvafaq` CPT | `/allcanvafaq/{slug}/` | ❌ | Served by WordPress, unchanged |
| Video portfolio (13 + 13 categories) | `video_portfolio` CPT + taxonomy | `/video_portfolio/…`, `/allvideoportfolio-category/…` | ❌ | Served by WordPress, unchanged |
| Pages (140) | `page` + PHP page templates | various | ✅ `/wp/v2/pages` (content mostly lives in PHP templates, not the editor) | Redesigned one by one |

Yoast metadata for **any** URL (including CPTs not in REST) is available from `GET /wp-json/yoast/v1/get_head?url=…`. Redesigned pages read their SEO from there.

When the blog/case studies are redesigned later (separate approval), the same URLs are kept. The `casestudy`, `allcanvafaq` and `video_portfolio` post types will need `show_in_rest` enabled in WordPress first (a settings change, no URL change).

### 5.2 Dynamic data on marketing pages (must keep working)

| Feature | Where | How it works today |
|---|---|---|
| Plan prices & offers | Home, Pricing | `POST /wp-admin/admin-ajax.php` `action=offerSaleNew` (or `offerSaleNewVisa` if cookie `kimp-visa-coupon=visaoffer`), with currency from cookie `user-location-currency`. Returns the offer banner + Graphics / Video / Graphics+Video prices (e.g. USD 698.50 first 4 months, regular USD 1397/mo; G+V USD 848.50 / USD 1697). |
| Currency detection | All pages | Client-side ipapi.co lookup sets `user-location-currency` (usd, gbp, cad, aud, sgd, myr, eur) |
| Blog list / filters | `/blog/` | `admin-ajax` `kimp_blog_list2` (12 per page) |
| FAQ search | `/faq/` | `admin-ajax` `getfaqs`, `searchfaqs` |
| Testimonials | `/reviews/` | `admin-ajax` `getnexttestimonials` |
| Forms | Contact, booking, sign-up | Gravity Forms + reCAPTCHA (CAPTCHA 4WP), Calendly, Stripe |
| Latest blog posts | Home | 7 latest posts linked from the homepage |
| Menus | Header/footer | WordPress menus (logged-in vs logged-out) |

The redesigned pages will call the same WordPress endpoints, so prices, offers and currencies stay managed in WordPress.

---

## 6. Tracking, analytics and integrations to keep

| Item | Live implementation | Redesign requirement |
|---|---|---|
| Google Tag Manager | `GTM-5VVGLH4` via the GTM4WP plugin | Same container ID, loaded in `<head>`, plus the `<noscript>` iframe |
| GTM4WP dataLayer | `visitorLoginState`, `visitorRegistrationDate`, `pagePostType` (`frontpage`/`page`/`post`), `pagePostType2` (`single-page`/`single-post`), `pageCategory` (posts) | Push the same variables with the same values per page type |
| GA4 / Ads / pixels | Configured inside GTM | No change (inherited from GTM) |
| Cookie consent | Complianz 7.4.2: opt-in, GeoIP on, categories functional/preferences/statistics/marketing, cookies `cmplz_*`, GTM events `cmplz_event_<category>` | Same cookie names and the same GTM events so existing GTM triggers keep firing |
| Live chat | Crisp | Same widget |
| Hyros, RB2B | Header Footer Code Manager snippets | Same snippets (exact code to be copied from WP admin → HFCM) |
| Zoho PageSense | Plugin | Same script |
| Outbrain pixel | Theme footer (`OB_ADV_ID 001307ed8642b9986247c44d4f84966db2`) on pages using `footer.php` | Same pages keep it |
| First-visit attribution | `admin-ajax` `setmyidentity` (fingerprint + referrer + landing URL) on pages using `footer.php`/`footer-classic` | Keep on the same page types |
| Visitor cookies | `user-location-currency`, `kimp-coupon`, `kimp-visa-coupon`, `kimp_visitor_identity2`, `kimp_source_identity`, `kimp-referrer` | Never renamed; WordPress checkout reads them |
| Affiliate tracking | AffiliateWP (referral links with `?ref=`) | Referral landings keep being handled by WordPress |
| Search Console | Verification meta tag (above) | Kept |

---

## 7. Scope: what this project is and is not

**It is:** a visual redesign of kimp.io using Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui and modern animations, done one page at a time.

**It is not:** a migration. Specifically:

| Stays exactly as it is | Why |
|---|---|
| Every URL and slug, including the trailing `/` | Rankings and backlinks are tied to exact URLs |
| WordPress as the CMS | The team keeps editing content and Yoast SEO in WordPress |
| Blog posts, categories, tags, authors | Content keeps coming from WordPress; not rebuilt in this phase |
| Case studies and enterprise cases | Content keeps coming from WordPress; not rebuilt in this phase |
| Sign-up, checkout, Stripe, My Account, bookings, affiliate area | Business-critical WordPress/WooCommerce/Stripe flows; untouched |
| Yoast sitemaps and `robots.txt` | Served exactly as today |
| Google Tag Manager and all tracking | Same container, same data, same events |

No URL is renamed, removed or redirected as part of this project, so **no new 301 redirects are needed**.

---

## 8. How the page-by-page redesign works

1. **Next.js sits in front of kimp.io.** For each request it checks a short list of redesigned pages.
   - **Redesigned page** → rendered by Next.js with the new design, at the exact same URL, with SEO from Yoast.
   - **Anything else** (blog, case studies, account, checkout, forms, `wp-admin`, `wp-json`, sitemaps, feeds, images in `/wp-content/`) → passed straight to WordPress, unchanged.
2. **Going live with a page** = adding its URL to the redesigned list. **Rolling back** = removing it. No URL ever changes and nothing can 404.
3. **WordPress keeps running** on its own hostname (for example `cms.kimp.io`). Its Site URL stays `https://www.kimp.io`, so every link and canonical it generates still points at www.kimp.io.
4. **Visitor IP and cookies are passed through** to WordPress. The theme reads `CF-Connecting-IP` for geo, attribution and fraud checks, so the WordPress hostname must not be re-proxied through Cloudflare.
5. **Shared header and footer.** Redesigned pages get the new header and footer with all the same links. Pages still on WordPress keep the old design until they are redesigned. The highest-traffic pages go first to keep this mixed period short.
6. **Performance targets:** static rendering with periodic refresh, optimised images (AVIF/WebP), self-hosted Gilroy font (same brand font), animations that respect "reduced motion", and no jQuery.

---

## 9. Per-page launch checklist and validation

Before any redesigned page goes live:

- [ ] Automated comparison against the saved baseline (`scripts/seo-baseline/crawl.py` run against the new page) shows identical: status, title, description, robots, canonical, OG/Twitter tags, JSON-LD types.
- [ ] Heading text and levels match the live page (or approved H1 change).
- [ ] All internal links from the live page are present with the same URLs.
- [ ] All copy, FAQs, prices, testimonials and images are present; alt text present.
- [ ] No `noindex` anywhere on the page or in `X-Robots-Tag` headers.
- [ ] GTM loads, dataLayer variables match, consent events fire, Crisp loads.
- [ ] Prices/offers load from WordPress in USD and at least one other currency.
- [ ] `/page` (no slash) → 301 → `/page/`.
- [ ] Lighthouse/PageSpeed: performance, accessibility and SEO scores equal or better than the live page; Core Web Vitals in the green.
- [ ] Mobile, tablet and desktop checked; keyboard navigation and screen-reader labels checked.
- [ ] After launch: URL Inspection in Search Console, then monitor that page's impressions, clicks and position for 2–4 weeks.

---

## 10. Decisions needed

| # | Decision | Default if not decided |
|---|---|---|
| D1 | Reproduce the live head tags exactly, **or** output Yoast's full intended set (self-canonical, `og:url`, correct `og:image`, JSON-LD schema)? See Section 3, issues 1–4. | **Decided (4 Nov 2026): live tags + Yoast's missing tags.** Same title, description and robots as live, plus Yoast's self-referencing canonical, `og:url` and schema graph. |
| D2 | Make the existing main heading the single H1 on pages that have none (same words)? | Keep current heading levels |
| D3 | Correct wrong/missing image alt text on redesigned pages? | Keep current alt text |
| D4 | Link internally to final URLs (trailing slash, `/terms-of-services/`) instead of redirecting URLs? | Keep current link URLs |
| D5 | Hostname for the WordPress origin (e.g. `cms.kimp.io`, not proxied by Cloudflare) | Needed before the first page goes live |
| D6 | Redesign order: proposed Home → Header/Footer → Pricing → Graphic Design Services → Video Design Services → About Us → others | As proposed |
| D7 | WordPress-side SEO clean-up (Section 3, items 6, 8, 9, 12) | Not done |

---

## 11. Security notes found during the audit

Not part of the redesign, but should be fixed by the WordPress team:

- `footer.php` contains a hardcoded ipstack API key (`access_key=…`). Move it to server config and rotate it.
- `location-check.php` exposes an ipapi.co API key in page source. Rotate it.
- `setmyidentity` (in `functions.php`) puts the `finger` POST value straight into an SQL query (SQL injection). Use `$wpdb->prepare()`.

---

## Appendix A: Live SEO values for every page (`page-sitemap.xml`)

Captured 4 November 2026. "H1s" = number of `<h1>` elements on the live page. "—" = not present.

| # | URL | Status | Title (live) | Meta description (live) | Robots | H1s | Template |
|---|---|---|---|---|---|---|---|
| 1 | `/` | 200 | Kimp - Unlimited Graphic Design & Video Design - Flat Fee Subscriptions | Get unlimited graphic design & unlimited video design for a flat monthly fee. Start a free trial to see how a dedicated design team scales your marketing. | index | 1 | template-front.php |
| 2 | `/yspace/` | 200 | yspace - Kimp | — | index | 0 | template-landing.php |
| 3 | `/contact-us/` | 200 | Contact Us - Kimp | — | index | 0 | template-contact.php |
| 4 | `/my-account/` | 200 | My account - Kimp | — | noindex | 0 | template-woo-myaccount.php |
| 5 | `/internet-marketing-deals/` | 200 | Internet Marketing Deals - Kimp | — | index | 4 | template-offers.php |
| 6 | `/affiliate-area/` | 200 | Affiliate Area - Kimp | — | index | 0 | template-affliate_login.php |
| 7 | `/affiliate-creatives/` | 200 | Affiliate Creatives - Kimp | — | index | 0 | default |
| 8 | `/about-us/` | 200 | About Us - Kimp | — | index | 0 | template-about_us.php |
| 9 | `/careers/graphic-designer/` | 200 | Graphic Designer - Kimp | — | index | 1 | template-career_details.php |
| 10 | `/design-categories/` | 200 | Design Categories - Kimp | — | index | 0 | template-design_category.php |
| 11 | `/careers/project-manager/` | 200 | Project Manager - Kimp | — | index | 1 | template-career_pm_details.php |
| 12 | `/careers/content-writer/` | 200 | Content Writer - Kimp | — | index | 1 | template-career_cw_details.php |
| 13 | `/careers/motion-graphics-artist/` | 200 | Motion Graphics Artist - Kimp | — | index | 1 | template-career_mgd_details.php |
| 14 | `/careers/` | 200 | Careers - Kimp | — | index | 0 | template-career_landing.php |
| 15 | `/small-business/` | 200 | Small Business - Kimp | — | index | 1 | template-small_business.php |
| 16 | `/startups/` | 200 | Startups - Kimp | — | index | 1 | template-startup.php |
| 17 | `/marketing/` | 200 | Marketing - Kimp | — | index | 1 | template-marketing.php |
| 18 | `/careers/illustrator/` | 200 | Illustrator - Kimp | — | index | 1 | template-illustrator_details.php |
| 19 | `/my-account/cancel-my-subscription/` | 200 | Cancel My Subscription - Kimp | — | index | 0 | template-cancel-initiate-subscription.php |
| 20 | `/affiliates/` | 200 | Affiliates - Refer and Earn - Kimp | — | index | 0 | template-affnew.php |
| 21 | `/book-a-call/` | 200 | Book A Call - Kimp | — | index | 0 | template-book_a_call.php |
| 22 | `/faq/` | 200 | Kimp - FAQ | — | index | 0 | template-faq_new.php |
| 23 | `/brand-assets/` | 200 | Brand Assets - Kimp | — | index | 0 | template-presskit.php |
| 24 | `/confirm-booking/` | 200 | Confirm Booking - Kimp | — | index | 1 | template-confirm-booking.php |
| 25 | `/compare-service/` | 200 | Kimp vs. Others - Graphic Design & Video Design Services Comparison - Kimp | Compare Kimp with other Design Subscriptions and see why Kimp is the leading graphic design and video service and the best choice for your business. | index | 1 | template-compare.php |
| 26 | `/entrepreneurs/` | 200 | Graphic Design & Video Design for Entrepreneurs & Founders - Kimp | Unlimited graphic design and unlimited video design for Entreprenuers and Founders. Great design from Kimp can help you start and grow a business. | index | 0 | template-entrepreneurs.php |
| 27 | `/fitness-health-brands/` | 200 | Graphic Design & Video Design for Fitness & Health Brands - Kimp | Unlimited graphic design & unlimited video design for Fitness Brands, Health Brands and Gyms. Great design from Kimp can help you start and grow a business. | index | 0 | template-fitnessbrand.php |
| 28 | `/professional-services/` | 200 | Graphic Design & Video Design for Real Estate & Professional Services - Kimp | Get unlimited graphic design and unlimited video design for Real Estate Brands, Real Estate Agents, Doctors, Lawyers and other Professional Services. | index | 0 | template-professional-services.php |
| 29 | `/video-design-services/` | 200 | Unlimited Motion Graphic & Video Design Services \| 7 Day Free Trial | Get unlimited motion graphics services & video design services on a monthly subscription. Start a free trial to experience the leading video design service. | index | 0 | template-video.php |
| 30 | `/white-label-graphic-design/` | 200 | White Label Graphic Design Solutions for Marketing Agencies | Outsource your graphic designs to a dedicated design team. Scale your marketing agency like never before with Kimp's white label graphic design solutions. | index | 0 | template-agency.php |
| 31 | `/pricing/` | 200 | Kimp - Plans and Pricing \| Start Your 7 Day Free Trial | Get subscription-based graphic design and video design. Start your 7 day free trial and see how a dedicated design team can help you scale your marketing. | index | 0 | template-pricing.php |
| 32 | `/graphic-design-services/` | 200 | Graphic Design Services \| 7 Day Free Trial - Kimp | Get graphic design services on a flat-fee monthly subscription. Get a dedicated design team and experience the leading graphic design solution. | index | 0 | template-graphics.php |
| 33 | `/confirm-360-booking/` | 200 | Confirm 360 Booking - Kimp | — | index | 1 | template-confirm-booking-360.php |
| 34 | `/360-demo-booking/` | 200 | 360 demo booking - Kimp | — | index | 0 | template-book_a_call_360.php |
| 35 | `/reviews/` | 200 | Kimp Review - Kimp's Testimonials | Read the latest Kimp reviews from top-rated review platforms. Learn why brands and marketing agencies love us and why you will too! | index | 0 | template-testimonital.php |
| 36 | `/canva-designers/` | 200 | canva - Kimp | — | index | 0 | template-canva.php |
| 37 | `/know-about-enterprise-solution/` | 200 | Know about Enterprise Solution - Kimp | — | index | 0 | template-book_a_call_enterprise.php |
| 38 | `/canva-demo-call/` | 200 | Canva demo call - Kimp | — | index | 0 | template-book_a_call_canva.php |
| 39 | `/pause-subscription-confirm/` | 200 | Pause Subscription Confirm - Kimp | — | index | 0 | pause-subscription-confirm.php |
| 40 | `/initiate-cancel-subscription/` | 200 | Initiate cancel subscription - Kimp | — | index | 0 | template-initiate-cancelation.php |
| 41 | `/kimp360-platform/` | 200 | KIMP360-platform - Kimp | — | index | 0 | template-kimp360product.php |
| 42 | `/kimp360-product-updates/` | 200 | KIMP360-product-updates - Kimp | — | index | 0 | template-kimp360blogs.php |
| 43 | `/confirm-subscription-plan/` | 200 | Confirm Subscription Plan - Kimp | — | index | 0 | template-stripe-checkout.php |
| 44 | `/edit-my-account/` | 200 | Edit My Account - Kimp | — | index | 0 | templete-edit-my-account.php |
| 45 | `/manage-billing-address/` | 200 | Manage Billing Address - Kimp | — | index | 0 | template-manage-billing.php |
| 46 | `/my-cards/` | 200 | My Cards - Kimp | — | index | 0 | template-my-cards.php |
| 47 | `/my-dashboard/` | 200 | My Dashboard - Kimp | — | index | 1 | template-my-dashboard.php |
| 48 | `/my-questionnaire/` | 200 | My Questionnaire - Kimp | — | index | 0 | template-my-questionnaire.php |
| 49 | `/subscription-detail-view/` | 200 | My Subscription View - Kimp | — | index | 0 | template-subscription-detail-view.php |
| 50 | `/my-subscriptions/` | 200 | My Subscriptions - Kimp | — | index | 0 | template-my-subscriptions.php |
| 51 | `/pause-my-subscription/` | 200 | Pause My Subscription - Kimp | — | index | 0 | template-pause-my-subscription.php |
| 52 | `/resume-my-subscription/` | 200 | Resume my subscription - Kimp | — | index | 0 | template-resume-my-subscription.php |
| 53 | `/service-plans/` | 200 | Service Plans - Kimp | — | index | 0 | template-chooseplan.php |
| 54 | `/service-plans-upgrade/` | 200 | Service Plans Upgrade - Kimp | — | index | 0 | template-chooseplan-upgrade.php |
| 55 | `/start-cancel-subscription/` | 200 | Start Cancel Subscription - Kimp | — | index | 0 | template-start-cancel-subscription.php |
| 56 | `/upgrade-downgrade-plan/` | 200 | My Subscriptions - Kimp | — | index | 0 | template-upgrade-downgrade.php |
| 57 | `/upgrade-plans/` | 500 | — | — | — | 0 | template-upgrade-plans.php |
| 58 | `/downgrade-upgrade-plan/` | 500 | — | — | — | 0 | template-upgrade-degrade-plan.php |
| 59 | `/cancel-my-kimp-subscription/` | 200 | Cancel My Subscription Form - Kimp | — | index | 0 | template-cancel-my-subscription-form.php |
| 60 | `/our-work-old/video-samples-new/` | 200 | Video Samples New - Kimp | — | index | 0 | template-video-portfolio-new.php |
| 61 | `/change-payment-method/` | 500 | — | — | — | 0 | template-change-payment.php |
| 62 | `/register-now-old/` | 200 | Register Now - Kimp | — | index | 0 | template-register.php |
| 63 | `/register-now/` | 200 | Register New - Kimp | — | index | 0 | template-register-new.php |
| 64 | `/kimp-stripe-subscriptions/` | 200 | Kimp Stripe Subscriptions - Kimp | — | index | 0 | template-kimp-stripe-subscription.php |
| 65 | `/confirm-subscription/` | 200 | Confirm Subscription - Kimp | — | index | 0 | template-confirm-checkout.php |
| 66 | `/personalized-demo/` | 200 | personalized demo - Kimp | — | index | 0 | template-personalized-demo.php |
| 67 | `/personalized-schedule/` | 200 | personalized schedule - Kimp | — | index | 0 | template-personalized-shedule.php |
| 68 | `/visa-plans/` | 200 | Visa Plans - Kimp | — | index | 0 | template-visa-plan.php |
| 69 | `/our-work-old/` | 500 | — | — | — | 0 | template-our-portfolio.php |
| 70 | `/vip-pause/` | 200 | VIP Pause - Kimp | — | index | 0 | template-vip-pause.php |
| 71 | `/salary-cost-calculator/` | 200 | Salary Cost Calculator - Kimp | — | index | 0 | template-cost-calculator.php |
| 72 | `/save-more-plans-us/` | 200 | Save More plans US - Kimp | — | index | 0 | template-save-more-plans-us.php |
| 73 | `/my-referrals/` | 200 | My Referrals - Kimp | — | index | 0 | template-my-referrals.php |
| 74 | `/referral/` | 200 | Referral - Kimp | — | index | 1 | template-front.php |
| 75 | `/360-onboarding/` | 200 | 360 Onboarding - Kimp | — | index | 1 | template-onboarding.php |
| 76 | `/enterprise-clients/` | 200 | Enterprise Clients - Kimp | — | index | 1 | template-enterprise-new.php |
| 77 | `/enterprise-choose-plan/` | 200 | Enterprise Choose Plan - Kimp | — | index | 0 | template-enterprise-choose-plan.php |
| 78 | `/case-study-patterns/` | 200 | case-study-patterns - Kimp | — | index | 0 | default |
| 79 | `/enterprise-case-studies/` | 200 | Enterprise Case Studies - Kimp | — | index | 1 | template-casestudy-new-page.php |
| 80 | `/enterprise-casestudies/` | 200 | Enterprise CaseStudies - Kimp | — | index | 1 | template-enterprise-casestudy-list.php |
| 81 | `/confirm-enterprise-subscription-plan/` | 200 | Confirm Enterprise Subscription Plan - Kimp | — | index | 0 | template-enterprise-stripe-checkout.php |
| 82 | `/enterprise-schedule-demo/` | 200 | Enterprise Schedule Demo - Kimp | — | index | 0 | template-enterprise-personalized-demo.php |
| 83 | `/enterprise-schedule-calendar/` | 200 | Enterprise Schedule Calendar - Kimp | — | index | 0 | template-enterprise-personalized-shedule.php |
| 84 | `/enterprise-booking-confirmation/` | 200 | Enterprise Booking Confirmation - Kimp | — | index | 1 | template-enterprise-confirm-booking.php |
| 85 | `/cookie-policy-eu/` | 200 | Cookie Policy (EU) - Kimp | — | index | 1 | template-common.php |
| 86 | `/our-work/` | 200 | Graphics Works - Kimp | — | index | 1 | template-our-portfolio-new-design.php |
| 87 | `/terms-of-services/` | 200 | Terms Of Service - Kimp | — | index | 1 | template-common.php |
| 88 | `/black-friday-sale/` | 200 | Black Friday Sale - Kimp | — | index | 1 | template-black-friday.php |
| 89 | `/our-work/video-samples/` | 200 | Video Samples - Kimp | View some of Kimp's video & motion graphics designs, created for a wide range of clients. Check out these design samples to see what we can do for you. | index | 0 | template-video-portfolio.php |
| 90 | `/save-more-plans/` | 200 | Save More Plans - Kimp | — | index | 0 | template-save-more-plan.php |
| 91 | `/save-more-plans-legacy/` | 200 | Save more plans legacy - Kimp | — | index | 0 | template-save-more-plan-legacy.php |
| 92 | `/book-onboarding-call/` | 200 | Book Onboarding Call - Kimp | — | index | 0 | template-book_onboarding.php |
| 93 | `/llm-information-guidance/` | 200 | LLM Information & Guidance - Kimp | — | index | 1 | template-common.php |
| 94 | `/my-subscription-offer/` | 200 | My Subscription offer - Kimp | — | index | 0 | template-subscription-offer.php |
| 95 | `/retention-success/` | 200 | Retention Success - Kimp | — | index | 0 | template-retention-success.php |
| 96 | `/home-new/` | 200 | home-new - Kimp | — | index | 1 | template-front-new.php |
| 97 | `/compare-v1/` | 200 | compare-v1 - Kimp | — | index | 1 | template-compare-v2.php |
| 98 | `/privacy-policy/` | 200 | Privacy Policy - Kimp | — | index | 1 | template-common.php |

Per-URL values for all other URLs (posts, categories, tags, authors, CPTs) are stored in `scripts/seo-baseline/baseline.json` (HTML crawl) and `scripts/seo-baseline/wp/*.json` (Yoast data via REST).

---

## Appendix B: Audit files in this repository

| File | Contents |
|---|---|
| `scripts/seo-baseline/urls.txt` | All 1,628 URLs from the live sitemap |
| `scripts/seo-baseline/baseline.json` | Live HTML crawl: status, title, description, robots, canonical, OG/Twitter, JSON-LD types, headings, image alt counts, trackers (312 URLs) |
| `scripts/seo-baseline/wp/*.json` | Yoast data for every post, page, category, tag, author and enterprise case (via REST) |
| `scripts/seo-baseline/analysis.txt` | Full crawl analysis output |
| `scripts/seo-baseline/live-robots.txt` | Live `robots.txt` |
| `src/data/seo-baseline.json` | Saved live titles/descriptions per URL (fallback for redesigned pages) |
| `content-audit/*.txt` | Full visible content (headings, copy, links, images) of `/`, `/pricing/`, `/graphic-design-services/`, `/video-design-services/`, `/about-us/` |
| `scripts/seo-baseline/crawl.py` | Re-run against the new site to compare SEO values before launch |
| `scripts/audit/*.py` | Helper scripts used for this audit (head tags, image alts, integrations, Complianz config) |
