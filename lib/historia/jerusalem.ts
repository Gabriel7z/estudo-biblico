/**
 * Dados da maquete de Jerusalém (c. 1000–701 a.C.).
 *
 * Sistema local em metros: x para leste, z para o sul, origem em 31,7740 N / 35,2340 L
 * (perto do vale central, na altura da Cidade de Davi). O relevo é um modelo simplificado:
 * uma superfície que desce para o sul, escavada pelos vales do Cedrom, central (Tiropeão)
 * e de Hinom. Muros, prédios e casas são reconstruções aproximadas a partir do texto
 * bíblico e das escavações; muitos traçados são discutidos.
 */

export type Era = "davi" | "salomao" | "ezequias";

export const eras: { id: Era; label: string; date: string; text: string }[] = [
  {
    id: "davi",
    label: "Davi",
    date: "c. 1000 a.C.",
    text: "A cidade jebusita tomada por Davi: só a crista estreita a sudeste, junto à fonte de Giom. Ao norte, a eira de Araúna, que Davi compra para o altar (2 Sm 24).",
  },
  {
    id: "salomao",
    label: "Salomão",
    date: "c. 950 a.C.",
    text: "Salomão estende a cidade para o norte, pelo Ofel, até o monte do Templo, e constrói o Templo e o complexo do palácio (1 Rs 6–7; 9:15).",
  },
  {
    id: "ezequias",
    label: "Ezequias",
    date: "c. 701 a.C.",
    text: "Depois da queda de Samaria (722), a cidade cresce sobre o monte ocidental, cercado pelo Muro Largo. Ezequias abre o túnel de Giom a Siloé antes do cerco de Senaqueribe (2 Cr 32:2–5, 30).",
  },
];

export type XZ = [number, number];

type Valley = { name: string; pts: [number, number, number][]; slope: number };

/** Vales: pontos [x, z, cota do fundo em m]. */
export const valleys: Valley[] = [
  {
    name: "Cedrom",
    slope: 0.45,
    pts: [
      [470, -1000, 725], [420, -500, 690], [330, -200, 665], [285, 100, 640], [262, 350, 625], [222, 620, 608], [235, 950, 585],
    ],
  },
  {
    name: "Vale central (Tiropeão)",
    slope: 0.33,
    pts: [
      [-330, -1000, 765], [-200, -450, 735], [-60, -100, 700], [-20, 150, 672], [40, 380, 640], [120, 560, 620], [215, 625, 609],
    ],
  },
  {
    name: "Hinom",
    slope: 0.4,
    pts: [
      [-800, -250, 742], [-640, 0, 728], [-560, 300, 702], [-470, 520, 676], [-200, 650, 640], [100, 668, 620], [225, 630, 608],
    ],
  },
];

function base(x: number, z: number): number {
  let h = 752 - 0.11 * (z + 400) + 0.06 * Math.max(0, -x - 100);
  // Monte das Oliveiras, a leste do Cedrom
  h += Math.min(70, 0.32 * Math.max(0, x - 380));
  return h;
}

function segDist(px: number, pz: number, a: [number, number, number], b: [number, number, number]) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const len2 = dx * dx + dz * dz;
  let t = len2 ? ((px - a[0]) * dx + (pz - a[1]) * dz) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = a[0] + t * dx;
  const cz = a[1] + t * dz;
  return { d: Math.hypot(px - cx, pz - cz), floor: a[2] + t * (b[2] - a[2]) };
}

function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

/** Cota aproximada do terreno (m acima do nível do mar) em x, z. */
export function elevation(x: number, z: number): number {
  let h = base(x, z);
  for (const valley of valleys) {
    let best = Infinity;
    for (let i = 0; i < valley.pts.length - 1; i += 1) {
      const { d, floor } = segDist(x, z, valley.pts[i], valley.pts[i + 1]);
      const v = floor + valley.slope * Math.max(0, d - 12);
      if (v < best) best = v;
    }
    h = smin(h, best, 14);
  }
  return h;
}

