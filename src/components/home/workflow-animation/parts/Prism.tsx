import { planeMatrix, sidePath, type Shape } from "../geometry";

type PrismProps = {
  shape: Shape;
  /** bottom height */
  z0: number;
  /** top height */
  z1: number;
  topFill?: string;
  sideFill?: string;
  /** contact + cast shadow on the surface below */
  shadow?: boolean;
  /** extra content drawn on the top face, in plane coordinates */
  top?: React.ReactNode;
};

function ShapeEl({ shape, ...rest }: { shape: Shape } & React.SVGProps<SVGRectElement & SVGCircleElement>) {
  if (shape.kind === "circle") return <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...rest} />;
  return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.d} rx={shape.r} {...rest} />;
}

/**
 * An extruded clay block lit from the top-left:
 * long soft cast shadow + tight contact shadow, shaded side walls with
 * ambient occlusion towards the base, and a bright bevel on the top edge.
 */
export function Prism({ shape, z0, z1, topFill = "url(#wf-clay-top)", sideFill, shadow = true, top }: PrismProps) {
  const h = z1 - z0;
  const side = sideFill ?? (shape.kind === "circle" ? "url(#wf-cyl-side)" : "url(#wf-clay-side)");
  const sideD = sidePath(shape, z0, z1);
  return (
    <g>
      {shadow && (
        <g transform={planeMatrix(z0)}>
          {/* cast shadow, falling away from the light (screen down-right) */}
          <g filter="url(#wf-cast-shadow)">
            <g transform={`translate(${8 + h * 0.9} ${2 + h * 0.2})`}>
              <ShapeEl shape={shape} fill="rgba(0,14,12,0.4)" />
            </g>
          </g>
          {/* contact shadow / ambient occlusion */}
          <g filter="url(#wf-contact-shadow)">
            <g transform="translate(2.5 2.5)">
              <ShapeEl shape={shape} fill="rgba(0,14,12,0.5)" />
            </g>
          </g>
        </g>
      )}
      <path d={sideD} fill={side} />
      <path d={sideD} fill="url(#wf-side-ao)" />
      <g transform={planeMatrix(z1)}>
        <ShapeEl shape={shape} fill={topFill} />
        <ShapeEl shape={shape} fill="url(#wf-top-sheen)" />
        <ShapeEl shape={shape} fill="none" stroke="#8FF0DC" strokeOpacity={0.35} strokeWidth={1.2} />
        {top}
      </g>
    </g>
  );
}

export { ShapeEl };
