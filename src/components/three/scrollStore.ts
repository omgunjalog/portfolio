/**
 * A tiny singleton the WebGL loop reads each frame and the DOM writes on
 * scroll. Keeps the fixed Canvas decoupled from React re-renders.
 *
 * `weights` is the blend across the 6 organism states, computed from how the
 * chapter anchors sit relative to the viewport centre (pinning + breaking).
 * Order: 0 tree · 1 globe · 2 spectrum · 3 core · 4 bloom · 5 ledger.
 */
export const STATES = ["tree", "globe", "spectrum", "core", "bloom", "ledger"] as const;
export type ChapterState = (typeof STATES)[number];
export const STATE_INDEX: Record<ChapterState, number> = {
  tree: 0,
  globe: 1,
  spectrum: 2,
  core: 3,
  bloom: 4,
  ledger: 5,
};

export const scrollStore = {
  /** 0 → 1 across the full document. */
  p: 0,
  /** pointer in NDC-ish range. */
  mx: 0,
  my: 0,
  /** blend weights across the six states (already normalised). */
  weights: [1, 0, 0, 0, 0, 0] as number[],
  /** target camera distance for the active chapter mix. */
  camZ: 6.2,
  /** |scroll delta| in px/frame, smoothed — drives audio + intensity. */
  velocity: 0,
};
