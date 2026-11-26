import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChapterNav } from "@/components/apocalipse/chapter-nav";
import { RefText } from "@/components/apocalipse/ref-text";
import { getVision } from "@/lib/apocalipse";
import { chapters, getChapter, getSymbol, outline } from "@/lib/apocalipse-capitulos";
import { atlasSrc } from "@/lib/imagery";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ n: String(chapter.n) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const chapter = getChapter(Number(n));
  if (!chapter) return { title: "Apocalipse" };
  return {
    title: `Apocalipse ${chapter.n}: ${chapter.title}`,
    description: chapter.summary.slice(0, 220),
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const chapter = getChapter(Number(n));
  if (!chapter) notFound();

  const previous = getChapter(chapter.n - 1);
  const next = getChapter(chapter.n + 1);
  const parts = outline.filter((part) => chapter.parts.includes(part.id));
  const scenes = chapter.scenes.map((slug) => getVision(slug)).filter((v) => v !== undefined);
  const sectionAt = new Map(chapter.sections.map((section) => [section.from, section.title]));

  return (
    <article className="mx-auto max-w-5xl px-4 pt-10 pb-16 md:px-6 md:pt-14">
      <p className="kicker">
        <Link href="/apocalipse" className="hover:text-gold">
          Apocalipse
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Capítulo {chapter.n} de 22
      </p>
      <h1 className="mt-3 max-w-4xl font-heading text-4xl tracking-tight text-ink md:text-6xl">
        <span className="text-gold">Apocalipse {chapter.n}.</span> {chapter.title}
      </h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-muted-foreground uppercase">
        {chapter.verses.length} versículos ·{" "}
        {parts.map((part, index) => (
          <span key={part.id}>
            {index > 0 ? " · " : ""}
            <Link href={`/apocalipse#parte-${part.id}`} className="text-gold hover:underline">
              {part.label}
            </Link>
          </span>
        ))}
      </p>

      <ChapterNav current={chapter.n} className="mt-8" />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="folio p-6 md:p-7">
          <h2 className="font-heading text-2xl md:text-3xl">O capítulo em resumo</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed">
            <RefText text={chapter.summary} />
          </p>
          <h3 className="mt-7 font-heading text-xl text-gold">Contexto</h3>
          {chapter.context.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-3 leading-relaxed text-muted-foreground">
              <RefText text={paragraph} />
            </p>
          ))}
        </div>

        <aside className="flex flex-col gap-6">
          <div className="folio p-5">
            <h2 className="kicker">Roteiro do capítulo</h2>
            <ol className="mt-3 space-y-1.5">
              {chapter.sections.map((section) => (
                <li key={section.from}>
                  <a
                    href={`#v${section.from}`}
                    className="flex gap-3 rounded-lg px-2 py-1 text-sm leading-snug hover:bg-white/5"
                  >
                    <span className="w-12 shrink-0 font-sans text-gold tabular-nums">
                      {chapter.n}:{section.from}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            {chapter.readings?.length ? (
              <a href="#leituras" className="mt-4 inline-block font-sans text-sm text-gold hover:underline">
                Como as escolas leem este capítulo ↓
              </a>
            ) : null}
          </div>

          {scenes.length || chapter.extras?.length ? (
            <div className="folio p-5">
              <h2 className="kicker">Ver também</h2>
              <ul className="mt-3 space-y-3">
                {scenes.map((vision) => (
                  <li key={vision.slug}>
                    <Link href={`/apocalipse/${vision.slug}`} className="group flex items-center gap-3">
                      <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-md border border-gold/20">
                        <Image
                          src={atlasSrc(vision.image)}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition duration-500 group-hover:scale-110"
                        />
                      </span>
                      <span className="text-sm leading-snug">
                        <span className="block font-sans text-[11px] tracking-[0.14em] text-gold uppercase">
                          Cena ilustrada
                        </span>
                        {vision.title}
                      </span>
                    </Link>
                  </li>
                ))}
                {chapter.extras?.map((extra) => (
                  <li key={extra.href}>
                    <Link href={extra.href} className="text-sm text-gold hover:underline">
                      {extra.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="mt-14" aria-label="Versículo por versículo">
        <p className="kicker">Versículo por versículo</p>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          O texto de cada versículo é uma paráfrase feita para este estudo, não uma tradução
          publicada. Use a sua Bíblia ao lado. Toque no número do versículo para obter o link
          direto.
        </p>

        <div className="mt-6">
          {chapter.verses.map((verse) => {
            const sectionTitle = sectionAt.get(verse.v);
            return (
              <div key={verse.v}>
                {sectionTitle ? (
                  <h2 className="mt-12 mb-2 font-heading text-3xl tracking-tight text-ink md:text-4xl">
                    {sectionTitle}
                  </h2>
                ) : null}
                <article
                  id={`v${verse.v}`}
                  className="scroll-mt-32 border-t border-white/10 py-7 target:bg-gold/[0.04]"
                >
                  <div className="grid gap-4 md:grid-cols-[4.5rem_1fr]">
                    <a
                      href={`#v${verse.v}`}
                      className="font-heading text-3xl leading-none text-gold tabular-nums hover:underline md:text-4xl"
                      aria-label={`Apocalipse ${chapter.n}:${verse.v}`}
                    >
                      <span className="mr-1 align-top font-sans text-[11px] tracking-[0.12em] text-muted-foreground">
                        {chapter.n}:
                      </span>
                      {verse.v}
                    </a>
                    <div className="min-w-0">
                      <p className="font-heading text-xl leading-snug text-ink md:text-2xl">
                        {verse.text}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {verse.notes.map((note) => (
                          <li
                            key={note.slice(0, 40)}
                            className="relative pl-4 leading-relaxed text-foreground/90 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-gold/70"
                          >
                            <RefText text={note} />
                          </li>
                        ))}
                      </ul>

                      {verse.terms?.length ? (
                        <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                          {verse.terms.map((term) => (
                            <div
                              key={term.tr}
                              className="rounded-xl border border-gold/15 bg-[#10161f] px-4 py-3"
                            >
                              <dt>
                                <span className="font-heading text-lg text-gold" lang="grc">
                                  {term.gr}
                                </span>{" "}
                                <span className="font-sans text-sm text-muted-foreground italic">
                                  {term.tr}
                                </span>
                              </dt>
                              <dd className="mt-0.5 text-sm">{term.mean}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      {verse.echoes?.length || verse.symbols?.length ? (
                        <div className="mt-5 flex flex-col gap-2 font-sans text-sm">
                          {verse.echoes?.length ? (
                            <p className="text-muted-foreground">
                              <span className="mr-2 text-[11px] tracking-[0.14em] text-gold uppercase">
                                Ecos
                              </span>
                              {verse.echoes.map((echo, index) => (
                                <span key={echo}>
                                  {index > 0 ? " · " : ""}
                                  <RefText text={echo} />
                                </span>
                              ))}
                            </p>
                          ) : null}
                          {verse.symbols?.length ? (
                            <p className="flex flex-wrap items-center gap-1.5">
                              <span className="mr-1 text-[11px] tracking-[0.14em] text-gold uppercase">
                                Símbolos
                              </span>
                              {verse.symbols.map((id) => {
                                const symbol = getSymbol(id);
                                if (!symbol) return null;
                                return (
                                  <Link
                                    key={id}
                                    href={`/apocalipse/simbolos#${id}`}
                                    className="rounded-full border border-white/12 px-2.5 py-0.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground"
                                  >
                                    {symbol.name}
                                  </Link>
                                );
                              })}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </section>

      {chapter.readings?.length ? (
        <section id="leituras" className="mt-14 scroll-mt-32">
          <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
            Como as escolas leem o capítulo {chapter.n}
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            As leituras aparecem lado a lado, sem que o estudo escolha uma. Dentro de cada escola há
            variações; o resumo mostra a posição mais comum.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {chapter.readings.map((reading) => (
              <div key={reading.school} className="folio p-5">
                <h3 className="font-heading text-xl text-gold">{reading.school}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  <RefText text={reading.text} />
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <nav
        aria-label="Capítulo anterior e seguinte"
        className="mt-14 grid gap-3 border-t border-white/10 pt-6 font-sans sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/apocalipse/capitulo/${previous.n}`} className="folio block p-4 hover:border-gold/50">
            <span className="text-[11px] tracking-[0.16em] text-gold uppercase">← Capítulo {previous.n}</span>
            <span className="mt-1 block font-heading text-lg leading-snug">{previous.title}</span>
          </Link>
        ) : (
          <Link href="/apocalipse" className="folio block p-4 hover:border-gold/50">
            <span className="text-[11px] tracking-[0.16em] text-gold uppercase">← Apocalipse</span>
            <span className="mt-1 block font-heading text-lg leading-snug">Visão geral e esboço</span>
          </Link>
        )}
        {next ? (
          <Link
            href={`/apocalipse/capitulo/${next.n}`}
            className="folio block p-4 text-right hover:border-gold/50"
          >
            <span className="text-[11px] tracking-[0.16em] text-gold uppercase">Capítulo {next.n} →</span>
            <span className="mt-1 block font-heading text-lg leading-snug">{next.title}</span>
          </Link>
        ) : (
          <Link href="/apocalipse/simbolos" className="folio block p-4 text-right hover:border-gold/50">
            <span className="text-[11px] tracking-[0.16em] text-gold uppercase">Glossário →</span>
            <span className="mt-1 block font-heading text-lg leading-snug">Símbolos do Apocalipse</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