/** Extensão do terreno, em metros. */
export const TERRAIN = { minX: -900, maxX: 1000, minZ: -1000, maxZ: 950 };

export const walls: Record<Era, { label: string; ring: XZ[] }[]> = {
  davi: [
    {
      label: "Muro da Cidade de Davi",
      ring: [[40, -170], [215, -175], [245, 0], [238, 150], [205, 330], [130, 470], [70, 440], [40, 300], [22, 100], [12, -60]],
    },
  ],
  salomao: [
    {
      label: "Muro de Salomão (Cidade de Davi, Ofel e monte do Templo)",
      ring: [[22, 100], [12, -60], [20, -300], [30, -585], [255, -585], [300, -330], [250, -175], [245, 0], [238, 150], [205, 330], [130, 470], [70, 440], [40, 300]],
    },
  ],
  ezequias: [
    {
      label: "Muro de Salomão e dos reis de Judá",
      ring: [[22, 100], [12, -60], [20, -300], [30, -585], [255, -585], [300, -330], [250, -175], [245, 0], [238, 150], [205, 330], [130, 470], [70, 440], [40, 300]],
    },
    {
      label: "Muro Largo e muro do monte ocidental",
      ring: [[30, -585], [-120, -470], [-250, -265], [-420, -190], [-470, 100], [-390, 370], [-160, 520], [70, 445], [40, 300], [22, 100], [12, -60], [20, -300]],
    },
  ],
};

export type Hotspot = {
  id: string;
  name: string;
  at: XZ;
  eras: Era[];
  text: string;
  refs: string;
  note?: string;
};

