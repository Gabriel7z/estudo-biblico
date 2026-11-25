import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { KingdomMap } from "@/components/reis/kingdom-map";
import { SceneArt } from "@/components/scene-art";
import { getReisPlace, getReisScene, reisScenes } from "@/lib/reis";

export const dynamicParams = false;

export function generateStaticParams() {
  return reisScenes.map((scene) => ({ slug: scene.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scene = getReisScene(slug);
  if (!scene) return { title: "Reis" };
  return { title: `${scene.title} · ${scene.ref}`, description: scene.happens[0] };
}

export default async function ReisScenePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scene = getReisScene(slug);
  if (!scene) notFound();
  const place = getReisPlace(scene.placeId);
  const index = reisScenes.findIndex((item) => item.slug === scene.slug);
  const previous = reisScenes[index - 1];
  const next = reisScenes[index + 1];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">
        <Link href="/reis" className="hover:text-gold">
          Reis
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        {scene.book} · {String(scene.order).padStart(2, "0")}
      </p>
      <h1 className="mt-3 max-w-4xl font-heading text-5xl tracking-tight text-ink md:text-7xl">{scene.title}</h1>
      <p className="mt-4 font-sans text-sm tracking-[0.16em] text-gold uppercase">
        {scene.ref} · {scene.date}
        {place ? ` · ${place.name}` : ""}
      </p>

      <div className="mt-8">
        <SceneArt src={scene.image} alt={scene.alt} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="folio p-6">
          <h2 className="font-heading text-3xl">O que acontece</h2>
          {scene.happens.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
        <section className="folio p-6">
          <h2 className="font-heading text-3xl">Contexto histórico e geográfico</h2>
          {scene.context.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      <section className="folio mt-8 p-6 md:p-8">
        <h2 className="font-heading text-3xl">O que significa</h2>
        <div className="mt-2 grid gap-x-8 md:grid-cols-2">
          {scene.means.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-3xl">No mapa</h2>
        <p className="mt-2 text-muted-foreground">
          {place ? `${place.name} (${place.site}). ${place.note}` : null}{" "}
          <Link href="/reis/mapa" className="text-gold hover:underline">
            Mapa completo
          </Link>
        </p>
        <div className="mt-5">
          <KingdomMap focus={scene.placeId} compact />
        </div>
      </section>

      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-sm">
        {previous ? (
          <Link href={`/reis/${previous.slug}`} className="text-gold hover:underline">
            ← {previous.title}
          </Link>
        ) : (
          <Link href="/reis" className="text-gold hover:underline">
            ← Todas as cenas
          </Link>
        )}
        {next ? (
          <Link href={`/reis/${next.slug}`} className="text-right text-gold hover:underline">
            {next.title} →
          </Link>
        ) : (
          <Link href="/reis" className="text-gold hover:underline">
            Todas as cenas →
          </Link>
        )}
      </nav>
    </article>
  );
}
