import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChurchesMap } from "@/components/apocalipse/churches-map";
import { JerusalemStage } from "@/components/apocalipse/jerusalem-stage";
import { VisionArt } from "@/components/apocalipse/vision-art";
import { getVision, visions } from "@/lib/apocalipse";
import { chapters } from "@/lib/apocalipse-capitulos";

export const dynamicParams = false;

export function generateStaticParams() {
  return visions.map((vision) => ({ slug: vision.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vision = getVision(slug);
  if (!vision) return { title: "Apocalipse" };
  return {
    title: vision.title,
    description: vision.saw[0],
  };
}

export default async function VisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vision = getVision(slug);
  if (!vision) notFound();
  const index = visions.findIndex((item) => item.slug === vision.slug);
  const previous = visions[index - 1];
  const next = visions[index + 1];
  const studyChapters = chapters.filter((chapter) => chapter.scenes.includes(vision.slug)).map((c) => c.n);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">
        <Link href="/apocalipse" className="hover:text-gold">
          Apocalipse
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        {String(vision.order).padStart(2, "0")}
      </p>
      <h1 className="mt-3 max-w-4xl font-heading text-5xl tracking-tight text-ink md:text-7xl">
        {vision.title}
      </h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-gold uppercase">{vision.ref}</p>

      <div className="mt-8">
        <VisionArt slug={vision.slug} />
      </div>

      {vision.slug === "igrejas" ? (
        <div className="mt-8">
          <ChurchesMap />
        </div>
      ) : null}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="folio p-6">
          <h2 className="font-heading text-3xl">O que João viu</h2>
          {vision.saw.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
        <section className="folio p-6">
          <h2 className="font-heading text-3xl">O que significa</h2>
          {vision.means.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      {vision.slug === "jerusalem" ? <JerusalemStage /> : null}

      {studyChapters.length ? (
        <section className="folio mt-10 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            <span className="kicker mr-2">Estudo</span>
            Cada versículo desta cena, com símbolos, termos gregos e ecos do Antigo Testamento.
          </p>
          <div className="flex shrink-0 flex-wrap gap-2 font-sans text-sm">
            {studyChapters.map((n) => (
              <Link
                key={n}
                href={`/apocalipse/capitulo/${n}`}
                className="rounded-full border border-gold/40 px-4 py-2 text-gold hover:border-gold"
              >
                Apocalipse {n} →
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-sm">
        {previous ? (
          <Link href={`/apocalipse/${previous.slug}`} className="text-gold hover:underline">
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/apocalipse/${next.slug}`} className="text-right text-gold hover:underline">
            {next.title}
          </Link>
        ) : (
          <Link href="/apocalipse" className="text-gold hover:underline">
            Todas as visões
          </Link>
        )}
      </nav>
    </article>
  );
}
