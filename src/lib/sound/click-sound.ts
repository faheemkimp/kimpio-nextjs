/**
 * Game-style UI "blip" synthesised with the Web Audio API: no audio file to
 * download, ~120ms long, played only in response to a user press (so browser
 * autoplay rules are satisfied).
 */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/**
 * Browsers keep audio locked until the visitor clicks, taps or presses a key.
 * Call this from such a gesture so later hover sounds can play.
 */
export function unlockAudio(): void {
  audio();
}

/** True once audio is allowed (after the visitor's first click/tap/key press). */
function ready(): AudioContext | null {
  return ctx && ctx.state === "running" ? ctx : null;
}

/** One short tone with a fast attack and exponential decay. */
function tone(
  ac: AudioContext,
  start: number,
  from: number,
  to: number,
  length: number,
  volume: number,
  type: OscillatorType = "square",
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + length);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + length + 0.02);
}

/** Two rising notes, like a coin/confirm sound in a retro game. */
export function playClickSound(): void {
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, t, 660, 990, 0.06, 0.06);
  tone(ac, t + 0.055, 990, 1480, 0.08, 0.05);
}

/** Soft, very short "tick" for hovering a button (menu-select sound in games). */
export function playHoverSound(): void {
  const ac = ready();
  if (!ac) return; // still locked: the visitor hasn't clicked/tapped yet
  tone(ac, ac.currentTime, 1100, 1500, 0.045, 0.03, "triangle");
}
