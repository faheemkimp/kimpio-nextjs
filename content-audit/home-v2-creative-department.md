# Homepage v2: "AI-Powered Creative Department"

Source: `KIMP Creative Department Homepage – KIMP homepage AI-powered creative department.html` (design mock).
This file lists **sections and exact copy only**. The visual design will be redone, so layout, colours and
styling notes from the mock are intentionally left out. Copy is verbatim; do not edit without sign-off.

Section order (top to bottom):

| # | Section | Status vs live site |
|---|---|---|
| 0 | SEO meta | Changed |
| 1 | Announcement bar | New |
| 2 | Header / nav | Changed |
| 3 | Hero | Changed |
| 4 | Trust bar (client logos) | Kept, copy changed |
| 5 | Old promise / new promise | New |
| 6 | Why AI + human (comparison) | New |
| 7 | How the department is built (4 layers) | New |
| 8 | Three ways to create | New |
| 9 | Idea to campaign (journey) | New |
| 10 | Key benefits (9 tiles) | Kept, extended |
| 11 | Three steps + stats | Kept, changed |
| 12 | Build vs buy (cost comparison) | New |
| 13 | Services | Kept |
| 14 | KIMP360 + AI preference | Kept, extended |
| 15 | Brand memory | New |
| 16 | How teams use KIMP + white-label | New |
| 17 | Pricing | Kept, changed (toggleable) |
| 18 | Reviews | Kept |
| 19 | FAQs | Kept, rewritten |
| 20 | Final CTA | Kept, copy changed |
| 21 | Footer | Kept, copy changed |

---

## 0. SEO meta

- **Title:** KIMP: Your AI-Powered Creative Department | Unlimited Graphic & Video Design, Flat Monthly Fee
- **Description:** KIMP gives every marketing team and agency an AI-powered creative department: human designers equipped with AI, working from your brand guidelines, with the option of 100% human-made work. Unlimited graphic and video design for one flat monthly fee. Try free for 7 days.

---

## 1. Announcement bar

- Text: New: KIMP is now your AI-powered creative department. Human designers, AI speed, your call.
- Link: **Start your free 7-day trial** → `https://www.kimp.io/register-now/`

---

## 2. Header / nav

- Logo → `https://www.kimp.io` (aria-label "KIMP home")
- Nav (Home is active):
  - Home → `/`
  - Services → `/graphic-design-services/`
  - KIMP360 → `/kimp360-platform/`
  - Pricing → `/pricing/`
  - Our Work → `/our-work/`
  - Kimp For → `/agencies/`
  - FAQ → `/faq/`
- Right side:
  - Sign in → `/my-account/`
  - Schedule Demo → `/book-a-call/`
  - **Start Free Trial** (primary) → `/register-now/`
- Mobile menu: same nav links + Sign in + Schedule Demo.
- Behaviour in mock: full nav at ≥1180px, Sign in / Schedule Demo at ≥1000px, hamburger below 1180px.

---

## 3. Hero

- Eyebrow (3 items): AI-Accelerated · Human-Led · Built for Agencies & Marketing Teams

### Default headline (selected): "Creative department (new)"
- **H1:** Your AI-powered **creative department.** *(second part highlighted)*
- Intro: A dedicated design team, equipped with AI and working from your brand guidelines, so every design is made by humans and never looks like it came out of a generator. Prefer no AI at all? Your team won't touch it. Unlimited graphic and video design requests and revisions, for one flat monthly fee.

### Alternate headlines (A/B options in the mock, not shown by default)
- **A, Speed-led**
  - H1: Design at AI Speed. / **Finished With Human Craft.**
  - Intro: Your dedicated designers, equipped with AI, deliver simple designs in hours and complex campaigns in days. All on-brand, all made by humans. Unlimited requests and revisions for one flat monthly fee.
- **B, Frustration-led**
  - H1: AI Gets You 80% There. / **We Take It to 100%.**
  - Intro: Generated something close in ChatGPT or Gemini but not quite right? Or want it done for you, start to finish? KIMP's human designers deliver marketing designs that are fast *and* finished, for one flat monthly fee.
