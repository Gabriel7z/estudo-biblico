import type { Metadata } from "next";
import Link from "next/link";

import { TimelinePanorama } from "@/components/historia/timeline-panorama";
import { TimelineTable } from "@/components/historia/timeline-table";
import { PageHeader } from "@/components/page-header";
import { synchronisms } from "@/lib/historia/linha-do-tempo";

export const metadata: Metadata = {
  title: "Linha do tempo sincronizada",
  description:
    "De 1100 a 160 a.C., lado a lado: Israel, Judá, os profetas, Assíria, Babilônia, Egito, Pérsia, os gregos e os vizinhos. Guerras marcadas, cada uma ligada ao seu mapa.",
};

export default function LinhaDoTempoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/historia" className="hover:text-gold">
          História
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Linha do tempo
      </p>
      <PageHeader
        kicker="1100–160 a.C."
        title="Tudo ao mesmo tempo"
        lede="Nove faixas paralelas, do fim dos juízes aos macabeus. O que Isaías dizia enquanto Senaqueribe cercava Laquis; o que o Egito fazia quando Josias morreu; onde estavam Jeremias, Ezequiel e Daniel no mesmo ano. As datas dos reis de Israel e Judá seguem Thiele, como em Reis; as discutidas estão marcadas."
      />

      <section className="mt-10">
        <TimelinePanorama />
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Os grandes cruzamentos</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {synchronisms.map((item) => (
            <li key={item.year} className="folio flex flex-col p-5">
              <p className="kicker">{item.year}</p>
              <p className="mt-2 font-heading text-xl leading-snug">{item.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              {item.episode ? (
                <Link href={`/historia/mapas/${item.episode}`} className="mt-3 font-sans text-sm text-gold hover:underline">
                  Ver no mapa →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Ano a ano</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Desligue faixas ou mostre só as guerras. Eventos do mesmo ano aparecem juntos.
        </p>
        <div className="mt-6">
          <TimelineTable />
        </div>
      </section>

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        Datas dos impérios pelas cronologias usuais (Assíria e Babilônia são fixadas por listas de epônimos e um eclipse de 763
        a.C.; o Egito do Terceiro Período Intermediário tem margem de alguns anos). Antes de 900 a.C. tudo é aproximado. Os
        anos dos profetas indicam o período de atividade, não nascimento e morte.
      </p>
    </div>
  );
}
