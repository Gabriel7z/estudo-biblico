import { pointInRing, rect, type Block, type CityDef, type CityHotspot, type WallDef, type XZ } from "@/lib/historia/maquetes/types";

/**
 * Jerusalém de Herodes, c. 30 d.C.
 *
 * Mesmo sistema da maquete de Jerusalém dos reis: origem em 31,7740 N / 35,2340 L, x para leste, z para o sul, em metros.
 * Cota relativa = cota real − 600 m (a esplanada do Templo fica em c. 740 m → 140).
 * O Templo segue Josefo (Antiguidades 15.380–425; Guerra 5.184–247) e a Mishná (Middot), com o côvado de 0,525 m,
 * na leitura de L. Ritmeyer; a cidade segue as escavações e a maquete do Holyland/Museu de Israel, simplificadas.
 */

function smooth(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

/** Vales: pontos [x, z, cota real do fundo]. */
const VALES: { pts: [number, number, number][]; slope: number }[] = [
  { slope: 0.45, pts: [[470, -1300, 735], [470, -1000, 722], [420, -500, 688], [330, -200, 664], [285, 100, 640], [262, 350, 625], [222, 620, 608], [235, 950, 585]] },
  { slope: 0.3, pts: [[-330, -1300, 772], [-330, -1000, 762], [-200, -450, 735], [-90, -250, 718], [-40, 0, 695], [-10, 150, 672], [50, 380, 640], [120, 560, 620], [215, 625, 609]] },
  { slope: 0.42, pts: [[-850, -400, 760], [-720, -250, 745], [-690, 0, 732], [-610, 300, 705], [-480, 540, 676], [-200, 660, 640], [100, 670, 620], [225, 630, 608]] },
];

function segDist(px: number, pz: number, a: [number, number, number], b: [number, number, number]) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len2 = dx * dx + dz * dz;
  const t = Math.max(0, Math.min(1, len2 ? ((px - a[0]) * dx + (pz - a[1]) * dz) / len2 : 0));
  return { d: Math.hypot(px - (a[0] + t * dx), pz - (a[1] + t * dz)), floor: a[2] + t * (b[2] - a[2]) };
}

/** Relevo natural (cota real, m). */
function natural(x: number, z: number): number {
  const leste = z > -449 ? 742 - 0.13 * (z + 449) : 742 + 0.045 * (-449 - z);
  const oeste = 772 - 0.05 * Math.max(0, z + 100) - 0.03 * Math.max(0, -z - 300);
  let h = oeste + (leste - oeste) * smooth(-260, 40, x);
  h += Math.min(78, 0.13 * Math.max(0, x - 380));
  h += 0.04 * Math.max(0, -x - 760);
  for (const vale of VALES) {
    let best = Infinity;
    for (let i = 0; i < vale.pts.length - 1; i += 1) {
      const { d, floor } = segDist(x, z, vale.pts[i], vale.pts[i + 1]);
      best = Math.min(best, floor + vale.slope * Math.max(0, d - 10));
    }
    h = smin(h, best, 14);
  }
  return h + 0.8 * Math.sin(x * 0.021) * Math.cos(z * 0.017);
}

/** Esplanada do Templo (cantos medidos sobre a planta atual). */
const ESPLANADA: XZ[] = [[47, -234], [317, -252], [281, -722], [9, -716]];
const NIVEL = 140;

function elevation(x: number, z: number): number {
  if (pointInRing(x, z, ESPLANADA)) return NIVEL;
  return natural(x, z) - 600;
}

/* Eixo do Templo: girado c. 3,8° para acompanhar a esplanada. u = leste, v = sul, origem no centro do santuário. */
const R = 0.066;
const O: XZ = [118, -446];
function P(u: number, v: number): XZ {
  return [O[0] + u * Math.cos(R) + v * Math.sin(R), O[1] - u * Math.sin(R) + v * Math.cos(R)];
}

const marmore = "#eee7d8";
const pedra = "#ddd0b4";
const ouro = "#d8b45a";

/** Bloco no eixo do Templo. `alongV` gira 90° (o lado maior corre de norte a sul). */
function tb(id: string, u: number, v: number, size: [number, number, number], color: string, extra: Partial<Block> = {}, alongV = false): Block {
  return { id, at: P(u, v), size, rot: R + (alongV ? Math.PI / 2 : 0), color, ...extra };
}

/** Muro reto do eixo do Templo, com vãos de portas. */
function muro(id: string, a: [number, number], b: [number, number], h: number, gaps: number[], gap = 9, base = 0): Block[] {
  const alongV = a[0] === b[0];
  const from = alongV ? Math.min(a[1], b[1]) : Math.min(a[0], b[0]);
  const to = alongV ? Math.max(a[1], b[1]) : Math.max(a[0], b[0]);
  const cuts = [from, ...gaps.flatMap((g) => [g - gap / 2, g + gap / 2]), to];
  const out: Block[] = [];
  for (let i = 0; i < cuts.length; i += 2) {
    const s0 = cuts[i];
    const s1 = cuts[i + 1];
    if (s1 - s0 < 0.5) continue;
    const mid = (s0 + s1) / 2;
    const u = alongV ? a[0] : mid;
    const v = alongV ? mid : a[1];
    out.push(tb(`${id}-${i}`, u, v, [s1 - s0, h, 3], pedra, { solid: true, lift: base }, alongV));
  }
  return out;
}

