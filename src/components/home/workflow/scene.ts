import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Hero workflow scene: a soft, clay-like tile board with a grooved white track.
 * A brand-orange marble (the client's request) rolls through five stations,
 * one per Kimp360 stage. This module only builds and draws the world from a
 * plain `SceneState`; the GSAP timeline in hero-workflow.tsx owns all timing.
 */

export type SceneState = {
  /** marble position along the track, 0..1 by arc length */
  u: number;
  /** how much of the travelled track glows (multiplier on u) */
  trail: number;
  marble: number;
  /** 1 = marble still inside the chute, 0 = landed on the track */
  drop: number;
  /** 0..1 marble drops into the delivery cup */
  sink: number;
  // 1 · submit request
  card: number;
  send: number;
  doc: number;
  // 2 · received at Kimp
  arch: number;
  team: number;
  // 3 · processed in Kimp360
  pegs: number;
  sort: number;
  // 4 · design in progress
  shapes: number;
  rev: number;
  // 5 · delivered
  out: number;
  confetti: number;
  // camera + checkpoints
  zoom: number;
  /** 0 = whole map, 1 = close-up on the station at index `f` */
  cam: number;
  /** camera focus as a continuous station index (0..4) */
  f: number;
  lit0: number;
  lit1: number;
  lit2: number;
  lit3: number;
  lit4: number;
};

export const initialState = (): SceneState => ({
  u: 0,
  trail: 1,
  marble: 0,
  drop: 1,
  sink: 0,
  card: 0,
  send: 0,
  doc: 0,
  arch: 0,
  team: 0,
  pegs: 0,
  sort: 0,
  shapes: 0,
  rev: 0,
  out: 0,
  confetti: 0,
  zoom: 0.94,
  cam: 0,
  f: 0,
  lit0: 0,
  lit1: 0,
  lit2: 0,
  lit3: 0,
  lit4: 0,
});

export type Pads = { t: number; r: number; b: number; l: number };

export type WorkflowScene = {
  state: SceneState;
  /** where each station sits on the track (0..1) */
  stops: number[];
  /** world length of each leg between stations */
  legs: number[];
  resize(w: number, h: number, pads: Pads): void;
  setPointer(x: number, y: number): void;
  /** advance ambient motion by dt (0 when paused), draw, and return true while the camera is still easing */
  frame(dt: number): boolean;
  /** screen position (px) of each station's label anchor */
  project(out: { x: number; y: number }[]): void;
  dispose(): void;
};

// ------------------------------------------------------------------ palette
const C = {
  bg: "#eef1f6",
  tile: "#f6f7fa",
  ground: "#d9dfe9",
  white: "#ffffff",
  orange: "#f1731e",
  orangeHi: "#ff9a4d",
  blue: "#4767f0",
  blueDeep: "#2c46c2",
  yellow: "#ffbb4d",
  teal: "#13a58c",
  ink: "#1b1e23",
  mute: "#c9d0dc",
};

// --------------------------------------------------------------- layout
/** screen-aligned ground axes: A runs left→right on screen, B runs front→back */
const AX = new THREE.Vector3(1, 0, -1).normalize();
const BX = new THREE.Vector3(-1, 0, -1).normalize();
const at = (a: number, b: number, y = 0) => new THREE.Vector3().addScaledVector(AX, a).addScaledVector(BX, b).setY(y);
/** rotation that turns an object's +z face toward the camera */
const FACE = Math.PI / 4;
const ELEV = THREE.MathUtils.degToRad(52);

const PATH: [number, number][] = [
  [-5.0, 2.75],
  [-4.0, 3.0], // 1 · submit
  [-1.8, 3.45],
  [0.6, 3.3], // 2 · received
  [2.9, 2.85],
  [4.05, 1.45],
  [3.15, 0.0],
  [1.2, -0.45], // 3 · Kimp360
  [-2.6, -0.45], // 4 · design
  [-4.15, -1.05],
  [-4.45, -2.5],
  [-3.3, -3.75],
  [0.9, -4.1], // 5 · delivered
];
const STATION_AT = [1, 3, 7, 8, 12];
const PROP: [number, number][] = [
  [-2.75, 4.55], // brief card
  [0.6, 4.75], // team pedestal
  [1.0, 1.25], // Kimp360 pad
  [-2.6, 1.15], // design studio
  [1.45, -2.65], // delivered artwork
];

const TILE = 2;
const PITCH = 2.24;
const GRID = 5;
const MARBLE_R = 0.19;
const MARBLE_Y = 0.075 + MARBLE_R;
const SEGS = 520;

/** U-shaped channel cross-section (s across, h up) */
const PROFILE: [number, number][] = [
  [-0.44, -0.04], [-0.44, 0.12], [-0.425, 0.162], [-0.385, 0.18], [-0.325, 0.18], [-0.29, 0.162],
  [-0.272, 0.12], [-0.255, 0.088], [-0.21, 0.075], [0.21, 0.075], [0.255, 0.088], [0.272, 0.12],
  [0.29, 0.162], [0.325, 0.18], [0.385, 0.18], [0.425, 0.162], [0.44, 0.12], [0.44, -0.04],
];

// ----------------------------------------------------------------- utils
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = THREE.MathUtils.lerp;
const smooth = (t: number) => t * t * (3 - 2 * t);
const outBack = (t: number, k = 1.7) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 + (k + 1) * (t - 1) ** 3 + k * (t - 1) ** 2);
const outCubic = (t: number) => 1 - (1 - t) ** 3;
const stagger = (v: number, i: number, step: number, span: number) => clamp01((v - i * step) / span);

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ---------------------------------------------------------------- textures
function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, aniso: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = aniso;
  return tex;
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawBrief(ctx: CanvasRenderingContext2D, font: string) {
  const W = 520;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, W, 640);
  rr(ctx, 36, 36, 52, 52, 14, C.orange);
  ctx.fillStyle = "#fff";
  ctx.fillRect(59, 50, 6, 24);
  ctx.fillRect(50, 59, 24, 6);
  ctx.fillStyle = C.ink;
  ctx.font = `700 32px ${font}`;
  ctx.textBaseline = "middle";
  ctx.fillText("New request", 104, 63);
  rr(ctx, 36, 116, W - 72, 3, 2, "#edf0f4");

  const label = (t: string, y: number) => {
    ctx.fillStyle = "#8a94a6";
    ctx.font = `600 19px ${font}`;
    ctx.fillText(t.toUpperCase(), 36, y);
  };
  label("Project", 156);
  ctx.fillStyle = C.ink;
  ctx.font = `600 29px ${font}`;
  ctx.fillText("Spring launch campaign", 36, 194);

  label("Formats", 246);
  let x = 36;
  ctx.font = `600 21px ${font}`;
  for (const chip of ["Social posts", "Banner", "Video"]) {
    const w = ctx.measureText(chip).width + 32;
    rr(ctx, x, 266, w, 42, 21, "#fff1e7");
    ctx.fillStyle = C.orange;
    ctx.fillText(chip, x + 16, 288);
    x += w + 10;
  }

  label("Notes", 350);
  [0.9, 0.74, 0.52].forEach((f, i) => rr(ctx, 36, 372 + i * 30, (W - 72) * f, 14, 7, "#e9edf2"));

  rr(ctx, 36, 474, 214, 44, 12, "#f1f4f8");
  rr(ctx, 50, 486, 20, 20, 5, C.blue);
  ctx.fillStyle = "#4b5565";
  ctx.font = `600 20px ${font}`;
  ctx.fillText("brand-kit.zip", 82, 497);

  rr(ctx, 36, 548, W - 72, 62, 18, C.orange);
  ctx.fillStyle = "#fff";
  ctx.font = `700 26px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText("Submit request  →", W / 2, 580);
}

function drawPoster(ctx: CanvasRenderingContext2D, font: string) {
  const W = 600;
  const H = 440;
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#ffa65c");
  g.addColorStop(1, "#ef6a12");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.beginPath();
  ctx.arc(470, 150, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.translate(440, 300);
  ctx.rotate(-0.28);
  rr(ctx, -70, -70, 140, 140, 28, C.blue);
  ctx.restore();
  rr(ctx, 360, 60, 120, 34, 17, C.yellow);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 76px ${font}`;
  ctx.fillText("Spring", 40, 150);
  ctx.fillText("Launch", 40, 232);
  ctx.font = `600 24px ${font}`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("New collection · out now", 42, 278);
  rr(ctx, 40, 352, 196, 48, 24, "#fff");
  ctx.fillStyle = C.teal;
  ctx.beginPath();
  ctx.arc(66, 376, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = C.ink;
  ctx.font = `700 20px ${font}`;
  ctx.textBaseline = "middle";
  ctx.fillText("Final files", 88, 377);
}

