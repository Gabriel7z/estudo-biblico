import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { episodePoster, getEpisode } from "@/lib/historia";
import { wars } from "@/lib/historia/guerras";
import { sideColor } from "@/lib/historia/types";
import { atlasSrc } from "@/lib/imagery";

export const metadata: Metadata = {
  title: "Guerras de Samuel a Daniel",
  description:
    "Todas as guerras, batalhas e cercos de 1 Samuel a 2 Reis e dos profetas Isaías, Jeremias, Ezequiel e Daniel: data, lados, causa, desfecho, textos bíblicos e as fontes fora da Bíblia que os confirmam.",
};

const kindLabel = { batalha: "Batalha", cerco: "Cerco", campanha: "Campanha", guerra: "Guerra" } as const;

export default function GuerrasPage() {
  const sorted = [...wars].sort((a, b) => b.year - a.year);
  const withSources = wars.filter((war) => war.sources.length).length;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/historia" className="hover:text-gold">
          História
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Guerras
      </p>
      <PageHeader
        kicker={`${wars.length} conflitos · ${withSources} com fontes fora da Bíblia`}
        title="As guerras"
        lede="De Afeque, onde a arca foi tomada, ao último cerco de Jerusalém, e daí a Ciro, Alexandre e os macabeus que Daniel descreve. Para cada conflito: quem lutou, por quê, como terminou, onde a Bíblia conta e o que dizem as pedras, os relevos e as crônicas dos outros povos."
      />

      <nav className="mt-8 flex flex-wrap gap-2 font-sans text-xs" aria-label="Índice das guerras">
        {sorted.map((war) => (
          <a key={war.slug} href={`#${war.slug}`} className="rounded-full border border-white/10 px-3 py-1.5 text-muted-foreground hover:border-gold/50 hover:text-gold">
            {war.year} · {war.name}
          </a>
        ))}
      </nav>

      <ol className="mt-10 space-y-6">
        {sorted.map((war) => {
          const episode = war.episode ? getEpisode(war.episode) : undefined;
          return (
            <li key={war.slug} id={war.slug} className="folio scroll-mt-24 overflow-hidden">
              <div className="grid md:grid-cols-[1fr_280px]">
                <div className="p-6 md:p-8">
                  <p className="kicker">
                    {kindLabel[war.kind]} · {war.date}
                  </p>
                  <h2 className="mt-2 font-heading text-3xl leading-tight">{war.name}</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {war.sides.map((side) => (
                      <li
                        key={side.who}
                        className="rounded-full px-3 py-1 font-sans text-xs text-[#1a140c]"
                        style={{ background: sideColor[side.side] }}
                      >
                        {side.who}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-5 grid gap-4 text-sm leading-relaxed md:grid-cols-2">
                    <div>
                      <dt className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">Causa</dt>
                      <dd className="mt-1 text-muted-foreground">{war.cause}</dd>
                    </div>
                    <div>
                      <dt className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">Desfecho</dt>
                      <dd className="mt-1 text-muted-foreground">{war.outcome}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 font-sans text-xs tracking-[0.1em] text-gold uppercase">{war.refs}</p>
                  {war.sources.length ? (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="font-sans text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Fora da Bíblia</p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {war.sources.map((source) => (
                          <li key={source.name}>
                            <span className="text-ink">{source.name}</span>
                            <span className="text-muted-foreground"> ({source.where}): {source.says}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-5 border-t border-white/10 pt-4 text-xs text-muted-foreground">
                      Sem registro conhecido fora da Bíblia; o relato é a única fonte.
                    </p>
                  )}
                </div>
                {episode ? (
                  <Link href={`/historia/mapas/${episode.slug}`} className="group relative block min-h-44 border-t border-white/10 md:border-t-0 md:border-l">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={atlasSrc(episodePoster(episode.slug))}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090d14] to-transparent p-4 font-sans text-sm text-gold">
                      Mapa: {episode.title} →
                    </span>
                  </Link>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
