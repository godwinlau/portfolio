# Portfolio Site PRD
## Godwin Laureto — Product Designer Who Ships Code

---

## Overview

A personal portfolio website showcasing Godwin's hybrid design-development skills. The site should feel modern, confident, and slightly playful — inspired by portfolios like Darius Dan (dariusdan.com), Šefik Mujkić (sefikmujkic.com), and Daniella (hellodani.co).

**Live URL:** godwinlaureto.com  
**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion  
**Deployment:** Vercel

---

## Design Specifications

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#fafafa` | Page background |
| `--text` | `#171717` | Primary text |
| `--muted` | `#737373` | Secondary text, timestamps |
| `--accent` | `#2563eb` | Links, hover states, CTA |
| `--bubble` | `#f4f4f5` | Chat bubble, tags |
| `--border` | `#e4e4e7` | Borders, dividers |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headlines | Instrument Serif | 400 | 48–72px |
| Body | Plus Jakarta Sans | 400, 500, 600 | 14–18px |
| Tags/Labels | Plus Jakarta Sans | 500 | 12px |
| Code/Numbers | JetBrains Mono (optional) | 400 | 12px |

**Font Loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Animations

- **Page load:** Staggered fade-up (0.1s delay between elements)
- **Hover states:** Arrow moves up-right on links, color transitions
- **Scroll:** Smooth scroll behavior
- **Slider:** Horizontal auto-scroll with drag support

---

## Site Structure

### 01 — Header (Fixed)

**Position:** Fixed top, blur backdrop  
**Height:** 60px  
**Max-width:** 1024px centered

| Left | Right |
|------|-------|
| `Godwin Laureto` (text-sm, font-medium) | `hello@godwinlaureto.com` (text-sm, muted, hover:accent) |

---

### 02 — Hero Section

**Padding:** pt-40 pb-20 (desktop), pt-32 pb-16 (mobile)  
**Max-width:** 1024px

#### Headline
```
Product designer
who ships code.
```
- Font: Instrument Serif
- Size: text-5xl md:text-6xl lg:text-7xl
- Leading: 1.1
- No italics needed

#### CTA Link
```
↗ hello@godwinlaureto.com
```
- Positioned below headline
- Icon: Arrow pointing up-right (SVG)
- Arrow animates on hover (translate 2px up-right)
- Style: Pill button with accent background OR simple text link with arrow

#### Chat Bubble Bio

**Layout:**
```
[Avatar]  ┌─────────────────────────────────────────────┐
  GL      │ Hey, Godwin here 👋                         │
          │                                             │
          │ Product engineer — design and frontend in   │
          │ one workflow. Currently at Appetiser.       │
          │ Previously shipping Shopify themes at       │
          │ Fluorescent.                                │
          └─────────────────────────────────────────────┘
          2 mins ago ✓✓
```

**Specs:**
- Avatar: 40x40px circle, gray bg, "GL" initials (or photo later)
- Bubble: bg-bubble, border border-border, rounded-2xl rounded-tl-sm
- Padding: px-5 py-4
- Greeting: text-sm, muted, mb-1
- Bio: text-[15px], leading-relaxed
- Links in bio: underline, hover:accent
- Timestamp: text-xs, muted, opacity-60, ml-14 (aligned with bubble)

---

### 03 — Work Slider Section

**Purpose:** Quick visual showcase of work before diving into case studies

#### Section Header
```
🚀 A few things I've built
```
- Emoji + text inline
- text-base, muted

#### Slider

**Behavior:**
- Horizontal scroll
- Auto-scroll (optional, slow)
- Draggable
- No scrollbar visible
- Infinite loop (optional)

**Cards:**
- Width: 300–400px
- Height: Auto (aspect-ratio 4:3 or 16:10)
- Border-radius: 12px
- Shadow: subtle
- Gap: 16px between cards

**Content per card:**
- Project screenshot/mockup (image fills card)
- No text overlay needed (or optional project name on hover)

**Projects to show:**
1. Woven (Shopify theme)
2. Before Nine (Shopify theme)
3. HouseM8s (Product design)
4. Blaze2B (Marketing site)
5. PayMongo Dashboard (Fintech UI)
6. Any other visual work

---

### 04 — Case Studies Section

#### Section Header
```
A closer look
```
**Subtext:**
```
Products I've taken from concept to production — design and code, one workflow.
```

- Title: text-2xl or text-3xl, Instrument Serif
- Subtext: text-base, muted, max-w-lg

#### Project List

**Layout:** Vertical list with dividers

**Per project row:**
```
01    Woven                                    [Shopify] [Liquid] [Tailwind]    ↗
      Shopify theme for Fluorescent. 
      Full architecture and frontend — shipped to production.
```

