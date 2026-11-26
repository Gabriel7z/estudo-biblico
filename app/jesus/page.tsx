import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { atlasSrc } from "@/lib/imagery";
import { jesusEpisodes, jesusParts, jesusPoster } from "@/lib/jesus";
import { gospelInfo } from "@/lib/jesus/evangelhos";

export const metadata: Metadata = {
  title: "Vida de Jesus em mapas",
  description:
    "Cada episódio dos quatro Evangelhos com seu próprio mapa: de Nazaré e Belém à Galileia, à Pereia e a Jerusalém. Linha do tempo com Augusto, Tibério, Herodes e Pilatos, e maquete 3D da Jerusalém de Herodes com o Segundo Templo.",
};

const ABBR = { Mateus: "Mt", Marcos: "Mc", Lucas: "Lc", João: "Jo" } as const;

export default function JesusHubPage() {
  const stopCount = jesusEpisodes.reduce((sum, episode) => sum + episode.stops.length, 0);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <PageHeader
        kicker="Os Evangelhos · c. 6 a.C.–30/33 d.C."
        title="Vida de Jesus em mapas"
        lede={`Uma harmonia dos quatro Evangelhos, episódio por episódio, cada um com seu próprio mapa: ${jesusEpisodes.length} mapas e ${stopCount} paradas explicadas, com as passagens de Mateus, Marcos, Lucas e João, o que a arqueologia encontrou e os lugares cuja identificação ainda é debatida, marcados com “?”.`}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link href="/historia/maquetes/jerusalem-herodes" className="folio group relative overflow-hidden p-0 md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={atlasSrc("/historia/maquetes/jerusalem-herodes.webp")}
            alt=""
            className="h-56 w-full object-cover opacity-90 transition group-hover:opacity-100 md:h-72"
          />
          <div className="p-5">
            <p className="kicker">Maquete 3D · c. 30 d.C.</p>
            <p className="mt-1 font-heading text-2xl md:text-3xl">A Jerusalém de Herodes e o Segundo Templo</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Os pátios do Templo, o Pórtico Real, a Antônia, o palácio de Herodes com suas torres, o Gólgota fora do muro e o Getsêmani do
              outro lado do Cedrom. Vista aérea ou caminhando.
            </p>
          </div>
        </Link>
        <div className="grid gap-4">
          <Link href="/jesus/linha-do-tempo" className="folio group p-6">
            <p className="kicker">Linha do tempo</p>
            <p className="mt-1 font-heading text-2xl">De Herodes a Pilatos</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Augusto, Tibério, Herodes e seus filhos, os prefeitos e os sumos sacerdotes, lado a lado com a vida de Jesus, e os debates
              sobre as datas.
            </p>
            <p className="mt-3 font-sans text-sm text-gold">Abrir →</p>
          </Link>
          <div className="folio p-6">
            <p className="kicker">Por Evangelho</p>
            <ul className="mt-2 flex flex-wrap gap-2 font-sans text-sm">
              {gospelInfo.map((item) => (
                <li key={item.slug}>
                  <Link href={`/jesus/evangelhos/${item.slug}`} className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-gold hover:border-gold">
                    {item.gospel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <p className="mt-6 max-w-4xl text-sm text-muted-foreground">
        Sobre as datas: Jesus nasceu antes da morte de Herodes (4 a.C.), provavelmente entre 7 e 4 a.C.; começou a pregar por volta do 15º
        ano de Tibério (28/29 d.C.) e morreu numa Páscoa sob Pôncio Pilatos, em 30 ou 33 d.C. Os anos dos episódios seguem a cronologia com
        morte em 30; se foi em 33, o ministério avança três anos. A ordem dos episódios é uma harmonia possível, não a única.
      </p>

      <nav aria-label="Partes" className="mt-8 flex flex-wrap gap-2 font-sans text-sm">
        {jesusParts.map((part) => (
          <a key={part.part} href={`#${part.part}`} className="rounded-full border border-white/15 px-4 py-1.5 text-muted-foreground hover:border-gold hover:text-gold">
            {part.title}
          </a>
        ))}
      </nav>

      {jesusParts.map((part) => {
        const list = jesusEpisodes.filter((episode) => episode.part === part.part);
        return (
          <section key={part.part} id={part.part} className="mt-14 scroll-mt-24">
            <div className="flex items-center gap-4">
              <p className="kicker shrink-0">{part.ref}</p>
              <span className="h-px flex-1 bg-gold/25" />
            </div>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl">{part.title}</h2>
            <p className="mt-1 text-muted-foreground">{part.blurb}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((episode) => (
                <li key={episode.slug}>
                  <Link href={`/jesus/${episode.slug}`} className="folio group block h-full overflow-hidden p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={atlasSrc(episode.image ?? jesusPoster(episode.slug))}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover opacity-90 transition group-hover:opacity-100"
                    />
                    <div className="p-5">
                      <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">{episode.date}</p>
                      <p className="mt-1 font-heading text-xl leading-snug">{episode.title}</p>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{episode.summary}</p>
                      <p className="mt-3 font-sans text-xs text-muted-foreground">
                        {(["Mateus", "Marcos", "Lucas", "João"] as const)
                          .filter((gospel) => episode.gospels[gospel])
                          .map((gospel) => ABBR[gospel])
                          .join(" · ")}{" "}
                        · {episode.stops.length} paradas
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