- **C, Evolution-led**
  - H1: Unlimited Design, Evolved: **Human Creativity × AI Speed.**
  - Intro: The unlimited design service 5,000+ businesses trust, now faster. Your dedicated designers use AI as an assistant, never as a replacement. Prefer no AI at all? Say so, and your work is 100% hand-crafted.

### CTAs
- Primary: **Start Your Free 7-Day Trial** → `/register-now/`
- Secondary (play icon): **See How It Works (90 sec)** → `https://www.youtube.com/embed/Sa20jGoBSnI`

### Checklist
- Sign up in 2 minutes
- Cancel anytime
- Absolutely no contracts

### Visual
- KIMP360 dashboard screenshot. Alt: "KIMP360 dashboard with requests, team, brands and files"
- Floating chip 1: **Your designer** · AI-assisted, on-brand draft
- Floating chip 2: **Approved by your Creative PM** · print-ready
- Mascot. Alt: "Kimp, the KIMP superhero mascot, standing with hands on hips"

---

## 4. Trust bar

- **H2:** Every day, KIMP's creative department is trusted by over **5,000 businesses** of all sizes.
- Logos (10): Abbott, ALDI, London Real, Decathlon, Harley-Davidson, York University, Single Grain, Universal, 1&1, Targus

> Note: the existing logo SVGs in `CLIENT_LOGOS` (`src/content/home.ts`) can be reused. The mock uses correct names, which also fixes the live alt-text mismatches (Greentoe → Abbott, Market Health → ALDI, Youk → York University, Signle Grain → Single Grain).

---

## 5. Old promise / new promise

- Eyebrow: What changes
- **H2:** Stop requesting designs. Start producing outcomes.
- Para 1: AI is making basic design creation instant and inexpensive. KIMP's answer is not to compete with AI on design labour. It is to become your creative department: human designers equipped with AI, brand memory, creative direction and accountable execution.
- Para 2: Everything you already get from KIMP stays: the dedicated team, KIMP360, unlimited requests and revisions. What changes is the promise.

Table, columns **Old promise** | **New promise** (old column shown struck through):

| Old promise | New promise |
|---|---|
| Access to designers | A full creative department: Creative PM, designers, video, motion and web |
| Designers working by hand only | Designers equipped with AI, used only when you allow it |
| Fast turnaround | Faster turnaround on AI-assisted work, 100% human-made on request |
| Graphic design | Creative production: graphics, video, motion, web |
| Revisions until it's right | Right the first time more often; revisions still unlimited |
| A subscription for design capacity | A subscription for creative outcomes |

---

## 6. Why AI + human

- Eyebrow: Why AI + human
- **H2:** AI Alone Isn't Enough. Humans Alone Aren't Fast Enough.
- Intro: You've seen what AI design tools can do, and where they fall apart. Generic layouts. Mangled text. Logos that drift off-brand. Six fingers. Meanwhile, traditional design services can't match AI's speed. KIMP gives you both, without the downsides of either.

Three columns:

**AI-Only Tools** (✕ icons)
- Fast, but generic and off-brand
- You do all the prompting and fixing
- No one accountable for the result

**Traditional Design Services** (✕ icons)
- On-brand, but slow and costly
- Endless back-and-forth revisions
- Limited by human hours

**KIMP Creative Department** (✓ icons, highlighted card)
- Fast **and** on-brand
- Designers who get it right, faster
- Dedicated team + AI leverage
- AI-assisted or 100% human-made, your call
- One accountable Creative PM

- Closing line: The result: designs that used to take days now take hours, and designs that AI can't do at all still get done, by the top 1% of designers.

---

## 7. How the department is built

- Eyebrow: How the department is built
- **H2:** Less like a ticketing system. More like a creative team that happens to have AI inside it.
- Intro: Four layers make it work, all inside KIMP360. AI only ever sits in your designers' hands, and only on brands where you've allowed it.

