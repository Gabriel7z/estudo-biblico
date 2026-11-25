import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { KingdomMap } from "@/components/reis/kingdom-map";
import { reisPlaces, reisScenes } from "@/lib/reis";

export const metadata: Metadata = {
  title: "Mapa do reino dividido",
  description: "Os lugares de 1 e 2 Reis: Israel ao norte, Judá ao sul, e Damasco, Nínive e Babilônia.",
};

export default function ReisMapaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">
        <Link href="/reis" className="hover:text-gold">
          Reis
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Mapa
      </p>
      <PageHeader
        kicker="Geografia de 1 e 2 Reis"
        title="O reino dividido"
        lede="Depois de 931 a.C., Israel ao norte, com capital em Siquém, Tirza e por fim Samaria, e Judá ao sul, com Jerusalém. A linha tracejada marca, de forma aproximada, a fronteira, que mudou várias vezes ao redor de Benjamim. Toque num lugar para ver o que acontece ali."
      />
      <div className="mt-10">
        <KingdomMap />
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-3xl">Os lugares</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {reisPlaces.map((place) => {
            const scenes = reisScenes.filter((scene) => scene.placeId === place.id);
            return (
              <li key={place.id} className="folio p-4">
                <p className="font-heading text-xl">
                  {place.name}
                  <span className="ml-2 font-sans text-xs tracking-[0.12em] text-gold uppercase">{place.site}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{place.note}</p>
                {scenes.length ? (
                  <p className="mt-2 font-sans text-sm">
                    {scenes.map((scene, i) => (
                      <span key={scene.slug}>
                        {i ? " · " : ""}
                        <Link href={`/reis/${scene.slug}`} className="text-gold hover:underline">
                          {scene.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
