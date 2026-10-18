# Cubical Dot

Portfolio site for Cubical Dot, an independent digital design studio. The site designs and redesigns websites for premium brands selling across borders.

The visual system follows the studio brand: Inter for the site, Poppins Medium for the wordmark, brand black `#0A0A0A`, ivory `#F9F9F7`, electric violet `#6318FF`, and neon lime `#D7FF3F`. The mark is a blue rounded square with a lime dot on the baseline. Opening the site shows a loading screen: the mark is stroked, filled, and rounded, the dot travels into place, the Poppins wordmark arrives, then a white construction grid draws across the finished lockup and clears.

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

The studies are representative engagements, written to show how a project is framed. They are not a client roster. The contact form prepares an email draft to `hello@cubicaldot.com`. It does not store the message on a server.

Motion uses [GSAP](https://gsap.com/) and ScrollTrigger. Visitors who prefer reduced motion get the same pages without pinned sequences or entrance tweens.
