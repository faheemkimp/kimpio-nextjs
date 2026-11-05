import { BRAND, LAYOUT, PLATFORM_H } from "../config";
import { iso, planeMatrix, wallFacingX } from "../geometry";
import { Prism } from "../parts/Prism";
import { Avatar } from "../parts/Avatar";

const P = LAYOUT.customer;
const TOP = PLATFORM_H;

export function CustomerStation() {
  const avatar = iso(55, 398, TOP);
  return (
    <g data-station="customer" data-rise="station">
      <Prism
        shape={P}
        z0={0}
        z1={TOP}
        top={
          <rect
            data-glow="customer"
            x={P.x + 2}
            y={P.y + 2}
            width={P.w - 4}
            height={P.d - 4}
            rx={P.r - 2}
            fill="none"
            stroke={BRAND.orange}
            strokeWidth={3}
            opacity={0}
          />
        }
      />

      {/* laptop casts a soft shadow forward onto the platform */}
      <g transform={planeMatrix(TOP)} filter="url(#wf-object-shadow)">
        <rect x={76} y={322} width={30} height={60} rx={6} fill="rgba(36,48,82,0.16)" />
      </g>

      {/* laptop screen (stands at the back edge, faces the hub) */}
      <g transform={wallFacingX(72, 382, TOP + 4 + 46)}>
        <rect width={62} height={46} rx={4} fill="#262B3A" />
        <rect x={3} y={3} width={56} height={38} rx={2} fill="#fff" />
        <rect x={3} y={3} width={56} height={6} fill="#F1F3F7" />
        <circle cx={7} cy={6} r={1.1} fill="#F07422" />
        <circle cx={10.5} cy={6} r={1.1} fill="#D5DAE3" />
        <circle cx={14} cy={6} r={1.1} fill="#D5DAE3" />
        <rect x={7} y={12} width={22} height={3} rx={1.5} fill={BRAND.ink} opacity={0.8} />
        <rect x={7} y={18} width={46} height={5} rx={1.5} fill="#F3F5F8" stroke="#E2E6ED" strokeWidth={0.6} />
        <rect x={7} y={25} width={46} height={5} rx={1.5} fill="#F3F5F8" stroke="#E2E6ED" strokeWidth={0.6} />
        <rect data-type-line x={8.5} y={19.6} width={30} height={1.8} rx={0.9} fill="#9AA3B2" />
        <rect data-type-line x={8.5} y={26.6} width={38} height={1.8} rx={0.9} fill="#9AA3B2" />
        <rect data-submit x={37} y={33} width={16} height={5} rx={2} fill={BRAND.orange} />
        <path data-cursor d="M46 31 l0 6 l1.6 -1.5 l1.2 2.5 l1 -0.5 l-1.2 -2.4 l2.2 0 z" fill="#1E1F2B" stroke="#fff" strokeWidth={0.5} />
        {/* finished design shown on delivery */}
        <g data-laptop-design opacity={0}>
          <rect x={3} y={3} width={56} height={38} rx={2} fill="url(#wf-art-sky)" />
          <circle cx={44} cy={14} r={5} fill={BRAND.orange} />
          <path d="M3 41 L3 30 Q 16 20 28 29 T 59 27 L59 41 Z" fill={BRAND.teal} />
          <path d="M3 41 L3 35 Q 20 28 36 36 L 36 41 Z" fill="#0B9C84" />
          <rect x={8} y={9} width={20} height={3.5} rx={1.5} fill="#fff" />
        </g>
      </g>

      {/* laptop base */}
      <Prism
        shape={{ kind: "rect", x: 72, y: 318, w: 50, d: 64, r: 5 }}
        z0={TOP}
        z1={TOP + 4}
        topFill="#EEF1F5"
        sideFill="#C9D0DB"
        shadow={false}
        top={<rect x={78} y={326} width={36} height={48} rx={3} fill="#DCE1E9" />}
      />

      {/* customer */}
      <g transform={`translate(${avatar.x} ${avatar.y - 22})`}>
        <Avatar tone="customer" />
        <g data-react opacity={0}>
          <circle cx={14} cy={-18} r={10} fill="#fff" filter="url(#wf-ui-shadow)" />
          <path
            d="M14 -13.5 C 8 -17.5 9 -23 12 -23 C 13.2 -23 14 -22.2 14 -21.2 C 14 -22.2 14.8 -23 16 -23 C 19 -23 20 -17.5 14 -13.5 Z"
            fill="#F0445A"
          />
        </g>
      </g>

    </g>
  );
}
