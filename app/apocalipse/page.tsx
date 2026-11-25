import type { Metadata } from "next";
import Link from "next/link";

import { SeriesDiagram } from "@/components/apocalipse/series-diagram";
import { PageHeader } from "@/components/page-header";
import { visions } from "@/lib/apocalipse";

export const metadata: Metadata = {
  title: "Apocalipse",
  description:
    "As visões do Apocalipse na ordem do livro, com o que João viu e o que as escolas leem de modos diferentes.",
};

export default function ApocalipsePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="Apocalipse"
        title="O que João viu"
        lede="Dezessete cenas, na ordem em que o livro as conta: de Patmos até a cidade que desce. Cada desenho segue os detalhes do texto. Onde o próprio livro explica o símbolo, a página repete essa explicação. Onde as tradições divergem, preterismo, historicismo, futurismo e idealismo aparecem lado a lado, sem que o atlas escolha uma."
      />

      <section className="mt-12">
        <h2 className="font-heading text-3xl">Selos, trombetas, taças</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Três séries de sete. Toque numa série para ver a ordem interna e abrir a visão em que ela
          é contada.
        </p>
        <div className="mt-5">
          <SeriesDiagram />
        </div>
      </section>

      <ol className="mt-14 grid gap-4 sm:grid-cols-2">
        {visions.map((vision) => (
          <li key={vision.slug}>
            <Link href={`/apocalipse/${vision.slug}`} className="folio block h-full p-5 hover:border-gold/50">
              <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
                {String(vision.order).padStart(2, "0")} · {vision.ref}
              </p>
              <h2 className="mt-2 font-heading text-3xl">{vision.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {vision.saw[0]}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
