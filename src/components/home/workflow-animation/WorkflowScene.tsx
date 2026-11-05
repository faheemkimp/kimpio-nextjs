import { CARD_PATHS, CARD_Z, LAYOUT, PLATFORM_H, VIEWBOX, type Platform } from "./config";
import { arcPath, iso, screenPath } from "./geometry";
import { Defs } from "./parts/Defs";
import { Grooves } from "./parts/Board";
import { SocialCopy, TaskCard } from "./parts/TaskCard";
import { CustomerStation } from "./stations/CustomerStation";
import { DesignerStation } from "./stations/DesignerStation";
import { HubPopup, Kimp360Hub } from "./stations/Kimp360Hub";
import { ReviewStation } from "./stations/ReviewStation";
import { SOCIAL_ICON_Z, SocialCluster } from "./stations/SocialCluster";

type SceneProps = { platforms: Platform[]; showSocial: boolean };

/** Static SVG markup for the board. All motion lives in timeline/. */
export function WorkflowScene({ platforms, showSocial }: SceneProps) {
  const hubTop = iso(LAYOUT.hub.cx, LAYOUT.hub.cy, LAYOUT.hubH);
  const designerAv = iso(415, 140, PLATFORM_H);
  const junction = iso(LAYOUT.junction.x, LAYOUT.junction.y, 22);

  return (
    <svg
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      className="wf-svg block h-auto w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <Defs />
      <ellipse cx={420} cy={400} rx={400} ry={200} fill="url(#wf-ground)" />
      <Grooves />
      {showSocial && <SocialCluster platforms={platforms} />}
      <DesignerStation />
      <Kimp360Hub />

      {/* assignment beam: hub → designer */}
      <path
        data-beam
        d={`M ${hubTop.x} ${hubTop.y} Q ${(hubTop.x + designerAv.x) / 2 + 10} ${Math.min(hubTop.y, designerAv.y) - 90} ${designerAv.x} ${designerAv.y - 40}`}
        fill="none"
        stroke="#13A386"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0}
      />

      <CustomerStation />
      <ReviewStation />


      {/* invisible motion paths (screen space) */}
      <g fill="none" stroke="none">
        {Object.entries(CARD_PATHS).map(([id, segs]) => (
          <path key={id} data-path={id} d={screenPath(segs, CARD_Z)} />
        ))}
        {showSocial &&
          platforms.map((p, i) => {
            const t = LAYOUT.socialTiles[i];
            if (!t) return null;
            return <path key={p} data-copy-path={i} d={arcPath(junction, iso(t.x, t.y, SOCIAL_ICON_Z), 50)} />;
          })}
      </g>

      <TaskCard />
      {showSocial && platforms.map((p, i) => <SocialCopy key={p} i={i} />)}
      <HubPopup />
    </svg>
  );
}
