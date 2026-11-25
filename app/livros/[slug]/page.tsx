import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BookView } from "@/components/book-view";
import { eraName } from "@/lib/atlas";
import { bookStudies, getBookStudy } from "@/lib/book-studies";
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
    .filter((place): place is NonNullable<typeof place> => Boolean(place))
    .map((place) => ({
      id: place.id,
      name: place.name,
      site: place.site,
      tradition: place.tradition,
    }));

  return (
    <BookView
      book={book}
      places={places}
      previous={previous ? { slug: previous.slug, name: previous.name } : undefined}
      next={next ? { slug: next.slug, name: next.name } : undefined}
      eraLabel={eraName(book.era)}
      macabeus={book.slug.endsWith("macabeus")}
      focus={{
        placeIds: book.placeIds,
        routeIds: book.routeIds,
        regionIds: book.regionIds,
      }}
    />
  );
}
