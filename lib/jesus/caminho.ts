import { region } from "@/lib/historia/regions";
import type { JesusEpisode } from "@/lib/jesus/types";

/** A subida a Jerusalém: festas, Pereia, Jericó e Betânia. */
export const caminhoEpisodes: JesusEpisode[] = [
  {
    slug: "caminho-para-jerusalem",
    part: "caminho",
    title: "O caminho para Jerusalém: Pereia, Jericó, Zaqueu e Bartimeu",
    ref: "Lc 9:51–19:28; Mc 10; Mt 19–20; Jo 7–10",
    gospels: { Mateus: "19:1–20:34", Marcos: "10:1–52", Lucas: "9:51–19:28", João: "7:1–10:42" },
    date: "outono de 29 a primavera de 30 d.C. (ou 32–33)",
    year: 30,
    summary:
      "“Manifestou o firme propósito de ir a Jerusalém.” Uma aldeia samaritana não o recebe. Lucas reúne nessa longa viagem as parábolas do bom samaritano, do filho pródigo e do rico e Lázaro. João conta as idas às festas dos Tabernáculos e da Dedicação. Jesus atravessa para o outro lado do Jordão, na Pereia, e sobe por Jericó, onde cura o cego Bartimeu e se hospeda na casa de Zaqueu, chefe dos publicanos.",
    context: [
      "Mateus e Marcos dizem que Jesus foi “para os confins da Judeia, além do Jordão” (Mc 10:1), isto é, a Pereia de Antipas. Foi ali, segundo João 10:40, “onde João batizara no princípio”, que ele ficou antes da última semana.",
      "A Jericó do tempo de Jesus era sobretudo a cidade nova de Herodes, junto à saída do Wadi Qelt: palácios de inverno com jardins, piscinas e hipódromo, a um quilômetro e meio da Jericó antiga. Era rica por causa das tamareiras e do bálsamo. Os Evangelhos variam: Marcos e Lucas falam de um cego, Mateus de dois; Marcos “ao sair de Jericó”, Lucas “ao aproximar-se”, o que talvez se explique pelas duas Jericós.",
      "A subida de Jericó (250 m abaixo do nível do mar) a Jerusalém (750 m acima) tem uns 25 km e 1.000 m de desnível, pelo deserto: é o cenário da parábola do bom samaritano (Lc 10:30).",
      "Na festa da Dedicação (Hanucá), no inverno, Jesus anda no Pórtico de Salomão (Jo 10:22–23); é ali também que tentam apedrejá-lo.",
    ],
    stops: [
      { siteId: "cafarnaum", title: "“Firme propósito”", date: "", kind: "cidade", text: "Jesus deixa a Galileia pela última vez. “Ai de ti, Corazim! Ai de ti, Betsaida!”", refs: "Lc 9:51; 10:13–15; Mt 19:1" },
      { siteId: "ginae", title: "Uma aldeia samaritana", date: "", kind: "evento", text: "Não o recebem, “porque o seu rosto estava voltado para Jerusalém”. Tiago e João querem fogo do céu; Jesus os repreende. Lucas não dá o nome da aldeia; Ginae, na entrada da Samaria, é onde Josefo conta um choque entre samaritanos e peregrinos galileus.", refs: "Lc 9:52–56; Josefo, Antiguidades 20.118" },
      { siteId: "templo-herodes", title: "Tabernáculos e Dedicação", date: "out. e dez.", kind: "santuario", text: "“Se alguém tem sede, venha a mim e beba.” “Eu sou a luz do mundo.” “Eu sou o bom pastor.” No Pórtico de Salomão, “eu e o Pai somos um”.", refs: "Jo 7:2–10:39" },
      { siteId: "siloe", title: "O cego de nascença e Siloé", date: "", kind: "evento", text: "Jesus unta com lodo os olhos de um cego: “Vai, lava-te no tanque de Siloé.”", refs: "Jo 9:1–41", archaeology: "O tanque de Siloé do período herodiano, com degraus, foi descoberto por acaso em 2004 e está sendo escavado desde então." },
      { siteId: "betabara", title: "Além do Jordão", date: "inverno", kind: "cidade", text: "“Retirou-se outra vez para além do Jordão, para o lugar onde João tinha primeiramente batizado, e ali ficou.” Ensina sobre o divórcio e abençoa as crianças; o jovem rico vai embora triste.", refs: "Jo 10:40–42; Mc 10:1–31" },
      { siteId: "jerico-herodes", title: "Bartimeu", date: "dias antes da Páscoa", kind: "evento", text: "“Jesus, Filho de Davi, tem misericórdia de mim!” “Vai, a tua fé te salvou.”", refs: "Mc 10:46–52; Mt 20:29–34; Lc 18:35–43", archaeology: "Palácios de Herodes em Tulul Abu el-Alayiq, escavados por Ehud Netzer: salões, piscinas, jardins e banhos romanos." },
      { siteId: "jerico", title: "Zaqueu no sicômoro", date: "", kind: "evento", text: "Pequeno de estatura, sobe num sicômoro. “Zaqueu, desce depressa, pois hoje me convém pousar em tua casa.” “Hoje houve salvação nesta casa.”", refs: "Lc 19:1–10" },
      { siteId: "betania", title: "Para Betânia", date: "seis dias antes da Páscoa", kind: "cidade", text: "A subida pelo deserto até Betânia, a casa de Marta, Maria e Lázaro.", refs: "Jo 12:1; Lc 10:30" },
    ],
    routes: [
      { label: "Lucas 9: pela Samaria", side: "jesus", path: ["cafarnaum", "hattin", "tabor", "ginae"], dashed: true },
      { label: "Pela Pereia (caminho provável)", side: "jesus", path: ["cafarnaum", "tiberiades", "bete-sea", "pela", [35.6, 32.15], [35.58, 31.95], "betabara"], dashed: true },
      { label: "Subida de Jericó a Betânia", side: "jesus", path: ["betabara", "jerico", "jerico-herodes", [35.38, 31.82], [35.3, 31.79], "betania"] },
    ],
    areas: [
      { label: "Galileia de Antipas", side: "antipas", polygon: region.galileia },
      { label: "Pereia de Antipas", side: "antipas", polygon: region.pereia },
      { label: "Judeia e Samaria (Pilatos)", side: "roma", polygon: region.judeiaRomana },
      { label: "Decápolis", side: "decapolis", polygon: region.decapolis },
    ],
    labels: [
      { text: "GALILEIA", lng: 35.32, lat: 32.88, kind: "regiao" },
      { text: "SAMARIA", lng: 35.2, lat: 32.25, kind: "regiao" },
      { text: "JUDEIA", lng: 35.05, lat: 31.6, kind: "regiao" },
      { text: "PEREIA", lng: 35.72, lat: 31.95, kind: "regiao" },
      { text: "Jordão", lng: 35.56, lat: 32.2, kind: "rio" },
      { text: "Mar Salgado", lng: 35.48, lat: 31.5, kind: "mar" },
    ],
    bounds: [34.95, 31.6, 35.9, 32.95],
    caveat: "Lucas organiza a viagem por temas; a ordem exata dos deslocamentos e o caminho pela Pereia são reconstruções.",
  },
  {
    slug: "lazaro-em-betania",
    part: "caminho",
    title: "Lázaro em Betânia e a unção de Maria",
    ref: "Jo 11:1–12:11; Lc 10:38–42; Mc 14:3–9",
    gospels: { Mateus: "26:6–13", Marcos: "14:3–9", Lucas: "10:38–42", João: "11:1–12:11" },
    date: "inverno e Páscoa de 30 d.C. (ou 33)",
    year: 30,
    summary:
      "Marta e Maria mandam dizer que Lázaro, o amigo de Jesus, está doente. Jesus chega quando ele está no túmulo há quatro dias. “Eu sou a ressurreição e a vida.” Jesus chora; manda tirar a pedra: “Lázaro, vem para fora!” O Sinédrio decide matá-lo, e ele se retira para Efraim, perto do deserto. Seis dias antes da Páscoa, num jantar em Betânia, Maria unge os seus pés com nardo puro.",
    context: [
      "Betânia ficava “a quinze estádios” de Jerusalém (Jo 11:18), uns 3 km, na encosta leste do Monte das Oliveiras, onde começa o deserto. Hoje é al-Eizariya, nome árabe derivado de Lazarion, “o lugar de Lázaro”.",
      "Caifás, sumo sacerdote: “Convém que um homem morra pelo povo, e que não pereça toda a nação.” O medo era uma intervenção romana: “Virão os romanos e tirarão o nosso lugar e a nação” (Jo 11:48–50).",
      "Marcos e Mateus contam a unção na casa de Simão, o leproso, dois dias antes da Páscoa, com o perfume derramado sobre a cabeça; João põe Maria ungindo os pés seis dias antes. O nardo vinha da Índia; trezentos denários eram quase um ano de salário de um trabalhador.",
    ],
    stops: [
      { siteId: "betabara", title: "A notícia além do Jordão", date: "", kind: "cidade", text: "“Senhor, eis que está enfermo aquele que tu amas.” Jesus espera dois dias.", refs: "Jo 10:40; 11:1–16" },
      { siteId: "betania", title: "“Lázaro, vem para fora!”", date: "quatro dias depois", kind: "evento", text: "“Eu sou a ressurreição e a vida.” Jesus chora. O morto sai, com as mãos e os pés ligados.", refs: "Jo 11:17–44", archaeology: "O “túmulo de Lázaro” mostrado em al-Eizariya é venerado desde o século 4 (Eusébio, peregrino de Bordéus); a igreja atual é de Barluzzi (1954)." },
      { siteId: "templo-herodes", title: "O Sinédrio decide", date: "", kind: "evento", text: "“Desde aquele dia, consultavam-se para o matarem.”", refs: "Jo 11:45–53" },
      { siteId: "efraim", title: "Retiro em Efraim", date: "", kind: "cidade", text: "Jesus vai para “uma cidade chamada Efraim”, perto do deserto, e fica ali com os discípulos.", refs: "Jo 11:54", archaeology: "Geralmente identificada com Taybeh, 20 km a nordeste de Jerusalém." },
      { siteId: "betania", title: "O nardo puro", date: "seis dias antes da Páscoa", kind: "evento", text: "Marta serve; Maria unge os pés de Jesus e os enxuga com os cabelos. Judas reclama do desperdício. “Ela guardou isto para o dia da minha sepultura.”", refs: "Jo 12:1–8; Mc 14:3–9; Mt 26:6–13" },
    ],
    routes: [
      { label: "Do Jordão a Betânia", side: "jesus", path: ["betabara", "jerico", [35.38, 31.82], "betania"] },
      { label: "Retiro em Efraim e volta", side: "jesus", path: ["betania", "efraim", [35.38, 31.86], "jerico", "betania"], dashed: true },
    ],
    areas: [
      { label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana },
      { label: "Pereia de Antipas", side: "antipas", polygon: region.pereia },
    ],
    labels: [
      { text: "Deserto da Judeia", lng: 35.35, lat: 31.7, kind: "regiao" },
      { text: "Jordão", lng: 35.56, lat: 31.95, kind: "rio" },
      { text: "Mar Salgado", lng: 35.5, lat: 31.62, kind: "mar" },
    ],
    bounds: [35.15, 31.65, 35.65, 32.02],
  },
];