export const hotspots: Hotspot[] = [
  {
    id: "giom",
    name: "Fonte de Giom",
    at: [227, 122],
    eras: ["davi", "salomao", "ezequias"],
    text: "A única fonte perene de Jerusalém, ao pé da Cidade de Davi, no vale do Cedrom. Ali Salomão é ungido rei enquanto Adonias festeja (1 Rs 1:33–45). Uma grande torre de pedra do Bronze Médio protegia o acesso à água desde antes de Davi.",
    refs: "1 Rs 1:33–45; 2 Cr 32:30; 33:14",
    note: "Torre e tanque escavados por R. Reich e E. Shukron a partir de 1995.",
  },
  {
    id: "degraus",
    name: "Estrutura de Pedras em Degraus",
    at: [168, -45],
    eras: ["davi", "salomao", "ezequias"],
    text: "Muralha de arrimo de uns 18 m de altura na encosta leste, uma das maiores construções da Idade do Ferro conhecidas no Levante. Sustentava edifícios no alto da crista. Muitos a ligam ao Milo, que Davi e Salomão constroem.",
    refs: "2 Sm 5:9; 1 Rs 9:15, 24; 11:27",
    note: "A data (Ferro I ou século 10 a.C.) e a identificação com o Milo são debatidas.",
  },
  {
    id: "siao",
    name: "Fortaleza de Sião, a Cidade de Davi",
    at: [115, 90],
    eras: ["davi", "salomao", "ezequias"],
    text: "A crista estreita entre o Cedrom e o vale central, com cerca de 4 a 5 hectares. Davi a toma dos jebusitas e a chama Cidade de Davi. Os reis de Judá são sepultados nela.",
    refs: "2 Sm 5:6–9; 1 Rs 2:10; 1 Cr 11:4–8",
  },
  {
    id: "palacio-davi",
    name: "Palácio de Davi",
    at: [140, -110],
    eras: ["davi", "salomao", "ezequias"],
    text: "Hirão de Tiro manda cedro, carpinteiros e pedreiros, e eles constroem uma casa para Davi. Do terraço do palácio Davi vê Bate-Seba (2 Sm 11:2).",
    refs: "2 Sm 5:11; 7:1–2; 11:2",
    note: "Eilat Mazar identificou aqui a “Grande Estrutura de Pedra” (2005). A data e a leitura como palácio de Davi são contestadas.",
  },
  {
    id: "eira",
    name: "Eira de Araúna",
    at: [127, -449],
    eras: ["davi"],
    text: "Eira no alto do monte, ao norte da cidade. Davi a compra do jebusita Araúna por cinquenta siclos de prata e levanta um altar para deter a praga. Crônicas identifica o lugar com o monte Moriá, onde Salomão constrói o Templo.",
    refs: "2 Sm 24:16–25; 1 Cr 21:18–22:1; 2 Cr 3:1",
  },
  {
    id: "templo",
    name: "Templo de Salomão",
    at: [127, -449],
    eras: ["salomao", "ezequias"],
    text: "Casa de 60 × 20 côvados e 30 de altura (cerca de 31 × 10 × 16 m), com pórtico a leste, as colunas de bronze Jaquim e Boaz, câmaras laterais em três andares, o santo lugar e o santo dos santos, um cubo de 20 côvados. No pátio, o altar de bronze e o mar de fundição. Construído em sete anos.",
    refs: "1 Rs 6; 7:13–51; 8; 2 Cr 3–4",
    note: "Não há vestígio arqueológico direto. O modelo segue o texto e templos do mesmo tipo escavados na Síria (Ain Dara, Tell Tayinat). Ver a planta em /reis/templo-de-salomao.",
  },
  {
    id: "bosque",
    name: "Casa do Bosque do Líbano",
    at: [120, -300],
    eras: ["salomao", "ezequias"],
    text: "O maior prédio do palácio: 100 × 50 côvados e 30 de altura, sobre quatro fileiras de colunas de cedro. Ali ficavam os escudos de ouro e, mais tarde, o arsenal que Isaías menciona.",
    refs: "1 Rs 7:2–5; 10:16–17; Is 22:8",
    note: "Com o pórtico das colunas, a sala do trono e a casa da filha do faraó (1 Rs 7:6–8), formava o complexo real entre o Templo e a Cidade de Davi. A posição exata é desconhecida.",
  },
  {
    id: "ofel",
    name: "Ofel",
    at: [170, -215],
    eras: ["salomao", "ezequias"],
    text: "O trecho elevado entre a Cidade de Davi e o monte do Templo. Jotão constrói sobre o muro do Ofel e Manassés o cerca e o eleva muito.",
    refs: "2 Cr 27:3; 33:14; Ne 3:26–27",
    note: "No Ofel foram escavados prédios e uma porta do Ferro II (E. Mazar).",
  },
  {
    id: "muro-largo",
    name: "Muro Largo",
    at: [-227, -189],
    eras: ["ezequias"],
    text: "Trecho de muralha com cerca de 7 m de espessura, construído sobre casas demolidas. Isaías acusa: “derrubastes casas para fortificar o muro”.",
    refs: "Is 22:10; 2 Cr 32:5; Ne 3:8",
    note: "Escavado por Nahman Avigad no Bairro Judeu em 1970. Visível hoje.",
  },
  {
    id: "mishne",
    name: "Monte ocidental (Mishné)",
    at: [-260, 20],
    eras: ["ezequias"],
    text: "O “segundo bairro”, onde morava a profetisa Hulda. A cidade se expande para cá no fim do século 8 a.C., talvez com refugiados do norte depois de 722, e quadruplica de tamanho.",
    refs: "2 Rs 22:14; Sf 1:10",
  },
  {
    id: "tunel",
    name: "Túnel de Ezequias",
    at: [205, 265],
    eras: ["ezequias"],
    text: "Canal de 533 m cavado na rocha sob a Cidade de Davi, em forma de S, levando a água de Giom para o lado oeste. Duas equipes cavaram das pontas e se encontraram no meio. A linha brilhante mostra o traçado subterrâneo.",
    refs: "2 Rs 20:20; 2 Cr 32:2–4, 30; Is 22:9–11",
    note: "A Inscrição de Siloé, achada em 1880 no próprio túnel, descreve o encontro das equipes. Está no Museu Arqueológico de Istambul.",
  },
  {
    id: "siloe",
    name: "Tanque de Siloé",
    at: [57, 411],
    eras: ["ezequias"],
    text: "Reservatório no fim do túnel, na ponta sul da cidade. Isaías fala de “um reservatório entre os dois muros para as águas do tanque velho”.",
    refs: "Is 22:11; 8:6; Ne 3:15",
    note: "O tanque do Ferro II fica provavelmente na área de Birket el-Hamra; o tanque descoberto em 2004 é da época de Jesus.",
  },
  {
    id: "cedrom",
    name: "Vale do Cedrom",
    at: [330, -170],
    eras: ["davi", "salomao", "ezequias"],
    text: "O vale a leste da cidade, entre ela e o monte das Oliveiras. Davi o atravessa fugindo de Absalão; Asa e Josias queimam ali os objetos de culto pagão.",
    refs: "2 Sm 15:23; 1 Rs 15:13; 2 Rs 23:4–6",
  },
  {
    id: "hinom",
    name: "Vale de Hinom",
    at: [-250, 640],
    eras: ["davi", "salomao", "ezequias"],
    text: "O vale ao sul e a oeste. Ali ficava Tofete, onde Acaz e Manassés queimaram filhos no fogo; Josias o profana. Do nome Ge-Hinom vem Geena.",
    refs: "Js 15:8; 2 Rs 16:3; 23:10; Jr 7:31–32",
    note: "Em Ketef Hinom, na encosta, apareceram dois amuletos de prata (c. 600 a.C.) com a bênção sacerdotal de Números 6:24–26, o texto bíblico mais antigo conhecido.",
  },
  {
    id: "oliveiras",
    name: "Monte das Oliveiras",
    at: [720, -380],
    eras: ["davi", "salomao", "ezequias"],
    text: "A serra a leste, mais alta que a cidade. Davi sobe chorando; Salomão constrói ali altos para Camos e Moloque, que Josias destrói.",
    refs: "2 Sm 15:30; 1 Rs 11:7; 2 Rs 23:13",
  },
  {
    id: "tiropeao",
    name: "Vale central",
    at: [-60, -170],
    eras: ["davi", "salomao", "ezequias"],
    text: "Separa a Cidade de Davi e o monte do Templo do monte ocidental. O nome Tiropeão (“dos queijeiros”) vem de Josefo, muito mais tarde; hoje está quase todo aterrado.",
    refs: "Josefo, Guerra 5.140",
  },
];

