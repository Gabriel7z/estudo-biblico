/**
 * Encontra referências ao Apocalipse dentro de um texto e devolve segmentos com link.
 * Regras: "Ap 2:7" e "Apocalipse 2:7" são do Apocalipse; "Dn 7:13", "Isaías 6:3" etc. não;
 * uma referência solta ("ver 1:20", "(3:14)") é do Apocalipse, a não ser que continue
 * uma lista de outro livro ("Dn 7:25; 12:7").
 */

const VERSE_COUNTS = [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21];

const AP = new Set(["Ap", "Apocalipse"]);

const OTHER = new Set(
  (
    "Gn Êx Ex Lv Nm Dt Js Jz Rt Sm Rs Cr Ed Ne Et Jó Sl Pv Ec Ct Is Jr Lm Ez Dn Os Jl Am Ob Jn Mq Na Hc Sf Ag Zc Ml " +
    "Mt Mc Lc Jo At Rm Co Gl Ef Fp Cl Ts Tm Tt Fm Hb Tg Pe Jd Tb Sb Eclo Mc Jt Br " +
    "Gênesis Êxodo Levítico Números Deuteronômio Josué Juízes Rute Samuel Reis Crônicas Esdras Neemias Ester " +
    "Salmo Salmos Provérbios Eclesiastes Cânticos Isaías Jeremias Lamentações Ezequiel Daniel Oseias Joel Amós " +
    "Obadias Jonas Miqueias Naum Habacuque Sofonias Ageu Zacarias Malaquias Mateus Marcos Lucas João Atos Romanos " +
    "Coríntios Gálatas Efésios Filipenses Colossenses Tessalonicenses Timóteo Tito Filemom Hebreus Tiago Pedro Judas " +
    "Tobias Sabedoria Macabeus Eclesiástico Sirácida Judite Baruc Baruque Enoque Jubileus Didaquê Damasco Magnésios " +
    "Middot Rabbah Sibilinos Oráculos Aristeias"
  ).split(" "),
);

export type RefSegment = string | { href: string; label: string };

const REF = /(\d{1,3}):(\d{1,3})/g;

function bookBefore(gap: string): string | undefined {
  // última palavra antes da referência, ignorando "(", "[", aspas e espaços
  const m = gap.match(/([1-4]?\s?[A-Za-zÀ-ÿ]+)\.?\s*[(\["“]?\s*$/u);
  if (!m) return undefined;
  const word = m[1].trim().replace(/^[1-4]\s?/, "");
  if (AP.has(word)) return "Ap";
  if (OTHER.has(word)) return word;
  return undefined;
}

export function chapterVerseHref(c: number, v?: number): string {
  return v ? `/apocalipse/capitulo/${c}#v${v}` : `/apocalipse/capitulo/${c}`;
}

export function linkifyRefs(text: string): RefSegment[] {
  const out: RefSegment[] = [];
  let last = 0;
  let lastRef = 0;
  let prevBook: string | undefined;
  for (const m of text.matchAll(REF)) {
    const start = m.index ?? 0;
    // não pegar "1.2:3" nem dígitos colados a letras
    const before = text[start - 1];
    if (before && /[\d.A-Za-zÀ-ÿ]/u.test(before)) continue;
    const gap = text.slice(lastRef, start);
    let book = bookBefore(gap);
    if (!book) {
      if (prevBook && /^\s*[;,]\s*(e\s+)?$/.test(gap)) book = prevBook;
      else book = "Ap";
    }
    prevBook = book;
    lastRef = start + m[0].length;
    const c = Number(m[1]);
    const v = Number(m[2]);
    const valid = book === "Ap" && c >= 1 && c <= 22 && v >= 1 && v <= VERSE_COUNTS[c - 1];
    if (!valid) continue;
    if (start > last) out.push(text.slice(last, start));
    out.push({ href: chapterVerseHref(c, v), label: m[0] });
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
