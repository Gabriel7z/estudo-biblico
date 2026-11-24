import type { Era } from "@/lib/types";

export const eras: Era[] = [
  {
    id: "patriarcas",
    order: 1,
    name: "Patriarcas",
    centuries: "tradição patriarcal",
    summary:
      "Um clã sai do sul da Mesopotâmia, passa por Harã e vive entre as cidades de Canaã sem governá-las. A fome, no fim, o leva ao delta.",
    paragraphs: [
      "O mapa deste tempo não é um reino. É um arco. A família de Abraão deixa Ur, no sul da Mesopotâmia, sobe pelo Eufrates até Harã e desce para Canaã. Siquém, Betel, Hebrom e Berseba são pousos e altares, não capitais. As cidades já existem. O clã passa no meio delas.",
      "O Egito entra pela fome. José chega ao delta como escravo e termina na administração do grão. Jacó desce com a família, e Gósen vira casa. Essa hospitalidade é o chão que Êxodo vai herdar já esquecida: um rei novo, que não contava a dívida de José.",
      "As datas da era patriarcal são de estudo, não de calendário real. O atlas senta o clã no mapa que o próprio livro descreve — Ur, Harã, Canaã, o delta — e não transforma a viagem numa fronteira.",
    ],
    mapNote:
      "Siga o arco tracejado de Ur a Harã, de Damasco a Hebrom e ao delta. As cidades de Canaã estão lá. Nenhuma delas é capital de Israel.",
    readings: ["Gênesis 12–25", "Gênesis 37–50"],
    governmentSlugs: ["egito", "canaa"],
  },
  {
    id: "exodo",
    order: 2,
    name: "Êxodo e deserto",
    centuries: "cerca de 1446 ou o século XIII a.C.",
    summary:
      "Moisés tira um povo do império mais organizado da região e o leva a um deserto, onde a lei nasce sem cidade e sem rei.",
    paragraphs: [
      "Israel está no delta oriental, nas cidades de depósito que o texto chama de Pitom e Ramessés. O governo é o do faraó, e o faraó não é nomeado. A saída não usa a estrada militar da costa — o caminho da terra dos filisteus — e entra pelo deserto do mar dos juncos.",
      "Há duas janelas de estudo. A primeira conta os 480 anos de 1 Reis 6:1 antes do templo de Salomão e cai por volta de 1446 a.C. A segunda lê o nome Ramessés e a estela de Merneptá, de cerca de 1208 a.C., em que Israel já aparece em Canaã, e procura a saída no século XIII. As duas ficam abertas.",
      "No Sinai a história muda de natureza. Até o mar, o enredo é fuga. No monte passa a ser aliança: dez palavras, uma tenda no centro, juízes aconselhados por Jetro. O povo ainda não tem terra. Tem uma lei. De Cades a terra é vista e recusada. Edom fecha o caminho do rei. Moisés morre no Nebo, de frente para Jericó.",
    ],
    mapNote:
      "A linha cor de cobre é a reconstrução tradicional do sul. A linha tracejada ao longo da costa é a estrada que o texto diz ter sido evitada.",
    readings: ["Êxodo", "Levítico", "Números", "Deuteronômio", "1 Reis 6:1"],
    governmentSlugs: ["egito", "midia", "acampamento", "transjordania"],
  },
  {
    id: "juizes",
    order: 3,
    name: "Conquista e juízes",
    centuries: "Bronze final e Ferro I",
    summary:
      "A terra é um tabuleiro de reis locais. Israel se firma na serra. Na costa, os filisteus. Não há rei em Israel.",
    paragraphs: [
      "Do outro lado do Jordão o poder muda de forma. Deixa de ser um faraó e passa a ser cidades: Jericó no oásis, Hazor no norte, Megido no passo, Jerusalém ainda na serra, sem ser capital de ninguém de Israel. Josué lê a entrada como campanha contra esses reis.",
      "Juízes é o tempo sem rei. Libertadores locais sobem da serra quando a planície aperta. A frase do livro é uma forma de governo: cada um faz o que parece certo, porque não há rei. Na costa, a partir do século XII a.C., as cidades filisteias seguram a melhor estrada.",
      "Edom, Moabe e Amom continuam no planalto, do outro lado do rio. A Fenícia ocupa a costa norte. Canaã, como nome de um país único, vai se desfazendo em faixas.",
    ],
    mapNote:
      "A serra é de Israel. A costa sul é filisteia. A Via Maris e o caminho do rei já são as estradas por onde os vizinhos se movem.",
    readings: ["Josué", "Juízes", "Rute"],
    governmentSlugs: ["canaa", "filisteus", "transjordania"],
  },
  {
    id: "monarquia",
    order: 4,
    name: "Reino unido",
    centuries: "cerca de 1050–930 a.C.",
    summary:
      "Saul, Davi e Salomão. As tribos passam a ter rei, e a capital sobe para uma cidade que não estava na estrada principal.",
    paragraphs: [
      "O pedido de um rei nasce da pressão filisteia. Saul reina a partir da serra. Davi começa em Hebrom e toma Jerusalém, uma cidade jebusita fora da Via Maris. A escolha é política: uma capital que não pertencia a nenhuma tribo e que não paga pedágio na estrada internacional.",
      "Com Salomão o reino ganha templo, obras e frota em Eziom-Geber. Tiro entra como parceira de cedro e de ofício. O reino unido é curto na conta de estudo, cerca de 1050 a 930 a.C. No fim, o mapa já está pronto para se partir.",
      "As datas da monarquia também são aproximações. O que o mapa segura é a geografia: Hebrom primeiro, Jerusalém depois, Megido e Hazor como fortalezas da estrada, o Neguebe como borda sul.",
    ],
    mapNote:
      "Israel aparece como um reino só, de Dã a Berseba. Filístia continua na costa. Aram já está em Damasco.",
    readings: ["1 Samuel", "2 Samuel", "1 Reis 1–11"],
    governmentSlugs: ["israel-unido", "filisteus", "aram"],
  },
  {
    id: "dividido",
    order: 5,
    name: "Reinos divididos",
    centuries: "cerca de 930–722 a.C.",
    summary:
      "Israel ao norte, Judá ao sul. A estrada grande fica com o norte. A Assíria sobe pelo horizonte até apagar Samaria.",
    paragraphs: [
      "O cisma, por volta de 930 a.C., corta o mapa em dois. O norte tem mais povo, mais trigo e a Via Maris. A capital anda de Siquém a Tirza e, com Onri, sobe a Samaria. Judá fica na serra, menor, em volta de Jerusalém, mais longe da estrada e mais perto do templo.",
      "Aram-Damasco é o poder regional que Israel enfrenta antes dos impérios do rio. No século IX a estela de Mesa, em terra de Moabe, já nomeia Israel. Elias enfrenta o culto de corte no norte. No século VIII a Assíria deixa de ser notícia distante.",
      "722 a.C. é a data em que Samaria cai. O reino do norte acaba. Judá fica, tributária. O mapa deste período mostra os dois reinos ainda de pé e a Assíria no seu chão, entre Assur e Nínive — o coração do império, não o império inteiro desenhado por cima do Levante.",
    ],
    mapNote:
      "Dois verdes na serra e na colina: Israel e Judá. A Assíria é o rótulo grande do leste. A Via Maris explica por que o norte cai primeiro.",
    readings: ["1 Reis 12–22", "2 Reis 1–17", "Amós", "Oseias"],
    governmentSlugs: ["israel-norte", "juda", "aram", "assiria"],
  },
  {
    id: "exilio",
    order: 6,
    name: "Exílio",
    centuries: "597 e 586, até 539 a.C.",
    summary:
      "Nabucodonosor leva a corte, queima o templo e desloca o centro da vida de Judá para a beira dos canais da Babilônia.",
    paragraphs: [
      "Judá sobrevive à Assíria e não sobrevive à Babilônia. Em 701 a.C. Senaqueribe está diante de Jerusalém e a cidade não cai. Em 597 Nabucodonosor leva o rei. Em 586 o templo queima. O mapa político de Judá se apaga.",
      "O lugar do profeta muda. Ezequiel vê junto ao rio Quebar, não nas cinzas do monte. Jeremias fica entre a cidade, Mispá e um grupo que foge ao Egito. Daniel está na corte. A Babilônia, aqui, é a terra do sul da Mesopotâmia — a planície dos canais, não um círculo sobre o mundo.",
      "Nínive já caiu em 612 a.C. Por isso a Assíria não ocupa mais esta placa. Edom permanece na serra, vizinho que o livro de Obadias não perdoa. O Egito continua sendo o refúgio amargo de quem não aceita a Babilônia.",
    ],
    mapNote:
      "O rótulo grande é Babilônia. Jerusalém continua no mapa como a cidade destruída, não como capital de um reino.",
    readings: ["2 Reis 24–25", "Jeremias", "Ezequiel", "Lamentações"],
    governmentSlugs: ["babilonia", "juda", "egito"],
  },
  {
    id: "persia",
    order: 7,
    name: "Retorno e Pérsia",
    centuries: "539–330 a.C. no Levante",
    summary:
      "Ciro abre o retorno. Yehud é uma província pequena em volta de Jerusalém, com templo e sem rei.",
    paragraphs: [
      "Em 539 a.C. a Pérsia toma a Babilônia. O edito de Ciro, lido no fecho de Crônicas e no começo de Esdras, deixa o povo voltar e reconstruir o templo. Por volta de 516 a.C. o segundo templo está de pé. Não há trono de Davi ao lado.",
      "Yehud cabe numa mancha em volta de Jerusalém. O governador, não o rei, é a autoridade local. Neemias reconstrói o muro. Esdras lê a lei em praça. O império que torna isso possível tem centros fora desta placa: Pasárgada, Ecbátana, Susã, Persépolis. O mapa não desenha a Pérsia por cima do Levante.",
      "A volta percorre de novo o arco, da Babilônia a Jerusalém. Ester olha o mesmo império de dentro da corte, sem mencionar a cidade. Ageu, Zacarias e Malaquias falam da província, não do reino de Salomão.",
    ],
    mapNote:
      "Yehud é pequena de propósito. A linha tracejada é a volta, não a fronteira do império. A Pérsia não vira um círculo no mapa.",
    readings: ["Esdras", "Neemias", "Ageu", "Zacarias"],
    governmentSlugs: ["persia", "babilonia"],
  },
];

export function getEra(id: string): Era | undefined {
  return eras.find((era) => era.id === id);
}
