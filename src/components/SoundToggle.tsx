"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import { scrollStore } from "./three/scrollStore";

/**
 * An ambient drone built with the Web Audio API. Off by default (audio needs a
 * user gesture); once on, its brightness and volume swell with scroll velocity,
 * and the base chord shifts with the active chapter.
 */
export function SoundToggle() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const rafRef = useRef(0);

  function build() {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    filter.Q.value = 1.2;
    filter.connect(master);
    master.connect(ctx.destination);

    // base chord — low fifth + octave shimmer
    const freqs = [55, 82.5, 110, 164.8];
    const types: OscillatorType[] = ["sine", "sine", "triangle", "sine"];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = types[i];
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 6;
      const g = ctx.createGain();
      g.gain.value = i === 3 ? 0.12 : 0.3;
      o.connect(g);
      g.connect(filter);
      o.start();
      return o;
    });

    // slow filter LFO for movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 160;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    oscs.push(lfo);

    ctxRef.current = ctx;
    masterRef.current = master;
    filterRef.current = filter;
    oscsRef.current = oscs;

    const loop = () => {
      const m = masterRef.current;
      const fl = filterRef.current;
      if (m && ctx.state === "running") {
        const vel = Math.min(scrollStore.velocity, 60);
        const target = 0.045 + vel * 0.0016;
        m.gain.setTargetAtTime(target, ctx.currentTime, 0.25);
        if (fl) fl.frequency.setTargetAtTime(320 + vel * 12, ctx.currentTime, 0.3);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }

  async function toggle() {
    if (!on) {
      if (!ctxRef.current) build();
      await ctxRef.current?.resume();
      setOn(true);
    } else {
      const m = masterRef.current;
      const ctx = ctxRef.current;
      if (m && ctx) m.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
      setTimeout(() => ctxRef.current?.suspend(), 300);
      setOn(false);
    }
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      oscsRef.current.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      ctxRef.current?.close();
    };
  }, []);

  if (pathname !== "/") return null;

  return (
    <button
      type="button"
      data-cursor
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-[3px] border border-line-2 bg-bg/70 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-2 backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
    >
      {on ? (
        <>
          <Volume2 size={13} className="text-accent" />
          <span className="flex items-end gap-[2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[2px] bg-accent"
                style={{
                  height: 9,
                  transformOrigin: "bottom",
                  animation: `sound-bar 0.9s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </span>
        </>
      ) : (
        <>
          <VolumeX size={13} /> Sound
        </>
      )}
    </button>
  );
}
