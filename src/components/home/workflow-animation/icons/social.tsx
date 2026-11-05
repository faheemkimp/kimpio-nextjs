import type { Platform } from "../config";

/** Simplified platform marks drawn on a 30×30 rounded tile (origin = center). */
export function SocialIcon({ platform }: { platform: Platform }) {
  switch (platform) {
    case "instagram":
      return (
        <g>
          <rect x={-15} y={-15} width={30} height={30} rx={8} fill="url(#wf-ig)" />
          <rect x={-8} y={-8} width={16} height={16} rx={5} fill="none" stroke="#fff" strokeWidth={2} />
          <circle r={3.7} fill="none" stroke="#fff" strokeWidth={2} />
          <circle cx={4.6} cy={-4.6} r={1.2} fill="#fff" />
        </g>
      );
    case "linkedin":
      return (
        <g>
          <rect x={-15} y={-15} width={30} height={30} rx={8} fill="#0A66C2" />
          <rect x={-8.5} y={-2.5} width={3.6} height={10.5} rx={0.8} fill="#fff" />
          <circle cx={-6.7} cy={-6.6} r={2.2} fill="#fff" />
          <path d="M-2.2 8 L-2.2 -2.5 L1.3 -2.5 L1.3 -0.8 C 2.3 -2.4 3.8 -2.9 5.2 -2.9 C 7.9 -2.9 9 -1.1 9 2 L9 8 L5.4 8 L5.4 2.6 C 5.4 1 4.8 0.2 3.6 0.2 C 2.2 0.2 1.4 1.2 1.4 2.8 L1.4 8 Z" fill="#fff" />
        </g>
      );
    case "facebook":
      return (
        <g>
          <rect x={-15} y={-15} width={30} height={30} rx={8} fill="#1877F2" />
          <path d="M2.6 15 L2.6 3.2 L6.4 3.2 L7 -1.3 L2.6 -1.3 L2.6 -4.1 C 2.6 -5.4 3 -6.3 4.9 -6.3 L7.2 -6.3 L7.2 -10.3 C 6.8 -10.4 5.4 -10.5 3.8 -10.5 C 0.4 -10.5 -1.9 -8.4 -1.9 -4.6 L-1.9 -1.3 L-5.7 -1.3 L-5.7 3.2 L-1.9 3.2 L-1.9 15 Z" fill="#fff" />
        </g>
      );
    case "tiktok": {
      const note =
        "M1.5 -9.5 L5 -9.5 C 5.3 -6.8 7.1 -5 9.6 -4.8 L9.6 -1.3 C 7.8 -1.3 6.3 -1.9 5 -2.8 L5 3.6 C 5 7 2.3 9.6 -1 9.6 C -4.3 9.6 -7 7 -7 3.7 C -7 0.4 -4.3 -2.2 -1 -2.2 C -0.6 -2.2 -0.2 -2.2 0.2 -2.1 L0.2 1.5 C -0.2 1.4 -0.6 1.3 -1 1.3 C -2.4 1.3 -3.5 2.4 -3.5 3.7 C -3.5 5.1 -2.4 6.2 -1 6.2 C 0.4 6.2 1.5 5.1 1.5 3.7 Z";
      return (
        <g>
          <rect x={-15} y={-15} width={30} height={30} rx={8} fill="#111318" />
          <path d={note} fill="#25F4EE" transform="translate(-1 -1)" />
          <path d={note} fill="#FE2C55" transform="translate(1 1)" />
          <path d={note} fill="#fff" />
        </g>
      );
    }
  }
}
