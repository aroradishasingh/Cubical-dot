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
  chapters: { kicker: string; title: string; body: string[] }[];
  outcomes: { value: string; label: string }[];
};

export const studies: Study[] = [
  {
    slug: "aperture",
    index: "01",
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
    index: "02",
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
    index: "03",
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
    index: "04",
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
    index: "05",
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
    index: "06",
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
];

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
