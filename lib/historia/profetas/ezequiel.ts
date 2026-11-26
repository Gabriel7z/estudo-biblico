import { region } from "@/lib/historia/regions";
import type { Area, Episode, LngLat, MapLabel } from "@/lib/historia/types";

/* As faixas das tribos em Ezequiel 48: um esquema, não fronteiras medidas. */
function coast(lat: number): number {
  const pts: [number, number][] = [[30.7, 34.3], [31.2, 34.25], [31.6, 34.5], [32.0, 34.75], [32.5, 34.9], [32.9, 35.08], [33.3, 35.2], [33.6, 35.38], [34.25, 35.8]];
  return interp(pts, lat);
}
function eastEdge(lat: number): number {
  const pts: [number, number][] = [[30.7, 35.3], [31.0, 35.45], [31.8, 35.55], [32.6, 35.6], [33.0, 35.65], [33.4, 36.2], [34.25, 37.25]];
  return interp(pts, lat);
}
function interp(pts: [number, number][], lat: number): number {
  if (lat <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) {
    if (lat <= pts[i][0]) {
      const [a, va] = pts[i - 1];
      const [b, vb] = pts[i];
      return va + ((lat - a) / (b - a)) * (vb - va);
    }
  }
  return pts[pts.length - 1][1];
}
function strip(north: number, south: number): LngLat[] {
  return [
    [coast(north), north],
    [eastEdge(north), north],
    [eastEdge((north + south) / 2), (north + south) / 2],
    [eastEdge(south), south],
    [coast(south), south],
    [coast((north + south) / 2), (north + south) / 2],
  ];
}

const NORTH = 34.2;
const HOLY_N = 31.92;
const HOLY_S = 31.66;
const SOUTH = 30.75;
const northTribes = ["Dã", "Aser", "Naftali", "Manassés", "Efraim", "Rúben", "Judá"];
const southTribes = ["Benjamim", "Simeão", "Issacar", "Zebulom", "Gade"];

const tribeAreas: Area[] = [];
const tribeLabels: MapLabel[] = [];
{
  const step = (NORTH - HOLY_N) / northTribes.length;
  northTribes.forEach((name, i) => {
    const n = NORTH - i * step;
    const s = n - step;
    tribeAreas.push({ label: name, side: i % 2 ? "israel" : "neutro", polygon: strip(n, s) });
    tribeLabels.push({ text: name.toUpperCase(), lng: (coast((n + s) / 2) + eastEdge((n + s) / 2)) / 2, lat: (n + s) / 2, kind: "povo" });
  });
  tribeAreas.push({ label: "Porção sagrada", side: "juda", polygon: strip(HOLY_N, HOLY_S) });
  tribeLabels.push({ text: "PORÇÃO SAGRADA", lng: 35.05, lat: 31.86, kind: "regiao" });
  const step2 = (HOLY_S - SOUTH) / southTribes.length;
  southTribes.forEach((name, i) => {
    const n = HOLY_S - i * step2;
    const s = n - step2;
    tribeAreas.push({ label: name, side: i % 2 ? "israel" : "neutro", polygon: strip(n, s) });
    tribeLabels.push({ text: name.toUpperCase(), lng: (coast((n + s) / 2) + eastEdge((n + s) / 2)) / 2, lat: (n + s) / 2, kind: "povo" });
  });
}