function drawMarble(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = C.orange;
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 56, 256, 16);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillRect(0, 30, 256, 5);
  ctx.fillRect(0, 93, 256, 5);
}

// --------------------------------------------------------------- geometry
function sweep(curve: THREE.Curve<THREE.Vector3>, segs: number) {
  const M = PROFILE.length;
  const pos = new Float32Array((segs + 1) * M * 3);
  const p = new THREE.Vector3();
  const t = new THREE.Vector3();
  for (let k = 0; k <= segs; k++) {
    const u = k / segs;
    curve.getPointAt(u, p);
    curve.getTangentAt(u, t).setY(0).normalize();
    for (let m = 0; m < M; m++) {
      const [s, h] = PROFILE[m];
      const i = (k * M + m) * 3;
      pos[i] = p.x - t.z * s;
      pos[i + 1] = h;
      pos[i + 2] = p.z + t.x * s;
    }
  }
  const idx: number[] = [];
  for (let k = 0; k < segs; k++)
    for (let m = 0; m < M; m++) {
      const a = k * M + m;
      const b = k * M + ((m + 1) % M);
      const c = a + M;
      const d = b + M;
      idx.push(a, c, b, b, c, d);
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

function cap(curve: THREE.Curve<THREE.Vector3>, u: number) {
  const shape = new THREE.Shape(PROFILE.map(([s, h]) => new THREE.Vector2(s, h)));
  const geo = new THREE.ShapeGeometry(shape);
  const p = curve.getPointAt(u);
  const t = curve.getTangentAt(u).setY(0).normalize();
  const side = new THREE.Vector3(-t.z, 0, t.x);
  const m = new THREE.Matrix4().makeBasis(side, new THREE.Vector3(0, 1, 0), t).setPosition(p.x, 0, p.z);
  geo.applyMatrix4(m);
  return geo;
}

// ------------------------------------------------------------------- scene
export async function createWorkflowScene(canvas: HTMLCanvasElement, opts: { mobile: boolean }): Promise<WorkflowScene> {
  const font = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
  await Promise.all([document.fonts.load(`700 20px ${font}`), document.fonts.load(`600 20px ${font}`)]).catch(() => undefined);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.02;
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(C.bg);
  scene.fog = new THREE.Fog(C.bg, 36, 56);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.5;

  scene.add(new THREE.HemisphereLight("#ffffff", "#d5dceb", 0.9));
  const sun = new THREE.DirectionalLight("#fffaf2", 2.1);
  sun.position.set(-7, 13, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(opts.mobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 1, far: 40 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // materials
  const std = (color: string, roughness = 0.55, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, ...extra });
  const gloss = (color: string, roughness = 0.3) => new THREE.MeshPhysicalMaterial({ color, roughness, clearcoat: 0.7, clearcoatRoughness: 0.25 });
  const M = {
    tile: std(C.tile, 0.62),
    ground: std(C.ground, 0.9),
    rail: std(C.white, 0.42, { side: THREE.DoubleSide }),
    white: std(C.white, 0.45),
    whiteIn: std(C.white, 0.5, { side: THREE.DoubleSide }),
    soft: std("#eef1f6", 0.55),
    mute: std(C.mute, 0.6),
    orange: gloss(C.orange),
    blue: gloss(C.blue),
    blueDeep: std(C.blueDeep, 0.5),
    yellow: gloss(C.yellow),
    yellowIn: new THREE.MeshPhysicalMaterial({ color: C.yellow, roughness: 0.35, clearcoat: 0.5, side: THREE.DoubleSide }),
    teal: gloss(C.teal),
    glow: new THREE.MeshBasicMaterial({ color: "#ff8a3d", toneMapped: false }),
  };
  const shadowy = <T extends THREE.Object3D>(o: T, cast = true) => {
    o.traverse((c) => {
      if ((c as THREE.Mesh).isMesh) {
        c.castShadow = cast;
        c.receiveShadow = true;
      }
    });
    return o;
  };

  // ------------------------------------------------------------- board
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), M.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.34;
  ground.receiveShadow = true;
  scene.add(ground);

  const n = (GRID * 2 + 1) ** 2;
  const tiles = new THREE.InstancedMesh(new RoundedBoxGeometry(TILE, 0.7, TILE, 3, 0.2), M.tile, n);
  const dummy = new THREE.Object3D();
  const accent: Record<string, string> = { "4,-4": C.blue, "-5,2": C.yellow, "-1,5": "#dfe5f5" };
  let k = 0;
  for (let i = -GRID; i <= GRID; i++)
    for (let j = -GRID; j <= GRID; j++) {
      dummy.position.set(i * PITCH, -0.35, j * PITCH);
      dummy.updateMatrix();
      tiles.setMatrixAt(k, dummy.matrix);
      tiles.setColorAt(k, new THREE.Color(accent[`${i},${j}`] ?? C.tile));
      k++;
    }
  tiles.receiveShadow = true;
  tiles.castShadow = true;
  scene.add(tiles);

  // ------------------------------------------------------------- track
  const curve = new THREE.CatmullRomCurve3(PATH.map(([a, b]) => at(a, b)), false, "centripetal");
  const samples = curve.getSpacedPoints(2000);
  const stops = STATION_AT.map((pi) => {
    const target = at(...PATH[pi]);
    let best = 0;
    let bd = Infinity;
    samples.forEach((p, i) => {
      const d = p.distanceToSquared(target);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return best / 2000;
  });
  stops[stops.length - 1] = 1;
  const total = curve.getLength();
  const legs = stops.slice(1).map((s, i) => (s - stops[i]) * total);

  scene.add(shadowy(new THREE.Mesh(sweep(curve, SEGS), M.rail)));
  scene.add(shadowy(new THREE.Mesh(cap(curve, 0), M.rail)));
  scene.add(shadowy(new THREE.Mesh(cap(curve, 1), M.rail)));

  const trailGeo = new THREE.TubeGeometry(curve, SEGS, 0.038, 6, false);
  const trail = new THREE.Mesh(trailGeo, M.glow);
  trail.position.y = 0.09;
  scene.add(trail);
  const trailStride = 6 * 6;

  const stopPos = stops.map((u) => curve.getPointAt(u));
  const stopTan = stops.map((u) => curve.getTangentAt(u).setY(0).normalize());
  const Z = new THREE.Vector3(0, 0, 1);
  const propPos = PROP.map(([a, b]) => at(a, b));

  // checkpoint hoops (stations 1, 3, 4) light up as each stage completes
  const hoopGeo = new THREE.TorusGeometry(0.52, 0.045, 12, 48);
  const hoops: (THREE.MeshStandardMaterial | null)[] = [0, 1, 2, 3, 4].map((i) => {
    if (i === 1 || i === 4) return null;
    const mat = std(C.white, 0.4, { emissive: new THREE.Color(C.orange), emissiveIntensity: 0 });
    const hoop = new THREE.Mesh(hoopGeo, mat);
    hoop.position.copy(stopPos[i]).setY(0.12);
    hoop.quaternion.setFromUnitVectors(Z, stopTan[i]);
    scene.add(shadowy(hoop));
    return mat;
  });
  const white = new THREE.Color(C.white);
  const orange = new THREE.Color(C.orange);

  // ------------------------------------------------- 1 · submit request
  const chute = new THREE.Group();
  chute.position.copy(stopPos[0]);
  const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.95, 40, 1, true), M.yellowIn);
  tube.position.y = 1.6;
  const rimLo = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.06, 12, 40), M.white);
  rimLo.rotation.x = Math.PI / 2;
  rimLo.position.y = 1.13;
  const rimHi = rimLo.clone();
  rimHi.position.y = 2.07;
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.75, 16), M.white);
  const postOff = at(-0.62, 0.5);
  post.position.set(postOff.x, 0.875, postOff.z);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 12), M.white);
  arm.position.set(postOff.x * 0.55, 1.6, postOff.z * 0.55);
  arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), postOff.clone().normalize());
  chute.add(tube, rimLo, rimHi, post, arm);
  scene.add(shadowy(chute));

  const briefTex = canvasTexture(520, 640, (c) => drawBrief(c, font), aniso);
  const card = new THREE.Group();
  card.position.copy(propPos[0]);
  card.rotation.y = FACE;
  const cardTilt = new THREE.Group();
  const cardBody = new THREE.Mesh(new RoundedBoxGeometry(1.62, 1.98, 0.1, 3, 0.06), M.white);
  const cardFace = new THREE.Mesh(new THREE.PlaneGeometry(1.44, 1.77), std("#fff", 0.7, { map: briefTex }));
  cardFace.position.z = 0.051;
  cardTilt.add(cardBody, cardFace);
  cardTilt.position.y = 1.16;
  const cardBase = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.16, 0.42, 3, 0.07), M.soft);
  cardBase.position.y = 0.08;
  card.add(cardTilt, cardBase);
  scene.add(shadowy(card));

  const doc = new THREE.Group();
  const docBody = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.44, 0.05, 2, 0.02), M.white);
  const docBar = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.02), M.orange);
  docBar.position.set(0, 0.12, 0.03);
  doc.add(docBody, docBar);
  scene.add(shadowy(doc));
  const docFrom = propPos[0].clone().setY(1.3);
  const docTo = stopPos[0].clone().setY(2.3);
  const docMid = docFrom.clone().lerp(docTo, 0.5).setY(3.0);

  // ------------------------------------------------ 2 · received at Kimp
  const archMat = new THREE.MeshPhysicalMaterial({ color: C.blue, roughness: 0.3, clearcoat: 0.7, emissive: new THREE.Color(C.blue), emissiveIntensity: 0 });
  const arch = new THREE.Group();
  arch.position.copy(stopPos[1]);
  // the arch spans along the rail (a scanner gate), so the camera sees its full ∩ shape
  arch.quaternion.setFromUnitVectors(Z, new THREE.Vector3(-stopTan[1].z, 0, stopTan[1].x));
  arch.add(new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.13, 20, 56, Math.PI), archMat));
  for (const sx of [-0.78, 0.78]) {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.2, 24), M.white);
    foot.position.set(sx, 0.1, 0);
    arch.add(foot);
  }
  scene.add(shadowy(arch));

  const team = new THREE.Group();
  team.position.copy(propPos[1]);
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.0, 0.18, 48), M.white);
  plinth.position.y = 0.09;
  team.add(plinth);
  const pawnColors = [M.orange, M.teal, M.blue];
  const pawns = [-0.5, 0, 0.5].map((a, i) => {
    const g = new THREE.Group();
    const p = at(a, i === 1 ? 0.18 : -0.05);
    g.position.set(p.x, 0.18, p.z);
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.26, 8, 20), pawnColors[i]);
    body.position.y = 0.3;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 16), M.white);
    head.position.y = 0.75;
    g.add(body, head);
    team.add(g);
    return g;
  });
  scene.add(shadowy(team));

  // ----------------------------------------------- 3 · processed in Kimp360
  const pad = new THREE.Group();
  pad.position.copy(propPos[2]);
  pad.add(new THREE.Mesh(new RoundedBoxGeometry(1.95, 0.26, 1.95, 3, 0.1), M.blue).translateY(0.13));
  const holeGeo = new THREE.CylinderGeometry(0.105, 0.105, 0.02, 20);
  const pegGeo = new THREE.CapsuleGeometry(0.1, 0.12, 6, 16);
  const PEG_SORTED = [C.orange, C.yellow, C.white, C.teal];
  const rand = rng(7);
  const order = Array.from({ length: 16 }, (_, i) => i).sort(() => rand() - 0.5);
  const pegs = Array.from({ length: 16 }, (_, i) => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const x = -0.63 + col * 0.42;
    const z = -0.63 + row * 0.42;
    const hole = new THREE.Mesh(holeGeo, M.blueDeep);
    hole.position.set(x, 0.262, z);
    const mat = gloss(C.white, 0.35);
    const peg = new THREE.Mesh(pegGeo, mat);
    peg.position.set(x, 0, z);
    pad.add(hole, peg);
    return {
      peg,
      mat,
      row,
      col,
      delay: order[i] / 15,
      from: new THREE.Color(PEG_SORTED[Math.floor(rand() * 4)]),
      to: new THREE.Color(PEG_SORTED[row]),
    };
  });
  scene.add(shadowy(pad));

  // ------------------------------------------------ 4 · design in progress
  const studio = new THREE.Group();
  studio.position.copy(propPos[3]);
  const turntable = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.95, 0.22, 56), M.white);
  turntable.position.y = 0.11;
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.025, 8, 64), M.orange);
  stripe.rotation.x = Math.PI / 2;
  stripe.position.y = 0.2;
  studio.add(turntable, stripe);
  const cube = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.52, 0.52, 3, 0.08), M.blue);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.27, 32, 24), M.orange);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.52, 36), M.yellow);
  const shapes = [
    { mesh: cube, to: at(-0.3, 0.12, 0.48), from: at(-1.1, 0.4, 2.6), spin: 0.7 },
    { mesh: ball, to: at(0.32, 0.2, 0.49), from: at(1.2, 0.8, 2.9), spin: 0 },
    { mesh: cone, to: at(0.02, -0.38, 0.48), from: at(0.2, -1.2, 2.4), spin: 0 },
  ];
  shapes.forEach((s) => studio.add(s.mesh));
  const ring = new THREE.Group();
  ring.position.y = 0.62;
  const ringTilt = new THREE.Group();
  ringTilt.rotation.set(Math.PI / 2 - 0.28, 0, 0.18);
  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.028, 10, 80), M.teal);
  const cursor = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), M.glow);
  ringTilt.add(ringMesh, cursor);
  ring.add(ringTilt);
  studio.add(ring);
  scene.add(shadowy(studio));

  // --------------------------------------------------- 5 · delivered
  const cupPos = stopPos[4].clone().addScaledVector(stopTan[4], 0.5);
  const cup = new THREE.Group();
  cup.position.copy(cupPos);
  const cupWall = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.34, 0.36, 40, 1, true), M.whiteIn);
  cupWall.position.y = 0.18;
  const cupFloor = new THREE.Mesh(new THREE.CircleGeometry(0.34, 40), M.mute);
  cupFloor.rotation.x = -Math.PI / 2;
  cupFloor.position.y = 0.02;
  const cupRimMat = std(C.white, 0.4, { emissive: new THREE.Color(C.orange), emissiveIntensity: 0 });
  const cupRim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.05, 12, 40), cupRimMat);
  cupRim.rotation.x = Math.PI / 2;
  cupRim.position.y = 0.36;
  cup.add(cupWall, cupFloor, cupRim);
  scene.add(shadowy(cup));

  const posterTex = canvasTexture(600, 440, (c) => drawPoster(c, font), aniso);
  const art = new THREE.Group();
  art.position.copy(propPos[4]);
  art.rotation.y = FACE;
  const artLift = new THREE.Group();
  const artFrame = new THREE.Mesh(new RoundedBoxGeometry(2.0, 1.5, 0.1, 3, 0.06), M.white);
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.82, 1.33), std("#fff", 0.6, { map: posterTex }));
  poster.position.z = 0.051;
  artLift.add(artFrame, poster);
  const easel = new THREE.Mesh(new RoundedBoxGeometry(1.25, 0.16, 0.46, 3, 0.07), M.soft);
  easel.position.y = 0.08;
  art.add(artLift, easel);
  scene.add(shadowy(art));

  const CONFETTI = 34;
  const confetti = new THREE.InstancedMesh(new THREE.BoxGeometry(0.1, 0.15, 0.018), std("#fff", 0.5), CONFETTI);
  confetti.castShadow = true;
  const cRand = rng(42);
  const palette = [C.orange, C.yellow, C.blue, C.teal, "#ffffff", C.orangeHi];
  const bits = Array.from({ length: CONFETTI }, (_, i) => {
    confetti.setColorAt(i, new THREE.Color(palette[i % palette.length]));
    const ang = cRand() * Math.PI * 2;
    const sp = 0.8 + cRand() * 1.6;
    return {
      v: new THREE.Vector3(Math.cos(ang) * sp, 3.4 + cRand() * 2.2, Math.sin(ang) * sp),
      r: new THREE.Vector3(cRand() * 12, cRand() * 12, cRand() * 12),
      floor: 0.02 + cRand() * 0.02,
    };
  });
  const confettiFrom = propPos[4].clone().setY(1.8);
  scene.add(confetti);

  // --------------------------------------------------------- marble
  const marbleTex = canvasTexture(256, 128, drawMarble, aniso);
  const marble = new THREE.Mesh(
    new THREE.SphereGeometry(MARBLE_R, 40, 28),
    new THREE.MeshPhysicalMaterial({ map: marbleTex, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 }),
  );
  marble.castShadow = true;
  scene.add(marble);
  const marbleGlow = new THREE.PointLight(C.orangeHi, 0, 1.5, 2);
  scene.add(marbleGlow);

  // --------------------------------------------------------- camera
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 120);
  const target = new THREE.Vector3(0, 0, 0);
  const DIST = 40;
  const placeCamera = (yaw: number, pitch: number) => {
    const e = ELEV + pitch;
    const front = new THREE.Vector3(1, 0, 1).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    camera.position.copy(target).addScaledVector(front, Math.cos(e) * DIST).setY(Math.sin(e) * DIST);
    camera.lookAt(target);
    camera.updateMatrixWorld();
  };
  placeCamera(0, 0);

  const bounds: THREE.Vector3[] = [];
  samples.forEach((p, i) => {
    if (i % 40) return;
    bounds.push(p.clone().addScaledVector(AX, 0.5), p.clone().addScaledVector(AX, -0.5), p.clone().addScaledVector(BX, -0.5));
  });
  bounds.push(stopPos[0].clone().setY(2.15), propPos[0].clone().setY(2.3), propPos[1].clone().setY(1.0), propPos[3].clone().setY(1.2));
  bounds.push(propPos[4].clone().setY(1.95), cupPos.clone().addScaledVector(BX, -0.5));

  const pinAnchors = [
    propPos[0].clone().setY(2.45),
    propPos[1].clone().setY(1.35),
    propPos[2].clone().addScaledVector(BX, 0.95).setY(0.8),
    propPos[3].clone().setY(1.95),
    propPos[4].clone().setY(2.1),
  ];

  /** close-up framing per station: between the track stop and its prop */
  const focusPts = [
    stopPos[0].clone().lerp(propPos[0], 0.5).setY(0.9),
    stopPos[1].clone().lerp(propPos[1], 0.62).setY(0.75),
    stopPos[2].clone().lerp(propPos[2], 0.5).setY(0.3),
    stopPos[3].clone().lerp(propPos[3], 0.5).setY(1.0),
    cupPos.clone().lerp(propPos[4], 0.55).setY(0.95),
  ];
  const FOCUS_Z = opts.mobile ? 2.0 : 2.15;

  /** scale = px per world unit at the overview; dx/dy = px offset of the padded area's centre */
  const view = { w: 1, h: 1, scale: 1, dx: 0, dy: 0 };
  const content = { cx: 0, cy: 0 };
  const look = { yaw: 0, pitch: 0, ty: 0, tp: 0, fx: 0, fy: 0 };

  const resize = (w: number, h: number, pads: Pads) => {
    view.w = Math.max(1, w);
    view.h = Math.max(1, h);
    renderer.setSize(view.w, view.h, false);
    placeCamera(0, 0);
    const inv = camera.matrixWorldInverse;
    const v = new THREE.Vector3();
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (const p of bounds) {
      v.copy(p).applyMatrix4(inv);
      x0 = Math.min(x0, v.x);
      x1 = Math.max(x1, v.x);
      y0 = Math.min(y0, v.y);
      y1 = Math.max(y1, v.y);
    }
    const aw = Math.max(40, view.w - pads.l - pads.r);
    const ah = Math.max(40, view.h - pads.t - pads.b);
    view.scale = Math.min(aw / (x1 - x0), ah / (y1 - y0));
    content.cx = (x0 + x1) / 2;
    content.cy = (y0 + y1) / 2;
    view.dx = (pads.l - pads.r) / 2;
    view.dy = (pads.t - pads.b) / 2;
  };

  /** frame the view so `aim` (view-space) lands in the centre of the padded area */
  const applyFrustum = (aimX: number, aimY: number, scale: number) => {
    const hw = view.w / 2 / scale;
    const hh = view.h / 2 / scale;
    const cx = aimX - view.dx / scale;
    const cy = aimY + view.dy / scale;
    camera.left = cx - hw;
    camera.right = cx + hw;
    camera.top = cy + hh;
    camera.bottom = cy - hh;
    camera.updateProjectionMatrix();
  };

  // ---------------------------------------------------------- update
  const state = initialState();
  let clock = 0;
  const prev = new THREE.Vector3();
  let hasPrev = false;
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const col = new THREE.Color();

  const update = () => {
    const s = state;
    const lit = [s.lit0, s.lit1, s.lit2, s.lit3, s.lit4];

    // track glow
    trailGeo.setDrawRange(0, Math.floor(clamp01(s.u * s.trail) * SEGS) * trailStride);

    // marble
    curve.getPointAt(clamp01(s.u), tmp);
    tmp.y = MARBLE_Y + s.drop * 1.85;
    if (s.sink > 0) {
      tmp.x = lerp(tmp.x, cupPos.x, s.sink);
      tmp.z = lerp(tmp.z, cupPos.z, s.sink);
      tmp.y = lerp(MARBLE_Y, 0.03 + MARBLE_R, s.sink) + Math.sin(Math.PI * s.sink) * 0.28;
    }
    if (hasPrev) {
      tmp2.subVectors(tmp, prev).setY(0);
      const d = tmp2.length();
      if (d > 1e-5 && d < 1.5) {
        q.setFromAxisAngle(tmp2.set(tmp2.z, 0, -tmp2.x).divideScalar(d), d / MARBLE_R);
        marble.quaternion.premultiply(q);
      }
    }
    prev.copy(tmp);
    hasPrev = true;
    marble.position.copy(tmp);
    marble.scale.setScalar(Math.max(0.0001, s.marble));
    marble.visible = s.marble > 0.001;
    marbleGlow.position.copy(tmp).setY(tmp.y + 0.25);
    marbleGlow.intensity = s.marble * (1 - s.drop) * 0.45;

    hoops.forEach((mat, i) => {
      if (!mat) return;
      mat.color.copy(white).lerp(orange, lit[i]);
      mat.emissiveIntensity = lit[i] * 0.45;
    });

    // 1 · brief card rises, nods "send", a doc flies into the chute
    card.position.y = lerp(-2.0, 0, s.card);
    card.visible = s.card > 0.001;
    cardTilt.rotation.x = -0.22 * s.send;
    cardTilt.position.y = 1.16 + (s.card >= 1 ? Math.sin(clock * 1.7) * 0.025 : 0);
    doc.visible = s.doc > 0.001 && s.doc < 0.999;
    if (doc.visible) {
      const t = s.doc;
      doc.position
        .copy(docFrom)
        .multiplyScalar((1 - t) ** 2)
        .addScaledVector(docMid, 2 * (1 - t) * t)
        .addScaledVector(docTo, t * t);
      doc.rotation.set(t * 2.4, FACE + t * 3.2, t * 1.2);
      doc.scale.setScalar(t > 0.82 ? (1 - t) / 0.18 : Math.min(1, t * 6));
    }

    // 2 · arch lights, team pops up
    archMat.emissiveIntensity = s.arch * 0.38;
    pawns.forEach((p, i) => {
      const e = stagger(s.team, i, 0.22, 0.5);
      p.scale.setScalar(Math.max(0.0001, outBack(e, 2.2)));
      p.position.y = 0.18 + Math.sin(Math.PI * e) * 0.35;
      p.visible = e > 0;
    });

    // 3 · pegs rise in a scatter, then sort into ordered rows
    pegs.forEach((p) => {
      const e = clamp01((s.pegs - p.delay * 0.62) / 0.38);
      const so = smooth(clamp01((s.sort - p.col * 0.12) / 0.64));
      p.peg.position.y = lerp(0.0, 0.43, outBack(e, 2)) + Math.sin(Math.PI * so) * 0.22;
      p.peg.visible = e > 0;
      p.mat.color.copy(col.copy(p.from).lerp(p.to, so));
      p.mat.emissive.copy(p.mat.color);
      p.mat.emissiveIntensity = so * 0.12;
    });

    // 4 · shapes assemble on the turntable, the revision ring sweeps around them
    shapes.forEach((sh, i) => {
      const e = stagger(s.shapes, i, 0.18, 0.62);
      const pe = outCubic(e);
      sh.mesh.position.lerpVectors(sh.from, sh.to, pe);
      sh.mesh.position.y = lerp(sh.from.y, sh.to.y, outBack(e, 1.4));
      sh.mesh.scale.setScalar(Math.max(0.0001, Math.min(1, e * 3)));
      sh.mesh.visible = e > 0;
    });
    const revFrac = s.rev % 1;
    const hop = s.rev > 0 && s.rev < 2 ? Math.sin(Math.PI * revFrac) : 0;
    cube.rotation.set(0, FACE + 0.35 + (Math.PI / 2) * smooth(clamp01(s.rev / 2)) * 2, 0);
    cube.position.y += hop * 0.18;
    ball.position.y += hop * 0.42;
    cone.rotation.y = s.rev * Math.PI;
    ring.scale.setScalar(Math.max(0.0001, outBack(clamp01(s.shapes * 1.4), 1.6)));
    ring.visible = s.shapes > 0.001;
    ringTilt.rotation.z = 0.18 + s.rev * Math.PI * 2 + clock * 0.35;
    const ca = -Math.PI / 2;
    cursor.position.set(Math.cos(ca) * 1.08, Math.sin(ca) * 1.08, 0);

    // 5 · marble drops into the cup, the finished artwork pops up, confetti
    cupRimMat.emissiveIntensity = s.lit4 * 0.5;
    cupRimMat.color.copy(white).lerp(orange, s.lit4);
    art.position.y = lerp(-1.6, 0, s.out);
    art.visible = s.out > 0.001;
    artLift.position.y = 1.02 + (s.out >= 1 ? Math.sin(clock * 1.5 + 1) * 0.03 : 0);
    artLift.rotation.z = (1 - Math.min(1, s.out)) * 0.25;
    confetti.visible = s.confetti > 0.001 && s.out > 0.01;
    if (confetti.visible) {
      const t = s.confetti * 1.7;
      const fade = Math.min(1, s.out);
      bits.forEach((b, i) => {
        dummy.position.copy(confettiFrom).addScaledVector(b.v, t);
        dummy.position.y = Math.max(b.floor, confettiFrom.y + b.v.y * t - 4.9 * t * t);
        const landed = dummy.position.y <= b.floor + 0.001;
        dummy.rotation.set(landed ? Math.PI / 2 : b.r.x * t, b.r.y * t, landed ? 0 : b.r.z * t);
        dummy.scale.setScalar(fade);
        dummy.updateMatrix();
        confetti.setMatrixAt(i, dummy.matrix);
      });
      confetti.instanceMatrix.needsUpdate = true;
    }
  };

  // ------------------------------------------------------------ frame
  const frame = (dt: number) => {
    clock += dt;
    update();

    const k = 1 - Math.exp(-Math.max(dt, 1 / 60) * 4);
    look.yaw += (look.ty - look.yaw) * k;
    look.pitch += (look.tp - look.pitch) * k;
    placeCamera(look.yaw, look.pitch);

    // aim: whole map (cam 0) ↔ the focused station (cam 1); f blends between stations
    const f = THREE.MathUtils.clamp(state.f, 0, focusPts.length - 1);
    const i0 = Math.floor(f);
    const i1 = Math.min(focusPts.length - 1, i0 + 1);
    tmp.lerpVectors(focusPts[i0], focusPts[i1], f - i0).applyMatrix4(camera.matrixWorldInverse);
    const aimX = lerp(content.cx, tmp.x, state.cam);
    const aimY = lerp(content.cy, tmp.y, state.cam);

    // gentle follow: lean the frame a touch toward the marble
    tmp.copy(marble.position).applyMatrix4(camera.matrixWorldInverse);
    const w = state.marble * state.cam * 0.12;
    const fx = (tmp.x - aimX) * w;
    const fy = (tmp.y - aimY) * w;
    look.fx += (fx - look.fx) * k;
    look.fy += (fy - look.fy) * k;
    applyFrustum(aimX + look.fx, aimY + look.fy, view.scale * state.zoom * lerp(1, FOCUS_Z, state.cam));

    renderer.render(scene, camera);
    return Math.abs(look.ty - look.yaw) + Math.abs(look.tp - look.pitch) + Math.abs(fx - look.fx) + Math.abs(fy - look.fy) > 1e-4;
  };

  return {
    state,
    stops,
    legs,
    resize,
    setPointer(x, y) {
      look.ty = x * 0.07;
      look.tp = y * 0.04;
    },
    frame,
    project(out) {
      pinAnchors.forEach((p, i) => {
        tmp.copy(p).project(camera);
        out[i].x = ((tmp.x + 1) / 2) * view.w;
        out[i].y = ((1 - tmp.y) / 2) * view.h;
      });
    },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      Object.values(M).forEach((m) => m.dispose());
      [archMat, cupRimMat, ...hoops, ...pegs.map((p) => p.mat), marble.material as THREE.Material].forEach((m) => m?.dispose());
      [briefTex, posterTex, marbleTex].forEach((t) => t.dispose());
      (confetti.material as THREE.Material).dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
