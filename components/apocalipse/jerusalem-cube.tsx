"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

function hasWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const gates = [-0.62, 0, 0.62];

function Pearl({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.11, 24, 24]} />
      <meshStandardMaterial color="#f4eee6" roughness={0.15} metalness={0.05} />
    </mesh>
  );
}

function City() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#243044" metalness={0.25} roughness={0.35} transparent opacity={0.55} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.04, 2.04, 2.04]} />
        <meshBasicMaterial color="#e4c78a" wireframe />
      </mesh>
      {gates.flatMap((y) => [
        <Pearl key={`e${y}`} position={[1.08, y, 0.55]} />,
        <Pearl key={`w${y}`} position={[-1.08, y, -0.55]} />,
        <Pearl key={`n${y}`} position={[0.55, y, -1.08]} />,
        <Pearl key={`s${y}`} position={[-0.55, y, 1.08]} />,
      ])}
      <mesh position={[0, -0.15, 1.08]}>
        <boxGeometry args={[0.1, 1.35, 0.05]} />
        <meshStandardMaterial color="#7eb0e0" emissive="#1d4c74" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0.38, -0.35, 1.1]}>
        <cylinderGeometry args={[0.045, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#6d4c32" />
      </mesh>
      <mesh position={[0.38, 0.08, 1.1]}>
        <coneGeometry args={[0.24, 0.42, 10]} />
        <meshStandardMaterial color="#8fd0b4" />
      </mesh>
    </group>
  );
}

function FlatCity() {
  return (
    <svg viewBox="0 0 640 420" className="h-auto w-full" role="img" aria-label="Cubo da nova Jerusalém em desenho">
      <rect width="640" height="420" fill="#10161f" />
      <path d="M140 250 L320 140 L500 250 L320 360 Z" fill="#182230" stroke="#e4c78a" strokeWidth="2" />
      <path d="M140 250 L320 140 L320 70 L140 180 Z" fill="#243044" stroke="#e4c78a" />
      <path d="M320 140 L500 250 L500 180 L320 70 Z" fill="#1c2836" stroke="#e4c78a" />
      <path d="M320 70 C340 160 340 250 320 360" fill="none" stroke="#7eb0e0" strokeWidth="4" />
      <circle cx="360" cy="150" r="16" fill="#8fd0b4" />
      <text x="320" y="400" textAnchor="middle" fill="#e4c78a" fontSize="16" fontFamily="Georgia, serif">
        doze mil estádios · doze portas · doze fundamentos
      </text>
    </svg>
  );
}

export function JerusalemCube() {
  const [webgl] = useState(hasWebGL);

  if (!webgl) {
    return (
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
        <FlatCity />
        <p className="px-4 py-3 text-sm text-muted-foreground">
          Este navegador não abriu o cubo em três dimensões. O desenho acima guarda a medida do
          texto: arestas iguais, rio e árvore.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[28rem] overflow-hidden rounded-[1.5rem] border border-white/10">
      <Canvas camera={{ position: [3.4, 2.2, 3.6], fov: 42 }}>
        <color attach="background" args={["#10161f"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} />
        <City />
        <OrbitControls autoRotate autoRotateSpeed={0.7} enablePan={false} />
      </Canvas>
    </div>
  );
}
