/** Lados de um conflito ou de uma rota. Cada um tem uma cor fixa no mapa e na linha do tempo. */
export type Side =
  | "israel"
  | "juda"
  | "unido"
  | "filisteus"
  | "assiria"
  | "babilonia"
  | "egito"
  | "ara"
  | "moabe"
  | "fenicia"
  | "edom"
  | "amom"
  | "persia"
  | "grecia"
  | "media"
  | "seleucidas"
  | "ptolomeus"
  | "arabes"
  | "lidia"
  | "jesus"
  | "roma"
  | "antipas"
  | "filipe"
  | "judeia"
  | "decapolis"
  | "nabateus"
  | "neutro";

/** Grau de certeza da identificação de um sítio antigo com um lugar moderno. */
export type Certainty = "segura" | "provavel" | "debatida";

export type Site = {
  id: string;
  name: string;
  /** Nome do sítio arqueológico ou lugar moderno. */
  modern: string;
  lat: number;
  lng: number;
  certainty: Certainty;
};

export type StopKind = "cidade" | "batalha" | "cerco" | "evento" | "santuario";

export type Stop = {
  siteId: string;
  title: string;
  date: string;
  kind: StopKind;
  text: string;
  refs: string;
  archaeology?: string;
};

export type LngLat = [number, number];

export type Route = {
  label: string;
  side: Side;
  /** Ids de sítios ou pares [lng, lat] para curvas que não passam por cidades. */
  path: (string | LngLat)[];
  dashed?: boolean;
};

export type Area = {
  label: string;
  side: Side;
  polygon: LngLat[];
};

export type MapLabel = {
  text: string;
  lng: number;
  lat: number;
  kind?: "regiao" | "mar" | "rio" | "povo";
};

export type HistoriaBook = "1 Samuel" | "2 Samuel" | "1 Reis" | "2 Reis" | "Isaías" | "Jeremias" | "Ezequiel" | "Daniel";

export type Episode = {
  slug: string;
  book: HistoriaBook;
  title: string;
  ref: string;
  /** Data por extenso, com "c." quando aproximada. */
  date: string;
  /** Ano a.C. usado para ordenar e para a linha do tempo. */
  year: number;
  summary: string;
  context: string[];
  stops: Stop[];
  routes: Route[];
  areas: Area[];
  labels: MapLabel[];
  /** [oeste, sul, leste, norte] */
  bounds: [number, number, number, number];
  image?: string;
  imageAlt?: string;
  /** Cenas de /reis/[slug] ligadas a este episódio. */
  reisScenes?: string[];
  warIds?: string[];
  /** Observações sobre o que é incerto neste mapa. */
  caveat?: string;
};

export const sideColor: Record<Side, string> = {
  israel: "#8fd0b4",
  juda: "#e4c78a",
  unido: "#e7b089",
  filisteus: "#e07a5f",
  assiria: "#e0645a",
  babilonia: "#7eb0e0",
  egito: "#c9a0dc",
  ara: "#f0a35e",
  moabe: "#b9c96a",
  fenicia: "#77c6d8",
  edom: "#d19a72",
  amom: "#a7b48a",
  persia: "#9fd1a0",
  grecia: "#a9b8f0",
  media: "#c6d98f",
  seleucidas: "#f2b36b",
  ptolomeus: "#c9a0dc",
  arabes: "#e3c46b",
  lidia: "#d8a0b4",
  jesus: "#f6e3a8",
  roma: "#d9705f",
  antipas: "#8fd0b4",
  filipe: "#9fc7e8",
  judeia: "#e4c78a",
  decapolis: "#b9a4e0",
  nabateus: "#e3a86b",
  neutro: "#c9bfb2",
};

export const sideLabel: Record<Side, string> = {
  israel: "Israel (norte)",
  juda: "Judá",
  unido: "Israel unido",
  filisteus: "Filisteus",
  assiria: "Assíria",
  babilonia: "Babilônia",
  egito: "Egito",
  ara: "Arã (Damasco)",
  moabe: "Moabe",
  fenicia: "Fenícia",
  edom: "Edom",
  amom: "Amom",
  persia: "Pérsia",
  grecia: "Macedônios e gregos",
  media: "Medos",
  seleucidas: "Selêucidas (rei do norte)",
  ptolomeus: "Ptolomeus (rei do sul)",
  arabes: "Árabes",
  lidia: "Lídia",
  jesus: "Jesus e os discípulos",
  roma: "Roma",
  antipas: "Herodes Antipas (Galileia e Pereia)",
  filipe: "Filipe, o tetrarca",
  judeia: "Judeia e Samaria (Arquelau, depois prefeitos romanos)",
  decapolis: "Decápolis",
  nabateus: "Nabateus",
  neutro: "Outros",
};

export const kindLabel: Record<StopKind, string> = {
  cidade: "Cidade",
  batalha: "Batalha",
  cerco: "Cerco",
  evento: "Acontecimento",
  santuario: "Santuário",
};

export const certaintyLabel: Record<Certainty, string> = {
  segura: "identificação segura",
  provavel: "identificação provável",
  debatida: "local debatido",
};
