import * as THREE from "three";

/**
 * Builds the "system graph": crisp NODES plus a morphing web of CONNECTION
 * LINES between hub nodes. Both share six morph states blended in-shader by
 * per-state weights, so the whole structure reshapes per chapter. Edges fade
 * by their current length — so the wiring reads as a schematic in the compact
 * states (grid / network / tree) and dissolves to loose nodes when it blooms.
 *
 * 0 TREE · 1 NETWORK · 2 SIGNAL · 3 CORE · 4 BLOOM · 5 LEDGER
 */

const GOLD = 2.399963;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const STATE_KEYS = ["tree", "network", "signal", "core", "bloom", "ledger"] as const;

type Arrays = Record<(typeof STATE_KEYS)[number], Float32Array> & {
  scatter: Float32Array;
  scale: Float32Array;
};

function buildArrays(N: number): Arrays {
  const tree = new Float32Array(N * 3);
  const network = new Float32Array(N * 3);
  const signal = new Float32Array(N * 3);
  const core = new Float32Array(N * 3);
  const bloom = new Float32Array(N * 3);
  const ledger = new Float32Array(N * 3);
  const scatter = new Float32Array(N * 3);
  const scale = new Float32Array(N);
  const canopy = Math.floor(N * 0.72);

  for (let i = 0; i < N; i++) {
    // TREE
    let tx, ty, tz;
    if (i < canopy) {
      const t = i / canopy;
      const inc = Math.acos(1 - 2 * t);
      const az = GOLD * i;
      const r = 2.05 + rand(-0.25, 0.25);
      tx = r * Math.sin(inc) * Math.cos(az);
      ty = r * Math.cos(inc) + 0.55;
      tz = r * Math.sin(inc) * Math.sin(az);
    } else {
      const p = (i - canopy) / (N - canopy);
      ty = -2.5 + p * 3.0;
      const spread = 0.06 + p * p * 0.7;
      const a = Math.random() * Math.PI * 2;
      const rr = Math.random() * spread;
      tx = Math.cos(a) * rr;
      tz = Math.sin(a) * rr;
    }
    tree.set([tx, ty, tz], i * 3);

    // NETWORK (wire-globe)
    const R = 2.25;
    let nx, ny, nz;
    if (i % 2 === 0) {
      const lat = (Math.floor(i / 40) % 12) / 11;
      const phi = lat * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      nx = R * Math.sin(phi) * Math.cos(theta);
      ny = R * Math.cos(phi);
      nz = R * Math.sin(phi) * Math.sin(theta);
    } else {
      const lon = (Math.floor(i / 40) % 16) / 16;
      const theta = lon * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      nx = R * Math.sin(phi) * Math.cos(theta);
      ny = R * Math.cos(phi);
      nz = R * Math.sin(phi) * Math.sin(theta);
    }
    network.set([nx, ny, nz], i * 3);

    // SIGNAL (spectrum)
    const cols = 70;
    const col = i % cols;
    const cx = (col / (cols - 1) - 0.5) * 6.6;
    const env =
      Math.abs(Math.sin(col * 0.2)) * 0.6 +
      Math.abs(Math.sin(col * 0.07 + 1.3)) * 0.8 +
      0.15;
    signal.set([cx, -1.7 + Math.random() * (env * 3.0), rand(-1.1, 1.1)], i * 3);

    // CORE (dense ball)
    const cr = 0.95 * Math.cbrt(Math.random());
    const cinc = Math.acos(1 - 2 * Math.random());
    const caz = Math.random() * Math.PI * 2;
    core.set(
      [cr * Math.sin(cinc) * Math.cos(caz), cr * Math.cos(cinc), cr * Math.sin(cinc) * Math.sin(caz)],
      i * 3,
    );

    // BLOOM (galaxy)
    const arm = i % 3;
    const br = rand(0.3, 4.3);
    const bAng = arm * ((Math.PI * 2) / 3) + br * 1.35 + rand(-0.25, 0.25);
    bloom.set([Math.cos(bAng) * br, rand(-0.18, 0.18) * (1 + br * 0.1), Math.sin(bAng) * br], i * 3);

    // LEDGER (grid plane)
    const lc = 40;
    const lr = 24;
    const gcol = i % lc;
    const grow = Math.floor(i / lc) % lr;
    const lx = (gcol - (lc - 1) / 2) * 0.16;
    const ly = ((lr - 1) / 2 - grow) * 0.16 + 0.2;
    ledger.set([lx, ly, Math.sin(gcol * 0.25) * 0.22], i * 3);

    // SCATTER (load-in)
    const sr = rand(4.5, 8);
    const sinc = Math.acos(1 - 2 * Math.random());
    const saz = Math.random() * Math.PI * 2;
    scatter.set(
      [sr * Math.sin(sinc) * Math.cos(saz), sr * Math.cos(sinc), sr * Math.sin(sinc) * Math.sin(saz)],
      i * 3,
    );

    scale[i] = 0.3 + Math.random() * 0.7;
  }

  return { tree, network, signal, core, bloom, ledger, scatter, scale };
}

function nodeGeometry(a: Arrays, N: number) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(a.tree, 3));
  g.setAttribute("aTree", new THREE.BufferAttribute(a.tree, 3));
  g.setAttribute("aNetwork", new THREE.BufferAttribute(a.network, 3));
  g.setAttribute("aSignal", new THREE.BufferAttribute(a.signal, 3));
  g.setAttribute("aCore", new THREE.BufferAttribute(a.core, 3));
  g.setAttribute("aBloom", new THREE.BufferAttribute(a.bloom, 3));
  g.setAttribute("aLedger", new THREE.BufferAttribute(a.ledger, 3));
  g.setAttribute("aScatter", new THREE.BufferAttribute(a.scatter, 3));
  g.setAttribute("aScale", new THREE.BufferAttribute(a.scale, 1));
  g.setDrawRange(0, N);
  return g;
}

