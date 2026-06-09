# FinSense Africa — Motion Ad

A 11.5-second (345 frames @ 30 fps, 1080×1080) promotional video built with [Remotion](https://www.remotion.dev/).

## Scenes

| # | Scene | Duration | Transition out |
|---|-------|----------|----------------|
| 1 | Brand Intro | 3.0 s | Fade |
| 2 | Instant Payments | 2.5 s | Slide from right |
| 3 | Smart Credit | 2.5 s | Fade |
| 4 | Know Your Numbers (Analytics) | 2.5 s | Slide from bottom |
| 5 | CTA | 3.0 s | — |

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
| Colour palette | Constants at top of each scene (`GREEN`, `TEAL`, `GOLD`) |
| Duration / fps | `src/Root.tsx` |
| Scene order / transitions | `src/FinsenseAd.tsx` |

## Dependencies

- `remotion` — core rendering engine
- `@remotion/transitions` — `TransitionSeries`, `fade()`, `slide()`
- `@remotion/google-fonts` — Inter font (loaded type-safely, blocks render until ready)
