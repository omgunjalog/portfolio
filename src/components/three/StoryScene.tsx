"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { StoryOrganism } from "./StoryOrganism";

export default function StoryScene({
  reduced,
  count,
  hubs,
}: {
  reduced: boolean;
  count: number;
  hubs: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <StoryOrganism reduced={reduced} count={count} hubs={hubs} />
      {!reduced && (
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.02}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.55}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
