import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { methodNote, timeline } from "@/lib/timeline";

export const metadata: Metadata = {
  title: "Tempo",
  description: "Linha do tempo de estudo do Antigo Testamento, de Ur ao retorno persa.",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="Os séculos"
        title="O tempo do Antigo Testamento"
        lede="Moisés está no meio desta linha, não no começo do mundo e não no fim. Antes dele, um clã no arco fértil. Depois dele, cidades, reis e dois impérios que decidem o mapa."
      />
      <ol className="mt-10 border-l border-kingdom/40">
        {timeline.map((event, index) => (
          <li key={event.id} className="relative pb-8 pl-8 last:pb-0">
            <span className="absolute top-1 -left-[7px] size-3 rounded-full border-2 border-kingdom bg-background" />
            <p className="font-sans text-xs tracking-wide text-muted-foreground uppercase">
              {index + 1 < 10 ? `0${index + 1}` : index + 1} · {event.when}
            </p>
            <h2 className="mt-1 font-heading text-2xl">
              <Link className="hover:text-primary" href={`/eras/${event.era}`}>
                {event.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed">{event.text}</p>
          </li>
        ))}
      </ol>

      <section className="mt-14 rounded-xl border border-border bg-card p-5 md:p-6">
        <h2 className="font-heading text-2xl">Nota de método</h2>
        <div className="study-prose">
          {methodNote.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
