import type { Metadata } from "next";
import Link from "next/link";

import { ChapterNav } from "@/components/apocalipse/chapter-nav";
import { RefText } from "@/components/apocalipse/ref-text";
import { PageHeader } from "@/components/page-header";
import { symbolGroups, symbolIndex, symbols } from "@/lib/apocalipse-capitulos";
import { chapterVerseHref } from "@/lib/apocalipse-capitulos/refs";

export const metadata: Metadata = {
  title: "Símbolos do Apocalipse",
  description:
    "Glossário dos números, cores, seres, objetos e lugares do Apocalipse, com o sentido no livro, as fontes no Antigo Testamento e todos os versículos onde aparecem.",
};

export default function SymbolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <PageHeader
        kicker="Apocalipse · Glossário"
        title="Símbolos"
        lede={`${symbols.length} símbolos do livro: números, cores, seres, objetos e lugares. Cada verbete diz o que o símbolo significa no Apocalipse, de onde ele vem no Antigo Testamento e em quais versículos aparece. Onde as escolas divergem, a divergência fica registrada.`}
      />

      <ChapterNav active="simbolos" className="mt-8" />

      <nav aria-label="Grupos de símbolos" className="mt-8 flex flex-wrap gap-2 font-sans text-sm">
        {symbolGroups.map((group) => (
          <a
            key={group.id}
            href={`#grupo-${group.id}`}
            className="rounded-full border border-white/15 px-4 py-2 text-muted-foreground hover:border-gold/50 hover:text-foreground"
          >
            {group.label}
          </a>
        ))}
      </nav>

      {symbolGroups.map((group) => {
        const entries = symbols.filter((symbol) => symbol.group === group.id);
        return (
          <section key={group.id} id={`grupo-${group.id}`} className="mt-14 scroll-mt-32">
            <h2 className="font-heading text-4xl tracking-tight">{group.label}</h2>
            <p className="mt-2 text-muted-foreground">{group.lede}</p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-sans text-sm">
              {entries.map((entry) => (
                <a key={entry.id} href={`#${entry.id}`} className="text-gold/90 hover:underline">
                  {entry.name}
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              {entries.map((entry) => {
                const places = symbolIndex.get(entry.id) ?? [];
                return (
                  <article key={entry.id} id={entry.id} className="folio scroll-mt-32 p-5 md:p-6">
                    <h3 className="font-heading text-2xl text-ink md:text-3xl">
                      <a href={`#${entry.id}`} className="hover:text-gold">
                        {entry.name}
                      </a>
                    </h3>
                    <p className="mt-3 leading-relaxed">
                      <RefText text={entry.meaning} />
                    </p>
                    {entry.note ? (
                      <p className="mt-3 border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                        <RefText text={entry.note} />
                      </p>
                    ) : null}
                    {entry.refs?.length ? (
                      <p className="mt-4 font-sans text-sm text-muted-foreground">
                        <span className="mr-2 text-[11px] tracking-[0.14em] text-gold uppercase">
                          Fontes
                        </span>
                        <RefText text={entry.refs.join(" · ")} bareIsAp={false} />
                      </p>
                    ) : null}
                    {places.length ? (
                      <div className="mt-3 font-sans text-sm">
                        <span className="mr-2 text-[11px] tracking-[0.14em] text-gold uppercase">
                          Aparece em ({places.length})
                        </span>
                        <span className="inline-flex flex-wrap gap-x-2 gap-y-1">
                          {places.map(([c, v]) => (
                            <Link
                              key={`${c}-${v}`}
                              href={chapterVerseHref(c, v)}
                              className="text-muted-foreground tabular-nums hover:text-gold"
                            >
                              {c}:{v}
                            </Link>
                          ))}
                        </span>
                      </div>
                    ) : null}
                    {entry.more ? (
                      <Link
                        href={entry.more.href}
                        className="mt-4 inline-block font-sans text-sm text-gold hover:underline"
                      >
                        {entry.more.label} →
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
