import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { InsetMap } from "@/components/inset-map";
import { getGovernment, governments } from "@/lib/governments";
import { getPlace } from "@/lib/places";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return governments.map((government) => ({ slug: government.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const government = getGovernment(slug);
  return {
    title: government?.name ?? "Governo",
    description: government?.lede,
  };
}

export default async function GovernmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const government = getGovernment(slug);
  if (!government) notFound();
  const linked = government.placeIds
    .map((id) => getPlace(id))
    .filter((place) => place !== undefined);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <p className="kicker">
          {government.kind} · {government.centuries}
        </p>
        <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">
          {government.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{government.lede}</p>
        <p className="mt-4 text-sm text-muted-foreground">Sede: {government.capital}</p>
        <div className="study-prose">
          {government.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-8">
          <Link className="text-sm text-primary hover:underline" href={`/eras/${government.era}`}>
            Ver o período no atlas
          </Link>
        </p>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <InsetMap era={government.era} placeId={linked[0]?.id} />
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="kicker">Lugares</p>
          <ul className="mt-3 space-y-3">
            {linked.map((place) => (
              <li key={place.id}>
                <Link
                  className="font-heading text-lg hover:text-primary"
                  href={`/mapa?era=${government.era}&lugar=${place.id}`}
                >
                  {place.name}
                </Link>
                <p className="text-sm leading-relaxed text-muted-foreground">{place.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
