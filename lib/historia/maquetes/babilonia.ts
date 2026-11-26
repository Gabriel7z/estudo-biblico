import { distToPath, rect, type Block, type CityDef, type XZ } from "@/lib/historia/maquetes/types";

/**
 * Babilônia de Nabucodonosor II (c. 570 a.C.).
 *
 * Origem perto do Etemenanki; x para leste, z para o sul, em metros. O plano segue as
 * escavações de R. Koldewey (1899–1917) e as sínteses de O. Pedersen (Babylon, 2021) e
 * A. George (Babylonian Topographical Texts, 1992), simplificado: as medidas gerais e as
 * posições relativas são aproximadas; as casas são distribuídas numa grade só para dar escala.
 */

const EUFRATES: XZ[] = [
  [-430, -3300], [-400, -2100], [-365, -1150], [-360, -300], [-362, 500], [-385, 1450], [-430, 2100],
];
const RIVER_W = 130;

/** Cidade interna: leste (c. 1,5 × 1,7 km) e oeste, com o Eufrates no meio. */
const LESTE = rect(-295, -1000, 1200, 700);
const OESTE = rect(-1250, -1000, -425, 700);

const MURO_EXTERNO: XZ[] = [[-400, -3000], [2500, -700], [-375, 1750]];

const FOSSO_LESTE: XZ[] = [[-295, -1060], [1260, -1060], [1260, 760], [-295, 760]];
const FOSSO_OESTE: XZ[] = [[-425, -1060], [-1310, -1060], [-1310, 760], [-425, 760]];
const FOSSO_EXTERNO: XZ[] = [[-400, -3060], [2580, -700], [-375, 1810]];

const VIA: XZ[] = [[75, -1330], [75, -1000], [75, -95], [-300, -95]];

const ZIGURATE: XZ = [-107, -300];

const azul = "#2f5d9e";
const tijolo = "#c39a6b";
const adobe = "#b8936a";

function gate(id: string, at: XZ, rot = 0): Block {
  return { id, at, size: [26, 18, 22], rot, color: "#b58e62", kind: "gate", opening: 5, solid: false };
}

