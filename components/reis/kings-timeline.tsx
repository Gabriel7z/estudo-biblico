"use client";

import { useState } from "react";

import { kings, verdictLabel, type King, type Verdict } from "@/lib/reis";

type KingdomFilter = "todos" | "israel" | "juda";
type VerdictFilter = "todos" | Verdict;

const MIN = 935;
const MAX = 580;

const verdictTone: Record<Verdict, string> = {
  bom: "bg-emerald-400/80",
  mau: "bg-rose-400/75",
  misto: "bg-amber-300/80",
  sem: "bg-slate-400/60",
};

const verdictText: Record<Verdict, string> = {
  bom: "text-emerald-300",
  mau: "text-rose-300",
  misto: "text-amber-200",
  sem: "text-slate-300",
};

function span(king: King) {
  const start = Math.min(MIN, king.start);
  const left = ((MIN - start) / (MIN - MAX)) * 100;
  const width = Math.max(((king.start - king.end) / (MIN - MAX)) * 100, 0.9);
  return { left: `${Math.max(left, 0)}%`, width: `${width}%` };
}

function years(king: King) {
  return king.start === king.end ? `${king.start}` : `${king.start}–${king.end}`;
}

function KingRow({ king }: { king: King }) {
  return (
    <li className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-heading text-xl text-ink">{king.name}</p>
        <p className="font-sans text-xs tracking-[0.12em] text-gold uppercase">c. {years(king)} a.C.</p>
      </div>
      {king.kingdom === "unido" ? null : (
        <div className="relative mt-2 h-1.5 rounded-full bg-white/8" aria-hidden>
          <span className={`absolute top-0 h-1.5 rounded-full ${verdictTone[king.verdict]}`} style={span(king)} />
        </div>
      )}
      <p className="mt-2 font-sans text-xs text-muted-foreground">
        <span className={verdictText[king.verdict]}>{verdictLabel[king.verdict]}</span>
        <span> · {king.years} · {king.ref}</span>
      </p>
      {king.prophets.length ? (
        <p className="mt-1 font-sans text-xs text-muted-foreground">
          <span className="text-foreground/80">Profetas: </span>
          {king.prophets.join(", ")}
        </p>
      ) : null}
      {king.note ? <p className="mt-1 text-sm leading-snug text-muted-foreground">{king.note}</p> : null}
    </li>
  );
}

export function KingsTimeline() {
  const [kingdom, setKingdom] = useState<KingdomFilter>("todos");
  const [verdict, setVerdict] = useState<VerdictFilter>("todos");

  const pass = (king: King) => verdict === "todos" || king.verdict === verdict;
  const united = kings.filter((king) => king.kingdom === "unido" && pass(king));
  const israel = kings.filter((king) => king.kingdom === "israel" && pass(king));
  const juda = kings.filter((king) => king.kingdom === "juda" && pass(king));
  const showIsrael = kingdom !== "juda";
  const showJuda = kingdom !== "israel";

  const chip = (on: boolean) =>
    on
      ? "rounded-full bg-primary px-3 py-1.5 font-sans text-sm text-primary-foreground"
      : "rounded-full border border-white/10 px-3 py-1.5 font-sans text-sm text-muted-foreground hover:text-foreground";

  return (
    <div>
      <div className="folio flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Reino">
          {(
            [
              ["todos", "Os dois reinos"],
              ["israel", "Israel (norte)"],
              ["juda", "Judá (sul)"],
            ] as [KingdomFilter, string][]
          ).map(([value, label]) => (
            <button key={value} type="button" className={chip(kingdom === value)} onClick={() => setKingdom(value)} aria-pressed={kingdom === value}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Veredito">
          {(
            [
              ["todos", "Todos"],
              ["bom", "Retos"],
              ["mau", "Maus"],
              ["misto", "Mistos"],
              ["sem", "Sem veredito"],
            ] as [VerdictFilter, string][]
          ).map(([value, label]) => (
            <button key={value} type="button" className={chip(verdict === value)} onClick={() => setVerdict(value)} aria-pressed={verdict === value}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {united.length ? (
        <section className="mt-8">
          <h2 className="font-heading text-3xl">Reino unido</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {united.map((king) => (
              <KingRow key={king.name} king={king} />
            ))}
          </ul>
        </section>
      ) : null}

      <div className={`mt-10 grid gap-8 ${showIsrael && showJuda ? "lg:grid-cols-2" : ""}`}>
        {showIsrael ? (
          <section>
            <h2 className="font-heading text-3xl">Israel</h2>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Reino do norte · capitais Siquém, Tirza e Samaria · cai em 722 a.C.
            </p>
            <ol className="mt-4 space-y-3">
              {israel.map((king) => (
                <KingRow key={`i-${king.name}`} king={king} />
              ))}
              {israel.length === 0 ? <li className="text-muted-foreground">Nenhum rei com esse veredito.</li> : null}
            </ol>
          </section>
        ) : null}
        {showJuda ? (
          <section>
            <h2 className="font-heading text-3xl">Judá</h2>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Reino do sul · capital Jerusalém · dinastia de Davi · cai em 587/586 a.C.
            </p>
            <ol className="mt-4 space-y-3">
              {juda.map((king) => (
                <KingRow key={`j-${king.name}`} king={king} />
              ))}
              {juda.length === 0 ? <li className="text-muted-foreground">Nenhum rei com esse veredito.</li> : null}
            </ol>
          </section>
        ) : null}
      </div>
    </div>
  );
}