const v = (arr: Float32Array, i: number) =>
  new THREE.Vector3(arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]);

/** Wire hub nodes to their k nearest neighbours (in the network layout). */
function edgeGeometry(a: Arrays, N: number, hubCount: number, k: number) {
  const hubs: number[] = [];
  const step = Math.max(1, Math.floor(N / hubCount));
  for (let i = 0; i < N; i += step) hubs.push(i);
  const H = hubs.length;

  // KNN among hubs using the network positions
  const pairs = new Set<string>();
  const edges: [number, number][] = [];
  for (let ai = 0; ai < H; ai++) {
    const pa = v(a.network, hubs[ai]);
    const dists: { j: number; d: number }[] = [];
    for (let bi = 0; bi < H; bi++) {
      if (bi === ai) continue;
      dists.push({ j: bi, d: pa.distanceToSquared(v(a.network, hubs[bi])) });
    }
    dists.sort((x, y) => x.d - y.d);
    for (let n = 0; n < k && n < dists.length; n++) {
      const bi = dists[n].j;
      const key = ai < bi ? `${ai}-${bi}` : `${bi}-${ai}`;
      if (pairs.has(key)) continue;
      pairs.add(key);
      edges.push([hubs[ai], hubs[bi]]);
    }
  }

  const E = edges.length;
  const arrays = STATE_KEYS.map(() => new Float32Array(E * 2 * 3));
  const scatter = new Float32Array(E * 2 * 3);
  const lenA = new Float32Array(E * 2 * 3); // lengths in states 0,1,2
  const lenB = new Float32Array(E * 2 * 3); // lengths in states 3,4,5
  const phase = new Float32Array(E * 2);

  edges.forEach(([ia, ib], e) => {
    const ph = Math.random() * Math.PI * 2;
    const lens = STATE_KEYS.map((key) => v(a[key], ia).distanceTo(v(a[key], ib)));
    for (let side = 0; side < 2; side++) {
      const idx = side === 0 ? ia : ib;
      const o = (e * 2 + side) * 3;
      STATE_KEYS.forEach((key, si) => {
        arrays[si][o] = a[key][idx * 3];
        arrays[si][o + 1] = a[key][idx * 3 + 1];
        arrays[si][o + 2] = a[key][idx * 3 + 2];
      });
      scatter[o] = a.scatter[idx * 3];
      scatter[o + 1] = a.scatter[idx * 3 + 1];
      scatter[o + 2] = a.scatter[idx * 3 + 2];
      lenA.set([lens[0], lens[1], lens[2]], o);
      lenB.set([lens[3], lens[4], lens[5]], o);
      phase[e * 2 + side] = ph;
    }
  });

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arrays[0], 3));
  g.setAttribute("aTree", new THREE.BufferAttribute(arrays[0], 3));
  g.setAttribute("aNetwork", new THREE.BufferAttribute(arrays[1], 3));
  g.setAttribute("aSignal", new THREE.BufferAttribute(arrays[2], 3));
  g.setAttribute("aCore", new THREE.BufferAttribute(arrays[3], 3));
  g.setAttribute("aBloom", new THREE.BufferAttribute(arrays[4], 3));
  g.setAttribute("aLedger", new THREE.BufferAttribute(arrays[5], 3));
  g.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  g.setAttribute("aLenA", new THREE.BufferAttribute(lenA, 3));
  g.setAttribute("aLenB", new THREE.BufferAttribute(lenB, 3));
  g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));

  // ---- pulses: one point per edge that travels from one node to the other.
  // Kept under the 16 vertex-attribute limit: 6 from + 6 to states + position +
  // one packed rand(vec2). Edge length is computed in-shader from the endpoints.
  const from = STATE_KEYS.map(() => new Float32Array(E * 3));
  const to = STATE_KEYS.map(() => new Float32Array(E * 3));
  const pRand = new Float32Array(E * 2);

  edges.forEach(([ia, ib], e) => {
    const o = e * 3;
    STATE_KEYS.forEach((key, si) => {
      from[si].set([a[key][ia * 3], a[key][ia * 3 + 1], a[key][ia * 3 + 2]], o);
      to[si].set([a[key][ib * 3], a[key][ib * 3 + 1], a[key][ib * 3 + 2]], o);
    });
    pRand[e * 2] = Math.random(); // phase
    pRand[e * 2 + 1] = 0.1 + Math.random() * 0.22; // speed
  });

  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(from[0], 3));
  const fk = ["aFromTree", "aFromNetwork", "aFromSignal", "aFromCore", "aFromBloom", "aFromLedger"];
  const tk = ["aToTree", "aToNetwork", "aToSignal", "aToCore", "aToBloom", "aToLedger"];
  STATE_KEYS.forEach((_, si) => {
    pg.setAttribute(fk[si], new THREE.BufferAttribute(from[si], 3));
    pg.setAttribute(tk[si], new THREE.BufferAttribute(to[si], 3));
  });
  pg.setAttribute("aRand", new THREE.BufferAttribute(pRand, 2));

  return { edge: g, pulse: pg };
}

export function buildSystemGraph(count = 9000, hubCount = 520, k = 3) {
  const arrays = buildArrays(count);
  const { edge, pulse } = edgeGeometry(arrays, count, hubCount, k);
  return {
    node: nodeGeometry(arrays, count),
    edge,
    pulse,
  };
}
