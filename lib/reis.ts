import { cenas1 } from "@/lib/reis-cenas-1";
import { cenas2 } from "@/lib/reis-cenas-2";
import { cenas3 } from "@/lib/reis-cenas-3";
import { cenas4 } from "@/lib/reis-cenas-4";

export type ReisBook = "1 Reis" | "2 Reis";

export type ReisScene = {
  slug: string;
  order: number;
  book: ReisBook;
  title: string;
  ref: string;
  date: string;
  placeId: string;
  image: string;
  alt: string;
  happens: string[];
  context: string[];
  means: string[];
};

export type ReisPlace = {
  id: string;
  name: string;
  site: string;
  lng: number;
  lat: number;
  note: string;
  far?: boolean;
};

export const reisPlaces: ReisPlace[] = [
  { id: "jerusalem", name: "Jerusalém", site: "Cidade de Davi e monte do templo", lng: 35.2353, lat: 31.7767, note: "Capital de Judá. Templo, palácio, a fonte de Giom e o túnel de Ezequias." },
  { id: "gibeom", name: "Gibeom", site: "el-Jib", lng: 35.1847, lat: 31.8472, note: "O grande altar onde Salomão sacrifica e recebe o sonho do pedido de sabedoria (1 Rs 3:4–5)." },
  { id: "siquem", name: "Siquém", site: "Tell Balata", lng: 35.2817, lat: 32.2133, note: "Assembleia em que o norte rejeita Roboão (1 Rs 12:1). Primeira sede de Jeroboão." },
  { id: "tirza", name: "Tirza", site: "Tell el-Far'ah (norte)", lng: 35.3381, lat: 32.2861, note: "Capital do norte antes de Samaria, de Baasa a Onri (1 Rs 15:33; 16:23)." },
  { id: "samaria", name: "Samaria", site: "Sebastia", lng: 35.1897, lat: 32.277, note: "Capital construída por Onri (1 Rs 16:24). Palácio de Acabe, marfins, queda em 722 a.C." },
  { id: "betel", name: "Betel", site: "Beitin (provável)", lng: 35.2369, lat: 31.9294, note: "Santuário do sul do reino do norte, com um dos bezerros de ouro (1 Rs 12:29)." },
  { id: "da", name: "Dã", site: "Tel Dan", lng: 35.6522, lat: 33.2486, note: "Santuário do extremo norte, com o outro bezerro. Ali apareceu a estela de Tel Dã." },
  { id: "carmelo", name: "Monte Carmelo", site: "El-Muhraqa (tradição)", lng: 35.0889, lat: 32.6714, note: "Disputa entre Elias e os profetas de Baal (1 Rs 18). O ponto exato é tradição." },
  { id: "jezreel", name: "Jezreel", site: "Tel Jezreel", lng: 35.3292, lat: 32.5567, note: "Residência dos omridas. Vinha de Nabote e morte de Jezabel." },
  { id: "sarepta", name: "Sarepta", site: "Sarafand, Líbano", lng: 35.2958, lat: 33.4558, note: "Cidade fenícia entre Tiro e Sidom, onde Elias fica com a viúva (1 Rs 17:9)." },
  { id: "horebe", name: "Horebe", site: "Jebel Musa (tradição)", lng: 33.975, lat: 28.5394, note: "O monte de Deus. A localização do Sinai/Horebe é debatida.", far: true },
  { id: "ramote", name: "Ramote-Gileade", site: "Tell er-Rumeith (provável)", lng: 35.9906, lat: 32.4458, note: "Cidade de fronteira com Aram, onde Acabe morre (1 Rs 22). Identificação discutida." },
  { id: "jerico", name: "Jordão, perto de Jericó", site: "vale do Jordão", lng: 35.53, lat: 31.85, note: "Elias e Eliseu atravessam o Jordão a seco antes do carro de fogo (2 Rs 2:6–11)." },
  { id: "sunem", name: "Suném", site: "Sulam", lng: 35.3333, lat: 32.6, note: "Casa da sunamita, que hospeda Eliseu (2 Rs 4:8)." },
  { id: "dota", name: "Dotã", site: "Tel Dothan", lng: 35.2353, lat: 32.4092, note: "Cidade cercada pelos arameus quando Eliseu ora pelo servo (2 Rs 6:13)." },
  { id: "damasco", name: "Damasco", site: "cidade antiga", lng: 36.2919, lat: 33.5131, note: "Capital de Aram. De lá vêm Naamã, Ben-Hadade e Hazael." },
  { id: "dibom", name: "Dibom", site: "Dhiban, Jordânia", lng: 35.7767, lat: 31.5011, note: "Onde foi achada a estela de Messa, rei de Moabe (cf. 2 Rs 3)." },
  { id: "megido", name: "Megido", site: "Tel Megiddo", lng: 35.1847, lat: 32.5856, note: "Cidade fortificada (1 Rs 9:15). Josias morre ali diante do faraó Neco (2 Rs 23:29)." },
  { id: "laquis", name: "Laquis", site: "Tel Lachish", lng: 34.8494, lat: 31.565, note: "Segunda cidade de Judá. Sitiada por Senaqueribe em 701 a.C. e pelos babilônios." },
  { id: "tiro", name: "Tiro", site: "Sur, Líbano", lng: 35.195, lat: 33.2705, note: "Cidade de Hirão, que manda cedro e artesãos para o templo (1 Rs 5)." },
  { id: "ninive", name: "Nínive", site: "Mossul, Iraque", lng: 43.1531, lat: 36.3594, note: "Capital assíria de Senaqueribe. Ali estavam os relevos de Laquis.", far: true },
  { id: "babilonia", name: "Babilônia", site: "perto de Hilla, Iraque", lng: 44.4209, lat: 32.5364, note: "Capital de Nabucodonosor. Destino do exílio de Judá.", far: true },
  { id: "saba", name: "Sabá", site: "Marib, Iêmen (provável)", lng: 45.3256, lat: 15.4167, note: "Reino do sul da Arábia, ligado ao comércio de incenso.", far: true },
];

