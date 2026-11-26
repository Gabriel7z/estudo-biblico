import { region } from "@/lib/historia/regions";
import type { JesusEpisode } from "@/lib/jesus/types";

const baseLabels = [
  { text: "GALILEIA", lng: 35.32, lat: 32.88, kind: "regiao" as const },
  { text: "SAMARIA", lng: 35.2, lat: 32.25, kind: "regiao" as const },
  { text: "JUDEIA", lng: 35.05, lat: 31.6, kind: "regiao" as const },
  { text: "PEREIA", lng: 35.72, lat: 31.95, kind: "regiao" as const },
  { text: "Jordão", lng: 35.56, lat: 32.2, kind: "rio" as const },
  { text: "Mar Salgado", lng: 35.48, lat: 31.45, kind: "mar" as const },
];

/** Preparação: João Batista, o batismo, a tentação e o primeiro ano (sobretudo em João). */
export const preparacaoEpisodes: JesusEpisode[] = [
  {
    slug: "batismo-no-jordao",
    part: "preparacao",
    title: "João Batista e o batismo de Jesus no Jordão",
    ref: "Mt 3; Mc 1:1–11; Lc 3:1–22; Jo 1:19–34",
    gospels: { Mateus: "3:1–17", Marcos: "1:1–11", Lucas: "3:1–22", João: "1:19–34" },
    date: "c. 28 d.C.",
    year: 28,
    summary:
      "No décimo quinto ano de Tibério, João, filho de Zacarias, prega no deserto um batismo de arrependimento. Multidões descem de Jerusalém e da Judeia ao Jordão. Jesus vem da Galileia e é batizado; o Espírito desce como pomba e uma voz diz: “Tu és o meu Filho amado.” João o aponta: “Eis o Cordeiro de Deus.”",
    context: [
      "Lucas data o início com uma precisão rara: o 15º ano de Tibério (28/29 d.C., contando de 14 d.C.), Pôncio Pilatos governador da Judeia, Herodes Antipas tetrarca da Galileia, Filipe da Itureia e Traconítide, Lisânias de Abilene, sob os sumos sacerdotes Anás e Caifás (Lc 3:1–2).",
      "João diz que isso aconteceu “em Betânia, do outro lado do Jordão” (Jo 1:28); alguns manuscritos e Orígenes leem Betabara. Desde 1996 escavações em Wadi al-Kharrar (al-Maghtas), na margem leste, acharam igrejas bizantinas, piscinas e grutas de eremitas; é Patrimônio Mundial da UNESCO desde 2015. Na margem oeste, Qasr al-Yahud guarda a tradição do lado da Judeia.",
      "Josefo também fala de João: um homem bom, que exortava os judeus à justiça e à piedade e a vir ao batismo; Antipas o temeu e o mandou matar em Maqueronte (Antiguidades 18.116–119).",
      "A comunidade de Qumran, a poucos quilômetros, também vivia no deserto à espera do Senhor citando Isaías 40:3, como João. Se houve contato entre eles, não sabemos.",
    ],
    stops: [
      { siteId: "nazare", title: "Jesus sai de Nazaré", date: "c. 28 d.C.", kind: "cidade", text: "“Naqueles dias veio Jesus de Nazaré da Galileia e foi batizado por João no Jordão.” Lucas diz que tinha cerca de trinta anos.", refs: "Mc 1:9; Lc 3:23" },
      { siteId: "betabara", title: "Betânia além do Jordão", date: "c. 28 d.C.", kind: "evento", text: "João batiza e anuncia: “Após mim vem aquele que é mais poderoso do que eu.” Jesus é batizado; os céus se abrem e o Espírito desce como pomba.", refs: "Mt 3:13–17; Mc 1:9–11; Lc 3:21–22; Jo 1:28–34", archaeology: "Wadi al-Kharrar: igrejas e piscinas batismais dos séculos 5–6 e uma colina de “Elias” com grutas; a peregrina Egéria (c. 384) e o mapa de Madaba (séc. 6) mostram o lugar." },
      { siteId: "qasr-yahud", title: "Qasr al-Yahud, a margem oeste", date: "", kind: "santuario", text: "O ponto de travessia diante de Jericó, ligado também à passagem de Josué (Js 3) e à subida de Elias (2 Rs 2). Hoje é o local de peregrinação do lado israelense.", refs: "Js 3:16; 2 Rs 2:6–14" },
      { siteId: "qumran", title: "Qumran, no mesmo deserto", date: "", kind: "cidade", text: "A comunidade dos Manuscritos do Mar Morto, ativa até 68 d.C., a uns 15 km ao sul do lugar do batismo.", refs: "Is 40:3 (citado por ambos)", archaeology: "Ruínas escavadas por Roland de Vaux (1951–1956); os manuscritos foram achados nas grutas desde 1947." },
      { siteId: "templo-herodes", title: "Os enviados de Jerusalém", date: "", kind: "santuario", text: "Sacerdotes e levitas vêm perguntar a João quem ele é: “Eu sou a voz do que clama no deserto.”", refs: "Jo 1:19–23" },
    ],
    routes: [{ label: "Jesus desce da Galileia ao Jordão", side: "jesus", path: ["nazare", "bete-sea", [35.55, 32.2], [35.53, 32.0], "betabara"] }],
    areas: [
      { label: "Galileia de Antipas", side: "antipas", polygon: region.galileia },
      { label: "Pereia de Antipas", side: "antipas", polygon: region.pereia },
      { label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana },
    ],
    labels: baseLabels,
    bounds: [34.95, 31.55, 35.95, 32.85],
    caveat: "Betânia além do Jordão: al-Maghtas (Jordânia) é a identificação aceita hoje; Qasr al-Yahud é a tradição da margem oposta. O ano depende da contagem do 15º ano de Tibério.",
  },
  {
    slug: "tentacao-no-deserto",
    part: "preparacao",
    title: "Quarenta dias de tentação no deserto",
    ref: "Mt 4:1–11; Mc 1:12–13; Lc 4:1–13",
    gospels: { Mateus: "4:1–11", Marcos: "1:12–13", Lucas: "4:1–13" },
    date: "c. 28 d.C.",
    year: 28,
    summary:
      "Logo depois do batismo, o Espírito leva Jesus ao deserto, onde ele jejua quarenta dias. O diabo o tenta três vezes: transformar pedras em pão, lançar-se do pináculo do Templo e adorar o tentador em troca dos reinos do mundo. Jesus responde com o Deuteronômio. Marcos diz que estava com as feras e os anjos o serviam.",
    context: [
      "Os quarenta dias lembram os quarenta anos de Israel no deserto, e as três respostas de Jesus citam Deuteronômio 8:3, 6:16 e 6:13, textos dessa peregrinação.",
      "O deserto da Judeia começa logo a leste de Jerusalém e desce até o Jordão e o Mar Salgado: colinas de calcário nu, vales profundos e grutas. Desde o século 4, eremitas viveram ali.",
      "O “pináculo do Templo” (pterygion, “asinha”) costuma ser identificado com o canto sudeste da esplanada, acima do vale do Cedrom, onde a queda era maior. A tradição cristã também chama o lugar de “pináculo” desde cedo.",
    ],
    stops: [
      { siteId: "betabara", title: "Do Jordão ao deserto", date: "", kind: "cidade", text: "“Jesus, cheio do Espírito Santo, voltou do Jordão e foi levado pelo Espírito ao deserto.”", refs: "Lc 4:1" },
      { siteId: "quarentena", title: "Monte da Quarentena", date: "quarenta dias", kind: "evento", text: "Pedras em pão: “Nem só de pão viverá o homem.” A tradição situa o jejum neste monte acima de Jericó.", refs: "Mt 4:1–4; Dt 8:3", archaeology: "Lugar da tradição desde o período bizantino; o mosteiro grego atual, agarrado à rocha, é de 1895." },
      { siteId: "templo-herodes", title: "O pináculo do Templo", date: "", kind: "santuario", text: "“Se és o Filho de Deus, lança-te daqui abaixo.” “Não tentarás o Senhor teu Deus.”", refs: "Mt 4:5–7; Lc 4:9–12; Dt 6:16" },
      { siteId: "quarentena", title: "Os reinos do mundo", date: "", kind: "evento", text: "Num monte muito alto, o tentador mostra os reinos do mundo. “Ao Senhor teu Deus adorarás.” Os anjos vêm servi-lo.", refs: "Mt 4:8–11; Lc 4:5–8; Mc 1:13; Dt 6:13" },
    ],
    routes: [{ label: "Pelo deserto da Judeia", side: "jesus", path: ["betabara", "jerico", "quarentena", [35.38, 31.82], "templo-herodes"], dashed: true }],
    areas: [{ label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana }],
    labels: [
      { text: "Deserto da Judeia", lng: 35.35, lat: 31.68, kind: "regiao" },
      { text: "Jordão", lng: 35.56, lat: 31.95, kind: "rio" },
      { text: "Mar Salgado", lng: 35.49, lat: 31.6, kind: "mar" },
    ],
    bounds: [35.1, 31.6, 35.7, 32.0],
    caveat: "O texto não dá os lugares do jejum nem do “monte muito alto”; o Monte da Quarentena é tradição.",
  },
  {
    slug: "primeiros-discipulos-e-cana",
    part: "preparacao",
    title: "Os primeiros discípulos e as bodas de Caná",
    ref: "Jo 1:35–2:12",
    gospels: { João: "1:35–2:12" },
    date: "c. 28 d.C.",
    year: 28,
    summary:
      "Junto ao Jordão, dois discípulos de João seguem Jesus: André e outro. André chama o irmão Simão, a quem Jesus chama Cefas, Pedro. No dia seguinte Jesus chama Filipe, de Betsaida, e Filipe chama Natanael, de Caná. No terceiro dia há um casamento em Caná da Galileia: a água vira vinho, “o primeiro dos sinais”. Depois desce a Cafarnaúm.",
    context: [
      "João conta um primeiro encontro com os discípulos na Judeia, antes do chamado à beira do lago narrado pelos outros três. As duas coisas podem ser complementares: um primeiro contato e, mais tarde, o chamado para deixar tudo.",
      "As talhas de pedra de Caná (Jo 2:6) são típicas da época: a pedra, ao contrário do barro, não se tornava impura segundo a lei. Oficinas de vasos de pedra foram achadas perto de Nazaré e de Jerusalém.",
      "Há duas Canás candidatas: Khirbet Qana, no vale de Bet Netofa, a 13 km ao norte de Nazaré, onde escavações acharam uma aldeia do século 1 e uma gruta de culto cristão; e Kafr Kanna, a 6 km de Nazaré, com a igreja que os peregrinos visitam desde a Idade Média.",
    ],
    stops: [
      { siteId: "betabara", title: "“Eis o Cordeiro de Deus”", date: "c. 28 d.C.", kind: "evento", text: "André e outro discípulo seguem Jesus: “Mestre, onde moras?” “Vinde e vede.”", refs: "Jo 1:35–42" },
      { siteId: "betsaida", title: "Filipe, de Betsaida", date: "", kind: "cidade", text: "“Segue-me.” Betsaida era a cidade de André, Pedro e Filipe.", refs: "Jo 1:43–44" },
      { siteId: "cana", title: "Natanael e as bodas de Caná", date: "terceiro dia", kind: "evento", text: "“Pode vir alguma coisa boa de Nazaré?” Depois, no casamento, faltando vinho, Jesus manda encher seis talhas de pedra; a água se torna vinho.", refs: "Jo 1:45–51; 2:1–11; 21:2", archaeology: "Khirbet Qana: escavada por Douglas Edwards e outros desde 1998; casas, sinagoga provável e uma gruta com cruzes e grafites cristãos. É a candidata preferida por muitos." },
      { siteId: "kafr-kanna", title: "Kafr Kanna, a Caná da tradição", date: "", kind: "santuario", text: "A Caná dos peregrinos, no caminho de Nazaré a Tiberíades, com a igreja franciscana do casamento (1881).", refs: "Jo 2:1" },
      { siteId: "cafarnaum", title: "Desce a Cafarnaúm", date: "", kind: "cidade", text: "“Depois disso desceu a Cafarnaúm, ele, sua mãe, seus irmãos e seus discípulos.”", refs: "Jo 2:12" },
    ],
    routes: [
      { label: "Do Jordão à Galileia", side: "jesus", path: ["betabara", [35.55, 32.2], "bete-sea", "tabor", "cana"], dashed: true },
      { label: "Caná → Cafarnaúm", side: "jesus", path: ["cana", "hattin", "magdala", "cafarnaum"] },
    ],
    areas: [{ label: "Galileia de Antipas", side: "antipas", polygon: region.galileia }],
    labels: [
      { text: "GALILEIA", lng: 35.3, lat: 32.95, kind: "regiao" },
      { text: "Mar da Galileia", lng: 35.6, lat: 32.82, kind: "mar" },
      { text: "Jordão", lng: 35.56, lat: 32.25, kind: "rio" },
    ],
    bounds: [35.05, 31.75, 35.85, 33.0],
    caveat: "Caná marcada com “?”: Khirbet Qana é a candidata mais provável; Kafr Kanna é a tradição medieval.",
  },
  {
    slug: "pascoa-e-nicodemos",
    part: "preparacao",
    title: "A primeira Páscoa em Jerusalém e Nicodemos",
    ref: "Jo 2:13–3:36",
    gospels: { João: "2:13–3:36" },
    date: "Páscoa, c. 28 d.C.",
    year: 28,
    summary:
      "Na Páscoa, Jesus sobe a Jerusalém, faz um chicote de cordas e expulsa do Templo os vendedores de bois, ovelhas e pombas. “Destruí este santuário, e em três dias o levantarei.” À noite, Nicodemos, fariseu e membro do Sinédrio, vem falar com ele: “Necessário vos é nascer de novo.” Depois Jesus batiza na Judeia, e João batiza em Enom, perto de Salim.",
    context: [
      "João põe uma purificação do Templo no começo; Mateus, Marcos e Lucas a põem na última semana. Uns pensam em dois episódios; outros, em um só, que João colocou no início por razões teológicas.",
      "Os judeus respondem: “Em quarenta e seis anos foi edificado este santuário” (Jo 2:20). Herodes começou a reforma em 20/19 a.C. (Josefo, Antiguidades 15.380); 46 anos depois dá 27/28 d.C., o que concorda com o 15º ano de Tibério de Lucas.",
      "O comércio de animais e o câmbio para o siclo de Tiro, a moeda exigida para o imposto do Templo, ficavam no Pátio dos Gentios ou junto a ele, talvez no Pórtico Real.",
    ],
    stops: [
      { siteId: "cafarnaum", title: "Subida para a Páscoa", date: "", kind: "cidade", text: "“Estava próxima a Páscoa dos judeus, e Jesus subiu a Jerusalém.”", refs: "Jo 2:13" },
      { siteId: "portico-real", title: "O chicote de cordas", date: "Páscoa", kind: "evento", text: "Expulsa os vendedores e derruba as mesas dos cambistas: “Não façais da casa de meu Pai casa de negócio.”", refs: "Jo 2:14–22" },
      { siteId: "templo-herodes", title: "“Em três dias o levantarei”", date: "", kind: "santuario", text: "“Ele, porém, falava do santuário do seu corpo.” Os discípulos só entenderam depois da ressurreição.", refs: "Jo 2:19–22" },
      { siteId: "jerusalem", title: "Nicodemos de noite", date: "", kind: "evento", text: "“Como pode um homem nascer, sendo velho?” “Porque Deus amou o mundo de tal maneira…”", refs: "Jo 3:1–21; 7:50; 19:39" },
      { siteId: "enom", title: "Enom, perto de Salim", date: "", kind: "evento", text: "João batiza ali “porque havia ali muitas águas”. “É necessário que ele cresça e que eu diminua.”", refs: "Jo 3:22–36", archaeology: "Lugar incerto; o mapa de Madaba põe Enom no vale do Jordão ao sul de Citópolis (Bete-Seã); outros o procuram perto de Siquém." },
    ],
    routes: [
      { label: "Cafarnaúm → Jerusalém pelo vale do Jordão", side: "jesus", path: ["cafarnaum", "tiberiades", "bete-sea", [35.52, 32.1], "jerico", "jerusalem"] },
      { label: "Para a terra da Judeia", side: "jesus", path: ["jerusalem", [35.4, 31.85]], dashed: true },
    ],
    areas: [
      { label: "Galileia de Antipas", side: "antipas", polygon: region.galileia },
      { label: "Judeia de Pilatos", side: "roma", polygon: region.judeiaRomana },
    ],
    labels: baseLabels,
    bounds: [34.95, 31.6, 35.85, 32.95],
    caveat: "Enom é incerto (“?”). A ordem de João e dos outros Evangelhos para a purificação do Templo é discutida.",
  },
  {
    slug: "mulher-samaritana",
    part: "preparacao",
    title: "A mulher samaritana no poço de Jacó",
    ref: "Jo 4:1–54",
    gospels: { João: "4:1–54" },
    date: "c. 28 d.C.",
    year: 28,
    summary:
      "Voltando da Judeia para a Galileia, Jesus “precisava passar pela Samaria”. Cansado, senta-se junto ao poço de Jacó, perto de Sicar, à hora sexta. Pede água a uma mulher samaritana e lhe oferece a “água viva”. Ela pergunta onde se deve adorar, se neste monte ou em Jerusalém. Muitos samaritanos creem. De volta a Caná, Jesus cura à distância o filho de um oficial de Cafarnaúm.",
    context: [
      "Judeus e samaritanos estavam separados havia séculos. Os samaritanos aceitavam só o Pentateuco e adoravam no monte Gerizim, onde tinham um templo destruído por João Hircano por volta de 110 a.C.",
      "Josefo conta que os galileus que iam às festas passavam pela Samaria e que isso às vezes acabava em violência (Antiguidades 20.118). O caminho pela Samaria levava uns três dias.",
      "O poço de Jacó não é citado no Antigo Testamento, mas Gênesis 33:19 diz que Jacó comprou um campo perto de Siquém, e Josué 24:32 que José foi sepultado ali.",
    ],
    stops: [
      { siteId: "jerusalem", title: "Saída da Judeia", date: "", kind: "cidade", text: "Os fariseus ouvem que Jesus faz mais discípulos que João; ele deixa a Judeia.", refs: "Jo 4:1–4" },
      { siteId: "poco-jaco", title: "O poço de Jacó", date: "hora sexta (meio-dia)", kind: "evento", text: "“Dá-me de beber.” “Quem beber da água que eu lhe der nunca terá sede.”", refs: "Jo 4:5–26", archaeology: "Poço de uns 40 m sob uma igreja ortodoxa em Balata (Nablus). Igrejas cristãs ali desde o século 4; a peregrina de Bordéus o cita em 333. A identificação é das mais seguras da Palestina." },
      { siteId: "gerizim", title: "“Neste monte”", date: "", kind: "santuario", text: "“Nossos pais adoraram neste monte.” “Vem a hora em que os verdadeiros adoradores adorarão o Pai em espírito e em verdade.”", refs: "Jo 4:19–24", archaeology: "Escavações de Yitzhak Magen acharam o recinto sagrado samaritano do período helenístico." },
      { siteId: "sicar", title: "Sicar", date: "dois dias", kind: "cidade", text: "A mulher deixa o cântaro e chama a cidade. Jesus fica ali dois dias: “Este é verdadeiramente o Salvador do mundo.”", refs: "Jo 4:28–42", archaeology: "Geralmente identificada com a aldeia de Askar, a 1 km do poço." },
      { siteId: "cana", title: "O filho do oficial", date: "", kind: "evento", text: "Em Caná, um oficial do rei pede pelo filho doente em Cafarnaúm. “Vai, o teu filho vive.” É o segundo sinal.", refs: "Jo 4:46–54" },
      { siteId: "cafarnaum", title: "A cura à distância", date: "hora sétima", kind: "cidade", text: "Na volta, os servos encontram o oficial: a febre deixou o menino na mesma hora.", refs: "Jo 4:51–53" },
    ],
    routes: [
      { label: "Pela Samaria", side: "jesus", path: ["jerusalem", "betel", "silo", "poco-jaco", "sicar", "samaria", "jezreel", "nazare", "cana"] },
      { label: "A palavra a Cafarnaúm", side: "jesus", path: ["cana", "cafarnaum"], dashed: true },
    ],
    areas: [{ label: "Samaria (sob Pilatos)", side: "judeia", polygon: region.judeiaRomana }],
    labels: baseLabels,
    bounds: [34.9, 31.65, 35.75, 32.95],
  },
];
