"use client";

import { Html, OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import {
  TEMPLE,
  TERRAIN,
  buildings,
  elevation,
  hotspots,
  pointInRing,
  tunnel,
  walls,
  type Era,
  type Hotspot,
  type XZ,
} from "@/lib/historia/jerusalem";

/** 1 unidade = 10 m. y = (cota − 600 m) / 10. */
const U = 10;
const ZERO = 600;
const yAt = (x: number, z: number) => (elevation(x, z) - ZERO) / U;

export type WalkInput = {
  keys: Set<string>;
  joy: { x: number; y: number };
  look: { dx: number; dy: number };
  teleport: XZ | null;
};

export type ModelProps = {
  era: Era;
  mode: "orbita" | "caminhar";
  selected: string | null;
  onSelect: (id: string) => void;
  input: React.MutableRefObject<WalkInput>;
  resetKey: number;
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Terrain() {
  const geometry = useMemo(() => {
    const w = (TERRAIN.maxX - TERRAIN.minX) / U;
    const d = (TERRAIN.maxZ - TERRAIN.minZ) / U;
    const seg = 150;
    const geo = new THREE.PlaneGeometry(w, d, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const cx = (TERRAIN.minX + TERRAIN.maxX) / 2 / U;
    const cz = (TERRAIN.minZ + TERRAIN.maxZ) / 2 / U;
    geo.translate(cx, 0, cz);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const rock = new THREE.Color("#b9a27c");
    const soil = new THREE.Color("#8a7350");
    const green = new THREE.Color("#6f7a45");
    const low = new THREE.Color("#5f6b3c");
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i) * U;
      const z = pos.getZ(i) * U;
      const h = elevation(x, z);
      pos.setY(i, (h - ZERO) / U);
      const slope = Math.abs(elevation(x + 6, z) - elevation(x - 6, z)) + Math.abs(elevation(x, z + 6) - elevation(x, z - 6));
      const t = Math.min(1, slope / 9);
      c.copy(h < 650 ? low : green).lerp(soil, 0.35).lerp(rock, t);
      const n = Math.sin(x * 0.07) * Math.cos(z * 0.05) * 0.04;
      colors[i * 3] = c.r + n;
      colors[i * 3 + 1] = c.g + n;
      colors[i * 3 + 2] = c.b + n;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.95} metalness={0} flatShading />
    </mesh>
  );
}

type Piece = { x: number; y: number; z: number; len: number; rot: number; h: number; t: number };

function wallPieces(rings: XZ[][], thick: (index: number) => number): { pieces: Piece[]; towers: Piece[] } {
  const pieces: Piece[] = [];
  const towers: Piece[] = [];
  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.length; i += 1) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const steps = Math.max(1, Math.round(len / 22));
      const rot = -Math.atan2(b[1] - a[1], b[0] - a[0]);
      for (let s = 0; s < steps; s += 1) {
        const t0 = (s + 0.5) / steps;
        const x = a[0] + (b[0] - a[0]) * t0;
        const z = a[1] + (b[1] - a[1]) * t0;
        pieces.push({ x, z, y: elevation(x, z), len: len / steps + 1.5, rot, h: 9, t: thick(ri) });
      }
      towers.push({ x: a[0], z: a[1], y: elevation(a[0], a[1]), len: 12, rot, h: 13, t: 12 });
    }
  });
  return { pieces, towers };
}

