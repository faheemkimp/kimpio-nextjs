import { BRAND, LAYOUT } from "../config";
import { iso } from "../geometry";
import { Prism } from "../parts/Prism";
import { Avatar } from "../parts/Avatar";

const H = LAYOUT.hub;
const TOP = LAYOUT.hubH;
const RING_R = 60;
/** Teal family from the original ring, lifted for a holographic glow. */
const HOLO = { base: BRAND.teal, bright: "#19B79A", glint: "#9FF5E2" };

/** Fixed (deterministic) particle seeds inside the column: [x, y] as fractions of rx / ry. */
const PARTICLES: [number, number][] = [
  [-0.62, 0.1], [-0.35, -0.4], [-0.1, 0.45], [0.18, -0.15],
  [0.4, 0.38], [0.66, -0.05], [-0.48, 0.5], [0.05, -0.55],
  [0.3, 0.6], [-0.75, -0.2],
];

/** Translucent light column rising off the hub top (screen space). */
function HoloBeam() {
  const c = iso(H.cx, H.cy, TOP);
  // projected radius of the ring on screen
  const rx = RING_R * Math.SQRT2 * Math.cos(Math.PI / 6);
  const ry = RING_R * Math.SQRT2 * 0.5;
  const hgt = 64;
  const d = `M ${c.x - rx} ${c.y} L ${c.x - rx} ${c.y - hgt} A ${rx} ${ry} 0 0 1 ${c.x + rx} ${c.y - hgt} L ${c.x + rx} ${c.y} A ${rx} ${ry} 0 0 1 ${c.x - rx} ${c.y} Z`;
  return (
    <g data-hub-beam pointerEvents="none">
      <linearGradient id="wf-holo-beam" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={HOLO.bright} stopOpacity="0.2" />
        <stop offset="0.6" stopColor={HOLO.bright} stopOpacity="0.06" />
        <stop offset="1" stopColor={HOLO.bright} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wf-holo-surge" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={HOLO.glint} stopOpacity="0.55" />
        <stop offset="0.5" stopColor={HOLO.bright} stopOpacity="0.18" />
        <stop offset="1" stopColor={HOLO.bright} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wf-holo-edge" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={HOLO.glint} stopOpacity="0.7" />
        <stop offset="1" stopColor={HOLO.glint} stopOpacity="0" />
      </linearGradient>

      <g data-holo-flicker>
        <path d={d} fill="url(#wf-holo-beam)" />
        <path d={`M ${c.x - rx} ${c.y} L ${c.x - rx} ${c.y - hgt}`} stroke="url(#wf-holo-edge)" strokeWidth={1} />
        <path d={`M ${c.x + rx} ${c.y} L ${c.x + rx} ${c.y - hgt}`} stroke="url(#wf-holo-edge)" strokeWidth={1} />
      </g>
      {/* brighter column flashed when a request arrives */}
      <path data-holo-surge d={d} fill="url(#wf-holo-surge)" opacity={0} />


      {/* light particles drifting upward */}
      {PARTICLES.map(([px, py], i) => (
        <circle
          key={i}
          data-holo-particle
          cx={c.x + px * rx * 0.85}
          cy={c.y + py * ry * 0.7}
          r={i % 3 === 0 ? 1.8 : 1.2}
          fill={i % 2 ? HOLO.glint : HOLO.bright}
          opacity={0}
        />
      ))}
    </g>
  );
}

/** Flying mascot (hub-fly.webp, 720×535) hovering above the hub. */
const MASCOT_SRC = "/images/mascot/hub-fly.webp";
const MASCOT_W = 215;
const MASCOT_H = (MASCOT_W * 535) / 720;
/** Gap between his boots and the disc top (screen px). */
const MASCOT_LIFT = 12;

/**
 * Rendered by the scene just before the travelling task card (not inside the hub group),
 * so the card and popup pass in front of him. Rises in with the stations.
 */
export function HubMascot() {
  const c = iso(H.cx, H.cy, TOP);
  const x = c.x - MASCOT_W / 2 - 14;
  const y = c.y - MASCOT_LIFT - MASCOT_H;
  return (
    <g data-hub-mascot data-rise="station" pointerEvents="none">
      <defs>
        <filter id="wf-mascot-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFB547" floodOpacity="0.35" />
        </filter>
        <filter id="wf-mascot-shadow-blur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      {/* soft shadow on the disc; he's in the air, so it's wide and faint */}
      <ellipse cx={c.x} cy={c.y} rx={46} ry={11} fill="#021f1c" opacity={0.4} filter="url(#wf-mascot-shadow-blur)" />
      <g className="hub-mascot-float">
        <image href={MASCOT_SRC} x={x} y={y} width={MASCOT_W} height={MASCOT_H} filter="url(#wf-mascot-glow)" />
      </g>
    </g>
  );
}

