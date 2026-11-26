import { kings } from "@/lib/reis";

export type Lane = "israel" | "juda" | "profetas" | "assiria" | "babilonia" | "egito" | "persia" | "grecia" | "outros";

export const lanes: { id: Lane; label: string; color: string }[] = [
  { id: "israel", label: "Israel (norte)", color: "#8fd0b4" },
  { id: "juda", label: "Judá", color: "#e4c78a" },
  { id: "profetas", label: "Profetas", color: "#f4eee6" },
  { id: "assiria", label: "Assíria", color: "#e0645a" },
  { id: "babilonia", label: "Babilônia", color: "#7eb0e0" },
  { id: "egito", label: "Egito", color: "#c9a0dc" },
  { id: "persia", label: "Média e Pérsia", color: "#9fd1a0" },
  { id: "grecia", label: "Gregos e helenísticos", color: "#a9b8f0" },
  { id: "outros", label: "Arã, Fenícia, Filístia, Moabe", color: "#f0a35e" },
];

export type Reign = { lane: Lane; name: string; start: number; end: number; note?: string };

/** Reis de Israel e Judá vêm de lib/reis (Thiele). Antes da divisão, o reino unido aparece nas duas faixas. */
const hebrewReigns: Reign[] = kings.flatMap((king): Reign[] => {
  if (king.kingdom === "unido") {
    return [
      { lane: "israel", name: king.name, start: king.start, end: king.end },
      { lane: "juda", name: king.name, start: king.start, end: king.end },
    ];
  }
  return [{ lane: king.kingdom, name: king.name, start: king.start, end: king.end }];
});

