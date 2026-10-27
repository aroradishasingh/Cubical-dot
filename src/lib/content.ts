export const studio = {
  name: "Cubical Dot",
  email: "mayank@cubicaldot.com",
  url: "https://cubicaldot.com",
  line: "A design studio for what's next.",
  lockup: "Ideas in motion. Design in every detail.",
  description:
    "Cubical Dot is an independent digital design studio. We design and redesign websites for premium brands that sell across borders.",
};

export const designedFor = [
  // ratio = intrinsic width / height of the artwork. The strip uses it to give
  // every mark the same visual weight instead of the same height.
  { name: "Amazon", src: "/logos/amazon.svg", ratio: 3.31 },
  { name: "NVIDIA", src: "/logos/nvidia.svg", ratio: 5.42 },
  { name: "AffinityX", src: "/logos/affinityx.png", ratio: 5.52 },
  { name: "Trimble", src: "/logos/trimble.svg", ratio: 4.27 },
  { name: "Vistaprint", src: "/logos/vistaprint.png", ratio: 5.1 },
  { name: "Noise", src: "/logos/noise.svg", ratio: 4.47 },
  { name: "Fire-Boltt", src: "/logos/fire-boltt.png", ratio: 5.58 },
  { name: "OnePlus", src: "/logos/oneplus.svg", ratio: 1 },
  { name: "vivo", src: "/logos/vivo.svg", ratio: 3.82 },
] as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export type Composition = "orbit" | "eclipse" | "stack" | "cascade" | "split";
export type Tone = "dusk" | "violet" | "ink" | "grove";

export type Service = {
  id: string;
  index: string;
  title: string;
  line: string;
  accent: string;
  detail: string;
  composition: Composition;
  tone: Tone;
};

export const services: Service[] = [
  {
    id: "website-design",
    index: "01",
    title: "Website design",
    line: "A digital flagship for a brand ready to be seen at the price it charges.",
    accent: "flagship",
    detail:
      "A new site built from scratch: sitemap and page-by-page UX, a visual and motion system, copy direction, and a production-ready front end your team can maintain. Typically 6-12 pages, delivered in 8-14 weeks.",
    composition: "orbit",
    tone: "dusk",
  },
  {
    id: "website-redesign",
    index: "02",
    title: "Website redesign",
    line: "The commercial edit. What stays, what goes, what the next buyer needs first.",
    accent: "commercial",
    detail:
      "Starts with an audit of the current site against the sale you actually want. We keep the pages and SEO equity that earn trust, then rebuild the information architecture, UI, and front end around the path to a serious inquiry.",
    composition: "eclipse",
    tone: "violet",
  },
  {
    id: "design-systems",
    index: "03",
    title: "Design systems",
    line: "The smallest set of parts that keeps a brand consistent after we leave.",
    accent: "consistent",
    detail:
      "A documented component library covering type, color, spacing, components, and motion rules, in Figma and in code. Built so your own team can extend the site without inventing a second brand.",
    composition: "stack",
    tone: "ink",
  },
  {
    id: "digital-brand",
    index: "04",
    title: "Digital brand",
    line: "Identity, translated for screens. Not a logo pasted onto a template.",
    accent: "screens",
    detail:
      "A digital-specific style guide - voice and tone, screen color and type, photo and motion direction - so marketing, product, and sales all use the same brand on screen, not just on the logo.",
    composition: "split",
    tone: "grove",
  },
  {
    id: "motion",
    index: "05",
    title: "Motion",
    line: "Movement with a job. Emphasis, sequence, and the feeling of a thing well made.",
    accent: "job",
    detail:
      "Production-ready motion specs and code (GSAP and CSS) for the scroll, hover, and transition moments that matter - something your developers can ship, not a mood video that gets reinterpreted later.",
    composition: "cascade",
    tone: "dusk",
  },
  {
    id: "product-interfaces",
    index: "06",
    title: "Product interfaces",
    line: "Marketing sites and product surfaces that share one visual language.",
    accent: "one visual language",
    detail:
      "The marketing pages that sell the product, plus a shared UI-pattern set - navigation, forms, states - so the product and the site read as the same company, not two vendors.",
    composition: "orbit",
    tone: "violet",
  },
];