Four cards (number, title, body, footnote):

1. **01 · Creative brief**
   - Tell KIMP the goal, channels, audience and deliverables. AI-guided briefs in KIMP360 capture what you need the first time, so your team starts with the right context.
   - *Included with every subscription.*
2. **02 · Brand memory**
   - Logos, colours, fonts, imagery, tone, approved styles and restrictions, stored once in your brand profile and used by your designers on every request, and by their AI assistant only where you've allowed it.
   - *Set up once in KIMP360, used on every request.*
3. **03 · AI-assisted production, your call**
   - Your designers are equipped with KIMP's in-house AI assistant for concepting, variations and production speed. It works from your brand guidelines, in a designer's hands, and only when you've opted in. Nothing ships straight out of a generator.
   - *Opt out any time for 100% human-made work.*
4. **04 · Human creative layer**
   - A Creative Project Manager and dedicated designers own every deliverable: concept, brand judgment, craft and final finish. Every design is made by a human, with or without AI assistance.
   - *On every plan. Never outsourced.*

---

## 8. Three ways to create

- Eyebrow: One subscription, you choose how we work
- **H2:** You Choose How Your Designs Get Made.

1. **01 · AI-Assisted**
   - Tagline: Your designers, equipped with AI.
   - Body: Opt in and your dedicated designers use KIMP's in-house AI assistant to research, concept and produce faster. Every design is still built on your brand guidelines and finished by a human designer, so it never looks like it came out of a generator. The classic KIMP experience, at hybrid speed.
2. **02 · 100% Human-Made**
   - Tagline: No AI. Not even a little.
   - Body: Don't want AI anywhere near your brand? Say so, and your team won't touch it. Every piece is concepted, designed and finished by hand, fully custom. Allow a little extra time per request; everything else about your subscription stays the same, including unlimited requests and revisions.
3. **03 · Finish What You Started**
   - Tagline: Bring your AI drafts. We'll take them the last mile.
   - Body: Made something in ChatGPT, Gemini, Grok, Claude or another AI tool that's 80% right but you can't get it the rest of the way? Upload it. Your KIMP designers will fix the type, restore your brand, sharpen the layout, and deliver print- and campaign-ready files.

- CTA: **Start Free Trial** → `/register-now/`

---

## 9. Idea to campaign

- Eyebrow: The customer experience
- **H2:** Idea to campaign, without the queue.
- Intro: Go from an idea to a credible campaign direction without waiting in line. The goal is not to remove humans. It is to move human involvement to the moments where it creates the most value.

Five steps (label, title, body):

1. **01 · Describe** · Tell us the outcome
   - "Create a September promotion campaign for our Canadian customers." Brief it in KIMP360, with your brand's AI preference already set.
2. **02 · Explore** · See directions fast
   - Your designer shows you several on-brand directions. With AI assistance that happens in hours; AI-free, your designer concepts by hand and takes a little longer.
3. **03 · Choose** · Pick one or ask for another
   - Keep the direction you like, or ask for another variation. Your Creative PM is one message away if you'd rather talk it through.
4. **04 · Expand** · Turn it into a campaign
   - Your dedicated team produces the social posts, stories, ads, email graphics, banners, video and every other asset the campaign needs.
5. **05 · Refine** · Human finish on what matters
   - Designers apply brand-level judgment, polish every detail, and deliver production-ready files. Revisions are unlimited.

---

## 10. Key benefits

- **H2:** Discover KIMP's Key Benefits
- Intro: We're not your average design service, and we're not an AI tool. Our subscriptions help you achieve more while saving time and money.

Nine tiles (✓ icon, title, body):

