# Los Pollos Hermanos Shop: Build Plan

A planning document for building a themed React shopping cart (The Odin Project assignment) that imitates the look and motion of a Framer template, with Taste Skill guiding the AI agent's frontend decisions.

**Workflow note (updated):** Opus is used through a third-party chat app, so it cannot read your repo, install packages, run tests or save files. You copy its code into your own files and run every command yourself. Section 12 describes this chat-only workflow, and the prompts in section 8 are written for it. Keep this file in your repo as `docs/PLAN.md` for your own reference, but Opus only sees the parts you paste into the chat.

---

## 1. Summary

| Item | Decision |
|---|---|
| Goal | A 3-page React app (Home, Shop, Cart) that satisfies The Odin Project "Shopping Cart" assignment and visually imitates the Framer "Matcha Shop" template |
| Theme | Los Pollos Hermanos, a fictional fried chicken restaurant (fan-tribute, original assets only) |
| Language / tooling | JavaScript (JSX), Vite, React Router, CSS Modules, Vitest + React Testing Library |
| Cart state | Context + `useReducer` |
| Data source | Our own `public/menu.json`, loaded with `fetch()` |
| Animation | CSS for repeating effects, GSAP + ScrollTrigger for scroll effects (see section 7 for why) |
| Agent guidance | Taste Skill (`design-taste-frontend`) with a project style guide on top, pasted into the chat |
| Workflow | Opus in a third-party chat app with no file access. You copy code in and run everything yourself (section 12) |

---

## 2. References

- **Visual reference:** https://matcha-shop.framer.website/
- **Requirements reference:** https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart
- **Agent framework:** https://www.tasteskill.dev/ (docs: https://www.tasteskill.dev/docs)

### Odin requirements checklist (the non-negotiables)

1. New React project, planned component and folder structure.
2. Three pages: Home, Shop, Cart, with a navbar shown on every page.
3. Home page can be simple (images or information).
4. Shop page: a card per product with title, a typed quantity input, increment and decrement buttons, and an "Add To Cart" button.
5. Navbar Cart link shows the number of items in the cart, updating in real time.
6. Cart page: list items and quantities, increase/decrease quantity, allow removal. No checkout or payment.
7. Products fetched from FakeStore API "or something similar".
8. Tested with React Testing Library (do not test `react-router` itself).
9. Styled.
10. Deployed, with SPA redirect configuration.

---

## 3. Scope decisions (locked)

| Topic | Decision |
|---|---|
| Blog | Cut. No blog listing or article pages. |
| Data | `public/menu.json` fetched async, keeping loading and error states testable |
| Cart state | Context + `useReducer` (note: Odin teaches Context in the lesson after this project, so this is a deliberate step ahead) |
| Cursor image trail | Included, desktop (fine pointer) only |
| Images | Placeholders first, swapped for real assets later |
| Ingredient card media | Looping muted video, with a CSS 3D turntable as the fallback if no video is available |
| Template promo widget ("All Templates", "Get for $78") and "Made in Framer" badge | Excluded |
| Template copy bugs (garbled "for.rt visuals with ease", one testimonial name repeated everywhere) | Not copied |
| Dark mode | Not included. Light theme only, declared once (Page Theme Lock). |

---

## 4. Mockup breakdown

### Page sections (Home), in order

1. **Navbar:** floating pill, centered, glass blur background once scrolled.
2. **Hero:** big condensed headline, short subtext, two buttons, full-bleed photo with a scalloped bottom edge.
3. **Value strip:** headline plus three cards with icon, title, one line of text, and an avatar stack with "3k+" social proof.
4. **Ticker tape:** tilted band with infinitely scrolling text, right to left.
5. **Favorites:** three product cards that pile on top of each other as you scroll (sticky stack, slight rotations), each with image, title, blurb and tag pills.
6. **Why us (bento grid):** a media card (the template uses a looping video), a stats card with a count-up number, a "quality service" card with avatars, and a tall photo card.
7. **Testimonials:** large image plus quote, name, role, and previous/next buttons.
8. **Visit us:** centered address, hours, directions button. Mouse movement spawns small photos that follow the cursor and fade after about 1 second. Scalloped bottom edge scrolls horizontally forever.
9. **FAQ:** accordion list.
10. **Footer:** giant wordmark, contact info, link columns, copyright, scalloped top edge that also moves.

### Motion inventory

