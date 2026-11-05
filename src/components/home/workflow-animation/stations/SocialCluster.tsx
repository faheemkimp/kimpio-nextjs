import { BRAND, LAYOUT, type Platform } from "../config";
import { iso } from "../geometry";
import { Prism } from "../parts/Prism";
import { SocialIcon } from "../icons/social";

export const SOCIAL_PAD_H = 8;
export const SOCIAL_ICON_Z = 40;

export function SocialCluster({ platforms }: { platforms: Platform[] }) {
  const j = LAYOUT.junction;
  return (
    <g data-station="social" data-rise="station">
      <Prism
        shape={{ kind: "circle", cx: j.x, cy: j.y, r: 13 }}
        z0={0}
        z1={6}
        top={<circle data-glow="social" cx={j.x} cy={j.y} r={11} fill="none" stroke={BRAND.orange} strokeWidth={2.5} opacity={0} />}
      />
      {platforms
        .map((p, i) => ({ p, i, t: LAYOUT.socialTiles[i] }))
        .filter(({ t }) => Boolean(t))
        .sort((a, b) => a.t.x + a.t.y - (b.t.x + b.t.y))
        .map(({ p, i, t }) => {
        const c = iso(t.x, t.y, SOCIAL_ICON_Z);
        return (
          <g key={p}>
            <Prism shape={{ kind: "rect", x: t.x - 17, y: t.y - 17, w: 34, d: 34, r: 9 }} z0={0} z1={SOCIAL_PAD_H} />
            <g transform={`translate(${c.x} ${c.y})`}>
              <g data-social-tile={i}>
                <ellipse cx={0} cy={SOCIAL_ICON_Z - SOCIAL_PAD_H - 2} rx={11} ry={4.5} fill="rgba(40,52,84,0.14)" data-social-shadow />
                <g data-social-float>
                  <rect x={-17} y={-13} width={34} height={34} rx={10} fill="#C9D0DB" filter="url(#wf-ui-shadow)" />
                  <rect x={-17} y={-17} width={34} height={34} rx={10} fill="#fff" />
                  <SocialIcon platform={p} />
                  <rect x={-15} y={-15} width={30} height={30} rx={8} fill="url(#wf-tile-gloss)" />
                  <rect x={-17} y={-17} width={34} height={34} rx={10} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={1} />
                  <rect data-social-dim x={-17} y={-17} width={34} height={34} rx={10} fill="#F4F6FA" opacity={0.62} />
                </g>
              </g>
              <g transform="translate(0 -30)"><g data-pop={i} opacity={0}>
                <rect x={-21} y={-9} width={42} height={18} rx={9} fill="#fff" stroke="#E3E7EE" filter="url(#wf-ui-shadow)" />
                <path
                  d="M-10 4 C -15.5 0.5 -14.5 -4.5 -11.8 -4.5 C -10.8 -4.5 -10 -3.8 -10 -2.9 C -10 -3.8 -9.2 -4.5 -8.2 -4.5 C -5.5 -4.5 -4.5 0.5 -10 4 Z"
                  fill="#F0445A"
                />
                <text x={-1.5} y={3.4} fontSize={9} fontWeight={700} fill={BRAND.ink}>
                  {["2.4k", "860", "1.2k", "9.1k"][i]}
                </text>
              </g></g>
            </g>
          </g>
        );
      })}
    </g>
  );
}
