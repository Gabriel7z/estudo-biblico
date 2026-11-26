"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { BibleMap } from "@/components/bible-map";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { bookStudies } from "@/lib/book-studies";
import { atlasImages, atlasSrc } from "@/lib/imagery";
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
  { id: "pentateuco", title: "Pentateuco", numeral: "01", image: atlasImages.nile },
  { id: "historicos", title: "Históricos", numeral: "02", image: atlasImages.jerusalem },
  { id: "perifericos", title: "Proféticos", numeral: "03", image: atlasImages.isaiah },
  { id: "deuterocanonicos", title: "Deuterocanônicos", numeral: "04", image: atlasImages.judean },
] as const;

export function CinematicHome() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);
  const books = bookStudies.length;

  return (
    <div>
      <section className="bleed-hero relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-x-0 -top-16 h-[120%]">
          <Image
            src={atlasSrc(atlasImages.sinai.src)}
            alt={atlasImages.sinai.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/55 to-[#090d14]/25" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 md:px-8 md:pb-20">
          <p className="kicker">Atlas de estudo · Antigo Testamento</p>
          <h1 className="mt-4 max-w-5xl font-heading text-5xl leading-[0.95] tracking-tight text-white md:text-8xl">
            A lei foi dada num deserto, entre impérios.
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-[#f4eee6]/85">
            Um livro de cada vez, com a geografia e o governo debaixo do texto. O Pentateuco abre o
            caminho, os doze históricos atravessam a terra, e os profetas falam no mesmo século.
            Moisés continua sendo a porta do deserto.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/livros" className={cn(buttonVariants({ size: "lg" }), "h-12 px-6")}>
              Abrir os livros
            </Link>
            <Link
              href="/governos"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/25 bg-white/10 px-6 text-white hover:bg-white/20",
              )}
            >
              Mapa dos governos
            </Link>
            <p className="font-heading text-4xl text-gold">
              {books}
              <span className="ml-2 font-sans text-xs tracking-[0.18em] text-[#f4eee6]/70 uppercase">
                livros
              </span>
            </p>
          </div>
          <p className="mt-10 max-w-xl text-[11px] text-white/70">{atlasImages.sinai.credit}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
        <Link
          href="/reis"
          className="group block overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[#121926]"
        >
          <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-gold/15 md:aspect-[16/5]">
            <Image
              src={atlasSrc("/reis/carmelo.webp")}
              alt="Elias no monte Carmelo, com fogo descendo sobre o altar de doze pedras."
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121926] via-[#121926]/20 to-transparent" />
          </div>
          <div className="grid gap-6 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12">
            <div>
              <p className="font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                1 e 2 Reis
              </p>
              <h2 className="mt-3 font-heading text-4xl text-white md:text-6xl">De Salomão ao exílio</h2>
              <p className="mt-4 max-w-xl text-[#f4eee6]/80">
                Vinte e cinco cenas pintadas, todos os reis de Israel e Judá lado a lado, o mapa do
                reino dividido e a planta do Templo de Salomão.
              </p>
            </div>
            <p className="self-end font-heading text-6xl text-gold md:text-right md:text-8xl">25</p>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
        <Link
          href="/historia"
          className="group grid gap-4 rounded-[1.75rem] border border-gold/30 bg-[#121926] p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12"
        >
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] text-gold uppercase">Samuel a Reis · mapas, guerras, maquete</p>
            <h2 className="mt-3 font-heading text-4xl text-white md:text-5xl">A história, mapa por mapa</h2>
            <p className="mt-4 max-w-xl text-[#f4eee6]/80">
              Um mapa para cada episódio, a linha do tempo com Assíria, Babilônia e Egito lado a lado, e Jerusalém em 3D para
              atravessar a pé.
            </p>
          </div>
          <p className="self-end font-sans text-sm text-gold md:text-right">Entrar na maquete e nos mapas →</p>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
        <Link
          href="/jesus"
          className="group block overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[#121926]"
        >
          <div className="relative aspect-[16/7] w-full overflow-hidden border-b border-gold/15 md:aspect-[16/5]">
            <Image
              src={atlasSrc("/historia/maquetes/jerusalem-herodes.webp")}
              alt="Maquete 3D da Jerusalém de Herodes, com a esplanada do Templo, os pórticos e a cidade."
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121926] via-[#121926]/20 to-transparent" />
          </div>
          <div className="grid gap-6 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12">
            <div>
              <p className="font-sans text-[11px] tracking-[0.22em] text-gold uppercase">Os quatro Evangelhos · mapas, linha do tempo, maquete</p>
              <h2 className="mt-3 font-heading text-4xl text-white md:text-6xl">Vida de Jesus em mapas</h2>
              <p className="mt-4 max-w-xl text-[#f4eee6]/80">
                Cada episódio, de Nazaré e Belém ao Gólgota e ao Monte das Oliveiras, com seu próprio mapa, as passagens dos quatro
                Evangelhos e a Jerusalém de Herodes em 3D, com o Segundo Templo.
              </p>
            </div>
            <p className="self-end font-heading text-6xl text-gold md:text-right md:text-8xl">38</p>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8">
        <Link
          href="/apocalipse"
          className="group block overflow-hidden rounded-[1.75rem] border border-gold/30 bg-[#121926]"
        >
          <div className="grid gap-6 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-12">
            <div>
              <p className="font-sans text-[11px] tracking-[0.22em] text-gold uppercase">
                Apocalipse
              </p>
              <h2 className="mt-3 font-heading text-4xl text-white md:text-6xl">O que João viu</h2>
              <p className="mt-4 max-w-xl text-[#f4eee6]/80">
                Dezessete visões, na ordem do livro. Cada cena desenha o que o texto descreve: os
                sete candelabros, os quatro cavalos, as duas bestas, a cidade em cubo.
              </p>
            </div>
            <p className="self-end font-heading text-6xl text-gold md:text-right md:text-8xl">17</p>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="max-w-3xl font-heading text-4xl md:text-6xl">
              Os doze históricos, e o Pentateuco ao lado
            </h2>
            <Link href="/livros" className="shrink-0 font-sans text-sm text-gold hover:underline">
              Prateleira inteira
            </Link>
          </div>
        </Reveal>
        <div className="space-y-16">
          {shelves.map((shelf) => (
            <div key={shelf.id}>
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-heading text-5xl text-gold/80 md:text-7xl">{shelf.numeral}</span>
                <h3 className="font-heading text-3xl md:text-4xl">{shelf.title}</h3>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {bookStudies
                  .filter((book) => book.group === shelf.id)
                  .map((book, index) => (
                    <li key={book.slug}>
                      <Reveal delay={reduce ? 0 : index * 0.05}>
                      <Link href={`/livros/${book.slug}`} className="group relative block h-72 overflow-hidden rounded-2xl">
                        <Image
                          src={atlasSrc(shelf.image.src)}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          className="object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/45 to-transparent transition duration-500 group-hover:via-[#090d14]/25" />
                        <div className="absolute inset-x-0 bottom-0 p-5 transition duration-500 group-hover:-translate-y-1">
                          <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
                            {shelf.title}
                          </p>
                          <h3 className="mt-1 font-heading text-3xl text-white">{book.name}</h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#f4eee6]/80">
                            {book.government}
                          </p>
                        </div>
                      </Link>
                      </Reveal>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
        <Reveal>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl">A marcha de Moisés</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Oito estações, da casa no Egito até a vista do Nebo. Em cada uma, a leitura bíblica
                vem indicada.
              </p>
            </div>
            <p className="hidden font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase md:block">
              Mapa real
            </p>
          </div>
          <div className="plate">
            <div className="plate-inner h-[70vh] min-h-[420px] md:h-[640px]">
              <BibleMap mode="home" era="exodo" />
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Arraste para mover. A rota do êxodo é a reconstrução tradicional do sul. A linha
            tracejada é o caminho dos filisteus, a estrada que o texto diz não ter sido tomada.
            Mapa: OpenFreeMap, OpenMapTiles e OpenStreetMap.
          </p>
        </Reveal>
      </section>

      <section className="sand-band mt-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-3 md:px-8">
          <Link href="/mapa?era=exodo" className="rounded-2xl border border-[#1c1612]/10 bg-white/40 p-6 transition hover:-translate-y-1">
            <p className="kicker">Mapa</p>
            <h2 className="mt-2 font-heading text-3xl">Onde a cena acontece</h2>
            <p className="mt-3 leading-relaxed text-[#4e433a]">
              Um mapa do Nilo ao Eufrates, para arrastar, aproximar e inclinar. A rota do êxodo, a
              estrada que não foi tomada, e o chão que muda quando o século muda.
            </p>
          </Link>
          <Link href="/governos" className="rounded-2xl border border-[#1c1612]/10 bg-white/40 p-6 transition hover:-translate-y-1">
            <p className="kicker">Governos</p>
            <h2 className="mt-2 font-heading text-3xl">Quem manda na época</h2>
            <p className="mt-3 leading-relaxed text-[#4e433a]">
              Faraó, cidades-estado, o acampamento sem rei, Judá, Assíria, Babilônia, Pérsia. O
              texto nomeia poderes. Aqui eles têm capital.
            </p>
          </Link>
          <Link href="/geografia" className="rounded-2xl border border-[#1c1612]/10 bg-white/40 p-6 transition hover:-translate-y-1">
            <p className="kicker">Geografia</p>
            <h2 className="mt-2 font-heading text-3xl">Por que o caminho dobra</h2>
            <p className="mt-3 leading-relaxed text-[#4e433a]">
              Delta, deserto, as quatro faixas de Canaã, o planalto de Moabe, os dois rios. O
              relevo explica guerras, murmurações e capitais.
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <p className="kicker">Como estudar</p>
          <h2 className="mt-2 font-heading text-4xl md:text-5xl">A Bíblia aberta, o mapa do lado.</h2>
          <ol className="mt-8 space-y-5">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 leading-relaxed">
                <span className="font-heading text-3xl text-gold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-heading text-4xl md:text-5xl">Do clã de Abraão a Neemias</h2>
            <Link href="/tempo" className="font-sans text-sm text-gold hover:underline">
              Linha inteira
            </Link>
          </div>
          <ol className="mt-8 border-l border-gold/40">
            {timeline
              .filter((event) => preview.includes(event.id))
              .map((event) => (
                <li key={event.id} className="relative pb-6 pl-6 last:pb-0">
                  <span className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-gold" />
                  <p className="font-sans text-xs tracking-wide text-muted-foreground uppercase">{event.when}</p>
                  <h3 className="font-heading text-2xl">
                    <Link href={`/eras/${event.era}`} className="hover:text-gold">
                      {event.title}
                    </Link>
                  </h3>
                </li>
              ))}
          </ol>
        </Reveal>
      </section>
    </div>
  );
}