export const method = [
  {
    index: "01",
    title: "Listen",
    body: "The commercial brief, the buyer, and the market you are actually entering. We talk to the people who sell, not only the people who approve design.",
  },
  {
    index: "02",
    title: "Frame",
    body: "The story the site must tell, and the map of pages that carry it. One narrative, from the first screen to the inquiry.",
  },
  {
    index: "03",
    title: "Form",
    body: "Visual system, motion, and interface. Simple forms. Bigger ideas. You see the site at full fidelity before anything is built.",
  },
  {
    index: "04",
    title: "Build",
    body: "A production front end, documented. We ship it, or we hand it to your engineers with the system intact.",
  },
  {
    index: "05",
    title: "Launch",
    body: "The first month in market, when the details show. We stay for a refinement window after go-live.",
  },
];

export const principles = [
  {
    title: "Bold.",
    body: "We take a position on the first screen. Premium buyers decide there, often in another timezone, often without a call.",
  },
  {
    title: "Creative.",
    body: "Type, crop, and motion do the persuading. Atmosphere borrowed from a stock library does not survive a high price.",
  },
  {
    title: "Different.",
    body: "If the site could belong to a competitor, it is not finished. Difference is a commercial requirement, not a mood.",
  },
];

export type Study = {
  slug: string;
  index: string;
  name: string;
  sector: string;
  year: string;
  markets: string;
  services: string[];
  summary: string;
  headline: string;
  composition: Composition;
  tone: Tone;
  cover?: string;
  gallery?: { src: string; alt: string; deck?: string }[];
  galleryNoun?: string;
  /** Slide decks stay in the 1072px column. Research boards use the page width. */
  galleryWidth?: "column" | "page";
  featured?: boolean;
  chapters: { kicker: string; title: string; body: string[] }[];
  outcomes: { value: string; label: string }[];
};

const creativePieces = Array.from({ length: 32 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/creatives/${number}.webp`,
    alt: `Social media creative ${index + 1}`,
  };
});

/** Supr Daily's own intro slide ("Internship Work") is excluded on purpose. */
const suprPieces = [
  { src: "/supr/cover.webp", alt: "Supr Daily by Swiggy" },
  { src: "/supr/02.webp", alt: "Supr Daily social and emailer assets" },
];

const illustrationPieces = Array.from({ length: 13 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/illustrations/${number}.webp`,
    alt: `Illustration ${index + 1}`,
  };
});

const socialPieces = [...creativePieces, ...suprPieces, ...illustrationPieces];