1. **Hybrid Speed** · AI accelerates every request; humans guarantee every result. Simple designs in hours, not days.
2. **Right the First Time** · Brand-trained AI plus designers who know your brand means fewer revision cycles. (And if you want changes? Revisions are still unlimited.)
3. **Unlimited Requests & Revisions** · The KIMP promise hasn't changed. Request as much as you need, revise until it's perfect, for one flat fee.
4. **Dedicated Team** · A real Creative Project Manager and real designers who learn your brand. Not a queue of strangers, not a chatbot.
5. **AI-Assisted, Your Call** · Our designers are equipped with an in-house AI assistant that works from your brand guidelines, so the result is on-brand, not the generic output of ChatGPT, Gemini, Grok or Claude. Opt in for speed, or opt out for 100% human-made work.
6. **100+ Categories** · Graphics, video, motion, illustration, print, UI and more, under one subscription.
7. **Brand Memory** · Set up your brand once in KIMP360. Every request after that starts on-brand, with no re-briefing.
8. **Creative Direction** · Your Creative PM coordinates requests, chases deadlines and turns feedback into action, so you get a department, not a ticket queue.
9. **Agency-Ready** · Unlimited brands and white-label delivery on every plan, so agencies can run every client through one workspace.

---

## 11. Three steps + stats

- Eyebrow: How a KIMP subscription works
- **H2:** Seamless Design in Three Steps

1. **01 · Submit or Generate**
   - Submit a request via KIMP360's AI-guided brief. Set your AI preference once per brand: AI-assisted, or 100% human-made. Your Creative Project Manager reviews everything and keeps you updated.
2. **02 · Your Creative Team Gets to Work**
   - Your dedicated designers concept and produce, using AI to move faster only if you've opted in, then apply the human judgment, craft, and brand knowledge that AI can't. You're updated at every step.
3. **03 · Review, Approve, Repeat**
   - Give feedback with comments, annotations, or screen recordings in KIMP360. Approve, download production-ready files, and keep the requests coming. They're unlimited.

Stats (number, title, body):

| Number | Title | Body |
|---|---|---|
| 875K+ | Designs Delivered | Human-crafted creatives for brands worldwide. |
| 275+ | Designers & Illustrators | Full-time, in-house, AI-empowered. Never outsourced. |
| 60+ | Countries Served | We design for ambitious brands around the world. |
| 1 to 2 | Days to Onboard | Set up your brand once and start producing. |

> Note: live site says 600K designs delivered; the mock says 875K+. Confirm the current number.

---

## 12. Build vs buy

- Eyebrow: Cost to build this in-house
- **H2:** The math, made simple.
- Intro: To recreate KIMP internally, you'd need to hire an entire creative department. Here's what it actually costs.

**Card A: Build it in-house**
- Title: Hire the full creative team
- Sub: Plus payroll taxes, benefits, equipment, software, and management overhead.

| Role | Cost |
|---|---|
| Senior Designer | $5,000/mo |
| Video & Motion Designer | $4,000/mo |
| Art Director | $8,500/mo |
| Front-End Designer | $6,000/mo |
| Project Manager | $4,500/mo |

- Total: Estimated total **$20K to 30K+ /mo**
- Footnote: Doesn't include 3 to 6 months of recruiting, onboarding delay, equipment, software licenses, or management overhead.

**Card B: Get it all with a single subscription** (highlighted)
- Title: Your creative department, included
- Sub: Creative PM + senior crew + AI-assisted workflows (your choice) + KIMP360 platform for one flat fee.

| Item | Cost |
|---|---|
| Creative Project Manager | Included |
| Multi-discipline design crew | Included |
| Video & motion production | Included |
| AI-assisted workflows, if you want them | Included |
| KIMP360 platform | Included |
| No payroll, no benefits, no extras | $0 |

- Total: Starting at **$1,397 /mo**
- Footnote: No hiring. No payroll. No long-term commitment. Cancel anytime in 2 clicks.

---

## 13. Services

- Eyebrow: The services that KIMP provides
- **H2:** Unlock Unlimited Design Potential for Your Business
- Intro: One subscription, every creative format. Every service below is delivered the same way: AI-accelerated, human-finished, always on-brand.

Six cards (image slot, title, body):

