"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * A deliberate opening: the mark holds while a progress line fills, then the
 * curtain lifts to reveal the hero with the organism assembling behind. Shows
 * once per session, skips background tabs, and dismisses on first interaction.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-shown") === "1";
    } catch {}
    if (seen || reduce || document.visibilityState === "hidden") return;

    setShow(true);
    document.body.style.overflow = "hidden";

    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("intro-shown", "1");
      } catch {}
      document.body.style.overflow = "";
      setShow(false);
      window.dispatchEvent(new Event("intro:done"));
    };

    const dur = 1900;
    const start = Date.now();
    const hide = setTimeout(dismiss, dur);
    const iv = setInterval(() => {
      setPct(Math.min(Math.round(((Date.now() - start) / dur) * 100), 100));
    }, 60);

    const onInteract = () => dismiss();
    window.addEventListener("wheel", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);
    window.addEventListener("pointerdown", onInteract);
    window.addEventListener("touchstart", onInteract, { passive: true });

    return () => {
      clearTimeout(hide);
      clearInterval(iv);
      window.removeEventListener("wheel", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("touchstart", onInteract);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="t-label mb-6">Om Gunjal — Portfolio</span>
            <h1 className="t-hero text-center">
              build<span className="t-serif accent-text">.</span>
            </h1>
            <div className="mt-10 h-px w-56 overflow-hidden bg-line-2">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <p className="mt-4 font-mono text-xs tabular-nums text-ink-3">
              Assembling the system · {pct}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
