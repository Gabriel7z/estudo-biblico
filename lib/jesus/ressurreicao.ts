import { region } from "@/lib/historia/regions";
import type { JesusEpisode } from "@/lib/jesus/types";

/** Da ressurreição à ascensão. */
export const ressurreicaoEpisodes: JesusEpisode[] = [
  {
    slug: "ressurreicao-e-emaus",
    image: "/historia/jesus/ressurreicao-e-emaus.webp",
    imageAlt: "Ao nascer do sol, três mulheres com frascos de especiarias encontram a pedra do túmulo rolada; dentro, um jovem de branco está sentado à direita (Mc 16:2–5).",
    part: "ressurreicao",
    title: "O túmulo vazio e o caminho de Emaús",
    ref: "Mt 28:1–15; Mc 16:1–8; Lc 24:1–49; Jo 20:1–29",
    gospels: { Mateus: "28:1–15", Marcos: "16:1–8", Lucas: "24:1–49", João: "20:1–29" },
    date: "domingo, “o primeiro dia da semana”",
    year: 30,
    summary:
      "Muito cedo, Maria Madalena e outras mulheres vão ao túmulo com aromas e encontram a pedra removida. “Por que buscais o vivente entre os mortos? Não está aqui, mas ressuscitou.” Pedro e o outro discípulo correm e veem os lençóis. Jesus aparece a Maria Madalena no jardim: “Maria!” “Rabôni!” À tarde, dois discípulos que vão a Emaús caminham com ele sem reconhecê-lo, até o partir do pão. À noite, ele aparece aos discípulos reunidos; uma semana depois, a Tomé.",
    context: [
      "Os quatro Evangelhos concordam no essencial: o túmulo vazio na madrugada de domingo e as mulheres como primeiras testemunhas, algo inesperado numa sociedade em que o testemunho feminino tinha pouco peso em tribunal. Diferem nos detalhes: quantas mulheres, quantos anjos, a ordem das aparições.",
      "Paulo, por volta de 55 d.C., cita uma tradição que recebeu: Cristo apareceu a Cefas, aos Doze, a mais de quinhentos irmãos de uma vez, a Tiago e a todos os apóstolos (1 Co 15:3–8).",
      "Emaús fica a “sessenta estádios” de Jerusalém (Lc 24:13), uns 11 km; alguns manuscritos dizem cento e sessenta (uns 30 km). Há três candidatas principais: Emaús Nicópolis (Imwas), a 30 km, com a tradição mais antiga (Eusébio); Motza (Colônia), a uns 7 km, onde Josefo diz que Vespasiano assentou veteranos num lugar chamado Emaús, a 30 estádios; e el-Qubeibeh, a 11 km, tradição dos cruzados.",
    ],
    stops: [
      { siteId: "golgota", title: "O túmulo vazio", date: "de madrugada", kind: "evento", text: "Um terremoto, a pedra removida, os guardas como mortos. “Ide depressa e dizei aos seus discípulos que já ressuscitou.” Pedro e João correm ao túmulo.", refs: "Mt 28:1–8; Mc 16:1–8; Lc 24:1–12; Jo 20:1–10" },
      { siteId: "golgota", title: "“Maria!” “Rabôni!”", date: "", kind: "evento", text: "Maria Madalena, chorando, pensa que é o jardineiro. “Não me detenhas; vai a meus irmãos.”", refs: "Jo 20:11–18; Mt 28:9–10" },
      { siteId: "emaus-qubeibeh", title: "No caminho", date: "à tarde", kind: "evento", text: "Cléopas e outro discípulo conversam. “Ó néscios e tardos de coração!” Começando por Moisés e pelos profetas, Jesus lhes explica as Escrituras.", refs: "Lc 24:13–27" },
      { siteId: "emaus-nicopolis", title: "Emaús Nicópolis", date: "", kind: "santuario", text: "A Emaús de Eusébio e Jerônimo, com basílica bizantina. Fica a 160 estádios, conforme alguns manuscritos.", refs: "Lc 24:13; 1 Mac 3:40", archaeology: "Imwas: basílica dos séculos 5–6 e restos cruzados, no Parque Canadá." },
      { siteId: "emaus-motza", title: "Emaús de Motza", date: "", kind: "cidade", text: "A “Emaús” de Josefo, a 30 estádios, onde se assentaram 800 veteranos romanos depois de 70 d.C.", refs: "Josefo, Guerra 7.217", archaeology: "Escavações em Motza revelaram uma aldeia judaica do período do Segundo Templo." },
      { siteId: "emaus-qubeibeh", title: "O partir do pão", date: "ao anoitecer", kind: "evento", text: "“Fica conosco, porque é tarde.” À mesa, ao partir o pão, os olhos se abrem e ele desaparece. “Não ardia o nosso coração?”", refs: "Lc 24:28–35" },
      { siteId: "cenaculo", title: "“Paz seja convosco”", date: "noite; oito dias depois", kind: "evento", text: "Jesus aparece com as portas fechadas, mostra as mãos e o lado e come peixe assado. Uma semana depois, Tomé: “Senhor meu e Deus meu!”", refs: "Lc 24:36–49; Jo 20:19–29" },
    ],
    routes: [
      { label: "De Jerusalém a Emaús e de volta (uma das hipóteses)", side: "jesus", path: ["jerusalem", [35.2, 31.81], "emaus-qubeibeh", [35.2, 31.815], "jerusalem"] },
      { label: "Para Nicópolis (160 estádios)", side: "neutro", path: ["jerusalem", "emaus-motza", [35.08, 31.82], "emaus-nicopolis"], dashed: true },
    ],
    areas: [{ label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana }],
    labels: [
      { text: "JUDEIA", lng: 35.1, lat: 31.72, kind: "regiao" },
      { text: "Sefelá", lng: 34.95, lat: 31.75, kind: "regiao" },
    ],
    bounds: [34.9, 31.73, 35.3, 31.88],
    caveat: "As três Emaús são candidatas (“?”); o texto fala de 60 estádios (ou 160 em alguns manuscritos). O túmulo segue a identificação do Santo Sepulcro.",
  },
  {
    slug: "aparicoes-na-galileia",
    part: "ressurreicao",
    title: "Junto ao mar de Tiberíades e no monte da Galileia",
    ref: "Jo 21; Mt 28:16–20",
    gospels: { Mateus: "28:16–20", Marcos: "16:7", João: "21:1–25" },
    date: "semanas depois da Páscoa",
    year: 30,
    summary:
      "Sete discípulos voltam a pescar no mar de Tiberíades e passam a noite sem pegar nada. De madrugada, um homem na praia diz: “Lançai a rede à direita do barco.” A rede se enche de 153 peixes grandes. “É o Senhor!” Pedro se lança na água. Na praia há brasas, peixe e pão. Três vezes Jesus pergunta: “Simão, amas-me?” “Apascenta as minhas ovelhas.” No monte que Jesus indicou, ele envia os Onze: “Ide, fazei discípulos de todas as nações.”",
    context: [
      "O anjo e Jesus tinham dito às mulheres: “Ele vai adiante de vós para a Galileia; ali o vereis” (Mc 16:7; Mt 28:7, 10).",
      "As três perguntas a Pedro respondem às três negações, também junto a um fogo de brasas (Jo 18:18; 21:9).",
      "A tradição lembra a refeição na praia de Tabga, na capela do Primado de Pedro (1933), construída sobre uma rocha chamada Mensa Christi, que a peregrina Egéria já menciona.",
    ],
    stops: [
      { siteId: "jerusalem", title: "Para a Galileia", date: "", kind: "cidade", text: "“Ide dizer a meus irmãos que vão à Galileia, e lá me verão.”", refs: "Mt 28:10" },
      { siteId: "tabga", title: "A pesca dos 153 peixes", date: "de madrugada", kind: "evento", text: "“Filhos, tendes alguma coisa de comer?” “Vinde, comei.”", refs: "Jo 21:1–14" },
      { siteId: "tabga", title: "“Simão, amas-me?”", date: "", kind: "evento", text: "“Tu sabes tudo; tu sabes que eu te amo.” “Apascenta as minhas ovelhas.” E o anúncio da morte de Pedro.", refs: "Jo 21:15–23", archaeology: "Capela do Primado de Pedro, de 1933, sobre restos de uma igreja do século 4; degraus cortados na rocha junto à água." },
      { siteId: "bem-aventurancas", title: "O monte da Galileia", date: "", kind: "evento", text: "“Toda a autoridade me foi dada no céu e na terra. Ide, fazei discípulos de todas as nações… Eis que estou convosco todos os dias.”", refs: "Mt 28:16–20; 1 Co 15:6" },
    ],
    routes: [{ label: "Volta dos discípulos à Galileia", side: "jesus", path: ["jerusalem", "jerico", [35.52, 32.1], "bete-sea", "tiberiades", "tabga"], dashed: true }],
    areas: [
      { label: "Galileia de Antipas", side: "antipas", polygon: region.galileia },
      { label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana },
    ],
    labels: [
      { text: "Mar de Tiberíades", lng: 35.59, lat: 32.83, kind: "mar" },
      { text: "GALILEIA", lng: 35.32, lat: 32.88, kind: "regiao" },
      { text: "JUDEIA", lng: 35.05, lat: 31.6, kind: "regiao" },
      { text: "Jordão", lng: 35.56, lat: 32.2, kind: "rio" },
    ],
    bounds: [34.95, 31.65, 35.8, 32.95],
    caveat: "O monte de Mateus 28 não tem nome; a marca no monte das Bem-Aventuranças é só uma sugestão (“?”).",
  },
  {
    slug: "ascensao",
    part: "ressurreicao",
    title: "A ascensão no Monte das Oliveiras",
    ref: "Lc 24:50–53; At 1:1–12; Mc 16:19",
    gospels: { Marcos: "16:19–20 (final longo)", Lucas: "24:50–53" },
    date: "quarenta dias depois da Páscoa",
    year: 30,
    summary:
      "Durante quarenta dias Jesus aparece aos apóstolos e fala do Reino de Deus. Leva-os até perto de Betânia, levanta as mãos e os abençoa; enquanto os abençoa, é elevado ao céu, e uma nuvem o encobre. Dois homens vestidos de branco: “Esse Jesus virá do mesmo modo como o vistes ir.” Eles voltam a Jerusalém, a distância de um caminho de sábado, e esperam o Espírito.",
    context: [
      "Lucas conta a ascensão duas vezes, no fim do Evangelho e no início de Atos, que é a continuação da sua obra. Atos diz que foi no Monte das Oliveiras, “que está perto de Jerusalém, à distância do caminho de um sábado” (At 1:12), uns 900 m a 1 km.",
      "Zacarias 14:4 diz que no dia do Senhor “os seus pés estarão sobre o Monte das Oliveiras”: por isso muitos ligam a promessa da volta a este lugar.",
      "A tradição lembra o lugar no alto do monte: a Imbomon, rotunda construída por Poemenia por volta de 380; a Capela da Ascensão atual é uma pequena construção cruzada, hoje dentro de uma mesquita. Eleona, ao lado, também foi lembrada como lugar do ensino e da ascensão.",
    ],
    stops: [
      { siteId: "cenaculo", title: "Quarenta dias", date: "", kind: "evento", text: "“Não vos ausenteis de Jerusalém, mas esperai a promessa do Pai.” “Recebereis poder… e sereis minhas testemunhas em Jerusalém, na Judeia, na Samaria e até os confins da terra.”", refs: "At 1:3–8" },
      { siteId: "oliveiras", title: "Elevado ao céu", date: "", kind: "evento", text: "“Enquanto os abençoava, separou-se deles e foi elevado ao céu.” Uma nuvem o encobre.", refs: "Lc 24:50–51; At 1:9–11", archaeology: "Capela da Ascensão: base octogonal dos cruzados (séc. 12) sobre a rotunda do século 4." },
      { siteId: "betania", title: "“Até perto de Betânia”", date: "", kind: "cidade", text: "Lucas diz que os levou para fora, “até Betânia”: a encosta leste do mesmo monte.", refs: "Lc 24:50" },
      { siteId: "templo-herodes", title: "Com grande alegria", date: "", kind: "santuario", text: "“E estavam sempre no templo, louvando e bendizendo a Deus.” Dez dias depois, o Pentecostes.", refs: "Lc 24:52–53; At 2:1" },
    ],
    routes: [{ label: "De Jerusalém ao Monte das Oliveiras e de volta", side: "jesus", path: ["cenaculo", "siloe", "getsemani", "oliveiras", "betania"] }],
    areas: [
      { label: "Jerusalém murada (c. 30 d.C., aprox.)", side: "judeia", polygon: region.jerusalemHerodes },
      { label: "Esplanada do Templo", side: "jesus", polygon: region.esplanada },
    ],
    labels: [
      { text: "Vale do Cedrom", lng: 35.2385, lat: 31.7755, kind: "rio" },
      { text: "Monte das Oliveiras", lng: 35.2445, lat: 31.7805, kind: "regiao" },
      { text: "Deserto da Judeia", lng: 35.268, lat: 31.765, kind: "regiao" },
    ],
    bounds: [35.224, 31.763, 35.272, 31.788],
    related: [{ href: "/historia/maquetes/jerusalem-herodes", label: "Maquete 3D da Jerusalém de Herodes" }],
  },
];
