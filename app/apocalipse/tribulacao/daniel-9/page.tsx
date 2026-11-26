import type { Metadata } from "next";
import Link from "next/link";

import { ChapterNav } from "@/components/apocalipse/chapter-nav";
import { RefText } from "@/components/apocalipse/ref-text";
import { SeventyWeeksDiagram } from "@/components/apocalipse/tribulacao-diagrams";
import { PassageBlock, TribulacaoTabs } from "@/components/apocalipse/tribulacao-parts";
import { PageHeader } from "@/components/page-header";
import {
  danielIntro,
  danielNumbers,
  danielPassages,
  danielReadingsLegend,
  decrees,
} from "@/lib/apocalipse-tribulacao/daniel";

export const metadata: Metadata = {
  title: "Daniel 9: as setenta semanas",
  description:
    "Daniel 9:24–27 versículo por versículo: os seis objetivos, as 7 + 62 + 1 semanas, os decretos de Ciro e Artaxerxes, os cálculos, o ungido cortado, a aliança e a abominação desoladora, nas leituras messiânica, dispensacionalista, histórico-crítica e simbólica.",
};

export default function DanielPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <PageHeader
        kicker="Apocalipse · Tribulação · Daniel 9"
        title="As setenta semanas"
        lede="Quatro versículos de Daniel sustentam toda a cronologia da tribulação futura: a 70ª semana, os sete anos e a sua metade. Aqui estão, um a um, com as dificuldades do hebraico e as leituras que disputam o seu sentido."
      />

      <ChapterNav active="tribulacao" className="mt-8" />
      <TribulacaoTabs current="daniel" />

      <section className="folio mt-10 p-6 md:p-7">
        <h2 className="font-heading text-2xl md:text-3xl">Contexto: a oração de Daniel</h2>
        {danielIntro.map((paragraph) => (
          <p key={paragraph.slice(0, 30)} className="mt-4 leading-relaxed text-foreground/90">
            <RefText text={paragraph} bareIsAp={false} />
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">As quatro leituras</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {danielReadingsLegend.map((reading) => (
            <div key={reading.school} className="folio p-5">
              <h3 className="font-heading text-xl text-gold">{reading.school}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <RefText text={reading.text} bareIsAp={false} />
              </p>
            </div>
          ))}
        </div>
        <div className="folio mt-6 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <SeventyWeeksDiagram />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-xs text-muted-foreground">
            Fora de escala. A leitura simbólica não aparece porque não atribui datas às semanas.
          </p>
        </div>
      </section>

      <section className="mt-14" aria-label="Daniel 9:24–27 versículo por versículo">
        <p className="kicker">Versículo por versículo</p>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          O texto de cada versículo é uma paráfrase feita para este estudo, não uma tradução publicada.
        </p>
        <div className="mt-4">
          {danielPassages.map((passage) => (
            <PassageBlock key={passage.id} passage={passage} lang="he" />
          ))}
        </div>
      </section>

      <section id="decretos" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">De qual ordem se conta?</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          &ldquo;Desde a saída da ordem para restaurar e reconstruir Jerusalém&rdquo; (Dn 9:25). Três
          decretos persas são os candidatos mais citados. As contas abaixo mostram o que acontece com 69
          semanas (483 anos) a partir de cada um; lembre que não existe ano zero entre 1 a.C. e 1 d.C.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {decrees.map((decree) => (
            <article key={decree.id} id={`decreto-${decree.id}`} className="folio flex flex-col p-5">
              <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">{decree.date}</p>
              <h3 className="mt-1 font-heading text-2xl">{decree.name}</h3>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{decree.refs}</p>
              <p className="mt-3 text-sm leading-relaxed">{decree.scope}</p>
              <ul className="mt-3 space-y-2">
                {decree.calc.map((line) => (
                  <li key={line.slice(0, 40)} className="rounded-lg border border-white/10 bg-[#10161f] px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                    <RefText text={line} bareIsAp={false} />
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 font-sans text-xs text-muted-foreground">
                <span className="mr-1 tracking-[0.12em] text-gold uppercase">Usado por:</span>
                {decree.usedBy}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Há outras propostas, como o decreto de Dario I (Ed 6:1–12) ou contar a partir da própria
          palavra de Deus a Jeremias. A precisão das contas depende também das datas, discutidas, do
          batismo e da morte de Jesus.
        </p>
      </section>

      <section id="numeros" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">A metade da semana e os outros números</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          A &ldquo;metade da semana&rdquo; (Dn 9:27) é ligada pelos futuristas a outros números de Daniel e do
          Apocalipse. As leituras de cada número estão no estudo de cada versículo.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {danielNumbers.map((item) => (
            <div key={item.label} className="folio p-4">
              <p className="font-heading text-3xl text-gold">{item.value}</p>
              <p className="mt-1 font-sans text-sm font-semibold">{item.label}</p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                <RefText text={item.refs} bareIsAp={false} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="mt-14 grid gap-3 border-t border-white/10 pt-6 font-sans sm:grid-cols-2">
        <Link href="/apocalipse/tribulacao" className="folio block p-4 hover:border-gold/50">
          <span className="text-[11px] tracking-[0.16em] text-gold uppercase">← Visão geral</span>
          <span className="mt-1 block font-heading text-lg">Pré, meio e pós lado a lado</span>
        </Link>
        <Link href="/apocalipse/tribulacao/mateus-24" className="folio block p-4 text-right hover:border-gold/50">
          <span className="text-[11px] tracking-[0.16em] text-gold uppercase">Mateus 24–25 →</span>
          <span className="mt-1 block font-heading text-lg">O sermão do monte das Oliveiras</span>
        </Link>
      </nav>
    </div>
  );
}
