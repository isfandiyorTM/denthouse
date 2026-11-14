// English — the main version of the site (served at "/").
// Each language file has exactly the same shape. Values that are functions
// receive data (names, numbers) and return text.
// `area` = workshop neighbourhood, `mobile` = whether we drive to customers.
export default ({ name, area, mobile }) => ({
  city: "Dubai",
  skip: "Skip to content",

  seo: {
    title: `Paintless Dent Repair Dubai | PDR & Dent Removal | ${name}`,
    description:
      `Paintless dent repair (PDR) in Dubai. Door dings, creases and hail damage removed with no paint or filler. ` +
      `Workshop in ${area}${mobile ? " + mobile service" : ""}. WhatsApp a photo for a free quote.`,
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
    lead: "We remove dents from your car without paint or filler. Your original paint stays, and most repairs are done the same day.",
    cta: "Send a photo on WhatsApp",
    note: "Free quote. Send a photo of the dent and we'll reply with a price.",
    stats: { years: "years of experience", paint: "original paint kept", time: "typical repair", timeValue: "1–3 h" },
    scroll: "Scroll down",
    slides: { label: "Background photos", photo: (i, n) => `Photo ${i} of ${n}`, pause: "Pause slideshow", play: "Play slideshow" },
  },

  marquee: { mobile: "We come to you in", static: "Our customers come from" },

  benefits: [
    { title: "Original paint stays", text: "No filler and no repainting, so your car keeps its value." },
    { title: "Done in hours", text: "Most dents are fixed the same day, often while you wait." },
    mobile
      ? { title: "We come to you", text: `Anywhere in Dubai, or at our workshop in ${area}.` }
      : { title: "Fair price", text: "No paint or parts to pay for. Send a photo for a free quote." },
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
      { id: "hail", title: "Hail damage", text: "Many small dents on the roof, bonnet and boot after a storm." },
      { id: "creases", title: "Creases and large dents", text: "Sharp lines and bigger dents on doors, fenders and side panels." },
      { id: "bumpers", title: "Bumper dents", text: "Pushed-in plastic bumpers reshaped with heat. No new part needed." },
      { id: "lease-return", title: "Before lease return or sale", text: "Remove dents before the inspection and avoid damage charges." },
      { id: "mobile", mobileOnly: true, title: "Mobile service", text: "We come to your home or office anywhere in Dubai." },
    ],
  },

  process: {
    label: "How it works",
    title: "Three simple steps",
    steps: [
      { title: "Send a photo", text: "Take a photo of the dent and send it to us on WhatsApp." },
      { title: "Get a price", text: "We reply with a price and how long it will take. No obligation." },
      { title: "We fix it", text: mobile ? `At our workshop in ${area} or at your location.` : `At our workshop in ${area}.` },
    ],
  },

  about: {
    label: "About",
    // TODO: rewrite with him, in his own words.
    role: "Owner and PDR technician",
    bio: [
      "I have been repairing dents without paint for years. I work from behind the panel with special tools and slowly push the metal back into shape, so the original paint is never touched.",
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
      { q: "How much does it cost?", a: "It depends on the size of the dent and where it is. Send a photo on WhatsApp and we'll give you a price. It's free and there's no obligation." },
      { q: "Can every dent be fixed?", a: "Most dents can, as long as the paint is not cracked. If yours can't, we'll tell you before we start." },
      { q: "How long does it take?", a: "Most dents take 30 minutes to 3 hours. Hail damage can take one to three days." },
      { mobileOnly: true, q: "Do you come to my location?", a: `Yes. We come to homes and offices anywhere in Dubai. Big jobs like hail damage are done at our workshop in ${area}.` },
      { q: "Can you fix dents before I return a leased car?", a: "Yes. It is usually much cheaper than the damage charge at the return inspection." },
    ],
  },

  contact: {
    label: "Contact",
    title: "Get a free quote",
    lead: "Send a photo of the dent on WhatsApp and we'll reply with a price.",
    whatsapp: "WhatsApp us",
    call: "Call us",
    workshop: "Workshop",
    directions: "Get directions",
    hours: "Opening hours",
    phone: "Phone",
    email: "Email",
    areasLabel: "Areas we cover:",
    areasMobile: "we come to you anywhere in Dubai, including",
    areasStatic: "customers come to us from all over Dubai, including",
    map: `Map showing ${name} in ${area}, Dubai`,
  },

  footer: { tagline: "Paintless dent repair in Dubai", languages: "Languages" },

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
  time: (h, m) => `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "pm" : "am"}`,

  wa: {
    quote: `Hi ${name}! I have a dent I'd like fixed. I'll send a photo. Could you give me a price?`,
    unsure: `Hi ${name}! Can you fix this dent? Here is a photo:`,
    video: (title) => `Hi ${name}! I saw your "${title}" video. I have a similar dent, here is a photo:`,
  },
});
