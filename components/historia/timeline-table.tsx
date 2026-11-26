"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { events, lanes, type Lane } from "@/lib/historia/linha-do-tempo";
import { cn } from "cn";

const periods = [
  { label: "Juízes e Saul", from: 1100, to: 1011 },
  { label: "Davi e Salomão", from: 1010, to: 932 },
  { label: "Reino dividido", from: 931, to: 723 },
  { label: "Judá sob a Assíria", from: 722, to: 610 },
  { label: "Babilônia e exílio", from: 609, to: 540 },
  { label: "Pérsia", from: 539, to: 334 },
  { label: "Gregos", from: 333, to: 160 },
];

export function TimelineTable() {
  const [off, setOff] = useState<Set<Lane>>(new Set());
  const [onlyWars, setOnlyWars] = useState(false);

  const rows = useMemo(() => {
    const byYear = new Map<number, typeof events>();
    for (const event of events) {
      if (off.has(event.lane)) continue;
      if (onlyWars && !event.war) continue;
      byYear.set(event.year, [...(byYear.get(event.year) ?? []), event]);
    }
    return [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  }, [off, onlyWars]);

  const toggle = (lane: Lane) =>
    setOff((current) => {
      const next = new Set(current);
      if (next.has(lane)) next.delete(lane);
      else next.add(lane);
      return next;
    });

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {lanes.map((lane) => (
          <button
            key={lane.id}
            type="button"
            onClick={() => toggle(lane.id)}
            className={cn("rounded-full border px-3 py-1.5 font-sans text-xs", off.has(lane.id) ? "border-white/10 text-muted-foreground line-through" : "border-transparent text-[#1a140c]")}
            style={off.has(lane.id) ? undefined : { background: lane.color }}
            aria-pressed={!off.has(lane.id)}
          >
            {lane.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOnlyWars((v) => !v)}
          className={cn("rounded-full border px-3 py-1.5 font-sans text-xs", onlyWars ? "border-[#e0645a] bg-[#e0645a] text-[#1a140c]" : "border-[#e0645a]/50 text-[#f4eee6]")}
          aria-pressed={onlyWars}
        >
          ◆ Só guerras
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-muted-foreground">
        Ir para:
        {periods.map((period) => {
          const target = rows.find(([year]) => year <= period.from && year >= period.to);
          return target ? (
            <a key={period.label} href={`#ano-${target[0]}`} className="text-gold hover:underline">
              {period.label}
            </a>
          ) : null;
        })}
      </div>
      <ol className="mt-6 border-l border-gold/25">
        {rows.map(([year, list]) => (
          <li key={year} id={`ano-${year}`} className="relative scroll-mt-24 pb-6 pl-6">
            <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-gold" />
            <p className="font-heading text-2xl text-gold">
              {year} <span className="font-sans text-xs tracking-[0.14em] text-muted-foreground uppercase">a.C.</span>
              {list.length > 1 ? <span className="ml-3 font-sans text-[11px] tracking-[0.14em] text-muted-foreground uppercase">simultâneos</span> : null}
            </p>
            <ul className="mt-2 grid gap-2 md:grid-cols-2">
              {list.map((event) => {
                const lane = lanes.find((item) => item.id === event.lane)!;
                return (
                  <li key={event.title} className="folio rounded-xl p-3">
                    <p className="flex flex-wrap items-center gap-2 font-sans text-[10px] tracking-[0.14em] uppercase" style={{ color: lane.color }}>
                      {lane.label}
                      {event.war ? <span className="rounded-full bg-[#e0645a] px-2 py-0.5 text-[#1a140c]">guerra</span> : null}
                    </p>
                    <p className="mt-1 leading-snug">
                      {event.episode ? (
                        <Link href={`/historia/mapas/${event.episode}`} className="hover:text-gold">
                          {event.title} <span className="text-gold">→ mapa</span>
                        </Link>
                      ) : (
                        event.title
                      )}
                    </p>
                    {event.ref ? <p className="mt-1 font-sans text-xs text-muted-foreground">{event.ref}</p> : null}
                    {event.debated ? <p className="mt-1 text-xs text-muted-foreground italic">Data discutida: {event.debated}</p> : null}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