| Effect | Where | Technique | Difficulty |
|---|---|---|---|
| Infinite tilted marquee | Ticker (appears twice) | CSS keyframes, duplicated track, small rotation | Easy |
| Moving scalloped edges | Hero bottom, visit us, footer | CSS mask or repeating radial gradient, animated `background-position` | Easy |
| Glass navbar | Global | Fixed position, `backdrop-filter`, IntersectionObserver sentinel or ScrollTrigger (no scroll listener) | Easy |
| Scroll reveal on headings and cards | Global | GSAP ScrollTrigger or IntersectionObserver | Easy |
| Count-up stat | Why us | Tween triggered on enter view | Easy |
| Hover image swap | Product cards | Two stacked images with opacity transition | Easy |
| Sticky card stack | Favorites | `position: sticky` with staggered `top` values, GSAP scrub for rotation and scale | Medium |
| Testimonial carousel | Testimonials | Index state with slide/fade transition | Medium |
| Cursor image trail | Visit us | Pooled DOM nodes moved via refs, no React state per mouse event | Hard |
| Ingredient media | Why us | Looping video or CSS 3D turntable | Easy to Medium |

Note: the live site's CSS and JS were not available to read, so these specs are reconstructed from screenshots and descriptions. Expect to tune timing and easing by eye.

---

## 5. Theme spec: Los Pollos Hermanos

### Brand rules

- Original wordmark built from text and CSS only. Do not use the show's official logo files.
- Fictional address and phone number only.
- Keep the tone of a friendly family restaurant. No references to the show's plot.

### Palette (starting point, agent may refine within these constraints)

