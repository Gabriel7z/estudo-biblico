import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SeriesDiagram } from "@/components/apocalipse/series-diagram";
import { PageHeader } from "@/components/page-header";
import { visions } from "@/lib/apocalipse";
import { atlasSrc } from "@/lib/imagery";

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
        lede="Dezessete cenas, na ordem em que o livro as conta: de Patmos até a cidade que desce. Cada pintura segue os detalhes do texto. Onde o próprio livro explica o símbolo, a página repete essa explicação. Onde as tradições divergem, preterismo, historicismo, futurismo e idealismo aparecem lado a lado, sem que o atlas escolha uma."
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

      <ol className="mt-14 grid gap-5 sm:grid-cols-2">
        {visions.map((vision) => (
          <li key={vision.slug}>
            <Link
              href={`/apocalipse/${vision.slug}`}
              className="folio group flex h-full flex-col overflow-hidden rounded-[1.25rem] hover:border-gold/50"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-gold/15 bg-[#0b1018]">
                <Image
                  src={atlasSrc(vision.image)}
                  alt={vision.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14]/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
                  {String(vision.order).padStart(2, "0")} · {vision.ref}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-heading text-2xl md:text-3xl">{vision.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {vision.saw[0]}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
