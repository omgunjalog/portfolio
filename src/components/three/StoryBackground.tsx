"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { scrollStore, STATE_INDEX, type ChapterState } from "./scrollStore";

const StoryScene = dynamic(() => import("./StoryScene"), { ssr: false });

const CAM_Z = [6.2, 5.8, 7.2, 4.6, 8.2, 5.4]; // tree globe spectrum core bloom ledger

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Persistent organism behind the page. Chapter anchors ([data-chapter]) drive
 * a Gaussian-weighted blend of the six states by how each sits relative to the
 * viewport centre — so a shape HOLDS while its section is on screen and BREAKS
 * in the gaps between. Also tracks scroll velocity for the ambient audio.
 */
export function StoryBackground() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [ok, setOk] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (!home) return;
    setOk(webglOK());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(window.innerWidth < 768);

    let lastY = window.scrollY;
    let queued = false;

    const compute = () => {
      queued = false;
      const vh = window.innerHeight;
      const vc = vh / 2;
      const anchors = document.querySelectorAll<HTMLElement>("[data-chapter]");

      const weights = [0, 0, 0, 0, 0, 0];
      let tot = 0;
      anchors.forEach((el) => {
        const idx = STATE_INDEX[el.dataset.chapter as ChapterState];
        if (idx === undefined) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = (center - vc) / vh;
        const w = Math.exp(-(d * d) / (0.55 * 0.55));
        weights[idx] += w;
        tot += w;
      });

      if (tot > 0) {
        let cz = 0;
        for (let s = 0; s < 6; s++) {
          weights[s] /= tot;
          cz += weights[s] * CAM_Z[s];
        }
        scrollStore.weights = weights;
        scrollStore.camZ = cz;
      }

      const max = document.documentElement.scrollHeight - vh;
      scrollStore.p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;

      const dv = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      scrollStore.velocity += (dv - scrollStore.velocity) * 0.25;
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    // settle a beat after mount (fonts/layout) then recompute
    const t = setTimeout(compute, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const onMove = (e: PointerEvent) => {
      scrollStore.mx = (e.clientX / window.innerWidth) * 2 - 1;
      scrollStore.my = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    // decay velocity when idle
    const decay = setInterval(() => {
      scrollStore.velocity *= 0.9;
    }, 100);

    return () => {
      clearTimeout(t);
      clearInterval(decay);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [home]);

  if (!home || !ok) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <StoryScene
        reduced={reduced}
        count={mobile ? 4000 : 9000}
        hubs={mobile ? 240 : 520}
      />
    </div>
  );
}
