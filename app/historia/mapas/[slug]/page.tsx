import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EpisodeMap, type MapStop } from "@/components/historia/episode-map";
import { SceneArt } from "@/components/scene-art";
import { episodePoster, episodes, getEpisode, resolvePath } from "@/lib/historia";
import { getWar } from "@/lib/historia/guerras";
import { getSite } from "@/lib/historia/sites";
import { certaintyLabel, kindLabel, sideColor, sideLabel } from "@/lib/historia/types";
import { getReisScene } from "@/lib/reis";

export const dynamicParams = false;

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return { title: "Mapa" };
  return { title: `${episode.title} · mapa`, description: episode.summary };
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();
  const index = episodes.findIndex((item) => item.slug === episode.slug);
  const previous = episodes[index - 1];
  const next = episodes[index + 1];

  const stops: MapStop[] = episode.stops.map((stop, i) => {
    const site = getSite(stop.siteId);
    return {
      n: i + 1,
      siteId: site.id,
      name: site.name,
      modern: site.modern,
      certainty: site.certainty,
      lng: site.lng,
      lat: site.lat,
      title: stop.title,
      date: stop.date,
      kind: stop.kind,
      text: stop.text,
      refs: stop.refs,
      archaeology: stop.archaeology,
    };
  });
  const routes = episode.routes.map((route) => ({ label: route.label, side: route.side, dashed: route.dashed, coords: resolvePath(route.path) }));
  const relatedWars = (episode.warIds ?? []).map((id) => getWar(id)).filter((war) => war !== undefined);
  const scenes = (episode.reisScenes ?? []).map((id) => getReisScene(id)).filter((scene) => scene !== undefined);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/historia" className="hover:text-gold">
          História
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        {episode.book}
      </p>
      <h1 className="mt-3 max-w-5xl font-heading text-4xl tracking-tight text-ink md:text-6xl">{episode.title}</h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-gold uppercase">
        {episode.ref} · {episode.date}
      </p>
      <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">{episode.summary}</p>

      {episode.image ? (
        <div className="mt-8">
          <SceneArt src={episode.image} alt={episode.imageAlt ?? episode.title} />
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="font-heading text-3xl md:text-4xl">O mapa</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Toque nos números para seguir a história parada por parada. As setas mostram a direção das marchas; as áreas coloridas
          são aproximadas.
        </p>
        <div className="mt-5">
          <EpisodeMap
            stops={stops}
            routes={routes}
            areas={episode.areas}
            labels={episode.labels}
            bounds={episode.bounds}
            poster={episodePoster(episode.slug)}
            title={episode.title}
          />
        </div>
        {routes.length ? (
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
            {routes.map((route) => (
              <li key={route.label} className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-0 w-7 border-t-[3px]"
                  style={{ borderColor: sideColor[route.side], borderStyle: route.dashed ? "dashed" : "solid" }}
                />
                {route.label}
                <span className="text-xs opacity-70">({sideLabel[route.side]})</span>
              </li>
            ))}
          </ul>
        ) : null}
        {episode.caveat ? <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{episode.caveat}</p> : null}
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="folio p-6 md:p-8">
          <h2 className="font-heading text-3xl">Contexto histórico</h2>
          {episode.context.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="space-y-6">
          {relatedWars.length ? (
            <div className="folio p-6">
              <h2 className="font-heading text-2xl">Guerras deste mapa</h2>
              <ul className="mt-3 space-y-3">
                {relatedWars.map((war) => (
                  <li key={war.slug}>
                    <Link href={`/historia/guerras#${war.slug}`} className="font-heading text-xl text-gold hover:underline">
                      {war.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {war.date} · {war.sides.map((side) => side.who).join(" × ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {scenes.length ? (
            <div className="folio p-6">
              <h2 className="font-heading text-2xl">Cenas pintadas de Reis</h2>
              <ul className="mt-3 space-y-1">
                {scenes.map((scene) => (
                  <li key={scene.slug}>
                    <Link href={`/reis/${scene.slug}`} className="text-gold hover:underline">
                      {scene.title}
                    </Link>
                    <span className="text-sm text-muted-foreground"> · {scene.ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="folio p-6">
            <h2 className="font-heading text-2xl">Na linha do tempo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Veja o que acontecia ao mesmo tempo no Egito, na Assíria, em Babilônia e entre os profetas.
            </p>
            <Link href={`/historia/linha-do-tempo#ano-${episode.year}`} className="mt-3 inline-block font-sans text-sm text-gold hover:underline">
              Abrir em {episode.year} a.C. →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-3xl md:text-4xl">Passo a passo</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {stops.map((stop) => (
            <li key={`${stop.n}-${stop.siteId}`} className="folio flex gap-4 p-5">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full font-sans text-sm font-semibold ${
                  stop.kind === "batalha" || stop.kind === "cerco" ? "bg-[#e0645a] text-[#1a140c]" : "bg-gold text-[#1a140c]"
                }`}
              >
                {stop.n}
              </span>
              <div>
                <p className="font-heading text-xl">{stop.title}</p>
                <p className="mt-0.5 font-sans text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                  {kindLabel[stop.kind]} · {stop.date} · {stop.name}, {stop.modern} ({certaintyLabel[stop.certainty]})
                </p>
                <p className="mt-2 text-sm leading-relaxed">{stop.text}</p>
                {stop.archaeology ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stop.archaeology}</p> : null}
                <p className="mt-2 font-sans text-xs tracking-[0.1em] text-gold uppercase">{stop.refs}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-sm">
        {previous ? (
          <Link href={`/historia/mapas/${previous.slug}`} className="text-gold hover:underline">
            ← {previous.title}
          </Link>
        ) : (
          <Link href="/historia" className="text-gold hover:underline">
            ← História
          </Link>
        )}
        {next ? (
          <Link href={`/historia/mapas/${next.slug}`} className="text-right text-gold hover:underline">
            {next.title} →
          </Link>
        ) : (
          <Link href="/historia" className="text-gold hover:underline">
            História →
          </Link>
        )}
      </nav>
    </article>
  );
}
