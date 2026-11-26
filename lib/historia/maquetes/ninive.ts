import { distToPath, type Block, type CityDef, type XZ } from "@/lib/historia/maquetes/types";

/**
 * Nínive de Senaqueribe a Assurbanípal (c. 700–612 a.C.).
 *
 * Origem perto do centro de Kuyunjik; x para leste, z para o sul, em metros. Traçado do
 * muro, das portas, dos montes e dos rios simplificado a partir dos levantamentos publicados
 * (D. Stronach, J. Reade, D. Kertai); as casas e os jardins são ilustrativos.
 */

const MURO: XZ[] = [
  [-520, -1890], [150, -1970], [900, -2060], [1350, -2115], [1755, -720], [1845, 540], [1170, 2070], [180, 2610], [-315, 1710], [-470, 540], [-500, -400],
];
const MURO_EXT: XZ[] = [[1450, -2210], [1880, -730], [1975, 560], [1290, 2150]];
const FOSSO: XZ[] = [[1400, -2160], [1815, -725], [1910, 550], [1230, 2110]];
const TIGRE: XZ[] = [[-1000, -3000], [-860, -1500], [-790, 0], [-830, 1500], [-990, 3100]];
const KHOSR: XZ[] = [[2900, -250], [1810, 160], [1100, 320], [400, 470], [-150, 520], [-480, 560], [-820, 640]];

const KUYUNJIK = { at: [-80, -40] as XZ, rx: 470, rz: 300, h: 26 };
const NEBI_YUNUS = { at: [-230, 1250] as XZ, rx: 240, rz: 190, h: 18 };

function mound(x: number, z: number, m: { at: XZ; rx: number; rz: number; h: number }) {
  const r = Math.hypot((x - m.at[0]) / m.rx, (z - m.at[1]) / m.rz);
  if (r >= 1.25) return 0;
  // planalto no alto, encostas íngremes
  const t = Math.max(0, Math.min(1, (1.25 - r) / 0.4));
  return m.h * t * t * (3 - 2 * t);
}

function elevation(x: number, z: number): number {
  let h = 0.6 * Math.sin(x * 0.003 + 1) * Math.cos(z * 0.0024) + 0.004 * Math.max(0, x - 1000);
  h = Math.max(h, mound(x, z, KUYUNJIK), mound(x, z, NEBI_YUNUS));
  const t = distToPath(x, z, TIGRE) - 120;
  if (t < 40) h = Math.min(h, -6 + Math.max(0, t) * 0.15);
  const k = distToPath(x, z, KHOSR) - 15;
  if (k < 20) h = Math.min(h, -4 + Math.max(0, k) * 0.2);
  const f = distToPath(x, z, FOSSO) - 25;
  if (f < 10) h = Math.min(h, -4 + Math.max(0, f) * 0.4);
  return h;
}

const pedra = "#c8b79a";
const tijolo = "#bfa27c";

function gate(id: string, at: XZ, rot: number, big = false): Block {
  return { id, at, size: big ? [44, 24, 34] : [30, 20, 26], rot, color: big ? "#d2c2a2" : pedra, kind: "gate", opening: big ? 7 : 5 };
}