function Boxes({ items, color }: { items: Piece[]; color: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    items.forEach((p, i) => {
      e.set(0, p.rot, 0);
      q.setFromEuler(e);
      m.compose(
        new THREE.Vector3(p.x / U, (p.y - ZERO + p.h / 2 - 3) / U, p.z / U),
        q,
        new THREE.Vector3(p.len / U, (p.h + 3) / U, p.t / U),
      );
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);
  return (
    <instancedMesh key={items.length} ref={ref} args={[undefined, undefined, items.length]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </instancedMesh>
  );
}

function Walls({ era }: { era: Era }) {
  const { pieces, towers } = useMemo(() => {
    const rings = walls[era].map((wall) => wall.ring);
    return wallPieces(rings, (ri) => (era === "ezequias" && ri === 1 ? 7 : 4));
  }, [era]);
  return (
    <group>
      <Boxes items={pieces} color="#d1bf9a" />
      <Boxes items={towers} color="#c4b08a" />
    </group>
  );
}

const HOUSE_COUNT: Record<Era, number> = { davi: 140, salomao: 260, ezequias: 820 };

function Houses({ era }: { era: Era }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const rand = mulberry32(era === "davi" ? 7 : era === "salomao" ? 11 : 19);
    const rings = walls[era].map((wall) => wall.ring);
    const blocked: { at: XZ; r: number }[] = [
      { at: TEMPLE.at, r: 70 },
      ...buildings.filter((b) => b.eras.includes(era)).map((b) => ({ at: b.at, r: Math.max(b.size[0], b.size[2]) * 0.8 })),
    ];
    const out: { x: number; z: number; w: number; d: number; h: number; rot: number; tint: number }[] = [];
    let guard = 0;
    while (out.length < HOUSE_COUNT[era] && guard < 40000) {
      guard += 1;
      const x = -500 + rand() * 820;
      const z = -600 + rand() * 1100;
      if (!rings.some((ring) => pointInRing(x, z, ring))) continue;
      if (blocked.some((b) => Math.hypot(b.at[0] - x, b.at[1] - z) < b.r)) continue;
      const w = 7 + rand() * 7;
      const d = 7 + rand() * 6;
      if (out.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 && Math.abs(o.z - z) < (o.d + d) / 2)) continue;
      out.push({ x, z, w, d, h: 3.5 + rand() * 3.5, rot: (rand() - 0.5) * 0.5, tint: rand() });
    }
    return out;
  }, [era]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const c = new THREE.Color();
    const stone = new THREE.Color("#cdb995");
    const mud = new THREE.Color("#a98d66");
    items.forEach((h, i) => {
      const y = elevation(h.x, h.z);
      q.setFromEuler(new THREE.Euler(0, h.rot, 0));
      m.compose(new THREE.Vector3(h.x / U, (y - ZERO + h.h / 2 - 2) / U, h.z / U), q, new THREE.Vector3(h.w / U, (h.h + 2) / U, h.d / U));
      mesh.setMatrixAt(i, m);
      c.copy(stone).lerp(mud, h.tint);
      mesh.setColorAt(i, c);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);

  return (
    <instancedMesh key={`${era}-${items.length}`} ref={ref} args={[undefined, undefined, items.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial roughness={0.92} flatShading />
    </instancedMesh>
  );
}

function Trees({ era }: { era: Era }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(() => {
    const rand = mulberry32(3);
    const rings = walls[era].map((wall) => wall.ring);
    const out: { x: number; z: number; s: number }[] = [];
    let guard = 0;
    while (out.length < 650 && guard < 20000) {
      guard += 1;
      const x = -850 + rand() * 1800;
      const z = -950 + rand() * 1850;
      if (rings.some((ring) => pointInRing(x, z, ring))) continue;
      if (rings.some((ring) => ring.some(([rx, rz]) => Math.hypot(rx - x, rz - z) < 35))) continue;
      if (rand() < 0.35 && x < 380) continue;
      out.push({ x, z, s: 0.6 + rand() * 0.6 });
    }
    return out;
  }, [era]);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    items.forEach((t, i) => {
      const y = elevation(t.x, t.z);
      m.compose(new THREE.Vector3(t.x / U, (y - ZERO + 3 * t.s) / U, t.z / U), new THREE.Quaternion(), new THREE.Vector3(0.55 * t.s, 0.45 * t.s, 0.55 * t.s));
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [items]);
  return (
    <instancedMesh key={`${era}-${items.length}`} ref={ref} args={[undefined, undefined, items.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#56623a" roughness={1} flatShading />
    </instancedMesh>
  );
}

/** Templo de Salomão, em escala (côvado ≈ 0,52 m), entrada a leste (+x). */
function Temple() {
  const [tx, tz] = TEMPLE.at;
  const y = (elevation(tx, tz) - ZERO) / U;
  const c = 0.52 / U;
  return (
    <group position={[tx / U, y, tz / U]}>
      {/* plataforma e pátio interno */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[14, 1.4, 9]} />
        <meshStandardMaterial color="#c9b48d" roughness={0.95} flatShading />
      </mesh>
      {[
        [0, 0.25, -4.4, 14, 0.5, 0.25],
        [0, 0.25, 4.4, 14, 0.5, 0.25],
        [-6.9, 0.25, 0, 0.25, 0.5, 9],
        [6.9, 0.25, -2.6, 0.25, 0.5, 3.8],
        [6.9, 0.25, 2.6, 0.25, 0.5, 3.8],
      ].map(([x, yy, z, w, h, d]) => (
        <mesh key={`${x}-${z}`} position={[x, yy, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#d8c6a0" roughness={0.9} flatShading />
        </mesh>
      ))}
      {/* câmaras laterais (3 andares) */}
      <mesh position={[-0.6, 0.47 + 0.0, 0]}>
        <boxGeometry args={[70 * c, 18 * c, 32 * c]} />
        <meshStandardMaterial color="#cbb791" roughness={0.9} flatShading />
      </mesh>
      {/* casa: 60 × 20 × 30 côvados */}
      <mesh position={[-0.6, 15 * c, 0]}>
        <boxGeometry args={[60 * c, 30 * c, 20 * c]} />
        <meshStandardMaterial color="#e3d2ad" roughness={0.8} flatShading />
      </mesh>
      {/* telhado de cedro */}
      <mesh position={[-0.6, 30 * c + 0.03, 0]}>
        <boxGeometry args={[61 * c, 0.06, 21 * c]} />
        <meshStandardMaterial color="#6b4a2f" roughness={0.8} />
      </mesh>
      {/* pórtico: 20 côvados de largura, 10 de fundo */}
      <mesh position={[-0.6 + 35 * c, 13 * c, 0]}>
        <boxGeometry args={[10 * c, 26 * c, 20 * c]} />
        <meshStandardMaterial color="#e9dab7" roughness={0.8} flatShading />
      </mesh>
      {/* Jaquim e Boaz: 18 côvados */}
      {[-6, 6].map((z) => (
        <mesh key={z} position={[-0.6 + 41 * c, 9 * c, z * c]}>
          <cylinderGeometry args={[0.95 * c * 2, 0.95 * c * 2, 18 * c, 14]} />
          <meshStandardMaterial color="#b0793f" metalness={0.3} roughness={0.45} emissive="#3a2210" emissiveIntensity={0.25} />
        </mesh>
      ))}
      {/* altar de bronze: 20 × 20 × 10 côvados (2 Cr 4:1) */}
      <mesh position={[4.4, 5 * c, 0]}>
        <boxGeometry args={[20 * c, 10 * c, 20 * c]} />
        <meshStandardMaterial color="#8a5a32" metalness={0.25} roughness={0.55} emissive="#2a1808" emissiveIntensity={0.25} />
      </mesh>
      {/* mar de fundição: 10 côvados de diâmetro, 5 de altura, ao sudeste */}
      <mesh position={[2.6, 2.5 * c + 3 * c, 2.8]}>
        <cylinderGeometry args={[5 * c, 4.2 * c, 5 * c, 24]} />
        <meshStandardMaterial color="#a4703f" metalness={0.3} roughness={0.45} emissive="#3a2210" emissiveIntensity={0.25} />
      </mesh>
      {/* os doze bois sob o mar, simplificados */}
      <mesh position={[2.6, 1.5 * c, 2.8]}>
        <cylinderGeometry args={[4.4 * c, 4.4 * c, 3 * c, 12]} />
        <meshStandardMaterial color="#8a5a32" metalness={0.25} roughness={0.55} emissive="#2a1808" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Buildings({ era }: { era: Era }) {
  return (
    <group>
      {buildings
        .filter((b) => b.eras.includes(era))
        .map((b) => {
          const y = (elevation(b.at[0], b.at[1]) - ZERO) / U;
          const [w, h, d] = b.size;
          return (
            <group key={b.id} position={[b.at[0] / U, y, b.at[1] / U]} rotation={[0, b.rot ?? 0, 0]}>
              <mesh position={[0, (h / 2 - 3) / U, 0]}>
                <boxGeometry args={[w / U, (h + 6) / U, d / U]} />
                <meshStandardMaterial color={b.color} roughness={0.85} flatShading />
              </mesh>
              <mesh position={[0, h / U + 0.02, 0]}>
                <boxGeometry args={[(w + 1) / U, 0.05, (d + 1) / U]} />
                <meshStandardMaterial color="#6b4a2f" roughness={0.8} />
              </mesh>
            </group>
          );
        })}
      {/* Estrutura de Pedras em Degraus: arrimo na encosta leste */}
      <mesh position={[176 / U, yAt(176, -45) + 0.2, -45 / U]} rotation={[0, 0, 0.62]}>
        <boxGeometry args={[4.2, 0.6, 3.6]} />
        <meshStandardMaterial color="#cdbb94" roughness={0.95} flatShading />
      </mesh>
    </group>
  );
}

function Water({ era }: { era: Era }) {
  const tube = useMemo(() => {
    const pts = tunnel.map(([x, z]) => new THREE.Vector3(x / U, yAt(x, z) + 0.25, z / U));
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.12, 6, false);
  }, []);
  const [gx, gz] = [227, 122];
  return (
    <group>
      <mesh position={[gx / U, yAt(gx, gz) + 0.08, gz / U]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 20]} />
        <meshStandardMaterial color="#5fb3d9" emissive="#1d5f80" emissiveIntensity={0.6} roughness={0.2} />
      </mesh>
      {era === "ezequias" ? (
        <>
          <mesh geometry={tube}>
            <meshStandardMaterial color="#7fd6ff" emissive="#3aa8e0" emissiveIntensity={1.2} transparent opacity={0.85} />
          </mesh>
          <mesh position={[57 / U, yAt(57, 411) + 0.1, 411 / U]} rotation={[-Math.PI / 2, 0, 0.3]}>
            <planeGeometry args={[4.5, 2.2]} />
            <meshStandardMaterial color="#4f9fc4" emissive="#1d5f80" emissiveIntensity={0.5} roughness={0.15} />
          </mesh>
        </>
      ) : null}
    </group>
  );
}

function HotspotMarker({ spot, active, onSelect, walk }: { spot: Hotspot; active: boolean; onSelect: (id: string) => void; walk: boolean }) {
  const [x, z] = spot.at;
  const y = yAt(x, z);
  return (
    <group position={[x / U, y, z / U]}>
      <mesh position={[0, walk ? 1.2 : 2.4, 0]} onClick={(e) => { e.stopPropagation(); onSelect(spot.id); }}>
        <octahedronGeometry args={[active ? 0.55 : 0.4, 0]} />
        <meshStandardMaterial color={active ? "#fff3cf" : "#e4c78a"} emissive="#e4c78a" emissiveIntensity={active ? 1.2 : 0.6} />
      </mesh>
      <mesh position={[0, walk ? 0.6 : 1.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, walk ? 1.2 : 2.4, 6]} />
        <meshBasicMaterial color="#e4c78a" transparent opacity={0.6} />
      </mesh>
      <Html position={[0, walk ? 1.9 : 3.3, 0]} center zIndexRange={[20, 0]} distanceFactor={walk ? 6 : undefined}>
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

function OrbitRig({ resetKey }: { resetKey: number }) {
  const { camera } = useThree();
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  useEffect(() => {
    camera.position.set(52, 46, 58);
    camera.lookAt(10, 9, -12);
    const c = controls.current;
    if (c) {
      c.target.set(10, 9, -12);
      c.update();
    }
  }, [camera, resetKey]);
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={[10, 9, -12]}
      maxPolarAngle={1.42}
      minDistance={6}
      maxDistance={150}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

/** Caminhar: WASD/setas, arrastar para olhar, joystick no celular. Altura dos olhos: 1,7 m. */
function WalkRig({ input, resetKey, era }: { input: React.MutableRefObject<WalkInput>; resetKey: number; era: Era }) {
  const { camera, gl, invalidate } = useThree();
  const yaw = useRef(-2.1);
  const pitch = useRef(-0.05);
  const pos = useRef(new THREE.Vector3(260 / U, 0, 160 / U));

  useEffect(() => {
    // começa no pátio, a leste do Templo (ou da eira, no tempo de Davi), olhando para o oeste
    yaw.current = Math.PI / 2 - 0.12;
    pitch.current = 0.04;
    pos.current.set(190 / U, 0, -440 / U);
    invalidate();
  }, [resetKey, invalidate]);

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
      pos.current.set(tx / U + 2.5, 0, tz / U + 2.5);
      yaw.current = Math.PI / 4;
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
    const run = k.has("shift") ? 3 : 1;
    const speed = 0.9 * run; // 9 m/s; um passo de visita rápida
    const fx = -Math.sin(yaw.current);
    const fz = -Math.cos(yaw.current);
    pos.current.x += (fx * f + -fz * s) * speed * dt;
    pos.current.z += (fz * f + fx * s) * speed * dt;
    pos.current.x = Math.max(TERRAIN.minX / U + 2, Math.min(TERRAIN.maxX / U - 2, pos.current.x));
    pos.current.z = Math.max(TERRAIN.minZ / U + 2, Math.min(TERRAIN.maxZ / U - 2, pos.current.z));
    let ground = yAt(pos.current.x * U, pos.current.z * U);
    if (era !== "davi") {
      const [tx, tz] = TEMPLE.at;
      if (Math.abs(pos.current.x - tx / U) < 7 && Math.abs(pos.current.z - tz / U) < 4.5) {
        ground = Math.max(ground, yAt(tx, tz) + 0.1);
      }
    }
    pos.current.y = ground + 0.17;
    camera.position.copy(pos.current);
    camera.rotation.set(pitch.current, yaw.current, 0, "YXZ");
  });
  /* eslint-enable react-hooks/immutability */
  return null;
}

export function CityModel({ era, mode, selected, onSelect, input, resetKey }: ModelProps) {
  const walk = mode === "caminhar";
  const visible = hotspots.filter((spot) => spot.eras.includes(era));
  return (
    <Canvas
      frameloop={walk ? "always" : "demand"}
      dpr={[1, 1.6]}
      camera={{ position: [52, 46, 58], fov: walk ? 62 : 45, near: 0.05, far: 900 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={() => undefined}
    >
      <color attach="background" args={["#e8c99a"]} />
      <fog attach="fog" args={["#e3c595", walk ? 35 : 90, walk ? 180 : 320]} />
      <Sky distance={4500} sunPosition={[-60, 9, -35]} turbidity={7} rayleigh={1.6} mieCoefficient={0.006} mieDirectionalG={0.85} />
      <hemisphereLight args={["#ffe6bd", "#4a3b26", 0.9]} />
      <directionalLight position={[-70, 45, -30]} intensity={2.1} color="#ffd59a" />
      <ambientLight intensity={0.18} />
      <Terrain />
      <Walls era={era} />
      <Houses era={era} />
      <Trees era={era} />
      {era === "davi" ? null : <Temple />}
      <Buildings era={era} />
      <Water era={era} />
      {/* O primeiro rótulo drei Html montado fica vazio; este rótulo oculto absorve o problema. */}
      <Html position={[0, -500, 0]} zIndexRange={[0, 0]} style={{ display: "none" }}>
        <span aria-hidden />
      </Html>
      {visible.map((spot) => (
        <HotspotMarker key={spot.id} spot={spot} active={spot.id === selected} onSelect={onSelect} walk={walk} />
      ))}
      {walk ? <WalkRig input={input} resetKey={resetKey} era={era} /> : <OrbitRig resetKey={resetKey} />}
    </Canvas>
  );
}

export default CityModel;
