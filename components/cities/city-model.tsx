"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { getCity } from "@/lib/historia/maquetes";
import {
  distToPath,
  mulberry32,
  pointInRing,
  type Block,
  type CityDef,
  type CityHotspot,
  type XZ,
} from "@/lib/historia/maquetes/types";

/** 1 unidade = 10 m. */
const U = 10;

export type WalkInput = {
  keys: Set<string>;
  joy: { x: number; y: number };
  look: { dx: number; dy: number };
  teleport: XZ | null;
};

export type CityModelProps = {
  slug: string;
  mode: "orbita" | "caminhar";
  selected: string | null;
  onSelect: (id: string) => void;
  input: React.MutableRefObject<WalkInput>;
  resetKey: number;
  /** 0 = vista inicial; 1..n = city.views */
  view?: number;
};

type Box = { x: number; y: number; z: number; w: number; h: number; d: number; rot: number };

function Instanced({
  items,
  color,
  colors,
  roughness = 0.9,
  shape = "box",
}: {
  items: Box[];
  color?: string;
  colors?: THREE.Color[];
  roughness?: number;
  shape?: "box" | "cyl";
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    items.forEach((b, i) => {
      e.set(0, b.rot, 0);
      q.setFromEuler(e);
      m.compose(new THREE.Vector3(b.x / U, (b.y + b.h / 2) / U, b.z / U), q, new THREE.Vector3(b.w / U, b.h / U, b.d / U));
      mesh.setMatrixAt(i, m);
      if (colors) mesh.setColorAt(i, colors[i]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items, colors]);
  if (!items.length) return null;
  return (
    <instancedMesh key={items.length} ref={ref} args={[undefined, undefined, items.length]}>
      {shape === "cyl" ? <cylinderGeometry args={[0.5, 0.5, 1, 10]} /> : <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial color={colors ? undefined : color} roughness={roughness} flatShading={shape === "box"} />
    </instancedMesh>
  );
}

function Terrain({ city }: { city: CityDef }) {
  const geometry = useMemo(() => {
    const t = city.terrain;
    const w = (t.maxX - t.minX) / U;
    const d = (t.maxZ - t.minZ) / U;
    const geo = new THREE.PlaneGeometry(w, d, t.seg, Math.round((t.seg * d) / w));
    geo.rotateX(-Math.PI / 2);
    geo.translate((t.minX + t.maxX) / 2 / U, 0, (t.minZ + t.maxZ) / 2 / U);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const low = new THREE.Color(city.ground.low);
    const mid = new THREE.Color(city.ground.mid);
    const high = new THREE.Color(city.ground.high);
    const rock = new THREE.Color(city.ground.rock);
    const green = new THREE.Color("#5f7038");
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i) * U;
      const z = pos.getZ(i) * U;
      const h = city.elevation(x, z);
      // sob uma esplanada, o terreno desce um pouco para não brigar com o piso dela
      const under = city.platforms?.some((p) => pointInRing(x, z, p.ring));
      pos.setY(i, (under ? h - 2 : h) / U);
      const slope = Math.abs(city.elevation(x + 8, z) - city.elevation(x - 8, z)) + Math.abs(city.elevation(x, z + 8) - city.elevation(x, z - 8));
      const f = Math.max(0, Math.min(1, h / city.ground.highAt));
      c.copy(low).lerp(mid, Math.min(1, f * 2)).lerp(high, Math.max(0, f * 2 - 1));
      let wet = Infinity;
      for (const water of city.waters) wet = Math.min(wet, distToPath(x, z, water.path, water.closed) - water.width / 2);
      if (wet < 160) c.lerp(green, 0.55 * (1 - Math.max(0, wet) / 160));
      if (h < city.waterLevel - 0.5) c.lerp(new THREE.Color("#6d5a3c"), 0.6);
      c.lerp(rock, Math.min(0.8, slope / 14));
      const n = Math.sin(x * 0.031) * Math.cos(z * 0.027) * 0.025;
      colors[i * 3] = c.r + n;
      colors[i * 3 + 1] = c.g + n;
      colors[i * 3 + 2] = c.b + n;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [city]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial vertexColors roughness={0.96} metalness={0} flatShading />
    </mesh>
  );
}

/** Faixa plana ao longo de um caminho (rio, fosso, rua). */
function ribbon(path: XZ[], width: number, y: (x: number, z: number) => number, closed = false) {
  const pts = closed ? [...path, path[0], path[1]] : path;
  const verts: number[] = [];
  const idx: number[] = [];
  const n = closed ? path.length + 1 : pts.length;
  for (let i = 0; i < n; i += 1) {
    const p = pts[i];
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    let dx = b[0] - a[0];
    let dz = b[1] - a[1];
    const len = Math.hypot(dx, dz) || 1;
    dx /= len;
    dz /= len;
    const nx = -dz * (width / 2);
    const nz = dx * (width / 2);
    verts.push((p[0] + nx) / U, y(p[0] + nx, p[1] + nz), (p[1] + nz) / U, (p[0] - nx) / U, y(p[0] - nx, p[1] - nz), (p[1] - nz) / U);
    if (i < n - 1) {
      const k = i * 2;
      idx.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/** Subdivide um caminho em trechos de até `step` metros, para a faixa seguir o relevo. */
function densify(path: XZ[], step: number, closed = false): XZ[] {
  const out: XZ[] = [];
  const n = closed ? path.length : path.length - 1;
  for (let i = 0; i < n; i += 1) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    const parts = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let s = 0; s < parts; s += 1) out.push([a[0] + ((b[0] - a[0]) * s) / parts, a[1] + ((b[1] - a[1]) * s) / parts]);
  }
  if (!closed) out.push(path[path.length - 1]);
  return out;
}

function Waters({ city }: { city: CityDef }) {
  const geos = useMemo(
    () => city.waters.map((w) => ribbon(densify(w.path, 60, w.closed), w.width, () => city.waterLevel / U, w.closed)),
    [city],
  );
  const roads = useMemo(
    () => city.roads.map((r) => ({ color: r.color, geo: ribbon(densify(r.path, 20), r.width, (x, z) => (city.elevation(x, z) + 0.25) / U) })),
    [city],
  );
  return (
    <group>
      {geos.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial color="#4f8fa8" emissive="#173d50" emissiveIntensity={0.35} roughness={0.25} metalness={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {roads.map((road, i) => (
        <mesh key={`r${i}`} geometry={road.geo}>
          <meshStandardMaterial color={road.color} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Walls({ city }: { city: CityDef }) {
  const groups = useMemo(
    () =>
      city.walls.map((wall) => {
        const pieces: Box[] = [];
        const towers: Box[] = [];
        const n = wall.closed ? wall.ring.length : wall.ring.length - 1;
        for (let i = 0; i < n; i += 1) {
          const a = wall.ring[i];
          const b = wall.ring[(i + 1) % wall.ring.length];
          const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
          const steps = Math.max(1, Math.round(len / 25));
          const rot = -Math.atan2(b[1] - a[1], b[0] - a[0]);
          for (let s = 0; s < steps; s += 1) {
            const t = (s + 0.5) / steps;
            const x = a[0] + (b[0] - a[0]) * t;
            const z = a[1] + (b[1] - a[1]) * t;
            pieces.push({ x, z, y: city.elevation(x, z) - 4, w: len / steps + 1.5, h: wall.height + 4, d: wall.thick, rot });
          }
          const every = wall.towerEvery ?? 0;
          const count = every ? Math.max(1, Math.round(len / every)) : 1;
          for (let s = 0; s < count; s += 1) {
            const t = s / count;
            const x = a[0] + (b[0] - a[0]) * t;
            const z = a[1] + (b[1] - a[1]) * t;
            const size = wall.thick * 1.7 + 4;
            towers.push({ x, z, y: city.elevation(x, z) - 4, w: size * 0.8, h: wall.height + 8, d: size, rot });
          }
          if (!wall.closed && i === n - 1) {
            towers.push({ x: b[0], z: b[1], y: city.elevation(b[0], b[1]) - 4, w: wall.thick * 1.4 + 3, h: wall.height + 8, d: wall.thick * 1.7 + 4, rot });
          }
        }
        return { wall, pieces, towers };
      }),
    [city],
  );
  return (
    <group>
      {groups.map(({ wall, pieces, towers }) => (
        <group key={wall.label}>
          <Instanced items={pieces} color={wall.color} />
          <Instanced items={towers} color={wall.towerColor ?? wall.color} />
        </group>
      ))}
    </group>
  );
}

function baseY(city: CityDef, b: Block) {
  return city.elevation(b.at[0], b.at[1]) + (b.lift ?? 0);
}

/** Frisos: pequenas placas em relevo nas faces longas de um bloco vidrado. */
function friezeItems(city: CityDef, b: Block): Box[] {
  if (!b.frieze) return [];
  const [w, , d] = b.size;
  const along = w >= d ? "x" : "z";
  const length = Math.max(w, d);
  const half = Math.min(w, d) / 2 + 0.1;
  const y0 = baseY(city, b);
  const out: Box[] = [];
  const rot = b.rot ?? 0;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const opening = b.opening ?? 0;
  for (const row of b.frieze.rows) {
    for (let s = -length / 2 + b.frieze.spacing / 2; s < length / 2; s += b.frieze.spacing) {
      if (b.kind === "gate" && Math.abs(s) < opening / 2 + 1.5) continue;
      for (const side of [-1, 1]) {
        const lx = along === "x" ? s : side * half;
        const lz = along === "x" ? side * half : s;
        out.push({
          x: b.at[0] + lx * cos + lz * sin,
          z: b.at[1] - lx * sin + lz * cos,
          y: y0 + row,
          w: along === "x" ? 2.1 : 0.22,
          h: 1.2,
          d: along === "x" ? 0.22 : 2.1,
          rot,
        });
      }
    }
  }
  return out;
}

/** Colunas de um pórtico, em coordenadas do mundo. */
function columnItems(city: CityDef, b: Block): Box[] {
  if (b.kind !== "colonnade" || !b.columns) return [];
  const [w, h, d] = b.size;
  const { rows, spacing, radius = 0.6 } = b.columns;
  const y0 = baseY(city, b);
  const rot = b.rot ?? 0;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const out: Box[] = [];
  for (let r = 0; r < rows; r += 1) {
    const lz = rows === 1 ? 0 : -d / 2 + 1.2 + ((d - 2.4) * r) / (rows - 1);
    for (let lx = -w / 2 + spacing / 2; lx < w / 2; lx += spacing) {
      out.push({ x: b.at[0] + lx * cos + lz * sin, z: b.at[1] - lx * sin + lz * cos, y: y0 - 0.5, w: radius * 2, h: h - 1, d: radius * 2, rot });
    }
  }
  return out;
}

function Colonnade({ city, b }: { city: CityDef; b: Block }) {
  const y = baseY(city, b) / U;
  const [w, h, d] = b.size;
  const back = b.columns?.back;
  return (
    <group position={[b.at[0] / U, y, b.at[1] / U]} rotation={[0, b.rot ?? 0, 0]}>
      {/* piso */}
      <mesh position={[0, -0.9 / U, 0]}>
        <boxGeometry args={[w / U, 2 / U, d / U]} />
        <meshStandardMaterial color="#d8cdb6" roughness={0.9} flatShading />
      </mesh>
      {/* teto */}
      <mesh position={[0, (h - 0.2) / U, 0]}>
        <boxGeometry args={[(w + 1) / U, 1.6 / U, (d + 1) / U]} />
        <meshStandardMaterial color={b.roof ?? b.color} roughness={0.85} flatShading />
      </mesh>
      {back ? (
        <mesh position={[0, (h / 2 - 1) / U, (back * (d / 2 + 0.6)) / U]}>
          <boxGeometry args={[w / U, (h + 2) / U, 1.6 / U]} />
          <meshStandardMaterial color={b.color} roughness={0.9} flatShading />
        </mesh>
      ) : null}
    </group>
  );
}

function Platforms({ city }: { city: CityDef }) {
  const meshes = useMemo(
    () =>
      (city.platforms ?? []).map((p) => {
        const shape = new THREE.Shape(p.ring.map(([x, z]) => new THREE.Vector2(x / U, -z / U)));
        const bottom = p.level - 90;
        const geo = new THREE.ExtrudeGeometry(shape, { depth: (p.level + 0.15 - bottom) / U, bevelEnabled: false });
        geo.rotateX(-Math.PI / 2);
        geo.translate(0, bottom / U, 0);
        geo.computeVertexNormals();
        return { p, geo };
      }),
    [city],
  );
  return (
    <group>
      {meshes.map(({ p, geo }) => (
        <mesh key={p.label} geometry={geo}>
          {/* grupo 0: tampas (o piso da esplanada); grupo 1: as laterais (muros de arrimo) */}
          <meshStandardMaterial attach="material-0" color={p.top ?? p.color} roughness={0.95} />
          <meshStandardMaterial attach="material-1" color={p.color} roughness={0.92} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function BlockMesh({ city, b }: { city: CityDef; b: Block }) {
  if (b.kind === "colonnade") return <Colonnade city={city} b={b} />;
  const y = baseY(city, b) / U;
  const [w, h, d] = b.size;
  const mat = <meshStandardMaterial color={b.color} roughness={b.kind === "glazed" || b.frieze ? 0.45 : 0.88} metalness={b.frieze ? 0.05 : 0} flatShading />;
  if (b.kind === "tiers" && b.tiers) {
    const base = new THREE.Color(b.color);
    const bottoms = b.tiers.map((_, i) => b.tiers!.slice(0, i).reduce((sum, t) => sum + t[2], 0));
    return (
      <group position={[b.at[0] / U, y, b.at[1] / U]} rotation={[0, b.rot ?? 0, 0]}>
        {b.tiers.map(([tw, td, th], i) => {
          const bottom = bottoms[i];
          const tint = base.clone().offsetHSL(0, -0.03 * i, 0.035 * i);
          return (
            <mesh key={i} position={[0, (bottom + th / 2 - (i === 0 ? 2 : 0)) / U, 0]}>
              <boxGeometry args={[tw / U, (th + (i === 0 ? 4 : 0)) / U, td / U]} />
              <meshStandardMaterial color={tint} roughness={0.9} flatShading />
            </mesh>
          );
        })}
        {b.stair ? (
          <>
            {/* escada monumental do lado sul, até o alto do primeiro patamar */}
            <mesh
              position={[0, b.tiers[0][2] / 2 / U, (b.tiers[0][1] / 2 + b.stair.length / 2) / U]}
              rotation={[Math.atan2(b.tiers[0][2], b.stair.length), 0, 0]}
            >
              <boxGeometry args={[b.stair.width / U, 1.2 / U, Math.hypot(b.stair.length, b.tiers[0][2]) / U]} />
              <meshStandardMaterial color="#c9a477" roughness={0.9} flatShading />
            </mesh>
            <mesh position={[0, (b.tiers[0][2] / 2 - 1) / U, (b.tiers[0][1] / 2 + b.stair.length / 2) / U]}>
              <boxGeometry args={[(b.stair.width + 6) / U, (b.tiers[0][2] - 2) / U, (b.stair.length * 0.55) / U]} />
              <meshStandardMaterial color={b.color} roughness={0.9} flatShading />
            </mesh>
          </>
        ) : null}
      </group>
    );
  }
  if (b.kind === "gate") {
    const open = b.opening ?? 6;
    const side = (w - open) / 2;
    const archTop = Math.min(h - 3, open * 1.8);
    return (
      <group position={[b.at[0] / U, y, b.at[1] / U]} rotation={[0, b.rot ?? 0, 0]}>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[(s * (open / 2 + side / 2)) / U, (h / 2 - 1.5) / U, 0]}>
            <boxGeometry args={[side / U, (h + 3) / U, d / U]} />
            {mat}
          </mesh>
        ))}
        <mesh position={[0, (archTop + (h - archTop) / 2) / U, 0]}>
          <boxGeometry args={[open / U, (h - archTop) / U, d / U]} />
          {mat}
        </mesh>
        {/* ameias */}
        {Array.from({ length: Math.max(2, Math.floor(w / 4)) }, (_, i) => (
          <mesh key={i} position={[(-w / 2 + 2 + i * 4) / U, (h + 0.9) / U, 0]}>
            <boxGeometry args={[2.2 / U, 1.8 / U, d / U]} />
            {mat}
          </mesh>
        ))}
      </group>
    );
  }
  return (
    <group position={[b.at[0] / U, y, b.at[1] / U]} rotation={[0, b.rot ?? 0, 0]}>
      <mesh position={[0, (h / 2 - 2) / U, 0]}>
        <boxGeometry args={[w / U, (h + 4) / U, d / U]} />
        {mat}
      </mesh>
      {b.roof ? (
        <mesh position={[0, h / U + 0.02, 0]}>
          <boxGeometry args={[(w + 0.6) / U, 0.05, (d + 0.6) / U]} />
          <meshStandardMaterial color={b.roof} roughness={0.85} />
        </mesh>
      ) : null}
    </group>
  );
}

function Blocks({ city }: { city: CityDef }) {
  const columns = useMemo(() => {
    const byColor = new Map<string, Box[]>();
    for (const b of city.blocks) {
      if (b.kind !== "colonnade") continue;
      const color = b.columns?.color ?? "#efe6d2";
      const list = byColor.get(color) ?? [];
      list.push(...columnItems(city, b));
      byColor.set(color, list);
    }
    return [...byColor.entries()];
  }, [city]);
  const frieze = useMemo(() => {
    const byColor = new Map<string, Box[]>();
    for (const b of city.blocks) {
      if (!b.frieze) continue;
      const list = byColor.get(b.frieze.color) ?? [];
      list.push(...friezeItems(city, b));
      byColor.set(b.frieze.color, list);
    }
    return [...byColor.entries()];
  }, [city]);
  return (
    <group>
      {city.blocks.map((b) => (
        <BlockMesh key={b.id} city={city} b={b} />
      ))}
      {frieze.map(([color, items]) => (
        <Instanced key={color} items={items} color={color} roughness={0.4} />
      ))}
      {columns.map(([color, items]) => (
        <Instanced key={`c${color}`} items={items} color={color} roughness={0.6} shape="cyl" />
      ))}
    </group>
  );
}

function inBlock(b: Block, x: number, z: number, margin: number) {
  const rot = b.rot ?? 0;
  const dx = x - b.at[0];
  const dz = z - b.at[1];
  const lx = dx * Math.cos(rot) - dz * Math.sin(rot);
  const lz = dx * Math.sin(rot) + dz * Math.cos(rot);
  const w = b.kind === "tiers" && b.tiers ? b.tiers[0][0] : b.size[0];
  const d = b.kind === "tiers" && b.tiers ? b.tiers[0][1] + (b.stair ? b.stair.length * 2 : 0) : b.size[2];
  return Math.abs(lx) < w / 2 + margin && Math.abs(lz) < d / 2 + margin;
}

function Houses({ city }: { city: CityDef }) {
  const { items, colors } = useMemo(() => {
    const items: Box[] = [];
    const colors: THREE.Color[] = [];
    for (const zone of city.zones) {
      const rand = mulberry32(zone.seed);
      const xs = zone.ring.map((p) => p[0]);
      const zs = zone.ring.map((p) => p[1]);
      const [x0, x1, z0, z1] = [Math.min(...xs), Math.max(...xs), Math.min(...zs), Math.max(...zs)];
      const a = new THREE.Color(zone.colors[0]);
      const b = new THREE.Color(zone.colors[1]);
      const placed: Box[] = [];
      let guard = 0;
      while (placed.length < zone.count && guard < zone.count * 30) {
        guard += 1;
        let x = x0 + rand() * (x1 - x0);
        let z = z0 + rand() * (z1 - z0);
        const w = zone.size[0] + rand() * (zone.size[1] - zone.size[0]);
        const d = zone.size[0] + rand() * (zone.size[1] - zone.size[0]);
        if (zone.grid) {
          x = Math.round(x / zone.grid) * zone.grid + ((w % 4) - 2);
          z = Math.round(z / zone.grid) * zone.grid;
        }
        if (!pointInRing(x, z, zone.ring)) continue;
        const ground = city.elevation(x, z);
        if (zone.maxH !== undefined && ground > zone.maxH) continue;
        if (zone.minH !== undefined && ground < zone.minH) continue;
        if (city.blocks.some((bl) => inBlock(bl, x, z, 12))) continue;
        if (city.waters.some((wa) => distToPath(x, z, wa.path, wa.closed) < wa.width / 2 + 14)) continue;
        if (city.roads.some((r) => distToPath(x, z, r.path) < r.width / 2 + 5)) continue;
        if (city.walls.some((wl) => distToPath(x, z, wl.ring, wl.closed) < wl.thick / 2 + 14)) continue;
        if (placed.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 + 1 && Math.abs(o.z - z) < (o.d + d) / 2 + 1)) continue;
        const h = zone.height[0] + rand() * (zone.height[1] - zone.height[0]);
        const box = { x, z, y: ground - 2, w, d, h: h + 2, rot: zone.grid ? 0 : (rand() - 0.5) * 0.6 };
        placed.push(box);
        items.push(box);
        colors.push(a.clone().lerp(b, rand()));
      }
    }
    return { items, colors };
  }, [city]);
  return <Instanced items={items} colors={colors} roughness={0.93} />;
}

function Trees({ city }: { city: CityDef }) {
  const sets = useMemo(
    () =>
      city.trees.map((def) => {
        const rand = mulberry32(def.seed);
        const [x0, x1, z0, z1] = def.area;
        const trunks: Box[] = [];
        const crowns: Box[] = [];
        let guard = 0;
        while (trunks.length < def.count && guard < def.count * 40) {
          guard += 1;
          const x = x0 + rand() * (x1 - x0);
          const z = z0 + rand() * (z1 - z0);
          if (def.inside && !def.inside.some((ring) => pointInRing(x, z, ring))) continue;
          if (def.avoid?.some((ring) => pointInRing(x, z, ring))) continue;
          if (def.near && !def.near.some((n) => distToPath(x, z, n.path) < n.dist)) continue;
          if (city.waters.some((wa) => distToPath(x, z, wa.path, wa.closed) < wa.width / 2 + 6)) continue;
          if (city.walls.some((wl) => distToPath(x, z, wl.ring, wl.closed) < wl.thick + 8)) continue;
          if (city.blocks.some((bl) => inBlock(bl, x, z, 4))) continue;
          const y = city.elevation(x, z);
          const s = 0.75 + rand() * 0.5;
          if (def.kind === "palmeira") {
            trunks.push({ x, z, y: y - 0.5, w: 0.6, d: 0.6, h: 13 * s, rot: rand() * 3 });
            crowns.push({ x, z, y: y + 12 * s, w: 7 * s, d: 7 * s, h: 2.4 * s, rot: rand() * 3 });
          } else {
            trunks.push({ x, z, y: y - 0.5, w: 0.7, d: 0.7, h: 2.5 * s, rot: rand() * 3 });
            crowns.push({ x, z, y: y + 1.8 * s, w: 5 * s, d: 5 * s, h: 3.6 * s, rot: rand() * 3 });
          }
        }
        return { def, trunks, crowns };
      }),
    [city],
  );
  return (
    <group>
      {sets.map(({ def, trunks, crowns }) => (
        <group key={def.seed}>
          <Instanced items={trunks} color={def.kind === "palmeira" ? "#7a5d3c" : "#6a5a45"} />
          <Instanced items={crowns} color={def.kind === "palmeira" ? "#4f6a2e" : "#7d8a5c"} roughness={1} />
        </group>
      ))}
    </group>
  );
}

function HotspotMarker({ city, spot, active, onSelect, walk }: { city: CityDef; spot: CityHotspot; active: boolean; onSelect: (id: string) => void; walk: boolean }) {
  const [x, z] = spot.at;
  const y = (city.elevation(x, z) + (spot.y ?? 0)) / U;
  const stem = walk ? 1.2 : 3.2;
  return (
    <group position={[x / U, y, z / U]}>
      <mesh position={[0, stem, 0]} onClick={(e) => { e.stopPropagation(); onSelect(spot.id); }}>
        <octahedronGeometry args={[(active ? 0.75 : 0.55) * (walk ? 0.45 : 1), 0]} />
        <meshStandardMaterial color={active ? "#fff3cf" : "#e4c78a"} emissive="#e4c78a" emissiveIntensity={active ? 1.2 : 0.6} />
      </mesh>
      <mesh position={[0, stem / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, stem, 6]} />
        <meshBasicMaterial color="#e4c78a" transparent opacity={0.6} />
      </mesh>
      <Html position={[0, stem + 1, 0]} center zIndexRange={[20, 0]} distanceFactor={walk ? 8 : undefined}>
        <button
          type="button"
          onClick={() => onSelect(spot.id)}
          className={`whitespace-nowrap rounded-full border px-2.5 py-1 font-sans text-[11px] shadow-lg backdrop-blur ${
            active ? "border-gold bg-gold text-[#1a140c]" : "border-gold/40 bg-[#090d14]/75 text-[#f4eee6]"
          }`}
        >
          {spot.name}
        </button>
      </Html>
    </group>
  );
}

function OrbitRig({ city, resetKey, view }: { city: CityDef; resetKey: number; view: number }) {
  const { camera } = useThree();
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const preset = view > 0 ? city.views?.[view - 1] : undefined;
  const position = preset?.position ?? city.orbit.position;
  const target = preset?.target ?? city.orbit.target;
  const { maxDistance } = city.orbit;
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...target);
    const c = controls.current;
    if (c) {
      c.target.set(...target);
      c.update();
    }
  }, [camera, resetKey, position, target]);
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={target}
      maxPolarAngle={1.42}
      minDistance={4}
      maxDistance={maxDistance}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

/** Caminhar: WASD/setas, arrastar para olhar, joystick no celular. Altura dos olhos: 1,7 m. */
function WalkRig({ city, input, resetKey }: { city: CityDef; input: React.MutableRefObject<WalkInput>; resetKey: number }) {
  const { camera, gl, invalidate } = useThree();
  const yaw = useRef(city.walk.yaw);
  const pitch = useRef(0.04);
  const pos = useRef(new THREE.Vector3(city.walk.start[0] / U, 0, city.walk.start[1] / U));
  const solids = useMemo(() => city.blocks.filter((b) => b.solid), [city]);
  const decks = useMemo(() => city.blocks.filter((b) => b.walkable), [city]);

  useEffect(() => {
    yaw.current = city.walk.yaw;
    pitch.current = 0.04;
    pos.current.set(city.walk.start[0] / U, 0, city.walk.start[1] / U);
    invalidate();
  }, [resetKey, invalidate, city]);

  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let lx = 0;
    let ly = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      input.current.look.dx += e.clientX - lx;
      input.current.look.dy += e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl, input]);

  /* O ref de entrada é compartilhado com o loop do three.js de propósito: ler e zerar a cada quadro, sem re-render. */
  /* eslint-disable react-hooks/immutability */
  useFrame((_, delta) => {
    const i = input.current;
    const dt = Math.min(delta, 0.05);
    yaw.current -= i.look.dx * 0.004;
    pitch.current = Math.max(-1.1, Math.min(1.1, pitch.current - i.look.dy * 0.003));
    i.look.dx = 0;
    i.look.dy = 0;
    if (i.teleport) {
      const [tx, tz] = i.teleport;
      // para ao lado do lugar, fora de prédios maciços
      // longe o bastante para ver o prédio inteiro: mais longe dos altos
      const tall = solids.filter((b) => inBlock(b, tx, tz, 60)).reduce((m, b) => Math.max(m, b.size[1]), 0);
      const margin = Math.max(30, tall * 1.2);
      let best: XZ = [tx, tz + 40];
      for (let r = 30; r < 420; r += 10) {
        const found = [0, 1, 7, 2, 6, 3, 5, 4]
          .map((k) => [tx + Math.sin((k * Math.PI) / 4) * r, tz + Math.cos((k * Math.PI) / 4) * r] as XZ)
          .find(([x, z]) => !solids.some((b) => inBlock(b, x, z, margin)) && !city.walls.some((w) => distToPath(x, z, w.ring, w.closed) < w.thick / 2 + 60));
        if (found) {
          best = found;
          break;
        }
      }
      pos.current.set(best[0] / U, 0, best[1] / U);
      yaw.current = Math.atan2(best[0] - tx, best[1] - tz);
      pitch.current = 0.18;
      i.teleport = null;
    }
    const k = i.keys;
    let f = i.joy.y;
    let s = i.joy.x;
    if (k.has("w") || k.has("arrowup")) f += 1;
    if (k.has("s") || k.has("arrowdown")) f -= 1;
    if (k.has("d")) s += 1;
    if (k.has("a")) s -= 1;
    if (k.has("arrowleft")) yaw.current += 1.6 * dt;
    if (k.has("arrowright")) yaw.current -= 1.6 * dt;
    const run = k.has("shift") ? 4 : 1;
    const speed = 1.1 * run;
    const fx = -Math.sin(yaw.current);
    const fz = -Math.cos(yaw.current);
    const t = city.terrain;
    const nx = Math.max(t.minX / U + 2, Math.min(t.maxX / U - 2, pos.current.x + (fx * f + -fz * s) * speed * dt));
    const nz = Math.max(t.minZ / U + 2, Math.min(t.maxZ / U - 2, pos.current.z + (fz * f + fx * s) * speed * dt));
    const blocked = (x: number, z: number) => solids.some((b) => inBlock(b, x * U, z * U, 1));
    if (!blocked(nx, nz)) {
      pos.current.x = nx;
      pos.current.z = nz;
    } else if (!blocked(nx, pos.current.z)) {
      pos.current.x = nx;
    } else if (!blocked(pos.current.x, nz)) {
      pos.current.z = nz;
    }
    let ground = city.elevation(pos.current.x * U, pos.current.z * U);
    for (const b of decks) {
      if (inBlock(b, pos.current.x * U, pos.current.z * U, 0)) ground = Math.max(ground, baseY(city, b) + b.size[1]);
    }
    for (const w of city.waters) {
      if (distToPath(pos.current.x * U, pos.current.z * U, w.path, w.closed) < w.width / 2) ground = Math.max(ground, city.waterLevel);
    }
    pos.current.y = ground / U + 0.17;
    camera.position.copy(pos.current);
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
  });
  /* eslint-enable react-hooks/immutability */
  return null;
}

export function CityModel({ slug, mode, selected, onSelect, input, resetKey, view = 0 }: CityModelProps) {
  const city = getCity(slug);

  const walk = mode === "caminhar";
  if (!city) return null;
  const [fogNear, fogFar] = walk ? city.sky.fogWalk : city.sky.fogOrbit;
  return (
    <Canvas
      frameloop={walk ? "always" : "demand"}
      dpr={[1, 1.6]}
      camera={{ position: city.orbit.position, fov: walk ? 62 : 45, near: 0.05, far: 3000 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[city.sky.background]} />
      <fog attach="fog" args={[city.sky.fog, fogNear, fogFar]} />
      <hemisphereLight args={["#ffe6bd", "#6a5636", 1.1]} />
      <directionalLight position={city.sky.sun} intensity={2.1} color="#ffd59a" />
      <ambientLight intensity={0.42} />
      <Terrain city={city} />
      <Waters city={city} />
      <Platforms city={city} />
      <Walls city={city} />
      <Blocks city={city} />
      <Houses city={city} />
      <Trees city={city} />
      {/* O primeiro rótulo drei Html montado fica vazio neste ambiente; este rótulo vazio absorve o problema. */}
      <Html position={[0, -500, 0]} zIndexRange={[0, 0]} style={{ display: "none" }}>
        <span aria-hidden />
      </Html>
      {city.hotspots.map((spot) => (
        <HotspotMarker key={spot.id} city={city} spot={spot} active={spot.id === selected} onSelect={onSelect} walk={walk} />
      ))}
      {walk ? <WalkRig city={city} input={input} resetKey={resetKey} /> : <OrbitRig city={city} resetKey={resetKey} view={view} />}
    </Canvas>
  );
}

export default CityModel;
