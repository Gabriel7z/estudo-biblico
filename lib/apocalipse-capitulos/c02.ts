import type { Chapter } from "./types";

export const c02: Chapter = {
  n: 2,
  title: "Cartas a Éfeso, Esmirna, Pérgamo e Tiatira",
  parts: ["igrejas"],
  summary:
    "As quatro primeiras cartas. Todas seguem o mesmo molde: destinatário, um título de Cristo tirado da visão do capítulo 1, \"conheço as tuas obras\", elogio, censura, ordem, a frase \"quem tem ouvidos, ouça o que o Espírito diz às igrejas\" e uma promessa \"ao vencedor\". Éfeso perdeu o primeiro amor; Esmirna é pobre e vai sofrer; Pérgamo mora onde está o trono de Satanás; Tiatira tolera a profetisa chamada Jezabel.",
  context: [
    "As cartas não são enviadas separadamente: todas as igrejas ouvem todas as cartas (\"o que o Espírito diz às igrejas\", no plural). Cada uma usa detalhes da cidade: geografia, economia, religião cívica. Parte dessas \"alusões locais\" foi proposta por William Ramsay (The Letters to the Seven Churches, 1904) e por Colin Hemer (1986); algumas são firmes, outras especulativas, e os estudiosos não as aceitam todas.",
    "O culto imperial era forte na Ásia. Pérgamo recebeu o primeiro templo provincial a Roma e Augusto (29 a.C.), Esmirna o segundo, a Tibério (26 d.C.), e Éfeso um templo provincial aos Sebastoi (a dinastia flaviana) sob Domiciano, c. 89/90 d.C. As guildas de ofício tinham banquetes com sacrifícios a deuses padroeiros, e quem não participava podia perder trabalho e posição social.",
    "As tensões com a sinagoga local (2:9; 3:9) refletem um tempo em que a separação entre judeus e cristãos ainda estava em curso. As palavras duras sobre \"sinagoga de Satanás\" visam grupos que denunciavam os cristãos naquelas cidades, não o povo judeu como tal.",
  ],
  readings: [
    { school: "Preterista e idealista", text: "As sete cartas foram escritas a sete igrejas reais do século I. Como o número sete indica completude, servem também a todas as igrejas de todas as épocas." },
    { school: "Historicista", text: "Além de igrejas reais, muitos historicistas (e alguns dispensacionalistas, como a Bíblia de Scofield) leem as sete cartas como sete períodos sucessivos da história da igreja: Éfeso = era apostólica, Esmirna = perseguições romanas, Pérgamo = era de Constantino, Tiatira = Idade Média, Sardes = Reforma, Filadélfia = missões modernas, Laodiceia = igreja morna do fim. O texto não indica essa sequência, e muitos estudiosos a rejeitam." },
    { school: "Futurista", text: "Na maioria, toma as cartas como dirigidas às igrejas do século I e aplicáveis a todas; uma parte, como dito acima, também vê nelas um panorama profético das eras da igreja." },
  ],
  scenes: ["igrejas"],
  extras: [{ href: "/apocalipse/igrejas", label: "Mapa das sete igrejas" }],
  sections: [
    { from: 1, title: "Éfeso" },
    { from: 8, title: "Esmirna" },
    { from: 12, title: "Pérgamo" },
    { from: 18, title: "Tiatira" },
  ],
  verses: [
    {
      v: 1,
      text: "Ao anjo da igreja em Éfeso escreve: Isto diz aquele que segura as sete estrelas na mão direita e anda no meio dos sete candelabros de ouro.",
      notes: [
        "Éfeso era a maior cidade da Ásia (talvez 200 mil habitantes), porto na foz do rio Caístro, sede do procônsul e guardiã (neōkoros) do templo de Ártemis, uma das sete maravilhas do mundo antigo. As ruínas (Selçuk, Turquia) incluem o teatro de 24 mil lugares de Atos 19:29.",
        "Paulo ficou ali quase três anos (At 19–20); a tradição liga também João e Maria a Éfeso.",
        "O título vem de 1:13, 16, 20. Aqui ele \"segura\" (kratōn, agarra firme) e \"anda\" no meio: presença ativa que inspeciona as igrejas.",
      ],
      echoes: ["Lv 26:12"],
      symbols: ["estrelas", "candelabros", "n7"],
    },
    {
      v: 2,
      text: "Conheço as tuas obras, o teu esforço e a tua perseverança, e sei que não suportas os maus. Puseste à prova os que se dizem apóstolos e não são, e os achaste mentirosos.",
      notes: [
        "\"Conheço\" (oida) abre todas as cartas: o juízo de Cristo parte do que ele vê.",
        "\"Apóstolos\" aqui são missionários itinerantes, não só os Doze. Paulo já tinha avisado os anciãos de Éfeso sobre lobos (At 20:29–30), e a Didaquê 11 dá regras para testar apóstolos e profetas falsos (por exemplo, o que pede dinheiro).",
      ],
      terms: [
        { gr: "κόπος", tr: "kopos", mean: "trabalho duro, cansaço" },
        { gr: "ἀπόστολος", tr: "apostolos", mean: "enviado, missionário" },
      ],
      echoes: ["At 20:29–30", "1Jo 4:1"],
    },
    {
      v: 3,
      text: "Tens perseverança, suportaste por causa do meu nome e não te cansaste.",
      notes: [
        "Jogo de palavras: em 2:2 Cristo conhece o seu \"cansaço\" (kopos), e aqui diz que não se cansaram (ou kekopiakes).",
        "\"Por causa do meu nome\": sofrer pela confissão pública de Jesus.",
      ],
    },
    {
      v: 4,
      text: "Mas tenho contra ti que abandonaste o teu primeiro amor.",
      notes: [
        "\"Primeiro amor\" pode ser o amor a Cristo do começo da conversão, o amor uns pelos outros, ou ambos; as \"primeiras obras\" do v. 5 sugerem que o amor se via em atos. Jeremias 2:2 fala do \"amor do teu noivado\" de Israel por Deus.",
        "A igreja que testava doutrinas com rigor perdeu o essencial: ortodoxia sem amor.",
      ],
      terms: [{ gr: "ἀγάπη", tr: "agapē", mean: "amor que se doa" }],
      echoes: ["Jr 2:2", "Mt 24:12"],
    },
    {
      v: 5,
      text: "Lembra-te de onde caíste, arrepende-te e volta a praticar as primeiras obras. Se não, virei a ti e tirarei o teu candelabro do seu lugar, se não te arrependeres.",
      notes: [
        "Três verbos: lembrar, arrepender-se (metanoeō, mudar de mente e direção) e fazer.",
        "Tirar o candelabro: deixar de existir como igreja, de ser luz. Não é um juízo do fim do mundo, mas uma visita de Cristo à igreja.",
        "Ramsay sugeriu uma alusão à geografia: o porto de Éfeso se assoreava, e a cidade teve de ser deslocada ao longo dos séculos. A alusão é possível, mas não é necessária para entender o versículo.",
      ],
      terms: [{ gr: "μετανοέω", tr: "metanoeō", mean: "arrepender-se, mudar de direção" }],
      symbols: ["candelabros"],
    },
    {
      v: 6,
      text: "Mas tens isto: odeias as obras dos nicolaítas, que eu também odeio.",
      notes: [
        "Os nicolaítas aparecem só aqui e em 2:15. Ireneu (Contra as Heresias 1.26.3) liga o grupo a Nicolau, o prosélito de Antioquia de Atos 6:5, mas isso pode ser dedução a partir do nome. Pelo paralelo com Pérgamo (2:14–15) e Tiatira (2:20), o problema parece ser a participação em banquetes com carne sacrificada a ídolos e imoralidade sexual: uma acomodação à cultura pagã.",
        "Há quem note que \"Nicolau\" (vence o povo) e \"Balaão\" (devora o povo, numa etimologia popular hebraica) teriam sentidos parecidos; é só uma hipótese.",
        "O ódio é às obras, não às pessoas.",
      ],
      echoes: ["At 6:5", "Sl 139:21"],
      symbols: ["nicolaitas"],
    },
    {
      v: 7,
      text: "Quem tem ouvidos ouça o que o Espírito diz às igrejas. Ao vencedor darei de comer da árvore da vida, que está no paraíso de Deus.",
      notes: [
        "A fórmula \"quem tem ouvidos\" é a de Jesus nos evangelhos (Mt 11:15; 13:9) e lembra Isaías 6:9–10 e Ezequiel 3:27.",
        "\"Vencedor\" (ho nikōn, de nikē, vitória) é a palavra-chave das sete promessas. No livro, vence-se como o Cordeiro venceu: pela fidelidade até a morte (5:5–6; 12:11).",
        "A árvore da vida vem de Gênesis 2:9 e 3:22–24, onde o acesso foi fechado; reaparece em 22:2, 14. \"Paraíso\" (palavra de origem persa: jardim murado) é o nome grego do Éden nos Setenta.",
        "Em Éfeso, o santuário de Ártemis era lugar de asilo, e moedas da cidade mostram uma tamareira, símbolo ligado à deusa. Hemer viu aí um contraste com a árvore da vida; é uma alusão possível.",
      ],
      terms: [
        { gr: "νικάω", tr: "nikaō", mean: "vencer" },
        { gr: "παράδεισος", tr: "paradeisos", mean: "jardim, paraíso (Éden)" },
      ],
      echoes: ["Gn 2:9", "Gn 3:22–24", "Ez 31:8", "Mt 13:9"],
      symbols: ["arvore-da-vida"],
    },
    {
      v: 8,
      text: "Ao anjo da igreja em Esmirna escreve: Isto diz o Primeiro e o Último, que esteve morto e voltou à vida.",
      notes: [
        "Esmirna (hoje Izmir) era um grande porto, rival de Éfeso, orgulhosa da beleza e da fidelidade antiga a Roma: foi a primeira cidade da Ásia a erguer um templo à deusa Roma (195 a.C., segundo Tácito, Anais 4.56) e venceu a disputa para o templo a Tibério em 26 d.C.",
        "A cidade antiga foi destruída pelos lídios por volta de 600 a.C. e refundada no período helenístico; \"esteve morto e voltou à vida\" pode soar como eco disso para os ouvintes.",
        "O nome lembra mirra (smyrna), perfume usado nos sepultamentos (Jo 19:39).",
        "Policarpo, bispo de Esmirna, foi martirizado ali por volta de 155–156 d.C., aos 86 anos (Martírio de Policarpo).",
      ],
      echoes: ["Is 44:6"],
      symbols: ["alfa-omega"],
    },
    {
      v: 9,
      text: "Conheço a tua tribulação e a tua pobreza, mas tu és rico, e a calúnia dos que se dizem judeus e não são, mas são sinagoga de Satanás.",
      notes: [
        "Pobreza (ptōcheia) é miséria, não só falta de dinheiro: talvez por perda de trabalho ou confisco. Contraste com Laodiceia, rica que se acha sem necessidade (3:17).",
        "\"Calúnia\" é blasphēmia: difamação, possivelmente denúncia às autoridades. No Martírio de Policarpo (12–13), judeus de Esmirna aparecem ajudando a juntar lenha para a fogueira; o texto é posterior e tem seus próprios interesses.",
        "\"Se dizem judeus e não são\": a disputa é sobre quem é o verdadeiro povo de Deus, como em Romanos 2:28–29. \"Satanás\" significa adversário e acusador (Jó 1–2; Zc 3:1); a acusação aos cristãos é vista como obra do Acusador.",
      ],
      terms: [
        { gr: "πτωχεία", tr: "ptōcheia", mean: "pobreza extrema" },
        { gr: "Σατανᾶς", tr: "Satanas", mean: "adversário, acusador (do hebraico satan)" },
      ],
      echoes: ["Rm 2:28–29", "Zc 3:1"],
      symbols: ["satanas"],
    },
    {
      v: 10,
      text: "Não temas o que vais sofrer. Eis que o diabo vai lançar alguns de vós na prisão, para serdes provados, e tereis tribulação por dez dias. Sê fiel até a morte, e te darei a coroa da vida.",
      notes: [
        "A prisão, no mundo romano, costumava ser espera pelo julgamento ou pela execução, não pena em si.",
        "\"Diabo\" (diabolos) é o caluniador; liga-se à \"calúnia\" do versículo 9.",
        "\"Dez dias\": um tempo limitado e curto, determinado por Deus. Lembra a prova de dez dias de Daniel e seus amigos (Dn 1:12–15). Os historicistas às vezes o leem como dez anos ou as dez perseguições imperiais; a maioria vê um número redondo.",
        "A coroa (stephanos) é a grinalda do vencedor nos jogos ou a coroa de honra cívica, não o diadema real. Esmirna era famosa pelos jogos e pela expressão \"coroa de Esmirna\", ligada aos edifícios em volta do monte Pagos; a alusão é provável, embora não segura. \"Coroa da vida\" também está em Tiago 1:12.",
      ],
      terms: [
        { gr: "διάβολος", tr: "diabolos", mean: "caluniador, diabo" },
        { gr: "στέφανος", tr: "stephanos", mean: "coroa de vencedor, grinalda" },
      ],
      echoes: ["Dn 1:12–15", "Tg 1:12"],
      symbols: ["n10", "coroa", "satanas"],
    },
    {
      v: 11,
      text: "Quem tem ouvidos ouça o que o Espírito diz às igrejas. O vencedor não sofrerá dano algum da segunda morte.",
      notes: [
        "A \"segunda morte\" é explicada em 20:14 e 21:8: o lago de fogo, o juízo final. Quem pode sofrer a primeira morte (o martírio) está seguro da segunda.",
        "A expressão aparece nos targumim (traduções aramaicas) de Deuteronômio 33:6 e de Isaías 65:6, 15, como morte depois do juízo.",
      ],
      symbols: ["segunda-morte"],
    },
    {
      v: 12,
      text: "Ao anjo da igreja em Pérgamo escreve: Isto diz aquele que tem a espada afiada de dois gumes.",
      notes: [
        "Pérgamo, antiga capital do reino atálida, legado a Roma em 133 a.C., ficava sobre uma acrópole de uns 300 m de altura. Era um centro religioso: o grande altar de Zeus (hoje no Museu de Pérgamo, em Berlim), o templo de Atena, o santuário de Asclépio (cujo símbolo é a serpente) e o primeiro templo provincial a Roma e Augusto (29 a.C.). Mais tarde (século II) ganhou o templo a Trajano.",
        "O governador romano tinha ali o ius gladii, o \"direito da espada\" de condenar à morte. Cristo se apresenta como quem tem a espada de verdade.",
      ],
      echoes: ["Is 49:2"],
      symbols: ["espada"],
    },
    {
      v: 13,
      text: "Sei onde moras: onde está o trono de Satanás. Contudo, conservas o meu nome e não negaste a minha fé, nem nos dias de Antipas, minha testemunha fiel, que foi morto entre vós, onde Satanás habita.",
      notes: [
        "\"Trono de Satanás\" tem várias identificações propostas: o grande altar de Zeus (com forma de trono), o culto a Asclépio, cujo emblema era a serpente (ver 12:9), a acrópole inteira vista de longe, ou, a mais aceita hoje, o culto imperial e o poder romano de condenar, sediado ali.",
        "Antipas é desconhecido fora deste versículo. Uma tradição tardia diz que foi assado dentro de um touro de bronze; não há fonte antiga confiável para isso. Recebe o título do próprio Cristo (1:5): \"testemunha fiel\". É o único mártir citado por nome no livro.",
      ],
      terms: [{ gr: "θρόνος", tr: "thronos", mean: "trono, sede de poder" }],
      symbols: ["trono", "satanas"],
    },
    {
      v: 14,
      text: "Mas tenho algumas coisas contra ti: tens aí os que seguem o ensino de Balaão, que ensinou Balaque a pôr tropeço diante dos filhos de Israel, para que comessem coisas sacrificadas a ídolos e se prostituíssem.",
      notes: [
        "Balaão foi o profeta contratado pelo rei moabita Balaque para amaldiçoar Israel (Nm 22–24). Não conseguiu, mas depois aconselhou atrair Israel para a idolatria e a imoralidade em Baal-Peor (Nm 25:1–3 com 31:16). Na tradição judaica (e em 2Pe 2:15; Jd 11) ele é o modelo do falso mestre interesseiro.",
        "\"Coisas sacrificadas a ídolos\" (eidōlothyta): carne de sacrifício servida em banquetes de templo e de guildas, ou vendida no mercado. Paulo discute o assunto em 1 Coríntios 8–10, e o concílio de Jerusalém o proíbe (At 15:29).",
        "\"Prostituir-se\" pode ser literal (a imoralidade nos banquetes) e também a imagem profética da idolatria como infidelidade conjugal (Os 1–3).",
      ],
      terms: [{ gr: "εἰδωλόθυτα", tr: "eidōlothyta", mean: "carnes sacrificadas a ídolos" }],
      echoes: ["Nm 22–25", "Nm 31:16", "At 15:29", "1Co 8–10"],
      symbols: ["balaao"],
    },
    {
      v: 15,
      text: "Do mesmo modo tens também os que seguem o ensino dos nicolaítas.",
      notes: [
        "\"Do mesmo modo\" sugere que os nicolaítas e os seguidores de Balaão são o mesmo grupo ou têm a mesma prática.",
        "Ao contrário de Éfeso (2:6), Pérgamo não odeia essas obras: tolera-as.",
      ],
      symbols: ["nicolaitas"],
    },
    {
      v: 16,
      text: "Arrepende-te, pois. Se não, virei a ti em breve e lutarei contra eles com a espada da minha boca.",
      notes: [
        "Balaão foi morto à espada (Nm 31:8). Cristo luta contra os falsos mestres com a palavra.",
        "\"Contra eles\": o juízo cai sobre os culpados, mas a igreja toda é chamada a se arrepender por tolerá-los.",
      ],
      echoes: ["Nm 22:23, 31", "Nm 31:8"],
      symbols: ["espada"],
    },
    {
      v: 17,
      text: "Quem tem ouvidos ouça o que o Espírito diz às igrejas. Ao vencedor darei do maná escondido e uma pedra branca, e na pedra um nome novo escrito, que ninguém conhece senão quem o recebe.",
      notes: [
        "O maná é o pão do deserto (Êx 16). Um vaso de maná foi guardado na arca (Êx 16:33–34). Uma tradição judaica (2 Baruque 29:8; 2 Macabeus 2:4–8 fala da arca escondida por Jeremias) esperava que o maná voltasse no tempo messiânico. Quem recusa a carne dos ídolos recebe o pão de Deus; Jesus se chama pão do céu em João 6.",
        "A pedra branca (psēphos) tem muitas explicações antigas: a pedra branca usada pelos jurados para absolver; uma ficha de entrada em banquetes ou festas; um amuleto com nome secreto; as pedras com nomes no peitoral do sumo sacerdote (Êx 28:9–21). Nenhuma é certa; a mais citada é a absolvição ou a entrada no banquete.",
        "O nome novo é promessa de Isaías 62:2 e 65:15: identidade nova dada por Deus. Se o nome é de Cristo ou do vencedor, o texto não decide.",
      ],
      terms: [
        { gr: "ψῆφος", tr: "psēphos", mean: "pedrinha (de voto, de contagem, de entrada)" },
        { gr: "μάννα", tr: "manna", mean: "maná, o pão do deserto" },
      ],
      echoes: ["Êx 16:33–34", "Sl 78:24", "Is 62:2", "Is 65:15", "Jo 6:31–35"],
      symbols: ["mana", "pedra-branca", "branco"],
    },
    {
      v: 18,
      text: "Ao anjo da igreja em Tiatira escreve: Isto diz o Filho de Deus, que tem olhos como chama de fogo e pés semelhantes a bronze polido.",
      notes: [
        "Tiatira (hoje Akhisar) era a menor das sete, cidade de comércio e de muitas guildas: tintureiros, curtidores, oleiros, ferreiros e trabalhadores de bronze, conhecidas por inscrições. Lídia, vendedora de púrpura, era de Tiatira (At 16:14). O deus da cidade era Apolo Tirimnos, filho de Zeus, e o imperador também era chamado \"filho de deus\".",
        "\"Filho de Deus\" aparece só aqui no Apocalipse. Prepara a citação do Salmo 2 no versículo 27 (\"Tu és meu filho\", Sl 2:7).",
        "Olhos de fogo e pés de bronze (1:14–15): vê tudo e pisa com firmeza; para uma cidade de metalúrgicos, a imagem é próxima.",
      ],
      echoes: ["Sl 2:7", "Dn 10:6"],
      symbols: ["fogo"],
    },
    {
      v: 19,
      text: "Conheço as tuas obras, o teu amor, a tua fé, o teu serviço e a tua perseverança, e as tuas últimas obras são mais numerosas que as primeiras.",
      notes: [
        "Ao contrário de Éfeso, Tiatira cresce no amor e no serviço (diakonia). O problema dela é outro: tolerância doutrinal.",
      ],
      terms: [{ gr: "διακονία", tr: "diakonia", mean: "serviço" }],
    },
    {
      v: 20,
      text: "Mas tenho contra ti que toleras a mulher Jezabel, que se diz profetisa e ensina e engana os meus servos a se prostituírem e a comerem coisas sacrificadas a ídolos.",
      notes: [
        "Jezabel é quase certamente um apelido simbólico: a rainha fenícia esposa de Acabe, que promoveu o culto a Baal em Israel e perseguiu os profetas (1Rs 16:31; 18:4; 21:25; 2Rs 9:22, que fala das \"prostituições e feitiçarias\" de Jezabel). Era uma mulher real da igreja de Tiatira, com influência de profetisa.",
        "Alguns manuscritos trazem \"a tua mulher\" (gynaika sou), o que levaria a ler \"a mulher do teu anjo/bispo\"; as edições críticas preferem \"a mulher\".",
        "O ensino é o mesmo de Balaão em Pérgamo (2:14): participar dos banquetes das guildas e da idolatria. Talvez justificasse isso como liberdade.",
      ],
      echoes: ["1Rs 16:31", "1Rs 21:25", "2Rs 9:22"],
      symbols: ["jezabel"],
    },
    {
      v: 21,
      text: "Dei-lhe tempo para se arrepender, mas ela não quer se arrepender da sua prostituição.",
      notes: [
        "Mostra paciência de Cristo: houve advertência anterior, talvez por algum profeta. O problema não é a falta de oportunidade, mas a recusa.",
      ],
      echoes: ["2Pe 3:9"],
    },
    {
      v: 22,
      text: "Eis que a lançarei numa cama, e os que adulteram com ela numa grande tribulação, se não se arrependerem das obras dela.",
      notes: [
        "Ironia: a cama do adultério vira cama de doença. Em hebraico e grego, \"lançar na cama\" é expressão para cair doente.",
        "\"Grande tribulação\" aqui é um juízo local sobre os cúmplices, distinto do uso em 7:14.",
      ],
    },
    {
      v: 23,
      text: "Matarei de morte os filhos dela, e todas as igrejas saberão que eu sou o que sonda rins e corações, e darei a cada um de vós segundo as vossas obras.",
      notes: [
        "\"Filhos\" são os discípulos dela, não necessariamente filhos biológicos. \"Matar de morte\" pode ser um hebraísmo para \"matar com peste\" (thanatos traduz \"peste\" nos Setenta, como em 6:8).",
        "\"Sonda rins e corações\" vem de Jeremias 17:10 e 11:20, e do Salmo 7:9: Deus examina as emoções (rins) e a mente e vontade (coração). Cristo assume a prerrogativa divina de julgar.",
        "\"Todas as igrejas saberão\": confirma que as cartas são para todas.",
      ],
      echoes: ["Jr 17:10", "Jr 11:20", "Sl 7:9", "Sl 62:12"],
    },
    {
      v: 24,
      text: "Mas a vós, os demais de Tiatira, que não tendes esse ensino e não conhecestes as chamadas profundezas de Satanás, digo: não ponho sobre vós outro peso,",
      notes: [
        "\"Profundezas\" (ta bathea) talvez fosse a expressão do grupo para um conhecimento superior (\"as profundezas de Deus\", cf. 1Co 2:10), que João inverte em \"profundezas de Satanás\". Ou eles mesmos diziam que era preciso conhecer o mal por dentro. Fala-se de tendências gnósticas, mas não há como confirmar.",
        "\"Não ponho outro peso\" lembra o concílio de Jerusalém: \"não vos impor maior encargo\" além de abster-se do sacrificado a ídolos e da imoralidade (At 15:28–29).",
      ],
      terms: [{ gr: "τὰ βαθέα", tr: "ta bathea", mean: "as profundezas, os segredos profundos" }],
      echoes: ["At 15:28–29", "1Co 2:10"],
      symbols: ["satanas"],
    },
    {
      v: 25,
      text: "somente o que tendes, retende-o até que eu venha.",
      notes: ["\"Até que eu venha\": a vinda de Cristo é o horizonte da perseverança, a mesma que encerra o livro (22:20)."],
    },
    {
      v: 26,
      text: "Ao vencedor, que guardar as minhas obras até o fim, darei autoridade sobre as nações,",
      notes: [
        "\"Minhas obras\" contrasta com \"as obras dela\" (v. 22).",
        "A promessa de reinar com Cristo aparece de novo em 3:21, 5:10, 20:4 e 22:5.",
      ],
      symbols: ["nacoes"],
    },
    {
      v: 27,
      text: "e ele as governará com vara de ferro, como se quebram os vasos de barro, assim como eu também recebi do meu Pai,",
      notes: [
        "Citação do Salmo 2:8–9, salmo da coroação do rei messiânico. O hebraico diz \"as quebrarás com vara de ferro\"; os Setenta leram as mesmas consoantes como \"as pastorearás\" (poimaneis). João usa o verbo de pastorear, de modo que o cetro é também cajado: governar com firmeza, inclusive julgando.",
        "\"Vasos de barro\" quebrados: para uma cidade de oleiros, imagem familiar. O mesmo Salmo 2 é aplicado ao filho varão em 12:5 e ao cavaleiro em 19:15.",
      ],
      terms: [{ gr: "ποιμαίνω", tr: "poimainō", mean: "pastorear, governar" }],
      echoes: ["Sl 2:8–9", "Jr 19:11"],
      symbols: ["vara-de-ferro"],
    },
    {
      v: 28,
      text: "e lhe darei a estrela da manhã.",
      notes: [
        "Em 22:16 Jesus diz: \"Eu sou a brilhante estrela da manhã\". A promessa é o próprio Cristo, ou participar da sua glória.",
        "A estrela da manhã é o planeta Vênus. Números 24:17 (a profecia de Balaão: \"uma estrela procederá de Jacó\") era lida como messiânica. Em Roma, Vênus era ligada à casa de Júlio César, que se dizia descendente da deusa; alguns intérpretes veem aqui um contraste com a soberania imperial, o que é uma sugestão, não algo que o texto diga.",
        "Daniel 12:3 promete que os sábios brilharão como estrelas.",
      ],
      echoes: ["Nm 24:17", "Dn 12:3", "2Pe 1:19", "Is 14:12"],
      symbols: ["estrelas"],
    },
    {
      v: 29,
      text: "Quem tem ouvidos ouça o que o Espírito diz às igrejas.",
      notes: [
        "Nas três primeiras cartas a fórmula vem antes da promessa; a partir de Tiatira, vem depois. A mudança não tem explicação segura; alguns veem aqui a divisão das sete cartas em 3 + 4.",
      ],
    },
  ],
};
