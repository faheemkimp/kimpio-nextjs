import { BRAND, LAYOUT, PLATFORM_H } from "../config";
import { Prism } from "../parts/Prism";

const P = LAYOUT.review;
const TOP = PLATFORM_H;
export const REVIEW_DOCK = { x: LAYOUT.review.x + LAYOUT.review.w / 2, y: LAYOUT.review.y + LAYOUT.review.d / 2 };

const SHIELD = "M0 -14 L12 -9.2 L12 1 C 12 9.2 6.5 14.2 0 17 C -6.5 14.2 -12 9.2 -12 1 L -12 -9.2 Z";
const CHECK = "M-5.2 1.2 L-1.5 4.8 L5.6 -3";

export function ReviewStation() {
  return (
    <g data-station="review" data-rise="station">
      <Prism
        shape={P}
        z0={0}
        z1={TOP}
        top={
          <g>
            <circle cx={REVIEW_DOCK.x} cy={REVIEW_DOCK.y} r={30} fill="#073E36" stroke="#1C7A6A" strokeOpacity={0.6} strokeWidth={2} />
            <circle cx={REVIEW_DOCK.x} cy={REVIEW_DOCK.y} r={22} fill="none" stroke="#3FA592" strokeOpacity={0.5} strokeWidth={1.4} strokeDasharray="3 4" />
            {/* QA shield, printed flat on the platform like the hub logo */}
            <g transform={`translate(${REVIEW_DOCK.x} ${REVIEW_DOCK.y - 1})`}>
              <path d={SHIELD} fill="#fff" stroke="#D5DCE6" strokeWidth={1.4} strokeLinejoin="round" />
              <path data-shield-on d={SHIELD} fill={BRAND.teal} opacity={0} />
              <path d={CHECK} fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
              <path data-shield-check-off d={CHECK} fill="none" stroke="#B8C1CE" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle data-review-ring cx={REVIEW_DOCK.x} cy={REVIEW_DOCK.y} r={24} fill="none" stroke={BRAND.teal} strokeWidth={3} opacity={0} />
            <circle data-review-ring cx={REVIEW_DOCK.x} cy={REVIEW_DOCK.y} r={24} fill="none" stroke={BRAND.teal} strokeWidth={3} opacity={0} />
            <rect
              data-glow="review"
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
          </g>
        }
      />

    </g>
  );
}