/* Medidas da Mishná (Middot 5:1; 2:5), em metros: pátio interno 187 × 135 côvados, Pátio das Mulheres 135 × 135. */
const AZ = { u0: -32, u1: 66, v: 35.4 };
const MU = { u0: 66, u1: 137 };

const templo: Block[] = [
  // terraço (hel) dentro do soreg, 12 a 14 degraus acima do Pátio dos Gentios
  tb("terraco", 52, 0, [190, 3, 92], "#e4dac4", { walkable: true }),
  tb("piso-mulheres", 101.5, 0, [71, 5, 70.8], "#e8dfca", { walkable: true }),
  tb("piso-azara", 17, 0, [98, 7, 70.8], "#ebe3cf", { walkable: true }),
  tb("piso-santuario", 0, 0, [64, 10, 56], "#efe8d8", { walkable: true }),
  // muros do Pátio das Mulheres e do pátio interno, com portas
  ...muro("mu-leste", [MU.u1, -35.4], [MU.u1, 35.4], 17, [0], 11),
  ...muro("mu-norte", [MU.u0, -35.4], [MU.u1, -35.4], 17, [101.5]),
  ...muro("mu-sul", [MU.u0, 35.4], [MU.u1, 35.4], 17, [101.5]),
  ...muro("az-leste", [AZ.u1, -35.4], [AZ.u1, 35.4], 20, [0], 11),
  ...muro("az-norte", [AZ.u0, -35.4], [AZ.u1, -35.4], 20, [5, 40]),
  ...muro("az-sul", [AZ.u0, 35.4], [AZ.u1, 35.4], 20, [5, 40]),
  ...muro("az-oeste", [AZ.u0, -35.4], [AZ.u0, 35.4], 20, []),
  // portas monumentais
  tb("porta-nicanor", AZ.u1, 0, [18, 26, 7], "#e2c58e", { kind: "gate", opening: 7 }, true),
  tb("porta-formosa", MU.u1, 0, [18, 22, 7], "#d9c08a", { kind: "gate", opening: 7 }, true),
  tb("porta-norte-mulheres", 101.5, -35.4, [14, 20, 6], pedra, { kind: "gate", opening: 6 }),
  tb("porta-sul-mulheres", 101.5, 35.4, [14, 20, 6], pedra, { kind: "gate", opening: 6 }),
  // altar dos holocaustos (32 côvados de base) e rampa ao sul; pia de bronze
  tb("altar", 46.2, 0, [16.8, 5.2, 16.8], "#bdb4a2", { solid: true, lift: 7 }),
  tb("rampa", 46.2, 16.8, [8.4, 2.6, 16.8], "#b6ad9b", { solid: true, lift: 7 }),
  tb("pia", 33, 9, [3, 2.5, 3], "#b08d57", { lift: 7 }),
  // divisa entre o Pátio de Israel e o dos Sacerdotes
  tb("balaustrada", 60.4, 0, [0.8, 1, 70], "#e9e0cc", { lift: 7 }),
  // santuário: pórtico de 100 côvados de largura e altura; corpo de 70 côvados
  tb("santuario-corpo", -5.6, 0, [41.2, 42, 36.8], marmore, { solid: true, roof: "#e6d6a6", lift: 10 }),
  tb("santuario-portico", 20.6, 0, [11.3, 52.5, 52.5], marmore, { solid: true, roof: "#e6d6a6", lift: 10 }),
  // a abertura do pórtico, sem portas, de 70 × 25 côvados (Josefo, Guerra 5.208)
  tb("portal-santuario", 26.8, 0, [0.5, 36.7, 13.1], "#2a1d10", { lift: 10 }),
  tb("cornija", -5.6, 0, [42, 1.6, 37.6], ouro, { lift: 51 }),
  tb("cornija-portico", 20.6, 0, [12, 1.6, 53.2], ouro, { lift: 61.5 }),
  tb("portico-ouro", 26.6, 0, [0.4, 30, 26], "#cfa94f", { lift: 10 }),
];

/* Pórticos em volta do Pátio dos Gentios. */
const porticos: Block[] = [
  tb("portico-real", 48, 190, [264, 30, 33], "#e9dfc9", { kind: "colonnade", roof: "#8a6b46", columns: { rows: 4, spacing: 6.5, radius: 0.85, back: 1 } }),
  tb("portico-salomao", 175, -44, [430, 14, 15], "#e2d7bf", { kind: "colonnade", roof: "#7d6040", columns: { rows: 2, spacing: 5, back: 1 } }, true),
  tb("portico-oeste", -79, -44, [430, 14, 15], "#e2d7bf", { kind: "colonnade", roof: "#7d6040", columns: { rows: 2, spacing: 5, back: -1 } }, true),
  tb("portico-norte", 48, -256, [240, 14, 15], "#e2d7bf", { kind: "colonnade", roof: "#7d6040", columns: { rows: 2, spacing: 5, back: -1 } }),
];

