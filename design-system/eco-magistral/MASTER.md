# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** ECO MAGISTRAL
**Generated:** 2026-07-18 01:30:35
**Category:** Construction/Architecture
**Design Dials:** Variance 8/10 (Bold / Asymmetric) | Motion 7/10 (Standard) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#123D2C` | `--color-primary` |
| On Primary | `#F2F4EF` | `--color-on-primary` |
| Secondary | `#171D1A` | `--color-secondary` |
| Accent/CTA | `#205C42` | `--color-accent` |
| Background | `#F2F4EF` | `--color-background` |
| Foreground | `#171D1A` | `--color-foreground` |
| Muted | `#E8EBE5` | `--color-muted` |
| Border | `rgba(23,29,26,0.14)` | `--color-border` |
| Destructive | `#A23333` | `--color-destructive` |
| Ring | `#205C42` | `--color-ring` |

**Color Notes:** Cold architectural forest palette with graphite and mineral off-white

#### Dark Theme

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#0D1410` | `--paper` |
| Elevated Surface | `#131D17` | `--paper-deep` |
| Tinted Section | `#101A14` | `--section-tint` |
| Primary Text | `#EDF3EE` | `--ink` |
| Secondary Text | `#A5B0A9` | `--ink-muted` |
| Brand Surface | `#215F43` | `--forest` |
| Interactive Accent | `#73C99C` | `--accent` |
| Footer Shell | `#070B09` | `--footer-shell` |

Dark mode uses layered forest-graphite surfaces rather than inverted colors. Bright accent green is reserved for text, icons, focus and fine borders; deep brand green remains the button and panel surface so white labels retain AA contrast.

### Typography

- **Heading Font:** Manrope Variable
- **Body Font:** Manrope Variable
- **Mood:** architectural, technical, calm, premium, geometric, international
- **Delivery:** self-hosted through `@fontsource-variable/manrope`

**CSS Import:**
```css
@import "@fontsource-variable/manrope";
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #123D2C;
  color: #F2F4EF;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #171D1A;
  border: 1px solid rgba(23,29,26,0.25);
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F2F4EF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 0;
  border-bottom: 1px solid rgba(23,29,26,0.28);
  border-radius: 0;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #123D2C;
  outline: none;
  box-shadow: none;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Bento Grids

**Keywords:** Apple-style, modular, cards, organized, clean, hierarchy, grid, rounded, soft

**Best For:** Product features, dashboards, personal sites, marketing summaries, galleries

**Key Effects:** Hover scale (1.02), soft shadow expansion, smooth layout shifts, content reveal

### Page Pattern

**Pattern Name:** Minimal Single Column

- **Conversion Strategy:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Section Order:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ 2D-only layouts
- ❌ Poor image quality
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
