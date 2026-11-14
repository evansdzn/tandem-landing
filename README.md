# Tandem landing page

Next.js 15 (App Router) build of the Figma file **Tandem WIP → Nu Design**, with GSAP + ScrollTrigger and Lenis smooth scrolling.

```bash
npm install
npm run dev     # http://localhost:3100
```

## Where things live
- `lib/content.ts`: all copy (nav, logos, stats, steps, testimonials, plans, FAQ, footer)
- `lib/gsap.ts`: GSAP setup, shared eases, the count-up helper
- `components/`: one file per section; `Panels.tsx` holds the floating product UI cards
- `app/globals.css`: tokens, layout, and responsive rules

## Still to do
- **Compliance claim:** confirm the SOC 2 Type II / GDPR wording in the "Is candidate data safe?" FAQ (`lib/content.ts`).

## Hero video
`public/video/hero.mp4` (1280×720, 10 s, muted loop). `public/video/hero-poster.png` shows while it loads, and stays up if the browser blocks autoplay.

## Motion notes
- Everything respects `prefers-reduced-motion` (loops stop, reveals are skipped).
- How It Works pins and steps through on screens ≥1024×1000. Shorter screens activate the step nearest the middle without pinning.
