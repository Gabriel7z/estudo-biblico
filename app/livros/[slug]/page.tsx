import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsetMap } from "@/components/inset-map";
import { eraName } from "@/lib/atlas";
import { bookGroupLabel, bookStudies, getBookStudy } from "@/lib/book-studies";
import { getPlace } from "@/lib/places";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return bookStudies.map((book) => ({ slug: book.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookStudy(slug);
  return {
    title: book ? book.name : "Livro",
    description: book ? `${book.name}: ${book.dates}` : "Livro do atlas.",
  };
}

export default async function BookStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const book = getBookStudy(slug);
  if (!book) notFound();
  const index = bookStudies.findIndex((item) => item.slug === book.slug);
  const previous = bookStudies[index - 1];
  const next = bookStudies[index + 1];
  const places = book.placeIds
    .map((id) => getPlace(id))
    .filter((place): place is NonNullable<typeof place> => Boolean(place));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <header className="folio px-5 py-7 md:px-8 md:py-9">
        <p className="kicker">
          {bookGroupLabel[book.group]}
          {book.group === "deuterocanonicos" ? " · fora do cânon protestante" : ""}
          {book.group === "perifericos" ? " · mesmo século, outro livro" : ""}
        </p>
        <h1 className="mt-2 font-heading text-5xl tracking-tight text-ink md:text-7xl">{book.name}</h1>
        <p className="ornament mt-4 max-w-48 text-xs">✦</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <p className="border border-gold/50 bg-background/70 px-3 py-2 text-sm leading-relaxed">
            <span className="kicker mr-2">Período</span>
            {book.dates}
          </p>
          <p className="border border-primary/30 bg-background/70 px-3 py-2 text-sm leading-relaxed">
            <span className="kicker mr-2">Governo</span>
            {book.government}
          </p>
        </div>
        <p className="measure mt-4 text-sm leading-relaxed text-copper">{book.uncertainty}</p>
      </header>

      <nav aria-label="Seções deste livro" className="mt-6 flex gap-2 overflow-x-auto lg:hidden">
        {[
          ["#historia", "A história"],
          ["#governo", "O governo"],
          ["#personagens", "Personagens"],
          ["#geografia", "A geografia"],
          ["#lugares", "Lugares"],
        ].map(([href, label]) => (
          <a key={href} className="folio shrink-0 px-3 py-1.5 text-sm" href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[11rem_minmax(0,1fr)_22rem]">
        <nav aria-label="Seções deste livro" className="folio sticky top-24 hidden p-3 text-sm lg:block">
          <p className="kicker px-2">Nesta página</p>
          <ul className="mt-2 space-y-1">
            {[
              ["#historia", "A história"],
              ["#governo", "O governo"],
              ["#personagens", "Personagens"],
              ["#geografia", "A geografia"],
              ["#lugares", "Lugares"],
            ].map(([href, label]) => (
              <li key={href}>
                <a className="block px-2 py-1.5 hover:bg-secondary" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="study-prose">
          <h2 id="historia">A história</h2>
          {book.history.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2 id="governo">O governo</h2>
          <p>{book.government}</p>
          <h2 id="personagens">Personagens</h2>
          <p>{book.characters.join(", ")}.</p>
          <h2 id="geografia">A geografia</h2>
          {book.geography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="lg:sticky lg:top-24">
          <InsetMap
            era={book.era}
            placeId={book.focusPlaceId}
            focus={{
              placeIds: book.placeIds,
              routeIds: book.routeIds,
              regionIds: book.regionIds,
            }}
            caption={`${book.name} no mapa de estudo. As bordas são aproximadas. Abra o período inteiro se quiser o século em volta.`}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        {book.slug.endsWith("macabeus") ? (
          <Link className="text-primary underline-offset-4 hover:underline" href="/governos">
            A placa principal para na Pérsia. Esta fase está no mapa dos governos.
          </Link>
        ) : (
          <Link className="text-primary underline-offset-4 hover:underline" href={`/mapa?era=${book.era}`}>
            Ver o século no mapa: {eraName(book.era)}
          </Link>
        )}
        <Link className="text-primary underline-offset-4 hover:underline" href="/governos">
          Formas de governo
        </Link>
        <Link className="text-primary underline-offset-4 hover:underline" href="/livros">
          Todos os livros
        </Link>
      </div>

      {places.length > 0 ? (
        <section className="mt-10" id="lugares">
          <h2 className="font-heading text-3xl">Lugares deste livro</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {places.map((place) => (
              <li key={place.id} className="folio p-4">
                <p className="font-heading text-lg">{place.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {place.site}
                  {place.tradition ? " Tradição de atlas, não identificação escavada." : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="mt-12 grid gap-3 border-t border-gold/40 pt-6 sm:grid-cols-2">
        {previous ? (
          <Link className="folio px-4 py-3 hover:border-gold" href={`/livros/${previous.slug}`}>
            <span className="kicker">Anterior</span>
            <span className="mt-1 block font-heading text-2xl">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="folio px-4 py-3 text-right hover:border-gold" href={`/livros/${next.slug}`}>
            <span className="kicker">Seguinte</span>
            <span className="mt-1 block font-heading text-2xl">{next.name}</span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
