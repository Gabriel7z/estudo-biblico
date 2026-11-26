import type { Metadata } from "next";
import Link from "next/link";

import { JesusTimeline } from "@/components/jesus/jesus-timeline";
import { PageHeader } from "@/components/page-header";
import { jesusStory } from "@/lib/jesus";
import { jesusDebates, jesusEvents, jesusLanes, yearAnchor } from "@/lib/jesus/linha-do-tempo";
import { yearLabel } from "@/lib/jesus/types";

export const metadata: Metadata = {
  title: "Linha do tempo da vida de Jesus",
  description:
    "De 40 a.C. a 45 d.C., lado a lado: a vida de Jesus, Herodes e seus filhos, os imperadores, os prefeitos da Judeia e os sumos sacerdotes, com os debates sobre as datas.",
};

export default function JesusLinhaDoTempoPage() {
  const years = [...new Set([...jesusEvents.map((event) => event.year), ...jesusStory.map((episode) => episode.year)])].sort((a, b) => a - b);
  const laneColor = Object.fromEntries(jesusLanes.map((lane) => [lane.id, lane.color]));
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/jesus" className="hover:text-gold">
          Vida de Jesus
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Linha do tempo
      </p>
      <PageHeader
        kicker="40 a.C.–45 d.C."
        title="De Herodes a Pilatos"
        lede="Cinco faixas paralelas: a vida de Jesus e de João Batista, Herodes e seus filhos, os imperadores, os prefeitos romanos da Judeia e os sumos sacerdotes. Os nomes que Lucas usa para datar o começo do ministério (Lc 3:1–2) estão todos aqui."
      />

      <section className="mt-10">
        <JesusTimeline />
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Os debates sobre as datas</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jesusDebates.map((item) => (
            <li key={item.title} className="folio p-5">
              <p className="font-heading text-xl leading-snug">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-3xl md:text-4xl">Ano a ano</h2>
        <ol className="mt-6 space-y-6 border-l border-gold/25 pl-5">
          {years.map((year) => {
            const evs = jesusEvents.filter((event) => event.year === year);
            const eps = jesusStory.filter((episode) => episode.year === year && !evs.some((event) => event.episode === episode.slug));
            return (
              <li key={year} id={yearAnchor(year)} className="scroll-mt-24">
                <p className="font-heading text-2xl text-gold">{yearLabel(year)}</p>
                <ul className="mt-2 space-y-3">
                  {evs.map((event) => (
                    <li key={event.title} className="text-sm leading-relaxed">
                      <span className="mr-2 inline-block size-2 rounded-full align-middle" style={{ background: laneColor[event.lane] }} />
                      <span className="font-semibold">{event.title}</span>
                      {event.uncertain ? <span className="text-muted-foreground"> (data incerta)</span> : null}.{" "}
                      <span className="text-muted-foreground">{event.text}</span>
                      {event.refs ? <span className="ml-1 font-sans text-xs text-gold/80">{event.refs}</span> : null}
                      {event.episode ? (
                        <Link href={`/jesus/${event.episode}`} className="ml-2 font-sans text-xs text-gold hover:underline">
                          mapa →
                        </Link>
                      ) : null}
                    </li>
                  ))}
                  {eps.map((episode) => (
                    <li key={episode.slug} className="text-sm leading-relaxed">
                      <span className="mr-2 inline-block size-2 rounded-full align-middle" style={{ background: laneColor.jesus }} />
                      <Link href={`/jesus/${episode.slug}`} className="text-ink hover:text-gold">
                        {episode.title}
                      </Link>{" "}
                      <span className="font-sans text-xs text-muted-foreground">
                        {episode.date} · {episode.ref}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        Datas dos governantes por Josefo (Antiguidades 17–20; Guerra 2) e pelos historiadores romanos. Os episódios dos Evangelhos seguem a
        cronologia com morte em 30 d.C.; se foi em 33, o ministério avança três anos.
      </p>
    </div>
  );
}