/* Portas, escadarias e arcos em volta da esplanada (alturas calculadas a partir do relevo). */
function ateNivel(at: XZ, extra = 0) {
  return Math.max(4, NIVEL - (natural(at[0], at[1]) - 600) + extra);
}
const robinson = P(-98, 192);
const wilsonAt: XZ = [-55, -305];
const entorno: Block[] = [
  tb("porta-dupla", -15, 211, [16, 9, 6], pedra, { kind: "gate", opening: 5 }),
  tb("porta-tripla", 105, 211, [20, 9, 6], pedra, { kind: "gate", opening: 5 }),
  tb("escadaria-sul", 10, 226, [66, 3, 22], "#d1c5aa", { walkable: true }),
  { id: "arco-robinson", at: robinson, size: [15, ateNivel(robinson), 15], rot: R, color: pedra, kind: "gate", opening: 13 },
  ...[0, 1, 2, 3, 4, 5].map((k): Block => {
    const at = P(-104, 206 + k * 8);
    return { id: `escada-robinson-${k}`, at, size: [10, Math.max(2, ateNivel(at) * (1 - (k + 1) / 7)), 8], rot: R, color: "#d6caae", walkable: true };
  }),
  { id: "ponte-wilson", at: wilsonAt, size: [190, ateNivel(wilsonAt), 14], rot: 0, color: "#d6c9ab", walkable: true },
  tb("porta-oriental", 181, 0, [8, 14, 18], pedra, { kind: "gate", opening: 6 }, true),
];

/* Fortaleza Antônia: corpo e quatro torres (a do sudeste com 70 côvados). */
const antonia: Block[] = [
  { id: "antonia", at: [40, -748], size: [112, 22, 50], color: "#d2c3a3", solid: true, roof: "#9b8564" },
  { id: "antonia-se", at: [90, -728], size: [15, 37, 15], color: "#cdbd9c", solid: true },
  { id: "antonia-sw", at: [-10, -728], size: [13, 26, 13], color: "#cdbd9c", solid: true },
  { id: "antonia-ne", at: [90, -768], size: [13, 26, 13], color: "#cdbd9c", solid: true },
  { id: "antonia-nw", at: [-10, -768], size: [13, 26, 13], color: "#cdbd9c", solid: true },
];

/* Palácio de Herodes na Cidade Alta, com as três torres. */
const palacio: Block[] = [
  { id: "palacio-norte", at: [-545, -185], size: [105, 18, 62], color: "#e6ddca", roof: "#7a5a3a", solid: true },
  { id: "palacio-sul", at: [-545, -5], size: [105, 18, 62], color: "#e6ddca", roof: "#7a5a3a", solid: true },
  { id: "hipico", at: [-612, -284], size: [13, 42, 13], color: "#d9cdb2", solid: true },
  { id: "fasael", at: [-574, -286], size: [21, 47, 21], color: "#d9cdb2", solid: true },
  { id: "mariamne", at: [-540, -282], size: [11, 29, 11], color: "#d9cdb2", solid: true },
  { id: "palacio-hasmoneu", at: [-170, -250], size: [50, 16, 38], color: "#e0d5bd", roof: "#7a5a3a", solid: true },
  { id: "casa-caifas", at: [-180, 300], size: [30, 9, 24], color: "#ddd2ba", roof: "#7a5a3a", solid: true },
  { id: "mansoes", at: [-185, -145], size: [34, 9, 26], color: "#ddd2ba", roof: "#7a5a3a", solid: true },
];

/* Tanques, túmulos e rochas. */
const fora: Block[] = [
  { id: "siloe-degraus", at: [110, 380], size: [66, 0.4, 34], color: "#d1c5aa" },
  { id: "siloe", at: [110, 380], size: [56, 0.7, 24], color: "#4f8fa8" },
  { id: "betesda-norte", at: [150, -866], size: [52, 0.7, 44], color: "#4f8fa8" },
  { id: "betesda-sul", at: [150, -810], size: [52, 0.7, 58], color: "#4f8fa8" },
  { id: "betesda-p-norte", at: [150, -892], size: [62, 8, 5], color: "#e2d7bf", kind: "colonnade", roof: "#7d6040", columns: { rows: 1, spacing: 4.2, radius: 0.45 } },
  { id: "betesda-p-sul", at: [150, -777], size: [62, 8, 5], color: "#e2d7bf", kind: "colonnade", roof: "#7d6040", columns: { rows: 1, spacing: 4.2, radius: 0.45 } },
  { id: "betesda-p-meio", at: [150, -840], size: [62, 8, 5], color: "#e2d7bf", kind: "colonnade", roof: "#7d6040", columns: { rows: 1, spacing: 4.2, radius: 0.45 } },
  { id: "betesda-p-oeste", at: [121, -835], size: [120, 8, 5], rot: Math.PI / 2, color: "#e2d7bf", kind: "colonnade", roof: "#7d6040", columns: { rows: 1, spacing: 4.2, radius: 0.45 } },
  { id: "betesda-p-leste", at: [179, -835], size: [120, 8, 5], rot: Math.PI / 2, color: "#e2d7bf", kind: "colonnade", roof: "#7d6040", columns: { rows: 1, spacing: 4.2, radius: 0.45 } },
  { id: "calvario", at: [-397, -488], size: [12, 7, 10], color: "#b9aa8a", solid: true },
  { id: "tumulo-rocha", at: [-437, -490], size: [20, 6, 14], color: "#b3a385", solid: true },
  { id: "tumulo-porta", at: [-426.8, -490], size: [0.5, 1.6, 1.1], color: "#1f160d" },
  { id: "tumulo-jardim", at: [-369, -1110], size: [20, 8, 9], color: "#b3a385", solid: true },
  { id: "absalao", at: [430, -330], size: [7, 20, 7], color: "#cbbd9c", solid: true },
];