const blocks: Block[] = [
  // Kuyunjik
  { id: "palacio-sudoeste", at: [-260, 70], size: [300, 18, 210], color: "#d0bd99", roof: "#7d6448", solid: true },
  { id: "palacio-norte", at: [120, -190], size: [210, 16, 140], color: "#c9b591", roof: "#7d6448", solid: true },
  { id: "templo-ishtar", at: [-20, -60], size: [80, 18, 55], color: "#d8c7a5", roof: "#7d6448", solid: true },
  { id: "templo-nabu", at: [110, 20], size: [60, 13, 40], color: "#d8c7a5", roof: "#7d6448", solid: true },
  { id: "zigurate-kuyunjik", at: [-70, -170], size: [40, 30, 40], color: "#c9ad86", kind: "tiers", tiers: [[44, 44, 12], [34, 34, 9], [24, 24, 9]], solid: true },
  // Nebi Yunus: o arsenal (ekal masharti)
  { id: "arsenal", at: [-230, 1250], size: [240, 16, 170], color: "#cdb995", roof: "#7d6448", solid: true },
  // Portas principais escavadas
  gate("porta-nergal", [150, -1970], -Math.atan2(-90, 750), true),
  gate("porta-adad", [900, -2060], -Math.atan2(-55, 450), true),
  gate("porta-shamash", [1800, -100], -Math.atan2(1260, 90), true),
  gate("porta-halzi", [1497, 1330], -Math.atan2(1530, -675), true),
  gate("porta-externa-shamash", [1926, -100], -Math.atan2(1290, 95)),
  gate("porta-mashki", [-505, -1150], -Math.atan2(-1490, -20), true),
  // outras portas (Senaqueribe lista quinze; posições ilustrativas)
  gate("porta-6", [1550, -1420], -Math.atan2(1395, 405)),
  gate("porta-7", [1760, 733], -Math.atan2(1530, -675)),
  gate("porta-8", [720, 2310], -Math.atan2(540, -990)),
  gate("porta-9", [-70, 2160], -Math.atan2(-900, -495)),
  gate("porta-10", [-390, 1100], -Math.atan2(-1170, -155)),
  gate("porta-11", [1680, -978], -Math.atan2(1395, 405)),
  gate("porta-12", [1260, 1860], -Math.atan2(1530, -675)),
  gate("porta-13", [-485, 120], -Math.atan2(-940, -30)),
  gate("porta-14", [1825, 280], -Math.atan2(1260, 90)),
  gate("porta-15", [-510, -1700], -Math.atan2(-1490, -20)),
];

const DENTRO: XZ[] = MURO;

