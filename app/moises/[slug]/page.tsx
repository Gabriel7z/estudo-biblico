import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsetMap } from "@/components/inset-map";
import { ReadToggle } from "@/components/read-toggle";
import { getGeography } from "@/lib/geography";
import { getGovernment } from "@/lib/governments";
import { getPlace } from "@/lib/places";
import { getStation, stationNeighbors, stations } from "@/lib/stations";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return stations.map((station) => ({ slug: station.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const station = getStation(slug);
  return {
    title: station ? station.title : "Estação",
    description: station
      ? `${station.reading}. ${station.epigraph}`
      : "Estação de estudo de Moisés.",
  };
}

export default async function StationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const station = getStation(slug);
  if (!station) notFound();
  const place = getPlace(station.placeId);
  const government = getGovernment(station.governmentSlug);
  const geography = getGeography(station.geographySlug);
  const { previous, next } = stationNeighbors(station.slug);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <p className="kicker">
          Estação {station.order} de {stations.length} · {station.region}
        </p>
        <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">
          {station.title}
        </h1>
        <p className="mt-3 font-sans text-sm text-muted-foreground">Leitura: {station.reading}</p>
        <blockquote className="mt-6 border-l-2 border-copper pl-4">
          <p className="font-heading text-2xl leading-snug text-ink">{station.epigraph}</p>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            {station.epigraphRef} · leitura de estudo
          </p>
        </blockquote>
        <div className="study-prose">
          {station.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <h2>{station.geographyTitle}</h2>
          <p>{station.geographyNote}</p>
          <h2>{station.governmentTitle}</h2>
          <p>{station.governmentNote}</p>
          <h2>Para conversar</h2>
        </div>
        <ol className="mt-4 space-y-4">
          {station.questions.map((question) => (
            <li key={question.ref + question.prompt} className="leading-relaxed">
              <p>{question.prompt}</p>
              <p className="mt-1 font-sans text-sm text-copper">{question.ref}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ReadToggle slug={station.slug} />
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 text-sm">
          {previous ? (
            <Link className="hover:text-primary" href={`/moises/${previous.slug}`}>
              {previous.order}. {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="hover:text-primary" href={`/moises/${next.slug}`}>
              {next.order}. {next.title}
            </Link>
          ) : (
            <Link className="hover:text-primary" href="/tempo">
              Seguir para o tempo
            </Link>
          )}
        </div>
      </article>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <InsetMap
          era="exodo"
          placeId={station.placeId}
          caption={`${station.region}. A linha de cobre é a marcha; a tracejada, a estrada que não foi tomada.`}
        />
        {place ? (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="kicker">Lugar</p>
            <h2 className="mt-1 font-heading text-xl">{place.name}</h2>
            <p className="mt-2 text-sm leading-relaxed">{place.blurb}</p>
            <Link
              className="mt-3 inline-block text-sm text-primary hover:underline"
              href={`/mapa?era=exodo&lugar=${place.id}`}
            >
              Abrir no mapa
            </Link>
          </div>
        ) : null}
        {government ? (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="kicker">Governo</p>
            <h2 className="mt-1 font-heading text-xl">
              <Link className="hover:text-primary" href={`/governos/${government.slug}`}>
                {government.name}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{government.lede}</p>
          </div>
        ) : null}
        {geography ? (
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="kicker">Geografia</p>
            <h2 className="mt-1 font-heading text-xl">
              <Link className="hover:text-primary" href={`/geografia/${geography.slug}`}>
                {geography.name}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{geography.lede}</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
