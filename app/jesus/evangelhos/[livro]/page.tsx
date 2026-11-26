import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { atlasSrc } from "@/lib/imagery";
import { jesusParts, jesusPoster, jesusStory } from "@/lib/jesus";
import { getGospel, gospelInfo } from "@/lib/jesus/evangelhos";

export const dynamicParams = false;

export function generateStaticParams() {
  return gospelInfo.map((item) => ({ livro: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ livro: string }> }): Promise<Metadata> {
  const { livro } = await params;
  const info = getGospel(livro);
  if (!info) return { title: "Evangelho" };
  return { title: `${info.title} em mapas`, description: `Os episódios narrados por ${info.gospel}, cada um com seu mapa.` };
}

export default async function GospelPage({ params }: { params: Promise<{ livro: string }> }) {
  const { livro } = await params;
  const info = getGospel(livro);
  if (!info) notFound();
  const list = jesusStory.filter((episode) => episode.gospels[info.gospel]);

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <p className="kicker">
        <Link href="/jesus" className="hover:text-gold">
          Vida de Jesus
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Evangelhos
      </p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight text-ink md:text-6xl">{info.title}</h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-gold uppercase">{list.length} episódios com mapa</p>

      <nav aria-label="Os quatro Evangelhos" className="mt-6 flex flex-wrap gap-2 font-sans text-sm">
        {gospelInfo.map((item) => (
          <Link
            key={item.slug}
            href={`/jesus/evangelhos/${item.slug}`}
            className={`rounded-full border px-4 py-1.5 ${item.slug === info.slug ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-muted-foreground hover:text-gold"}`}
          >
            {item.gospel}
          </Link>
        ))}
      </nav>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="folio p-6 md:p-8">
          <h2 className="font-heading text-2xl">Quem, quando, como</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{info.author}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{info.date}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            {info.traits.map((trait) => (
              <li key={trait.slice(0, 30)}>{trait}</li>
            ))}
          </ul>
        </div>
        <div className="folio p-6 md:p-8">
          <h2 className="font-heading text-2xl">Só em {info.gospel}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{info.only}</p>
        </div>
      </section>

      {jesusParts
        .filter((part) => list.some((episode) => episode.part === part.part))
        .map((part) => (
          <section key={part.part} className="mt-12">
            <h2 className="font-heading text-3xl">{part.title}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list
                .filter((episode) => episode.part === part.part)
                .map((episode) => (
                  <li key={episode.slug} id={episode.slug} className="scroll-mt-24">
                    <Link href={`/jesus/${episode.slug}`} className="folio group block h-full overflow-hidden p-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={atlasSrc(episode.image ?? jesusPoster(episode.slug))}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover opacity-90 transition group-hover:opacity-100"
                      />
                      <div className="p-5">
                        <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">
                          {info.gospel} {episode.gospels[info.gospel]}
                        </p>
                        <p className="mt-1 font-heading text-xl leading-snug">{episode.title}</p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
    </article>
  );
}