/** Ezequiel, sacerdote no exílio. */
export const ezequielEpisodes: Episode[] = [
  {
    slug: "ezequiel-no-quebar",
    book: "Ezequiel",
    title: "Junto ao rio Quebar: o exílio e a visão do trono",
    ref: "Ez 1–11; 24; 33:21",
    date: "597–585 a.C.",
    year: 593,
    summary:
      "Levado com o rei Joaquim em 597, o sacerdote Ezequiel vive entre os exilados em Tel-Abibe, junto ao canal Quebar, perto de Nipur. Em 593 vê a glória de Deus sobre quatro querubins e rodas cheias de olhos, longe do Templo. Em visão é levado a Jerusalém, vê a glória deixar o Templo pelo monte das Oliveiras e, anos depois, recebe a notícia: “a cidade foi ferida”.",
    context: [
      "Ezequiel conta o tempo pelo exílio do rei Joaquim: “no quinto ano do cativeiro do rei Joaquim” é 593 a.C. (Ez 1:2). Os deportados de 597 eram a elite: a corte, os guerreiros, os artesãos e ferreiros (2 Rs 24:14–16).",
      "O Quebar é o nāru Kabaru, um grande canal de irrigação perto de Nipur, citado nas tabuinhas da casa comercial Murashu (século 5 a.C.). Tel-Abibe (Ez 3:15) reproduz o acádio til abūbi, “monte do dilúvio”, nome comum de colinas de ruínas antigas. O local exato não é conhecido.",
      "Os querubins de Ezequiel (Ez 1; 10) têm quatro faces (homem, leão, boi, águia), quatro asas, mãos humanas e pés como de bezerro. É a linguagem dos guardiões alados do Oriente Próximo, como os lamassu de cabeça humana nas portas dos palácios assírios e as esfinges aladas dos marfins fenícios, e não os anjinhos da arte barroca.",
      "Desde 2014 são publicadas cerca de duzentas tabuinhas de Āl-Yāhūdu, “cidade de Judá”, uma aldeia de exilados na Babilônia: contratos, aluguéis e impostos de 572 a 477 a.C., com nomes como Yahu-azar e Natan-Yahu. É o cotidiano dos ouvintes de Ezequiel.",
    ],
    stops: [
      { siteId: "jerusalem", title: "Deportado com Joaquim", date: "597 a.C.", kind: "evento", text: "Ezequiel, filho de Buzi, sacerdote, vai com a corte, os artesãos e os soldados: dez mil pessoas.", refs: "2 Rs 24:14–16; Ez 1:2–3" },
      { siteId: "babilonia", title: "Babilônia: o rei cativo", date: "597–561 a.C.", kind: "cidade", text: "Joaquim fica preso na capital; os demais exilados vão para aldeias nos canais.", refs: "2 Rs 25:27–30", archaeology: "Tabuinhas de rações do palácio de Nabucodonosor citam “Ya'ukin, rei da terra de Yahud”, e seus cinco filhos (Museu de Berlim)." },
      { siteId: "tel-abibe", title: "Tel-Abibe: a visão do trono", date: "julho de 593 a.C.", kind: "evento", text: "Um vento tempestuoso do norte, fogo, quatro seres viventes com rodas cheias de olhos e, acima, um trono de safira e “a aparência da glória do Senhor”. Ezequiel fica sete dias atônito entre os exilados.", refs: "Ez 1; 3:15" },
      { siteId: "nipur", title: "Nipur e o canal Kabaru", date: "séculos 6–5 a.C.", kind: "cidade", text: "Região de canais e aldeias de deportados, onde a coroa assentava povos vencidos para cultivar terras.", refs: "Ez 1:1; 3:15", archaeology: "O arquivo Murashu de Nipur (século 5 a.C.) cita o canal Kabaru e muitos nomes judaicos." },
      { siteId: "tel-abibe", title: "O cerco desenhado num tijolo", date: "593–592 a.C.", kind: "evento", text: "Ezequiel desenha Jerusalém num tijolo, faz rampas e aríetes de brinquedo e fica deitado de lado 390 e 40 dias.", refs: "Ez 4–5" },
      { siteId: "jerusalem", title: "Em visão no Templo", date: "setembro de 592 a.C.", kind: "evento", text: "Levado “pelos cabelos”: a imagem do ciúme, setenta anciãos incensando figuras nas paredes, mulheres chorando por Tamuz, vinte e cinco homens adorando o sol.", refs: "Ez 8" },
      { siteId: "oliveiras", title: "A glória deixa a cidade", date: "592 a.C.", kind: "evento", text: "A glória se ergue dos querubins, para na porta oriental e depois “sobre o monte que está ao oriente da cidade”.", refs: "Ez 10:18–19; 11:22–23" },
      { siteId: "tel-abibe", title: "A morte da esposa", date: "janeiro de 588 a.C.", kind: "evento", text: "No dia em que começa o cerco, morre “o desejo dos teus olhos”, e Ezequiel não pode guardar luto: sinal para os exilados.", refs: "Ez 24:1–2, 15–27" },
      { siteId: "tel-abibe", title: "“A cidade foi ferida”", date: "janeiro de 585 a.C.", kind: "evento", text: "Um fugitivo chega de Jerusalém. A boca do profeta, fechada desde o início do cerco, se abre.", refs: "Ez 33:21–22" },
    ],
    routes: [
      { label: "Deportação de 597", side: "babilonia", path: ["jerusalem", "samaria", "megido", "hazor", "damasco", "ribla", "hamate", "alepo", "carquemis", [39.5, 35.6], [41.0, 34.5], [43.4, 34.0], "babilonia", "tel-abibe"] },
      { label: "Viagem em visão", side: "juda", path: ["tel-abibe", [41.0, 33.0], [38.0, 32.6], "jerusalem", "oliveiras"], dashed: true },
      { label: "O fugitivo de 586", side: "juda", path: ["jerusalem", "damasco", "ribla", "hamate", "alepo", "carquemis", [39.5, 35.6], [41.0, 34.5], [43.4, 34.0], "babilonia", "tel-abibe"], dashed: true },
    ],
    areas: [
      { label: "Babilônia", side: "babilonia", polygon: region.babilonia },
      { label: "Judá", side: "juda", polygon: region.juda },
    ],
    labels: [
      { text: "BABILÔNIA", lng: 45.0, lat: 31.6, kind: "regiao" },
      { text: "JUDÁ", lng: 35.0, lat: 31.4, kind: "regiao" },
      { text: "Quebar", lng: 45.4, lat: 32.35, kind: "rio" },
      { text: "Eufrates", lng: 41.2, lat: 34.2, kind: "rio" },
      { text: "Tigre", lng: 44.6, lat: 34.6, kind: "rio" },
      { text: "Mar Grande", lng: 33.6, lat: 33.0, kind: "mar" },
    ],
    bounds: [33.8, 30.4, 46.6, 37.2],
    image: "/historia/ezequiel-visao.webp",
    imageAlt: "Ezequiel prostrado na margem do Quebar; no céu tempestuoso, quatro seres alados de quatro faces, rodas cheias de olhos e um trono de safira.",
    caveat: "Tel-Abibe é marcada na região de Nipur, onde corria o canal Kabaru; o ponto exato é desconhecido. A rota da deportação é a estrada usual pelo Eufrates.",
  },
  {
    slug: "ezequiel-e-tiro",
    book: "Ezequiel",
    title: "Tiro, o navio dos mares: Ezequiel 26–28",
    ref: "Ez 26–28; 29:17–20",
    date: "586–571 a.C.",
    year: 585,
    summary:
      "Tiro comemora a queda de Jerusalém como a abertura de um mercado. Ezequiel a descreve como um navio magnífico, construído e tripulado por meio mundo, que naufraga no coração dos mares. Nabucodonosor cerca a cidade-ilha por treze anos; no fim, Ezequiel diz que o rei não recebeu salário por Tiro e receberá o Egito.",
    context: [
      "Tiro ficava numa ilha a uns 600 m da costa, com uma cidade-irmã em terra firme (Ushu). Sem frota, nenhum exército conseguia tomá-la. Josefo, citando os anais fenícios, diz que Nabucodonosor a cercou por treze anos no reinado de Itobaal (Contra Ápion 1.21; Antiguidades 10.228). Textos administrativos babilônicos mencionam provisões para tropas em Tiro.",
      "O lamento de Ezequiel 27 é um raro catálogo do comércio do século 6 a.C.: cipreste de Senir, cedro do Líbano, carvalho de Basã, linho do Egito, remadores de Sidom e Arvade, calafates de Gebal; prata, ferro, estanho e chumbo de Társis; escravos e bronze de Javã, Tubal e Meseque; cavalos de Togarma; trigo, mel e bálsamo de Judá e Israel; vinho de Helbom de Damasco; panos de Dedã; especiarias de Sabá; mercadores de Harã e da Assíria.",
      "Em Ez 28 o rei de Tiro diz “eu sou um deus, assento-me no trono de Deus no coração dos mares”, e é comparado a um querubim no Éden. A cidade se submeteu a Babilônia por acordo, sem ser saqueada; por isso Ez 29:18 diz que “toda cabeça ficou calva e todo ombro pelado” sem pagamento.",
      "A ilha só foi tomada de assalto em 332 a.C., quando Alexandre construiu um aterro até ela com os escombros da cidade velha (Arriano 2.15–24). O aterro, alargado pela areia ao longo dos séculos, ainda liga Tiro ao continente.",
    ],
    stops: [
      { siteId: "tiro", title: "Tiro: “Ah! Ah! a porta dos povos se quebrou”", date: "586 a.C.", kind: "cidade", text: "Tiro se alegra com a queda de Jerusalém. Ezequiel: “farei de ti uma penha descalvada; virás a ser enxugadouro de redes”.", refs: "Ez 26:1–14" },
      { siteId: "tiro", title: "O cerco de treze anos", date: "c. 586–573 a.C.", kind: "cerco", text: "Torres, rampas e aríetes contra os muros que dão para o mar. A cidade resiste e acaba aceitando a soberania de Babilônia.", refs: "Ez 26:7–12; 29:18", archaeology: "Josefo, citando os arquivos de Tiro: treze anos de cerco sob Itobaal III." },
      { siteId: "sidom", title: "Sidom", date: "c. 586 a.C.", kind: "cidade", text: "Remadores de Sidom no navio de Tiro. Sidom recebe também um oráculo próprio.", refs: "Ez 27:8; 28:20–23" },
      { siteId: "arvade", title: "Arvade", date: "—", kind: "cidade", text: "Remadores e soldados nos muros de Tiro.", refs: "Ez 27:8, 11" },
      { siteId: "gebal", title: "Gebal (Biblos)", date: "—", kind: "cidade", text: "Os anciãos e sábios de Gebal calafetavam o casco.", refs: "Ez 27:9" },
      { siteId: "quitim", title: "Quitim (Chipre)", date: "—", kind: "cidade", text: "Bancos de marfim incrustado em madeira das ilhas de Quitim.", refs: "Ez 27:6" },
      { siteId: "damasco", title: "Damasco", date: "—", kind: "cidade", text: "Vinho de Helbom e lã branca.", refs: "Ez 27:18" },
      { siteId: "jerusalem", title: "Judá e Israel", date: "—", kind: "cidade", text: "Trigo de Minite, doces, mel, azeite e bálsamo.", refs: "Ez 27:17" },
      { siteId: "deda", title: "Dedã e a Arábia", date: "—", kind: "cidade", text: "Panos para montaria; a Arábia e os príncipes de Quedar com cordeiros, carneiros e bodes.", refs: "Ez 27:20–21" },
      { siteId: "hara", title: "Harã e a Assíria", date: "—", kind: "cidade", text: "Mercadores de Harã, Cane, Éden, Assur e Quilmade, com tecidos e tapetes.", refs: "Ez 27:23–24" },
      { siteId: "tiro", title: "Sem salário por Tiro", date: "abril de 571 a.C.", kind: "evento", text: "Ezequiel, já idoso: o exército trabalhou duro contra Tiro e não recebeu nada; o Egito será o pagamento.", refs: "Ez 29:17–20" },
    ],
    routes: [
      { label: "Rota do linho do Egito", side: "fenicia", path: ["tanis", [32.6, 31.6], [34.2, 32.6], "tiro"], dashed: true },
      { label: "Rota de Chipre", side: "fenicia", path: ["quitim", "tiro"], dashed: true },
      { label: "Costa fenícia", side: "fenicia", path: ["tiro", "sidom", "gebal", "arvade"], dashed: true },
      { label: "Caravanas da Arábia", side: "arabes", path: ["deda", "tema", [37.6, 29.6], "bozra", "raba", "damasco", "tiro"], dashed: true },
      { label: "Caravanas de Harã", side: "neutro", path: ["hara", "carquemis", "alepo", "hamate", "damasco"], dashed: true },
      { label: "Exército de Nabucodonosor", side: "babilonia", path: ["ribla", [36.1, 33.9], "sidom", "tiro"] },
    ],
    areas: [
      { label: "Fenícia", side: "fenicia", polygon: region.fenicia },
      { label: "Arábia", side: "arabes", polygon: region.arabia },
    ],
    labels: [
      { text: "FENÍCIA", lng: 35.65, lat: 33.85, kind: "povo" },
      { text: "ARÁBIA E QUEDAR", lng: 38.6, lat: 28.4, kind: "povo" },
      { text: "JAVÃ, TUBAL E MESEQUE (ao norte e oeste)", lng: 33.0, lat: 36.6, kind: "regiao" },
      { text: "Mar Grande", lng: 33.0, lat: 33.2, kind: "mar" },
      { text: "Eufrates", lng: 38.9, lat: 36.0, kind: "rio" },
    ],
    bounds: [31.5, 26.0, 40.3, 37.3],
    image: "/historia/ezequiel-tiro.webp",
    imageAlt: "A cidade-ilha de Tiro, murada e cercada por navios fenícios, vista do acampamento babilônico na costa.",
    warIds: ["tiro-585", "tiro-332"],
    caveat: "Os números marcados com “—” são parceiros comerciais do lamento de Ez 27, não acontecimentos datados. As rotas comerciais são esquemáticas.",
  },
  {
    slug: "ezequiel-e-o-egito",
    book: "Ezequiel",
    title: "Contra Faraó e as nações: Ezequiel 25 e 29–32",
    ref: "Ez 25; 29–32",
    date: "587–568 a.C.",
    year: 587,
    summary:
      "Amom bateu palmas, Moabe zombou, Edom se vingou, os filisteus aproveitaram: Ezequiel responde a cada vizinho de Judá. E dedica quatro capítulos ao Egito do faraó Hofra, o “grande crocodilo” deitado no seu Nilo, que prometeu socorro e quebrou como cana: “de Migdol a Siene”, cidade por cidade.",
    context: [
      "Os oráculos contra o Egito são quase todos datados com precisão entre janeiro de 587 e março de 585, durante e logo depois do cerco de Jerusalém, além de um de 571 (Ez 29:17). Hofra (Apriés, 589–570) tinha incentivado a revolta de Zedequias e mandado um exército que não salvou a cidade.",
      "A lista de Ez 30:13–18 percorre o Egito real: Nofe (Mênfis), Patros (Alto Egito), Zoã (Tânis), Nô (Tebas), Sim (Pelúsio), Áven (Om, Heliópolis), Pi-Besete (Bubástis), Tafnes. “De Migdol a Siene, até a fronteira de Cuxe” (Ez 29:10) quer dizer do extremo norte ao extremo sul.",
      "Ez 31 usa a queda da Assíria como espelho: um cedro do Líbano que tocava as nuvens e foi cortado. Ez 32 é um canto fúnebre em que Faraó desce ao abismo e encontra Assur, Elam, Meseque, Tubal, Edom e os sidônios.",
      "Hofra foi derrubado em 570 por Amásis, depois de uma derrota diante dos gregos de Cirene, e morto pouco depois (Heródoto 2.161–169). Em 568/567 Nabucodonosor atacou o Egito, como registra um fragmento de crônica (BM 33041); o Egito, porém, nunca foi província babilônica.",
    ],
    stops: [
      { siteId: "raba", title: "Amom", date: "c. 586 a.C.", kind: "cidade", text: "“Bateste palmas e pateaste quando o santuário foi profanado.” Rabá será estábulo de camelos.", refs: "Ez 25:1–7; 21:28–32" },
      { siteId: "dibom", title: "Moabe", date: "c. 586 a.C.", kind: "cidade", text: "“A casa de Judá é como todas as nações.” As cidades da fronteira serão abertas aos povos do oriente.", refs: "Ez 25:8–11" },
      { siteId: "bozra", title: "Edom", date: "c. 586 a.C.", kind: "cidade", text: "Edom se vingou de Judá. Obadias e o Salmo 137 lembram o mesmo: “arrasai, arrasai-a”.", refs: "Ez 25:12–14; 35; Ob; Sl 137:7" },
      { siteId: "gaza", title: "Filisteus e quereteus", date: "c. 586 a.C.", kind: "cidade", text: "Vingança antiga contra Judá; os quereteus da costa serão exterminados.", refs: "Ez 25:15–17" },
      { siteId: "pelusio", title: "Sim (Pelúsio), a fortaleza do Egito", date: "587 a.C.", kind: "cidade", text: "A porta de entrada do Egito para quem vem da Ásia.", refs: "Ez 30:15–16" },
      { siteId: "migdol", title: "Migdol, o extremo norte", date: "587 a.C.", kind: "cidade", text: "“De Migdol a Siene”: o Egito inteiro.", refs: "Ez 29:10; 30:6" },
      { siteId: "tafnes", title: "Tafnes", date: "587 a.C.", kind: "cidade", text: "“Em Tafnes o dia se escurecerá, quando eu quebrar ali os jugos do Egito.”", refs: "Ez 30:18" },
      { siteId: "bubastis", title: "Pi-Besete (Bubástis)", date: "587 a.C.", kind: "cidade", text: "Os jovens de Áven e de Pi-Besete cairão à espada.", refs: "Ez 30:17" },
      { siteId: "tanis", title: "Zoã (Tânis)", date: "587 a.C.", kind: "cidade", text: "“Porei fogo em Zoã.”", refs: "Ez 30:14" },
      { siteId: "heliopolis", title: "Áven (Om, Heliópolis)", date: "587 a.C.", kind: "santuario", text: "A cidade do sol, com seus obeliscos.", refs: "Ez 30:17; Jr 43:13" },
      { siteId: "menfis", title: "Nofe (Mênfis)", date: "587 a.C.", kind: "cidade", text: "“Destruirei os ídolos e acabarei com as imagens de Nofe.” E Faraó, crocodilo no Nilo: “porei anzóis nas tuas queixadas”.", refs: "Ez 29:3–5; 30:13" },
      { siteId: "tebas", title: "Nô (Tebas)", date: "587 a.C.", kind: "cidade", text: "“Executarei juízos em Nô.”", refs: "Ez 30:14–16" },
      { siteId: "elefantina", title: "Siene, o extremo sul", date: "587 a.C.", kind: "cidade", text: "Até a fronteira de Cuxe.", refs: "Ez 29:10; 30:6" },
    ],
    routes: [
      { label: "Nabucodonosor contra o Egito, 568/567", side: "babilonia", path: ["gaza", "pelusio", "tafnes"] },
      { label: "O Nilo, de Siene ao delta", side: "egito", path: ["elefantina", "tebas", [30.9, 27.2], [31.0, 28.0], "menfis", "heliopolis", "bubastis", "tanis"], dashed: true },
    ],
    areas: [
      { label: "Egito", side: "egito", polygon: region.egito },
      { label: "Amom", side: "amom", polygon: region.amom },
      { label: "Moabe", side: "moabe", polygon: region.moabe },
      { label: "Edom", side: "edom", polygon: region.edom },
      { label: "Filístia", side: "filisteus", polygon: region.filistia },
      { label: "Judá", side: "juda", polygon: region.juda },
    ],
    labels: [
      { text: "EGITO", lng: 31.0, lat: 29.4, kind: "regiao" },
      { text: "PATROS", lng: 32.0, lat: 26.0, kind: "regiao" },
      { text: "CUXE ↓", lng: 32.9, lat: 23.9, kind: "regiao" },
      { text: "AMOM", lng: 36.1, lat: 32.05, kind: "povo" },
      { text: "MOABE", lng: 35.85, lat: 31.35, kind: "povo" },
      { text: "EDOM", lng: 35.4, lat: 30.4, kind: "povo" },
      { text: "Nilo", lng: 31.15, lat: 27.6, kind: "rio" },
      { text: "Mar Grande", lng: 32.6, lat: 32.4, kind: "mar" },
    ],
    bounds: [29.6, 23.6, 36.6, 32.4],
    warIds: ["egito-568"],
    caveat: "Os números seguem a ordem do mapa, não a ordem dos capítulos. Migdol tem localização discutida.",
  },
  {
    slug: "o-novo-templo",
    book: "Ezequiel",
    title: "O novo Templo, o rio e a terra repartida",
    ref: "Ez 40–48",
    date: "573 a.C.",
    year: 573,
    summary:
      "Catorze anos depois da queda de Jerusalém, Ezequiel é levado em visão a um monte altíssimo e vê um Templo medido com vara. A glória volta pelo oriente; do limiar sai um rio que cresce até virar torrente, desce ao mar Morto e o cura. A terra é repartida de novo em faixas iguais, de leste a oeste, para as doze tribos e também para os estrangeiros que moram entre elas.",
    context: [
      "A visão é datada “no ano vinte e cinco do nosso cativeiro… catorze anos depois que a cidade foi ferida” (Ez 40:1), abril de 573 a.C. O guia mede tudo com uma vara de seis côvados longos; o Templo tem a planta do de Salomão, mas sem rei no átrio e com uma separação mais rígida entre o santo e o comum.",
      "O rio de Ez 47 sai da porta oriental, desce pela Arabá e entra no mar Morto, que fica doce: pescadores estendem redes “desde En-Gedi até En-Eglaim”, mas os pântanos ficam salgados “para sal”. É uma geografia real usada para dizer o impossível.",
      "As fronteiras de Ez 47:15–20 seguem as de Nm 34: ao norte, de Hetlom a Lebo-Hamate, Zedade e Hazar-Enom; a leste, o Jordão; ao sul, de Tamar às águas de Meribá-Cades e ao ribeiro do Egito; a oeste, o Mar Grande. Não incluem a Transjordânia.",
      "Ez 48 dá às tribos faixas paralelas, sete ao norte e cinco ao sul da porção sagrada, que contém o santuário, os sacerdotes, os levitas e a cidade cujo nome será “O Senhor está ali”. O texto não dá larguras; este mapa usa faixas iguais em cada lado da porção sagrada, e põe essa porção à altura de Jerusalém, o que é uma convenção.",
    ],
    stops: [
      { siteId: "jerusalem", title: "O Templo medido", date: "abril de 573 a.C.", kind: "santuario", text: "Do exílio, Ezequiel é levado “em visões de Deus” a um monte muito alto. Portas com câmaras de guarda, átrio exterior e interior, o altar de degraus, o santo e o santo dos santos de 20 × 20 côvados.", refs: "Ez 40–42; 43:13–17" },
      { siteId: "oliveiras", title: "A glória volta pelo oriente", date: "573 a.C.", kind: "evento", text: "A glória que saíra pelo monte das Oliveiras (Ez 11:23) volta pela porta oriental, que fica fechada desde então.", refs: "Ez 43:1–5; 44:1–2" },
      { siteId: "en-gedi", title: "En-Gedi: o mar curado", date: "573 a.C.", kind: "evento", text: "Pescadores de En-Gedi a En-Eglaim, peixes como os do Mar Grande, árvores com frutos todo mês e folhas que curam.", refs: "Ez 47:1–12" },
      { siteId: "lebo-hamate", title: "Lebo-Hamate: a fronteira norte", date: "573 a.C.", kind: "evento", text: "A fronteira norte vai do mar por Hetlom até a entrada de Hamate.", refs: "Ez 47:15; 48:1; Nm 34:8" },
      { siteId: "zedade", title: "Zedade", date: "573 a.C.", kind: "evento", text: "Marco da fronteira norte, entre Damasco e Hamate.", refs: "Ez 47:15–16" },
      { siteId: "hazar-enom", title: "Hazar-Enom", date: "573 a.C.", kind: "evento", text: "O canto nordeste, na fronteira de Damasco.", refs: "Ez 47:17; 48:1" },
      { siteId: "tamar", title: "Tamar: o canto sudeste", date: "573 a.C.", kind: "evento", text: "A fronteira leste desce pelo Jordão até o mar oriental e chega a Tamar.", refs: "Ez 47:18–19" },
      { siteId: "cades", title: "Meribá-Cades", date: "573 a.C.", kind: "evento", text: "A fronteira sul passa pelas águas de Meribá-Cades, onde Israel murmurou no deserto.", refs: "Ez 47:19; 48:28" },
      { siteId: "ribeiro-egito", title: "O ribeiro do Egito", date: "573 a.C.", kind: "evento", text: "A fronteira sul desce pelo wadi até o Mar Grande.", refs: "Ez 47:19" },
    ],
    routes: [
      { label: "O rio do Templo", side: "juda", path: ["jerusalem", [35.3, 31.73], [35.38, 31.62], "en-gedi"] },
      { label: "Fronteira norte", side: "neutro", path: [[35.75, 34.25], "lebo-hamate", "zedade", "hazar-enom"], dashed: true },
      { label: "Fronteira leste", side: "neutro", path: ["hazar-enom", "damasco", [35.65, 33.0], [35.6, 32.6], [35.55, 31.8], "tamar"], dashed: true },
      { label: "Fronteira sul", side: "neutro", path: ["tamar", "cades", "ribeiro-egito"], dashed: true },
    ],
    areas: tribeAreas,
    labels: [
      ...tribeLabels,
      { text: "Mar Grande", lng: 34.2, lat: 32.6, kind: "mar" },
      { text: "Mar Salgado", lng: 35.6, lat: 31.45, kind: "mar" },
    ],
    bounds: [33.6, 30.5, 37.6, 34.5],
    warIds: [],
    caveat: "As faixas das tribos são um esquema: o texto não dá larguras, só a ordem e a porção sagrada de 25.000 côvados. Hazar-Enom e Hetlom não têm localização segura.",
  },
];