const blocks: Block[] = [
  // Portal de Ishtar: porta da frente (no muro externo) e porta de trás, maior (no muro interno)
  { id: "ishtar-tras", at: [75, -996], size: [50, 25, 30], color: azul, kind: "gate", opening: 6, frieze: { color: "#e6c779", rows: [4, 8, 12, 16], spacing: 4.5 } },
  { id: "ishtar-frente", at: [75, -1030], size: [30, 14, 16], color: azul, kind: "gate", opening: 5, frieze: { color: "#e6c779", rows: [3.5, 7.5], spacing: 4 } },
  // passagem sobre o fosso, diante do portal
  { id: "passagem-fosso", at: [75, -1062], size: [20, 1.6, 56], color: "#cdbb9a", lift: 3.6, walkable: true },
  // Via processional ao norte do portal: muros com leões em tijolo vidrado
  { id: "leoes-oeste", at: [62, -1185], size: [5, 12, 300], color: azul, kind: "glazed", solid: true, frieze: { color: "#efd9a0", rows: [4.5], spacing: 4.2 } },
  { id: "leoes-leste", at: [88, -1185], size: [5, 12, 300], color: azul, kind: "glazed", solid: true, frieze: { color: "#efd9a0", rows: [4.5], spacing: 4.2 } },
  // Palácio Sul (Südburg): cinco pátios em fila, de leste a oeste
  { id: "palacio-norte-ala", at: [-114, -972], size: [322, 15, 46], color: tijolo, roof: "#8a6a48", solid: true },
  { id: "palacio-sul-ala-o", at: [-215, -840], size: [120, 15, 50], color: tijolo, roof: "#8a6a48", solid: true },
  { id: "palacio-sul-ala-l", at: [-5, -840], size: [104, 15, 50], color: tijolo, roof: "#8a6a48", solid: true },
  { id: "sala-do-trono", at: [-115, -842], size: [56, 22, 24], color: "#3b67a8", kind: "glazed", solid: true, frieze: { color: "#e9d39a", rows: [3, 7.5], spacing: 3.5 } },
  { id: "palacio-divisoria-1", at: [-225, -905], size: [16, 14, 80], color: tijolo, solid: true },
  { id: "palacio-divisoria-2", at: [-160, -905], size: [16, 14, 80], color: tijolo, solid: true },
  { id: "palacio-divisoria-3", at: [-70, -905], size: [16, 14, 80], color: tijolo, solid: true },
  { id: "palacio-divisoria-4", at: [-5, -905], size: [16, 14, 80], color: tijolo, solid: true },
  { id: "abobadado", at: [22, -955], size: [42, 8, 30], color: "#b0875c", roof: "#4f6a2e", solid: true },
  // Palácio Norte (Hauptburg), fora do muro interno
  { id: "palacio-principal", at: [-120, -1200], size: [300, 16, 230], color: "#bf9466", roof: "#8a6a48", solid: true },
  // Palácio de Verão (Babil), no canto norte do muro externo
  { id: "palacio-verao", at: [-230, -2830], size: [250, 22, 250], color: "#c0976a", roof: "#8a6a48", solid: true },
  // Recinto e zigurate Etemenanki (medidas da Tábua de Esagila, Louvre AO 6555)
  {
    id: "etemenanki",
    at: ZIGURATE,
    size: [91, 91, 91],
    color: "#b98a5c",
    kind: "tiers",
    tiers: [
      [91, 91, 33], [78, 78, 18], [60, 60, 6], [51, 51, 6], [42, 42, 6], [33, 33, 6], [24, 21, 15],
    ],
    stair: { length: 52, width: 9 },
    solid: true,
  },
  // Esagila, o templo de Marduk (Bel), e o pátio a leste
  { id: "esagila", at: [-110, 15], size: [86, 18, 79], color: "#c7a173", roof: "#8a6a48", solid: true },
  { id: "esagila-patio", at: [5, 15], size: [116, 9, 89], color: "#bd9467", solid: true },
  // Templos menores
  { id: "emah", at: [140, -945], size: [53, 12, 37], color: "#d1b087", roof: "#8a6a48", solid: true },
  { id: "ishtar-agade", at: [380, -400], size: [37, 11, 31], color: "#d1b087", roof: "#8a6a48", solid: true },
  { id: "ninurta", at: [330, 470], size: [60, 11, 50], color: "#d1b087", roof: "#8a6a48", solid: true },
  // Ponte de pedra sobre o Eufrates, com pilares em forma de barco
  { id: "ponte", at: [-360, -95], size: [150, 2, 9], color: "#9b7f5c", lift: 8, walkable: true },
  ...[-405, -385, -365, -345, -325].map((x, i): Block => ({ id: `pilar-${i}`, at: [x, -95], size: [9, 9, 21], color: "#8e7656", lift: 0 })),
  // Portas comuns da cidade interna (posições aproximadas)
  gate("porta-marduk", [1200, -380], Math.PI / 2),
  gate("porta-zababa", [1200, 260], Math.PI / 2),
  gate("porta-enlil", [620, 700]),
  gate("porta-urash", [80, 700]),
  gate("porta-shamash", [-820, 700]),
  gate("porta-adad", [-1250, 120], Math.PI / 2),
  gate("porta-lugalirra", [-1250, -500], Math.PI / 2),
  gate("porta-sin", [620, -1000]),
];

function elevation(x: number, z: number): number {
  let h = 0.4 * Math.sin(x * 0.004) * Math.cos(z * 0.0035) + 0.3 * Math.sin((x + z) * 0.011);
  const river = distToPath(x, z, EUFRATES) - RIVER_W / 2;
  if (river < 30) h = Math.min(h, -6 + Math.max(0, river + 0) * 0.2);
  for (const moat of [FOSSO_LESTE, FOSSO_OESTE, FOSSO_EXTERNO]) {
    const d = distToPath(x, z, moat) - 22;
    if (d < 12) h = Math.min(h, -4 + Math.max(0, d) * 0.33);
  }
  // o Etemenanki e o palácio ficam sobre terraços de tijolo
  return h;
}