/** Datas dos impérios: cronologias padrão (aprox.). Egito do Terceiro Período Intermediário com margem de alguns anos. */
export const reigns: Reign[] = [
  ...hebrewReigns,
  { lane: "juda", name: "Governadores persas (Zorobabel, Neemias…)", start: 538, end: 332 },
  { lane: "juda", name: "Sumos sacerdotes sob ptolomeus e selêucidas", start: 332, end: 167 },
  { lane: "profetas", name: "Samuel", start: 1070, end: 1015 },
  { lane: "profetas", name: "Natã e Gade", start: 1010, end: 965 },
  { lane: "profetas", name: "Aías de Siló", start: 935, end: 910 },
  { lane: "profetas", name: "Elias", start: 870, end: 848 },
  { lane: "profetas", name: "Eliseu", start: 850, end: 795 },
  { lane: "profetas", name: "Jonas", start: 790, end: 770 },
  { lane: "profetas", name: "Amós", start: 765, end: 755 },
  { lane: "profetas", name: "Oseias", start: 755, end: 715 },
  { lane: "profetas", name: "Isaías", start: 740, end: 686 },
  { lane: "profetas", name: "Miqueias", start: 735, end: 700 },
  { lane: "profetas", name: "Naum", start: 663, end: 612 },
  { lane: "profetas", name: "Sofonias", start: 635, end: 620 },
  { lane: "profetas", name: "Jeremias", start: 627, end: 580 },
  { lane: "profetas", name: "Habacuque", start: 609, end: 598 },
  { lane: "profetas", name: "Daniel", start: 605, end: 536 },
  { lane: "profetas", name: "Ezequiel", start: 593, end: 571 },
  { lane: "profetas", name: "Ageu e Zacarias", start: 520, end: 515 },
  { lane: "profetas", name: "Malaquias", start: 460, end: 430 },
  { lane: "assiria", name: "Assurnasirpal II", start: 883, end: 859 },
  { lane: "assiria", name: "Salmanasar III", start: 859, end: 824 },
  { lane: "assiria", name: "Adad-nirari III", start: 811, end: 783 },
  { lane: "assiria", name: "Tiglate-Pileser III", start: 745, end: 727 },
  { lane: "assiria", name: "Salmanasar V", start: 727, end: 722 },
  { lane: "assiria", name: "Sargão II", start: 722, end: 705 },
  { lane: "assiria", name: "Senaqueribe", start: 705, end: 681 },
  { lane: "assiria", name: "Esar-Hadom", start: 681, end: 669 },
  { lane: "assiria", name: "Assurbanipal", start: 669, end: 631 },
  { lane: "assiria", name: "Últimos reis", start: 631, end: 609 },
  { lane: "babilonia", name: "Merodaque-Baladã II", start: 722, end: 710 },
  { lane: "babilonia", name: "Nabopolassar", start: 626, end: 605 },
  { lane: "babilonia", name: "Nabucodonosor II", start: 605, end: 562 },
  { lane: "babilonia", name: "Evil-Merodaque", start: 562, end: 560 },
  { lane: "babilonia", name: "Neriglissar", start: 560, end: 556 },
  { lane: "babilonia", name: "Nabonido (Belsazar regente)", start: 556, end: 539 },
  { lane: "egito", name: "Siamun (21ª din.)", start: 986, end: 967 },
  { lane: "egito", name: "Sheshonq I", start: 943, end: 922 },
  { lane: "egito", name: "Osorkon II", start: 872, end: 837 },
  { lane: "egito", name: "Dinastia cuxita (25ª)", start: 744, end: 656 },
  { lane: "egito", name: "Taharqa", start: 690, end: 664 },
  { lane: "egito", name: "Psamético I", start: 664, end: 610 },
  { lane: "egito", name: "Neco II", start: 610, end: 595 },
  { lane: "egito", name: "Psamético II", start: 595, end: 589 },
  { lane: "egito", name: "Apriés (Hofra)", start: 589, end: 570 },
  { lane: "egito", name: "Amásis", start: 570, end: 526 },
  { lane: "egito", name: "Domínio persa", start: 525, end: 404 },
  { lane: "egito", name: "Ptolomeus", start: 305, end: 160 },
  { lane: "persia", name: "Ciaxares (medos)", start: 625, end: 585 },
  { lane: "persia", name: "Ciro II", start: 559, end: 530 },
  { lane: "persia", name: "Cambises II", start: 530, end: 522 },
  { lane: "persia", name: "Dario I", start: 522, end: 486 },
  { lane: "persia", name: "Xerxes I (Assuero)", start: 486, end: 465 },
  { lane: "persia", name: "Artaxerxes I", start: 465, end: 424 },
  { lane: "persia", name: "Últimos aquemênidas", start: 424, end: 330 },
  { lane: "grecia", name: "Filipe II", start: 359, end: 336 },
  { lane: "grecia", name: "Alexandre", start: 336, end: 323 },
  { lane: "grecia", name: "Ptolomeus no domínio da Judeia", start: 301, end: 200 },
  { lane: "grecia", name: "Antíoco III", start: 222, end: 187 },
  { lane: "grecia", name: "Antíoco IV Epífanes", start: 175, end: 164 },
  { lane: "outros", name: "Hirão I de Tiro", start: 980, end: 947 },
  { lane: "outros", name: "Etbaal de Sidom (pai de Jezabel)", start: 887, end: 856 },
  { lane: "outros", name: "Hadadezer / Ben-Hadade (Damasco)", start: 880, end: 842 },
  { lane: "outros", name: "Hazael (Damasco)", start: 842, end: 800 },
  { lane: "outros", name: "Mesa (Moabe)", start: 850, end: 830 },
  { lane: "outros", name: "Rezim (Damasco)", start: 750, end: 732 },
];

export type TimelineEvent = {
  year: number;
  lane: Lane;
  title: string;
  text?: string;
  ref?: string;
  war?: string;
  episode?: string;
  /** Explicação quando a data é discutida. */
  debated?: string;
};

