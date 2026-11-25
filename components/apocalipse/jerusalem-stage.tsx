"use client";

import dynamic from "next/dynamic";

import { ErrorBoundary } from "@/components/error-boundary";

function CubeFallback() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#10161f]">
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
      <p className="px-4 py-3 text-sm text-muted-foreground">
        O cubo em três dimensões não abriu neste aparelho. O desenho acima guarda a medida do texto:
        arestas iguais, rio e árvore.
      </p>
    </div>
  );
}

const Cube = dynamic(
  () =>
    import("@/components/apocalipse/jerusalem-cube")
      .then((mod) => mod.JerusalemCube)
      .catch(() => CubeFallback),
  {
    ssr: false,
    loading: () => <div className="h-[28rem] rounded-[1.5rem] bg-[#10161f]" />,
  },
);

export function JerusalemStage() {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-3xl">O cubo, para girar</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        O anjo mediu comprimento, largura e altura iguais: doze mil estádios. As doze pérolas são
        as portas, três em cada face. O fio azul é o rio da água da vida. A árvore está no meio da
        praça. Arraste para ver as faces. Se o WebGL não abrir, o desenho plano permanece.
      </p>
      <div className="mt-5">
        <ErrorBoundary fallback={<CubeFallback />}>
          <Cube />
        </ErrorBoundary>
      </div>
    </section>
  );
}