function slides(file: string, count: number, deck: string) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/presentations/${file}-${number}.webp`,
      alt: `${deck}, slide ${index + 1}`,
      deck,
    };
  });
}

const presentationPieces = [
  ...slides("art", 15, "Art Era"),
  ...slides("inshorts", 13, "Inshorts"),
  ...slides("public", 19, "Public"),
];

const genAiAlts = [
  "Title",
  "Brief",
  "Objectives",
  "Aim",
  "House of Aroras",
  "Moodboard",
  "Final render",
  "Campaign catalogue",
  "Brand intro",
  "The Crossing",
  "Campaign image",
  "Mid-shot and desert",
  "Macro detail",
  "Green room",
  "Campaign stills",
  "Lifestyle stills",
  "The process",
  "Process intro",
  "Prompt iteration 1",
  "Prompt iteration 2",
  "Prompt iteration 3",
  "Retouching",
  "Workflow",
  "Flow with Flora",
  "Quality check",
  "Rejected images",
  "Thank you",
];

const genAiPieces = genAiAlts.map((alt, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    src: `/gen-ai/${number}.webp`,
    alt: `Gen AI, ${alt}`,
    deck: "House of Aroras",
  };
});

const mcdonaldsBoards: { file: string; alt: string; deck: string }[] = [
  ["01", "Project overview, bringing McDonald's to the IIT Roorkee campus", "Project overview"],
  ["02", "Market context and competition for McDonald's", "Market"],
  ["03", "Survey insights and accessibility interviews", "Research"],
  ["04", "Peak-hour pain points, counter layout, and kiosk measurements", "Research"],
  ["05", "Core operational strategy and the campus model", "Operations"],
  ["06", "Service innovations and the order journey", "Service"],
  ["07", "McCampus phone screens and the welcome", "McCampus"],
  ["08", "McCampus interface, from build-your-own-meal to order 2648", "McCampus"],
  ["09", "McCampus brand guidelines", "Brand"],
  ["10", "Spatial analysis of the campus across the day", "The room"],
  ["11", "Campus map around the Students' Activity Centre", "The room"],
  ["12", "Ground-floor plan, 76 seats, 480 square metres", "The room"],
  ["13", "Kiosk design explorations", "The room"],
].map(([file, alt, deck]) => ({ file, alt, deck }));

function boards(folder: string, count: number, deck: string, alt: string) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src: `/${folder}/${number}.webp`,
      alt: `${alt} ${index + 1}`,
      deck,
    };
  });
}

const studyCatalog: Study[] = [
  {
    slug: "mcdonalds",
    index: "01",
    name: "McCampus",
    sector: "User research",
    year: "2025",
    markets: "IIT Roorkee",
    services: ["User research", "Service design", "Spatial design", "Interface"],
    summary:
      "The research behind bringing McDonald's to IIT Roorkee: how students eat, where the room should sit, and the service that became McCampus.",
    headline: "A campus has to want the brand.",
    composition: "stack",
    tone: "dusk",
    cover: "/mcdonalds/cover.webp",
    gallery: mcdonaldsBoards.map((board) => ({
      src: `/mcdonalds/${board.file}.webp`,
      alt: board.alt,
      deck: board.deck,
    })),
    galleryNoun: "boards",
    galleryWidth: "page",
    featured: true,
    chapters: [
      {
        kicker: "The brief",
        title: "An ecosystem for the campus, not a storefront on the lawn.",
        body: [
          "Bringing McDonald's to IIT Roorkee meant designing a place a global food brand could actually live: the order, the room, the app, and the way a student moves through a day. The work was done with Mohammad Faisal, Sreejesh Nair, and Prabhav Singh, drawn in Illustrator and Photoshop.",
          "The product is McCampus. The line on the welcome screen is the brief in one sentence: because every campus deserves its own McDonald's.",
        ],
      },
      {
        kicker: "The research",
        title: "Eighty-one percent were not satisfied with how they eat.",
        body: [
          "A survey of the campus set the numbers before any interface. Seventy-two percent wanted delivery to a place they chose. Sixty-seven percent would spend ₹100–200 on an order. Eighty-one percent were not satisfied with the eating experience.",
          "Interviews with students who use a wheelchair named the room: uneven outdoor paths, long queues, missing ramps, and canteens without a wheelchair space. The recommendation was ramps, wheelchair seating, pre-order so no one stands in a queue during an event, and a quieter zone.",
          "Peak hour at the Dehradun restaurant showed the same friction in a working store. Crowding at the kiosk and the counter. Collection delayed because the status is checked by hand. Bulk orders stalling the line. No priority lane, and no accessible seat.",
        ],
      },
      {
        kicker: "The move",
        title: "McCampus is the service the research asked for.",
        body: [
          "Order ahead, a group order, and build-your-own-meal. A student ID carries the loyalty points. The menu says what is in the food. During exams, a table can be booked before anyone leaves the library. The notification arrives when the order is ready, not after the queue has already formed.",
          "The room is drawn on the campus, beside the Students' Activity Centre, the J. Thompson Building, and the stadiums. The ground floor holds 76 seats in 480 square metres, with a kitchen of 106. The kiosk is measured against a person standing at it, and the entrance takes a wheelchair without a detour.",
        ],
      },
    ],
    outcomes: [
      { value: "81%", label: "Not satisfied with how they eat" },
      { value: "72%", label: "Wanted delivery to a chosen spot" },
      { value: "76", label: "Seats on the ground floor" },
    ],
  },
  {
    slug: "creatives",
    index: "01",
    name: "Social",
    sector: "Social media",
    year: "2021–24",
    markets: "OnePlus · Noise · ASUS · Fire-Boltt · Supr Daily",
    services: ["Social creatives", "Campaign design", "Illustration"],
    summary:
      "Forty-seven social, campaign, and illustration pieces for OnePlus, Noise, ASUS, Fire-Boltt, Supr Daily, a set of crypto characters, and a run of independent drawings.",
    headline: "Posts that have to work at a glance.",
    composition: "orbit",
    tone: "dusk",
    cover: creativePieces[0].src,
    gallery: socialPieces,
    chapters: [
      {
        kicker: "The brief",
        title: "A feed is a sequence of decisions, not a folder of posts.",
        body: [
          "The work spans product launches, retail offers, character campaigns, and the social and emailer assets built for Supr Daily. OnePlus, Noise, ASUS, Fire-Boltt, Supr Daily, and a crypto set each needed a post that could be read in the time it takes to keep scrolling.",
          "The constraint is the square. The product, the offer, and the name have to land before the thumb moves.",
        ],
      },
      {
        kicker: "The move",
        title: "One idea per frame. The rest is evidence.",
        body: [
          "A foldable phone is shown open, with the spec line beside it, not under a paragraph. A pastry shop gets a system of posts that can change the cake without changing the voice. A character campaign gives each figure a color and a name large enough to read on a phone.",
          "The set closes on a run of independent illustrations: drawings made for their own sake, kept in the same feed because the hand behind them is the same hand behind the rest.",
          "The full set is below, in the order it was made.",
        ],
      },
    ],
    outcomes: [
      { value: "47", label: "Pieces in the set" },
      { value: "2021–24", label: "Years the work spans" },
      { value: "6", label: "Brands and campaigns, one square" },
    ],
  },
  {
    slug: "presentations",
    index: "01",
    name: "Presentations",
    sector: "Presentation design",
    year: "2023–25",
    markets: "Art Era · Inshorts · Public",
    services: ["Presentation design", "Slide systems"],
    summary:
      "Three decks: Art Era on fearless thinking, Inshorts on World Earth Day, and Public's festive formats.",
    headline: "A slide has to argue before it decorates.",
    composition: "stack",
    tone: "dusk",
    cover: presentationPieces[0].src,
    gallery: presentationPieces,
    chapters: [
      {
        kicker: "The brief",
        title: "Three rooms, three different jobs for a deck.",
        body: [
          "Art Era sets the Renaissance against a cyberpunk light and asks what past designers did fearlessly. Inshorts needed a campaign deck, World Earth Day among them, that could carry an editorial story. Public needed a festive deck: the festival, the ad format, and how the story lives in the app.",
          "None of them is a template with the logo swapped. Each deck has a room it has to hold.",
        ],
      },
      {
        kicker: "The move",
        title: "One idea on the slide. The evidence sits beside it.",
        body: [
          "Art Era gives each thinker a frame large enough to read from the back of a room: the name, the lesson, the picture. Inshorts opens on the planet and lets the campaign name take the remaining field. Public puts the phone in the center and lets the format explain itself.",
          "The full set is below, deck by deck.",
        ],
      },
    ],
    outcomes: [
      { value: "47", label: "Slides across three decks" },
      { value: "3", label: "Decks, three different rooms" },
      { value: "2023–25", label: "Years the work spans" },
    ],
  },
  {
    slug: "gen-ai",
    index: "01",
    name: "Gen AI",
    sector: "Gen AI",
    year: "Handbag",
    markets: "House of Aroras",
    services: ["Generative imagery", "Art direction", "Retouching"],
    summary:
      "A luxury handbag, merchandised with generative imagery that keeps the product accurate from the brief to the shop.",
    headline: "The bag stays the same bag.",
    composition: "stack",
    tone: "dusk",
    cover: "/gen-ai/07.webp",
    gallery: genAiPieces,
    galleryNoun: "frames",
    chapters: [
      {
        kicker: "The brief",
        title: "A luxury bag has to survive every picture of it.",
        body: [
          "Design and merchandise a premium handbag with generative AI. The pictures have to be ready for production, the product has to stay accurate, and the tone has to hold across shopping touchpoints. The house is House of Aroras.",
          "The work is in three movements: design, merchandise, and retouching. The tools are ChatGPT, Claude, Seedream, Flora, and Photoshop.",
        ],
      },
      {
        kicker: "The move",
        title: "Show the bag. Then show the decisions.",
        body: [
          "The set opens on the brief, the aim, and the mood. Then the campaign: the final render, the catalogue, the crossing, the desert, the macro, the green room. After the pictures, the process is on the table. Prompt iterations, the Flora flow, the retouch, the quality check, and the frames that were rejected.",
          "A prettier picture does not get to change the bag.",
        ],
      },
    ],
    outcomes: [
      { value: "27", label: "Frames in the set" },
      { value: "3", label: "Design, merchandise, retouching" },
      { value: "1", label: "Bag, held consistent" },
    ],
  },
  {
    slug: "trimble-modus",
    index: "01",
    name: "Modus",
    sector: "Design systems",
    year: "2025",
    markets: "Trimble",
    services: ["Design systems", "Visual design"],
    summary:
      "A personality for Modus, Trimble's design system, so a wide product portfolio can share one character.",
    headline: "Personality for one system.",
    composition: "stack",
    tone: "dusk",
    cover: "/trimble-modus/01.webp",
    gallery: boards("trimble-modus", 56, "Modus", "Design system"),
    galleryNoun: "boards",
    chapters: [
      {
        kicker: "The brief",
        title: "One system, a portfolio of products that do not look related.",
        body: [
          "Modus is Trimble's design system. The case is the personality: how a system used across a diverse product portfolio gets a character of its own, instead of each product inventing one.",
          "The work is drawn in Illustrator, in 2025, and set out as a single case study.",
        ],
      },
      {
        kicker: "The move",
        title: "Give the system a character the products can share.",
        body: [
          "The case is a personality for Modus that a diverse product portfolio can use, so each product does not have to invent its own. Drawn as one study, board by board.",
          "The full set is below, in the order of the case.",
        ],
      },
    ],
    outcomes: [
      { value: "56", label: "Boards in the case" },
      { value: "2025", label: "The year of the study" },
      { value: "1", label: "System, Modus" },
    ],
  },
  {
    slug: "magazine",
    index: "01",
    name: "Magazine",
    sector: "Editorial",
    year: "2023",
    markets: "Inshorts",
    services: ["Editorial design", "Advertisement"],
    summary:
      "An interactive magazine for the Inshorts news app, and the advertisement pages that run inside it.",
    headline: "A magazine in the news app.",
    composition: "stack",
    tone: "dusk",
    cover: "/magazine/01.webp",
    gallery: boards("magazine", 21, "Inshorts", "Magazine page"),
    galleryNoun: "pages",
    chapters: [
      {
        kicker: "The brief",
        title: "News that had to read like a magazine, inside an app.",
        body: [
          "Interactive magazine design for the Inshorts news app, and the creative advertisements that sit in the same format. The role was visual designer, in 2023, working in Figma and InDesign.",
        ],
      },
      {
        kicker: "The move",
        title: "A page, then the ad that has to live on one.",
        body: [
          "The set is the magazine itself: spreads for the app, then advertisement pages drawn at the same size so a campaign can enter the issue without breaking it.",
          "Twenty-one pages, in order.",
        ],
      },
    ],
    outcomes: [
      { value: "21", label: "Pages in the issue" },
      { value: "2023", label: "Designed for Inshorts" },
      { value: "2", label: "Tools, Figma and InDesign" },
    ],
  },
  {
    slug: "breadwala",
    index: "01",
    name: "Breadwala",
    sector: "Packaging",
    year: "2023",
    markets: "Breadwala",
    services: ["Packaging", "Illustration"],
    summary:
      "A cream-roll pack for children, printed in four spot colours. The limit produced the mascot.",
    headline: "Four colours. One mascot.",
    composition: "stack",
    tone: "dusk",
    cover: "/breadwala/01.webp",
    gallery: boards("breadwala", 7, "Packaging", "Breadwala pack"),
    galleryNoun: "boards",
    chapters: [
      {
        kicker: "The brief",
        title: "A cream roll that had to reach a child, on a four-colour budget.",
        body: [
          "Packaging for Breadwala, 2023. The print budget was four spot colours. The pack still had to be picked up by a child, and read by the person paying.",
        ],
      },
      {
        kicker: "The move",
        title: "The constraint became the character.",
        body: [
          "Four colours, total, and a mascot that can carry the range. The boards are the pack: the roll, the face, and the system that lets the next flavour change without a new press.",
        ],
      },
    ],
    outcomes: [
      { value: "4", label: "Spot colours, total" },
      { value: "7", label: "Boards in the case" },
      { value: "2023", label: "The year of the pack" },
    ],
  },
  {
    slug: "identity",
    index: "01",
    name: "Identity",
    sector: "Branding",
    year: "2021–24",
    markets: "Beardo · Lipton",
    services: ["Identity", "Brand systems"],
    summary:
      "Marks, palettes, and type for Beardo, Lipton, and independent brands, with the rules that keep them from drifting.",
    headline: "Marks that hold after handover.",
    composition: "stack",
    tone: "dusk",
    cover: "/identity/07.webp",
    gallery: boards("identity", 9, "Identity", "Identity board"),
    galleryNoun: "boards",
    chapters: [
      {
        kicker: "The brief",
        title: "A mark is the easy part. The six months after are the work.",
        body: [
          "Identity systems from 2021 to 2024 for Beardo, Lipton, and independent brands. Each one needed a mark, a palette, a type scale, and the rules that stop the brand drifting after handover.",
        ],
      },
      {
        kicker: "The move",
        title: "Show the system, not only the logo.",
        body: [
          "The boards put the mark next to the rules: color, type, and the places the identity has to survive. Nine of them, in the order they were selected.",
        ],
      },
    ],
    outcomes: [
      { value: "9", label: "Boards in the set" },
      { value: "2021–24", label: "Years the work spans" },
      { value: "2", label: "Named brands, and independents" },
    ],
  },
  {
    slug: "personal",
    index: "01",
    name: "Personal",
    sector: "Branding",
    year: "2023",
    markets: "Independent",
    services: ["Identity", "Art direction"],
    summary:
      "A personal brand built as a system: the mark, the type, and the pages that carry them.",
    headline: "A brand built as a system.",
    composition: "stack",
    tone: "dusk",
    cover: "/personal/08.webp",
    gallery: boards("personal", 9, "Personal brand", "Personal brand board"),
    galleryNoun: "boards",
    chapters: [
      {
        kicker: "The brief",
        title: "A personal brand, held to the same standard as a client's.",
        body: [
          "Personal branding, 2023. The system behind an independent practice: a mark that can sit on a page, a type ramp, and a set of pages that use both without inventing a third.",
        ],
      },
      {
        kicker: "The move",
        title: "One system, shown in use.",
        body: [
          "The boards are the brand applied, not a logo on a plinth. Nine frames, from the mark to the pages.",
        ],
      },
    ],
    outcomes: [
      { value: "9", label: "Boards in the system" },
      { value: "2023", label: "The year it was drawn" },
      { value: "1", label: "Brand, used on its own pages" },
    ],
  },
];

const studyOrder = [
  "mcdonalds",
  "trimble-modus",
  "magazine",
  "breadwala",
  "identity",
  "personal",
  "creatives",
  "presentations",
  "gen-ai",
];

export const studies: Study[] = studyOrder.map((slug, index) => {
  const study = studyCatalog.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing study ${slug}`);
  return { ...study, index: String(index + 1).padStart(2, "0") };
});

