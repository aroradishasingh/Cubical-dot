# Cubical Dot

Portfolio site for Cubical Dot, an independent digital design studio. The site designs and redesigns websites for premium brands selling across borders.

The visual system follows the studio brand: Inter for the site, Poppins Medium for the wordmark, brand black `#0A0A0A`, ivory `#F9F9F7`, electric violet `#6318FF`, and neon lime `#D7FF3F`. The mark is a blue square with a rounded top-left corner, a rounded bottom-right corner, and a lime dot on the same bottom edge as the Poppins wordmark. Opening the site shows a loading screen: the mark is stroked, filled, and the two corners round into the final slab, the dot travels out along the baseline, the wordmark arrives on that baseline, then a construction grid frames the whole lockup — corner circles, the dot, and the baseline — and clears.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4317](http://127.0.0.1:4317).

```bash
npm run lint
npm run build
```

## Pages

- `/` — motion landing
- `/work` and `/work/[slug]` — studio studies
- `/services` — practice, investment, questions
- `/about` — the mark, the method, the palette
- `/blog` and `/blog/[slug]` — studio notes
- `/contact` — project brief

The studies are work for Trimble, Inshorts, Supr Daily, and independent brands. The contact form prepares an email draft to `hello@cubicaldot.com`. It does not store the message on a server.

Motion uses [GSAP](https://gsap.com/) and ScrollTrigger. Visitors who prefer reduced motion get the same pages without pinned sequences or entrance tweens.
