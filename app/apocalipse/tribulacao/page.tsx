import type { Metadata } from "next";
import Link from "next/link";

import { ChapterNav } from "@/components/apocalipse/chapter-nav";
import { RefText } from "@/components/apocalipse/ref-text";
import { SeventyWeeksDiagram, ViewTimeline } from "@/components/apocalipse/tribulacao-diagrams";
import { TribulacaoTabs } from "@/components/apocalipse/tribulacao-parts";
import { PageHeader } from "@/components/page-header";
import { sermaoNote } from "@/lib/apocalipse-tribulacao/mateus";
import { framing, keyTexts, otherFrameworks, views } from "@/lib/apocalipse-tribulacao/visoes";

export const metadata: Metadata = {
  title: "Pré, meio e pós-tribulação",
  description:
    "As posições sobre o arrebatamento e a tribulação lado a lado, com linhas do tempo, textos-chave, argumentos, objeções e origem histórica, a partir das 70 semanas de Daniel e de Mateus 24.",
};

const comparison: { label: string; values: Record<string, string> }[] = [
  {
    label: "Quando é o arrebatamento",
    values: {
      pre: "Antes da 70ª semana",
      meio: "Na metade da semana",
      "pre-ira": "Na 2ª metade, antes da ira (sexto/sétimo selo)",
      pos: "No fim, junto com a volta visível",
    },
  },
  {
    label: "A igreja passa pela tribulação?",
    values: {
      pre: "Não",
      meio: "Pela 1ª metade",
      "pre-ira": "Pela perseguição do Anticristo, não pela ira",
      pos: "Sim, guardada por Deus",
    },
  },
  {
    label: "Vinda em duas fases?",
    values: { pre: "Sim", meio: "Sim", "pre-ira": "Sim", pos: "Não: uma só vinda" },
  },
  {
    label: "Desde quando",
    values: {
      pre: "Darby, anos 1830",
      meio: "Século XX (minoria)",
      "pre-ira": "Van Kampen e Rosenthal, c. 1990",
      pos: "Expectativa comum na igreja antiga; forma moderna no séc. XX",
    },
  },
];

