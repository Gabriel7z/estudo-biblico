import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EpisodeMap, type MapStop } from "@/components/historia/episode-map";
import { SceneArt } from "@/components/scene-art";
import { resolvePath } from "@/lib/historia";
import { modelForSiteNT } from "@/lib/historia/maquetes/links";
import { certaintyLabel, sideColor, sideLabel } from "@/lib/historia/types";
import { getJesusEpisode, jesusEpisodes, jesusParts, jesusPoster, resolveJesusStops } from "@/lib/jesus";
import { gospelSlug, jesusKindLabel, type Gospel } from "@/lib/jesus/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return jesusEpisodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = getJesusEpisode(slug);
  if (!episode) return { title: "Vida de Jesus" };
  return { title: `${episode.title} · Vida de Jesus em mapas`, description: episode.summary };
}

const GOSPELS: Gospel[] = ["Mateus", "Marcos", "Lucas", "João"];

export default async function JesusEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getJesusEpisode(slug);
  if (!episode) notFound();
  const index = jesusEpisodes.findIndex((item) => item.slug === episode.slug);
  const previous = jesusEpisodes[index - 1];
  const next = jesusEpisodes[index + 1];
  const part = jesusParts.find((item) => item.part === episode.part);

  const stops: MapStop[] = resolveJesusStops(episode).map((stop) => ({
    n: stop.n,
    siteId: stop.siteId,
    name: stop.name,
    modern: stop.modern,
    certainty: stop.certainty,
    lng: stop.lng,
    lat: stop.lat,
    title: stop.title,
    date: stop.date,
    kind: stop.kind,
    text: stop.text,
    refs: stop.refs,
    archaeology: stop.archaeology,
  }));
  const routes = episode.routes.map((route) => ({ label: route.label, side: route.side, dashed: route.dashed, coords: resolvePath(route.path) }));
  const yearAnchor = episode.year < 0 ? `ano-${-episode.year}-ac` : `ano-${episode.year}-dc`;

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/jesus" className="hover:text-gold">
          Vida de Jesus
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link href={`/jesus#${episode.part}`} className="hover:text-gold">
          {part?.title}
        </Link>
      </p>
      <h1 className="mt-3 max-w-5xl font-heading text-4xl tracking-tight text-ink md:text-6xl">{episode.title}</h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-gold uppercase">
        {episode.ref} · {episode.date}
      </p>
      <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">{episode.summary}</p>

      <section aria-labelledby="evangelhos" className="mt-8">
        <h2 id="evangelhos" className="sr-only">
          Nos quatro Evangelhos
        </h2>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {GOSPELS.map((gospel) => {
            const ref = episode.gospels[gospel];
            return (
              <li key={gospel} className={`rounded-sm border px-4 py-3 ${ref ? "border-gold/40 bg-gold/5" : "border-white/10 opacity-60"}`}>
                <p className="font-sans text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{gospel}</p>
                {ref ? (
                  <Link href={`/jesus/evangelhos/${gospelSlug[gospel]}#${episode.slug}`} className="mt-0.5 block font-heading text-lg text-gold hover:underline">
                    {ref}
                  </Link>
                ) : (
                  <p className="mt-0.5 text-sm text-muted-foreground">não narra</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {episode.image ? (
        <div className="mt-8">
          <SceneArt src={episode.image} alt={episode.imageAlt ?? episode.title} />
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="font-heading text-3xl md:text-4xl">O mapa</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Toque nos números para seguir o episódio parada por parada. Os lugares com “?” têm identificação debatida; as áreas coloridas
          mostram, de modo aproximado, quem governava cada região.
        </p>
        <div className="mt-5">
          <EpisodeMap
            stops={stops}
            routes={routes}
            areas={episode.areas}
            labels={episode.labels}
            bounds={episode.bounds}
            poster={jesusPoster(episode.slug)}
            title={episode.title}
            models={modelForSiteNT}
            kinds={jesusKindLabel}
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
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-xs text-muted-foreground">
          {[...new Set(episode.areas.map((area) => area.side))].map((side) => (
            <li key={side} className="inline-flex items-center gap-2">
              <span className="inline-block size-3 rounded-sm opacity-70" style={{ background: sideColor[side] }} />
              {sideLabel[side]}
            </li>
          ))}
        </ul>
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
          {episode.related?.length ? (
            <div className="folio p-6">
              <h2 className="font-heading text-2xl">Veja também</h2>
              <ul className="mt-3 space-y-2">
                {episode.related.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-gold hover:underline">
                      {item.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="folio p-6">
            <h2 className="font-heading text-2xl">Na linha do tempo</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Augusto, Tibério, Herodes e seus filhos, Pilatos, Anás e Caifás, ano a ano, com os debates sobre as datas.
            </p>
            <Link href={`/jesus/linha-do-tempo#${yearAnchor}`} className="mt-3 inline-block font-sans text-sm text-gold hover:underline">
              Abrir a linha do tempo →
            </Link>
          </div>
          <div className="folio p-6">
            <h2 className="font-heading text-2xl">Jerusalém em 3D</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              O Segundo Templo e seus pátios, a Antônia, o palácio de Herodes, o Gólgota e o Getsêmani numa maquete para atravessar a pé.
            </p>
            <Link href="/historia/maquetes/jerusalem-herodes" className="mt-3 inline-block font-sans text-sm text-gold hover:underline">
              Abrir a maquete →
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
                  {[jesusKindLabel[stop.kind], stop.date, `${stop.name}${stop.certainty === "debatida" ? " (?)" : ""}, ${stop.modern}`].filter(Boolean).join(" · ")} (
                  {certaintyLabel[stop.certainty]})
                </p>
                <p className="mt-2 text-sm leading-relaxed">{stop.text}</p>
                {stop.archaeology ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-sans text-[11px] tracking-[0.12em] text-gold/80 uppercase">Arqueologia · </span>
                    {stop.archaeology}
                  </p>
                ) : null}
                <p className="mt-2 font-sans text-xs tracking-[0.1em] text-gold uppercase">{stop.refs}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-sm">
        {previous ? (
          <Link href={`/jesus/${previous.slug}`} className="text-gold hover:underline">
            ← {previous.title}
          </Link>
        ) : (
          <Link href="/jesus" className="text-gold hover:underline">
            ← Vida de Jesus
          </Link>
        )}
        {next ? (
          <Link href={`/jesus/${next.slug}`} className="text-right text-gold hover:underline">
            {next.title} →
          </Link>
        ) : (
          <Link href="/jesus" className="text-gold hover:underline">
            Vida de Jesus →
          </Link>
        )}
      </nav>
    </article>
  );
}
