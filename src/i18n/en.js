// English — the main version of the site (served at "/").
// Each language file has exactly the same shape. Values that are functions
// receive data (names, numbers) and return text.
export default ({ name }) => ({
  city: "Dubai",
  skip: "Skip to content",

  seo: {
    title: `Mobile Paintless Dent Repair in Dubai & Sharjah | ${name}`,
    description:
      "Mobile paintless dent repair (PDR) in Dubai and Sharjah. We come to your home, office or parking and remove door dings, " +
      "body dents, minor creases and hail damage without repainting. WhatsApp a photo for a free quote.",
  },

  nav: {
    work: "Our work",
    services: "Services",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    whatsapp: "WhatsApp us",
    home: `${name}, back to top`,
    language: "Language",
    theme: "Switch light / dark mode",
  },

  hero: {
    title: "Paintless dent repair in Dubai",
    lead: "We come to your home, office or parking and remove dents without repainting. Your original paint stays, and most repairs take 1–3 hours.",
    where: "Mobile service · Dubai & Sharjah",
    cta: "Send a photo on WhatsApp",
    note: "Free quote. Send a photo of the dent and we'll reply with a price.",
    stats: { years: "years of experience", paint: "original paint kept", time: "typical repair", timeValue: "1–3 h" },
    scroll: "Scroll down",
    slides: { label: "Background photos", photo: (i, n) => `Photo ${i} of ${n}`, pause: "Pause slideshow", play: "Play slideshow" },
  },

  marquee: { label: "We come to you in" },

  benefits: [
    { title: "Original paint stays", text: "No filler and no repainting, so your car keeps its value, and it usually costs less than a body shop." },
    { title: "Done in 1–3 hours", text: "Most repairs are finished in 1 to 3 hours, often while you wait." },
    { title: "We come to you", text: "Home, office or parking, anywhere in Dubai and Sharjah." },
  ],

  work: {
    label: "Our work",
    title: "Recent repairs",
    lead: "Short videos of real jobs. Tap a video to watch.",
    instagram: "More on Instagram",
    showAll: (n) => `Show all ${n} repairs`,
    sample: "Sample",
    play: (title, car) => `Play video: ${title}, ${car}`,
  },

  services: {
    label: "Services",
    title: "What we fix",
    lead: "If the paint is not cracked, the dent can usually be removed without repainting.",
    unsure: ["Not sure?", "Send us a photo", "and we'll tell you honestly."],
    items: [
      { id: "door-dings", title: "Door dings", text: "Small dents from car parks and car doors. Usually fixed while you wait." },
      { id: "body-dents", title: "Body dents", text: "Dents on doors, fenders, bonnet and roof, pushed out from behind the panel." },
      { id: "hail", title: "Hail damage", text: "Many small dents on the roof, bonnet and boot after a storm." },
      { id: "creases", title: "Minor creases", text: "Small sharp lines and creases on body panels." },
      { id: "lease-return", title: "Before lease return or sale", text: "Remove dents before the inspection and avoid damage charges." },
      { id: "mobile", title: "Mobile service", text: "We come to your home, office or parking anywhere in Dubai and Sharjah." },
    ],
  },

  process: {
    label: "How it works",
    title: "Three simple steps",
    steps: [
      { title: "Send a photo", text: "Take a photo of the dent and send it to us on WhatsApp." },
      { title: "Get a price", text: "We reply with a price and how long it will take. No obligation." },
      { title: "We fix it", text: "At your home, office or parking. All we need is a little space next to the car." },
    ],
  },

  about: {
    label: "About",
    // TODO: rewrite with him, in his own words.
    role: "Owner and PDR technician",
    yearsLabel: "years of experience in the UAE",
    bio: [
      "I have been repairing dents without paint in the UAE for more than 10 years. I work from behind the panel with special tools and slowly push the metal back into shape, so the original paint is never touched.",
      "If a dent can't be fixed this way, I'll tell you before any work starts.",
    ],
    // Only list things that are true. TODO: confirm.
    credentials: ["Steel and aluminium panels", "Hail damage", "All car brands, including luxury cars and EVs"],
  },

  reviews: {
    label: "Reviews",
    title: "What customers say",
    rating: (value, count) => `${value} out of 5 from ${count} Google reviews`,
    all: "All reviews on Google",
    leave: "Leave a review",
  },

  faq: {
    label: "FAQ",
    title: "Common questions",
    items: [
      { q: "What is paintless dent repair?", a: "It is a way to remove dents without filler or paint. We push the metal back into shape from behind the panel, so the original paint is never touched." },
      { q: "How much does it cost?", a: "It depends on the size of the dent and where it is, and it is usually cheaper than a body shop. Send a photo on WhatsApp and we'll give you a price. It's free and there's no obligation." },
      { q: "Can every dent be fixed?", a: "Most dents can, as long as the paint is not cracked. If yours can't, we'll tell you before we start." },
      { q: "How long does it take?", a: "Most repairs take 1 to 3 hours. Large hail damage can take longer." },
      { q: "Do you come to my location?", a: "Yes, we are a mobile service. We come to homes, offices and parking areas anywhere in Dubai and Sharjah." },
      { q: "Can you fix dents before I return a leased car?", a: "Yes. It is usually much cheaper than the damage charge at the return inspection." },
    ],
  },

  contact: {
    label: "Contact",
    title: "Get a free quote",
    lead: "Send a photo of the dent on WhatsApp and we'll reply with a price.",
    whatsapp: "WhatsApp us",
    call: "Call us",
    area: "Service area",
    areaValue: "All of Dubai and Sharjah. We come to you.",
    hours: "Opening hours",
    phone: "Phone",
    email: "Email",
    areasLabel: "Areas we cover:",
    areasText: "we come to you anywhere in Dubai and Sharjah, including",
  },

  footer: { tagline: "Mobile paintless dent repair in Dubai & Sharjah", languages: "Languages" },

  modal: {
    close: "Close video",
    views: "Choose view",
    before: "Before",
    after: "After",
    split: "Side by side",
    similar: "Have a dent like this?",
    send: "Send a photo",
  },

  mobileBar: { call: "Call", whatsapp: "WhatsApp" },

  status: {
    open: (until) => `Open now · until ${until}`,
    closed: (when, at) => `Closed · opens ${when} ${at}`,
    closedAll: "Closed",
    today: "today",
    tomorrow: "tomorrow",
  },
  days: { Mo: "Mon", Tu: "Tue", We: "Wed", Th: "Thu", Fr: "Fri", Sa: "Sat", Su: "Sun" },
  closedDay: "Closed",
  everyDay: "Every day",
  time: (h, m) => `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "pm" : "am"}`,

  wa: {
    quote: `Hi ${name}! I have a dent I'd like fixed. I'll send a photo. Could you give me a price?`,
    unsure: `Hi ${name}! Can you fix this dent? Here is a photo:`,
    video: (title) => `Hi ${name}! I saw your "${title}" video. I have a similar dent, here is a photo:`,
  },
});
