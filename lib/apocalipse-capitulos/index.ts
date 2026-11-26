import type { Chapter, PartId, SymbolEntry, SymbolGroup } from "./types";
import { c01 } from "./c01";
import { c02 } from "./c02";
import { c03 } from "./c03";
import { c04 } from "./c04";
import { c05 } from "./c05";
import { c06 } from "./c06";
import { c07 } from "./c07";
import { c08 } from "./c08";
import { c09 } from "./c09";
import { c10 } from "./c10";
import { c11 } from "./c11";
import { c12 } from "./c12";
import { c13 } from "./c13";
import { c14 } from "./c14";
import { c15 } from "./c15";
import { c16 } from "./c16";
import { c17 } from "./c17";
import { c18 } from "./c18";
import { c19 } from "./c19";
import { c20 } from "./c20";
import { c21 } from "./c21";
import { c22 } from "./c22";
import { numeros } from "./sim-numeros";
import { cores } from "./sim-cores";
import { seres } from "./sim-seres";
import { objetosA } from "./sim-objetos-a";
import { objetosB } from "./sim-objetos-b";
import { lugares } from "./sim-lugares";

export type * from "./types";

export const chapters: Chapter[] = [
  c01, c02, c03, c04, c05, c06, c07, c08, c09, c10, c11,
  c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22,
];

export function getChapter(n: number): Chapter | undefined {
  return chapters.find((c) => c.n === n);
}

export const totalVerses = chapters.reduce((s, c) => s + c.verses.length, 0);

export type OutlinePart = {
  id: PartId;
  label: string;
  /** referência, por exemplo "1:1–8" */
  range: string;
  /** capítulo onde começa (para o link) */
  start: number;
  /** verso onde começa */
  startVerse: number;
  blurb: string;
};

export const outline: OutlinePart[] = [
  { id: "prologo", label: "Prólogo", range: "1:1–20", start: 1, startVerse: 1, blurb: "Título, bênção, saudação às sete igrejas e a visão do Filho do Homem entre os candelabros." },
  { id: "igrejas", label: "As sete igrejas", range: "2:1–3:22", start: 2, startVerse: 1, blurb: "Sete cartas: Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia." },
  { id: "trono", label: "O trono e o Cordeiro", range: "4:1–5:14", start: 4, startVerse: 1, blurb: "A sala do trono, os quatro seres, os anciãos e o Cordeiro que recebe o rolo." },
  { id: "selos", label: "Os sete selos", range: "6:1–8:5", start: 6, startVerse: 1, blurb: "Os quatro cavaleiros, os mártires, o grande abalo; os 144 mil e a grande multidão; o silêncio." },
  { id: "trombetas", label: "As sete trombetas", range: "8:6–11:19", start: 8, startVerse: 6, blurb: "Juízos sobre um terço do mundo; os gafanhotos do abismo e a cavalaria do Eufrates." },
  { id: "conflito", label: "Interlúdio e o grande conflito", range: "10:1–14:20", start: 10, startVerse: 1, blurb: "O livrinho, as duas testemunhas; a mulher e o dragão; as duas bestas; o Cordeiro em Sião e a colheita." },
  { id: "tacas", label: "As sete taças", range: "15:1–16:21", start: 15, startVerse: 1, blurb: "O cântico de Moisés e do Cordeiro; as últimas pragas; Armagedom." },
  { id: "babilonia", label: "A queda de Babilônia", range: "17:1–19:10", start: 17, startVerse: 1, blurb: "A meretriz sobre a besta; o lamento dos reis, mercadores e marinheiros; os aleluias." },
  { id: "volta", label: "A volta de Cristo", range: "19:11–21", start: 19, startVerse: 11, blurb: "O cavaleiro Fiel e Verdadeiro; a besta e o falso profeta no lago de fogo." },
  { id: "milenio", label: "O milênio e o juízo final", range: "20:1–15", start: 20, startVerse: 1, blurb: "Satanás amarrado, o reino de mil anos, Gogue e Magogue e o grande trono branco." },
  { id: "nova-jerusalem", label: "A nova Jerusalém", range: "21:1–22:5", start: 21, startVerse: 1, blurb: "Novo céu e nova terra; a cidade-noiva; o rio e a árvore da vida." },
  { id: "epilogo", label: "Epílogo", range: "22:6–21", start: 22, startVerse: 6, blurb: "\"Venho em breve\"; o convite à água da vida; a bênção final." },
];

export const symbolGroups: { id: SymbolGroup; label: string; lede: string }[] = [
  { id: "numeros", label: "Números", lede: "No Apocalipse, os números quase sempre falam de qualidade, não de quantidade." },
  { id: "cores", label: "Cores e materiais", lede: "Cores, metais, tecidos e pedras." },
  { id: "seres", label: "Seres, figuras e grupos", lede: "Pessoas, criaturas, anjos e povos." },
  { id: "objetos", label: "Objetos e imagens", lede: "Objetos do culto, da corte e da natureza." },
  { id: "lugares", label: "Lugares e expressões", lede: "Lugares reais e simbólicos, e expressões técnicas do livro." },
];

export const symbols: SymbolEntry[] = [
  ...numeros,
  ...cores,
  ...seres,
  ...objetosA,
  ...objetosB,
  ...lugares,
];

const symbolMap = new Map(symbols.map((s) => [s.id, s]));

export function getSymbol(id: string): SymbolEntry | undefined {
  return symbolMap.get(id);
}

/** onde cada símbolo aparece: lista de [capítulo, verso] */
export const symbolIndex: Map<string, [number, number][]> = (() => {
  const m = new Map<string, [number, number][]>();
  for (const c of chapters) {
    for (const v of c.verses) {
      for (const id of v.symbols ?? []) {
        if (!m.has(id)) m.set(id, []);
        m.get(id)!.push([c.n, v.v]);
      }
    }
  }
  return m;
})();
