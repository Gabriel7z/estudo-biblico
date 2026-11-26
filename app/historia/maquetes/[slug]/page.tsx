import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CityPlan } from "@/components/cities/city-plan";
import { CityStage } from "@/components/cities/city-stage";
import { modelForSiteNT } from "@/lib/historia/maquetes/links";
import { jesusEpisodes } from "@/lib/jesus";
import { PageHeader } from "@/components/page-header";
import { cities, getCity } from "@/lib/historia/maquetes";

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return { title: `Maquete 3D: ${city.title}`, description: city.description };
}

export default async function MaquetePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const others = [
    { href: "/historia/jerusalem", name: "Jerusalém dos reis" },
    ...cities.filter((c) => c.slug !== city.slug).map((c) => ({ href: `/historia/maquetes/${c.slug}`, name: c.title })),
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/historia" className="hover:text-gold">
          História
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link href="/historia#maquetes" className="hover:text-gold">
          Maquetes
        </Link>
      </p>
      <PageHeader kicker={city.kicker} title={city.title} lede={city.lede} />

      <div className="mt-10" id="entrar">
        <CityStage slug={city.slug} fallback={<CityPlan slug={city.slug} />} />
      </div>

      {city.slug === "jerusalem-herodes" ? (
        <section className="mt-6 rounded-[1.25rem] border border-gold/25 p-5">
          <p className="kicker">Na Vida de Jesus em mapas</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
            {jesusEpisodes
              .filter((episode) => episode.part !== "panorama" && episode.stops.some((stop) => stop.siteId in modelForSiteNT))
              .map((episode) => (
                <li key={episode.slug}>
                  <Link href={`/jesus/${episode.slug}`} className="text-gold hover:underline">
                    {episode.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl">Planta</h2>
          <p className="mt-2 text-muted-foreground">Os mesmos muros, rios, prédios e lugares da maquete, vistos de cima. O norte fica no alto.</p>
          <div className="mt-5">
            <CityPlan slug={city.slug} />
          </div>
        </div>
        <div className="folio p-6">
          <h2 className="font-heading text-3xl">O que é certo e o que é reconstrução</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground">Escavado.</span> {city.facts.certo}
            </p>
            <p>
              <span className="text-foreground">Nos textos.</span> {city.facts.texto}
            </p>
            <p>
              <span className="text-foreground">Aproximado.</span> {city.facts.aproximado}
            </p>
          </div>
          <h3 className="mt-6 font-heading text-xl">Fontes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-muted-foreground">
            {city.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Os lugares da maquete</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {city.hotspots.map((spot, i) => (
            <li key={spot.id} id={spot.id} className="folio scroll-mt-24 p-5">
              <p className="font-heading text-2xl">
                <span className="mr-2 text-gold">{i + 1}.</span>
                {spot.name}
              </p>
              <p className="mt-1 font-sans text-[11px] tracking-[0.14em] text-gold uppercase">{spot.refs}</p>
              <p className="mt-3 text-sm leading-relaxed">{spot.text}</p>
              {spot.note ? <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{spot.note}</p> : null}
            </li>
          ))}
        </ol>
      </section>

      <nav className="mt-14 flex flex-wrap gap-3 font-sans text-sm" aria-label="Outras maquetes">
        <span className="text-muted-foreground">Outras maquetes:</span>
        {others.map((o) => (
          <Link key={o.href} href={o.href} className="rounded-full border border-gold/40 px-3 py-1 text-gold hover:bg-gold hover:text-[#1a140c]">
            {o.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