export type Essay = {
  slug: string;
  index: string;
  title: string;
  dek: string;
  date: string;
  minutes: string;
  kicker: string;
  paragraphs: string[];
};

export const essays: Essay[] = [
  {
    slug: "redesign-is-a-commercial-act",
    index: "01",
    title: "Redesign is a commercial act",
    dek: "A new website is not a refresh of the furniture. It is a decision about who the next buyer is, and what they are allowed to understand in the first ten seconds.",
    date: "12 Sep 2026",
    minutes: "6 min",
    kicker: "Practice",
    paragraphs: [
      "Studios are hired to make a website look current. The companies that pay properly are hiring something else. They are hiring a point of view on a sale that has become fuzzy. The old site still works. It also still attracts the wrong conversation.",
      "We start a redesign by asking what the business refuses to be hired for. That sentence does more for the homepage than a moodboard. If a private aviation house does not want to be compared on hourly rates, the site cannot open on a rate card, however elegant the type.",
      "The first screen is the commercial act. Not the manifesto lower down, not the about page, not the case study you are proud of. A buyer in another country, often on a phone, often between meetings, decides whether you are in their category. Design either helps that decision or decorates the delay.",
      "This is why we are suspicious of redesigns that begin with a visual direction. Direction without a buyer is styling. Styling can be beautiful and still leave the inquiry form asking for things your best clients will not type.",
      "What we keep matters as much as what we replace. A redesign that throws out a decade of clarity to look new is an expensive way to confuse the people who already trust you. We inventory the pages that produce serious conversations and leave their job intact, even when their clothes change.",
      "Motion belongs in this conversation. A scroll animation that delays the offer is a tax. A transition that shows how a service actually unfolds is an argument. We cut the first and keep the second. Premium does not mean slow. It means edited.",
      "If you are briefing a redesign, write the sentence you want a founder to repeat after they leave the homepage. Then ask whether the current site could produce it. If it cannot, you do not have a visual problem. You have a story that has not been designed yet.",
    ],
  },
  {
    slug: "simple-forms-bigger-ideas",
    index: "02",
    title: "Simple forms. Bigger ideas.",
    dek: "The Cubical Dot mark is a rounded square and a circle. That is the whole theory. Reduce the form until the idea has room to be seen.",
    date: "28 Aug 2026",
    minutes: "5 min",
    kicker: "Studio",
    paragraphs: [
      "A cube is structure. A dot is an idea in motion. We put them next to each other and stopped. The mark is not a metaphor we explain in a brand film. It is a working rule for everything we design.",
      "Premium websites fail in a particular way. They accumulate. Another typeface for the campaign, another illustration style for the product, another color because a competitor used the quiet one. The page gets richer and the idea gets smaller. By the time a buyer arrives, there is nothing to remember.",
      "Simple forms are not minimalism as a lifestyle. They are a constraint that forces the idea to be good enough to stand without help. A headline that needs a gradient behind it is not finished. A service that needs six icons to be understood has not been named.",
      "International work makes this stricter. A buyer in Seoul, Milan, or Dubai will not share your local references. Idiom travels badly. Form travels well. A clear sequence, a recognizable object, a page that can be read in short bursts - these survive a market change better than a clever line that only one city laughs at.",
      "Our palette is four colors for a reason. Black, ivory, electric violet, neon lime. Violet carries the field. Lime is the signal. If everything is a signal, nothing is. The websites we design borrow that discipline even when the client's brand brings its own color. One field. One signal. Then the content.",
      "Motion follows the same rule. The square does not need to spin to prove we can animate. The dot moves because a dot is the thing that moves. On a client site, the thing that moves should be the thing the buyer must notice: a change of state, a route, a price, a next step.",
      "When we say bigger ideas, we mean ideas with commercial weight. Not louder headlines. A smaller form around a sharper promise. That is the whole studio.",
    ],
  },
  {
    slug: "what-an-international-buyer-needs",
    index: "03",
    title: "What an international buyer needs to trust",
    dek: "They cannot visit the studio. They cannot sit in the room where the work was made. The website has to do that job without pretending to be a handshake.",
    date: "02 Jul 2026",
    minutes: "7 min",
    kicker: "Clients",
    paragraphs: [
      "A premium buyer in another country is not short of options. They are short of reasons to trust a company they will not meet this week. The website is the meeting. Treat it as a lobby and they will treat you as a vendor.",
      "Trust, at this level, is not a row of logos and a quote with a headshot. Those can help. They do not replace a clear account of what you do, who it is for, what it costs to begin, and how a project actually runs. Vagueness reads as junior, even when the work is not.",
      "Time zones punish muddy sites. Someone reading you at midnight their time will not book a call to resolve a confusion you could have written down. Say how you work across cities. Say when you reply. Say what the first month looks like. Adults with budgets recognize a practice that has done this before.",
      "Language is part of the design. Short sentences. Specific nouns. Prices as ranges if you will not print a rate card. The studios and companies we admire do not hide the commercial frame and then act surprised when the wrong briefs arrive.",
      "Proof should be inspectable. A case study that says transformative and shows a homepage mock is not proof. Walk the buyer through the brief, the move, and what changed in the path to inquiry. If a number is real, use it. If it is not, do not borrow one from a template.",
      "The inquiry itself is a design problem. Long forms signal that you value your time more than theirs, which is a strange message to send to a client you want. Ask for the market, the timeline, and enough context to know whether a conversation is worth both calendars. Then answer like a person.",
      "None of this requires a louder brand. It requires a site with nothing to hide. That is the standard we design toward, for our clients and for this studio.",
    ],
  },
];