| Image slot | Title | Body |
|---|---|---|
| Graphics sample | Graphic Design | We create graphics for branding and ad campaigns to amplify marketing efforts. |
| Illustration sample | Custom Illustrations | Get custom illustrations from logos to experimental marketing concepts. |
| Branding sample | Visual Identity | Don't have a visual identity? Let us know what you'd like and we'll create one for you. |
| Deck sample | Presentations | We create engaging designs for everything from pitch decks to corporate presentations. |
| Video still | Videos & Motion Graphics | Get scroll-stopping videos that engage, convince, and convert customers effectively. |
| UI sample | Web & App Designs | We create visually stunning designs for user-friendly app and web experiences. |

- CTA: **View All Design Types** → `https://www.kimp.io/design-categories`

> Image slots are placeholders in the mock; use the live service images.

---

## 14. KIMP360 + AI preference

- Eyebrow: Introducing KIMP360
- **H2:** Your Design Command Center. Now With an AI Preference for Every Brand.
- Intro: Make, manage and collaborate on design requests, decide whether your designers may use AI on each brand, and keep every brand asset in one place. Included with every subscription.

**Feature card 1: Your AI preference, per brand** · badge "Live now · you decide"
- Body: Tell us once, per brand, whether your designers may use KIMP's in-house AI assistant. Opt in and they move faster on concepts, variations and production, always from your brand guidelines. Opt out and your work is 100% human-made, start to finish. Change it any time; your Creative PM applies it to every request.
- Illustrative UI mockup:
  - Header: Brand settings · Northwind · AI preference
  - Option 1 (selected): **AI-assisted** · tag "Faster turnaround" · Designers may use KIMP's in-house AI assistant. Every design is still built on your brand and finished by a human.
  - Option 2: **100% human-made** · tag "No AI at any step" · Fully custom, concepted and finished by hand. Allow a little extra time per request.
  - Footer: Applies to every new request for this brand · buttons "Change anytime", "Save preference"
- Caption: Illustrative interface. Example brand.

**Feature card 2: Streamlined Workflow**
- Body: Make, manage, and collaborate on requests in one place. AI-guided briefs capture what you need the first time; your team takes it from there. Get a 360° view, organized your way.
- Image: KIMP360 board. Alt: "KIMP360 board with requests moving from drafts to graphics in progress, in review and completed"

Three small cards:
- **Design Better, As a Team** · Invite unlimited collaborators to create, request, and review alongside your dedicated design team, at no extra cost.
- **Brand Assets, In One Place** · Upload your assets once. They power your design team's work (and their AI assistant, only where you've allowed it), so everything stays consistent, everywhere.
- **Round-the-Clock Support** · Real humans, 7 days a week, for questions about billing, accounts, and more.

---

## 15. Brand memory

- Eyebrow: Brand memory
- **H2:** The longer you use KIMP, the better it knows your brand.
- Para 1: Raw AI generation is becoming a commodity. What makes AI genuinely useful to one specific company is context. KIMP keeps yours: brand guidelines, approved assets and the preferences your team builds up request after request, so you never brief from zero.
- Para 2: That memory lives in your KIMP360 brand profiles and with your dedicated team, who learn your preferences request after request.
- Image: mascot. Alt: "Kimp mascot working on a laptop"

Table, columns **What KIMP remembers** | **Why it matters**:

| What KIMP remembers | Why it matters |
|---|---|
| Brand guidelines | Consistent outputs without repeated briefing. |
| Approved assets | Less searching, fewer mistakes. Attach them to any request in a few clicks. |
| Past requests | Your team knows what you asked for before and what you approved. |
| Audience and channels | Platform-specific creative by default, from Instagram to print. |
| Creative preferences | Output gets more personalised the longer you work with your team. |

---

## 16. How teams use KIMP

- Eyebrow: How teams use KIMP
- **H2:** Built for the way your team works.
- Intro: From agencies managing multiple client retainers to in-house growth teams running daily experiments, KIMP plugs into your existing workflow as your always-on creative production layer.

