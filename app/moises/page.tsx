import type { Metadata } from "next";

import { MosesIndex } from "@/components/moses-index";

export const metadata: Metadata = {
  title: "Moisés",
  description: "Oito estações de estudo, do delta do Egito ao monte Nebo, com mapa, governo e geografia.",
};

export default function MosesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">O caminho guiado</p>
      <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">
        De Moisés, do Nilo ao Nebo
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Oito estações para ler com a Bíblia aberta. Cada uma situa a narrativa no mapa, no
        governo da época e na geografia que explica o caminho. A marca de leitura fica só neste
        navegador.
      </p>
      <div className="mt-10">
        <MosesIndex />
      </div>
    </div>
  );
}
