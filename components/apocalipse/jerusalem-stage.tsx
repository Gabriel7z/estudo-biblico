"use client";

import dynamic from "next/dynamic";

const Cube = dynamic(
  () => import("@/components/apocalipse/jerusalem-cube").then((mod) => mod.JerusalemCube),
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
        <Cube />
      </div>
    </section>
  );
}