Three audience cards (kicker, title, body, chips, link):

1. **Agencies** · Scale delivery without scaling headcount
   - A reliable creative team behind the scenes, helping you deliver more client work, hit tighter deadlines, and protect margins without hiring more designers or editors.
   - Chips: White-label design, Motion graphics, Presentation design, Brand collateral, Multi-brand workflow
   - Link: **How agencies use KIMP** → `/agencies/`
2. **Marketing teams** · Keep every campaign moving
   - When campaigns stack up, in-house teams get buried in design requests, video edits, landing pages and last-minute changes. KIMP becomes the production team that keeps everything moving.
   - Chips: Ad creatives, Landing pages, Campaign assets, Email design, Shorts & reels, Social content
   - Link: **See marketing use cases** → `/our-work/`
3. **Growth teams** · Ship more experiments, faster
   - Creative is usually the bottleneck. KIMP produces the assets you need for experiments, launches, paid campaigns, funnels and conversion updates without slowing momentum.
   - Chips: Paid social creatives, Funnel & landing assets, A/B test variations, Lifecycle email creative, Launch visuals
   - Link: **Start a free trial** → `/register-now/`

**White-label banner**
- Eyebrow: White-label for agencies
- **H3:** Add KIMP as your agency's AI-powered production department.
- Body: You keep the client relationship and the strategy. KIMP generates and refines large volumes of creative behind the scenes, delivered under your brand. Sell faster turnaround and bigger creative packages without hiring proportionally more staff.
- Checklist:
  - Unlimited brands on every plan, one workspace per client
  - White-label delivery that preserves your agency's branding
  - A Creative PM who runs the queue so your account managers don't
- Link: **See white-label design for agencies** → `/white-label-graphic-design/`

---

## 17. Pricing (toggleable in the mock, on by default)

- Eyebrow: Subscription plans
- **H2:** Design Without Boundaries.
- Intro: Simple, transparent, flat monthly pricing. Every plan includes your dedicated team, KIMP360, and your choice of AI-assisted or 100% human-made work. Prices in USD. Taxes and fees included, no hidden costs.
- Every plan CTA: **Start Free Trial** → `/register-now/`

**Graphics · $1,397/month**
- Blurb: Graphic designs for day-to-day marketing needs and big campaigns.
- Unlimited requests, revisions and brands
- 3 active requests
- 24-hour turnaround on simple tasks
- Dedicated design team and Project Manager
- Unlimited team members
- AI-assisted or 100% human-made, your choice
- Print and digital, custom illustrations, basic GIFs
- Landing page, website, app and UI designs, Canva designs
- Free stock images and source files
- No contract, cancel anytime

**Graphics + Video · $1,697/month** · badge "Best value · save $1,097/mo"
- Blurb: Everything from Kimp Graphics and Kimp Video for a discounted flat monthly fee.
- Unlimited requests, revisions and brands
- 5 active requests
- 24-hour turnaround on simple tasks
- Dedicated design and video team, plus Project Manager
- Unlimited team members
- AI-assisted or 100% human-made, your choice
- Everything in Graphics, plus video editing, animation and motion graphics
- GIFs, template customization, UI/UX animations
- Free stock images, videos and audio, plus source files
- No contract, cancel anytime

**Video · $1,397/month**
- Blurb: Video designs and motion graphics to ramp up your content marketing.
- Unlimited requests, revisions and brands
- 2 active requests
- 24-hour turnaround on simple tasks
- Dedicated video team and Project Manager
- Unlimited team members
- AI-assisted or 100% human-made, your choice
- Video editing, animation, video design and motion graphics
- GIFs, template customization, UI/UX animations
- Free stock images, videos and audio, plus source files
- No contract, cancel anytime

**Creative Department · Enterprise · Custom**
- Body: For companies that need a custom solution tailored to their design needs and workflow: multiple teams, creative direction, strategy and integrations.
- CTA: **Book a Call** → `/book-a-call/`
- Multiple subscriptions and dedicated teams
- Creative direction and brand strategy
- White-label and multi-brand workflows
- Custom onboarding and reporting