export const babilonia: CityDef = {
  slug: "babilonia",
  name: "Babilônia",
  title: "Babilônia de Nabucodonosor",
  kicker: "Maquete 3D · c. 570 a.C.",
  date: "c. 570 a.C.",
  lede:
    "A capital onde Daniel serviu e para onde foram os exilados de Judá: o Portal de Ishtar em tijolo azul, a via processional com os leões, o Palácio Sul, o zigurate Etemenanki, o templo de Marduk, a ponte sobre o Eufrates e os muros duplos com fosso. Gire em volta da cidade ou entre a pé pelo portal.",
  description:
    "Babilônia de Nabucodonosor II em 3D: Portal de Ishtar, via processional, Etemenanki, Esagila, Palácio Sul, Eufrates e muros. Vista aérea e caminhada.",
  poster: "/historia/maquetes/babilonia.webp",
  posterAlt: "Vista aérea da maquete de Babilônia: o Eufrates corta a cidade; o zigurate Etemenanki se ergue no centro e o Portal de Ishtar azul abre a via processional ao norte.",
  terrain: { minX: -1700, maxX: 2900, minZ: -3300, maxZ: 2100, seg: 260 },
  elevation,
  ground: { low: "#a58f66", mid: "#b49c71", high: "#c2aa7c", rock: "#a08a62", highAt: 4 },
  waterLevel: -1.5,
  waters: [
    { label: "Eufrates", path: EUFRATES, width: RIVER_W },
    { label: "Fosso da cidade leste", path: FOSSO_LESTE, width: 44 },
    { label: "Fosso da cidade oeste", path: FOSSO_OESTE, width: 44 },
    { label: "Fosso do muro externo", path: FOSSO_EXTERNO, width: 44 },
  ],
  roads: [{ label: "Via processional", path: VIA, width: 18, color: "#d9cdb6" }],
  walls: [
    { label: "Imgur-Enlil, cidade leste", ring: LESTE, closed: true, height: 15, thick: 7, color: "#b48c63", towerEvery: 20 },
    { label: "Nemetti-Enlil, cidade leste", ring: [[-295, -1020], [1220, -1020], [1220, 720], [-295, 720]], height: 10, thick: 4, color: "#a9845d", towerEvery: 20 },
    { label: "Imgur-Enlil, cidade oeste", ring: OESTE, closed: true, height: 15, thick: 7, color: "#b48c63", towerEvery: 20 },
    { label: "Nemetti-Enlil, cidade oeste", ring: [[-425, -1020], [-1270, -1020], [-1270, 720], [-425, 720]], height: 10, thick: 4, color: "#a9845d", towerEvery: 20 },
    { label: "Recinto do Etemenanki", ring: rect(-270, -480, 55, -120), closed: true, height: 9, thick: 6, color: "#c4a074", towerEvery: 28 },
    { label: "Recinto do Palácio Sul", ring: rect(-288, -998, 50, -812), closed: true, height: 13, thick: 8, color: "#b8906a" },
    { label: "Muro externo de Nabucodonosor", ring: MURO_EXTERNO, height: 14, thick: 22, color: "#a7835c", towerEvery: 50 },
  ],
  blocks,
  zones: [
    { ring: rect(-280, -990, 1185, 688), count: 1700, size: [10, 22], height: [5, 10], colors: [adobe, "#d2b48a"], seed: 41, grid: 24 },
    { ring: rect(-1238, -990, -440, 688), count: 900, size: [10, 20], height: [5, 9], colors: [adobe, "#cdb08a"], seed: 43, grid: 24 },
    { ring: [[-280, -2700], [1900, -900], [1250, -1100], [-280, -1400]], count: 220, size: [9, 16], height: [4, 7], colors: [adobe, "#c9a880"], seed: 47 },
  ],
  trees: [
    { kind: "palmeira", count: 1300, area: [-1700, 2900, -3300, 2100], seed: 5, avoid: [LESTE, OESTE], near: [{ path: EUFRATES, dist: 420 }] },
    { kind: "palmeira", count: 700, area: [-300, 2500, -3000, 1750], seed: 9, avoid: [LESTE, rect(-290, -1320, 120, -1060)], inside: [[[-380, -2990], [2480, -700], [-360, 1740]]] },
    { kind: "palmeira", count: 40, area: [-5, 50, -975, -935], seed: 13 },
  ],
  hotspots: [
    {
      id: "ishtar",
      name: "Portal de Ishtar",
      at: [75, -1010],
      y: 26,
      text: "A porta norte da cidade interna, dedicada à deusa Ishtar e refeita por Nabucodonosor II. Era dupla, uma porta menor no muro de fora e outra maior no muro de dentro, revestidas de tijolos vidrados azuis com touros (símbolo de Adad) e dragões mushhushshu (de Marduk) em relevo. Na inscrição do portal, o rei diz que pôs touros selvagens e dragões ferozes nas entradas para que o povo os olhasse maravilhado.",
      refs: "Dn 4:29–30; Jr 51:58",
      note: "A porta da frente, menor, foi remontada no Museu de Pérgamo, em Berlim, com tijolos achados por Koldewey (1902–1914). A porta de trás era bem mais alta; a altura da maquete é estimada.",
    },
    {
      id: "via",
      name: "Via processional",
      at: [75, -1200],
      y: 14,
      text: "A rua sagrada, pavimentada com placas de calcário e brecha vermelha. Ao norte do portal corria entre muros com leões em tijolo vidrado, o animal de Ishtar. Por ela passavam as estátuas de Marduk e de Nabu na festa do Ano Novo (akitu). Isaías zomba desses deuses carregados em procissão.",
      refs: "Is 46:1–2; Jr 50:2",
      note: "O nome babilônico era Ay-ibur-shapu, “o inimigo não passará”. Há leões dessa via em Berlim, Istambul, Nova York, Paris e outros museus.",
    },
    {
      id: "palacio-sul",
      name: "Palácio Sul e sala do trono",
      at: [-115, -860],
      y: 24,
      text: "O palácio de Nabucodonosor, no canto noroeste da cidade, junto ao rio: cinco pátios em fila, com salas em volta. A sala do trono, de uns 52 × 17 m, tinha a fachada em tijolo vidrado com leões, colunas e palmetas. Do terraço do palácio o rei diz: “Não é esta a grande Babilônia que eu edifiquei?”",
      refs: "Dn 4:29–30; 5:1–5",
      note: "Muitos situam o banquete de Belsazar nesta sala; o texto diz apenas “o palácio do rei”, e a identificação é tradicional.",
    },
    {
      id: "abobadado",
      name: "Edifício abobadado",
      at: [22, -955],
      y: 12,
      text: "No canto nordeste do palácio, Koldewey achou uma construção com abóbadas e poços, que ele pensou ser a base dos Jardins Suspensos. Ali também apareceram as tábuas de rações de óleo que citam “Joaquim, rei de Judá” e seus filhos, presos em Babilônia.",
      refs: "2 Rs 25:27–30; Jr 52:31–34",
      note: "Hoje muitos veem ali armazéns. A localização dos Jardins Suspensos é discutida; S. Dalley propõe que eles ficavam em Nínive. Tábuas publicadas por E. Weidner (1939), no Museu de Pérgamo.",
    },
    {
      id: "palacio-principal",
      name: "Palácio Norte",
      at: [-120, -1200],
      y: 18,
      text: "Nabucodonosor construiu outro palácio fora do muro interno, ao lado do Portal de Ishtar, como parte das defesas do norte. Koldewey o chamou de “palácio-museu” por causa de objetos antigos achados ali. Perto dele estava o Leão de Babilônia, estátua de basalto que ainda está no sítio.",
      refs: "Dn 4:30",
    },
    {
      id: "etemenanki",
      name: "Etemenanki",
      at: ZIGURATE,
      y: 94,
      text: "“Casa do fundamento do céu e da terra”, o zigurate de Marduk. A Tábua de Esagila dá a base de uns 91 × 91 m e sete patamares até 91 m de altura, com um templo no alto. Nabopolassar e Nabucodonosor o reconstruíram. A grande escada subia pelo lado sul.",
      refs: "Gn 11:1–9; Jr 51:53",
      note: "A ligação com a torre de Babel é antiga e popular, mas Gênesis não descreve este prédio. Alexandre mandou demolir a torre para refazê-la; hoje resta só o contorno da base. As medidas do texto são ideais e a maquete as segue.",
    },
    {
      id: "esagila",
      name: "Esagila, templo de Marduk",
      at: [-110, 15],
      y: 20,
      text: "O grande templo de Marduk, chamado Bel, com a estátua do deus. Para cá Nabucodonosor levou parte dos utensílios do Templo de Jerusalém, que Ciro mais tarde devolveu.",
      refs: "Dn 1:2; 2 Cr 36:7; Ed 1:7–11; Is 46:1; Jr 51:44",
      note: "O templo está sob um monte que não foi todo escavado. A planta da maquete é simplificada.",
    },
    {
      id: "ponte",
      name: "Ponte do Eufrates",
      at: [-360, -95],
      y: 10,
      text: "Uma ponte de uns 120 m ligava a cidade leste à oeste, sobre pilares de tijolo cozido em forma de barco, com a proa contra a corrente. Heródoto a descreve com tábuas que eram retiradas à noite.",
      refs: "Heródoto, Histórias 1.186",
      note: "Os pilares foram achados por Koldewey no antigo leito; o rio mudou de curso depois.",
    },
    {
      id: "eufrates",
      name: "Eufrates",
      at: [-362, 450],
      y: 4,
      text: "O rio cortava a cidade ao meio e enchia os fossos. Ao lado dos rios de Babilônia os exilados choraram, lembrando Sião. Jeremias mandou ler o rolo contra Babilônia e lançá-lo no meio do Eufrates.",
      refs: "Sl 137:1–4; Jr 51:59–64; Ap 16:12",
      note: "Heródoto conta que Ciro entrou pelo leito do rio desviado; as fontes babilônicas falam de uma entrada sem batalha. Ver o episódio da queda de Babilônia.",
    },
    {
      id: "muros",
      name: "Muros Imgur-Enlil e Nemetti-Enlil",
      at: [1200, 200],
      y: 18,
      text: "A cidade interna tinha muro duplo: Imgur-Enlil, o principal, e Nemetti-Enlil, o da frente, com um fosso cheio de água do rio por fora. Torres a cada vinte e poucos metros. Os textos de Babilônia nomeiam oito portas.",
      refs: "Jr 51:58; Is 45:1–2",
      note: "Koldewey mediu muros de tijolo cru de uns 6,5 m e 3,7 m de espessura. As alturas são desconhecidas; a maquete usa valores modestos.",
    },
    {
      id: "muro-externo",
      name: "Muro externo",
      at: [1208, -1735],
      y: 18,
      text: "Nabucodonosor cercou também a área a leste com um muro externo, de dois lados de uns 4 km, formando um triângulo com o rio. Entre ele e a cidade interna havia hortas, palmeirais e casas espalhadas.",
      refs: "Dn 4:30; Jr 51:12",
    },
    {
      id: "palacio-verao",
      name: "Palácio de Verão (Babil)",
      at: [-230, -2830],
      y: 24,
      text: "No canto norte do muro externo, a uns 2 km do Portal de Ishtar, Nabucodonosor ergueu mais um palácio, onde o vento norte refrescava. O monte que o cobre ainda se chama Babil.",
      refs: "Dn 4:4",
    },
    {
      id: "merkes",
      name: "Bairro residencial (Merkes)",
      at: [380, -330],
      y: 10,
      text: "A leste do zigurate, Koldewey escavou casas de pátio interno, em ruas mais ou menos retas. Heródoto diz que muitas casas tinham três ou quatro andares. Os exilados de Judá viviam sobretudo em aldeias fora da capital, como Tel-Abibe e Al-Yahudu.",
      refs: "Jr 29:4–7; Ez 3:15; Heródoto 1.180",
      note: "Na maquete as casas são distribuídas numa grade só para dar a escala.",
    },
    {
      id: "emah",
      name: "Templo de Ninmah",
      at: [140, -945],
      y: 13,
      text: "Templo da deusa-mãe Ninmah, ao lado do Portal de Ishtar: um pátio com a cela ao fundo, típico de Babilônia.",
      refs: "Jr 50:38; 51:47",
    },
    {
      id: "cidade-oeste",
      name: "Cidade oeste",
      at: [-850, -150],
      y: 10,
      text: "A parte da cidade interna na margem direita do Eufrates, menor, também murada. Pouco foi escavado nela.",
      refs: "Jr 51:31–32",
    },
  ],
  orbit: { position: [52, 34, 6], target: [-6, 2, -62], maxDistance: 420 },
  walk: { start: [75, -1105], yaw: Math.PI },
  sky: { background: "#e6cfa3", fog: "#e6cfa3", sun: [60, 40, 50], fogOrbit: [110, 360], fogWalk: [40, 240] },
  plan: {
    view: { minX: -1500, maxX: 2700, minZ: -3150, maxZ: 1950 },
    labels: [
      { text: "Eufrates", at: [-470, 1100], rot: -85, kind: "agua", size: 70 },
      { text: "cidade leste", at: [700, -700], size: 60 },
      { text: "cidade oeste", at: [-1150, -700], size: 60 },
      { text: "muro externo", at: [1350, -1880], rot: 38, size: 60 },
      { text: "fosso", at: [1300, 450], rot: 90, kind: "agua", size: 46 },
    ],
    scale: 500,
  },
  facts: {
    certo:
      "Portal de Ishtar, via processional, Palácio Sul, base do Etemenanki, Esagila, a ponte e trechos dos muros duplos foram escavados por Koldewey e sua equipe (1899–1917). As medidas do zigurate vêm de uma tábua cuneiforme.",
    texto:
      "Daniel, Jeremias, Isaías e o Salmo 137 falam do palácio, dos muros, das portas, do rio e dos deuses Bel e Nebo. As inscrições de Nabucodonosor descrevem as mesmas obras.",
    aproximado:
      "Proporções gerais, posição das portas comuns, alturas de muros e palácios e todas as casas. O curso do Eufrates mudou; o desenho segue o leito antigo de forma simplificada. A cidade aparece mais organizada do que era.",
  },
  sources: [
    "R. Koldewey, Das wieder erstehende Babylon (1913; ed. ingl. The Excavations at Babylon, 1914)",
    "O. Pedersen, Babylon: The Great City (Zaphon, 2021)",
    "A. R. George, Babylonian Topographical Texts (1992); a Tábua de Esagila, Louvre AO 6555",
    "Heródoto, Histórias 1.178–191",
  ],
};
