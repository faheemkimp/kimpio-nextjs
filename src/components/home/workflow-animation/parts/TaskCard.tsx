import { BRAND } from "../config";

export const STATUSES = [
  { id: "new", text: "New Request", color: BRAND.orange },
  { id: "requests", text: "Requests", color: BRAND.teal },
  { id: "progress", text: "In Progress", color: "#E8A317" },
  { id: "review", text: "In Review", color: "#7C5CFF" },
  { id: "completed", text: "Completed", color: "#16A34A" },
] as const;

export type StatusId = (typeof STATUSES)[number]["id"];

/** Mini design artwork (wireframe → full colour) used on the card and its copies. */
function Art({ fill }: { fill: boolean }) {
  const a = fill ? { "data-card-fill": "" } : {};
  return (
    <>
      <rect x={-28} y={-88} width={56} height={40} rx={7} fill="#EEF1F5" />
      {/* wireframe */}
      <circle cx={15} cy={-77} r={5} fill="none" stroke="#C7CED9" strokeWidth={1.3} />
      <path d="M-28 -50 L-14 -64 L-4 -55 L6 -63 L28 -48" fill="none" stroke="#C7CED9" strokeWidth={1.3} strokeLinejoin="round" />
      <rect x={-22} y={-83} width={20} height={4} rx={2} fill="none" stroke="#C7CED9" strokeWidth={1.1} />
      {/* colour */}
      <rect {...a} x={-28} y={-88} width={56} height={40} rx={7} fill="url(#wf-art-sky)" opacity={fill ? 0 : 1} />
      <circle {...a} cx={15} cy={-77} r={5.5} fill={BRAND.orange} opacity={fill ? 0 : 1} />
      <path {...a} d="M-28 -55 Q -15 -68 -2 -58 T 28 -60 L28 -55 Q 28 -48 21 -48 L-21 -48 Q -28 -48 -28 -55 Z" fill={BRAND.teal} opacity={fill ? 0 : 1} />
      <path {...a} d="M-28 -52 Q -10 -60 6 -51 L6 -48 L-21 -48 Q -28 -48 -28 -52 Z" fill="#0B9C84" opacity={fill ? 0 : 1} />
      <rect {...a} x={-22} y={-83} width={20} height={4} rx={2} fill="#fff" opacity={fill ? 0 : 1} />
    </>
  );
}

export function TaskCard() {
  return (
    <g data-card opacity={0}>
      <ellipse data-card-shadow cx={0} cy={23} rx={24} ry={8} fill="rgba(30,40,70,0.18)" />
      <ellipse data-card-glow cx={0} cy={-50} rx={62} ry={66} fill="url(#wf-glow-orange)" />
      <g data-card-body>
        <rect x={-32} y={-91} width={68} height={86} rx={11} fill="#D6DCE5" />
        <rect x={-34} y={-94} width={68} height={86} rx={11} fill="#fff" />
        <rect x={-33} y={-93} width={66} height={30} rx={10} fill="url(#wf-tile-gloss)" />
        <rect data-card-outline x={-34} y={-94} width={68} height={86} rx={11} fill="none" stroke={BRAND.orange} strokeWidth={2} />
        <Art fill />
        <rect x={-28} y={-41} width={40} height={4} rx={2} fill="#D3D9E2" />
        <rect x={-28} y={-33} width={26} height={4} rx={2} fill="#E3E7ED" />
        <rect x={-28} y={-22} width={56} height={4} rx={2} fill="#EEF1F5" />
        <rect data-card-progress x={-28} y={-22} width={56} height={4} rx={2} fill={BRAND.teal} />
        <g data-card-scan opacity={0}>
          <rect x={-34} y={-96} width={68} height={12} fill={BRAND.teal} opacity={0.12} />
          <rect x={-34} y={-86} width={68} height={2} fill={BRAND.teal} />
        </g>
      </g>

      {/* status pill (Kimp 360 board columns) */}
      <g transform="translate(0 -108)">
        {STATUSES.map((s) => {
          const w = 24 + s.text.length * 5.6;
          return (
            <g key={s.id} data-status={s.id} opacity={0}>
              <rect x={-w / 2} y={-9} width={w} height={18} rx={9} fill="#fff" stroke="#E3E7EE" filter="url(#wf-ui-shadow)" />
              <circle cx={-w / 2 + 10} cy={0} r={3} fill={s.color} />
              <text x={-w / 2 + 17} y={3.5} fontSize={9.5} fontWeight={600} fill="#374151">
                {s.text}
              </text>
            </g>
          );
        })}
      </g>

      {/* triage chips */}
      <g transform="translate(40 -80)"><g data-chip opacity={0}>
        <rect width={34} height={16} rx={8} fill="#FDECEC" />
        <text x={17} y={11} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="#D93A3A">
          High
        </text>
      </g></g>
      <g transform="translate(40 -60)"><g data-chip opacity={0}>
        <rect width={38} height={16} rx={8} fill="#EEF2F6" />
        <circle cx={9} cy={8} r={3.6} fill="none" stroke="#5B6475" strokeWidth={1.2} />
        <path d="M9 6 L9 8 L10.5 9" fill="none" stroke="#5B6475" strokeWidth={1.1} strokeLinecap="round" />
        <text x={16} y={11} fontSize={8.5} fontWeight={700} fill="#374151">
          24h
        </text>
      </g></g>

      {/* approval check */}
      <g data-card-check transform="translate(31 -92)">
        <circle r={11} fill="#16A34A" stroke="#fff" strokeWidth={2.5} />
        <path d="M-4.5 0 L-1.2 3.4 L4.8 -3.2" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  );
}

/** Small post-shaped copies that fly to each social platform. */
export function SocialCopy({ i }: { i: number }) {
  return (
    <g data-copy={i} opacity={0}>
      <g transform="scale(0.42) translate(0 50)">
        <rect x={-34} y={-94} width={68} height={50} rx={10} fill="#fff" stroke="#E6E9EF" />
        <Art fill={false} />
      </g>
    </g>
  );
}
