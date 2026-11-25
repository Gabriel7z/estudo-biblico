import Link from "next/link";

import { BibleMap } from "@/components/bible-map";
import { buttonVariants } from "@/components/ui/button";
import { bookStudies } from "@/lib/book-studies";
import { timeline } from "@/lib/timeline";
import { cn } from "cn";

const steps = [
  "Escolha uma estação de Moisés e leia o trecho indicado na sua Bíblia.",
  "Antes de fechar o capítulo, olhe quem está ao norte e qual estrada não foi tomada.",
  "Quando aparecer um governo ou uma região, abra a ficha. Ela cabe em poucos minutos.",
  "Depois do Nebo, percorra o tempo: juízes, reis, exílio, retorno.",
];

const preview = ["ur", "saida", "nebo", "unido", "onri", "senaqueribe", "jerusalem", "templo"];

const shelves = [
  { id: "pentateuco", title: "Pentateuco", tone: "bg-kingdom" },
  { id: "historicos", title: "Históricos", tone: "bg-copper" },
  { id: "perifericos", title: "Proféticos", tone: "bg-navy" },
  { id: "deuterocanonicos", title: "Deuterocanônicos", tone: "bg-gold" },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <header className="folio relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
        <p className="kicker">Atlas de estudo · Antigo Testamento</p>
        <h1 className="mt-3 max-w-3xl font-heading text-5xl tracking-tight text-ink md:text-7xl">
          A lei foi dada num deserto, entre impérios.
        </h1>
        <p className="ornament mt-5 max-w-xs text-xs tracking-[0.3em]">✦</p>
        <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">
          Um livro de cada vez, com a geografia e o governo debaixo do texto. O Pentateuco abre o
          caminho, os doze históricos atravessam a terra, e os profetas falam no mesmo século.
          Moisés continua sendo a porta do deserto.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/livros" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}>
            Abrir os livros
          </Link>
          <Link
            href="/governos"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 bg-card px-5")}
          >
            Mapa dos governos
          </Link>
        </div>
      </header>
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl md:text-4xl">Os doze históricos, e o Pentateuco ao lado</h2>
          <Link href="/livros" className="shrink-0 font-sans text-sm text-primary hover:underline">
            Prateleira inteira
          </Link>
        </div>
        <div className="space-y-10">
          {shelves.map((shelf) => (
            <div key={shelf.id}>
              <div className="mb-3 flex items-center gap-3">
                <span className={cn("h-px w-8", shelf.tone)} />
                <h3 className="font-sans text-xs tracking-[0.2em] text-ink uppercase">{shelf.title}</h3>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {bookStudies
                  .filter((book) => book.group === shelf.id)
                  .map((book) => (
                    <li key={book.slug}>
                      <Link href={`/livros/${book.slug}`} className="shelf-card">
                        <p className="font-sans text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                          {shelf.title}
                        </p>
                        <h3 className="mt-1 font-heading text-2xl">{book.name}</h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {book.government}
                        </p>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl">A marcha de Moisés</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Oito estações, da casa no Egito até a vista do Nebo. Em cada uma, a leitura bíblica
              vem indicada.
            </p>
          </div>
          <p className="hidden font-sans text-xs tracking-wide text-muted-foreground uppercase md:block">
            Mapa real
          </p>
        </div>
        <div className="plate">
          <div className="plate-inner h-[70vh] min-h-[420px] md:h-[560px]">
            <BibleMap mode="home" era="exodo" />
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Arraste para mover. A rota do êxodo é a reconstrução tradicional do sul. A linha
          tracejada é o caminho dos filisteus, a estrada que o texto diz não ter sido tomada.
          Mapa: OpenFreeMap, OpenMapTiles e OpenStreetMap.
        </p>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <Link href="/mapa?era=exodo" className="shelf-card">
          <p className="kicker">Mapa</p>
          <h2 className="mt-2 font-heading text-2xl">Onde a cena acontece</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Um mapa do Nilo ao Eufrates, para arrastar, aproximar e inclinar. A rota do êxodo, a
            estrada que não foi tomada, e o chão que muda quando o século muda.
          </p>
        </Link>
        <Link href="/governos" className="shelf-card">
          <p className="kicker">Governos</p>
          <h2 className="mt-2 font-heading text-2xl">Quem manda na época</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Faraó, cidades-estado, o acampamento sem rei, Judá, Assíria, Babilônia, Pérsia. O
            texto nomeia poderes. Aqui eles têm capital.
          </p>
        </Link>
        <Link href="/geografia" className="shelf-card">
          <p className="kicker">Geografia</p>
          <h2 className="mt-2 font-heading text-2xl">Por que o caminho dobra</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Delta, deserto, as quatro faixas de Canaã, o planalto de Moabe, os dois rios. O
            relevo explica guerras, murmurações e capitais.
          </p>
        </Link>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr] md:items-start">
        <div>
          <p className="kicker">Como estudar</p>
          <h2 className="mt-2 font-heading text-3xl">A Bíblia aberta, o mapa do lado.</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 leading-relaxed">
                <span className="font-heading text-copper">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-heading text-3xl">Do clã de Abraão a Neemias</h2>
            <Link href="/tempo" className="font-sans text-sm text-primary hover:underline">
              Linha inteira
            </Link>
          </div>
          <ol className="mt-6 border-l border-gold/70">
            {timeline
              .filter((event) => preview.includes(event.id))
              .map((event) => (
                <li key={event.id} className="relative pb-5 pl-6 last:pb-0">
                  <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-gold bg-background" />
                  <p className="font-sans text-xs text-muted-foreground">{event.when}</p>
                  <h3 className="font-heading text-lg">
                    <Link href={`/eras/${event.era}`} className="hover:text-primary">
                      {event.title}
                    </Link>
                  </h3>
                </li>
              ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