- Footnote: Add on more subscriptions for more active requests and faster throughput. Pause anytime for a flat $19.95 a month. 7-day free trial on every plan.

> Note: the live site shows a "Get 50% OFF for 4 Months" promo; the mock drops it. Confirm prices and promo with marketing.

---

## 18. Reviews

- Eyebrow: The design team brands prefer
- **H2:** Top brands around the world trust KIMP with their designs.
- Ratings: **4.7** Google · 150+ reviews · **4.9** Trustpilot · **4.9** Clutch · 250+ reviews

Six review cards (5 stars each):

1. "They usually get the designs right on the first attempt, which eliminates the need for a lot of back-and-forth revisions. This efficiency makes the entire process very easy for us." · **Petteri Pucilowski** · KIMP client
2. "These guys are absolutely amazing!! I highly recommend them. It's so great to work with competent people who are incredibly good and super fast at what they do." · **Liana Foai** · Nasyana Business Services
3. "They have been very seamless in executing on everything we have asked for, from the creative vision to the project management, to the communication and turnaround time." · **Nicole Murray** · KIMP client
4. "I have been using Kimp for a few months now and I am very happy with the service! They are quick about changes and adapting to your needs and wants which turns it into a easily flowing process. Highly recommend." · **Jacob Lopez** · Social Media Revenue
5. "This design team is a superb bunch! I wish I could buy them a pizza. They have become an integral part of the success of our marketing agency." · **Andrew Mackenzie** · Industry Currency
6. "Amazing people to work with. Drop the idea, get a masterpiece back, and very cost effective." · **Michael Owen** · KIMP client

- Link: **See all reviews** → `/testimonials/`

---

## 19. FAQs (accordion, first item open)

- **H2:** FAQs
- Intro: Have questions about how we work and what you get? We've got all the answers you need.

1. **What is an AI-powered creative department?**
   It's what a KIMP subscription has become: a dedicated design team and Creative Project Manager who produce your creative, equipped with AI tools they can use to work faster when you allow it. You brief the outcome you need; humans make it, on your brand. It is still unlimited requests and revisions for one flat monthly fee.
2. **Do you design with AI?**
   Only if you want us to. Our designers are equipped with KIMP's in-house AI assistant and use it as a creative assistant, never a replacement: for research, concept exploration, variations and repetitive production steps. Every design is still guided by a human designer's creative vision, strategic thinking and attention to detail, and built on your brand guidelines. If you'd rather we didn't use AI at all, tell us and your team won't touch it.
3. **Can I use KIMP's AI tool myself?**
   No. KIMP's AI design assistant is an internal tool for our designers, not a self-serve product for clients. You get the benefit, faster turnaround on AI-assisted work, without prompting anything yourself. Everything you receive is produced and finished by your dedicated designers.
4. **What if I don't want any AI used on my brand?**
   Then we won't use any. Set your preference per brand in KIMP360 or tell your Creative Project Manager, and every request for that brand is 100% human-made: concepted, designed and finished by hand, fully custom. Allow a little extra time per request compared with AI-assisted work. Everything else about your subscription stays the same, including unlimited requests and revisions.
5. **I made a design with another AI tool. Can you finish it for me?**
   Absolutely. This is one of the most common requests we get now. Upload your AI-generated draft (from ChatGPT, Gemini, Grok, Claude or any other tool) with your request in KIMP360, tell us what's not working, and your design team will fix the typography, restore brand consistency, refine the layout, and deliver production-ready files for print or digital. It counts as a regular design request, so with your subscription, it's unlimited.
6. **Will AI-assisted design mean lower quality or generic designs?**
   No. The opposite. Nothing ships straight out of a generator. AI handles repetitive parts of production; our designers spend their time on the parts that matter: concept, brand fit, typography, composition, and finish. Every design that leaves KIMP is built on your brand guidelines and completed by a human designer, which is why it doesn't look like the generic output you get from ChatGPT, Gemini, Grok or Claude. If anything ever misses the mark, revisions are unlimited.
