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
      <p className="kicker">
        {bookGroupLabel[book.group]}
        {book.group === "deuterocanonicos" ? " · fora do cânon protestante" : ""}
        {book.group === "perifericos" ? " · mesmo século, outro livro" : ""}
      </p>
      <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">{book.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{book.dates}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-copper">{book.uncertainty}</p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="study-prose max-w-3xl">
          <h2>A história</h2>
          {book.history.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>O governo</h2>
          <p>{book.government}</p>
          <h2>Personagens</h2>
          <p>{book.characters.join(", ")}.</p>
          <h2>A geografia</h2>
          {book.geography.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
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
        <section className="mt-10">
          <h2 className="font-heading text-2xl">Lugares deste livro</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {places.map((place) => (
              <li key={place.id} className="rounded-lg border border-border bg-card p-3">
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

      <nav className="mt-12 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {previous ? (
          <Link className="hover:text-primary" href={`/livros/${previous.slug}`}>
            {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="hover:text-primary" href={`/livros/${next.slug}`}>
            {next.name}
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
