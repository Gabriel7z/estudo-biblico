import type { Reading, Term } from "@/lib/apocalipse-capitulos/types";

export type { Reading, Term };

/** Um trecho estudado (um versículo de Daniel ou uma seção de Mateus). */
export type Passage = {
  /** id da âncora, por exemplo "dn-9-24" ou "mt-24-15" */
  id: string;
  /** referência para exibir, por exemplo "Daniel 9:24" */
  ref: string;
  /** primeiro e último versículo cobertos (para os links automáticos) */
  book: "Dn" | "Mt";
  chapter: number;
  from: number;
  to: number;
  title: string;
  /** paráfrase (não é tradução publicada) */
  text: string;
  notes: string[];
  terms?: Term[];
  /** passagens paralelas */
  parallels?: string[];
  readings?: Reading[];
};

export type Decree = {
  id: string;
  name: string;
  date: string;
  refs: string;
  scope: string;
  calc: string[];
  usedBy: string;
};

export type ViewId = "pre" | "meio" | "pre-ira" | "pos";

export type View = {
  id: ViewId;
  name: string;
  /** rótulo curto (por exemplo "variante") */
  tag?: string;
  summary: string;
  texts: string[];
  arguments: string[];
  objections: string[];
  origin: string[];
};

export type KeyText = {
  ref: string;
  title: string;
  says: string;
  readings: { view: string; text: string }[];
  links?: { href: string; label: string }[];
};