const muros: WallDef[] = [
  {
    label: "Primeiro Muro (norte), de Hípico ao Xisto e ao Templo",
    ring: [[-612, -284], [-480, -288], [-380, -290], [-200, -296], [-150, -300]],
    height: 12,
    thick: 5,
    color: "#d8caa6",
    towerEvery: 55,
  },
  {
    label: "Primeiro Muro (oeste e sul), em volta da Cidade Alta e da Cidade Baixa",
    ring: [[-612, -284], [-645, -100], [-628, 150], [-560, 330], [-430, 470], [-200, 560], [40, 520], [150, 432], [235, 300], [255, 100], [272, -100], [300, -215], [317, -252]],
    height: 12,
    thick: 5,
    color: "#d8caa6",
    towerEvery: 60,
  },
  {
    label: "Segundo Muro (traçado debatido), da porta de Genat à Antônia",
    ring: [[-380, -290], [-330, -420], [-300, -560], [-160, -650], [-12, -700], [-12, -728]],
    height: 11,
    thick: 4.5,
    color: "#d3c4a0",
    towerEvery: 50,
  },
  { label: "Muro do palácio de Herodes", ring: rect(-615, -262, -470, 40), closed: true, height: 14, thick: 3, color: "#ddd0b1", towerEvery: 40 },
  {
    label: "Soreg, a balaustrada que os gentios não podiam passar",
    ring: [P(-44, -48), P(147, -48), P(147, 48), P(-44, 48)],
    closed: true,
    height: 1.4,
    thick: 0.6,
    color: "#f1ead9",
  },
];

const ALTA: XZ[] = [[-605, -270], [-175, -275], [-150, -100], [-120, 150], [-150, 380], [-220, 520], [-420, 455], [-545, 320], [-605, 150], [-628, -100]];
const BAIXA: XZ[] = [[-100, -220], [40, -226], [100, -228], [290, -236], [255, 100], [230, 300], [150, 410], [40, 495], [-60, 260], [-100, 0]];
const SEGUNDO: XZ[] = [[-365, -300], [-320, -420], [-292, -556], [-160, -640], [-20, -690], [-10, -640], [20, -320], [-150, -305]];
const BEZETA: XZ[] = [[60, -1000], [420, -1000], [420, -760], [300, -735], [60, -740]];

