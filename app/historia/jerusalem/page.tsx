import type { Metadata } from "next";
import Link from "next/link";

import { CityPlan } from "@/components/jerusalem/city-plan";
import { CityStage } from "@/components/jerusalem/city-stage";
import { PageHeader } from "@/components/page-header";
import { eras, hotspots } from "@/lib/historia/jerusalem";

export const metadata: Metadata = {
  title: "Maquete 3D de Jerusalém",
  description:
    "Jerusalém de Davi, Salomão e Ezequias em 3D: relevo, vales, muros, Templo, palácio, fonte de Giom e túnel de Ezequias. Vista aérea e caminhada pelas ruas.",
};

export default function JerusalemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/historia" className="hover:text-gold">
          História
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Maquete
      </p>
      <PageHeader
        kicker="Maquete 3D · c. 1000 a 701 a.C."
        title="Jerusalém dos reis"
        lede="A cidade de Davi, de Salomão e de Ezequias, sobre o relevo real: a crista estreita da Cidade de Davi, o Ofel, o monte do Templo, o monte ocidental e os três vales. Troque a época e veja a cidade crescer. No modo Caminhar, ande pelas ruas na altura dos olhos."
      />

      <div className="mt-10">
        <CityStage fallback={<CityPlan />} />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Mil anos depois, no tempo de Jesus:{" "}
        <Link href="/historia/maquetes/jerusalem-herodes" className="text-gold hover:underline">
          a Jerusalém de Herodes e o Segundo Templo, c. 30 d.C. →
        </Link>
      </p>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">Planta</h2>
          <p className="mt-2 text-muted-foreground">
            O mesmo relevo da maquete, em curvas de nível a cada 10 m, com os muros das três épocas.
          </p>
          <div className="mt-5">
            <CityPlan />
          </div>
        </div>
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">As três épocas</h2>
          <ol className="mt-5 space-y-4">
            {eras.map((era) => (
              <li key={era.id} className="folio p-5">
                <p className="kicker">{era.date}</p>
                <p className="mt-1 font-heading text-2xl">{era.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{era.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Os lugares da maquete</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {hotspots.map((spot) => (
            <li key={spot.id} id={spot.id} className="folio p-5">
              <p className="font-heading text-2xl">{spot.name}</p>
              <p className="mt-1 font-sans text-[11px] tracking-[0.14em] text-gold uppercase">
                {spot.eras.map((id) => eras.find((era) => era.id === id)?.label).join(" · ")} · {spot.refs}
              </p>
              <p className="mt-3 text-sm leading-relaxed">{spot.text}</p>
              {spot.note ? <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{spot.note}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="folio mt-14 p-6 md:p-8">
        <h2 className="font-heading text-3xl">O que é certo e o que é reconstrução</h2>
        <div className="mt-4 grid gap-6 text-sm leading-relaxed text-muted-foreground md:grid-cols-3">
          <p>
            <span className="text-foreground">Certo.</span> O relevo geral (os vales e as colinas), a fonte de Giom, o
            túnel de Ezequias com a Inscrição de Siloé, a Estrutura de Pedras em Degraus e o Muro Largo foram
            escavados e podem ser visitados.
          </p>
          <p>
            <span className="text-foreground">Do texto.</span> O Templo e a Casa do Bosque do Líbano seguem as medidas de
            1 Reis 6–7 (côvado de cerca de 52 cm). Não há vestígio direto deles; o monte está coberto pela esplanada
            construída por Herodes séculos depois.
          </p>
          <p>
            <span className="text-foreground">Aproximado.</span> Os traçados dos muros, a posição dos palácios e as casas
            são reconstruções. O relevo é um modelo simplificado, sem o aterro de três mil anos. As casas são
            distribuídas ao acaso dentro dos muros, só para dar a escala.
          </p>
        </div>
      </section>
    </div>
  );
}
