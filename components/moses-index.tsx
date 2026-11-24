"use client";

import Link from "next/link";

import { useReadSlugs } from "@/components/read-toggle";
import { stations } from "@/lib/stations";

export function MosesIndex() {
  const read = useReadSlugs();

  return (
    <div>
      <p className="font-sans text-sm text-muted-foreground">
        {read.length} de {stations.length} estações marcadas neste navegador.
      </p>
      <ol className="mt-6 border-l border-copper/40">
        {stations.map((station) => {
          const done = read.includes(station.slug);
          return (
            <li key={station.slug} className="relative pb-8 pl-8 last:pb-0">
              <span
                className={
                  done
                    ? "absolute top-1 -left-[7px] size-3 rounded-full border-2 border-copper bg-copper"
                    : "absolute top-1 -left-[7px] size-3 rounded-full border-2 border-copper bg-background"
                }
              />
              <p className="kicker">
                Estação {station.order} · {station.region}
                {done ? " · lida" : ""}
              </p>
              <h2 className="mt-1 font-heading text-2xl">
                <Link className="hover:text-primary" href={`/moises/${station.slug}`}>
                  {station.title}
                </Link>
              </h2>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{station.reading}</p>
              <p className="mt-2 max-w-2xl leading-relaxed">{station.paragraphs[0]}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