const hotspots: CityHotspot[] = [
  {
    id: "santuario",
    name: "Santuário (o Lugar Santo)",
    at: P(4, 0),
    y: 64,
    text: "O edifício do Templo propriamente dito, refeito por sacerdotes treinados como pedreiros em ano e meio (20–18 a.C.). A fachada tinha 100 côvados de largura e de altura (c. 52 m), de pedra branca e ouro; Josefo diz que de longe parecia um monte de neve. Dentro, o Lugar Santo com o candelabro de sete braços, a mesa dos pães e o altar do incenso, onde Zacarias recebeu o anúncio.",
    refs: "Lc 1:8–22; Jo 2:19–21; Josefo, Guerra 5.207–224",
    note: "Dimensões e aparência seguem Josefo e a Mishná; nenhuma pedra do santuário foi identificada.",
  },
  {
    id: "santo-dos-santos",
    name: "Santo dos Santos",
    at: P(-18, 0),
    y: 54,
    text: "A sala do fundo, de 20 × 20 côvados, vazia desde que a arca desapareceu em 586 a.C. Só o sumo sacerdote entrava, uma vez por ano, no Dia da Expiação. Duas cortinas a separavam do Lugar Santo: é o véu que se rasga de alto a baixo na morte de Jesus.",
    refs: "Mt 27:51; Mc 15:38; Hb 9:3–12; Mishná, Yoma 5:1",
  },
  {
    id: "altar",
    name: "Altar dos holocaustos",
    at: P(46.2, 0),
    y: 14,
    text: "De pedras não lavradas, com 32 côvados de lado na base (c. 17 m), subido por uma rampa ao sul. Ali se queimavam os sacrifícios diários e, na Páscoa, o sangue dos cordeiros era derramado na base. A pia de bronze ficava entre o altar e o pórtico.",
    refs: "Mt 5:23–24; 23:35; Mishná, Middot 3:1–4",
  },
  {
    id: "patio-sacerdotes",
    name: "Pátio de Israel e dos Sacerdotes",
    at: P(10, -24),
    y: 10,
    text: "O pátio interno (azará), de 187 × 135 côvados. Uma faixa estreita a leste era o Pátio de Israel, para os homens israelitas; o resto, com o altar e o lugar do abate, era dos sacerdotes. Na Páscoa, os chefes de família traziam ali os seus cordeiros, em três turnos.",
    refs: "Lc 1:10; 2:27; Mishná, Middot 2:6; 5:1; Pesahim 5:5–7",
  },
  {
    id: "porta-nicanor",
    name: "Porta de Nicanor",
    at: P(66, 0),
    y: 28,
    text: "Porta de bronze de Corinto, doada por um alexandrino chamado Nicanor, no alto de quinze degraus semicirculares entre o Pátio das Mulheres e o pátio interno. Ali os levitas cantavam os quinze Salmos de Subida, e ali se faziam a purificação das mães e a apresentação dos primogênitos, como a de Jesus.",
    refs: "Lc 2:22–24; Sl 120–134; Mishná, Middot 2:3–6",
    note: "Um ossuário achado no monte Scopus em 1902 traz a inscrição “ossos dos filhos de Nicanor, o alexandrino, que fez as portas”.",
  },
  {
    id: "patio-mulheres",
    name: "Pátio das Mulheres",
    at: P(101.5, 0),
    y: 8,
    text: "Aberto a homens e mulheres israelitas, de 135 côvados de lado, com uma sala em cada canto. Junto às colunatas ficavam as treze caixas de ofertas em forma de trombeta: é o “tesouro” onde Jesus viu a viúva pobre e onde ensinou: “Eu sou a luz do mundo.” Na festa dos Tabernáculos, grandes candelabros iluminavam o pátio.",
    refs: "Mc 12:41–44; Jo 8:12, 20; Mishná, Sukkah 5:2–4",
  },
  {
    id: "porta-formosa",
    name: "Porta Formosa",
    at: P(137, 0),
    y: 24,
    text: "A entrada oriental do Pátio das Mulheres, provavelmente a porta “Formosa” de Atos, onde Pedro e João curaram o coxo. Josefo descreve uma porta de bronze coríntio, mais rica que as cobertas de ouro.",
    refs: "At 3:1–10; Josefo, Guerra 5.201",
    note: "A identificação da Porta Formosa é discutida.",
  },
  {
    id: "soreg",
    name: "O soreg e a inscrição de advertência",
    at: P(150, 40),
    y: 3,
    text: "Uma balaustrada baixa de pedra cercava a área sagrada. Placas em grego e latim proibiam a passagem dos gentios sob pena de morte. Paulo foi acusado de ter levado um gentio além dela; Efésios fala do “muro de separação” derrubado.",
    refs: "At 21:28–29; Ef 2:14; Josefo, Guerra 5.193–194",
    note: "Uma das placas, completa, foi achada em 1871 e está em Istambul; um fragmento de outra está em Jerusalém.",
  },
  {
    id: "patio-gentios",
    name: "Pátio dos Gentios",
    at: P(60, 120),
    y: 4,
    text: "A grande esplanada aberta a todos, judeus e estrangeiros: c. 14 hectares, duas vezes a área do monte do tempo de Salomão. Era aqui o movimento de peregrinos, mestres, vendedores e cambistas. Herodes ampliou o monte para o sul, o norte e o oeste com muros de arrimo e abóbadas.",
    refs: "Mc 11:15–17; Is 56:7; Josefo, Antiguidades 15.391–402",
  },
  {
    id: "portico-salomao",
    name: "Pórtico de Salomão",
    at: P(175, -60),
    y: 16,
    text: "A colunata dupla ao longo do muro leste, que a tradição ligava a Salomão. Jesus andava ali na festa da Dedicação, e ali se reunia a primeira igreja de Jerusalém.",
    refs: "Jo 10:22–23; At 3:11; 5:12; Josefo, Antiguidades 20.220–221",
  },
  {
    id: "portico-real",
    name: "Pórtico Real",
    at: P(48, 190),
    y: 32,
    text: "Uma basílica de três naves ao longo de todo o lado sul, com 162 colunas em quatro fileiras; a nave central era mais alta. Josefo diz que quem olhava do teto para o vale do Cedrom ficava tonto. Era provavelmente o lugar do comércio de animais e do câmbio que Jesus expulsou.",
    refs: "Mc 11:15–17; Jo 2:13–16; Josefo, Antiguidades 15.411–416",
  },
  {
    id: "pinaculo",
    name: "O pináculo (canto sudeste)",
    at: [317, -252],
    y: 34,
    text: "O canto do monte acima do Cedrom, onde o muro chegava a uns 40 m sobre o fundo do vale: um dos lugares propostos para o “pináculo do Templo” da tentação. A tradição posterior conta que Tiago, irmão de Jesus, foi jogado do pináculo.",
    refs: "Mt 4:5–7; Lc 4:9–12; Eusébio, História Eclesiástica 2.23",
    note: "O texto não diz qual canto era; a escolha do sudeste é uma hipótese comum.",
  },
  {
    id: "escadarias-sul",
    name: "Escadarias do sul e Portas de Hulda",
    at: P(10, 230),
    y: 4,
    text: "A entrada principal dos peregrinos: uma escadaria larga sobe até as portas Dupla e Tripla, de onde túneis em rampa levavam à esplanada. Ao pé, dezenas de banhos rituais (miqvaot) para a purificação antes de subir.",
    refs: "Sl 122:1–2; At 2:41 (lugar proposto para os batismos de Pentecostes)",
    note: "Escavadas por Benjamin Mazar e Meir Ben-Dov a partir de 1968; os degraus e os banhos estão à vista.",
  },
  {
    id: "arco-robinson",
    name: "Arco de Robinson",
    at: robinson,
    y: 4,
    text: "Um arco de c. 15 m sustentava a escadaria monumental que subia da rua do Tiropeão até o Pórtico Real. Na rua, ao pé do muro, havia lojas; ali caiu, em 70 d.C., a pedra com a inscrição “ao lugar do toque da trombeta”, de onde um sacerdote anunciava o sábado.",
    refs: "Josefo, Guerra 4.582; Antiguidades 15.410",
    note: "O início do arco, que Edward Robinson identificou em 1838, ainda sai do Muro Ocidental.",
  },
  {
    id: "xisto",
    name: "Ponte, Xisto e Arco de Wilson",
    at: wilsonAt,
    y: 4,
    text: "Uma ponte sobre o vale ligava a Cidade Alta ao Templo, chegando a uma praça com colunatas, o Xisto, onde se reuniam assembleias. Perto ficava a sala do Conselho. Em 66 d.C., o rei Agripa II discursou ao povo no Xisto.",
    refs: "Josefo, Guerra 2.344; 5.144; 6.325",
    note: "O Arco de Wilson, junto à praça do Muro Ocidental, é o arco que sustentava essa passagem.",
  },
  {
    id: "antonia",
    name: "Fortaleza Antônia",
    at: [40, -748],
    y: 40,
    text: "Construída por Herodes e chamada em honra de Marco Antônio, sobre uma rocha no canto noroeste. Uma coorte romana ficava ali nas festas e descia por escadas aos pórticos para conter tumultos: foi assim que o tribuno salvou Paulo, que falou ao povo do alto da escada.",
    refs: "At 21:30–40; 22:24; Josefo, Guerra 5.238–247",
    note: "Para a tradição medieval, o pretório de Pilatos ficava aqui; hoje a maioria prefere o palácio de Herodes. O tamanho real da Antônia é discutido.",
  },
  {
    id: "betesda",
    name: "Tanque de Betesda",
    at: [150, -835],
    y: 9,
    text: "Dois tanques com cinco pórticos (quatro em volta e um no meio, como diz João), ao norte do Templo, perto da Porta das Ovelhas. Ali Jesus curou o paralítico que esperava havia 38 anos.",
    refs: "Jo 5:1–15",
    note: "Escavados junto à igreja de Santa Ana desde o século 19: dois reservatórios grandes, separados por um dique. A posição exata das colunatas é reconstruída.",
  },
  {
    id: "palacio-herodes",
    name: "Palácio de Herodes (o pretório)",
    at: [-545, -95],
    y: 22,
    text: "Dois grandes edifícios, com salões, jardins, canais e pórticos, cercados por um muro com torres. Quando o governador subia a Jerusalém, ficava aqui: para a maioria dos estudiosos é o pretório onde Pilatos julgou Jesus, sentado no tribunal do lugar chamado Litóstrotos, Gabatá.",
    refs: "Mc 15:16; Jo 18:28; 19:13; Fílon, Legação 299; Josefo, Guerra 2.301; 5.176–183",
    note: "Restos dos muros e do pódio sob a Cidadela e o jardim armênio; a planta interna é reconstrução.",
  },
  {
    id: "torres",
    name: "Torres Hípico, Fasael e Mariamne",
    at: [-574, -286],
    y: 50,
    text: "Herodes deu às três torres os nomes do amigo Hípico, do irmão Fasael e da esposa Mariamne, que ele mesmo mandou matar. Tito as deixou de pé em 70 d.C. para mostrar à posteridade a força da cidade que ele tinha vencido.",
    refs: "Josefo, Guerra 5.161–175; 7.1–2",
    note: "A base da torre de Fasael (ou de Hípico, conforme o autor) é a da atual “Torre de Davi”.",
  },
  {
    id: "palacio-hasmoneu",
    name: "Palácio dos hasmoneus",
    at: [-170, -250],
    y: 18,
    text: "O antigo palácio da dinastia macabeia, acima do Xisto, de onde se via o interior do Templo. Herodes Antipas, que subia para as festas, provavelmente se hospedava aqui: Lucas conta que Pilatos lhe enviou Jesus.",
    refs: "Lc 23:6–12; Josefo, Antiguidades 20.189–190",
    note: "A localização exata não foi encontrada.",
  },
  {
    id: "cidade-alta",
    name: "Cidade Alta e as mansões dos sacerdotes",
    at: [-185, -145],
    y: 11,
    text: "O bairro rico, no monte ocidental, de frente para o Templo. No Bairro Judeu, Nahman Avigad escavou casas de dois andares com banhos rituais, afrescos, mosaicos e vasos de pedra, e a “Casa Queimada”, destruída pelo fogo em 70 d.C., com um peso de pedra com o nome da família sacerdotal Kathros.",
    refs: "Mc 14:53–54; Jo 18:15; Josefo, Guerra 6.403–408",
  },
  {
    id: "caifas",
    name: "Casa de Caifás",
    at: [-180, 300],
    y: 11,
    text: "O sumo sacerdote morava na Cidade Alta, com um pátio onde os servos acenderam um fogo de brasas e Pedro negou Jesus. A tradição a localiza no Monte Sião (Igreja do Galo, Gallicantu) ou perto da igreja armênia do Santo Salvador.",
    refs: "Mt 26:57–75; Jo 18:13–27",
    note: "Local debatido. A casa da maquete é ilustrativa.",
  },
  {
    id: "cenaculo",
    name: "Cenáculo (monte Sião)",
    at: [-454, 244],
    y: 8,
    text: "A tradição de uma “igreja dos apóstolos” no monte Sião é do século 4; a sala gótica atual é dos franciscanos (séc. 14). Os Evangelhos falam de um “grande cenáculo mobiliado” na cidade, sem dizer onde.",
    refs: "Mc 14:12–16; Lc 22:7–13; At 1:13; 2:1",
    note: "Local debatido.",
  },
  {
    id: "cidade-baixa",
    name: "Cidade Baixa e a rua do Tiropeão",
    at: [70, 100],
    y: 8,
    text: "Casas mais simples, oficinas e mercados no vale e na antiga Cidade de Davi. Uma rua escalonada, de pedras grandes, subia de Siloé até o Templo: o caminho dos peregrinos, escavado de 2004 em diante.",
    refs: "Jo 9:7; Josefo, Guerra 5.137–141",
  },
  {
    id: "siloe",
    name: "Tanque de Siloé",
    at: [110, 380],
    y: 3,
    text: "Um tanque grande com degraus de pedra, alimentado pela água de Giom através do túnel de Ezequias. Jesus mandou o cego de nascença lavar-se ali. Na festa dos Tabernáculos, o sacerdote tirava água de Siloé para o altar: “Se alguém tem sede, venha a mim e beba.”",
    refs: "Jo 9:7–11; 7:37–38; Lc 13:4; Mishná, Sukkah 4:9",
    note: "Achado por acaso em 2004 por Eli Shukron e Ronny Reich, durante obras de esgoto.",
  },
  {
    id: "genat",
    name: "Porta de Genat e o Segundo Muro",
    at: [-380, -290],
    y: 14,
    text: "Josefo diz que o Segundo Muro começava numa porta do Primeiro Muro chamada Genat (“dos jardins”) e cercava o bairro norte até a Antônia. O Gólgota e o túmulo ficavam fora dele, “perto da cidade”.",
    refs: "Jo 19:20, 41; Hb 13:12; Josefo, Guerra 5.146",
    note: "O traçado exato do Segundo Muro é um dos debates mais antigos da arqueologia de Jerusalém.",
  },
  {
    id: "golgota",
    name: "Gólgota e o túmulo",
    at: [-410, -489],
    y: 10,
    text: "Uma pedreira abandonada fora do muro, com um afloramento de rocha ruim deixado de lado e túmulos cavados na parede: o lugar da Caveira e o túmulo novo de José de Arimateia, num jardim. A Igreja do Santo Sepulcro guarda os dois sob o mesmo teto desde Constantino (326–335).",
    refs: "Mt 27:33, 57–60; Jo 19:17–20, 41–42",
    note: "Identificação provável: a comunidade cristã lembrava o lugar, que Adriano cobriu com um templo. A Terceira Muralha, que o incluiu na cidade, só foi construída por Agripa I (41–44 d.C.).",
  },
  {
    id: "tumulo-jardim",
    name: "Túmulo do Jardim",
    at: [-369, -1110],
    y: 10,
    text: "Proposto no século 19 por estar fora do muro atual e ao lado de um penhasco que lembra uma caveira. É um lugar de oração cuidado por uma associação britânica.",
    refs: "Jo 19:41",
    note: "O túmulo é da Idade do Ferro (séculos 8–7 a.C.), segundo Gabriel Barkay; não era “novo” no século 1.",
  },
  {
    id: "cedrom",
    name: "Vale do Cedrom e os túmulos",
    at: [430, -330],
    y: 22,
    text: "Jesus atravessou o “ribeiro do Cedrom” na noite da prisão. Na encosta do outro lado estão túmulos monumentais do período, como o “Pilar de Absalão”, do século 1: os “sepulcros dos profetas” que os fariseus enfeitavam.",
    refs: "Jo 18:1; Mt 23:29; 2 Sm 15:23",
  },
  {
    id: "getsemani",
    name: "Getsêmani",
    at: [511, -599],
    y: 6,
    text: "Um olival com uma prensa de azeite (“gat shemanim”) ao pé do Monte das Oliveiras, onde Jesus orava com os discípulos e foi preso.",
    refs: "Mt 26:36–56; Lc 22:39–53; Jo 18:1–12",
    note: "A Igreja de Todas as Nações (1924) fica sobre uma basílica do século 4; a gruta vizinha também é lembrada.",
  },
  {
    id: "oliveiras",
    name: "Monte das Oliveiras",
    at: [1100, -433],
    y: 6,
    text: "Uns 70 m acima do Templo, do outro lado do vale. Daqui se via todo o santuário: Jesus chorou sobre a cidade, ensinou sobre o fim do Templo e, segundo Atos, subiu ao céu. O caminho para Betânia e Jericó passava por aqui.",
    refs: "Lc 19:37–44; Mc 13:3; At 1:9–12; Zc 14:4",
  },
];