**Specs:**
- Number: text-xs, font-mono, muted
- Title: text-xl md:text-2xl, font-medium, hover:accent
- Description: text-sm, muted, max-w-lg
- Tags: text-xs, px-2 py-1, rounded-full, bg-bubble, border
- Arrow: Moves on hover

**Projects:**

| # | Title | Description | Tags |
|---|-------|-------------|------|
| 01 | Woven | Shopify theme for Fluorescent. Full architecture and frontend — shipped to production. | Shopify, Liquid, Tailwind CSS |
| 02 | Before Nine | E-commerce theme for a men's skincare brand. Design to deployment. | Shopify, Figma, CSS |
| 03 | HouseM8s | Product design for a share-housing platform. Onboarding, discovery, design system. | Figma, Product Design, UX |

**Interaction:**
- Entire row is clickable
- Links to `/work/[slug]` (case study page) or external link
- Hover: title turns accent, arrow animates

---

### 05 — Stack / Capabilities Section

#### Section Header
```
I've got your back with...
```
**Subtext:**
```
Products that look great and actually work — design to code.
```

- Title: text-2xl or text-3xl, Instrument Serif
- Subtext: text-base, muted

#### Skills Grid

**Layout:** 3-column grid (desktop), 2-column (tablet), 1-column (mobile)  
**Gap:** 24px vertical, 48px horizontal

| Design | Development | Tools |
|--------|-------------|-------|
| Product Design | React / Next.js | Shopify |
| UI/UX | TypeScript | Framer |
| Design Systems | Tailwind CSS | Vercel |
| Figma | Liquid | Git |

**Specs per item:**
- Text: text-base or text-sm
- Optional: Dotted underline (like the reference)
- Optional: Icon per category header

---

### 06 — About Section

#### Section Header
```
About
```
- text-xs, uppercase, tracking-widest, muted

#### Content

```
Product engineer based in the Philippines, working remotely with teams worldwide.

I specialize in taking products from concept to production — handling both design and frontend development. This means faster iteration, fewer handoff issues, and interfaces that actually match the vision.

My background spans MVP design, UX engineering, and Shopify theme development. I'm most useful when speed and quality both matter.
```

**Specs:**
- First paragraph: text-lg
- Rest: text-base, muted
- Max-width: 640px
- Paragraph spacing: space-y-5

---

### 07 — Footer / Contact

**Layout:** Two columns (desktop), stacked (mobile)

#### Left Side
```
Open to remote roles and select projects.
hello@godwinlaureto.com  ← Large, Instrument Serif
```

#### Right Side
```
GitHub · LinkedIn
```

#### Bottom
```
© 2026 Godwin Laureto
```

**Specs:**
- CTA text: text-sm, muted
- Email: text-2xl md:text-3xl, Instrument Serif, hover:accent
- Social links: text-sm, muted, hover:accent
- Copyright: text-xs, muted, opacity-50, mt-12

---

## Component Checklist

- [ ] `Header` — Fixed nav with blur
- [ ] `Hero` — Headline + CTA + Chat bubble
- [ ] `WorkSlider` — Horizontal scroll of project images
- [ ] `CaseStudies` — Project list with hover states
- [ ] `StackGrid` — 3-column skills grid
- [ ] `About` — Text section
- [ ] `Footer` — Contact + socials
- [ ] `ProjectCard` — Reusable for slider
- [ ] `ProjectRow` — Reusable for case studies list

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home (all sections above) |
| `/work/[slug]` | Individual case study (future) |

---

## Assets Needed

- [ ] Project screenshots (Woven, Before Nine, HouseM8s, etc.)
- [ ] Avatar photo (or keep initials)
- [ ] Favicon
- [ ] OG image (1200x630)

---

## SEO / Meta

```html
<title>Godwin Laureto — Product Designer Who Ships Code</title>
<meta name="description" content="Product engineer specializing in design and frontend development. From Figma to production — one workflow, no handoffs." />

<!-- Open Graph -->
<meta property="og:title" content="Godwin Laureto — Product Designer Who Ships Code" />
<meta property="og:description" content="Product engineer specializing in design and frontend development. From Figma to production — one workflow, no handoffs." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
```

---

## Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

**Key adjustments:**
- Header: Stack on mobile (optional)
- Hero headline: Scale down font size
- Work slider: Full bleed on mobile
- Case studies: Hide tags on mobile, show below description
- Stack grid: 1 column on mobile
- Footer: Stack vertically on mobile

---

## Performance Goals

- Lighthouse score: 90+
- First Contentful Paint: < 1.5s
- Images: WebP format, lazy loaded
- Fonts: Preloaded, swap display

---

## Future Enhancements

- [ ] Case study detail pages with full write-ups
- [ ] Blog / writing section
- [ ] Dark mode toggle
- [ ] Animated page transitions
- [ ] Contact form (Formspree or similar)