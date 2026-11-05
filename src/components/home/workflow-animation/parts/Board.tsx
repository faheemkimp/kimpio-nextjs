import { DECOR_GROOVES, GROOVES, LAYOUT } from "../config";
import { planeMatrix, planePath, type Seg } from "../geometry";

function socialSpurs(): Record<string, Seg[]> {
  const j = LAYOUT.junction;
  return Object.fromEntries(
    LAYOUT.socialTiles.map((t, i) => [`spur${i}`, [["M", j.x, j.y], ["L", t.x, t.y]] as Seg[]]),
  );
}

/**
 * A channel cut into the surface (plane coordinates). Lit from the top-left:
 * a bright lip on the near edge, a shadowed far wall, and a softly lit floor.
 */
function Channel({ d, w }: { d: string; w: number }) {
  const common = { d, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <>
      {/* dark teal channel: faint teal lip, deep wall, slightly lit floor */}
      <path {...common} stroke="#1A6F61" strokeOpacity={0.55} strokeWidth={w + 3} transform="translate(1.6 1.6)" />
      <path {...common} stroke="#021B17" strokeWidth={w} />
      <path {...common} stroke="#06302A" strokeWidth={w * 0.78} transform="translate(1.3 1.3)" filter="url(#wf-groove-soft)" />
      <path {...common} stroke="#0A3F37" strokeWidth={w * 0.46} transform="translate(2.2 2.2)" filter="url(#wf-groove-soft)" />
    </>
  );
}

/** Decorative grooves that leave the scene, fading out along their length. */
function DecorGrooves() {
  return (
    <>
      {DECOR_GROOVES.map((segs, i) => {
        const a = segs[0];
        const z = segs[segs.length - 1];
        const end = z[0] === "Q" ? [z[3], z[4]] : [z[1], z[2]];
        const id = `wf-decor-fade-${i}`;
        const d = planePath(segs);
        return (
          <g key={id}>
            <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={a[1]} y1={a[2]} x2={end[0]} y2={end[1]}>
              <stop offset="0" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x={-600} y={-600} width={1800} height={1800}>
              <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
            </mask>
            <g mask={`url(#${id}-m)`}>
              <Channel d={d} w={17} />
            </g>
          </g>
        );
      })}
    </>
  );
}

/** Recessed grooves + the orange "lit" overlays the timeline draws in. */
export function Grooves() {
  const all = { ...GROOVES, ...socialSpurs() };
  return (
    <g transform={planeMatrix(0)} data-rise="grooves">
      <DecorGrooves />
      {Object.entries(all).map(([id, segs]) => {
        const d = planePath(segs);
        const spur = id.startsWith("spur");
        return (
          <g key={id}>
            <Channel d={d} w={spur ? 9 : 17} />
            <path
              data-lit={id}
              d={d}
              fill="none"
              stroke={id === "RH" || id === "HC" ? "#13A386" : "#F28A3C"}
              strokeWidth={spur ? 3 : 5}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(1.2 1.2)"
              opacity={0}
            />
          </g>
        );
      })}
    </g>
  );
}