export const jerusalemHerodes: CityDef = {
  slug: "jerusalem-herodes",
  name: "Jerusalém de Herodes",
  title: "Jerusalém de Herodes e o Segundo Templo",
  kicker: "Maquete 3D · c. 30 d.C.",
  date: "c. 30 d.C.",
  lede:
    "A cidade que Jesus conheceu, no auge do esplendor herodiano: o Templo reconstruído no meio da maior esplanada do mundo antigo, com seus pátios, pórticos e portas; a Antônia vigiando do canto; o palácio de Herodes e suas torres na Cidade Alta; a Cidade Baixa descendo até Siloé; o Gólgota fora do muro e o Getsêmani do outro lado do Cedrom.",
  description:
    "Jerusalém c. 30 d.C. em 3D: o Segundo Templo com o Pátio dos Gentios, o soreg, os pátios das Mulheres, de Israel e dos Sacerdotes, o santuário, o Pórtico Real, a Antônia, o palácio de Herodes e suas torres, Siloé, Betesda, o Gólgota e o Getsêmani.",
  poster: "/historia/maquetes/jerusalem-herodes.webp",
  posterAlt:
    "Vista aérea da maquete da Jerusalém de Herodes: a grande esplanada do Templo com o santuário branco e dourado no centro, pórticos em volta, a cidade de casas de pedra e o Monte das Oliveiras ao fundo.",
  terrain: { minX: -950, maxX: 1350, minZ: -1250, maxZ: 800, seg: 280 },
  elevation,
  ground: { low: "#8d8559", mid: "#b5a77d", high: "#cbbd97", rock: "#bfae8a", highAt: 215 },
  waterLevel: -100,
  waters: [],
  roads: [
    { label: "Rua do Tiropeão e caminho de Siloé ao Templo", path: [[110, 362], [80, 200], [52, 0], [36, -215], [22, -450], [-5, -705], [-70, -950]], width: 8, color: "#d2c6aa" },
    { label: "Saída da porta de Genat para o norte", path: [[-380, -296], [-392, -420], [-405, -560], [-425, -820], [-400, -1100]], width: 5, color: "#cbbd9c" },
    { label: "Do Xisto ao palácio", path: [[-150, -300], [-300, -275], [-470, -268]], width: 5, color: "#cbbd9c" },
    { label: "Da porta oriental ao Getsêmani e ao Monte das Oliveiras", path: [[302, -458], [400, -500], [470, -560], [511, -590], [700, -560], [900, -480], [1100, -440], [1300, -420]], width: 4, color: "#cbbd9c" },
  ],
  walls: muros,
  blocks: [...templo, ...porticos, ...entorno, ...antonia, ...palacio, ...fora],
  platforms: [{ label: "Esplanada do Templo", ring: ESPLANADA, level: NIVEL, color: "#d8cba9", top: "#ddd2ba" }],
  zones: [
    { ring: ALTA, count: 300, size: [12, 20], height: [6, 10], colors: ["#e2d8c2", "#cdbf9f"], seed: 301 },
    { ring: BAIXA, count: 620, size: [7, 12], height: [4, 7], colors: ["#cdbd99", "#ab9a78"], seed: 302 },
    { ring: SEGUNDO, count: 330, size: [7, 12], height: [4, 7], colors: ["#d2c3a0", "#b09f7d"], seed: 303 },
    { ring: BEZETA, count: 60, size: [7, 11], height: [3.5, 6], colors: ["#cdbd99", "#ab9a78"], seed: 304 },
  ],
  trees: [
    { kind: "oliveira", count: 1100, area: [380, 1350, -1250, 400], seed: 41 },
    { kind: "oliveira", count: 70, area: [470, 560, -650, -555], seed: 42 },
    { kind: "oliveira", count: 260, area: [-950, -660, -1250, 800], seed: 43 },
    { kind: "oliveira", count: 30, area: [-450, -380, -520, -460], seed: 44, avoid: [rect(-447, -497, -387, -483)] },
    { kind: "palmeira", count: 26, area: [-600, -490, -150, -40], seed: 45 },
    { kind: "oliveira", count: 120, area: [-600, -300, -1250, -600], seed: 46 },
  ],
  hotspots,
  orbit: { position: [-48, 64, 22], target: [12, 14, -45], maxDistance: 260 },
  views: [
    { label: "Templo", position: [31, 23, -37], target: [11, 15, -44.6] },
    { label: "Do Monte das Oliveiras", position: [58, 33, -50], target: [8, 14, -42] },
    { label: "Gólgota e palácio", position: [-26, 30, -70], target: [-48, 17, -32] },
  ],
  walk: { start: [86, -324], yaw: -0.26 },
  sky: { background: "#dfe2e2", fog: "#dfe2e2", sun: [60, 55, 35], fogOrbit: [170, 460], fogWalk: [60, 280] },
  plan: {
    view: { minX: -800, maxX: 1250, minZ: -1200, maxZ: 650 },
    contours: { from: 20, to: 230, step: 10, major: 50 },
    labels: [
      { text: "Vale do Cedrom", at: [400, 0], rot: -78, size: 55 },
      { text: "Tiropeão", at: [-60, 40], rot: -75, size: 45 },
      { text: "Vale do Hinom", at: [-560, 470], rot: 40, size: 50 },
      { text: "Cidade Alta", at: [-420, 120], size: 60 },
      { text: "Cidade Baixa", at: [60, 200], rot: -75, size: 45 },
      { text: "Bezeta", at: [250, -980], size: 50 },
      { text: "Monte das Oliveiras", at: [920, -620], size: 60 },
    ],
    scale: 200,
  },
  facts: {
    certo:
      "Os muros de arrimo da esplanada (o Muro Ocidental e os outros três), os arcos de Robinson e de Wilson, as escadarias e portas do sul, a rua do Tiropeão, os tanques de Siloé e de Betesda, as mansões da Cidade Alta, a base de uma das torres de Herodes e a pedreira com túmulos sob o Santo Sepulcro foram escavados.",
    texto:
      "Josefo (Antiguidades 15; Guerra 5) descreve a cidade e o Templo pouco antes da destruição de 70 d.C.; a Mishná (tratado Middot) dá as medidas dos pátios; os Evangelhos e Atos citam o pórtico de Salomão, o tesouro, a Porta Formosa, a Antônia, o pretório, Betesda, Siloé e o Gólgota.",
    aproximado:
      "O santuário e os pátios internos (nada sobrou acima da esplanada), a Antônia, a planta do palácio, o traçado do Segundo Muro, a casa de Caifás, as casas e ruas. O relevo é um modelo simplificado. A Terceira Muralha, ao norte, não aparece: foi começada por Agripa I depois de 41 d.C.",
  },
  sources: [
    "Flávio Josefo, Antiguidades Judaicas 15.380–425; Guerra Judaica 5.136–247",
    "Mishná, tratado Middot",
    "L. Ritmeyer, The Quest: Revealing the Temple Mount in Jerusalem (2006)",
    "E. Netzer, The Architecture of Herod, the Great Builder (2006)",
    "B. Mazar, The Mountain of the Lord (1975); N. Avigad, Discovering Jerusalem (1983)",
    "R. Reich e E. Shukron, escavações de Siloé e da rua escalonada (2004 em diante)",
    "S. Gibson e J. Taylor, Beneath the Church of the Holy Sepulchre (1994); G. Barkay, “The Garden Tomb”, BAR 12/2 (1986)",
  ],
};
