/**
 * Fixed structural backdrop: a faint engineering graph-paper grid that
 * fades out toward the bottom, plus one restrained warm wash at the top.
 * No heavy glow, no image cost.
 */
export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="graph-grid absolute inset-0 opacity-70"
        style={{
          maskImage:
            "linear-gradient(to bottom, black, black 40%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black 40%, transparent 92%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(80rem 30rem at 78% -8%, rgba(244,165,42,0.07), transparent 65%)",
        }}
      />
    </div>
  );
}
