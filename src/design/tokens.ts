// Starter direction; replace with the software's own brand after briefing.
// Keep editable styles inline on interactive elements where Studio editing matters.
export const palette = {
  canvas: "#f5f5f7",
  white: "#ffffff",
  ink: "#1d1d1f",
  secondary: "#6e6e73",
  accent: "#0071e3",
} as const;

export const motion = {
  revealBezier: [0.16, 1, 0.3, 1],
  settleBezier: [0.22, 1, 0.36, 1],
  revealSeconds: 0.8,
  settleSeconds: 1.2,
} as const;
