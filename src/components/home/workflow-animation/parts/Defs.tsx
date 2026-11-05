import { BRAND } from "../config";

export function Defs() {
  return (
    <defs>
      <linearGradient id="wf-clay-top" x1="0" y1="0" x2="1" y2="1">
        {/* dark teal clay, matched to the hero background */}
        <stop offset="0" stopColor="#11675A" />
        <stop offset="1" stopColor="#0A4A40" />
      </linearGradient>
      <linearGradient id="wf-clay-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0B4D43" />
        <stop offset="0.48" stopColor="#083F37" />
        <stop offset="0.52" stopColor="#063630" />
        <stop offset="1" stopColor="#042A25" />
      </linearGradient>
      {/* round shading for cylinders (hub, pads) */}
      <linearGradient id="wf-cyl-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#073A33" />
        <stop offset="0.28" stopColor="#0E5C50" />
        <stop offset="0.62" stopColor="#08433A" />
        <stop offset="1" stopColor="#042A25" />
      </linearGradient>
      {/* ambient occlusion towards the base of every side wall */}
      <linearGradient id="wf-side-ao" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.55" stopColor="#00110E" stopOpacity="0" />
        <stop offset="1" stopColor="#00110E" stopOpacity="0.35" />
      </linearGradient>
      {/* soft key light across top faces */}
      <linearGradient id="wf-top-sheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7FE6D1" stopOpacity="0.22" />
        <stop offset="0.45" stopColor="#7FE6D1" stopOpacity="0" />
        <stop offset="1" stopColor="#00110E" stopOpacity="0.18" />
      </linearGradient>
      <radialGradient id="wf-ground" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#00110E" stopOpacity="0.25" />
        <stop offset="0.7" stopColor="#00110E" stopOpacity="0.08" />
        <stop offset="1" stopColor="#00110E" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="wf-tile-gloss" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.35" />
        <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.05" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="wf-orange" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRAND.orangeLight} />
        <stop offset="1" stopColor={BRAND.orange} />
      </linearGradient>
      <linearGradient id="wf-teal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0B9C84" />
        <stop offset="1" stopColor={BRAND.tealBoard} />
      </linearGradient>
      <linearGradient id="wf-ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#FEC564" />
        <stop offset="0.35" stopColor="#F5543C" />
        <stop offset="0.7" stopColor="#D6249F" />
        <stop offset="1" stopColor="#6A3FD0" />
      </linearGradient>
      <linearGradient id="wf-art-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE3C7" />
        <stop offset="1" stopColor="#FFD0A3" />
      </linearGradient>
      <radialGradient id="wf-glow-orange">
        <stop offset="0" stopColor={BRAND.orange} stopOpacity="0.45" />
        <stop offset="1" stopColor={BRAND.orange} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="wf-glow-teal">
        <stop offset="0" stopColor={BRAND.teal} stopOpacity="0.4" />
        <stop offset="1" stopColor={BRAND.teal} stopOpacity="0" />
      </radialGradient>
      <filter id="wf-cast-shadow" x="-40%" y="-40%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter id="wf-contact-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
      <filter id="wf-groove-soft" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="0.9" />
      </filter>
      <filter id="wf-holo-bloom" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.6" />
      </filter>
      <filter id="wf-object-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <filter id="wf-ui-shadow" x="-60%" y="-120%" width="220%" height="340%">
        <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#00110E" floodOpacity="0.35" />
      </filter>
    </defs>
  );
}
