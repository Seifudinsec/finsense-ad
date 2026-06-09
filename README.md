# FinSense Africa — Motion Ad

A 23-second (690 frames @ 30 fps, 1080×1080) promotional video built with [Remotion](https://www.remotion.dev/).

## Scenes

| # | Scene | Duration | Transition out |
|---|-------|----------|----------------|
| 1 | Brand Intro | 4.5 s | Fade |
| 2 | Core Banking & APIs | 4.0 s | Slide from right |
| 3 | DevOps & Cloud | 4.0 s | Fade |
| 4 | Proven Impact | 4.0 s | Slide from bottom |
| 5 | Testimonials & Alliances | 5.0 s | Fade |
| 6 | CTA | 4.5 s | — |

## Setup

```bash
npm install
```

## Preview in Remotion Studio

```bash
npm start
# → opens http://localhost:3000
```

## Render to MP4

```bash
npm run render
# → out/finsense-ad.mp4
```

## Customising

| What to change | File |
|----------------|------|
| Stats / copy | Each `src/scenes/*.tsx` file |
| Colour palette | Constants at top of each scene (`RED`, `LIGHT_RED`, `BG`) |
| Duration / fps | `src/Root.tsx` |
| Scene order / transitions | `src/FinsenseAd.tsx` |

## Dependencies

- `remotion` — core rendering engine
- `@remotion/transitions` — `TransitionSeries`, `fade()`, `slide()`
- `@remotion/google-fonts` — Inter font (loaded type-safely, blocks render until ready)
