"use client";

import Link from "next/link";
import { useState } from "react";

import { series } from "@/lib/apocalipse";
import { cn } from "cn";

export function SeriesDiagram() {
  const [open, setOpen] = useState<(typeof series)[number]["id"]>("selos");
  const current = series.find((item) => item.id === open) ?? series[0];

  return (
    <div className="folio p-5 md:p-7">
      <div className="flex flex-wrap gap-2">
        {series.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(item.id)}
            className={cn(
              "rounded-full px-4 py-2 font-sans text-sm",
              item.id === open
                ? "bg-primary text-primary-foreground"
                : "border border-white/15 text-muted-foreground hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {current.items.map((label, index) => (
          <li key={label} className="rounded-2xl border border-white/10 bg-[#10161f] p-3">
            <p className="font-heading text-2xl text-gold">{index + 1}</p>
            <p className="mt-1 text-sm leading-snug">{label}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm text-muted-foreground">
        Os selos abrem o livro. No sétimo selo entram as trombetas. As taças são chamadas de as
        últimas pragas. A ordem é a do livro. O que cada série “cobre” no calendário é o ponto em
        que as escolas se separam.
      </p>
      <Link href={current.href} className="mt-4 inline-block font-sans text-sm text-gold hover:underline">
        Abrir a visão desta série
      </Link>
    </div>
  );
}
