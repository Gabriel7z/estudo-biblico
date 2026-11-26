import Link from "next/link";

import { RefText } from "@/components/apocalipse/ref-text";
import type { Passage } from "@/lib/apocalipse-tribulacao/types";
import { cn } from "cn";

const TABS = [
  { href: "/apocalipse/tribulacao", key: "geral", label: "Pré, meio e pós" },
  { href: "/apocalipse/tribulacao/daniel-9", key: "daniel", label: "Daniel 9: 70 semanas" },
  { href: "/apocalipse/tribulacao/mateus-24", key: "mateus", label: "Mateus 24–25" },
] as const;

export function TribulacaoTabs({ current }: { current: (typeof TABS)[number]["key"] }) {
  return (
    <nav aria-label="Partes do estudo da tribulação" className="mt-6 flex flex-wrap gap-2 font-sans text-sm">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          aria-current={tab.key === current ? "page" : undefined}
          className={cn(
            "rounded-full px-4 py-2",
            tab.key === current
              ? "bg-gold font-semibold text-[#1a140c]"
              : "border border-white/15 text-muted-foreground hover:border-gold/50 hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

/** Um trecho estudado: paráfrase, notas, termos, paralelos e leituras. */
export function PassageBlock({ passage, lang }: { passage: Passage; lang: "he" | "grc" }) {
  return (
    <article id={passage.id} className="scroll-mt-32 border-t border-white/10 py-8 target:bg-gold/[0.04]">
      <a href={`#${passage.id}`} className="font-sans text-[11px] tracking-[0.16em] text-gold uppercase hover:underline">
        {passage.ref}
      </a>
      <h3 className="mt-1 font-heading text-2xl tracking-tight text-ink md:text-3xl">{passage.title}</h3>
      <p className="mt-4 border-l-2 border-gold/50 pl-4 font-heading text-lg leading-snug text-ink md:text-xl">
        {passage.text}
      </p>
      <ul className="mt-5 space-y-2.5">
        {passage.notes.map((note) => (
          <li
            key={note.slice(0, 40)}
            className="relative pl-4 leading-relaxed text-foreground/90 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-gold/70"
          >
            <RefText text={note} bareIsAp={false} />
          </li>
        ))}
      </ul>
      {passage.terms?.length ? (
        <dl className="mt-5 grid gap-2 sm:grid-cols-2">
          {passage.terms.map((term) => (
            <div key={term.tr} className="rounded-xl border border-gold/15 bg-[#10161f] px-4 py-3">
              <dt>
                <span
                  className="font-heading text-lg text-gold"
                  lang={/[\u0590-\u05FF]/.test(term.gr) ? "he" : lang}
                  dir="auto"
                >
                  {term.gr}
                </span>{" "}
                <span className="font-sans text-sm text-muted-foreground italic">{term.tr}</span>
              </dt>
              <dd className="mt-0.5 text-sm">{term.mean}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {passage.parallels?.length ? (
        <p className="mt-4 font-sans text-sm text-muted-foreground">
          <span className="mr-2 text-[11px] tracking-[0.14em] text-gold uppercase">Paralelos</span>
          {passage.parallels.map((ref, index) => (
            <span key={ref}>
              {index > 0 ? " · " : ""}
              <RefText text={ref} bareIsAp={false} />
            </span>
          ))}
        </p>
      ) : null}
      {passage.readings?.length ? (
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {passage.readings.map((reading) => (
            <div key={reading.school} className="rounded-xl border border-white/10 bg-[#10161f] p-4">
              <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">{reading.school}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                <RefText text={reading.text} bareIsAp={false} />
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