export const events: TimelineEvent[] = [
  { year: 1060, lane: "outros", title: "Filisteus vencem em Afeque e tomam a arca", ref: "1 Sm 4", war: "afeque-ebenezer", episode: "arca-entre-os-filisteus" },
  { year: 1050, lane: "israel", title: "Saul ungido; libertação de Jabes-Gileade", ref: "1 Sm 10–11", war: "jabes-gileade", episode: "saul-e-jabes-gileade", debated: "As datas de Saul são muito aproximadas; o número de anos em 1 Sm 13:1 está corrompido no texto hebraico." },
  { year: 1040, lane: "israel", title: "Jônatas em Micmás", ref: "1 Sm 13–14", war: "micmas", episode: "micmas" },
  { year: 1020, lane: "juda", title: "Davi e Golias no vale de Elá", ref: "1 Sm 17", war: "ela", episode: "davi-e-golias" },
  { year: 1015, lane: "juda", title: "Davi fugitivo no deserto de Judá", ref: "1 Sm 19–27", episode: "davi-fugitivo" },
  { year: 1010, lane: "israel", title: "Gilboa: morte de Saul", ref: "1 Sm 31", war: "gilboa", episode: "gilboa" },
  { year: 1008, lane: "juda", title: "Davi rei em Hebrom; guerra com Isbosete", ref: "2 Sm 2–4", war: "guerra-civil", episode: "hebrom-e-a-guerra-civil" },
  { year: 1003, lane: "juda", title: "Jerusalém conquistada", ref: "2 Sm 5", war: "refaim", episode: "jerusalem-conquistada" },
  { year: 1000, lane: "juda", title: "A arca sobe a Jerusalém", ref: "2 Sm 6", episode: "a-arca-sobe-a-jerusalem" },
  { year: 995, lane: "outros", title: "Davi vence Zobá, Damasco, Moabe e Edom", ref: "2 Sm 8", war: "guerras-davi", episode: "guerras-de-davi" },
  { year: 990, lane: "outros", title: "Cerco de Rabá dos amonitas", ref: "2 Sm 11–12", war: "raba", episode: "guerras-de-davi" },
  { year: 980, lane: "juda", title: "Revolta de Absalão", ref: "2 Sm 15–18", war: "absalao", episode: "absalao" },
  { year: 966, lane: "juda", title: "Início da construção do Templo", ref: "1 Rs 6:1", episode: "reino-de-salomao", debated: "1 Rs 6:1 data no 4º ano de Salomão; o ano absoluto depende da cronologia (Thiele: 966)." },
  { year: 960, lane: "outros", title: "Hirão de Tiro manda cedro e artesãos", ref: "1 Rs 5", episode: "reino-de-salomao" },
  { year: 931, lane: "israel", title: "Divisão do reino: Jeroboão I rei em Siquém", ref: "1 Rs 12", episode: "divisao-do-reino" },
  { year: 925, lane: "egito", title: "Sheshonq I (Sisaque) invade Judá e Israel", ref: "1 Rs 14:25", war: "sisaque", episode: "campanha-de-sisaque", debated: "Entre c. 926 e 917 a.C., conforme a cronologia egípcia." },
  { year: 895, lane: "juda", title: "Asa contra Baasa; Ben-Hadade ataca o norte de Israel", ref: "1 Rs 15:16–22", war: "israel-juda", episode: "divisao-do-reino" },
  { year: 880, lane: "israel", title: "Onri funda Samaria", ref: "1 Rs 16:24" },
  { year: 853, lane: "assiria", title: "Qarqar: Salmanasar III contra a coalizão de Acabe e Damasco", ref: "Monólito de Kurkh", war: "qarqar", episode: "qarqar" },
  { year: 853, lane: "israel", title: "Acabe morre em Ramote-Gileade", ref: "1 Rs 22", war: "ramote-gileade", episode: "qarqar" },
  { year: 850, lane: "outros", title: "Mesa de Moabe se rebela", ref: "2 Rs 3; Estela de Mesa", war: "mesa", episode: "mesa-de-moabe" },
  { year: 841, lane: "israel", title: "Revolta de Jeú; tributo a Salmanasar III", ref: "2 Rs 9–10; Obelisco Negro", war: "jeu-hazael", episode: "revolta-de-jeu" },
  { year: 841, lane: "juda", title: "Atalia toma o trono de Judá", ref: "2 Rs 11" },
  { year: 830, lane: "outros", title: "Hazael toma Gate e ameaça Jerusalém", ref: "2 Rs 12:17–18", war: "jeu-hazael", debated: "Data aproximada; a destruição de Gate (Tell es-Safi) é datada do fim do século 9 a.C." },
  { year: 790, lane: "juda", title: "Bete-Semes: Jeoás de Israel derrota Amazias", ref: "2 Rs 14:8–14", war: "bete-semes" },
  { year: 760, lane: "israel", title: "Auge de Jeroboão II; Amós e Oseias", ref: "2 Rs 14:23–29; Am 1:1" },
  { year: 740, lane: "profetas", title: "Isaías vê o Senhor no Templo", ref: "Is 6:1", debated: "“No ano da morte do rei Uzias”: c. 740 a.C." },
  { year: 734, lane: "juda", title: "Guerra siro-efraimita; Isaías e Acaz", ref: "2 Rs 16; Is 7", war: "siro-efraimita", episode: "tiglate-pileser-e-a-guerra-siro-efraimita" },
  { year: 732, lane: "assiria", title: "Tiglate-Pileser III toma Damasco e a Galileia", ref: "2 Rs 15:29; 16:9", war: "tiglate-pileser", episode: "tiglate-pileser-e-a-guerra-siro-efraimita" },
  { year: 722, lane: "israel", title: "Queda de Samaria; fim do reino de Israel", ref: "2 Rs 17", war: "samaria-722", episode: "queda-de-samaria", debated: "722 (Salmanasar V) ou 720 (Sargão II)." },
  { year: 712, lane: "assiria", title: "Sargão II toma Asdode", ref: "Is 20:1" },
  { year: 701, lane: "assiria", title: "Senaqueribe: Laquis e o bloqueio de Jerusalém", ref: "2 Rs 18–19; Prisma de Senaqueribe", war: "senaqueribe-701", episode: "senaqueribe-701" },
  { year: 701, lane: "juda", title: "Ezequias: túnel de Siloé e Muro Largo", ref: "2 Rs 20:20; Is 22", episode: "senaqueribe-701" },
  { year: 701, lane: "profetas", title: "Isaías: “Ele não entrará nesta cidade”", ref: "Is 37:33–35", episode: "senaqueribe-701" },
  { year: 701, lane: "egito", title: "Exército egípcio e cuxita vencido em Elteque", ref: "2 Rs 19:9", episode: "senaqueribe-701" },
  { year: 681, lane: "assiria", title: "Senaqueribe assassinado pelos filhos", ref: "2 Rs 19:37" },
  { year: 671, lane: "assiria", title: "Esar-Hadom conquista o Egito (Mênfis)", ref: "Is 19–20 (contexto)" },
  { year: 663, lane: "assiria", title: "Assurbanipal saqueia Tebas (Nô-Amom)", ref: "Na 3:8–10" },
  { year: 622, lane: "juda", title: "Josias acha o livro da Lei e faz a reforma", ref: "2 Rs 22–23" },
  { year: 612, lane: "babilonia", title: "Queda de Nínive diante de babilônios e medos", ref: "Naum", war: "ninive-612", episode: "megido-609" },
  { year: 609, lane: "juda", title: "Josias morto em Megido por Neco II", ref: "2 Rs 23:29", war: "megido-609", episode: "megido-609" },
  { year: 609, lane: "egito", title: "Neco II no Eufrates; fracasso em Harã", ref: "Crônica Babilônica", war: "megido-609", episode: "megido-609" },
  { year: 605, lane: "babilonia", title: "Carquemis: Nabucodonosor vence o Egito", ref: "Jr 46:2", war: "carquemis-605", episode: "carquemis-605" },
  { year: 605, lane: "profetas", title: "Daniel levado a Babilônia", ref: "Dn 1:1–6", episode: "carquemis-605" },
  { year: 604, lane: "outros", title: "Babilônia destrói Ascalom", ref: "Jr 47", episode: "carquemis-605" },
  { year: 597, lane: "juda", title: "Primeiro cerco: Joaquim e Ezequiel deportados", ref: "2 Rs 24:10–17", war: "jerusalem-597", episode: "cercos-de-jerusalem" },
  { year: 593, lane: "profetas", title: "Ezequiel chamado junto ao rio Quebar", ref: "Ez 1:1–3" },
  { year: 586, lane: "juda", title: "Queda de Jerusalém; o Templo queimado", ref: "2 Rs 25", war: "jerusalem-586", episode: "cercos-de-jerusalem", debated: "587 ou 586 a.C., conforme a contagem dos anos de Zedequias." },
  { year: 586, lane: "profetas", title: "Jeremias fica com Gedalias em Mispá", ref: "Jr 40", episode: "cercos-de-jerusalem" },
  { year: 585, lane: "babilonia", title: "Cerco de Tiro por Nabucodonosor (13 anos)", ref: "Ez 26–29", debated: "Josefo dá 13 anos; início c. 586–585 a.C." },
  { year: 582, lane: "egito", title: "Fuga de judeus para Tafnes, com Jeremias", ref: "Jr 43", episode: "cercos-de-jerusalem" },
  { year: 573, lane: "profetas", title: "Visão do novo Templo", ref: "Ez 40:1" },
  { year: 561, lane: "babilonia", title: "Joaquim liberto por Evil-Merodaque", ref: "2 Rs 25:27", episode: "cercos-de-jerusalem" },
  { year: 539, lane: "persia", title: "Ciro toma Babilônia", ref: "Dn 5; Cilindro de Ciro" },
  { year: 538, lane: "juda", title: "Decreto de Ciro; primeiro retorno", ref: "Ed 1" },
  { year: 515, lane: "juda", title: "Segundo Templo concluído", ref: "Ed 6:15" },
  { year: 480, lane: "persia", title: "Xerxes invade a Grécia (Salamina)", ref: "Et 1 (contexto)" },
  { year: 458, lane: "juda", title: "Esdras chega a Jerusalém", ref: "Ed 7", debated: "7º ano de Artaxerxes I (458); alguns preferem Artaxerxes II (398)." },
  { year: 445, lane: "juda", title: "Neemias reconstrói os muros", ref: "Ne 2; 6:15" },
  { year: 333, lane: "grecia", title: "Alexandre vence Dario III em Isso", ref: "Dn 8:5–8" },
  { year: 332, lane: "grecia", title: "Alexandre toma Tiro e Gaza", ref: "Zc 9:1–4 (contexto)" },
  { year: 323, lane: "grecia", title: "Morte de Alexandre; o império dividido", ref: "Dn 8:8; 11:4" },
  { year: 301, lane: "grecia", title: "Batalha de Ipso; a Judeia fica com os ptolomeus", ref: "Dn 11:5" },
  { year: 200, lane: "grecia", title: "Pânion: Antíoco III toma a Judeia dos ptolomeus", ref: "Dn 11:15–16" },
  { year: 167, lane: "grecia", title: "Antíoco IV profana o Templo; revolta dos macabeus", ref: "Dn 11:31; 1 Mc 1–2" },
  { year: 164, lane: "juda", title: "Judas Macabeu purifica o Templo (Hanucá)", ref: "1 Mc 4:36–59" },
];

