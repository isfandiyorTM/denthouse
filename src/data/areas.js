// Dubai neighbourhoods (+ Sharjah) we serve. Shown as plain text in the contact section and
// sent to Google (areaServed). People search with these names.
// Russian and Hindi pages use the English names, which is how they're used in Dubai.
export const AREAS = {
  en: [
    "Al Quoz", "Al Barsha", "Dubai Marina", "JLT", "JBR", "Palm Jumeirah",
    "Jumeirah", "Umm Suqeim", "Downtown Dubai", "Business Bay", "DIFC",
    "Dubai Hills", "Arabian Ranches", "Motor City", "Sports City", "JVC",
    "Al Furjan", "Damac Hills", "Mirdif", "Dubai Silicon Oasis", "Al Nahda",
    "Deira", "Bur Dubai", "Al Karama", "Sharjah",
  ],
  ar: [
    "القوز", "البرشاء", "دبي مارينا", "أبراج بحيرات جميرا", "جميرا بيتش ريزيدنس", "نخلة جميرا",
    "جميرا", "أم سقيم", "وسط مدينة دبي", "الخليج التجاري", "مركز دبي المالي العالمي",
    "دبي هيلز", "المرابع العربية", "موتور سيتي", "مدينة دبي الرياضية", "قرية جميرا الدائرية",
    "الفرجان", "داماك هيلز", "مردف", "واحة دبي للسيليكون", "النهدة",
    "ديرة", "بر دبي", "الكرامة", "الشارقة",
  ],
};

export const areasFor = (lang) => AREAS[lang] ?? AREAS.en;
