import type { Metadata } from "next";
import Link from "next/link";

import { ChapterNav } from "@/components/apocalipse/chapter-nav";
import { RefText } from "@/components/apocalipse/ref-text";
import { PassageBlock, TribulacaoTabs } from "@/components/apocalipse/tribulacao-parts";
import { PageHeader } from "@/components/page-header";
import { mateusIntro, mateusPassages, sermaoNote } from "@/lib/apocalipse-tribulacao/mateus";

export const metadata: Metadata = {
  title: "Mateus 24–25: o sermão do monte das Oliveiras",
  description:
    "Mateus 24–25 seção por seção: a pergunta sobre o templo, as dores, a abominação da desolação, a grande tribulação, a vinda do Filho do Homem, \"esta geração\", \"um será tomado\" e as parábolas, nas leituras preterista e futurista.",
};

export default function MateusPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <PageHeader
        kicker="Apocalipse · Tribulação · Mateus 24–25"
        title="O sermão do monte das Oliveiras"
        lede="Jesus, diante do templo, fala da sua destruição, da grande tribulação e da vinda do Filho do Homem. É a fonte da expressão “grande tribulação” e o texto que todas as posições sobre o arrebatamento precisam explicar."
      />

      <ChapterNav active="tribulacao" className="mt-8" />
      <TribulacaoTabs current="mateus" />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="folio p-6 md:p-7">
          <h2 className="font-heading text-2xl md:text-3xl">Dois horizontes</h2>
          {mateusIntro.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="mt-4 leading-relaxed text-foreground/90">
              <RefText text={paragraph} bareIsAp={false} />
            </p>
          ))}
        </div>
        <aside className="flex flex-col gap-4">
          <p className="rounded-xl border border-gold/25 bg-gold/[0.05] p-4 text-sm leading-relaxed text-muted-foreground">
            <span className="kicker mr-2">Nota</span>
            {sermaoNote}
          </p>
          <Link
            href="/jesus/sermao-do-monte-das-oliveiras"
            className="rounded-xl border border-gold/25 p-4 text-sm leading-relaxed text-gold hover:bg-gold/[0.06]"
          >
            <span className="kicker mr-2">Mapa</span>
            Onde e quando: o Templo, o Monte das Oliveiras e a última semana, na Vida de Jesus em mapas →
          </Link>
          <div className="folio p-5">
            <h2 className="kicker">Roteiro</h2>
            <ol className="mt-3 space-y-1">
              {mateusPassages.map((passage) => (
                <li key={passage.id}>
                  <a href={`#${passage.id}`} className="flex gap-3 rounded-lg px-2 py-1 text-sm leading-snug hover:bg-white/5">
                    <span className="w-16 shrink-0 font-sans text-gold tabular-nums">
                      {passage.chapter}:{passage.from}–{passage.to}
                    </span>
                    <span>{passage.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      <section className="mt-14" aria-label="Mateus 24–25 seção por seção">
        <p className="kicker">Seção por seção</p>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          O texto de cada seção é um resumo em paráfrase, não uma tradução publicada.
        </p>
        <div className="mt-4">
          {mateusPassages.map((passage, index) => (
            <div key={passage.id}>
              {index === 9 ? (
                <h2 className="mt-10 mb-2 font-heading text-3xl tracking-tight md:text-4xl">
                  Mateus 25: as parábolas da espera
                </h2>
              ) : null}
              <PassageBlock passage={passage} lang="grc" />
            </div>
          ))}
        </div>
      </section>

      <nav className="mt-14 grid gap-3 border-t border-white/10 pt-6 font-sans sm:grid-cols-2">
        <Link href="/apocalipse/tribulacao/daniel-9" className="folio block p-4 hover:border-gold/50">
          <span className="text-[11px] tracking-[0.16em] text-gold uppercase">← Daniel 9</span>
          <span className="mt-1 block font-heading text-lg">As setenta semanas</span>
        </Link>
        <Link href="/apocalipse/tribulacao" className="folio block p-4 text-right hover:border-gold/50">
          <span className="text-[11px] tracking-[0.16em] text-gold uppercase">Visão geral →</span>
          <span className="mt-1 block font-heading text-lg">Pré, meio e pós lado a lado</span>
        </Link>
      </nav>
    </div>
  );
}
