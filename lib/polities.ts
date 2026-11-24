import type { EraId, RouteId } from "@/lib/types";

export type Polity = {
  id: string;
  name: string;
  dates: string;
  era: EraId;
  rule: string;
  power: string;
  texts: string;
  uncertainty: string;
  peripheral?: boolean;
  placeIds: string[];
  routeIds: RouteId[];
  regionIds: string[];
  focusPlaceId?: string;
};

export const polities: Polity[] = [
  {
    id: "clas",
    name: "Clãs patriarcais",
    dates: "Começo do segundo milênio a.C., em cronologia de estudo, sem arquivo.",
    era: "patriarcas",
    rule: "O pai da casa. Não há rei de Israel nem capital.",
    power:
      "O clã marcha, faz aliança e compra túmulo. Nas cidades de Canaã mandam reis locais. No Egito, no fim da história, manda a corte.",
    texts: "Gênesis 12–50.",
    uncertainty: "A rota de Ur a Canaã e ao Egito é o arco dos patriarcas, uma leitura geográfica, não uma estrada datada.",
    placeIds: ["ur", "hara", "siquem", "betel", "hebrom", "berseba", "menfis"],
    routeIds: ["patriarcas"],
    regionIds: ["egito", "gosen", "canaa", "neguebe", "aram"],
    focusPlaceId: "hebrom",
  },
  {
    id: "teocracia",
    name: "Teocracia de Moisés e Josué",
    dates: "A janela do êxodo, século XV ou XIII a.C., e a geração seguinte.",
    era: "exodo",
    rule: "Moisés, e depois Josué, diante de Deus. Sem rei e sem cidade própria.",
    power:
      "A lei e a tenda organizam o acampamento. Josué conduz a entrada, mas não funda dinastia. Do outro lado estão o faraó e os reis das cidades.",
    texts: "Êxodo, Números, Deuteronômio e Josué.",
    uncertainty:
      "O faraó não é nomeado. A rota em cobre não foi escavada. A campanha de Josué não desenha uma fronteira nacional fechada.",
    placeIds: ["rameses", "sinai", "cades", "nebo", "jerico", "siquem", "hazor"],
    routeIds: ["exodo", "filisteus"],
    regionIds: ["egito", "gosen", "sinai", "canaa", "moabe", "edom"],
    focusPlaceId: "sinai",
  },
  {
    id: "juizes",
    name: "Juízes: confederação e teocracia",
    dates: "Séculos XII e XI a.C., com juízes que podem ter sido contemporâneos.",
    era: "juizes",
    rule: "Juízes locais. A frase do livro é que não havia rei.",
    power:
      "Um libertador cobre uma região e uma geração. Não há capital, nem exército permanente, nem sucessor. Filisteus, moabitas e cidades cananeias ocupam o que Israel não segurou.",
    texts: "Juízes e Rute.",
    uncertainty: "O mapa tribal é mancha, não reino contínuo. Várias cidades da planície ficam fora.",
    placeIds: ["megido", "hazor", "siquem", "hebrom", "gaza", "ascalom", "da"],
    routeIds: ["via-maris"],
    regionIds: ["israel", "filistia", "moabe", "amom", "fenicia", "neguebe"],
    focusPlaceId: "megido",
  },
  {
    id: "unida",
    name: "Monarquia unida",
    dates: "Saul, Davi e Salomão, em geral c. 1025–930 a.C. Margem de décadas.",
    era: "monarquia",
    rule: "Um rei sobre as tribos. Hebrom primeiro, Jerusalém depois.",
    power:
      "A coroa, o exército e, com Davi e Salomão, a arca e o templo. “De Dã a Berseba” é fórmula de extensão, não um cadastro de fronteira.",
    texts: "1–2 Samuel e o começo de 1 Reis.",
    uncertainty: "A influência sobre vizinhos não é anexação. Eziom-Geber e Tiro são comércio, não províncias.",
    placeIds: ["hebrom", "jerusalem", "megido", "hazor", "da", "gaza", "damasco"],
    routeIds: ["via-maris", "caminho-do-rei"],
    regionIds: ["israel", "filistia", "edom", "moabe", "amom", "aram", "fenicia"],
    focusPlaceId: "jerusalem",
  },
  {
    id: "dividida",
    name: "Reinos divididos",
    dates: "De cerca de 930 a.C. até 722 no norte. Judá segue como reino.",
    era: "dividido",
    rule: "Dois reis. Israel no norte, Judá em Jerusalém.",
    power:
      "Cada reino tem corte, santuário e vassalagem. Damasco, Tiro e o Egito entram nas alianças. A Assíria ainda é vizinha, não dona dos dois.",
    texts: "1 Reis 12 em diante, Amós e Oseias.",
    uncertainty: "A fronteira entre Israel e Judá oscila com a guerra. O desenho é esquema de estudo.",
    placeIds: ["samaria", "betel", "da", "jerusalem", "hebrom", "damasco", "megido"],
    routeIds: ["via-maris", "caminho-do-rei"],
    regionIds: ["israel-norte", "juda", "aram", "filistia", "fenicia", "moabe", "edom"],
    focusPlaceId: "samaria",
  },
  {
    id: "imperios",
    name: "Domínio assírio e babilônico",
    dates: "Assíria derruba Samaria em 722 a.C. Babilônia derruba Jerusalém em 586 a.C.",
    era: "exilio",
    rule: "Não são o mesmo século nem o mesmo trono. Primeiro o rei da Assíria. Depois o rei da Babilônia.",
    power:
      "Israel deixa de ser reino em 722. Judá vira vassala e, em 586, perde rei, templo e cidade. O poder passa a ser o decreto imperial e o exílio.",
    texts: "2 Reis 17–25, Isaías, Jeremias, Ezequiel.",
    uncertainty:
      "O mapa mostra o fim da sequência, com a Babilônia no rio e Judá sem polígono de reino. A Assíria já tinha caído em 612. Não se desenham os dois impérios ao mesmo tempo.",
    placeIds: ["ninive", "samaria", "jerusalem", "babilonia", "megido"],
    routeIds: ["via-maris"],
    regionIds: ["babilonia-terra", "egito", "edom"],
    focusPlaceId: "babilonia",
  },
  {
    id: "yehud",
    name: "Yehud, província persa",
    dates: "Do edito de Ciro, 538 a.C., até o fim do período persa, no século IV.",
    era: "persia",
    rule: "O rei da Pérsia. Em Jerusalém, governador e sumo sacerdote. Sem rei davídico.",
    power:
      "Licença imperial para voltar, reconstruir o templo e, com Neemias, o muro. A comunidade cabe numa província pequena.",
    texts: "Esdras, Neemias, Ageu e Zacarias.",
    uncertainty: "A Pérsia não é desenhada como um disco. O que cabe no mapa é Yehud e o caminho de volta.",
    placeIds: ["babilonia", "hara", "damasco", "jerusalem", "samaria"],
    routeIds: ["retorno"],
    regionIds: ["yehud", "fenicia"],
    focusPlaceId: "jerusalem",
  },
  {
    id: "hasmoneus",
    name: "Helenístico e hasmoneu",
    dates: "Depois de Alexandre, e em especial 175–134 a.C. nos livros dos Macabeus. A realeza hasmoneia é ainda posterior.",
    era: "persia",
    rule: "Reis gregos selêucidas, depois a casa de Matatias. Não é a monarquia de Davi.",
    power:
      "O templo é o centro da disputa. Judas recupera o culto. A liderança vira militar e sacerdotal. O reino hasmoneu, com coroa, começa depois de 1 Macabeus.",
    texts: "1 e 2 Macabeus, livros deuterocanônicos.",
    uncertainty:
      "Periferia deste atlas. As fronteiras mudam a cada campanha e são contestadas. O polígono é só a serra da Judeia, não o império selêucida.",
    peripheral: true,
    placeIds: ["jerusalem", "hebrom", "siquem", "gaza", "jerico"],
    routeIds: ["via-maris"],
    regionIds: ["judeia-hasmoneia"],
    focusPlaceId: "jerusalem",
  },
];
