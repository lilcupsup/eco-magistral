# ECO MAGISTRAL

Premium, responsive infrastructure-company homepage built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: canonical production origin for SEO metadata.
- `CONTACT_WEBHOOK_URL`: HTTPS endpoint that receives validated enquiry JSON.

The contact form deliberately returns a visible unavailable state when no webhook is configured. It never reports success while discarding an enquiry.

## Media

- Project photography and the hero poster were generated specifically for ECO MAGISTRAL and optimized to AVIF for web delivery.
- The local hero film is the free-to-use Pexels clip [Drone Video of a Road in a Mountain Valley](https://www.pexels.com/video/drone-video-of-a-road-in-a-mountain-valley-13978571/) by Serg Alesenko. Review the [Pexels license](https://www.pexels.com/license/) before redistribution.

## Interaction system

- GSAP + ScrollTrigger: one desktop horizontal project story.
- Motion: entrances, menu and gallery state transitions.
- Lenis: smooth wheel scrolling with reduced-motion fallback.
- Swiper: touch-friendly gallery.
- Lucide: consistent outline icon family.

All motion respects `prefers-reduced-motion`. The desktop navigation, mobile menu, form controls and gallery lightbox are keyboard accessible.