export default function TribulacaoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <PageHeader
        kicker="Apocalipse · Tribulação"
        title="Pré, meio e pós"
        lede="Quando os fiéis serão arrebatados em relação à grande tribulação? As respostas partem das setenta semanas de Daniel 9 e do sermão de Jesus no monte das Oliveiras (Mateus 24–25). Aqui as posições aparecem lado a lado, com os textos que cada uma usa e as objeções que recebe. O atlas não escolhe uma."
      />

      <ChapterNav active="tribulacao" className="mt-8" />
      <TribulacaoTabs current="geral" />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="folio p-6 md:p-7">
          <h2 className="font-heading text-2xl md:text-3xl">De onde vem a pergunta</h2>
          {framing.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="mt-4 leading-relaxed text-foreground/90">
              <RefText text={paragraph} bareIsAp={false} />
            </p>
          ))}
        </div>
        <aside className="flex flex-col gap-4">
          <Link href="/apocalipse/tribulacao/daniel-9" className="folio group block p-5 hover:border-gold/50">
            <p className="kicker">Daniel 9:24–27</p>
            <p className="mt-1 font-heading text-2xl">As setenta semanas</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Versículo por versículo: os seis objetivos, os 7 + 62 + 1, os decretos e os cálculos, o
              ungido cortado, a aliança e a abominação desoladora.
            </p>
            <span className="mt-3 inline-block font-sans text-sm text-gold group-hover:underline">Abrir →</span>
          </Link>
          <Link href="/apocalipse/tribulacao/mateus-24" className="folio group block p-5 hover:border-gold/50">
            <p className="kicker">Mateus 24–25</p>
            <p className="mt-1 font-heading text-2xl">O sermão do monte das Oliveiras</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Seção por seção: o templo, as dores, a abominação, a grande tribulação, a vinda do Filho
              do Homem, &ldquo;esta geração&rdquo; e as parábolas.
            </p>
            <span className="mt-3 inline-block font-sans text-sm text-gold group-hover:underline">Abrir →</span>
          </Link>
          <p className="rounded-xl border border-gold/25 bg-gold/[0.05] p-4 text-sm leading-relaxed text-muted-foreground">
            <span className="kicker mr-2">Nota</span>
            {sermaoNote}
          </p>
        </aside>
      </section>

      <section id="setenta-semanas" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">As setenta semanas, em três leituras</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Daniel 9:24–27 divide 70 semanas (490 anos, para quase todos os intérpretes) em 7 + 62 + 1. O
          diagrama está fora de escala. Os pontos de partida e as contas estão no{" "}
          <Link href="/apocalipse/tribulacao/daniel-9#decretos" className="text-gold hover:underline">
            estudo de Daniel 9
          </Link>
          .
        </p>
        <div className="folio mt-6 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            <SeventyWeeksDiagram />
          </div>
        </div>
      </section>

      <section id="posicoes" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">As posições lado a lado</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Cada linha do tempo segue o esquema futurista comum às quatro posições: a era da igreja, a 70ª
          semana de Daniel (sete anos, em duas metades), a volta visível de Cristo e o milênio. Muda o
          momento do arrebatamento e o que cada uma chama de &ldquo;ira de Deus&rdquo;.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {views.map((view) => (
            <a key={view.id} href={`#${view.id}`} className="folio block p-4 hover:border-gold/50">
              <p className="flex items-center gap-2 font-heading text-xl">
                {view.name}
                {view.tag ? (
                  <span className="rounded-full border border-gold/40 px-2 py-0.5 font-sans text-[10px] tracking-[0.14em] text-gold uppercase">
                    {view.tag}
                  </span>
                ) : null}
              </p>
              <div className="mt-3">
                <ViewTimeline view={view.id} title={view.name} />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-sans text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-gold/25 p-3 text-left text-[11px] tracking-[0.14em] text-gold uppercase" />
                {views.map((view) => (
                  <th key={view.id} className="border-b border-gold/25 p-3 text-left font-heading text-base font-medium">
                    {view.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label}>
                  <th className="border-b border-white/10 p-3 text-left align-top text-[11px] font-semibold tracking-[0.12em] text-gold uppercase">
                    {row.label}
                  </th>
                  {views.map((view) => (
                    <td key={view.id} className="border-b border-white/10 p-3 align-top text-muted-foreground">
                      {row.values[view.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {views.map((view) => (
            <article key={view.id} id={view.id} className="folio scroll-mt-32 p-5 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 font-heading text-3xl tracking-tight">
                    {view.name}
                    {view.tag ? (
                      <span className="rounded-full border border-gold/40 px-2 py-0.5 font-sans text-[10px] tracking-[0.14em] text-gold uppercase">
                        {view.tag}
                      </span>
                    ) : null}
                  </h3>
                  <div className="mt-4 rounded-xl border border-white/10 bg-[#0d131c] p-3">
                    <ViewTimeline view={view.id} title={view.name} />
                  </div>
                  <p className="mt-4 leading-relaxed">
                    <RefText text={view.summary} bareIsAp={false} />
                  </p>
                  <p className="mt-4 font-sans text-sm text-muted-foreground">
                    <span className="mr-2 text-[11px] tracking-[0.14em] text-gold uppercase">Textos-chave</span>
                    {view.texts.map((text, index) => (
                      <span key={text}>
                        {index > 0 ? " · " : ""}
                        <RefText text={text} bareIsAp={false} />
                      </span>
                    ))}
                  </p>
                </div>
                <div className="grid gap-5">
                  <div>
                    <h4 className="kicker">Principais argumentos</h4>
                    <ul className="mt-2 space-y-2">
                      {view.arguments.map((item) => (
                        <li key={item.slice(0, 40)} className="relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.6em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-gold/70">
                          <RefText text={item} bareIsAp={false} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="kicker">Principais objeções</h4>
                    <ul className="mt-2 space-y-2">
                      {view.objections.map((item) => (
                        <li key={item.slice(0, 40)} className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.6em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-[#c2573f]">
                          <RefText text={item} bareIsAp={false} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="kicker">Origem histórica</h4>
                    {view.origin.map((item) => (
                      <p key={item.slice(0, 40)} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        <RefText text={item} bareIsAp={false} />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="textos" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">Os textos em disputa</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Os mesmos textos, lidos de modos diferentes. Os links levam ao estudo versículo por versículo do
          Apocalipse e ao glossário.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {keyTexts.map((item) => (
            <article key={item.title} className="folio flex flex-col p-5">
              <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">{item.ref}</p>
              <h3 className="mt-1 font-heading text-2xl">{item.title}</h3>
              <p className="mt-2 leading-relaxed">
                <RefText text={item.says} bareIsAp={false} />
              </p>
              <dl className="mt-3 space-y-2">
                {item.readings.map((reading) => (
                  <div key={reading.view} className="rounded-lg border border-white/10 bg-[#10161f] px-3 py-2">
                    <dt className="font-sans text-[11px] font-semibold tracking-[0.12em] text-gold/90 uppercase">
                      {reading.view}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      <RefText text={reading.text} bareIsAp={false} />
                    </dd>
                  </div>
                ))}
              </dl>
              {item.links?.length ? (
                <p className="mt-3 flex flex-wrap gap-2 font-sans text-sm">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-gold/30 px-3 py-1 text-gold hover:border-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="outras" className="mt-14 scroll-mt-32">
        <h2 className="font-heading text-3xl tracking-tight md:text-4xl">Leituras que não usam este esquema</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          As quatro posições acima pressupõem o pré-milenarismo futurista e uma 70ª semana ainda futura.
          Boa parte da tradição cristã não pensa nesses termos; para ela a pergunta &ldquo;pré, meio ou
          pós&rdquo; não se coloca.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {otherFrameworks.map((item) => (
            <div key={item.name} className="folio p-5">
              <h3 className="font-heading text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <RefText text={item.text} bareIsAp={false} />
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Ver também o estudo de{" "}
          <Link href="/apocalipse/capitulo/20#leituras" className="text-gold hover:underline">
            Apocalipse 20 e as leituras do milênio
          </Link>{" "}
          e o glossário:{" "}
          <Link href="/apocalipse/simbolos#n3-e-meio" className="text-gold hover:underline">
            3½
          </Link>
          ,{" "}
          <Link href="/apocalipse/simbolos#grande-tribulacao" className="text-gold hover:underline">
            grande tribulação
          </Link>
          ,{" "}
          <Link href="/apocalipse/simbolos#arrebatamento" className="text-gold hover:underline">
            arrebatamento
          </Link>
          ,{" "}
          <Link href="/apocalipse/simbolos#abominacao-desoladora" className="text-gold hover:underline">
            abominação desoladora
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