/** Central Kimp 360 pedestal: rotating ring, printed logo, glow + flash. */
export function Kimp360Hub() {
  return (
    <g data-station="kimp360" data-rise="station">
      <Prism
        shape={H}
        z0={0}
        z1={TOP}
        top={
          <g>
            <circle cx={H.cx} cy={H.cy} r={53} fill="#073E36" stroke="#1C7A6A" strokeOpacity={0.6} strokeWidth={2} />
            {/* holographic emitter ring */}
            <linearGradient
              id="wf-holo-sweep"
              gradientUnits="userSpaceOnUse"
              x1={H.cx - RING_R}
              y1={H.cy}
              x2={H.cx + RING_R}
              y2={H.cy}
            >
              <stop offset="0" stopColor={HOLO.base} stopOpacity="0" />
              <stop offset="0.45" stopColor={HOLO.base} stopOpacity="0.35" />
              <stop offset="0.85" stopColor={HOLO.bright} stopOpacity="1" />
              <stop offset="1" stopColor={HOLO.glint} stopOpacity="1" />
            </linearGradient>
            <circle cx={H.cx} cy={H.cy} r={RING_R} fill="none" stroke={HOLO.base} strokeWidth={7} opacity={0.22} filter="url(#wf-holo-bloom)" />
            <circle cx={H.cx} cy={H.cy} r={RING_R} fill="none" stroke={HOLO.base} strokeWidth={2.4} opacity={0.22} />
            <g data-hub-ring>
              <circle cx={H.cx} cy={H.cy} r={RING_R} fill="none" stroke="url(#wf-holo-sweep)" strokeWidth={3.6} strokeLinecap="round" />
              <circle cx={H.cx} cy={H.cy} r={RING_R} fill="none" stroke="url(#wf-holo-sweep)" strokeWidth={8} opacity={0.35} filter="url(#wf-holo-bloom)" />
            </g>
            <g data-hub-ticks>
              <circle
                cx={H.cx}
                cy={H.cy}
                r={RING_R - 5}
                fill="none"
                stroke={HOLO.bright}
                strokeWidth={1.6}
                pathLength={360}
                strokeDasharray="1.5 4.5 1.5 4.5 1.5 4.5 1.5 4.5 1.5 34.5"
                strokeLinecap="round"
                opacity={0.75}
              />
            </g>
            {/* energy ripples spreading across the emitter */}
            <circle data-holo-ripple cx={H.cx} cy={H.cy} r={18} fill="none" stroke={HOLO.bright} strokeWidth={1.6} opacity={0} />
            <circle data-holo-ripple cx={H.cx} cy={H.cy} r={18} fill="none" stroke={HOLO.bright} strokeWidth={1.6} opacity={0} />
            {/* light variant: the hub disc is dark teal */}
            <image href="/brand/kimp360-logo-light.svg" x={H.cx - 38} y={H.cy - 8.8} width={76} height={17.5} />
            <circle data-hub-flash cx={H.cx} cy={H.cy} r={H.r - 1} fill={BRAND.teal} opacity={0} />
            <circle data-glow="kimp360" cx={H.cx} cy={H.cy} r={H.r - 2} fill="none" stroke={BRAND.orange} strokeWidth={3} opacity={0} />
          </g>
        }
      />
      <HoloBeam />
    </g>
  );
}

/** Kimp 360 kanban popup shown while the request is triaged (step 2). */
export function HubPopup() {
  const anchor = iso(LAYOUT.hub.cx + 40, LAYOUT.hub.cy - 40, TOP);
  return (
    <g transform="translate(552 128)">
      <g data-hub-popup opacity={0}>
        <path d={`M10 112 L ${anchor.x - 552} ${anchor.y - 128 - 8} L 30 120 Z`} fill="#fff" />
        <rect width={156} height={124} rx={14} fill="#fff" filter="url(#wf-ui-shadow)" />
        <image href="/brand/kimp360-logo.svg" x={10} y={9} width={58} height={13.4} />
        <rect x={110} y={9} width={36} height={14} rx={7} fill="#FFF1E8" />
        <text x={128} y={19} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={BRAND.orange}>
          Board
        </text>
        <rect x={8} y={30} width={140} height={86} rx={10} fill={BRAND.tealBoard} />
        <text x={16} y={45} fontSize={9} fontWeight={700} fill="#fff">
          Requests
        </text>
        <rect x={59} y={37} width={14} height={11} rx={5.5} fill="rgba(255,255,255,0.22)" />
        <text data-popup-count="a" x={66} y={45.3} textAnchor="middle" fontSize={7} fontWeight={700} fill="#fff">
          3
        </text>
        <text data-popup-count="b" x={66} y={45.3} textAnchor="middle" fontSize={7} fontWeight={700} fill="#fff" opacity={0}>
          4
        </text>
        {/* existing cards */}
        <g>
          <rect x={14} y={74} width={128} height={17} rx={5} fill="#fff" />
          <rect x={20} y={80.5} width={62} height={4} rx={2} fill="#C9D0DA" />
          <rect x={14} y={95} width={128} height={17} rx={5} fill="#fff" opacity={0.92} />
          <rect x={20} y={101.5} width={48} height={4} rx={2} fill="#C9D0DA" />
        </g>
        {/* the new request slides in on top */}
        <g data-popup-new>
          <rect x={14} y={53} width={128} height={17} rx={5} fill="#fff" stroke={BRAND.orange} strokeWidth={1.2} />
          <rect x={20} y={57} width={9} height={9} rx={2.5} fill="url(#wf-orange)" />
          <rect x={33} y={59.5} width={52} height={4} rx={2} fill={BRAND.ink} opacity={0.75} />
          <g data-popup-assign transform="translate(132 61.5)">
            <Avatar tone="designer" r={6} />
          </g>
          <rect x={92} y={57} width={26} height={9} rx={4.5} fill="#FDECEC" />
          <text x={105} y={63.6} textAnchor="middle" fontSize={6} fontWeight={700} fill="#D93A3A">
            High
          </text>
        </g>
      </g>
    </g>
  );
}
