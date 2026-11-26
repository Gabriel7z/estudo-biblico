import { danielEpisodes } from "@/lib/historia/profetas/daniel";
import { ezequielEpisodes } from "@/lib/historia/profetas/ezequiel";
import { isaiasEpisodes } from "@/lib/historia/profetas/isaias";
import { jeremiasEpisodes } from "@/lib/historia/profetas/jeremias";
import { reisEpisodes } from "@/lib/historia/reis-episodios";
import { samuelEpisodes } from "@/lib/historia/samuel";
import { getSite } from "@/lib/historia/sites";
import type { Episode, HistoriaBook, LngLat } from "@/lib/historia/types";

export const episodes: Episode[] = [
  ...samuelEpisodes,
  ...reisEpisodes,
  ...isaiasEpisodes,
  ...jeremiasEpisodes,
  ...ezequielEpisodes,
  ...danielEpisodes,
];

export const bookOrder: { book: HistoriaBook; slug: string; blurb: string }[] = [
  { book: "1 Samuel", slug: "1-samuel", blurb: "Siló, a arca entre os filisteus, Saul, Golias e Davi fugitivo até Gilboa." },
  { book: "2 Samuel", slug: "2-samuel", blurb: "Hebrom, Jerusalém, as guerras de Davi e a revolta de Absalão." },
  { book: "1 Reis", slug: "1-reis", blurb: "Salomão, a divisão, Sisaque e Acabe diante da Assíria em Qarqar." },
  { book: "2 Reis", slug: "2-reis", blurb: "Mesa, Jeú, a Assíria, Senaqueribe, Megido, Carquemis e a queda de Jerusalém." },
  { book: "Isaías", slug: "isaias", blurb: "Acaz e o Emanuel, Asdode, os oráculos às nações, os enviados de Babilônia e Ciro, o ungido." },
  { book: "Jeremias", slug: "jeremias", blurb: "Anatote, o jugo de madeira, a cisterna no último cerco e a fuga para o Egito." },
  { book: "Ezequiel", slug: "ezequiel", blurb: "O exílio junto ao Quebar, Tiro, o Egito de Hofra e o novo Templo com a terra repartida." },
  { book: "Daniel", slug: "daniel", blurb: "A corte de Nabucodonosor, a noite de Belsazar, Alexandre e os reis do norte e do sul." },
];

/** Grupos do hub: os livros históricos e os profetas. */
export const bookGroups: { title: string; books: HistoriaBook[] }[] = [
  { title: "Samuel e Reis", books: ["1 Samuel", "2 Samuel", "1 Reis", "2 Reis"] },
  { title: "Os profetas", books: ["Isaías", "Jeremias", "Ezequiel", "Daniel"] },
];

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((episode) => episode.slug === slug);
}

export function resolvePath(path: (string | LngLat)[]): LngLat[] {
  return path.map((point) => {
    if (typeof point === "string") {
      const site = getSite(point);
      return [site.lng, site.lat];
    }
    return point;
  });
}

/** Caminho da imagem estática do mapa de um episódio (gerada a partir do próprio mapa). */
export function episodePoster(slug: string): string {
  return `/historia/mapas/${slug}.webp`;
}
