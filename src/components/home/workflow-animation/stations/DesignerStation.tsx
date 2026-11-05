import { BRAND, LAYOUT, PLATFORM_H } from "../config";
import { iso, planeMatrix, wallFacingY } from "../geometry";
import { Prism } from "../parts/Prism";
import { Avatar } from "../parts/Avatar";

const P = LAYOUT.designer;
const TOP = PLATFORM_H;

export function DesignerStation() {
  const av = iso(415, 140, TOP);
  return (
    <g data-station="designer" data-rise="station">
      <Prism
        shape={P}
        z0={0}
        z1={TOP}
        top={
          <rect
            data-glow="designer"
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

      {/* monitor casts a soft shadow onto the desk */}
      <g transform={planeMatrix(TOP)} filter="url(#wf-object-shadow)">
        <rect x={332} y={52} width={84} height={22} rx={8} fill="rgba(36,48,82,0.14)" />
      </g>

      {/* monitor stand */}
      <Prism shape={{ kind: "rect", x: 354, y: 46, w: 32, d: 18, r: 4 }} z0={TOP} z1={TOP + 2} topFill="#E4E8EF" sideFill="#C3CAD6" shadow={false} />
      <Prism shape={{ kind: "rect", x: 366, y: 50, w: 8, d: 6, r: 2 }} z0={TOP + 2} z1={TOP + 14} topFill="#D7DCE5" sideFill="#B9C1CE" shadow={false} />

      {/* monitor: a Kimp-style design tool */}
      <g transform={wallFacingY(328, 50, TOP + 62)}>
        <rect width={84} height={50} rx={4} fill="#262B3A" />
        <rect x={3} y={3} width={78} height={42} rx={2} fill="#fff" />
        <rect x={3} y={3} width={9} height={42} fill="#F1F3F7" />
        <rect x={5.5} y={7} width={4} height={4} rx={1} fill={BRAND.orange} />
        <rect x={5.5} y={14} width={4} height={4} rx={1} fill="#CBD2DC" />
        <rect x={5.5} y={21} width={4} height={4} rx={1} fill="#CBD2DC" />
        <g>
          <rect x={17} y={8} width={46} height={32} rx={2} fill="#EEF1F5" stroke="#D5DBE4" strokeWidth={0.6} />
          <g data-mon-fill opacity={0}>
            <rect x={17} y={8} width={46} height={32} rx={2} fill="url(#wf-art-sky)" />
          </g>
          <circle data-mon-fill cx={53} cy={16} r={4.5} fill={BRAND.orange} opacity={0} />
          <path data-mon-fill d="M17 40 L17 31 Q 30 22 40 30 T 63 28 L63 40 Z" fill={BRAND.teal} opacity={0} />
          <rect data-mon-fill x={21} y={12} width={18} height={3} rx={1.5} fill="#fff" opacity={0} />
        </g>
        {[BRAND.orange, BRAND.teal, "#F6C344", "#1E1F2B"].map((c, i) => (
          <circle key={c} data-swatch cx={72} cy={11 + i * 7.5} r={2.6} fill={c} />
        ))}
      </g>

      {/* designer */}
      <g transform={`translate(${av.x} ${av.y - 22})`}>
        <Avatar tone="designer" />
        <g transform="translate(0 -30)"><g data-designer-status opacity={0}>
          <rect x={-38} y={-10} width={76} height={20} rx={10} fill="#fff" stroke="#E3E7EE" filter="url(#wf-ui-shadow)" />
          <circle cx={-27} cy={0} r={3} fill="#E8A317" />
          <text x={-20} y={3.6} fontSize={9.5} fontWeight={600} fill={BRAND.ink}>
            Designing…
          </text>
        </g></g>
      </g>
    </g>
  );
}
