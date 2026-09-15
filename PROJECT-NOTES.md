# Aureum Club — Website Notes

Plain-language summary so you (or Claude) can pick this up anytime. Nothing here needs the terminal open.

## 🌐 Your live website
**https://joinaureum.com** (also joinaureum.netlify.app) — online 24/7, free, forever. Closing your terminal or laptop does NOT take it down.
Lives in its own Netlify account (**info@joinaureum.com**), fully separate from WOGO.

## 🆕 9 Jul 2026 — Membership page + club best-practices pass
Based on research into how top members' clubs (Soho House, Chief, South Park Commons, Luma communities) set up their sites:
- **New Membership page** (`membership.html`, now a real page — the old redirect is gone): "opens soon · by invitation," 4 things membership will be (Priority Seats · A Smaller Room · First Look · Founding Members), "by application, by invitation," and the email waitlist form with a **"Request an Invitation"** button. Early list-joiners = **founding members** (the €0 scarcity lever).
- **Nav now:** Our Story · Events · **Membership** · Blog · [Upcoming Events pill]. (Kept the "Upcoming Events" pill per Maroussia's earlier call, not changed to Join.)
- **Venue trust strip** on the homepage ("Evenings Hosted At — Capital C · Wolf Atelier · CELIA · The College Hotel · Satchmo").
- **Events proof:** added a guest quote to the featured July-2 block + a "~30 seats an evening, list gets first access" scarcity cue.
- **Deliberately NOT done** (they reverse Maroussia's explicit earlier choices — offered, awaiting her): re-add a homepage numbers band; change the nav CTA from Upcoming Events to Join/Request Invitation; a "how an evening works" 1-2-3 strip. Also still needs her input: named testimonials, board headshots/titles, visible FAQ on the (now 3-block) About page.

## 🗺️ Site structure (since 7 July 2026)
- **Home** (`index.html`) — short by design: full-screen photo hero → the club + 3 numbers → filmstrip of real July 2 photos → next evening → **Join the List** email form (the one big call-to-action, `#join`)
- **Our Story** (`about.html`) — story, mission & vision, values, non-profit manifesto
- **Events** (`events.html`) — Luma calendar (auto-updates) → featured July 2 evening + photo gallery with lightbox → earlier evening posters
- **Blog** (`blog.html` + `blog/` folder) — "Notes from the table"; first post is the July 2 recap
- `membership.html` now just forwards to the home-page form (old links keep working)

## ✍️ How to publish a new blog post (no coding)
1. Duplicate `blog/what-one-person-can-do-now.html`, rename it (e.g. `blog/my-new-post.html`), edit the text and photos inside.
2. Open `blog/posts.js` and copy the `{...}` block at the top — paste a new one ABOVE it with the new title/date/excerpt/cover.
3. Ask Claude to "publish the site" (or run the deploy command below). The blog page and the home-page strip update themselves.

## 📧 Email collection ("The List") — all free
- Form on the home page (`#join`), stored by **Netlify Forms** → dashboard → **Forms → aureum-subscribe**.
- **Every new signup is also emailed to info@joinaureum.com automatically** (notification hook set 7 Jul 2026).
- Free tier = 100 submissions/month — plenty for now. When the list needs real newsletters, plug into a free email tool later.

## 🆕 8 Jul 2026 — logo, posters, board
- **Logo:** new AUREUM wordmark tiles saved (`logo-tile-dark.png`, `logo-tile-light.png`); `logo-icon.png` is now the favicon on every page. Nav/footer still use the transparent `logo-wordmark.png` (letters only).
- **Events page:** the 5 placeholder posters were replaced with the **4 real posters** pulled from Instagram — Manifest Your Potential (20 Feb · Wolf Atelier), LinkedIn Dinner (21 Nov · CELIA), Champagne Tasting (19 Sep · The College Hotel), Wine Dine & Invest (20 Jun · Satchmo). Each links to its IG post. (These carry the old "SheCEO / SC" branding — they're the predecessor events; fine as history.)
- **Homepage "Join the List" band** now uses a **stock candlelit toast image** (`cheers-stock.jpg`), not a real photo — keeps the homepage render-based per Maroussia's preference.
- **Board section** added to Our Story (`#board`): Maroussia Tyl + Anna Kotcharyan, both "Co-founder", linked to LinkedIn, shown as gold monogram circles (MT / AK). **To improve:** real headshots + one-line bios + exact board titles (chair/secretary/treasurer for the stichting) — send them and Claude will drop them in.

## 📸 Photos
- Real photos from the 2 July evening live in `images/event/` (web-compressed), `images/event/thumb/` (small, for strips/grids), and 4 big `-xl.jpg` versions for full-screen backgrounds.
- Originals stay at `~/Desktop/Personal/AureumClub/Foto's/` (501MB — never upload those directly).
- 15 curated shots are used on the site; the rest are compressed and ready if you want swaps.

## 🔍 SEO & AI visibility (done 7–8 Jul 2026)
- Every page has search-tuned titles/descriptions + social-share cards, JSON-LD (NGO, WebSite, Event, BlogPosting), plus a **FAQ section + FAQPage schema** on Our Story (for Google + ChatGPT/Perplexity answers).
- `sitemap.xml`, `robots.txt` (AI crawlers welcomed), `llms.txt`. Founder credit links to LinkedIn (E-E-A-T). Heavy background images slimmed for mobile speed. `forms.html` set to noindex.
- **⚠️ MUST DO (needs Maroussia — the site is NOT yet in Google's index):**
  1. **Google Search Console** — add joinaureum.com (verify via Namecheap DNS TXT), submit sitemap.xml, Request Indexing on the homepage. Until this is done there is zero organic traffic. Claude can generate the exact TXT record.
  2. **Fix the Luma profile** — the Aureum organizer profile on Luma has NO website link and its Instagram points to the OLD `@sheceo.amsterdam`. Add `https://joinaureum.com` and change IG to `@joinaureum`.
  3. **Confirm ticket price + "~30 guests"** — both appear (blog says "around thirty"); FAQ deliberately avoids stating a price number until confirmed.
  4. Optional: swap the two anonymous guest quotes for named (first name + company) once guests OK it — stronger trust.
  5. Backlink asks: Tatiana Maes/Spaartje, SheCEO Amsterdam, Capital C venue.
- **Note:** homepage share image (og:image) is deliberately the stock hero, per Maroussia's "use a render, not our photo" preference — SEO agent suggested a real photo for higher share CTR; her call.

## ⚠️ Facts to confirm with Maroussia
- Ticket price of the July 2 event: old site said €75/€85, earlier notes said free early-bird. Left out of the site for now — tell Claude which is right.
- Guest count "around thirty" (used in the blog recap) — correct?

## ⏳ Later (once the stichting is registered)
- KvK number in the footer (legally required) — there's a marked comment spot in every footer.
- If ANBI status: Transparency section on Our Story (marked comment spot there too).

## 📁 Where things live
- Website files: this folder — `/Users/maroussia/aureum-club/`
- Hosting: Netlify, site name **joinaureum**, account **info@joinaureum.com**

## ✏️ To change anything later
Open Claude in this folder and say what you want. To re-publish after edits:
`npx -y netlify-cli deploy --prod --dir /Users/maroussia/aureum-club --site a7e6b5c9-7e75-4675-9c2d-9e37a0a81423 --no-build`

## 🆕 13 Aug 2026 — "what we do & who we are" pass (LinkedIn voice)
Maroussia flagged the site didn't say enough about what Aureum does and who's behind it. Fixed, using the LinkedIn company page as the tone/programme source of truth:
- **Full programme everywhere:** copy no longer over-indexes on dinners — home, Our Story, Events, llms.txt and the structured data now all name **dinners, open drinks, AI masterclasses, workshops and coworking**.
- **New "What We Host" strip** on the homepage (below the club statement) listing the five formats.
- **LinkedIn voice in the statement block:** "It's not for collecting contacts… Most founders have five hundred connections and no one to call on a bad week — Aureum is where the people you can actually call come from."
- **Board section got real:** headshots (from `~/Desktop/Aureum/Board Members/`, compressed to `images/board/`), plus one-line bios — Maroussia Tyl (founder of WOGO Amsterdam) and Anna Kotcharyan (founder of Pay the Public).
- **To confirm:** the photo assignment (window photo = Maroussia, studio photo = Anna — swap is a 1-line fix), and a sharper line on what Pay the Public does.
