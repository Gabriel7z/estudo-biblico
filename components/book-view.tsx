"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import { BibleMap } from "@/components/bible-map";
import { bookGroupLabel, type BookStudy } from "@/lib/book-studies";
import { atlasImages, atlasSrc, type AtlasImage } from "@/lib/imagery";
import type { MapFocus } from "@/components/bible-map";
import type { EraId } from "@/lib/types";
import { cn } from "cn";

const sections = [
  ["historia", "A história"],
  ["governo", "O governo"],
  ["personagens", "Personagens"],
  ["geografia", "A geografia"],
  ["lugares", "Lugares"],
] as const;

function imageFor(book: BookStudy): AtlasImage {
  if (book.slug === "genesis") return atlasImages.nile;
  if (book.group === "pentateuco") return atlasImages.sinai;
  if (book.group === "historicos") return atlasImages.jerusalem;
  if (book.group === "perifericos") return atlasImages.isaiah;
  return atlasImages.judean;
}

function leadSentence(text: string): string | null {
  const split = text.indexOf(". ");
  if (split < 48 || split > 220) return null;
  return text.slice(0, split + 1);
}

export function BookView({
  book,
  places,
  previous,
  next,
  eraLabel,
  macabeus,
  focus,
}: {
  book: BookStudy;
  places: { id: string; name: string; site: string; tradition?: boolean }[];
  previous?: { slug: string; name: string };
  next?: { slug: string; name: string };
  eraLabel: string;
  macabeus: boolean;
  focus: MapFocus;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 80]);
  const [active, setActive] = useState("historia");
  const photo = imageFor(book);
  const quote = leadSentence(book.history[1] ?? book.history[0] ?? "");

  useEffect(() => {
    const nodes = sections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.4] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article>
      <header className="bleed-hero relative flex min-h-[88svh] items-end overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-x-0 -top-10 h-[115%]">
          <Image src={atlasSrc(photo.src)} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/50 to-[#090d14]/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-14 md:px-8">
          <p className="kicker">
            {bookGroupLabel[book.group]}
            {book.group === "deuterocanonicos" ? " · fora do cânon protestante" : ""}
            {book.group === "perifericos" ? " · mesmo século, outro livro" : ""}
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-6xl leading-[0.92] text-white md:text-8xl">
            {book.name}
          </h1>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <p className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm leading-relaxed text-[#f4eee6] backdrop-blur-md">
              <span className="kicker mr-2">Período</span>
              {book.dates}
            </p>
            <p className="rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm leading-relaxed text-[#f4eee6] backdrop-blur-md">
              <span className="kicker mr-2">Governo</span>
              {book.government}
            </p>
          </div>
          <p className="measure mt-4 text-sm leading-relaxed text-[#f0c7b4]">{book.uncertainty}</p>
          <p className="mt-6 text-[11px] text-white/65">{photo.credit}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-14 md:px-8 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <nav aria-label="Seções deste livro" className="sticky top-24 hidden lg:block">
          <p className="kicker">Nesta página</p>
          <ul className="mt-4 space-y-1 border-l border-white/10">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "block border-l-2 py-1.5 pl-3 text-sm",
                    active === id ? "border-gold text-gold" : "border-transparent text-muted-foreground",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <nav aria-label="Seções deste livro" className="mb-8 flex gap-2 overflow-x-auto lg:hidden">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="folio shrink-0 rounded-full px-3 py-1.5 text-sm">
                {label}
              </a>
            ))}
          </nav>
          <div className="study-prose">
            <h2 id="historia">A história</h2>
            {book.history.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {quote ? <blockquote className="pull">{quote}</blockquote> : null}
            <h2 id="governo">O governo</h2>
            <p>{book.government}</p>
            <h2 id="personagens">Personagens</h2>
            <p>{book.characters.join(", ")}.</p>
            <h2 id="geografia">A geografia</h2>
            {book.geography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {["1-samuel", "2-samuel", "1-reis", "2-reis", "isaias", "jeremias", "ezequiel", "daniel"].includes(book.slug) ? (
            <Link
              href={`/historia#${book.slug}`}
              className="folio mt-10 block rounded-[1.25rem] p-6 hover:border-gold/50"
            >
              <p className="kicker">Mapas do contexto</p>
              <p className="mt-2 font-heading text-3xl">Um mapa para cada episódio de {book.name}</p>
              <p className="mt-3 text-muted-foreground">
                {["isaias", "jeremias", "ezequiel", "daniel"].includes(book.slug)
                  ? "Os impérios do tempo do profeta parada por parada, a linha do tempo, as guerras com suas fontes e as maquetes 3D de Babilônia, Nínive, Samaria e Jerusalém."
                  : "Marchas, batalhas e cercos parada por parada, a linha do tempo com os impérios vizinhos, as guerras com suas fontes e a maquete 3D de Jerusalém."}
              </p>
              <span className="mt-4 inline-block font-sans text-sm text-gold">Abrir os mapas →</span>
            </Link>
          ) : null}
          {book.slug === "1-reis" || book.slug === "2-reis" ? (
            <Link
              href="/reis"
              className="folio mt-10 block rounded-[1.25rem] p-6 hover:border-gold/50"
            >
              <p className="kicker">Reis ilustrado</p>
              <p className="mt-2 font-heading text-3xl">Destrinchar 1 e 2 Reis, cena por cena</p>
              <p className="mt-3 text-muted-foreground">
                Vinte e cinco pinturas com contexto histórico e arqueologia, a cronologia de todos os
                reis de Israel e Judá, o mapa do reino dividido e a planta do Templo.
              </p>
              <span className="mt-4 inline-block font-sans text-sm text-gold">Abrir Reis →</span>
            </Link>
          ) : null}
        </div>
      </div>

      <section className="px-4 pb-6 md:px-8">
        <div className="plate mx-auto max-w-7xl">
          <div className="plate-inner h-[72vh] min-h-[460px]">
            <BibleMap mode="inset" era={book.era as EraId} placeId={book.focusPlaceId} focus={focus} />
          </div>
          <figcaption className="px-2 pt-3 text-xs leading-relaxed text-muted-foreground">
            {book.name} no mapa de estudo. As bordas são aproximadas. Abra o período inteiro se quiser o
            século em volta.
          </figcaption>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="flex flex-wrap gap-4 text-sm">
          {macabeus ? (
            <Link className="text-gold hover:underline" href="/governos">
              A placa principal para na Pérsia. Esta fase está no mapa dos governos.
            </Link>
          ) : (
            <Link className="text-gold hover:underline" href={`/mapa?era=${book.era}`}>
              Ver o século no mapa: {eraLabel}
            </Link>
          )}
          <Link className="text-gold hover:underline" href="/governos">
            Formas de governo
          </Link>
          <Link className="text-gold hover:underline" href="/livros">
            Todos os livros
          </Link>
        </div>

        {places.length > 0 ? (
          <section className="mt-12" id="lugares">
            <h2 className="font-heading text-4xl">Lugares deste livro</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {places.map((place) => (
                <li key={place.id} className="folio rounded-2xl p-4">
                  <p className="font-heading text-2xl">{place.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {place.site}
                    {place.tradition ? " Tradição de atlas, não identificação escavada." : ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <nav className="mt-14 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              className="group relative min-h-40 overflow-hidden rounded-3xl border border-white/10"
              href={`/livros/${previous.slug}`}
            >
              <Image src={atlasSrc(photo.src)} alt="" fill sizes="50vw" className="object-cover opacity-50 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090d14] to-[#090d14]/30" />
              <span className="relative flex h-full flex-col justify-end p-6">
                <span className="kicker">Anterior</span>
                <span className="mt-1 font-heading text-4xl text-white">{previous.name}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              className="group relative min-h-40 overflow-hidden rounded-3xl border border-white/10 text-right"
              href={`/livros/${next.slug}`}
            >
              <Image src={atlasSrc(atlasImages.jerusalem.src)} alt="" fill sizes="50vw" className="object-cover opacity-50 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#090d14] to-[#090d14]/20" />
              <span className="relative flex h-full flex-col items-end justify-end p-6">
                <span className="kicker">Seguinte</span>
                <span className="mt-1 font-heading text-4xl text-white">{next.name}</span>
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
