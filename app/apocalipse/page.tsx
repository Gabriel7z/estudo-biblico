import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SeriesDiagram } from "@/components/apocalipse/series-diagram";
import { PageHeader } from "@/components/page-header";
import { visions } from "@/lib/apocalipse";
import { chapters, outline, symbols, totalVerses } from "@/lib/apocalipse-capitulos";
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

      <section className="mt-10 grid gap-4 md:grid-cols-[1.6fr_1fr]">
        <Link
          href="/apocalipse/capitulo/1"
          className="folio group block p-6 hover:border-gold/50 md:p-7"
        >
          <p className="kicker">Estudo completo</p>
          <h2 className="mt-2 font-heading text-3xl md:text-4xl">Versículo por versículo</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Os 22 capítulos e os {totalVerses} versículos, um a um: cada símbolo, número, cor,
            criatura, objeto, lugar e pessoa; os termos gregos; os ecos do Antigo Testamento; o
            contexto da Ásia romana; e as leituras das escolas onde elas divergem.
          </p>
          <span className="mt-4 inline-block font-sans text-sm text-gold group-hover:underline">
            Começar no capítulo 1 →
          </span>
        </Link>
        <Link href="/apocalipse/simbolos" className="folio group block p-6 hover:border-gold/50 md:p-7">
          <p className="kicker">Glossário</p>
          <h2 className="mt-2 font-heading text-3xl md:text-4xl">Símbolos</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {symbols.length} verbetes: de 3½ e 666 ao mar de vidro, com os versículos onde cada um
            aparece.
          </p>
          <span className="mt-4 inline-block font-sans text-sm text-gold group-hover:underline">
            Abrir o glossário →
          </span>
        </Link>
      </section>

      <section id="esboco" className="mt-14 scroll-mt-24">
        <h2 className="font-heading text-3xl">O esboço do livro</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Doze partes, do prólogo ao epílogo. As séries de juízos se sobrepõem em parte (o sétimo
          selo abre as trombetas, e o conflito dos capítulos 12 a 14 volta atrás no tempo), por isso
          os intervalos às vezes se cruzam.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {outline.map((part, index) => (
            <li key={part.id} id={`parte-${part.id}`} className="scroll-mt-24">
              <Link
                href={`/apocalipse/capitulo/${part.start}#v${part.startVerse}`}
                className="folio flex h-full flex-col p-4 hover:border-gold/50"
              >
                <span className="font-sans text-[11px] tracking-[0.16em] text-gold uppercase">
                  {String(index + 1).padStart(2, "0")} · {part.range}
                </span>
                <span className="mt-1 font-heading text-xl">{part.label}</span>
                <span className="mt-1.5 text-sm leading-snug text-muted-foreground">{part.blurb}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="series" className="mt-14 scroll-mt-24">
        <h2 className="font-heading text-3xl">Selos, trombetas, taças</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Três séries de sete. Toque numa série para ver a ordem interna e abrir a visão em que ela
          é contada.
        </p>
        <div className="mt-5">
          <SeriesDiagram />
        </div>
      </section>

      <section id="capitulos" className="mt-14 scroll-mt-24">
        <h2 className="font-heading text-3xl">Capítulo por capítulo</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          O resumo de cada capítulo. Abra um capítulo para ler o estudo de cada versículo.
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {chapters.map((chapter) => (
            <li key={chapter.n}>
              <Link
                href={`/apocalipse/capitulo/${chapter.n}`}
                className="folio flex h-full gap-4 p-4 hover:border-gold/50"
              >
                <span className="w-10 shrink-0 font-heading text-3xl leading-none text-gold tabular-nums">
                  {chapter.n}
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-lg leading-snug">{chapter.title}</span>
                  <span className="mt-1.5 line-clamp-3 block text-sm leading-snug text-muted-foreground">
                    {chapter.summary}
                  </span>
                  <span className="mt-2 block font-sans text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    {chapter.verses.length} versículos
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <h2 className="mt-16 font-heading text-3xl">As dezessete cenas</h2>
      <ol className="mt-6 grid gap-5 sm:grid-cols-2">
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
                <h3 className="font-heading text-2xl md:text-3xl">{vision.title}</h3>
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