export const ninive: CityDef = {
  slug: "ninive",
  name: "Nínive",
  title: "Nínive, a grande cidade",
  kicker: "Maquete 3D · c. 700–612 a.C.",
  date: "c. 700–612 a.C.",
  lede:
    "A capital da Assíria no tempo de Senaqueribe e Assurbanípal, para onde Jonas foi mandado e cuja queda Naum anunciou: 12 km de muralha com quinze portas, o monte de Kuyunjik com o “palácio sem rival”, o monte de Nebi Yunus, o rio Khosr cortando a cidade e o Tigre a oeste.",
  description:
    "Nínive em 3D: muralha de 12 km, portas de Nergal, Adad, Shamash e Halzi, palácios de Senaqueribe e Assurbanípal em Kuyunjik, Nebi Yunus, o Khosr e o Tigre. Vista aérea e caminhada.",
  poster: "/historia/maquetes/ninive.webp",
  posterAlt: "Vista aérea da maquete de Nínive: a muralha longa contorna a cidade, o monte de Kuyunjik com os palácios fica à beira do Tigre e o rio Khosr atravessa a cidade.",
  terrain: { minX: -1500, maxX: 2700, minZ: -2700, maxZ: 3200, seg: 230 },
  elevation,
  ground: { low: "#9a8a62", mid: "#b19b6f", high: "#c9b48a", rock: "#a3906c", highAt: 26 },
  waterLevel: -1.5,
  waters: [
    { label: "Tigre", path: TIGRE, width: 240 },
    { label: "Khosr", path: KHOSR, width: 30 },
    { label: "Fosso", path: FOSSO, width: 50 },
  ],
  roads: [
    { label: "Rua real", path: [[1800, -100], [900, 0], [300, -60], [180, -120]], width: 14, color: "#d6c7a6" },
  ],
  walls: [
    { label: "Muralha de Senaqueribe", ring: MURO, closed: true, height: 20, thick: 15, color: "#c2ad87", towerEvery: 40, towerColor: "#c9b590" },
    { label: "Muro externo (leste)", ring: MURO_EXT, height: 9, thick: 9, color: "#b49c74", towerEvery: 45 },
    { label: "Muro de arrimo de Kuyunjik", ring: [[-500, -260], [300, -330], [420, 60], [100, 290], [-480, 270]], closed: true, height: 6, thick: 5, color: "#c9b590" },
  ],
  blocks,
  zones: [
    { ring: DENTRO, maxH: 6, count: 1900, size: [10, 20], height: [4, 8], colors: [tijolo, "#d3bd96"], seed: 61 },
  ],
  trees: [
    { kind: "palmeira", count: 450, area: [-1500, 2700, -2700, 3200], seed: 17, near: [{ path: TIGRE, dist: 420 }, { path: KHOSR, dist: 160 }], avoid: [[[-500, -260], [300, -330], [420, 60], [100, 290], [-480, 270]]] },
    { kind: "oliveira", count: 900, area: [-500, 1900, -2100, 2600], seed: 19, inside: [DENTRO], avoid: [[[-500, -260], [300, -330], [420, 60], [100, 290], [-480, 270]]] },
    { kind: "oliveira", count: 500, area: [1900, 2700, -2600, 3100], seed: 23 },
  ],
  hotspots: [
    {
      id: "kuyunjik",
      name: "Kuyunjik",
      at: [-80, -40],
      y: 4,
      text: "O monte principal, uns 25 m acima da planície, à beira do Tigre e do Khosr. Ali ficavam os palácios e os templos. Gênesis atribui a fundação de Nínive a Ninrode.",
      refs: "Gn 10:11–12; Jn 1:2; 3:3",
      note: "O monte acumula camadas desde a pré-história. Escavado por Layard, Rassam e outros a partir dos anos 1840.",
    },
    {
      id: "palacio-sudoeste",
      name: "Palácio sem rival",
      at: [-260, 70],
      y: 20,
      text: "O palácio de Senaqueribe, no canto sudoeste de Kuyunjik, que ele chamou “palácio sem rival”. Layard escavou mais de 70 salas. Numa delas, os relevos mostram o cerco de Laquis, em Judá, em 701 a.C., com os deportados saindo pela porta.",
      refs: "2 Rs 18:13–17; 19:36; Is 36:1–2",
      note: "Os relevos de Laquis estão no Museu Britânico. O Prisma de Senaqueribe, achado em Nínive, diz que Ezequias ficou fechado em Jerusalém “como um pássaro na gaiola”.",
    },
    {
      id: "palacio-norte",
      name: "Palácio Norte de Assurbanípal",
      at: [120, -190],
      y: 18,
      text: "O palácio de Assurbanípal, com os famosos relevos da caçada aos leões. Nos palácios de Kuyunjik apareceram dezenas de milhares de tábuas e fragmentos: a chamada biblioteca de Assurbanípal, com a epopeia de Gilgamesh e o relato do dilúvio.",
      refs: "Ed 4:10; Na 2:11–12",
      note: "Muitos identificam o “grande e famoso Osnapar” de Esdras 4:10 com Assurbanípal.",
    },
    {
      id: "templo-ishtar",
      name: "Templo de Ishtar",
      at: [-20, -60],
      y: 20,
      text: "O templo de Ishtar de Nínive, no alto de Kuyunjik, um dos mais antigos da cidade. Segundo 2 Reis, Senaqueribe foi morto pelos filhos enquanto adorava na casa do seu deus Nisroque, em Nínive.",
      refs: "2 Rs 19:36–37; Is 37:37–38",
      note: "Nisroque não foi identificado com certeza; o lugar exato do assassinato não é conhecido.",
    },
    {
      id: "nebi-yunus",
      name: "Nebi Yunus",
      at: [-230, 1250],
      y: 18,
      text: "O segundo monte, ao sul do Khosr, com o arsenal real (ekal masharti) de Senaqueribe e Esar-Hadom. Desde a Idade Média uma mesquita sobre o monte guardava o “túmulo de Jonas”.",
      refs: "Jn 3:1–10; 2 Rs 19:37",
      note: "O santuário foi destruído pelo Estado Islâmico em 2014; túneis abertos pelos saqueadores revelaram salas de um palácio assírio por baixo.",
    },
    {
      id: "muralha",
      name: "Muralha de Senaqueribe",
      at: [1755, -720],
      y: 22,
      text: "Senaqueribe ampliou a cidade e a cercou com uma muralha de uns 12 km, com base de pedra e corpo de tijolo, e quinze portas. Do lado leste havia ainda um fosso e um muro externo. Jonas a chama “cidade muito grande, de três dias de caminho”.",
      refs: "Jn 3:3; 4:11; Na 3:14",
      note: "O sentido dos “três dias” é discutido: a volta da cidade, o tempo de percorrê-la pregando ou a região toda. A altura dos muros é estimada.",
    },
    {
      id: "nergal",
      name: "Porta de Nergal",
      at: [150, -1970],
      y: 24,
      text: "Porta norte, com touros alados de cabeça humana (lamassu) guardando a passagem. Esses guardiões são o tipo de “querubim” que Ezequiel e o mundo bíblico conheciam: seres alados, de corpo animal.",
      refs: "Ez 1:5–10; 10:20",
      note: "A porta reconstruída e os lamassu foram danificados pelo Estado Islâmico em 2015.",
    },
    {
      id: "halzi",
      name: "Porta de Halzi",
      at: [1497, 1330],
      y: 24,
      text: "Porta do sudeste. Nas escavações de D. Stronach (1989–1990) apareceram ali esqueletos dos defensores mortos no ataque de medos e babilônios em 612 a.C. A Crônica Babilônica conta o cerco de três meses e a tomada da cidade.",
      refs: "Na 2:1–10; 3:1–3; Sf 2:13–15",
    },
    {
      id: "shamash",
      name: "Porta de Shamash",
      at: [1800, -100],
      y: 24,
      text: "A principal porta do lado leste. Escavada e restaurada em parte por arqueólogos iraquianos; a base de pedra mostra a espessura da muralha.",
      refs: "Na 3:13",
    },
    {
      id: "khosr",
      name: "Rio Khosr",
      at: [700, 410],
      y: 3,
      text: "O pequeno rio que atravessa a cidade. Senaqueribe trouxe mais água das montanhas por canais e pelo aqueduto de Jerwan, para os jardins e pomares. Naum fala das comportas dos rios abertas e do palácio que se derrete.",
      refs: "Na 2:6–8",
      note: "A ideia de que uma enchente do Khosr ajudou na queda da cidade é antiga, mas não confirmada.",
    },
    {
      id: "tigre",
      name: "Tigre",
      at: [-800, -600],
      y: 3,
      text: "O grande rio corria então perto da muralha oeste; depois mudou de leito. Na outra margem fica hoje Mossul. Naum descreve o fim da cidade como uma inundação que tudo arrasta.",
      refs: "Na 1:8; 2:8",
    },
  ],
  orbit: { position: [60, 48, 70], target: [-6, 2, 4], maxDistance: 480 },
  walk: { start: [2140, -100], yaw: Math.PI / 2 },
  sky: { background: "#e2d2ae", fog: "#e2d2ae", sun: [60, 42, 40], fogOrbit: [130, 420], fogWalk: [40, 240] },
  plan: {
    view: { minX: -1400, maxX: 2600, minZ: -2600, maxZ: 3100 },
    contours: { from: 5, to: 25, step: 5, major: 25 },
    labels: [
      { text: "Tigre", at: [-930, 900], rot: -88, kind: "agua", size: 70 },
      { text: "Khosr", at: [1150, 270], rot: -12, kind: "agua", size: 50 },
      { text: "fosso", at: [1950, -300], rot: 80, kind: "agua", size: 42 },
    ],
    scale: 500,
  },
  facts: {
    certo:
      "O traçado geral da muralha, as portas de Nergal, Adad, Shamash, Halzi e Mashki, os montes de Kuyunjik e Nebi Yunus e os palácios de Senaqueribe e Assurbanípal são conhecidos por escavações desde Layard (1840) até as equipes iraquianas, americanas e italianas.",
    texto:
      "Jonas, Naum e Sofonias falam da grandeza, das portas, dos rios e da queda de Nínive. Os anais de Senaqueribe descrevem a muralha, as quinze portas, os canais e o palácio.",
    aproximado:
      "O relevo é simplificado, as alturas dos muros e prédios são estimadas e só os grandes prédios aparecem. Dez das quinze portas estão em posições ilustrativas. Casas, jardins e a rua real são ilustrativos.",
  },
  sources: [
    "A. H. Layard, Discoveries in the Ruins of Nineveh and Babylon (1853)",
    "D. Stronach e K. Codella, “Nineveh”, Oxford Encyclopedia of Archaeology in the Near East (1997)",
    "J. Reade, “Nineveh”, Reallexikon der Assyriologie 9 (1998–2001)",
    "Crônica Babilônica da queda de Nínive (BM 21901)",
  ],
};
