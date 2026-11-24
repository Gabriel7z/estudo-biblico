export const ERA_IDS = [
  "patriarcas",
  "exodo",
  "juizes",
  "monarquia",
  "dividido",
  "exilio",
  "persia",
] as const;

export type EraId = (typeof ERA_IDS)[number];

export type LngLat = [number, number];

export type Place = {
  id: string;
  name: string;
  site: string;
  lng: number;
  lat: number;
  tradition?: boolean;
  eras: EraId[];
  blurb: string;
};

export type RouteId =
  | "exodo"
  | "filisteus"
  | "via-maris"
  | "caminho-do-rei"
  | "patriarcas"
  | "retorno";

export type Route = {
  id: RouteId;
  name: string;
  color: string;
  dashed: boolean;
  eras: EraId[];
  /** Vértices em [longitude, latitude]. */
  coordinates: LngLat[];
  note: string;
};

export type Region = {
  id: string;
  name: string;
  tone: "terra" | "reino" | "imperio";
  color: string;
  largeLabel: boolean;
  label: LngLat;
  eras: EraId[];
  /** Anel fechado, [longitude, latitude]. */
  ring: LngLat[];
};

export type Era = {
  id: EraId;
  order: number;
  name: string;
  centuries: string;
  summary: string;
  paragraphs: string[];
  mapNote: string;
  readings: string[];
  governmentSlugs: string[];
};

export type Station = {
  slug: string;
  order: number;
  title: string;
  region: string;
  reading: string;
  epigraph: string;
  epigraphRef: string;
  paragraphs: string[];
  geographyTitle: string;
  geographyNote: string;
  governmentTitle: string;
  governmentNote: string;
  questions: { prompt: string; ref: string }[];
  placeId: string;
  governmentSlug: string;
  geographySlug: string;
};

export type Government = {
  slug: string;
  order: number;
  name: string;
  kind: string;
  capital: string;
  centuries: string;
  lede: string;
  paragraphs: string[];
  placeIds: string[];
  era: EraId;
};

export type GeographyKind = "regiao" | "agua" | "rota";

export type Geography = {
  slug: string;
  name: string;
  kind: GeographyKind;
  lede: string;
  paragraphs: string[];
  why: string;
  readings: string[];
  placeIds: string[];
  routeId?: RouteId;
  era: EraId;
};

export type TimeEvent = {
  id: string;
  when: string;
  title: string;
  text: string;
  era: EraId;
};

export type Book = {
  name: string;
  era: EraId;
  line: string;
  ground: string;
};

export type BookSection = {
  id: string;
  title: string;
  intro: string;
  books: Book[];
};