const placeById = new Map(reisPlaces.map((place) => [place.id, place]));

export function getReisPlace(id: string): ReisPlace | undefined {
  return placeById.get(id);
}

export const reisScenes: ReisScene[] = [...cenas1, ...cenas2, ...cenas3, ...cenas4].sort(
  (a, b) => a.order - b.order,
);

export function getReisScene(slug: string): ReisScene | undefined {
  return reisScenes.find((scene) => scene.slug === slug);
}

export type Kingdom = "unido" | "israel" | "juda";
export type Verdict = "bom" | "mau" | "misto" | "sem";

export const verdictLabel: Record<Verdict, string> = {
  bom: "Fez o que era reto",
  mau: "Fez o que era mau",
  misto: "Misto",
  sem: "Sem veredito no texto",
};

export type King = {
  name: string;
  kingdom: Kingdom;
  start: number;
  end: number;
  years: string;
  verdict: Verdict;
  ref: string;
  prophets: string[];
  note?: string;
};

/** Datas a.C. aproximadas, seguindo em geral Edwin Thiele. Sobreposições = corregências. */
export const kings: King[] = [
  { name: "Saul", kingdom: "unido", start: 1050, end: 1010, years: "c. 40 anos (At 13:21)", verdict: "sem", ref: "1 Sm 9–31", prophets: ["Samuel"], note: "Antes de Reis; datas muito aproximadas." },
  { name: "Davi", kingdom: "unido", start: 1010, end: 970, years: "40 anos", verdict: "bom", ref: "2 Sm; 1 Rs 1–2", prophets: ["Natã", "Gade"], note: "O padrão pelo qual os reis de Judá são medidos." },
  { name: "Salomão", kingdom: "unido", start: 970, end: 931, years: "40 anos", verdict: "misto", ref: "1 Rs 1–11", prophets: ["Natã", "Aías de Siló"], note: "Começa bem; na velhice o coração se desvia (11:4)." },

  { name: "Roboão", kingdom: "juda", start: 931, end: 913, years: "17 anos", verdict: "mau", ref: "1 Rs 12; 14:21–31", prophets: ["Semaías"], note: "Invasão de Sisaque (Sheshonq I)." },
  { name: "Abias", kingdom: "juda", start: 913, end: 911, years: "3 anos", verdict: "mau", ref: "1 Rs 15:1–8", prophets: [] },
  { name: "Asa", kingdom: "juda", start: 911, end: 870, years: "41 anos", verdict: "bom", ref: "1 Rs 15:9–24", prophets: ["(Azarias)", "(Hanani)"] },
  { name: "Josafá", kingdom: "juda", start: 872, end: 848, years: "25 anos", verdict: "bom", ref: "1 Rs 22:41–50", prophets: ["Micaías", "Elias", "(Jeú filho de Hanani)"], note: "Aliado de Acabe em Ramote-Gileade." },
  { name: "Jeorão", kingdom: "juda", start: 853, end: 841, years: "8 anos", verdict: "mau", ref: "2 Rs 8:16–24", prophets: ["Eliseu", "(Elias, por carta)"], note: "Casado com Atalia, filha de Acabe." },
  { name: "Acazias", kingdom: "juda", start: 841, end: 841, years: "1 ano", verdict: "mau", ref: "2 Rs 8:25–29; 9:27", prophets: ["Eliseu"], note: "Morto na revolta de Jeú." },
  { name: "Atalia", kingdom: "juda", start: 841, end: 835, years: "6 anos", verdict: "sem", ref: "2 Rs 11", prophets: [], note: "Rainha usurpadora; o texto não lhe dá a fórmula de reinado." },
  { name: "Joás", kingdom: "juda", start: 835, end: 796, years: "40 anos", verdict: "bom", ref: "2 Rs 11–12", prophets: ["(Zacarias filho de Joiada)"], note: "Reto enquanto Joiada o instruía (12:2)." },
  { name: "Amazias", kingdom: "juda", start: 796, end: 767, years: "29 anos", verdict: "bom", ref: "2 Rs 14:1–22", prophets: [], note: "“Mas não como Davi” (14:3)." },
  { name: "Azarias (Uzias)", kingdom: "juda", start: 792, end: 740, years: "52 anos", verdict: "bom", ref: "2 Rs 15:1–7", prophets: ["Isaías", "Amós", "Oseias"], note: "Ferido de lepra; corregência com Jotão." },
  { name: "Jotão", kingdom: "juda", start: 750, end: 732, years: "16 anos", verdict: "bom", ref: "2 Rs 15:32–38", prophets: ["Isaías", "Miqueias", "Oseias"] },
  { name: "Acaz", kingdom: "juda", start: 735, end: 716, years: "16 anos", verdict: "mau", ref: "2 Rs 16", prophets: ["Isaías", "Miqueias"], note: "Pede ajuda a Tiglate-Pileser III (16:7)." },
  { name: "Ezequias", kingdom: "juda", start: 716, end: 687, years: "29 anos", verdict: "bom", ref: "2 Rs 18–20", prophets: ["Isaías", "Miqueias"], note: "Cerco de Senaqueribe em 701 a.C." },
  { name: "Manassés", kingdom: "juda", start: 697, end: 643, years: "55 anos", verdict: "mau", ref: "2 Rs 21:1–18", prophets: ["“Seus servos, os profetas” (21:10)", "Naum?"], note: "O reinado mais longo; culpado pelo juízo final (24:3)." },
  { name: "Amom", kingdom: "juda", start: 643, end: 641, years: "2 anos", verdict: "mau", ref: "2 Rs 21:19–26", prophets: [] },
  { name: "Josias", kingdom: "juda", start: 641, end: 609, years: "31 anos", verdict: "bom", ref: "2 Rs 22–23", prophets: ["Hulda", "Jeremias", "Sofonias"], note: "O livro da Lei; morre em Megido." },
  { name: "Jeoacaz", kingdom: "juda", start: 609, end: 609, years: "3 meses", verdict: "mau", ref: "2 Rs 23:31–34", prophets: ["Jeremias"], note: "Levado ao Egito por Neco." },
  { name: "Jeoaquim", kingdom: "juda", start: 609, end: 598, years: "11 anos", verdict: "mau", ref: "2 Rs 23:36–24:7", prophets: ["Jeremias", "Habacuque", "Urias"] },
  { name: "Joaquim", kingdom: "juda", start: 598, end: 597, years: "3 meses", verdict: "mau", ref: "2 Rs 24:8–17; 25:27–30", prophets: ["Jeremias", "Ezequiel"], note: "Exilado em 597; liberto c. 561." },
  { name: "Zedequias", kingdom: "juda", start: 597, end: 586, years: "11 anos", verdict: "mau", ref: "2 Rs 24:18–25:7", prophets: ["Jeremias", "Ezequiel"], note: "Queda de Jerusalém (587 ou 586)." },

  { name: "Jeroboão I", kingdom: "israel", start: 931, end: 910, years: "22 anos", verdict: "mau", ref: "1 Rs 12–14", prophets: ["Aías de Siló", "Homem de Deus de Judá"], note: "Bezerros de ouro em Betel e Dã." },
  { name: "Nadabe", kingdom: "israel", start: 910, end: 909, years: "2 anos", verdict: "mau", ref: "1 Rs 15:25–31", prophets: [] },
  { name: "Baasa", kingdom: "israel", start: 909, end: 886, years: "24 anos", verdict: "mau", ref: "1 Rs 15:33–16:7", prophets: ["Jeú filho de Hanani"] },
  { name: "Elá", kingdom: "israel", start: 886, end: 885, years: "2 anos", verdict: "mau", ref: "1 Rs 16:8–14", prophets: [] },
  { name: "Zinri", kingdom: "israel", start: 885, end: 885, years: "7 dias", verdict: "mau", ref: "1 Rs 16:15–20", prophets: [], note: "Incendeia o palácio de Tirza sobre si." },
  { name: "Tibni", kingdom: "israel", start: 885, end: 880, years: "rival de Onri", verdict: "sem", ref: "1 Rs 16:21–22", prophets: [] },
  { name: "Onri", kingdom: "israel", start: 885, end: 874, years: "12 anos", verdict: "mau", ref: "1 Rs 16:23–28", prophets: [], note: "Funda Samaria; citado na estela de Messa." },
  { name: "Acabe", kingdom: "israel", start: 874, end: 853, years: "22 anos", verdict: "mau", ref: "1 Rs 16:29–22:40", prophets: ["Elias", "Micaías", "Eliseu"], note: "Em Qarqar (853) com 2.000 carros." },
  { name: "Acazias", kingdom: "israel", start: 853, end: 852, years: "2 anos", verdict: "mau", ref: "1 Rs 22:51–2 Rs 1", prophets: ["Elias"] },
  { name: "Jorão", kingdom: "israel", start: 852, end: 841, years: "12 anos", verdict: "mau", ref: "2 Rs 3; 9", prophets: ["Eliseu"], note: "Morto por Jeú (ou por Hazael, segundo a estela de Tel Dã)." },
  { name: "Jeú", kingdom: "israel", start: 841, end: 814, years: "28 anos", verdict: "misto", ref: "2 Rs 9–10", prophets: ["Eliseu"], note: "Destrói Baal, mantém os bezerros; Obelisco Negro." },
  { name: "Jeoacaz", kingdom: "israel", start: 814, end: 798, years: "17 anos", verdict: "mau", ref: "2 Rs 13:1–9", prophets: ["Eliseu"] },
  { name: "Jeoás", kingdom: "israel", start: 798, end: 782, years: "16 anos", verdict: "mau", ref: "2 Rs 13:10–25", prophets: ["Eliseu"], note: "Eliseu morre no seu reinado." },
  { name: "Jeroboão II", kingdom: "israel", start: 793, end: 753, years: "41 anos", verdict: "mau", ref: "2 Rs 14:23–29", prophets: ["Jonas", "Amós", "Oseias"], note: "Auge econômico do norte." },
  { name: "Zacarias", kingdom: "israel", start: 753, end: 753, years: "6 meses", verdict: "mau", ref: "2 Rs 15:8–12", prophets: ["Oseias"], note: "Fim da dinastia de Jeú." },
  { name: "Salum", kingdom: "israel", start: 752, end: 752, years: "1 mês", verdict: "sem", ref: "2 Rs 15:13–15", prophets: [] },
  { name: "Menaém", kingdom: "israel", start: 752, end: 742, years: "10 anos", verdict: "mau", ref: "2 Rs 15:16–22", prophets: ["Oseias"], note: "Paga tributo a Pul (Tiglate-Pileser III)." },
  { name: "Pecaías", kingdom: "israel", start: 742, end: 740, years: "2 anos", verdict: "mau", ref: "2 Rs 15:23–26", prophets: ["Oseias"] },
  { name: "Peca", kingdom: "israel", start: 752, end: 732, years: "20 anos", verdict: "mau", ref: "2 Rs 15:27–31", prophets: ["Oseias", "Isaías", "(Odede)"], note: "Os 20 anos incluem um governo rival em Gileade, segundo Thiele." },
  { name: "Oseias", kingdom: "israel", start: 732, end: 722, years: "9 anos", verdict: "mau", ref: "2 Rs 17", prophets: ["Oseias", "Isaías", "Miqueias"], note: "Último rei; queda de Samaria." },
];
