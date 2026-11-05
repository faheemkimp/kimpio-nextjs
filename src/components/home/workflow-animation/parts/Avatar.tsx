type Tone = "customer" | "designer" | "team";

const TONES: Record<Tone, { bg: string; skin: string; hair: string; shirt: string }> = {
  customer: { bg: "#FFE8D6", skin: "#F2C29B", hair: "#3B2A22", shirt: "#F07422" },
  designer: { bg: "#D9F2EC", skin: "#D9A17A", hair: "#1F2433", shirt: "#03816D" },
  team: { bg: "#E8ECFF", skin: "#F0C7A4", hair: "#5A3A2A", shirt: "#5B6CFF" },
};

/** Small upright avatar badge (origin = center). */
export function Avatar({ tone, r = 15 }: { tone: Tone; r?: number }) {
  const t = TONES[tone];
  const s = r / 15;
  return (
    <g>
      <circle r={r + 2.5} fill="#fff" filter="url(#wf-ui-shadow)" />
      <circle r={r} fill={t.bg} />
      <g transform={`scale(${s})`}>
        <clipPath id={`wf-av-${tone}`}>
          <circle r={15} />
        </clipPath>
        <g clipPath={`url(#wf-av-${tone})`}>
          <path d="M-11 16 C -11 6 -6 3 0 3 C 6 3 11 6 11 16 Z" fill={t.shirt} />
          <circle cy={-3.5} r={6} fill={t.skin} />
          <path d="M-6.3 -4.5 C -6.5 -10.5 -2 -11.5 0.5 -11.2 C 5 -11 7 -8 6.3 -4 C 4 -7 -1 -7.5 -6.3 -4.5 Z" fill={t.hair} />
          {tone === "designer" && (
            <path d="M-7.5 -3 C -7.5 -12 7.5 -12 7.5 -3" fill="none" stroke="#1F2433" strokeWidth={1.6} />
          )}
        </g>
      </g>
    </g>
  );
}
