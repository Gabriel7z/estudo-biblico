import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsetMap } from "@/components/inset-map";
import { geography, getGeography } from "@/lib/geography";
import { getPlace } from "@/lib/places";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return geography.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getGeography(slug);
  return { title: item?.name ?? "Geografia", description: item?.lede };
}

export default async function GeographyArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getGeography(slug);
  if (!item) notFound();
  const linked = item.placeIds.map((id) => getPlace(id)).filter((place) => place !== undefined);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <p className="kicker">
          {item.kind === "regiao" ? "Região" : item.kind === "agua" ? "Água" : "Rota"}
        </p>
        <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">{item.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{item.lede}</p>
        <div className="study-prose">
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <h2>Por que isso muda a leitura</h2>
          <p>{item.why}</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.readings.map((reading) => (
            <li
              key={reading}
              className="rounded-full border border-border px-3 py-1 font-sans text-sm text-muted-foreground"
            >
              {reading}
            </li>
          ))}
        </ul>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <InsetMap era={item.era} placeId={linked[0]?.id} caption={item.lede} />
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="kicker">Lugares ligados</p>
          <ul className="mt-3 space-y-2">
            {linked.map((place) => (
              <li key={place.id}>
                <Link
                  className="hover:text-primary"
                  href={`/mapa?era=${item.era}&lugar=${place.id}`}
                >
                  {place.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="mt-4 inline-block text-sm text-primary hover:underline"
            href={`/mapa?era=${item.era}`}
          >
            Abrir o período no mapa
          </Link>
        </div>
      </aside>
    </div>
  );
}
