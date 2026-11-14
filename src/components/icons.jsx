// Brand glyphs that lucide doesn't ship, plus the DentHouse logo mark.

export function LogoMark({ size = 32, className }) {
  // Three reflection lines — the middle one bends where a dent is:
  // exactly what a PDR technician reads on a line board.
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#E8580A" />
      <g fill="none" stroke="#0b0c0e" strokeWidth="2.6" strokeLinecap="round">
        <path d="M7 9.5h18" />
        <path d="M7 16h4.2c2.2 0 2.6 3.6 4.8 3.6s2.6-3.6 4.8-3.6H25" />
        <path d="M7 23h18" />
      </g>
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M14 3v11.6a3.6 3.6 0 1 1-3.6-3.6" />
      <path d="M14 3c.4 2.7 2.4 4.7 5 5" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M2.5 7.2a2.8 2.8 0 0 1 2-2C6.3 4.7 12 4.7 12 4.7s5.7 0 7.5.5a2.8 2.8 0 0 1 2 2c.5 1.8.5 4.8.5 4.8s0 3-.5 4.8a2.8 2.8 0 0 1-2 2c-1.8.5-7.5.5-7.5.5s-5.7 0-7.5-.5a2.8 2.8 0 0 1-2-2C2 15 2 12 2 12s0-3 .5-4.8Z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  tiktok: { Icon: TikTokIcon, label: "TikTok" },
  youtube: { Icon: YouTubeIcon, label: "YouTube" },
  facebook: { Icon: FacebookIcon, label: "Facebook" },
};