7. **What does "unlimited graphic design" and "unlimited video design" mean?**
   KIMP's unlimited graphic design and unlimited video design service includes unlimited requests and unlimited revisions. Make as many requests as you'd like, and we'll work through them as quickly as possible. Your dedicated Project Manager reviews each request, then assigns it to your design team. Each plan has a set number of active requests in progress at any one time (3 for Graphics, 2 for Video, 5 for Graphics + Video), and you can add subscriptions for more throughput.
8. **How fast is turnaround?**
   On average you'll receive designs or revisions in 24 hours for simple tasks like social media posts, web banners and single-sided print designs, and 2 to 4 days for complex designs. AI-assisted work is typically at the faster end of those ranges. If you've chosen 100% human-made work, allow a little extra time. If you've got a more complex task, let us know and we'll provide an estimate.
9. **Do you offer white-label design for agencies?**
   Yes. Agencies use KIMP as their behind-the-scenes production department. Every plan includes unlimited brands, so each client gets its own brand profile and assets in KIMP360, and deliverables carry your agency's branding, not ours. You keep the client relationship and the strategy; we produce the work.
10. **Is there an enterprise or custom plan?**
    Yes. If your company needs a custom solution tailored to your design needs and workflow, such as multiple dedicated teams, creative direction and strategy, or custom onboarding and reporting, book a call and we'll put together a Creative Department plan for you.
11. **How does the trial work?**
    You sign up, you try us out for 7 days, and you cancel if you decide it's not the right fit. You are not billed during the trial period. You get billed only after day 7 and you don't have to sign any contracts to continue with KIMP.

- Link: **Read All FAQs** → `/faq/`

> Tip: render these as FAQPage JSON-LD too.

---

## 20. Final CTA

- Eyebrow: Get started · Experience hybrid design with KIMP
- **H2:** Your creative department is ready when you are.
- Sub: AI speed. Human craft. Unlimited requests. One flat fee.
- Primary: **Start Your Free 7-Day Trial** → `/register-now/`
- Secondary: **Book a Demo Call** → `/book-a-call/`
- Image: mascot close-up. Alt: "Kimp mascot, close up"

---

## 21. Footer

- Logo
- About: KIMP is a subscription-based graphic and video design service, delivered for a flat monthly fee by a dedicated design team: your AI-powered creative department. AI-accelerated, human-finished. Try KIMP now!
- Social: Facebook (`facebook.com/getkimp/`), Instagram (`instagram.com/getkimp/`), LinkedIn (`linkedin.com/company/getkimp/`)

| Service | Company | Others |
|---|---|---|
| Pricing → `/pricing/` | About Us → `/about-us/` | Contact Us → `/contact-us/` |
| Our Work → `/our-work/` | Book A Call → `/book-a-call/` | Affiliates → `/affiliates/` |
| KIMP360 → `/kimp360-platform/` | Brand Assets → `/brand-assets/` | Careers → `/careers/` |
| White-Label for Agencies → `/white-label-graphic-design/` | Blog → `/blog/` | Design Categories → `/design-categories/` |
| FAQ → `/faq/` | | |

- Bottom bar: Kimp.io © 2026. All rights reserved. · 7030 Woodbine Avenue, Suite 500, Markham ON, L3R 6G2, Canada

---

## Removed from the live homepage

These live sections do not appear in the mock:
- Hero "Schedule Demo" as the primary CTA (now "Start Your Free 7-Day Trial")
- "One Subscription For All Your Design Needs" block (merged into Key Benefits)
- Separate "Round-the-Clock Support" section (now a small card in KIMP360)
- Blog section (7 article cards)
- FAQ "AI Summary" card and quick-contact card
- "In Collaboration With" Yspace / Microsoft logos in the final CTA
- "Get 50% OFF for 4 Months" promo
