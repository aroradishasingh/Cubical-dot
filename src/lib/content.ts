export const studio = {
  name: "Cubical Dot",
  email: "hello@cubicaldot.com",
  url: "https://cubicaldot.com",
  line: "A design studio for what's next.",
  lockup: "Ideas in motion. Design in every detail.",
  description:
    "Cubical Dot is an independent digital design studio. We design and redesign websites for premium brands that sell across borders.",
};

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
      "New websites for companies entering a market, launching a house, or retiring a temporary site that outlived its brief. Narrative, structure, visual system, motion, and a front end your team can keep.",
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
      "Most of our work. We read the live site against the sale you actually want, keep the parts that earn trust, and rebuild the path from first screen to serious inquiry.",
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
      "Type, color, components, motion rules, and the decisions underneath them. Built so an internal team in another city can extend the site without inventing a second brand.",
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
      "When the brand is ahead of the website, or the website has become the brand by accident. We tune voice, crop, color, and motion until the digital presence can carry a premium price.",
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
      "Scroll, hover, and arrival. We use motion to explain, to pace a story, and to make a flagship feel considered. Decoration that does not help the buyer does not ship.",
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
      "For teams whose marketing site and product have drifted apart. We design the pages that sell the product and the interface patterns that should feel like the same company.",
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
    markets: "OnePlus · Noise · ASUS · Fire-Boltt",
    services: ["Social creatives", "Campaign design"],
    summary:
      "Thirty-two social pieces for OnePlus, Noise, ASUS, Fire-Boltt, and a set of crypto characters.",
    headline: "Posts that have to work at a glance.",
    composition: "orbit",
    tone: "dusk",
    cover: creativePieces[0].src,
    gallery: creativePieces,
    chapters: [
      {
        kicker: "The brief",
        title: "A feed is a sequence of decisions, not a folder of posts.",
        body: [
          "The work spans product launches, retail offers, and character campaigns. OnePlus, Noise, ASUS, Fire-Boltt, and a crypto set each needed a post that could be read in the time it takes to keep scrolling.",
          "The constraint is the square. The product, the offer, and the name have to land before the thumb moves.",
        ],
      },
      {
        kicker: "The move",
        title: "One idea per frame. The rest is evidence.",
        body: [
          "A foldable phone is shown open, with the spec line beside it, not under a paragraph. A pastry shop gets a system of posts that can change the cake without changing the voice. A character campaign gives each figure a color and a name large enough to read on a phone.",
          "The full set is below, in the order it was made.",
        ],
      },
    ],
    outcomes: [
      { value: "32", label: "Pieces in the set" },
      { value: "2021–24", label: "Years the work spans" },
      { value: "5", label: "Campaigns, one square" },
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
    slug: "aperture",
    index: "02",
    name: "Aperture",
    sector: "Private aviation",
    year: "2026",
    markets: "London · Dubai",
    services: ["Website redesign", "Narrative", "Design system"],
    summary:
      "A membership house for private aviation, redesigned from a charter brochure into a quiet digital flagship.",
    headline: "From charter brochure to membership house.",
    composition: "orbit",
    tone: "dusk",
    chapters: [
      {
        kicker: "The brief",
        title: "They sold aircraft. The buyers were buying a house.",
        body: [
          "Aperture had the fleet, the crew, and the routes between London and the Gulf. The website still behaved like a broker: a grid of tails, a form, a phone number in the footer.",
          "People who fly privately do not shop a catalog. They decide whether an operation feels like theirs. The brief was a redesign that could open a membership conversation before a salesperson did.",
        ],
      },
      {
        kicker: "The move",
        title: "The fleet became evidence. Membership became the product.",
        body: [
          "We rebuilt the story around how a trip is requested, who answers, and what ready means at six in the morning. Aircraft appear later, as proof of range, not as the offer.",
          "The inquiry went from seven steps to three. The first screen names the promise in one sentence a principal can forward to an assistant.",
        ],
      },
      {
        kicker: "The system",
        title: "Black field. One violet plane. Type like a private note.",
        body: [
          "The visual system is deliberately small. A rounded slab, a single lime signal for action, and headlines set tight enough to feel edited. Motion is limited to the things that move in the real service: a route drawing itself, a status changing from requested to airborne.",
          "Two markets share one system. London and Dubai do not get two websites. They get one house with a local proof point on the same grid.",
        ],
      },
    ],
    outcomes: [
      { value: "7 → 3", label: "Steps from arrival to inquiry" },
      { value: "1", label: "System across two markets" },
      { value: "12", label: "Components, documented" },
    ],
  },
  {
    slug: "sable-house",
    index: "03",
    name: "Sable House",
    sector: "Hospitality",
    year: "2026",
    markets: "Mediterranean · New York",
    services: ["Website design", "Digital brand", "Motion"],
    summary:
      "Five small hotels, one house voice, and a site that replaced a template shared with three competitors.",
    headline: "One house. Five addresses.",
    composition: "eclipse",
    tone: "violet",
    chapters: [
      {
        kicker: "The brief",
        title: "The rooms were specific. The website was interchangeable.",
        body: [
          "Sable House runs five properties, each with a real point of view. The previous site was a theme. Change the photography and it could have been any group at the same price.",
          "The commercial problem was not traffic. It was that a guest comparing two houses could not tell why this one cost more, or why the five addresses belonged together.",
        ],
      },
      {
        kicker: "The move",
        title: "Lead with the house, then the key.",
        body: [
          "The new site opens on the standard — how a stay is hosted — and only then offers the five addresses. Each property is a chapter, not a card in a grid. Rates are present. Hiding the price was making the brand look unsure.",
          "Booking stays with their existing engine. We redesigned the path up to it so the handoff no longer feels like leaving the house.",
        ],
      },
      {
        kicker: "The system",
        title: "A lime sun, a violet dusk, and type that can whisper.",
        body: [
          "Hospitality sites often shout. Sable needed warmth without costume. The art direction uses two forms from the brand's own geometry: a large sphere of light and a slab of evening color. Photography sits inside that frame, cropped hard.",
          "Motion is slow on purpose. A room reveals as you scroll the way a door opens. Nothing bounces. Nothing asks you to wait for a loader.",
        ],
      },
    ],
    outcomes: [
      { value: "5", label: "Properties, one narrative" },
      { value: "0", label: "Theme settings left in the design" },
      { value: "1", label: "Path into the booking engine" },
    ],
  },
  {
    slug: "halcyon",
    index: "04",
    name: "Halcyon",
    sector: "Private wealth",
    year: "2025",
    markets: "Zurich · Singapore · New York",
    services: ["Website redesign", "Design system", "Narrative"],
    summary:
      "A cross-border wealth firm whose site listed features to people who buy judgment.",
    headline: "Clarity for money that crosses borders.",
    composition: "stack",
    tone: "ink",
    chapters: [
      {
        kicker: "The brief",
        title: "Three cities. One reputation. A website that explained products.",
        body: [
          "Halcyon advises families whose lives are already in more than one country. The site read like a software brochure: modules, security badges, a login button larger than the point of view.",
          "New clients arrive by introduction, then they look. The website's job is to survive that look. It has to sound like the partner they will meet, in a language precise enough for a counselor in Singapore and a principal in New York.",
        ],
      },
      {
        kicker: "The move",
        title: "Replace the feature list with the decisions they make.",
        body: [
          "We structured the site around three decisions: where capital sits, who is responsible, and how a family is brought in. Products are named inside those decisions, not above them.",
          "The inquiry is deliberately unhurried. A short form asks for context, not a phone number in exchange for a PDF. The people who should not be clients can tell.",
        ],
      },
      {
        kicker: "The system",
        title: "Stacked planes of black, ivory, and a single signal color.",
        body: [
          "Finance sites default to navy and a stock skyline. Halcyon's system is closer to a private report: ivory pages, black statements, violet used once per view. Charts, if they appear, use the same geometry as the mark.",
          "The design system is what the three offices share. A page authored in Zurich cannot drift in Singapore, because the type scale and the components do not allow a second accent.",
        ],
      },
    ],
    outcomes: [
      { value: "3", label: "Cities on one system" },
      { value: "1", label: "Accent color per view" },
      { value: "4", label: "Decisions the navigation can name" },
    ],
  },
  {
    slug: "orla",
    index: "05",
    name: "Orla",
    sector: "Contemporary gallery",
    year: "2025",
    markets: "Paris · Seoul",
    services: ["Website design", "Motion", "Digital brand"],
    summary:
      "An exhibition program that had been living in PDFs, given a site that changes tempo with the show.",
    headline: "An archive that behaves like a room.",
    composition: "cascade",
    tone: "dusk",
    chapters: [
      {
        kicker: "The brief",
        title: "The program was serious. The website was a noticeboard.",
        body: [
          "Orla mounts a small number of exhibitions a year between Paris and Seoul. Collectors knew the gallery from the room. Online, they got a list of names and a downloadable press release.",
          "The brief was a site that could hold the archive without burying the current show, and that could be updated by two people who are not a digital team.",
        ],
      },
      {
        kicker: "The move",
        title: "The current show takes the first screen. The archive waits, intact.",
        body: [
          "Each exhibition gets a tempo. A dense painting show is edited slowly, with large stills. A moving-image show uses sequence. The template is the same. The pacing is the content.",
          "Artists, visits, and available works are always one move away. Nothing important is buried in a hamburger menu that changes per show.",
        ],
      },
      {
        kicker: "The system",
        title: "Geometry as the frame. The work supplies the color.",
        body: [
          "We refused a colorful brand layered on top of the art. The interface is black, ivory, and the mark's radius. Color arrives with the exhibition. Motion is a cut, not a transition library.",
          "The editing model is short. A coordinator can publish a show from a small set of fields. The design does not depend on someone remembering a margin.",
        ],
      },
    ],
    outcomes: [
      { value: "2", label: "Cities, one archive" },
      { value: "1", label: "Template, many tempos" },
      { value: "6", label: "Fields to publish a show" },
    ],
  },
  {
    slug: "northwind",
    index: "06",
    name: "Northwind",
    sector: "Fashion atelier",
    year: "2026",
    markets: "Milan · Los Angeles",
    services: ["Website redesign", "Digital brand"],
    summary:
      "An atelier whose shop had become a grid. The cloth, the cut, and the wait went back in front.",
    headline: "A shop that still feels like an atelier.",
    composition: "split",
    tone: "grove",
    chapters: [
      {
        kicker: "The brief",
        title: "The clothes were made slowly. The website sold them like a marketplace.",
        body: [
          "Northwind cuts a small collection twice a year. The site had been rebuilt around a generic catalog: filters, badges, a race to the product image. It converted lookers. It did not convert the clients the atelier wanted.",
          "The redesign had to sell, and it had to feel like the fitting room. Those are not opposite goals if the page is edited.",
        ],
      },
      {
        kicker: "The move",
        title: "Show the cut before the grid.",
        body: [
          "A collection opens on one garment, photographed in motion, with the note a client would hear in the studio: cloth, construction, what it is meant to do. The grid comes second, as a way to choose, not as the point of view.",
          "Waitlist and made-to-order are visible. Scarcity is stated in a sentence, not performed with a countdown timer.",
        ],
      },
      {
        kicker: "The system",
        title: "A split field. Ivory for the cloth. Black for the decision.",
        body: [
          "Pages alternate between a light viewing field and a dark purchasing field, so looking and buying have different temperatures. The dot of the mark becomes the only bright signal on a dark checkout path.",
          "The system is strict about type. If a campaign line does not fit the scale, the line changes. The scale does not.",
        ],
      },
    ],
    outcomes: [
      { value: "2", label: "Temperatures, look and buy" },
      { value: "1", label: "Garment before the grid" },
      { value: "0", label: "Countdown timers" },
    ],
  },
  {
    slug: "vesper",
    index: "07",
    name: "Vesper",
    sector: "Architecture",
    year: "2025",
    markets: "Copenhagen · London",
    services: ["Website design", "Motion", "Content"],
    summary:
      "A practice site that stopped listing projects and started walking a client through the office.",
    headline: "The practice, at the scale of the work.",
    composition: "cascade",
    tone: "ink",
    chapters: [
      {
        kicker: "The brief",
        title: "A decade of buildings, presented as thumbnails.",
        body: [
          "Vesper is a mid-size practice with work in housing, culture, and a few precise private houses. The old site was a grid of dusk shots. Every project had the same weight, which meant none of them had any.",
          "They were being invited into larger competitions and losing the website test. The portfolio did not show how they think.",
        ],
      },
      {
        kicker: "The move",
        title: "Sequence the work the way the office would walk it.",
        body: [
          "We replaced the equal grid with a route: three featured projects told properly, then the index. Each feature is a short argument — site, constraint, the move — with drawings beside photographs.",
          "A client can still find a typology in one click. The index is a tool. The front of the site is a point of view.",
        ],
      },
      {
        kicker: "The system",
        title: "Drawings and type on the same baseline.",
        body: [
          "Architectural sites often float images in a void. Vesper's system puts drawings, captions, and headlines on one measure, the way a sheet set would. Motion is a pan across a drawing, scrubbed to the scroll, never a fly-through.",
          "The practice can add a project without calling us. The chapter structure is the constraint that keeps the next building as clear as the last.",
        ],
      },
    ],
    outcomes: [
      { value: "3", label: "Projects told in full" },
      { value: "1", label: "Measure for drawings and type" },
      { value: "2", label: "Studios publishing into it" },
    ],
  },
  {
    slug: "trimble-claims",
    index: "01",
    name: "Claims",
    sector: "UI / UX",
    year: "2025–26",
    markets: "Trimble",
    services: ["UX", "Service design", "Interface"],
    summary:
      "Warranty claims for Trimble dealers, taken out of the legacy portal and rebuilt as guided, role-aware flows.",
    headline: "A claim a dealer can finish.",
    composition: "stack",
    tone: "dusk",
    cover: "/trimble-claims/01.webp",
    gallery: boards("trimble-claims", 34, "Trimble Intelligent Support", "Warranty claim"),
    galleryNoun: "slides",
    chapters: [
      {
        kicker: "The brief",
        title: "The claim started in a portal dealers were leaving.",
        body: [
          "On Trimble Intelligent Support, the work was the dealer warranty claim, then RMA repair and replace. The legacy Customer Service Portal made dealers re-enter data Trimble already held, on cluttered screens, and many of them went back to email when hardware failed.",
          "The role was graduate technical intern, June 2025 to June 2026, with the Intelligent Support team. The tools were Figma, FigJam, and the Modus design system. The portal also carries RMA upgrade, repair, replace, and support. The warranty claim was the path with the most friction.",
        ],
      },
      {
        kicker: "The research",
        title: "Forty-five dealers, five people in the same workflow.",
        body: [
          "Forty-five interviews with dealers worldwide kept returning to the same points. Trimble should fill in what it already knows, a sales order from a serial number. A case sitting in a status needs to say so. Managers need shared access to tickets. One set of fields cannot serve every warranty path.",
          "Five people touch the claim: survey manager, sales rep, service manager, support technician, service technician. The legacy screen was the same for all of them. The audit grouped the damage into cognitive overload, missing status, errors found only at submit, and no role context.",
        ],
      },
      {
        kicker: "The move",
        title: "Show the whole journey. Open only the part that applies.",
        body: [
          "The new flow starts from the person. An end user gets a service request. A dealer gets recent devices, drafts, and a path built for repeat filing. The form is four sections. Fields appear from the answers already given, and missing fields are marked before submit.",
          "An A/B test compared a linear stepper with every section visible but locked until it applies. Dealers preferred seeing the full journey. Moderated sessions cut time on task. The implementation audit closed more than thirty UX and functional gaps before the handoff to Stage.",
        ],
      },
    ],
    outcomes: [
      { value: "45", label: "Dealer interviews" },
      { value: "30+", label: "Gaps closed before handoff" },
      { value: "5", label: "Request types in the portal" },
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
    slug: "supr",
    index: "01",
    name: "Supr",
    sector: "Visual design",
    year: "2021",
    markets: "Supr Daily · Swiggy",
    services: ["Visual design", "Editorial"],
    summary:
      "Magazine-format advertisement pages for Supr Daily by Swiggy.",
    headline: "Pages for the daily order.",
    composition: "stack",
    tone: "dusk",
    cover: "/supr/cover.webp",
    gallery: boards("supr", 2, "Supr Daily", "Advertisement page"),
    galleryWidth: "page",
    galleryNoun: "pages",
    chapters: [
      {
        kicker: "The brief",
        title: "A daily grocery service, told as a magazine page.",
        body: [
          "Visual design for Supr Daily by Swiggy, January to March 2021. The pages are advertisements in a magazine format, drawn in Photoshop, Illustrator, and Figma.",
        ],
      },
      {
        kicker: "The move",
        title: "Two pages, full height.",
        body: [
          "The set is the two advertisement pages from the editorial series, kept at the proportion they were printed.",
        ],
      },
    ],
    outcomes: [
      { value: "2", label: "Advertisement pages" },
      { value: "2021", label: "Supr Daily by Swiggy" },
      { value: "3", label: "Tools on the pages" },
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
  {
    slug: "collected-2024",
    index: "01",
    name: "Collected",
    sector: "Graphic design",
    year: "2024",
    markets: "Independent",
    services: ["Identity", "Packaging", "Social"],
    summary:
      "A 2024 collection of logos, packaging, identity, and social, kept as one set.",
    headline: "Logo, pack, identity, social.",
    composition: "stack",
    tone: "dusk",
    cover: "/collected-2024/01.webp",
    gallery: boards("collected-2024", 54, "2024", "Collected piece"),
    galleryNoun: "pieces",
    chapters: [
      {
        kicker: "The brief",
        title: "A year of work, filed by what it had to do.",
        body: [
          "Portfolio 2024. Logos, packaging, identity, and social, selected as one collection rather than four folders.",
        ],
      },
      {
        kicker: "The move",
        title: "Leave them in the order they were made.",
        body: [
          "Fifty-four pieces. A logo sits next to the pack it belongs to, and a social frame sits next to the identity that produced it.",
        ],
      },
    ],
    outcomes: [
      { value: "54", label: "Pieces in the year" },
      { value: "2024", label: "The year of the set" },
      { value: "4", label: "Logo, pack, identity, social" },
    ],
  },
  {
    slug: "graphics-2024",
    index: "01",
    name: "Graphics",
    sector: "Graphic design",
    year: "2024",
    markets: "Brand · editorial",
    services: ["Campaign design", "Layout", "Editorial"],
    summary:
      "Campaigns, layouts, and visual stories from 2024, across brand and editorial work.",
    headline: "Campaigns, layouts, stories.",
    composition: "stack",
    tone: "dusk",
    cover: "/graphics-2024/01.webp",
    gallery: boards("graphics-2024", 48, "2024", "Graphic"),
    galleryNoun: "pieces",
    chapters: [
      {
        kicker: "The brief",
        title: "A year of graphic work, kept as a set.",
        body: [
          "Graphic design from 2024: campaigns, layouts, and visual storytelling across brand and editorial projects. Drawn in Photoshop, Illustrator, and InDesign.",
        ],
      },
      {
        kicker: "The move",
        title: "The piece, then the piece beside it.",
        body: [
          "Forty-eight frames, in the order of the portfolio. Each one is a finished layout, not a crop of a larger system.",
        ],
      },
    ],
    outcomes: [
      { value: "48", label: "Pieces in the set" },
      { value: "2024", label: "The year of the work" },
      { value: "3", label: "Photoshop, Illustrator, InDesign" },
    ],
  },
  {
    slug: "illustrations",
    index: "01",
    name: "Illustrations",
    sector: "Illustration",
    year: "2021",
    markets: "Independent",
    services: ["Illustration"],
    summary: "A set of illustrations drawn in Illustrator and Photoshop.",
    headline: "Drawings, left as drawings.",
    composition: "stack",
    tone: "dusk",
    cover: "/illustrations/01.webp",
    gallery: boards("illustrations", 13, "Drawings", "Illustration"),
    galleryWidth: "page",
    galleryNoun: "drawings",
    chapters: [
      {
        kicker: "The brief",
        title: "Pictures with no campaign attached.",
        body: [
          "Illustrations from 2021, drawn in Illustrator and Photoshop. A set of pictures made for their own sake.",
        ],
      },
      {
        kicker: "The move",
        title: "Keep the drawing at the size it was made.",
        body: [
          "Squares, portraits, and one sequence. Thirteen drawings, shown whole.",
        ],
      },
    ],
    outcomes: [
      { value: "13", label: "Drawings in the set" },
      { value: "2021", label: "The year they were made" },
      { value: "2", label: "Illustrator and Photoshop" },
    ],
  },
  {
    slug: "dino",
    index: "01",
    name: "Dino",
    sector: "Illustration",
    year: "2021",
    markets: "Dino Explorer",
    services: ["Illustration", "Game art", "Packaging"],
    summary:
      "Dino Explorer, a dinosaur park for children: the creatures, the world map, and the pack.",
    headline: "A park that teaches the map.",
    composition: "stack",
    tone: "dusk",
    cover: "/dino/cover.webp",
    gallery: boards("dino", 5, "Dino Explorer", "Dino Explorer"),
    galleryNoun: "boards",
    chapters: [
      {
        kicker: "The brief",
        title: "A dinosaur game for children who are still learning the map.",
        body: [
          "Dino Explorer is a dinosaur park designed in 2021 for a game company. The creatures were built in Blender, then given their features in Photoshop and Illustrator.",
        ],
      },
      {
        kicker: "The move",
        title: "The animal, the place it lived, and the pack it ships in.",
        body: [
          "The same characters land on a world map, so a child can see where the dinosaur lived. The set also includes the card and the packaging for the same game.",
        ],
      },
    ],
    outcomes: [
      { value: "5", label: "Boards in the set" },
      { value: "2021", label: "Designed for the game" },
      { value: "3", label: "Blender, Photoshop, Illustrator" },
    ],
  },
];

const studyOrder = [
  "mcdonalds",
  "trimble-claims",
  "trimble-modus",
  "magazine",
  "supr",
  "breadwala",
  "identity",
  "personal",
  "collected-2024",
  "graphics-2024",
  "illustrations",
  "dino",
  "creatives",
  "presentations",
  "gen-ai",
  "aperture",
  "sable-house",
  "halcyon",
  "orla",
  "northwind",
  "vesper",
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
      "International work makes this stricter. A buyer in Seoul, Milan, or Dubai will not share your local references. Idiom travels badly. Form travels well. A clear sequence, a recognizable object, a page that can be read in short bursts — these survive a market change better than a clever line that only one city laughs at.",
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

export const investment = [
  {
    range: "From $40k",
    title: "Focused flagship",
    body: "A precise site or a contained redesign. One market, a short page map, a system you can extend.",
  },
  {
    range: "$80–150k",
    title: "Full redesign",
    body: "The typical engagement. Narrative, design, motion, and a production front end for a brand with something to protect.",
  },
  {
    range: "$150k+",
    title: "Multi-market system",
    body: "Several audiences or cities, a design system other teams will touch, and a launch that cannot be improvised.",
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
    a: "Focused work begins around $40,000. A full redesign is typically $80,000 to $150,000. Multi-market systems sit above that. The form asks for a range so the first conversation is not a guessing game.",
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