export const faqs = [
  {
    q: "Do you only design, or do you also build?",
    a: "We design and we build the front end. If you already have engineers, we hand over a documented system and stay through integration. You will not receive a picture of a website and a wish.",
  },
  {
    q: "How do international clients work with you?",
    a: "Workshops are scheduled across time zones, usually two live sessions at the start and reviews you can watch on your clock. The work between them is written, so a decision made in one city is still clear in another the next morning.",
  },
  {
    q: "What do you need from us to start?",
    a: "A decision maker in the room, a commercial goal, and a few examples of what you refuse to look like. We can begin without a finished brand book. We cannot begin without someone who is allowed to choose.",
  },
  {
    q: "Can you redesign a site that is already live?",
    a: "Yes. Redesign is most of the practice. We keep the pages that already create serious conversations and replace the ones that do not. Going live is planned so the business is not asked to pause.",
  },
  {
    q: "How long does a flagship take?",
    a: "Eight to fourteen weeks is the honest range for a full website. Shorter only when the story is already true and the content exists. We would rather move a date than ship a site that still sounds like a committee.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the page map, the markets, and whether we are designing, building, or both. Write us the brief and you will have a clear number after the first call, not a guessing game.",
  },
];

export function getStudy(slug: string) {
  return studies.find((study) => study.slug === slug);
}

export function getEssay(slug: string) {
  return essays.find((essay) => essay.slug === slug);
}

export function nextStudy(slug: string) {
  const index = studies.findIndex((study) => study.slug === slug);
  if (index < 0) return studies[0];
  return studies[(index + 1) % studies.length];
}

export function nextEssay(slug: string) {
  const index = essays.findIndex((essay) => essay.slug === slug);
  if (index < 0) return essays[0];
  return essays[(index + 1) % essays.length];
}
