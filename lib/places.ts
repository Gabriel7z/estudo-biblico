import type { Place } from "@/lib/types";

/**
 * Coordenadas do sítio, em graus decimais.
 * Mara, Elim, Pitom e Sucote são os pontos em que os atlas de estudo
 * costumam colocá-los, e o texto de cada um diz que são tradição.
 */
export const places: Place[] = [
  {
    id: "ur",
    name: "Ur",
    site: "Tell el-Muqayyar",
    lng: 46.1031,
    lat: 30.9626,
    eras: ["patriarcas"],
    blurb:
      "Cidade do sul da Mesopotâmia de onde a memória de Abraão faz o clã sair. O sítio é Tell el-Muqayyar, junto ao antigo curso do Eufrates.",
  },
  {
    id: "hara",
    name: "Harã",
    site: "Harran",
    lng: 39.0314,
    lat: 36.8631,
    eras: ["patriarcas"],
    blurb:
      "Parada do norte, na curva do arco fértil. É de Harã que Abraão segue para Canaã, e é para Harã que o servo volta buscar esposa para Isaque.",
  },
  {
    id: "damasco",
    name: "Damasco",
    site: "cidade antiga",
    lng: 36.2919,
    lat: 33.5131,
    eras: ["patriarcas", "juizes", "monarquia", "dividido", "exilio", "persia"],
    blurb:
      "Oásis no caminho entre a Mesopotâmia e o mar. Mais tarde é a capital de Aram e o fim da Via Maris e do caminho do rei.",
  },
  {
    id: "ninive",
    name: "Nínive",
    site: "Kuyunjik, Mossul",
    lng: 43.1528,
    lat: 36.3594,
    eras: ["dividido", "exilio"],
    blurb:
      "Capital assíria na margem do Tigre. Jonas é mandado para cá, e a cidade cai em 612 a.C., antes da queda de Jerusalém.",
  },
  {
    id: "assur",
    name: "Assur",
    site: "Qal'at Sherqat",
    lng: 43.2603,
    lat: 35.4572,
    eras: ["dividido", "exilio"],
    blurb:
      "A cidade que dá nome ao império, no médio Tigre. Continua sagrada depois que a corte se muda para o norte.",
  },
  {
    id: "babilonia",
    name: "Babilônia",
    site: "junto ao Eufrates",
    lng: 44.4209,
    lat: 32.5363,
    eras: ["patriarcas", "exilio", "persia"],
    blurb:
      "Cidade do Eufrates. No tempo dos patriarcas é um ponto do arco; no exílio é a corte que segura a casa de Judá.",
  },
  {
    id: "menfis",
    name: "Mênfis",
    site: "Mit Rahina",
    lng: 31.2506,
    lat: 29.8493,
    eras: ["patriarcas", "exodo"],
    blurb:
      "Capital antiga do Egito, na entrada do delta. Os patriarcas conhecem um Egito que olha para cá; o êxodo, mais tarde, se passa no leste do delta.",
  },
  {
    id: "tebas",
    name: "Tebas",
    site: "Karnak e Luxor",
    lng: 32.6573,
    lat: 25.7188,
    eras: ["exodo", "monarquia", "dividido"],
    blurb:
      "Capital religiosa do Império Novo, no sul. Fica de propósito fora da cena de Gósen: o medo do faraó e o trabalho de Israel estão no delta.",
  },
  {
    id: "rameses",
    name: "Ramessés",
    site: "Qantir, Pi-Ramessés",
    lng: 31.8378,
    lat: 30.7981,
    eras: ["exodo"],
    blurb:
      "Cidade de depósito no delta oriental e ponto de partida da saída. O sítio corresponde a Pi-Ramessés, a residência do delta perto da atual Qantir.",
  },
  {
    id: "pitom",
    name: "Pitom",
    site: "tradição de Tell er-Retabah",
    lng: 31.988,
    lat: 30.547,
    tradition: true,
    eras: ["exodo"],
    blurb:
      "Cidade de depósito nomeada com Ramessés. Os atlas de estudo costumam marcá-la em Tell er-Retabah, no uádi Tumilate. É tradição, não uma placa escavada com o nome.",
  },
  {
    id: "sucote",
    name: "Sucote",
    site: "tradição de Tell el-Maskhuta",
    lng: 32.099,
    lat: 30.553,
    tradition: true,
    eras: ["exodo"],
    blurb:
      "Primeira parada da marcha depois de Ramessés. O ponto usual dos atlas é Tell el-Maskhuta, ainda no uádi Tumilate. A identificação é tradição.",
  },
  {
    id: "mara",
    name: "Mara",
    site: "tradição de Ain Hawarah",
    lng: 32.97,
    lat: 29.3,
    tradition: true,
    eras: ["exodo"],
    blurb:
      "A primeira água depois do mar, e a água está amarga. Os atlas de estudo costumam pôr Mara em Ain Hawarah, na costa leste do golfo de Suez. É tradição.",
  },
  {
    id: "elim",
    name: "Elim",
    site: "tradição do uádi Gharandel",
    lng: 33.08,
    lat: 29.16,
    tradition: true,
    eras: ["exodo"],
    blurb:
      "Doze fontes e setenta palmeiras, o oásis que vem depois de Mara. O ponto usual é o uádi Gharandel. Também é tradição.",
  },
  {
    id: "sinai",
    name: "Sinai / Horebe",
    site: "tradição de Jebel Musa",
    lng: 33.9753,
    lat: 28.5394,
    eras: ["exodo"],
    blurb:
      "O monte da sarça e da aliança. Êxodo fala em Horebe e em Sinai; a leitura corrente trata os dois como o mesmo maciço. A placa marca a tradição do sul, Jebel Musa, não uma medição fechada.",
  },
  {
    id: "cades",
    name: "Cades-Barneia",
    site: "Ein el-Qudeirat",
    lng: 34.4408,
    lat: 30.6464,
    eras: ["exodo", "juizes"],
    blurb:
      "Oásis na borda do Neguebe de onde a terra é vista e recusada. O sítio associado pelos atlas é Ein el-Qudeirat, a maior fonte da região.",
  },
  {
    id: "eziom-geber",
    name: "Eziom-Geber",
    site: "Tell el-Kheleifeh",
    lng: 34.9803,
    lat: 29.5486,
    eras: ["exodo", "monarquia"],
    blurb:
      "No fundo do golfo de Ácaba. Na marcha, é a volta para contornar Edom. Com Salomão, vira porto.",
  },
  {
    id: "berseba",
    name: "Berseba",
    site: "Tel Beer-Sheva",
    lng: 34.8408,
    lat: 31.2448,
    eras: ["patriarcas", "juizes", "monarquia", "dividido"],
    blurb:
      "O poço do sul. Daqui até Dã se mede, mais tarde, a terra de ponta a ponta. O sítio é Tel Beer-Sheva.",
  },
  {
    id: "hebrom",
    name: "Hebrom",
    site: "Tel Rumeida",
    lng: 35.1086,
    lat: 31.5245,
    eras: ["patriarcas", "juizes", "monarquia", "dividido"],
    blurb:
      "Cidade da serra onde os patriarcas enterram os seus e onde Davi reina antes de Jerusalém. O sítio antigo é Tel Rumeida.",
  },
  {
    id: "jerusalem",
    name: "Jerusalém",
    site: "Cidade de Davi",
    lng: 35.2325,
    lat: 31.7683,
    eras: ["juizes", "monarquia", "dividido", "exilio", "persia"],
    blurb:
      "Cidade da serra, fora da grande estrada. Vira capital com Davi e sede do templo com Salomão. No exílio é a cidade queimada; na Pérsia, o centro de Yehud.",
  },
  {
    id: "jerico",
    name: "Jericó",
    site: "Tell es-Sultan",
    lng: 35.4442,
    lat: 31.8711,
    eras: ["exodo", "juizes"],
    blurb:
      "O oásis que Moisés vê do Nebo, do outro lado do Jordão. O sítio antigo é Tell es-Sultan, abaixo da cidade de hoje.",
  },
  {
    id: "betel",
    name: "Betel",
    site: "Beitin",
    lng: 35.2386,
    lat: 31.9264,
    eras: ["patriarcas", "juizes", "dividido"],
    blurb:
      "Lugar do sonho de Jacó, entre Siquém e Hebrom. No reino dividido, o norte põe aqui um santuário de corte.",
  },
  {
    id: "siquem",
    name: "Siquém",
    site: "Tell Balata",
    lng: 35.2819,
    lat: 32.2136,
    eras: ["patriarcas", "juizes", "monarquia", "dividido"],
    blurb:
      "Vale entre o Ebal e o Gerizim, a primeira parada de Abraão em Canaã e o lugar onde o reino se parte. O sítio é Tell Balata.",
  },
  {
    id: "samaria",
    name: "Samaria",
    site: "Sebaste",
    lng: 35.1917,
    lat: 32.2764,
    eras: ["dividido", "exilio"],
    blurb:
      "Capital que Onri funda no alto de um monte, no século IX a.C. Cai diante da Assíria em 722 a.C. O sítio é Sebaste.",
  },
  {
    id: "megido",
    name: "Megido",
    site: "Tel Megiddo",
    lng: 35.1847,
    lat: 32.585,
    eras: ["juizes", "monarquia", "dividido", "exilio"],
    blurb:
      "Guarda o passo entre a planície costeira e o vale de Jezreel. Quem manda em Megido manda na Via Maris. Josias morre aqui, na estrada.",
  },
  {
    id: "hazor",
    name: "Hazor",
    site: "Tel Hazor",
    lng: 35.5681,
    lat: 33.0175,
    eras: ["juizes", "monarquia", "dividido"],
    blurb:
      "A maior cidade do norte no Bronze, no caminho da Galileia para Damasco. Josué queima Hazor; Salomão a refaz como fortaleza.",
  },
  {
    id: "da",
    name: "Dã",
    site: "Tel Dan",
    lng: 35.6525,
    lat: 33.2492,
    eras: ["juizes", "monarquia", "dividido"],
    blurb:
      "A nascente do Jordão e a fronteira norte da fórmula “de Dã a Berseba”. No reino dividido, é o outro santuário do norte.",
  },
  {
    id: "gaza",
    name: "Gaza",
    site: "Gaza antiga",
    lng: 34.4656,
    lat: 31.5019,
    eras: ["exodo", "juizes", "monarquia", "dividido"],
    blurb:
      "Cidade da planície costeira, na estrada que o êxodo não toma. Mais tarde é uma das cinco cidades filisteias.",
  },
  {
    id: "ascalom",
    name: "Ascalom",
    site: "Tel Ashkelon",
    lng: 34.5461,
    lat: 31.6642,
    eras: ["juizes", "monarquia", "dividido"],
    blurb:
      "Porto da costa, ao norte de Gaza. Faz parte da faixa filisteia que segura a melhor estrada do país.",
  },
  {
    id: "tiro",
    name: "Tiro",
    site: "Tiro antiga",
    lng: 35.1961,
    lat: 33.2704,
    eras: ["monarquia", "dividido", "persia"],
    blurb:
      "Cidade fenícia numa ilha, quase. De Tiro vêm cedro e artífice para o templo de Salomão, e um porto que não depende da serra.",
  },
  {
    id: "nebo",
    name: "Nebo",
    site: "Ras es-Siyagha",
    lng: 35.7256,
    lat: 31.7672,
    eras: ["exodo"],
    blurb:
      "Cimo da serra de Abarim, em Moabe, de onde a terra se vê em faixas. A tradição aponta Ras es-Siyagha, com o vale do Jordão na frente.",
  },
  {
    id: "hesbom",
    name: "Hesbom",
    site: "Tell Hisban",
    lng: 35.8089,
    lat: 31.7992,
    eras: ["exodo", "juizes"],
    blurb:
      "Cidade do planalto, associada a Seom. A marcha chega aqui pelo lado de fora de Moabe, e não pela estrada que Edom fechou. O sítio é Tell Hisban.",
  },
  {
    id: "dibom",
    name: "Dibom",
    site: "Dhiban",
    lng: 35.7847,
    lat: 31.4989,
    eras: ["exodo", "juizes", "monarquia"],
    blurb:
      "Cidade de Moabe no caminho do rei, ao norte do Arnom. Séculos depois, a estela de Mesa sai deste chão. O sítio é Dhiban.",
  },
  {
    id: "raba",
    name: "Rabá",
    site: "cidadela de Amã",
    lng: 35.9342,
    lat: 31.9544,
    eras: ["juizes", "monarquia", "dividido"],
    blurb:
      "Capital de Amom, na nascente do Jaboque. Davi combate aqui. O sítio antigo é a cidadela de Amã.",
  },
  {
    id: "bozra",
    name: "Bozra",
    site: "Buseirah",
    lng: 35.6067,
    lat: 30.7467,
    eras: ["exodo", "juizes", "monarquia", "dividido", "exilio"],
    blurb:
      "Cidade da serra de Edom, no caminho do rei. O sítio associado é Buseirah, ao norte de Petra.",
  },
];

export function getPlace(id: string): Place | undefined {
  return places.find((place) => place.id === id);
}

export function placesInEra(era: string): Place[] {
  return places.filter((place) => place.eras.includes(era as Place["eras"][number]));
}