| Role | Value | Use |
|---|---|---|
| Brand surface | Pollos yellow `#F6BE00` | Large section backgrounds (replaces the template's sky blue), footer scallops, ticker tape |
| Accent (the single accent) | Pollos red `#C8102E` | Primary buttons, badge, links on hover |
| Page background | Cream `#FFF7E0` | Main background |
| Card surface | Warm off-white `#FFFDF6` and butter tint `#FBE9A8` | Cards (replaces the template's pastel pinks and blues) |
| Ink | Warm near-black `#1B1208` | Text and headlines |

Rules: ink on yellow for text, cream text on red for buttons, check WCAG AA contrast.

### Type

- Display: a condensed bold sans in the style of the template (Barlow Condensed is a close, openly licensed match), uppercase for section headings.
- Body: a clean, readable sans chosen by the agent and justified in one line.

### Shape

- One radius system for the whole page. The template uses generous soft corners, so use large rounded corners everywhere and pill shapes only for buttons and tags.

### Copy mapping

| Template | Ours |
|---|---|
| Matcha Shop | Los Pollos Hermanos |
| Warm, earthy and calming... | Fresh chicken, family recipes, and a table with room for everyone. |
| Made for slow mornings and quiet afternoons | Made for family dinners and quick lunch breaks |
| Simple ingredients / Thoughtful preparation / Everyday rituals | Fresh ingredients / Cooked with care / Every day favorites |
| MATCHA RELAX TIME / Visit us and try our amazing drinks | FRESH POLLO TIME / Visit us and try our famous chicken |
| 3k+ matcha lovers | 3k+ happy regulars |
| Our favorites | Our favorites (top 3 menu items) |
| Why our matcha is the best | Why our chicken is the best |
| 900+ Tasty matcha drinks prepared daily with love | 900+ Plates of crispy chicken served daily |
| Words from our regulars | Words from our regulars (write 3 original testimonials) |
| FAQ (matcha) | FAQ: allergens, spice levels, catering, vegetarian options, opening hours |
| Visit us address | Fictional address in Albuquerque, NM |

Copy rule from Taste Skill: no em dashes or en dashes anywhere in site copy. Use a hyphen or rewrite the sentence.

### Menu data (`public/menu.json`, 9 items)

Schema per item:

```json
{
  "id": 1,
  "title": "Pollo Classic Combo",
  "price": 9.99,
  "category": "combos",
  "description": "Half chicken, crispy skin, two sides.",
  "image": "/images/menu/pollo-classic.jpg",
  "altImage": "/images/menu/pollo-classic-alt.jpg",
  "tags": ["Signature", "Crispy"],
  "featured": true
}
```

Suggested items (invented names): Pollo Classic Combo, Hermanos Family Bucket, Spicy Pollo Sandwich, Pollo Wrap, Curly Fries Basket, Hermanos Sauce Bottle, Fresh Lemonade, Sweet Tea, Churro Bites. Three of them carry `"featured": true` for the Home favorites.

---

## 6. Architecture

### Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop |
| `/cart` | Cart |
| `*` | Simple Not Found page |

Home anchors (`#whyus`, `#visitus`, `#faq`) must also work when clicked from `/shop` or `/cart`: navigate to `/` first, then scroll to the element.

### Navbar links

Menu (`/shop`), About (`/#whyus`), Visit us (`/#visitus`), Cart with live count badge. Logo links to `/`. Navbar height max 80px.

### Folder structure

```text
src/
  api/            menu.js (fetchMenu)
  components/     Navbar, Footer, Button, Tag, ProductCard, QuantityInput,
                  CartItem, Marquee, ScallopEdge, Carousel, Accordion,
                  CountUp, CursorTrail, Reveal
  context/        CartContext.jsx, cartReducer.js
  hooks/          useMenu.js, useCart.js, useReducedMotion.js
  pages/          Home/, Shop/, Cart/, NotFound/
  styles/         tokens.css, global.css
  test/           setup.js (mocks for IntersectionObserver, matchMedia)
public/
  menu.json
  images/
  _redirects        (Netlify)
vercel.json         (Vercel)
```

### Cart state

- Shape: `{ items: { [productId]: quantity } }`, with product details looked up from the fetched menu.
- Actions: `ADD(productId, qty)`, `SET_QTY(productId, qty)`, `INCREMENT`, `DECREMENT`, `REMOVE`, `CLEAR`.
- Derived values: `totalItems` (badge), `subtotal`.
- Rules: quantity is an integer from 1 to 99. The typed input may be temporarily empty while editing and is clamped on blur. On the Cart page, decrementing at 1 removes the item. On Shop cards the minimum is 1.

---

## 7. Using Taste Skill

### What it is

Taste Skill is an open-source (MIT) set of `SKILL.md` files that give an AI coding agent rules about typography, spacing, color, layout and motion, so it stops producing generic template-looking frontends. It works with any agent that reads `SKILL.md` files (Cursor, Claude Code, Codex, Gemini CLI, and others). Important version note: Taste Skill v2.0.0 was released on 13 October 2026 and the default install name `design-taste-frontend` now points to that new version. It relies on helper scripts (`draw.mjs`, `assets.mjs`, `inspect.mjs`), Node 22+ and a real browser, so it is built for coding agents that can run commands. A chat-only Opus can't run those scripts. The rules described in this plan (brief inference, locks, hero discipline, ban list, animation skeletons, pre-flight check) come from the docs for the previous default, which is still available as `design-taste-frontend-v2-experimental`. For the chat workflow, use that one.

### Install

For this project, replace `design-taste-frontend` in the commands below with `design-taste-frontend-v2-experimental`. Opus can't install anything, so if you want the file on disk, run this yourself in your own terminal at the root of your project (it only downloads a `SKILL.md`). The `npx` step is optional, because you can also copy the file's text straight from GitHub (section 12):

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

This adds a `SKILL.md` to your project. A coding agent would read it automatically, but a chat-only Opus will not, so you paste its contents into the chat yourself. The docs say you can paste any `SKILL.md` into a chat conversation. The docs also show:

- Full bundle (all 13 skills): `npx skills add Leonxlnx/taste-skill`
- Codex: `npx skills add Leonxlnx/taste-skill -a codex`
- Legacy v1: `--skill "design-taste-frontend-v1"`

For this project, the core skill is enough. `output-skill` (blocks placeholder comments and skipped sections) is a useful extra, but check the repo for its exact install name before adding it. The style skills (soft, minimalist, brutalist) don't match this bold, warm direction, and the image-generation skills only matter if your agent can generate images.

### Read it before you trust it

The skill file steers everything the agent does, so skim it once before installing it into a project, like any dependency. It is plain text and fully editable.

### How it works, and what to expect

- **Brief inference:** the agent reads your brief first and states a one-line design read.
- **Locks:** one accent color, one corner-radius system, one page theme, never mixed mid-page.
- **Hero discipline:** headline max 2 lines on desktop, subtext max 20 words, primary CTA visible without scrolling, nav max 80px tall.
- **Ban list:** includes em dashes, three equal feature cards, scroll cues, decorative status dots, hand-rolled decorative SVG illustrations, and `window.addEventListener('scroll')`.
- **Animation skeletons:** canonical patterns for sticky stacks and scroll-reveal stagger, built on GSAP. Hand-rolled scroll listeners and requestAnimationFrame loops touching React state are not allowed.
- **Pre-flight check:** every box must pass before the agent ships.

### Where Taste Skill conflicts with the mockup, and how we resolve it

Taste Skill is built to avoid templated designs, and we are deliberately imitating a template. The docs say that pasting a project style guide at the top of `SKILL.md` makes it the dominant source of truth, so we use that to declare intentional exceptions.

| Taste Skill rule | Mockup behavior | Resolution |
|---|---|---|
| Three equal feature cards banned | Value strip has three equal cards | Explicit waiver in the style guide (mockup fidelity) |
| One accent color | Template uses many pastel backgrounds | Red is the single accent. Yellow is the brand surface. Documented in the style guide |
| Dual light/dark mode by default | Template is light only | Light only, declared |
| No scroll event listeners | Glass navbar reacts to scroll | Use IntersectionObserver sentinel or ScrollTrigger |
| No rAF loops touching React state | Cursor trail follows the mouse | Pooled DOM nodes moved through refs, never React state |
| Hero decoration text strips banned | Ticker tape band | The tape is not at the hero bottom and mirrors the mockup. Declare it as a deliberate brand element |
| Hand-rolled decorative SVG banned | Scalloped edges | Build with CSS mask or gradients, not drawn SVG |
| No em dashes in copy | Template copy contains them | Rewrite copy with hyphens or new sentences |
| Pills over images banned | Tags on cards | Keep tags beside or below the image, never on top of it |

### Paste this at the top of `SKILL.md` (Project Style Guide)

```text
PROJECT STYLE GUIDE (dominant source of truth, overrides conflicting rules below)

Project: Los Pollos Hermanos, a fictional restaurant site, re-themed from the
Framer "Matcha Shop" template. Fidelity to that template's layout and motion
is intentional.

Locks for this project:
- Theme: light only. No dark mode.
- Accent: Pollos red #C8102E is the only accent. Yellow #F6BE00 is the brand
  surface color, cream #FFF7E0 is the page background, ink is #1B1208.
- Shape: large soft corners everywhere; pill shape only for buttons and tags.
- Type: bold condensed display font for headings, clean sans for body.
- Styling: plain CSS Modules, not Tailwind. Translate any Tailwind examples
  in this file into plain CSS.
- If this skill uses tunable dials: DESIGN_VARIANCE 5, MOTION_INTENSITY 7,
  VISUAL_DENSITY 4 (structured layout like the mockup, noticeable motion,
  airy spacing).

Deliberate exceptions to the ban list:
- Three equal cards in the Home value strip are allowed (mockup fidelity).
- The tilted ticker tape band is allowed as a brand element.

Hard requirements:
- No em dashes or en dashes in any copy.
- No window scroll listeners. Use IntersectionObserver or GSAP ScrollTrigger.
- No React state updates on mousemove. Use refs and direct DOM updates.
- Scalloped edges are made with CSS only (mask or radial-gradient), not SVG art.
- All motion respects prefers-reduced-motion.
- Do not use the official Los Pollos Hermanos logo. Build an original wordmark.
```

### Using it in each prompt

1. Phase 1 is logic only and does not need it.
2. For Phases 2 to 6, paste the Taste Skill text and the Project Style Guide at the start of the chat (section 12), then tell Opus to follow them before writing any UI.
3. At the end of each UI phase, ask the agent to list its pre-flight check results honestly, including any rule it waived and why.
4. If the agent resists a mockup behavior because of a ban, point it to the Project Style Guide at the top of the file rather than editing the rules piecemeal.
5. Re-check after any Taste Skill update, since v2 is still changing.

---

## 8. Phased build plan and prompts

Why phases: it keeps animation code from tangling with cart logic, and each phase can be reviewed and committed on its own.

| Phase | Output | Taste Skill |
|---|---|---|
| 1 | Foundation: routing, data, cart logic, tests | Not needed yet |
| 2 | Design system, navbar, footer, base components | Yes |
| 3 | Home page static sections | Yes |
| 4 | Shop and Cart styling | Yes |
| 5 | Motion pass (5a to 5f) | Yes |
| 6 | Polish, accessibility, deploy | Yes |

### Master context (paste at the start of every new chat)

```text
PROJECT CONTEXT

You are helping me build a React shopping cart app for The Odin Project's
"Shopping Cart" assignment. It is visually modeled on a Framer template
called "Matcha Shop" and re-themed as "Los Pollos Hermanos", a fictional
fried chicken restaurant. You cannot see my files or run code, so I will
paste whatever you need and I will run everything myself.

Theme: light only. Yellow #F6BE00 brand surface, red #C8102E as the single
accent, cream #FFF7E0 page background, ink #1B1208. Bold condensed display
font for headings, clean sans for body, large soft corners everywhere.
Original text-based wordmark only.

Stack: Vite, React (JavaScript/JSX), React Router, CSS Modules, GSAP with
ScrollTrigger for scroll effects, Vitest with React Testing Library.
Pages: Home (/), Shop (/shop), Cart (/cart), plus a Not Found page.
Cart state: React Context with useReducer. Menu data: public/menu.json
loaded with fetch().

Odin requirements that must always hold:
- Navbar on every page with a live Cart item-count badge.
- Shop cards: title, price, typed quantity input, +/- buttons, Add to Cart.
- Cart page: list items, change quantity, remove items. No checkout.
- RTL tests for the cart behavior. Never test react-router itself.

Rules:
- Only work on the phase I name. Do not modify earlier phases unless a bug
  requires it, and tell me if you do.
- Do not add dependencies beyond the ones listed without asking.
- No placeholder comments or skipped sections. Finish what you start.
- Do not use the official Los Pollos Hermanos logo or any copyrighted assets.
- No em dashes or en dashes in site copy.
- Output format: give every file as a heading line "FILE: path/to/file"
  followed by one fenced code block with the COMPLETE file contents. Never
  use "...", "rest unchanged" or partial snippets for a file. If the answer
  would be too long, stop after a complete file and tell me which files
  are still to come.
- After the files, list: (1) npm packages to install, (2) commands to run,
  (3) what I should see in the browser or terminal, (4) anything you were
  unsure about. You cannot run tests or the app, so never claim something
  was tested or verified.
```

### Phase 1 prompt: Foundation

```text
PHASE 1: Foundation (logic and structure only, minimal styling)

Goal: a working, tested app skeleton that satisfies all Odin requirements
before any visual design work.

Tasks:
1. I have already scaffolded the Vite React (JavaScript) project and
   installed react-router-dom, vitest, jsdom and the Testing Library
   packages. Give me the vite.config.js test setup, then set up React Router
   with routes /, /shop, /cart and a * Not Found route, using a shared layout
   with the Navbar and an <Outlet />.
2. Create public/menu.json with the 9 items using the schema and item list
   I pasted, with placeholder image paths.
3. Create src/api/menu.js (fetchMenu) and src/hooks/useMenu.js returning
   { items, loading, error }.
4. Create CartContext with useReducer (actions: ADD, SET_QTY, INCREMENT,
   DECREMENT, REMOVE, CLEAR). Expose totalItems and subtotal. Quantity rules:
   integer 1 to 99; the typed input may be empty while editing and clamps on
   blur; on the Cart page decrementing at 1 removes the item.
5. Navbar: links to Menu (/shop), About (/#whyus), Visit us (/#visitus),
   Cart with a live count badge. Anchor links must work from any page.
6. Shop page: ProductCard with QuantityInput (typed input plus +/-) and an
   Add to Cart button. Show loading and error states.
7. Cart page: CartItem rows with quantity controls and remove, a subtotal,
   and an empty state linking back to the shop. No checkout.
8. Home page: simple placeholder content with a link to the shop.
9. Tests (Vitest + React Testing Library): QuantityInput behavior, adding to
   cart updates the navbar badge, cart quantity edit and removal, subtotal,
   loading and error states for the menu (mock fetch). Add a test setup file
   mocking IntersectionObserver and matchMedia.
10. Add public/_redirects (Netlify: /* /index.html 200) and vercel.json
    (rewrite everything to /index.html).

Acceptance:
- All Odin requirements work in the browser.
- npm test passes.
- Styling is minimal but the markup is semantic and accessible (labels on
  inputs, buttons with accessible names).
```

### Phase 2 prompt: Design system

```text
PHASE 2: Design system and shell

Follow the Taste Skill text and Project Style Guide I pasted at the start of
this chat before writing any UI. State your one-line design read first.

Goal: tokens, base components, navbar and footer in the Los Pollos Hermanos
theme, matching the Matcha Shop template's feel.

Tasks:
1. src/styles/tokens.css: colors, fonts, radii, spacing, shadows from
   docs/PLAN.md section 5. Load a condensed display font and a body font
   (Google Fonts, with real fallback stacks).
2. Base components: Button (primary red, secondary outline, pill), Tag,
   Container, SectionHeading.
3. ScallopEdge: a CSS-only scalloped edge (mask or radial-gradient) that can
   attach to the top or bottom of a section, with a color prop. No motion yet.
4. Navbar: floating centered pill, 80px max height, logo wordmark (original,
   text-based), links, Cart badge. Solid for now; glass effect comes in 5b.
5. Footer: giant wordmark filling the width, contact info, three link
   columns, copyright line, scalloped top edge.

Constraints: follow the Locks (one accent, one radius system, light theme).
Do not touch cart logic.

Acceptance: components render correctly at 1440px and 390px widths; give me
the Taste Skill pre-flight results at the end.
```

### Phase 3 prompt: Home page

```text
PHASE 3: Home page (static, no animation yet)

Follow the pasted Taste Skill and Project Style Guide. Build the Home page
sections in this order, using the copy mapping table I pasted:

1. Hero: headline max 2 lines, subtext max 20 words, buttons "Order now"
   (/shop) and "Visit us" (#visitus), full-bleed image with scalloped bottom.
2. Value strip: heading, three equal cards (allowed by the Project Style
   Guide), icon, title, one line each, avatar stack with "3k+ happy regulars".
3. Ticker tape: tilted band with "FRESH POLLO TIME" and "Visit us and try our
   famous chicken" repeated. Static for now but structured as a duplicated
   track so 5a can animate it.
4. Favorites (id="bestsellers"): the 3 items with featured: true from the
   menu hook, as large horizontal cards (image, title, blurb, tags beside the
   image). A link to /shop. Static layout; stacking comes in 5c.
5. Why us (id="whyus"): bento grid with a media card, a stats card ("900+"),
   a quality card with avatars, and a tall photo card.
6. Testimonials: image, quote, name and role, prev/next buttons. Write 3
   original testimonials. Static first slide for now.
7. Visit us (id="visitus"): yellow section, address, hours, directions button
   (link to a maps URL), scalloped bottom edge.
8. FAQ (id="faq"): accessible accordion, 5 original questions.

Constraints: reuse Phase 2 components and tokens. Placeholder images are
fine; use a consistent aspect ratio and alt text. Do not touch cart logic.

Acceptance: all anchors scroll to the right section, layout holds at 1440px
and 390px, pre-flight results reported.
```

### Phase 4 prompt: Shop and Cart styling

```text
PHASE 4: Shop and Cart pages in the same visual language

Follow the pasted Taste Skill and Project Style Guide. These pages do not
exist in the mockup, so design them to feel like they belong to it.

Shop page:
- Page heading with a short intro, then a responsive grid of ProductCards.
- ProductCard: image with hover swap to altImage (opacity transition),
  title, price, tags (beside or below the image, not on it), QuantityInput,
  Add to Cart button. After adding, the button shows "Added" briefly.
- Skeleton or simple loading state, and a friendly error state with retry.

Cart page:
- Two-column layout on desktop: item list left, summary card right (subtotal
  and a "Continue ordering" link). Single column on mobile.
- CartItem: thumbnail, title, price, quantity controls, remove button,
  line total.
- Empty state with a clear call to action.
- No checkout. Make it clear this is a demo (one short line of copy).

Constraints: keep all Phase 1 behavior and tests passing. Update tests only
where markup changes require it, and tell me what you changed.
```

### Phase 5 prompts: Motion pass (send one at a time)

Shared preamble for every 5x prompt:

```text
Follow the pasted Taste Skill and Project Style Guide. All motion must respect prefers-reduced-motion via the
useReducedMotion hook (reduced motion shows the final static state). No
window scroll listeners. No React state updates inside mousemove, scroll or
animation frames. Clean up all GSAP contexts on unmount (useGSAP or
gsap.context). Keep tests passing; mock animation libraries in tests where
needed.
```

**5a: Marquee and scalloped edges**

```text
Animate the ticker tape (infinite right-to-left loop, seamless, slight tilt,
pauses nothing, pure CSS keyframes with a duplicated track) and the scalloped
edges (slow infinite horizontal drift using background-position or
mask-position). The same Marquee component is reused for the ticker in two
places on Home. Speeds should be tokens in tokens.css.
```

**5b: Glass navbar and scroll reveals**

```text
Navbar: transparent at the top, switches to a frosted-glass pill
(backdrop-filter blur, subtle shadow) once the page scrolls past a small
threshold. Use an IntersectionObserver sentinel or ScrollTrigger, not a
scroll listener. Create a Reveal component (fade and rise with stagger) and
apply it to section headings and cards across Home.
```

**5c: Sticky card stack (Favorites)**

```text
Make the three Favorites cards pile on top of each other as the user
scrolls: each card is position: sticky with a slightly larger top offset
than the previous one, and earlier cards scale down slightly and rotate a
few degrees as the next card covers them (GSAP ScrollTrigger scrub, using the
Taste Skill sticky-stack skeleton). Cards use different tinted backgrounds
from the palette. Disable the scrub on reduced motion, leaving a normal
stacked list.
```

**5d: Carousel and count-up**

```text
Testimonial carousel: prev/next buttons, keyboard accessible, slide/fade
transition, loops, announces slide changes to screen readers (aria-live
polite). Count-up: the "900+" stat counts from 0 when it enters the viewport,
once only, formatted with the plus sign.
```

**5e: Cursor image trail (Visit us)**

```text
Desktop only (matchMedia: fine pointer and hover). While the mouse moves over
the Visit us section, spawn small photos near the cursor that follow its
path, then fade and shrink away after about 1 second. Implement with a fixed
pool of absolutely positioned DOM nodes moved and faded through refs and GSAP
(no React state per mouse event), throttled by distance moved. Photos come
from a small array of placeholder images. Disabled on touch devices and on
reduced motion. Clean up listeners on unmount.
```

**5f: Ingredient media card**

```text
In the Why us bento grid, the media card shows a looping, muted, playsinline
video (poster image included, no autoplay audio). If no video file is
provided, build a CSS 3D turntable of the product image instead (slow
rotateY loop with perspective). Pause when off screen using
IntersectionObserver.
```

### Phase 6 prompt: Polish and deploy

```text
PHASE 6: Polish, accessibility, deployment

Tasks:
1. Responsive pass at 390, 768, 1024 and 1440px. Fix overflow, tap target
   sizes (min 44px) and spacing.
2. Accessibility pass: focus states, skip link, aria labels, heading order,
   alt text, contrast checks (AA), accordion and carousel semantics.
3. Performance: lazy-load below-the-fold images, set image width/height,
   use modern formats where available, avoid layout shift.
4. Final Taste Skill pre-flight check, reported honestly line by line.
5. Run the full test suite and fix anything flaky.
6. Write a README: what this is, how to run and test, project structure,
   credits (Matcha Shop template by Ava Thiery was used as a visual
   reference only; fictional brand disclaimer), and deployment notes.
7. Verify SPA routing config: public/_redirects for Netlify and vercel.json
   for Vercel. Confirm refreshing /shop and /cart works after deploy.
```

---

## 9. Testing checklist

- QuantityInput: typing, +/- buttons, clamping to 1 to 99, empty while editing.
- Adding an item updates the navbar badge immediately.
- Adding the same item twice sums quantities.
- Cart page: increment, decrement, decrement-at-1 removes, remove button, subtotal.
- Empty cart state.
- Menu loading state and error state (mock `fetch`).
- Not testing: `react-router` internals. Test your own links render and navigate by outcome, not by library behavior.
- Test environment: mock `IntersectionObserver` and `matchMedia`, and stub GSAP or animation components so tests stay fast and deterministic.

---

## 10. Deployment

From the Odin assignment, a single-page app needs all routes redirected to `index.html`:

**Netlify**, file `public/_redirects`:

```text
/* /index.html 200
```

**Vercel**, file `vercel.json` at the project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Cloudflare Pages** needs no extra configuration for this.

---

## 11. Risks and open items

- **Taste Skill v2 is experimental.** Rules and section numbering may change. Re-read the skill file after updating.
- **Template vs anti-template.** The skill is designed to discourage template-like output, so expect pushback on mockup-faithful choices. The Project Style Guide is the mechanism for resolving it.
- **Learning goal.** Odin is a skill-building exercise. Consider writing the Phase 1 cart logic and tests yourself (or asking the agent to explain each choice) and letting the agent handle the visual phases.
- **Assets.** Replace placeholder images and add a video (or accept the CSS turntable) before the final polish pass.
- **Licensing.** The Framer template's photos and exact assets are not yours to reuse. Use your own or freely licensed images.
- **Unverified details.** Animation timings are inferred from screenshots. Treat numbers in the prompts as starting values.

---

## 12. Chat-only workflow (Opus without file access)

Everything above assumed a coding agent. With Opus in a chat app, the plan stays the same but the mechanics change.

### What changes

| Plan assumed | Reality in a chat app | What you do |
|---|---|---|
| Agent installs Taste Skill with `npx` | Opus can't install anything | Paste the `SKILL.md` text into the chat |
| Agent reads `docs/PLAN.md` | Opus can't see your repo | Paste the relevant sections with each phase (table below) |
| Agent edits files | Opus can only output text | Opus outputs complete files, you replace them in your editor |
| Agent runs tests and checks the UI | Opus can't run anything | You run `npm test` and the dev server, then paste errors or screenshots back |
| One long agent session | Chats lose track of details over time | One chat per phase, with a short state summary carried forward |

### Phase 0: do this yourself, once

```bash
npm create vite@latest los-pollos -- --template react
cd los-pollos
npm install
npm install react-router-dom gsap @gsap/react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
git init && git add -A && git commit -m "Initial scaffold"
npm run dev
```

If the Vite prompt asks questions, choose React and JavaScript. Commit to git after every phase so a bad paste is easy to undo.

### Getting the Taste Skill text into the chat

1. Get the `SKILL.md` for `design-taste-frontend-v2-experimental`. Either run `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v2-experimental"` in a scratch folder and find the `SKILL.md` it creates, or browse the `skills/` folder of the `Leonxlnx/taste-skill` GitHub repo, open the folder whose `SKILL.md` frontmatter says `name: design-taste-frontend-v2-experimental` (the folder name can differ from the install name), click Raw, and save it.
2. It is long (reported at roughly 900 lines), so paste it once at the start of each UI-phase chat (Phases 2 to 6), followed by the Project Style Guide from section 7. Put the Style Guide at the top, as the docs recommend.
3. If your chat app has a "project" or "custom instructions" feature, store the skill and Style Guide there so you don't repeat the paste.
4. Optional trimming if the chat gets crowded: keep brief inference, the locks, hero discipline, the ban list, the animation skeletons and the pre-flight check. The docs list dark mode, the redesign protocol and the block library as sections you don't need for this project. Check the real headings in the file, since the docs warn that section numbering may change.
5. Skim the file first. It controls what Opus does, so read it like any dependency.

### Phase 1 is too big for one answer, so split it

| Step | Ask for |
|---|---|
| 1a | `vite.config.js` test setup, test setup file, router, layout, Navbar shell, `menu.json`, `fetchMenu`, `useMenu` |
| 1b | `cartReducer`, `CartContext`, navbar badge, Shop page with `ProductCard` and `QuantityInput` |
| 1c | Cart page with `CartItem`, Home placeholder, Not Found, redirect files, and the full test suite |

Use the Phase 1 prompt, but tell Opus which step you want and to ignore the others.

### What to paste with each phase

| Phase | Paste at the start of the chat |
|---|---|
| 1a | Master context, section 6 (routes, navbar links, folder structure), the Menu data schema and item list from section 5 |
| 1b | Master context, section 6 cart state rules, the current files from 1a that need to connect (`useMenu`, layout) |
| 1c | Master context, the current `CartContext` and `ProductCard` files |
| 2 | Master context, Taste Skill text, Style Guide, section 5 palette, type and shape |
| 3 | Same as 2, plus the copy mapping table (section 5), and the current `tokens.css`, `Button`, `ScallopEdge` and `useMenu` |
| 4 | Same as 2, plus current `ProductCard`, `QuantityInput`, `CartItem`, `CartContext` (its exported API) and `tokens.css` |
| 5a to 5f | Same as 2, plus the current files being animated and `tokens.css`. Send one sub-phase per chat or message |
| 6 | Same as 2, plus your file tree and a list of known issues |

### The loop for every phase

1. Start a new chat. Paste the pasted material from the table above.
2. Send the phase prompt.
3. Copy each `FILE:` block into the matching path. Install any packages Opus lists.
4. Run the app and the tests. Fix with the bug-report template below.
5. Commit to git.
6. Before leaving the chat, ask: "Write a state summary I can paste into the next chat."

**Bug report template**

```text
Phase X issue.
What I did:
What I expected:
What happened (paste the exact terminal or browser console error):
Files involved (paste their current full contents):
```

**State summary template** (Opus can write this for you)

```text
STATE SUMMARY (end of Phase N)
Done:
File tree:
Key APIs: what CartContext exposes, what useMenu returns, component props
Decisions made:
Known issues:
```

### Verifying without Opus running anything

Since Opus cannot run code, "tested" from Opus means "reviewed", not "executed". Check these yourself after each phase:

- `npm test` passes (paste failures back verbatim).
- Browser console shows no errors or warnings.
- Resize to 390, 768 and 1440px.
- Tab through the page with the keyboard.
- In Chrome DevTools, open the Rendering panel and emulate `prefers-reduced-motion` to confirm motion calms down.
- If your chat app accepts images, send a screenshot of your result next to the matching template screenshot and ask Opus to list the differences.
- The Taste Skill pre-flight check is a self-review of the code. It cannot judge how the page actually looks, so your own eyes are the final check.

### Learning angle

Because you are copying every file by hand, you have a natural review step. Read each file before pasting it, and for the cart logic in Phase 1 consider asking Opus to explain each choice in two sentences, so the Odin assignment still teaches you something.
