/**
 * Flat, outlined "design tool" card for the secondary hero: a card slab with a
 * darker extruded edge, an inset panel and one design glyph. Pure SVG so it stays
 * crisp at any size.
 */

export const HERO2_COLORS = {
  ink: "#1b1e23",
  card: "#f7802c",
  cardDeep: "#c4560a",
  cardSoft: "#ffd6b8",
  accent: "#00806c",
  pop: "#6fd0b9",
  white: "#ffffff",
} as const;

const C = HERO2_COLORS;
const stroke = { stroke: C.ink, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

export type Glyph = "palette" | "pen" | "type" | "shapes" | "play" | "image" | "layers" | "grid" | "brand";

function GlyphArt({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case "palette":
      return (
        <>
          <circle cx={-26} cy={0} r={11} fill={C.pop} {...stroke} />
          <circle cx={0} cy={0} r={11} fill={C.white} {...stroke} />
          <circle cx={26} cy={0} r={11} fill={C.accent} {...stroke} />
        </>
      );
    case "pen":
      return (
        <>
          <path d="M-34 14 C -18 -26, 18 30, 34 -12" fill="none" {...stroke} strokeWidth={3.5} />
          <line x1={-18} y1={-10} x2={14} y2={14} {...stroke} strokeWidth={2} />
          <circle cx={-18} cy={-10} r={4} fill={C.white} {...stroke} strokeWidth={2} />
          <circle cx={14} cy={14} r={4} fill={C.white} {...stroke} strokeWidth={2} />
          <rect x={-39} y={9} width={10} height={10} rx={2} fill={C.pop} {...stroke} strokeWidth={2.5} />
          <rect x={29} y={-17} width={10} height={10} rx={2} fill={C.pop} {...stroke} strokeWidth={2.5} />
        </>
      );
    case "type":
      return (
        <text
          x={0}
          y={12}
          textAnchor="middle"
          fontSize={34}
          fontWeight={800}
          fill={C.white}
          stroke={C.ink}
          strokeWidth={3}
          paintOrder="stroke"
          style={{ fontFamily: "inherit" }}
        >
          Aa
        </text>
      );
    case "shapes":
      return (
        <>
          <circle cx={-24} cy={0} r={12} fill={C.pop} {...stroke} />
          <path d="M0 -13 L13 11 L-13 11 Z" fill={C.white} {...stroke} />
          <rect x={14} y={-11} width={22} height={22} rx={3} fill={C.accent} {...stroke} />
        </>
      );
    case "play":
      return (
        <>
          <circle cx={0} cy={0} r={18} fill={C.white} {...stroke} />
          <path d="M-6 -9 L11 0 L-6 9 Z" fill={C.pop} {...stroke} strokeWidth={2.5} />
        </>
      );
    case "image":
      return (
        <>
          <rect x={-32} y={-18} width={64} height={36} rx={4} fill={C.white} {...stroke} />
          <path d="M-30 16 L-10 -4 L4 10 L14 2 L30 16 Z" fill={C.pop} {...stroke} strokeWidth={2.5} />
          <circle cx={16} cy={-8} r={5} fill={C.accent} {...stroke} strokeWidth={2.5} />
        </>
      );
    case "layers":
      return (
        <>
          <path d="M0 -2 L30 10 L0 22 L-30 10 Z" fill={C.accent} {...stroke} />
          <path d="M0 -10 L30 2 L0 14 L-30 2 Z" fill={C.white} {...stroke} />
          <path d="M0 -20 L30 -8 L0 4 L-30 -8 Z" fill={C.pop} {...stroke} />
        </>
      );
    case "grid":
      return (
        <>
          <rect x={-30} y={-18} width={28} height={16} rx={3} fill={C.pop} {...stroke} strokeWidth={2.5} />
          <rect x={2} y={-18} width={28} height={16} rx={3} fill={C.white} {...stroke} strokeWidth={2.5} />
          <rect x={-30} y={2} width={28} height={16} rx={3} fill={C.white} {...stroke} strokeWidth={2.5} />
          <rect x={2} y={2} width={28} height={16} rx={3} fill={C.accent} {...stroke} strokeWidth={2.5} />
        </>
      );
    case "brand":
      // Hero card: two "lenses", like the twin fans on a graphics card.
      return (
        <>
          <circle cx={-23} cy={0} r={19} fill={C.white} {...stroke} />
          <text x={-23} y={8} textAnchor="middle" fontSize={22} fontWeight={800} fill={C.ink} style={{ fontFamily: "inherit" }}>
            Aa
          </text>
          <circle cx={23} cy={0} r={19} fill={C.white} {...stroke} />
          <path d="M10 8 C 16 -14, 30 14, 36 -8" fill="none" {...stroke} />
          <circle cx={23} cy={0} r={3.5} fill={C.pop} {...stroke} strokeWidth={2} />
        </>
      );
  }
}

export function DesignCard({ glyph, className }: { glyph: Glyph; className?: string }) {
  return (
    <svg viewBox="0 0 132 92" className={className} aria-hidden="true" focusable="false">
      {/* extruded edge */}
      <rect x={10} y={12} width={118} height={76} rx={12} fill={C.cardDeep} {...stroke} strokeWidth={3.5} />
      <line x1={113} y1={5} x2={122} y2={14} {...stroke} strokeWidth={3} />
      <line x1={6} y1={74} x2={14} y2={84} {...stroke} strokeWidth={3} />
      {/* face */}
      <rect x={3} y={3} width={118} height={76} rx={12} fill={C.card} {...stroke} strokeWidth={3.5} />
      <rect x={13} y={13} width={98} height={56} rx={8} fill={C.cardSoft} {...stroke} />
      <g transform="translate(62 41)">
        <GlyphArt glyph={glyph} />
      </g>
    </svg>
  );
}
