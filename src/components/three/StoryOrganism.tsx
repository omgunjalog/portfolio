"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildSystemGraph } from "./formations";
import { scrollStore } from "./scrollStore";

const nodeVert = /* glsl */ `
  uniform float uTime, uIntro, uPixelRatio, uSize;
  uniform vec3 uMouse;
  uniform float uW[6];
  attribute vec3 aTree,aNetwork,aSignal,aCore,aBloom,aLedger,aScatter;
  attribute float aScale;
  varying float vColorT;
  varying float vAlpha;
  void main() {
    vec3 b = aTree*uW[0]+aNetwork*uW[1]+aSignal*uW[2]+aCore*uW[3]+aBloom*uW[4]+aLedger*uW[5];
    vec3 pos = mix(aScatter, b, uIntro);
    float t = uTime * 0.5;
    pos.x += sin(t + pos.y*3.0 + aScale*6.28) * 0.02;
    pos.y += cos(t*0.8 + pos.x*3.0) * 0.02;
    vec4 world = modelMatrix * vec4(pos,1.0);
    float force = smoothstep(1.4, 0.0, distance(world.xyz, uMouse));
    world.xyz += normalize(world.xyz - uMouse + 1e-4) * force * 0.7;
    vec4 mv = viewMatrix * world;
    vColorT = clamp((pos.y+2.6)/5.2 + (aScale-0.5)*0.18, 0.0, 1.0);
    vAlpha = (0.4 + 0.5*aScale + force*0.9) * uIntro;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0/-mv.z) * (1.0 + force*1.8);
    gl_Position = projectionMatrix * mv;
  }
`;

const nodeFrag = /* glsl */ `
  precision mediump float;
  varying float vColorT;
  varying float vAlpha;
  uniform vec3 uColorA, uColorB, uColorC;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    vec3 col = vColorT < 0.5 ? mix(uColorA,uColorB,vColorT*2.0) : mix(uColorB,uColorC,(vColorT-0.5)*2.0);
    gl_FragColor = vec4(col, alpha);
  }
`;

const edgeVert = /* glsl */ `
  uniform float uTime, uIntro;
  uniform vec3 uMouse;
  uniform float uW[6];
  attribute vec3 aTree,aNetwork,aSignal,aCore,aBloom,aLedger,aScatter,aLenA,aLenB;
  attribute float aPhase;
  varying float vAlpha;
  void main() {
    vec3 b = aTree*uW[0]+aNetwork*uW[1]+aSignal*uW[2]+aCore*uW[3]+aBloom*uW[4]+aLedger*uW[5];
    vec3 pos = mix(aScatter, b, uIntro);
    vec4 world = modelMatrix * vec4(pos,1.0);
    float force = smoothstep(1.4, 0.0, distance(world.xyz, uMouse));
    world.xyz += normalize(world.xyz - uMouse + 1e-4) * force * 0.7;
    float curLen = aLenA.x*uW[0]+aLenA.y*uW[1]+aLenA.z*uW[2]+aLenB.x*uW[3]+aLenB.y*uW[4]+aLenB.z*uW[5];
    float lenFade = 1.0 - smoothstep(0.5, 1.5, curLen);
    float pulse = 0.55 + 0.45*sin(uTime*1.4 + aPhase);
    vAlpha = uIntro * lenFade * (0.16 + 0.4*pulse);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const edgeFrag = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uEdgeColor;
  void main() { gl_FragColor = vec4(uEdgeColor, vAlpha); }
`;

const pulseVert = /* glsl */ `
  uniform float uTime, uIntro, uPixelRatio, uSize;
  uniform float uW[6];
  attribute vec3 aFromTree,aFromNetwork,aFromSignal,aFromCore,aFromBloom,aFromLedger;
  attribute vec3 aToTree,aToNetwork,aToSignal,aToCore,aToBloom,aToLedger;
  attribute vec2 aRand;
  varying float vAlpha;
  void main() {
    float t = fract(uTime*aRand.y + aRand.x);
    vec3 bf = aFromTree*uW[0]+aFromNetwork*uW[1]+aFromSignal*uW[2]+aFromCore*uW[3]+aFromBloom*uW[4]+aFromLedger*uW[5];
    vec3 bt = aToTree*uW[0]+aToNetwork*uW[1]+aToSignal*uW[2]+aToCore*uW[3]+aToBloom*uW[4]+aToLedger*uW[5];
    vec3 pos = mix(bf, bt, t);
    float curLen = distance(bf, bt);
    float lenFade = 1.0 - smoothstep(0.5, 1.5, curLen);
    float ends = sin(t * 3.14159);
    vAlpha = uIntro * lenFade * ends;
    vec4 mv = viewMatrix * modelMatrix * vec4(pos,1.0);
    gl_PointSize = uSize * uPixelRatio * (1.0/-mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const pulseFrag = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uPulseColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(uPulseColor, a);
  }
`;

const TOP = ["#ffe0a3", "#ffd486", "#ffcf72", "#fff1cc", "#ffd486", "#ffe6b0"].map(
  (c) => new THREE.Color(c),
);
const smooth = (x: number) => x * x * (3 - 2 * x);