/** Grandes sincronismos, momentos em que várias faixas se cruzam. */
export const synchronisms: { year: string; title: string; text: string; episode?: string }[] = [
  {
    year: "853 a.C.",
    title: "Acabe em Qarqar e em Ramote-Gileade",
    text: "No mesmo ano, Acabe luta ao lado de Damasco contra a Assíria e depois contra Damasco por Ramote-Gileade, onde morre. Elias e Micaías são os profetas da corte; Josafá reina em Judá.",
    episode: "qarqar",
  },
  {
    year: "841 a.C.",
    title: "Jeú, Hazael, Atalia e Salmanasar III",
    text: "Jeú mata os reis de Israel e Judá; Atalia usurpa o trono em Jerusalém; Hazael pressiona do norte; Jeú se ajoelha diante de Salmanasar III no Obelisco Negro.",
    episode: "revolta-de-jeu",
  },
  {
    year: "734–732 a.C.",
    title: "Isaías, Acaz, Peca, Rezim e Tiglate-Pileser III",
    text: "Damasco e Samaria cercam Jerusalém; Isaías anuncia o Emanuel; Acaz compra a Assíria, que engole Damasco e a Galileia.",
    episode: "tiglate-pileser-e-a-guerra-siro-efraimita",
  },
  {
    year: "722 a.C.",
    title: "Samaria cai; Isaías, Miqueias e Oseias",
    text: "O norte é deportado enquanto Ezequias começa a reinar em Judá e Isaías e Miqueias pregam em Jerusalém.",
    episode: "queda-de-samaria",
  },
  {
    year: "701 a.C.",
    title: "Isaías, Ezequias, Senaqueribe e Taharqa",
    text: "A Assíria arrasa Laquis; Ezequias fecha Jerusalém, cava o túnel e ora; Isaías anuncia a retirada; um exército egípcio e cuxita é vencido em Elteque.",
    episode: "senaqueribe-701",
  },
  {
    year: "612–609 a.C.",
    title: "Naum, Josias, Neco e Nabopolassar",
    text: "Nínive cai como Naum anunciara; Josias morre em Megido barrando Neco, que corre ao Eufrates para socorrer o que restava da Assíria. Jeremias e Sofonias pregam em Judá.",
    episode: "megido-609",
  },
  {
    year: "605 a.C.",
    title: "Carquemis, Jeremias 46 e Daniel 1",
    text: "Nabucodonosor vence o Egito e assume o trono; Jeremias escreve o oráculo da batalha e dita o rolo a Baruque (Jr 36); Daniel e seus amigos são levados a Babilônia.",
    episode: "carquemis-605",
  },
  {
    year: "597–571 a.C.",
    title: "Jeremias em Jerusalém, Ezequiel no Quebar, Daniel na corte",
    text: "Três profetas ao mesmo tempo, em três lugares: Jeremias escreve aos exilados (Jr 29); Ezequiel, deportado em 597, cita Daniel como justo e sábio (Ez 14:14; 28:3); Daniel serve na corte de Nabucodonosor.",
    episode: "cercos-de-jerusalem",
  },
];

export const TIMELINE_START = 1100;
export const TIMELINE_END = 160;
