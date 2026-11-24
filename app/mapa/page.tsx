import type { Metadata } from "next";
import { Suspense } from "react";

import { MapScreen } from "@/components/map-screen";

export const metadata: Metadata = {
  title: "Mapa",
  description:
    "Mapa do Nilo ao Eufrates que muda com o século: cidades, reinos e rotas do Antigo Testamento.",
};

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-[calc(100dvh-4rem)] place-items-center bg-[#efe2cc] text-sm text-muted-foreground">
          Abrindo o mapa…
        </div>
      }
    >
      <MapScreen />
    </Suspense>
  );
}