export function StoryOrganism({
  reduced = false,
  count = 9000,
  hubs = 520,
}: {
  reduced?: boolean;
  count?: number;
  hubs?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const edgeMat = useRef<THREE.ShaderMaterial>(null);
  const pulseMat = useRef<THREE.ShaderMaterial>(null);
  const { node, edge, pulse } = useMemo(
    () => buildSystemGraph(count, hubs, 3),
    [count, hubs],
  );

  const intro = useRef(0);
  const mouseWorld = useRef(new THREE.Vector3(999, 999, 999));
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const acc = useMemo(() => new THREE.Color(), []);

  // Fully independent uniforms per material (sharing an array uniform like uW
  // across two materials leaves one un-uploaded → collapse to origin). Synced
  // each frame from a single source of truth.
  const weights = useRef<number[]>([1, 0, 0, 0, 0, 0]);
  const nodeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uW: { value: [1, 0, 0, 0, 0, 0] },
      uPixelRatio: { value: 1 },
      uSize: { value: 22 },
      uColorA: { value: new THREE.Color("#5a2c00") },
      uColorB: { value: new THREE.Color("#f4a52a") },
      uColorC: { value: new THREE.Color("#ffe0a3") },
    }),
    [reduced],
  );
  const edgeUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uW: { value: [1, 0, 0, 0, 0, 0] },
      uEdgeColor: { value: new THREE.Color("#ffc36b") },
    }),
    [reduced],
  );
  const pulseUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uW: { value: [1, 0, 0, 0, 0, 0] },
      uPixelRatio: { value: 1 },
      uSize: { value: 55 },
      uPulseColor: { value: new THREE.Color("#fff1d6") },
    }),
    [reduced],
  );

  useFrame((state, delta) => {
    const nm = nodeMat.current;
    const em = edgeMat.current;
    const pm = pulseMat.current;
    if (!nm || !em || !pm) return;
    const nu = nm.uniforms;
    const eu = em.uniforms;
    const pu = pm.uniforms;

    const pr = Math.min(state.gl.getPixelRatio(), 2);
    nu.uPixelRatio.value = pr;
    nu.uSize.value = state.size.width < 640 ? 18 : 22;
    pu.uPixelRatio.value = pr;

    let intro01: number;
    let time: number;
    if (!reduced) {
      intro.current = Math.min(intro.current + delta * 0.5, 1);
      intro01 = smooth(intro.current);
      time = nu.uTime.value + delta;
    } else {
      intro01 = 1;
      time = 2;
    }
    nu.uTime.value = time;
    nu.uIntro.value = intro01;
    eu.uTime.value = time;
    eu.uIntro.value = intro01;
    pu.uTime.value = time;
    pu.uIntro.value = intro01;

    const target = reduced ? [1, 0, 0, 0, 0, 0] : scrollStore.weights;
    const W = weights.current;
    const k = 1 - Math.pow(0.001, delta);
    for (let s = 0; s < 6; s++) {
      W[s] += (target[s] - W[s]) * k * 1.4;
      (nu.uW.value as number[])[s] = W[s];
      (eu.uW.value as number[])[s] = W[s];
      (pu.uW.value as number[])[s] = W[s];
    }

    acc.setRGB(0, 0, 0);
    let tot = 0;
    for (let s = 0; s < 6; s++) {
      const ws = Math.max(W[s], 0);
      acc.r += TOP[s].r * ws;
      acc.g += TOP[s].g * ws;
      acc.b += TOP[s].b * ws;
      tot += ws;
    }
    if (tot > 0) acc.multiplyScalar(1 / tot);
    (nu.uColorC.value as THREE.Color).lerp(acc, 0.1);

    if (!reduced) {
      const camZ = scrollStore.camZ || 6.2;
      state.camera.position.z += (camZ - state.camera.position.z) * 0.045;
      ndc.set(state.pointer.x, state.pointer.y);
      ray.setFromCamera(ndc, state.camera);
      const hit = new THREE.Vector3();
      if (ray.ray.intersectPlane(plane, hit)) mouseWorld.current.lerp(hit, 0.15);
      nu.uMouse.value.copy(mouseWorld.current);
      eu.uMouse.value.copy(mouseWorld.current);
    }

    if (group.current) {
      if (!reduced) group.current.rotation.y += delta * 0.05;
      const tx = reduced ? 0.12 : scrollStore.my * 0.2 + scrollStore.p * 0.32;
      const tz = reduced ? 0 : -scrollStore.mx * 0.07;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (tz - group.current.rotation.z) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edge} frustumCulled={false}>
        <shaderMaterial
          ref={edgeMat}
          vertexShader={edgeVert}
          fragmentShader={edgeFrag}
          uniforms={edgeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={pulse} frustumCulled={false}>
        <shaderMaterial
          ref={pulseMat}
          vertexShader={pulseVert}
          fragmentShader={pulseFrag}
          uniforms={pulseUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={node} frustumCulled={false}>
        <shaderMaterial
          ref={nodeMat}
          vertexShader={nodeVert}
          fragmentShader={nodeFrag}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
