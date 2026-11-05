import type { RectShape, CircleShape, Seg } from "./geometry";

/* ------------------------------------------------------------------ */
/* Brand tokens (sampled from the Kimp 360 dashboard)                  */
/* ------------------------------------------------------------------ */
export const BRAND = {
  teal: "#03816D",
  tealBoard: "#057160",
  orange: "#F07422",
  orangeLight: "#F6A55E",
  ink: "#1E1F2B",
  muted: "#6B7489",
};

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */
export type StepId = "customer" | "kimp360" | "designer" | "review" | "delivered" | "social";

export type Step = { id: StepId; title: string; caption: string };

export const DEFAULT_STEPS: Step[] = [
  { id: "customer", title: "Customer", caption: "You place a design request in minutes" },
  { id: "kimp360", title: "Kimp 360", caption: "Kimp 360 organizes it and assigns your designer" },
  { id: "designer", title: "Designer", caption: "Your dedicated designer gets to work" },
  { id: "review", title: "Review", caption: "Completed work is quality-checked" },
  { id: "delivered", title: "Delivered", caption: "Delivered to you, with unlimited revisions" },
  { id: "social", title: "Social", caption: "Approved designs go straight to your socials" },
];

/* ------------------------------------------------------------------ */
/* Social platforms                                                    */
/* ------------------------------------------------------------------ */
export type Platform = "instagram" | "linkedin" | "facebook" | "tiktok";
export const DEFAULT_PLATFORMS: Platform[] = ["instagram", "linkedin", "facebook", "tiktok"];

/* ------------------------------------------------------------------ */
/* Scene layout (plane units). See docs/01-visual-concept.md           */
/* ------------------------------------------------------------------ */
export const VIEWBOX = { x: 50, y: 100, w: 740, h: 505 };

export const PLATFORM_H = 14;
export const CARD_Z = 36;

export const LAYOUT = {
  customer: { kind: "rect", x: 40, y: 290, w: 120, d: 120, r: 18 } as RectShape,
  designer: { kind: "rect", x: 300, y: 40, w: 120, d: 110, r: 18 } as RectShape,
  review: { kind: "rect", x: 310, y: 300, w: 100, d: 100, r: 18 } as RectShape,
  hub: { kind: "circle", cx: 230, cy: 230, r: 60 } as CircleShape,
  hubH: 24,
  junction: { x: 115, y: 200 },
  socialTiles: [
    { x: 39, y: 171 },
    { x: 41, y: 99 },
    { x: 79, y: 51 },
    { x: 153, y: 43 },
  ],
};

/** Recessed grooves drawn on the board. */
export const GROOVES: Record<string, Seg[]> = {
  outCH: [["M", 150, 330], ["L", 200, 330], ["Q", 215, 330, 215, 315], ["L", 215, 255]],
  outHD: [["M", 250, 205], ["L", 250, 110], ["Q", 250, 95, 265, 95], ["L", 330, 95]],
  DR: [["M", 360, 110], ["L", 360, 350]],
  RH: [["M", 340, 350], ["L", 290, 350], ["Q", 275, 350, 275, 335], ["L", 275, 255]],
  HC: [["M", 245, 262], ["L", 245, 345], ["Q", 245, 360, 230, 360], ["L", 150, 360]],
  CS: [["M", 100, 300], ["L", 100, 215], ["Q", 100, 200, 115, 200]],
};

/**
 * Decorative grooves that run off the edge of the scene and fade out.
 * Purely visual; nothing travels on them.
 */
export const DECOR_GROOVES: Seg[][] = [
  [["M", 95, 410], ["L", 95, 660]],
  [["M", 420, 120], ["L", 680, 120]],
  [["M", 385, 40], ["L", 385, -230]],
  [["M", 360, 400], ["L", 360, 452], ["Q", 360, 467, 375, 467], ["L", 650, 467]],
  // extra decorative lines running off every side of the board
  [["M", 40, 385], ["L", -60, 385], ["Q", -75, 385, -75, 400], ["L", -75, 620]],
  [["M", 135, 410], ["L", 135, 470], ["Q", 135, 485, 120, 485], ["L", -200, 485]],
  [["M", 410, 335], ["L", 640, 335]],
  [["M", 330, 400], ["L", 330, 640]],
  [["M", 420, 70], ["L", 500, 70], ["Q", 515, 70, 515, 55], ["L", 515, -200]],
  [["M", 330, 40], ["L", 330, -60], ["Q", 330, -75, 315, -75], ["L", 60, -75]],
];

/** Paths the task card actually follows (plane units, projected at CARD_Z). */
export const CARD_PATHS: Record<string, Seg[]> = {
  CH: [["M", 125, 330], ["L", 200, 330], ["Q", 215, 330, 215, 315], ["L", 215, 255], ["Q", 215, 230, 230, 230]],
  HD: [["M", 230, 230], ["Q", 250, 230, 250, 210], ["L", 250, 110], ["Q", 250, 95, 265, 95], ["L", 330, 95]],
  DR: [["M", 330, 95], ["L", 345, 95], ["Q", 360, 95, 360, 110], ["L", 360, 350]],
  RH: [["M", 360, 350], ["L", 290, 350], ["Q", 275, 350, 275, 335], ["L", 275, 255], ["Q", 275, 230, 250, 230], ["L", 230, 230]],
  HC: [["M", 230, 230], ["Q", 245, 230, 245, 245], ["L", 245, 345], ["Q", 245, 360, 230, 360], ["L", 125, 360]],
  CS: [["M", 125, 360], ["Q", 100, 360, 100, 335], ["L", 100, 215], ["Q", 100, 200, 115, 200]],
};

export const CARD_START = { x: 125, y: 330 };
