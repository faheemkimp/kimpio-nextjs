/**
 * Isometric helpers.
 *
 * The scene is modelled on a flat "plane" (x, y) with height z, then
 * projected to SVG screen space with a 30° isometric projection.
 *   plane +x → screen down-right
 *   plane +y → screen down-left
 *   +z      → screen up
 * Because the projection is affine, any plane shape can be drawn exactly
 * by wrapping it in `planeMatrix(z)`, and any plane path maps cleanly to a
 * screen path by projecting its points (used for motion paths).
 */

export const C30 = Math.cos(Math.PI / 6);
export const S30 = 0.5;
export const ORIGIN = { x: 400, y: 130 };

export type Pt = { x: number; y: number };

const r2 = (n: number) => Math.round(n * 100) / 100;

export function iso(x: number, y: number, z = 0): Pt {
  return {
    x: r2(ORIGIN.x + (x - y) * C30),
    y: r2(ORIGIN.y + (x + y) * S30 - z),
  };
}

/** Draw plane-space content lying flat at height z. */
export function planeMatrix(z = 0) {
  return `matrix(${C30} ${S30} ${-C30} ${S30} ${ORIGIN.x} ${r2(ORIGIN.y - z)})`;
}

/**
 * Vertical wall in the x–z plane, facing +y (screen lower-left).
 * Local u runs along +x, local v runs downward from zTop.
 */
export function wallFacingY(x: number, y: number, zTop: number) {
  const p = iso(x, y, zTop);
  return `matrix(${C30} ${S30} 0 1 ${p.x} ${p.y})`;
}

/**
 * Vertical wall in the y–z plane, facing +x (screen lower-right).
 * Local u runs along -y, local v runs downward from zTop.
 */
export function wallFacingX(x: number, y: number, zTop: number) {
  const p = iso(x, y, zTop);
  return `matrix(${C30} ${-S30} 0 1 ${p.x} ${p.y})`;
}

/* ------------------------------------------------------------------ */
/* Shapes + extrusion (side faces via convex hull of top/bottom rims)  */
/* ------------------------------------------------------------------ */

export type RectShape = { kind: "rect"; x: number; y: number; w: number; d: number; r: number };
export type CircleShape = { kind: "circle"; cx: number; cy: number; r: number };
export type Shape = RectShape | CircleShape;

function outline(shape: Shape): Pt[] {
  const pts: Pt[] = [];
  if (shape.kind === "circle") {
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      pts.push({ x: shape.cx + Math.cos(a) * shape.r, y: shape.cy + Math.sin(a) * shape.r });
    }
    return pts;
  }
  const { x, y, w, d } = shape;
  const r = Math.min(shape.r, w / 2, d / 2);
  const corners = [
    { cx: x + w - r, cy: y + r, a0: -Math.PI / 2 },
    { cx: x + w - r, cy: y + d - r, a0: 0 },
    { cx: x + r, cy: y + d - r, a0: Math.PI / 2 },
    { cx: x + r, cy: y + r, a0: Math.PI },
  ];
  for (const c of corners) {
    for (let i = 0; i <= 8; i++) {
      const a = c.a0 + (i / 8) * (Math.PI / 2);
      pts.push({ x: c.cx + Math.cos(a) * r, y: c.cy + Math.sin(a) * r });
    }
  }
  return pts;
}

function hull(points: Pt[]): Pt[] {
  const p = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: Pt, a: Pt, b: Pt) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower: Pt[] = [];
  for (const pt of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0) lower.pop();
    lower.push(pt);
  }
  const upper: Pt[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const pt = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0) upper.pop();
    upper.push(pt);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/** Screen-space path for the visible side walls of an extruded shape. */
export function sidePath(shape: Shape, z0: number, z1: number) {
  const rim = outline(shape);
  const pts = [...rim.map((p) => iso(p.x, p.y, z0)), ...rim.map((p) => iso(p.x, p.y, z1))];
  const h = hull(pts);
  return "M" + h.map((p) => `${p.x} ${p.y}`).join("L") + "Z";
}

/* ------------------------------------------------------------------ */
/* Paths                                                               */
/* ------------------------------------------------------------------ */

export type Seg = ["M", number, number] | ["L", number, number] | ["Q", number, number, number, number];

/** Path in plane coordinates (draw inside planeMatrix). */
export function planePath(segs: Seg[]) {
  return segs.map((s) => s.join(" ")).join(" ");
}

/** Same path projected to screen space at height z (for motion paths). */
export function screenPath(segs: Seg[], z = 0) {
  return segs
    .map((s) => {
      if (s[0] === "Q") {
        const c = iso(s[1], s[2], z);
        const e = iso(s[3], s[4], z);
        return `Q ${c.x} ${c.y} ${e.x} ${e.y}`;
      }
      const p = iso(s[1], s[2], z);
      return `${s[0]} ${p.x} ${p.y}`;
    })
    .join(" ");
}

/** Curved arc in screen space between two screen points (social copies). */
export function arcPath(a: Pt, b: Pt, lift = 60) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - lift;
  return `M ${a.x} ${a.y} Q ${r2(mx)} ${r2(my)} ${b.x} ${b.y}`;
}