/** Traçado aproximado do túnel de Ezequias (S de Giom a Siloé). */
export const tunnel: XZ[] = [
  [227, 122], [250, 175], [215, 235], [245, 300], [190, 350], [120, 385], [57, 411],
];

/** Prédios nomeados por era, com tamanho real aproximado (m). */
export type Building = {
  id: string;
  label: string;
  at: XZ;
  size: [number, number, number];
  rot?: number;
  color: string;
  eras: Era[];
};

export const buildings: Building[] = [
  { id: "torre-giom", label: "Torre da fonte", at: [212, 118], size: [16, 14, 16], color: "#bba98a", eras: ["davi", "salomao", "ezequias"] },
  { id: "palacio-davi", label: "Palácio de Davi", at: [140, -110], size: [32, 9, 24], color: "#c7b593", eras: ["davi", "salomao", "ezequias"] },
  { id: "bosque", label: "Casa do Bosque do Líbano", at: [120, -300], size: [52, 16, 26], color: "#b89b70", eras: ["salomao", "ezequias"] },
  { id: "portico", label: "Pórtico das colunas", at: [120, -255], size: [26, 10, 16], color: "#b89b70", eras: ["salomao", "ezequias"] },
  { id: "trono", label: "Sala do trono", at: [165, -270], size: [22, 12, 20], color: "#c2a77b", eras: ["salomao", "ezequias"] },
  { id: "palacio-salomao", label: "Palácio de Salomão", at: [160, -340], size: [34, 11, 26], color: "#c7b593", eras: ["salomao", "ezequias"] },
];

/** Centro do Templo e orientação (entrada a leste). */
export const TEMPLE = { at: [127, -449] as XZ };

export function pointInRing(x: number, z: number, ring: XZ[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, zi] = ring[i];
    const [xj, zj] = ring[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}
