import { type Block, type CityDef, type XZ } from "@/lib/historia/maquetes/types";

/**
 * Samaria dos reis de Israel (c. 870–722 a.C.).
 *
 * Origem no centro do recinto real, no alto do monte; x para leste, z para o sul, em metros.
 * Cota 0 = fundo dos vales em volta (c. 330 m acima do mar); o topo fica uns 100 m acima.
 * Recinto real, palácio, tanque e depósito dos óstracos seguem as escavações de Harvard
 * (G. Reisner, 1908–1910) e de J. W. Crowfoot e K. Kenyon (1931–1935), simplificadas.
 * A cidade baixa, o muro de baixo e a porta são reconstruções.
 */

function smooth(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function elevation(x: number, z: number): number {
  // o monte, alongado de leste a oeste
  const r = Math.hypot(x / 600, z / 360);
  let h = 104 * (1 - smooth(0.12, 1.35, r));
  // selada a leste, que liga o monte às colinas
  h = Math.max(h, 46 * (1 - smooth(0, 1, Math.abs(z) / 300)) * smooth(250, 900, x) + 40 * smooth(900, 1700, x) * (1 - smooth(0, 1, Math.abs(z) / 700)));
  // serras ao norte e ao sul, do outro lado dos vales
  h = Math.max(h, 130 * smooth(950, 1600, Math.abs(z)) + 12 * Math.sin(x * 0.004));
  // terraços de lavoura nas encostas
  const terr = Math.floor(h / 5) * 5;
  h = h * 0.55 + terr * 0.45;
  // topo nivelado pelos construtores de Onri
  const inAcro = Math.max(Math.abs(x) / 125, Math.abs(z) / 75);
  if (inAcro < 1.4) h = h + (100 - h) * (1 - smooth(1, 1.4, inAcro));
  return h + 1.2 * Math.sin(x * 0.02) * Math.cos(z * 0.017);
}

const BAIXA: XZ[] = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2;
  return [60 + Math.cos(a) * 470, Math.sin(a) * 290] as XZ;
});

const pedra = "#d4c4a2";

const blocks: Block[] = [
  { id: "palacio", at: [-40, -5], size: [70, 11, 46], color: "#dccdaa", roof: "#6e5236", solid: true },
  { id: "ala-norte", at: [40, -32], size: [44, 8, 20], color: "#d6c6a3", roof: "#6e5236", solid: true },
  { id: "ostracos", at: [-82, 26], size: [28, 6, 22], color: "#cdbb98", roof: "#6e5236", solid: true },
  { id: "tanque", at: [-72, -36], size: [10, 0.4, 5], color: "#4f8fa8", lift: 0 },
  { id: "porta", at: [530, 0], size: [36, 13, 22], rot: Math.PI / 2, color: pedra, kind: "gate", opening: 4.5 },
  { id: "porta-acropole", at: [100, 8], size: [22, 11, 14], rot: Math.PI / 2, color: pedra, kind: "gate", opening: 4 },
];

