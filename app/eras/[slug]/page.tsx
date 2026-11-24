import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsetMap } from "@/components/inset-map";
import { eras, getEra } from "@/lib/eras";
import { getGovernment } from "@/lib/governments";
import { timeline } from "@/lib/timeline";
import type { EraId } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return eras.map((era) => ({ slug: era.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const era = getEra(slug);
  return { title: era?.name ?? "Período", description: era?.summary };
}

export default async function EraPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const era = getEra(slug);
  if (!era) notFound();
  const events = timeline.filter((event) => event.era === era.id);
  const governments = era.governmentSlugs
    .map((id) => getGovernment(id))
    .filter((item) => item !== undefined);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <p className="kicker">{era.centuries}</p>
        <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">{era.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{era.summary}</p>
        <div className="study-prose">
          {era.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <h2>No mapa</h2>
          <p>{era.mapNote}</p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {era.readings.map((reading) => (
            <li
              key={reading}
              className="rounded-full border border-border px-3 py-1 font-sans text-sm text-muted-foreground"
            >
              {reading}
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link className="text-sm text-primary hover:underline" href={`/mapa?era=${era.id}`}>
            Abrir este período no mapa
          </Link>
        </p>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <InsetMap era={era.id as EraId} caption={era.mapNote} />
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="kicker">Nesta linha</p>
          <ul className="mt-3 space-y-3">
            {events.map((event) => (
              <li key={event.id}>
                <p className="font-sans text-xs text-muted-foreground">{event.when}</p>
                <p className="font-heading text-lg">{event.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="kicker">Governos deste mapa</p>
          <ul className="mt-3 space-y-3">
            {governments.map((government) => (
              <li key={government.slug}>
                <Link className="font-heading text-lg hover:text-primary" href={`/governos/${government.slug}`}>
                  {government.name}
                </Link>
                <p className="text-sm text-muted-foreground">{government.lede}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
