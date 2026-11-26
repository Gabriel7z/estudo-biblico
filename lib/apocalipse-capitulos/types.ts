/** Estudo versículo por versículo do Apocalipse. Textos parafraseados (não citam tradução protegida). */

export type Term = {
  /** grego em letras gregas */
  gr: string;
  /** transliteração */
  tr: string;
  /** sentido */
  mean: string;
};

export type Reading = {
  school: string;
  text: string;
};

export type ChapterVerse = {
  v: number;
  /** paráfrase do versículo */
  text: string;
  /** explicação, elemento por elemento */
  notes: string[];
  terms?: Term[];
  /** ecos do Antigo Testamento (e de outros textos bíblicos) */
  echoes?: string[];
  /** ids do glossário de símbolos */
  symbols?: string[];
};

export type ChapterSection = {
  from: number;
  title: string;
};

export type PartId =
  | "prologo"
  | "igrejas"
  | "trono"
  | "selos"
  | "trombetas"
  | "conflito"
  | "tacas"
  | "babilonia"
  | "volta"
  | "milenio"
  | "nova-jerusalem"
  | "epilogo";

export type Chapter = {
  n: number;
  title: string;
  /** partes do esboço que o capítulo toca */
  parts: PartId[];
  summary: string;
  /** contexto do primeiro século e do Antigo Testamento para o capítulo todo */
  context: string[];
  /** leituras das escolas, quando divergem */
  readings?: Reading[];
  /** slugs das cenas ilustradas em /apocalipse/[slug] */
  scenes: string[];
  /** links extras (mapa, diagrama, cubo) */
  extras?: { href: string; label: string }[];
  sections: ChapterSection[];
  verses: ChapterVerse[];
};

export type SymbolGroup = "numeros" | "cores" | "seres" | "objetos" | "lugares";

export type SymbolEntry = {
  id: string;
  name: string;
  group: SymbolGroup;
  /** sentido no livro */
  meaning: string;
  /** observações: leituras divergentes, contexto */
  note?: string;
  /** fontes no Antigo Testamento e em outros textos */
  refs?: string[];
};