export const samaria: CityDef = {
  slug: "samaria",
  name: "Samaria",
  title: "Samaria dos reis de Israel",
  kicker: "Maquete 3D · c. 870–722 a.C.",
  date: "c. 870–722 a.C.",
  lede:
    "A capital do reino do norte, fundada por Onri num monte isolado comprado de Semer. No alto, o recinto real com o palácio, o tanque e os depósitos; nas encostas, a cidade e os terraços de oliveiras e vinhas. Aqui reinaram Acabe e Jezabel, Elias e Eliseu foram e vieram, e a cidade caiu diante da Assíria em 722 a.C.",
  description:
    "Samaria em 3D: o monte de Onri, o recinto real com muro de casamata, palácio, tanque, depósito dos óstracos, a cidade baixa e a porta. Vista aérea e caminhada.",
  poster: "/historia/maquetes/samaria.webp",
  posterAlt: "Vista aérea da maquete de Samaria: um monte isolado com o recinto real murado no alto e casas e terraços de oliveiras nas encostas.",
  terrain: { minX: -1800, maxX: 1800, minZ: -1500, maxZ: 1500, seg: 200 },
  elevation,
  ground: { low: "#7c8550", mid: "#a39a6c", high: "#c4b68e", rock: "#b9a985", highAt: 110 },
  waterLevel: -10,
  waters: [],
  roads: [{ label: "Subida da porta ao recinto real", path: [[950, 30], [540, 0], [400, -70], [270, -30], [175, 20], [110, 8]], width: 6, color: "#cbbd9c" }],
  walls: [
    { label: "Muro de casamata do recinto real", ring: [[-118, -68], [118, -68], [118, 68], [-118, 68]], closed: true, height: 8, thick: 10, color: "#d9caa6", towerEvery: 0 },
    { label: "Muro interno do primeiro recinto", ring: [[-89, -45], [89, -45], [89, 45], [-89, 45]], closed: true, height: 4, thick: 1.6, color: "#e0d2b0" },
    { label: "Muro da cidade baixa (reconstrução)", ring: BAIXA, closed: true, height: 7, thick: 4, color: "#c5b593", towerEvery: 60 },
  ],
  blocks,
  zones: [
    { ring: BAIXA, count: 380, size: [8, 14], height: [3.5, 6], colors: ["#cdbb97", "#b29d78"], seed: 71, minH: 18, maxH: 93 },
  ],
  trees: [
    { kind: "oliveira", count: 1700, area: [-1800, 1800, -1500, 1500], seed: 29, avoid: [BAIXA] },
    { kind: "oliveira", count: 90, area: [-400, 500, -260, 260], seed: 31, inside: [BAIXA], avoid: [[[-125, -75], [125, -75], [125, 75], [-125, 75]]] },
  ],
  hotspots: [
    {
      id: "acropole",
      name: "Recinto real",
      at: [10, 30],
      y: 6,
      text: "Onri comprou o monte de Semer por dois talentos de prata e ali construiu a capital. O topo da rocha foi cortado e nivelado para um recinto real retangular, primeiro com um muro simples, de uns 180 × 90 m; depois um muro de casamata ampliou o recinto. De um monte isolado, a vista vai até o Mediterrâneo.",
      refs: "1 Rs 16:23–24, 28; Is 28:1–4",
      note: "Acabe fez em Samaria um altar na casa de Baal, que Jeú destruiu (1 Rs 16:32; 2 Rs 10:18–27); o templo não foi achado. A atribuição das fases de construção a Onri ou a Acabe é discutida.",
    },
    {
      id: "palacio",
      name: "Palácio dos reis de Israel",
      at: [-40, -5],
      y: 12,
      text: "O palácio dos omridas, na parte oeste do recinto, de pedra lavrada assentada com cuidado, técnica fenícia. Aqui reinaram Onri, Acabe e seus sucessores. Acazias caiu pela grade do quarto de cima; Jeú mandou matar os setenta filhos de Acabe que estavam em Samaria.",
      refs: "1 Rs 16:28–29; 22:37–39; 2 Rs 1:2; 10:1–11",
    },
    {
      id: "marfim",
      name: "Casa de marfim",
      at: [40, -32],
      y: 9,
      text: "No entulho do recinto apareceram centenas de fragmentos de marfim entalhado, em estilo fenício: esfinges aladas, flores de lótus, a “mulher à janela”. Eles combinam com a “casa de marfim” de Acabe e com os leitos de marfim que Amós denuncia.",
      refs: "1 Rs 22:39; Am 3:15; 6:4",
      note: "Os marfins são dos séculos 9 e 8 a.C. e não se sabe de que prédio exato vieram.",
    },
    {
      id: "tanque",
      name: "Tanque de Samaria",
      at: [-72, -36],
      y: 2,
      text: "No pátio, os escavadores acharam um tanque cavado na rocha, de uns 10 × 5 m. Alguns o ligam ao “tanque de Samaria” onde lavaram o carro de Acabe depois da batalha de Ramote-Gileade.",
      refs: "1 Rs 22:37–38",
      note: "A identificação é só uma hipótese.",
    },
    {
      id: "ostracos",
      name: "Depósito dos óstracos",
      at: [-82, 26],
      y: 7,
      text: "Num prédio a oeste do palácio Reisner achou cerca de cem óstracos, cacos com recibos de vinho velho e azeite fino enviados de aldeias de Manassés à corte, datados por anos de reinado. Os nomes misturam o de Javé e o de Baal.",
      refs: "Os 2:8; Am 6:6; 1 Rs 4:7",
      note: "Os anos citados são, para muitos, de Jeroboão II (c. 780–760 a.C.).",
    },
    {
      id: "porta",
      name: "Porta da cidade",
      at: [530, 0],
      y: 14,
      text: "Na eira à entrada da porta, Acabe e Josafá sentaram em tronos diante de quatrocentos profetas. No cerco arameu, quatro leprosos ficaram à entrada da porta; no dia seguinte, ali mesmo, a medida de farinha custou um siclo, como Eliseu anunciou.",
      refs: "1 Rs 22:10; 2 Rs 6:24–7:20",
      note: "A porta do tempo dos reis não foi identificada; a posição na selada leste, o acesso natural ao monte, é uma suposição.",
    },
    {
      id: "cidade-baixa",
      name: "Cidade baixa e o cerco assírio",
      at: [-300, 200],
      y: 8,
      text: "A cidade se espalhava pelas encostas. Salmanaser V a cercou por três anos e ela caiu em 722 a.C.; Sargão II diz ter levado 27.290 pessoas. Miqueias tinha dito que Samaria viraria um montão de pedras no campo, terra de plantar vinhas.",
      refs: "2 Rs 17:5–6; 18:9–10; Mq 1:6",
      note: "O traçado do muro de baixo e o tamanho da cidade baixa são pouco conhecidos; a maquete os desenha de modo aproximado.",
    },
    {
      id: "encostas",
      name: "Encostas e terraços",
      at: [320, 230],
      y: 4,
      text: "Os terraços de oliveiras e vinhas em volta do monte sustentavam a corte. Isaías compara Samaria a uma coroa de flores sobre a cabeça de um vale fértil; Amós chama as mulheres ricas de “vacas de Basã que estão no monte de Samaria”.",
      refs: "Is 28:1–4; Am 4:1",
    },
  ],
  orbit: { position: [42, 30, 46], target: [2, 7, 0], maxDistance: 300 },
  walk: { start: [600, 10], yaw: Math.PI / 2 },
  sky: { background: "#dcdcc8", fog: "#dcdcc8", sun: [60, 45, 40], fogOrbit: [110, 330], fogWalk: [40, 220] },
  plan: {
    view: { minX: -900, maxX: 1100, minZ: -650, maxZ: 650 },
    contours: { from: 10, to: 130, step: 10, major: 50 },
    labels: [
      { text: "selada leste", at: [760, -90], size: 50 },
      { text: "monte de Samaria", at: [-450, -380], size: 60 },
    ],
    scale: 200,
  },
  facts: {
    certo:
      "O monte isolado, o recinto real nivelado na rocha, os muros de pedra lavrada e de casamata, os marfins e os óstracos foram escavados por Harvard (1908–1910) e pela Expedição Conjunta de Crowfoot e Kenyon (1931–1935).",
    texto:
      "Reis, Isaías, Amós, Oseias e Miqueias falam do monte comprado de Semer, do palácio, da casa de marfim, do tanque, da porta, dos cercos e da queda.",
    aproximado:
      "A planta interna do palácio, o muro e a porta da cidade baixa, as casas e a extensão da cidade. O relevo é um modelo simplificado; sobre o monte há hoje restos gregos, romanos (a Sebaste de Herodes) e a aldeia de Sebastia.",
  },
  sources: [
    "G. A. Reisner, C. S. Fisher e D. G. Lyon, Harvard Excavations at Samaria 1908–1910 (1924)",
    "J. W. Crowfoot, K. M. Kenyon e E. L. Sukenik, The Buildings at Samaria (1942); J. W. e G. M. Crowfoot, Early Ivories from Samaria (1938)",
    "N. Franklin, “Samaria: from the bedrock to the Omride palace”, Levant 36 (2004)",
  ],
};
