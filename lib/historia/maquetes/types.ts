/**
 * Formato comum das maquetes de cidades (Babilônia, Nínive, Samaria).
 *
 * Sistema local em metros: x para leste, z para o sul. A cota é relativa (0 = planície ou
 * fundo do vale), em metros. Na cena 3D, 1 unidade = 10 m.
 */

export type XZ = [number, number];

export type BlockKind = "box" | "tiers" | "gate" | "glazed";

export type Block = {
  id: string;
  at: XZ;
  /** largura (x), altura, profundidade (z), em metros */
  size: [number, number, number];
  rot?: number;
  color: string;
  kind?: BlockKind;
  /** zigurate: patamares de baixo para cima, [lado x, lado z, altura] */
  tiers?: [number, number, number][];
  /** escada frontal do zigurate: lado (+z = sul) e comprimento em m */
  stair?: { length: number; width: number };
  /** frisos de animais em tijolo vidrado (Portal de Ishtar, via processional) */
  frieze?: { color: string; rows: number[]; spacing: number };
  /** porta: largura da passagem em m */
  opening?: number;
  /** cobertura plana de outra cor (madeira, terraço) */
  roof?: string;
  /** o caminhante não atravessa */
  solid?: boolean;
  /** base acima do terreno (ex.: palácio sobre um terraço) */
  lift?: number;
  /** o caminhante pode andar por cima (ponte, terraço) */
  walkable?: boolean;
};

export type RoadDef = { label: string; path: XZ[]; width: number; color: string };

export type WallDef = {
  label: string;
  ring: XZ[];
  closed?: boolean;
  height: number;
  thick: number;
  color: string;
  /** torres a cada N metros (0 = sem torres) */
  towerEvery?: number;
  towerColor?: string;
};

export type WaterDef = { label: string; path: XZ[]; width: number; closed?: boolean; depth?: number };

export type Zone = {
  ring: XZ[];
  count: number;
  size: [number, number];
  height: [number, number];
  colors: [string, string];
  seed: number;
  /** não constrói acima desta cota (fora dos montes) */
  maxH?: number;
  /** não constrói abaixo desta cota */
  minH?: number;
  /** espaçamento mínimo da grade (ruas retas, como em Babilônia) */
  grid?: number;
};

export type TreeDef = {
  kind: "palmeira" | "oliveira";
  count: number;
  area: [number, number, number, number];
  seed: number;
  /** fica fora destes polígonos */
  avoid?: XZ[][];
  /** fica perto destes cursos d'água (m) */
  near?: { path: XZ[]; dist: number }[];
  /** fica dentro destes polígonos (jardins) */
  inside?: XZ[][];
};

export type CityHotspot = {
  id: string;
  name: string;
  at: XZ;
  text: string;
  refs: string;
  note?: string;
  /** altura do marcador acima do chão (m) */
  y?: number;
};

export type PlanLabel = { text: string; at: XZ; rot?: number; size?: number; kind?: "agua" | "lugar" };

export type CityDef = {
  slug: string;
  name: string;
  title: string;
  kicker: string;
  date: string;
  lede: string;
  description: string;
  poster: string;
  posterAlt: string;
  terrain: { minX: number; maxX: number; minZ: number; maxZ: number; seg: number };
  elevation: (x: number, z: number) => number;
  ground: { low: string; mid: string; high: string; rock: string; highAt: number };
  waterLevel: number;
  waters: WaterDef[];
  roads: RoadDef[];
  walls: WallDef[];
  blocks: Block[];
  zones: Zone[];
  trees: TreeDef[];
  hotspots: CityHotspot[];
  orbit: { position: [number, number, number]; target: [number, number, number]; maxDistance: number };
  walk: { start: XZ; yaw: number };
  sky: {
    background: string;
    fog: string;
    sun: [number, number, number];
    fogOrbit: [number, number];
    fogWalk: [number, number];
  };
  plan: {
    view: { minX: number; maxX: number; minZ: number; maxZ: number };
    contours?: { from: number; to: number; step: number; major: number };
    labels: PlanLabel[];
    scale: number;
  };
  facts: { certo: string; texto: string; aproximado: string };
  sources: string[];
};

export function pointInRing(x: number, z: number, ring: XZ[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, zi] = ring[i];
    const [xj, zj] = ring[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

export function distToPath(x: number, z: number, path: XZ[], closed = false): number {
  let best = Infinity;
  const n = closed ? path.length : path.length - 1;
  for (let i = 0; i < n; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const len2 = dx * dx + dz * dz;
    let t = len2 ? ((x - a[0]) * dx + (z - a[1]) * dz) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    best = Math.min(best, Math.hypot(x - (a[0] + t * dx), z - (a[1] + t * dz)));
  }
  return best;
}

/** Retângulo [x0, z0, x1, z1] como polígono. */
export function rect(x0: number, z0: number, x1: number, z1: number): XZ[] {
  return [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1],
  ];
}

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
