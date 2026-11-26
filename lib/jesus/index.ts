import { getSite } from "@/lib/historia/sites";
import type { Stop } from "@/lib/historia/types";
import { caminhoEpisodes } from "@/lib/jesus/caminho";
import { galileiaEpisodes } from "@/lib/jesus/galileia";
import { infanciaEpisodes } from "@/lib/jesus/infancia";
import { paixaoEpisodes } from "@/lib/jesus/paixao";
import { panoramaEpisodes } from "@/lib/jesus/panorama";
import { preparacaoEpisodes } from "@/lib/jesus/preparacao";
import { ressurreicaoEpisodes } from "@/lib/jesus/ressurreicao";
import type { JesusEpisode, JesusPart } from "@/lib/jesus/types";

export const jesusParts: { part: JesusPart; title: string; ref: string; blurb: string }[] = [
  { part: "panorama", title: "Mapas de conjunto", ref: "37 a.C.–39 d.C.", blurb: "O reino de Herodes e sua divisão, o lago da Galileia e a vida inteira num só mapa." },
  { part: "infancia", title: "Infância", ref: "Mt 1–2; Lc 1–2", blurb: "Nazaré, Belém, o Egito e o menino no Templo." },
  { part: "preparacao", title: "Preparação e primeiro ano", ref: "Mt 3–4; Mc 1; Lc 3–4; Jo 1–4", blurb: "João Batista, o batismo, o deserto, Caná, a primeira Páscoa e a Samaria." },
  { part: "galileia", title: "O ministério na Galileia", ref: "Mt 4–18; Mc 1–9; Lc 4–9; Jo 6", blurb: "Cafarnaúm, o lago, o sermão, os milagres e as saídas para o norte." },
  { part: "caminho", title: "A subida a Jerusalém", ref: "Lc 9–19; Mc 10; Jo 7–12", blurb: "As festas em Jerusalém, a Pereia, Jericó e Betânia." },
  { part: "paixao", title: "A última semana", ref: "Mt 21–27; Mc 11–15; Lc 19–23; Jo 12–19", blurb: "Do domingo de Ramos à sexta-feira da cruz, rua por rua em Jerusalém." },
  { part: "ressurreicao", title: "Ressurreição e ascensão", ref: "Mt 28; Mc 16; Lc 24; Jo 20–21; At 1", blurb: "O túmulo vazio, Emaús, o lago e o Monte das Oliveiras." },
];

export const jesusEpisodes: JesusEpisode[] = [
  ...panoramaEpisodes,
  ...infanciaEpisodes,
  ...preparacaoEpisodes,
  ...galileiaEpisodes,
  ...caminhoEpisodes,
  ...paixaoEpisodes,
  ...ressurreicaoEpisodes,
];

/** Episódios na ordem da narrativa (sem os panoramas). */
export const jesusStory = jesusEpisodes.filter((episode) => episode.part !== "panorama");

export function getJesusEpisode(slug: string): JesusEpisode | undefined {
  return jesusEpisodes.find((episode) => episode.slug === slug);
}

export function jesusPoster(slug: string): string {
  return `/historia/mapas/jesus-${slug}.webp`;
}

export function resolveJesusStops(episode: JesusEpisode) {
  return episode.stops.map((stop: Stop, index) => {
    const site = getSite(stop.siteId);
    return { ...stop, n: index + 1, lng: site.lng, lat: site.lat, name: site.name, modern: site.modern, certainty: site.certainty };
  });
}
