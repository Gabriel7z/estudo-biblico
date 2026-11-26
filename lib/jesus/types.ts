import type { Episode, StopKind } from "@/lib/historia/types";

export type JesusPart = "panorama" | "infancia" | "preparacao" | "galileia" | "caminho" | "paixao" | "ressurreicao";

export type Gospel = "Mateus" | "Marcos" | "Lucas" | "João";

export type JesusEpisode = Omit<Episode, "book" | "year" | "warIds" | "reisScenes"> & {
  part: JesusPart;
  /** Ano para ordenar e para a linha do tempo: negativo = a.C., positivo = d.C. */
  year: number;
  /** Onde cada Evangelho narra o episódio. */
  gospels: Partial<Record<Gospel, string>>;
  /** Outras páginas do site ligadas a este episódio. */
  related?: { href: string; label: string }[];
};

export const gospelSlug: Record<Gospel, string> = { Mateus: "mateus", Marcos: "marcos", Lucas: "lucas", João: "joao" };

export function yearLabel(year: number): string {
  return year < 0 ? `${-year} a.C.` : `${year} d.C.`;
}

export const jesusKindLabel: Record<StopKind, string> = {
  cidade: "Lugar",
  batalha: "Confronto",
  cerco: "Violência",
  evento: "Episódio",
  santuario: "Templo e lugares santos",
};
