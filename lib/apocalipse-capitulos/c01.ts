import type { Chapter } from "./types";

export const c01: Chapter = {
  n: 1,
  title: "Prólogo e a visão do Filho do Homem",
  parts: ["prologo"],
  summary:
    "O livro se apresenta como revelação de Jesus Cristo, dada por Deus, mostrada por um anjo e escrita por João. Segue uma saudação em forma de carta às sete igrejas da Ásia, um louvor a Cristo e a primeira visão: em Patmos, João vê alguém semelhante a um filho de homem entre sete candelabros de ouro, recebe a ordem de escrever e a explicação de dois símbolos.",
  context: [
    "A Ásia do versículo 4 não é o continente, mas a província romana da Ásia, no oeste da atual Turquia, com capital administrativa em Éfeso. As sete cidades ficam ligadas por uma estrada circular, na ordem em que as cartas aparecem nos capítulos 2 e 3. Patmos é uma ilha pequena do mar Egeu, a uns 60 km a sudoeste de Mileto.",
    "A data do livro é discutida. A tradição mais antiga, de Ireneu de Lião (Contra as Heresias 5.30.3, c. 180 d.C.), põe a visão no fim do reinado de Domiciano (81–96 d.C.). Uma minoria de estudiosos defende uma data antes de 70 d.C., sob Nero ou logo depois, em parte porque o capítulo 11 mede um templo. A escolha da data pesa muito na leitura preterista.",
    "O gênero mistura três formas: apocalipse (revelação por visões e anjos, como Daniel), profecia (1:3; 22:7) e carta (1:4–5; 22:21). O livro não cita o Antigo Testamento com fórmula, mas alude a ele quase versículo por versículo, sobretudo Daniel, Ezequiel, Isaías, Zacarias, Êxodo e Salmos.",
  ],
  readings: [
    { school: "Preterista", text: "Lê \"o que em breve deve acontecer\" (1:1) e \"o tempo está próximo\" (1:3) ao pé da letra para os primeiros leitores: a maior parte do livro trata do primeiro século (a guerra judaica e a queda de Jerusalém em 70, ou o conflito com Roma)." },
    { school: "Historicista", text: "Lê o livro como um panorama em sequência da história da igreja, da época de João até a volta de Cristo; \"em breve\" indica que o cumprimento começa logo e se estende pelos séculos." },
    { school: "Futurista", text: "Entende que a maior parte do livro (sobretudo a partir do capítulo 4) trata dos acontecimentos finais ainda futuros; \"em breve\" exprime a iminência ou a rapidez quando começarem. O versículo 19 é muitas vezes lido como esboço: o que viste (cap. 1), o que é (cap. 2–3) e o que há de acontecer (cap. 4–22)." },
    { school: "Idealista", text: "Lê as visões como retrato simbólico do conflito constante entre Deus e o mal em toda a história, sem amarrar cada imagem a um evento único; \"em breve\" fala da urgência para cada geração." },
  ],
  scenes: ["patmos"],
  extras: [{ href: "/apocalipse/igrejas", label: "Mapa das sete igrejas" }],
  sections: [
    { from: 1, title: "Título e bem-aventurança" },
    { from: 4, title: "Saudação às sete igrejas" },
    { from: 9, title: "A visão em Patmos" },
  ],
  verses: [
    {
      v: 1,
      text: "Revelação de Jesus Cristo, que Deus lhe deu para mostrar aos seus servos o que deve acontecer em breve. Ele a comunicou por meio do seu anjo ao seu servo João.",
      notes: [
        "A cadeia de transmissão tem cinco elos: Deus → Jesus Cristo → anjo → João → servos (as igrejas). O livro reivindica autoridade divina desde a primeira linha.",
        "\"Revelação de Jesus Cristo\" pode ser lida como revelação que vem de Jesus (ele a recebe e transmite) e como revelação sobre Jesus; o texto admite as duas, e o versículo prioriza a primeira.",
        "\"Em breve\" (en tachei) repete Daniel 2:28–29, onde Daniel diz que Deus revelou o que acontecerá \"nos últimos dias\"; João troca o \"no fim dos dias\" por \"em breve\", trazendo o horizonte para perto.",
        "\"Comunicou\" traduz esēmanen, da mesma raiz de sēmeion (sinal): mostrou por sinais. O verbo avisa que a linguagem do livro é simbólica.",
        "João se apresenta só como \"servo\". O livro não diz qual João; a tradição desde Justino Mártir (c. 155 d.C.) e Ireneu o identifica com o apóstolo, filho de Zebedeu. Desde Dionísio de Alexandria (século III) há quem pense em outro João, por causa das diferenças de estilo grego em relação ao Evangelho de João.",
      ],
      terms: [
        { gr: "ἀποκάλυψις", tr: "apokalypsis", mean: "desvelamento, tirar o véu; deu nome ao gênero literário" },
        { gr: "σημαίνω", tr: "sēmainō", mean: "mostrar por sinais, indicar" },
        { gr: "ἐν τάχει", tr: "en tachei", mean: "em breve, depressa" },
      ],
      echoes: ["Dn 2:28–29", "Dn 2:45", "Am 3:7"],
      symbols: ["anjos"],
    },
    {
      v: 2,
      text: "João dá testemunho de tudo o que viu: a palavra de Deus e o testemunho de Jesus Cristo.",
      notes: [
        "\"Palavra de Deus e testemunho de Jesus\" é uma dupla que volta em 1:9, 6:9, 12:17 e 20:4. É o conteúdo da fé pelo qual os fiéis sofrem.",
        "\"Testemunho\" (martyria) ainda não significa \"martírio\" no sentido técnico, mas no livro dar testemunho e morrer estão próximos (2:13; 11:7).",
      ],
      terms: [{ gr: "μαρτυρία", tr: "martyria", mean: "testemunho; daí, mais tarde, mártir" }],
    },
    {
      v: 3,
      text: "Feliz quem lê e felizes os que ouvem as palavras desta profecia e guardam o que nela está escrito, porque o tempo está próximo.",
      notes: [
        "É a primeira das sete bem-aventuranças do livro (1:3; 14:13; 16:15; 19:9; 20:6; 22:7; 22:14).",
        "\"Quem lê\" está no singular e \"os que ouvem\" no plural: retrata a leitura em voz alta no culto da igreja reunida. O livro foi feito para ser ouvido de uma vez.",
        "\"Profecia\": o livro se classifica como profético, e não apenas como predição; \"guardar\" mostra que pede obediência, não só curiosidade.",
        "\"Tempo\" aqui é kairos, o momento decisivo, não a duração cronológica.",
      ],
      terms: [
        { gr: "μακάριος", tr: "makarios", mean: "feliz, bem-aventurado" },
        { gr: "καιρός", tr: "kairos", mean: "tempo oportuno, momento decisivo" },
      ],
      symbols: ["n7"],
    },
    {
      v: 4,
      text: "João, às sete igrejas da Ásia: graça e paz da parte daquele que é, que era e que vem, e dos sete espíritos que estão diante do seu trono,",
      notes: [
        "A saudação segue o formato das cartas de Paulo (\"graça e paz\"). O Apocalipse inteiro é uma carta circular.",
        "\"Sete igrejas\": havia outras igrejas na Ásia (Colossos, Hierápolis, Trôade). O número sete indica que essas sete representam também a igreja toda.",
        "\"Aquele que é, que era e que vem\" ecoa o nome revelado em Êxodo 3:14 (\"Eu sou\"), que a versão grega dos Setenta traduziu \"Eu sou o que é\" (ho ōn). João mantém ho ōn no nominativo mesmo depois da preposição \"da parte de\", uma quebra proposital da gramática para tratar o nome como intocável. O terceiro membro não é \"que será\", mas \"que vem\".",
        "\"Sete espíritos\": muitos intérpretes veem aqui o Espírito Santo em plenitude, à luz de Isaías 11:2 (os dons do Espírito, sete na versão grega) e de Zacarias 4:2–10 (as sete lâmpadas e os olhos do Senhor). Outros veem sete anjos principais da presença, como em Tobias 12:15 e 1 Enoque. A posição entre o Pai e Jesus na fórmula de saudação favorece a primeira leitura.",
      ],
      terms: [{ gr: "ὁ ὢν καὶ ὁ ἦν καὶ ὁ ἐρχόμενος", tr: "ho ōn kai ho ēn kai ho erchomenos", mean: "o que é, o que era e o que vem" }],
      echoes: ["Êx 3:14", "Is 11:2", "Zc 4:2, 10"],
      symbols: ["n7", "sete-espiritos", "trono"],
    },
    {
      v: 5,
      text: "e da parte de Jesus Cristo, a testemunha fiel, o primogênito dentre os mortos e o soberano dos reis da terra. Àquele que nos ama e nos libertou dos nossos pecados pelo seu sangue,",
      notes: [
        "Os três títulos vêm do Salmo 89: o rei davídico é chamado \"primogênito, o mais alto dos reis da terra\" (Sl 89:27), e a lua é \"testemunha fiel no céu\" (Sl 89:37).",
        "\"Testemunha fiel\" aponta para a vida e a morte de Jesus; \"primogênito dentre os mortos\" para a ressurreição (o primeiro de muitos, como em Cl 1:18); \"soberano dos reis da terra\" para o reinado atual, em contraste com o imperador que se dizia senhor.",
        "\"Nos ama\" está no presente; \"nos libertou\" no passado (aoristo), apontando para a cruz. Alguns manuscritos trazem \"nos lavou\" (lousanti) em vez de \"nos libertou\" (lysanti); a diferença em grego é uma letra. As edições críticas preferem \"libertou\".",
      ],
      terms: [
        { gr: "πρωτότοκος", tr: "prōtotokos", mean: "primogênito, primeiro e principal" },
        { gr: "ἄρχων", tr: "archōn", mean: "governante, soberano" },
      ],
      echoes: ["Sl 89:27, 37", "Cl 1:18", "Is 55:4"],
      symbols: ["sangue"],
    },
    {
      v: 6,
      text: "e fez de nós um reino, sacerdotes para o seu Deus e Pai, a ele a glória e o poder para sempre. Amém.",
      notes: [
        "Retoma Êxodo 19:6, a vocação de Israel no Sinai: \"reino de sacerdotes e nação santa\". A igreja recebe a mesma vocação, como em 1 Pedro 2:9 e Apocalipse 5:10.",
        "A libertação pelo sangue (v. 5) e a formação de um reino de sacerdotes reproduzem a ordem do Êxodo: o cordeiro da Páscoa, depois a aliança no Sinai.",
        "A doxologia termina com \"Amém\" (hebraico: firme, verdadeiro): a congregação ouvinte devia responder em voz alta.",
      ],
      echoes: ["Êx 19:6", "Is 61:6", "1Pe 2:9"],
    },
    {
      v: 7,
      text: "Eis que ele vem com as nuvens, e todo olho o verá, até os que o traspassaram, e todas as tribos da terra se lamentarão por causa dele. Sim. Amém.",
      notes: [
        "Combina dois textos: Daniel 7:13 (\"vindo com as nuvens do céu, um como filho de homem\") e Zacarias 12:10 (\"olharão para aquele a quem traspassaram, e o prantearão\"). A mesma combinação aparece em Mateus 24:30, e João 19:37 cita Zacarias 12:10 na crucificação.",
        "Em Zacarias o lamento é \"das famílias da terra\" de Israel; João amplia para \"todas as tribos da terra\". Discute-se se o lamento é de arrependimento (como em Zacarias) ou de terror diante do juízo.",
        "Na leitura preterista, \"os que o traspassaram\" e \"as tribos da terra\" (ou \"da terra\" = de Israel) apontam para o juízo de 70 d.C.; para as demais escolas, o versículo descreve a volta visível de Cristo no fim.",
        "\"Sim. Amém\" junta a afirmação em grego (nai) e em hebraico (amēn).",
      ],
      terms: [{ gr: "ἐξεκέντησαν", tr: "exekentēsan", mean: "traspassaram (com lança)" }],
      echoes: ["Dn 7:13", "Zc 12:10–14", "Mt 24:30", "Jo 19:37"],
      symbols: ["nuvens"],
    },
    {
      v: 8,
      text: "Eu sou o Alfa e o Ômega, diz o Senhor Deus, aquele que é, que era e que vem, o Todo-Poderoso.",
      notes: [
        "Alfa e ômega são a primeira e a última letra do alfabeto grego: Deus está no começo e no fim de tudo. Em 22:13 o mesmo título é dito por Jesus.",
        "É uma das duas únicas vezes em que Deus mesmo fala no livro (aqui e em 21:5–8).",
        "\"Todo-Poderoso\" (pantokratōr) é como os Setenta traduzem \"Senhor dos Exércitos\" (YHWH Tsevaot) em profetas como Amós e Zacarias. Aparece nove vezes no Apocalipse e só uma vez no resto do Novo Testamento (2Co 6:18). Num mundo em que o imperador era aclamado como senhor do mundo, o título é polêmico.",
      ],
      terms: [
        { gr: "Α … Ω", tr: "alpha … ōmega", mean: "primeira e última letra: começo e fim" },
        { gr: "παντοκράτωρ", tr: "pantokratōr", mean: "o que governa tudo, Todo-Poderoso" },
      ],
      echoes: ["Is 41:4", "Is 44:6", "Is 48:12", "Am 4:13"],
      symbols: ["alfa-omega"],
    },
    {
      v: 9,
      text: "Eu, João, vosso irmão e companheiro na tribulação, no reino e na perseverança em Jesus, estava na ilha chamada Patmos por causa da palavra de Deus e do testemunho de Jesus.",
      notes: [
        "Tribulação, reino e perseverança aparecem sob um único artigo em grego: os três são partilhados ao mesmo tempo. O reino já é presente, mas vivido em sofrimento e paciência.",
        "Patmos: ilha rochosa de uns 34 km², no Dodecaneso. Plínio, o Velho (História Natural 4.69), a cita entre as ilhas do Egeu. Os romanos usavam ilhas como lugar de exílio (relegatio), por decisão de governadores. A tradição (Clemente de Alexandria, Eusébio) diz que João foi exilado ali e libertado sob Nerva; o versículo só diz \"por causa da palavra de Deus\", o que também poderia significar que foi ali para pregar, mas o contexto de tribulação favorece o exílio.",
        "A tradição local aponta uma gruta, hoje a Gruta do Apocalipse, abaixo do mosteiro de São João (fundado em 1088). É tradição, não dado arqueológico.",
      ],
      terms: [
        { gr: "θλῖψις", tr: "thlipsis", mean: "tribulação, aperto, pressão" },
        { gr: "ὑπομονή", tr: "hypomonē", mean: "perseverança, ficar firme debaixo do peso" },
      ],
      symbols: ["patmos"],
    },
    {
      v: 10,
      text: "Fiquei em espírito no dia do Senhor e ouvi atrás de mim uma voz forte, como de trombeta,",
      notes: [
        "\"Em espírito\" descreve um estado de visão dado pelo Espírito, como em Ezequiel (Ez 3:12; 11:1). A expressão marca as grandes divisões do livro (1:10; 4:2; 17:3; 21:10).",
        "\"Dia do Senhor\" traduz hē kyriakē hēmera, \"o dia senhorial\". Na Didaquê 14:1 e em Inácio (Magnésios 9:1), início do século II, kyriakē designa o domingo, dia da ressurreição; essa é a leitura mais comum. Alguns o leem como o \"dia do Senhor\" escatológico dos profetas, para o qual João teria sido transportado em visão; mas para isso o grego costuma usar hēmera tou kyriou, outra expressão. Também se nota o contraste com o \"dia de Augusto\" (Sebastē), dias mensais dedicados ao imperador em cidades da Ásia.",
        "A voz \"como de trombeta\" lembra o Sinai, onde a voz de Deus veio com som de trombeta (Êx 19:16, 19).",
      ],
      terms: [{ gr: "κυριακὴ ἡμέρα", tr: "kyriakē hēmera", mean: "dia do Senhor, dia senhorial (domingo)" }],
      echoes: ["Ez 3:12", "Êx 19:16, 19"],
      symbols: ["trombetas"],
    },
    {
      v: 11,
      text: "que dizia: Escreve num livro o que vês e envia às sete igrejas: Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia.",
      notes: [
        "\"Livro\" (biblion) aqui é um rolo de papiro. Um mensageiro levaria a cópia pela estrada.",
        "A ordem segue o percurso de quem desembarca em Éfeso: sobe pelo litoral até Esmirna e Pérgamo, desce para o interior até Tiatira, Sardes, Filadélfia e termina em Laodiceia, num circuito de uns 500 km.",
        "A frase \"Eu sou o Alfa e o Ômega, o primeiro e o último\", que algumas traduções antigas trazem no início deste versículo, falta nos manuscritos mais antigos e não está nas edições críticas.",
      ],
      symbols: ["n7"],
    },
    {
      v: 12,
      text: "Voltei-me para ver de quem era a voz e vi sete candelabros de ouro,",
      notes: [
        "\"Ver a voz\" é uma expressão estranha de propósito, como no Sinai, onde \"o povo via as vozes\" (Êx 20:18, literalmente).",
        "Os candelabros (lychniai) são suportes de lâmpada de óleo, não velas. O candelabro do tabernáculo tinha sete braços em uma só peça (Êx 25:31–37); Zacarias 4:2 vê um candelabro de ouro com sete lâmpadas. Aqui são sete candelabros separados: as igrejas são distintas, mas formam um conjunto. O versículo 20 explica: são as sete igrejas.",
        "Ouro: material do santuário, valor e pureza.",
      ],
      terms: [{ gr: "λυχνία", tr: "lychnia", mean: "candelabro, suporte de lâmpada" }],
      echoes: ["Êx 25:31–37", "Zc 4:2", "Êx 20:18"],
      symbols: ["candelabros", "n7", "ouro"],
    },
    {
      v: 13,
      text: "e no meio dos candelabros alguém semelhante a um filho de homem, vestido com uma túnica até os pés e cingido no peito com um cinto de ouro.",
      notes: [
        "\"Semelhante a um filho de homem\" vem de Daniel 7:13, a figura humana que recebe o reino do Ancião de Dias. Nos evangelhos, \"Filho do Homem\" é o título que Jesus mais usa para si.",
        "Ele está \"no meio\" das igrejas: presente, andando entre elas (2:1).",
        "A túnica até os pés (podērēs) é a palavra usada nos Setenta para a veste do sumo sacerdote (Êx 28:4; Zc 3:4) e para a do homem vestido de linho em Ezequiel 9:2. O cinto de ouro no peito lembra tanto os sacerdotes (Êx 28:4–8) quanto o anjo de Daniel 10:5. A imagem junta sacerdote e rei.",
      ],
      terms: [{ gr: "ποδήρης", tr: "podērēs", mean: "túnica que desce até os pés" }],
      echoes: ["Dn 7:13", "Dn 10:5", "Ez 9:2", "Êx 28:4"],
      symbols: ["filho-do-homem", "ouro", "candelabros"],
    },
    {
      v: 14,
      text: "A cabeça e os cabelos eram brancos como lã branca, como neve, e os olhos como chama de fogo.",
      notes: [
        "Em Daniel 7:9 é o Ancião de Dias, isto é, Deus, quem tem cabelos \"como lã pura\" e veste branca \"como a neve\". João aplica ao Filho do Homem traços do próprio Deus. A versão grega antiga de Daniel 7:13 (Setenta) já diz que o filho de homem veio \"como Ancião de Dias\", o que pode estar por trás da fusão.",
        "Branco: eternidade, sabedoria e pureza, não velhice frágil.",
        "Olhos como chama de fogo vêm de Daniel 10:6 (\"olhos como tochas de fogo\"): visão que penetra tudo. O título volta na carta a Tiatira (2:18) e no cavaleiro de 19:12.",
      ],
      echoes: ["Dn 7:9", "Dn 10:6", "Is 1:18"],
      symbols: ["branco", "fogo"],
    },
    {
      v: 15,
      text: "Os pés eram semelhantes a bronze polido, refinado na fornalha, e a voz como o som de muitas águas.",
      notes: [
        "Bronze polido (chalkolibanon) é uma palavra rara, não atestada antes do Apocalipse; talvez uma liga brilhante de cobre. Daniel 10:6 descreve braços e pés \"como bronze polido\". A carta a Tiatira (2:18) usa o título, e Tiatira era conhecida por guildas de artesãos de bronze.",
        "\"Voz como muitas águas\" é a voz de Deus em Ezequiel 43:2 (\"a voz como o ruído de muitas águas\"). Para quem estava numa ilha, a imagem do mar batendo na rocha é concreta.",
      ],
      terms: [{ gr: "χαλκολίβανον", tr: "chalkolibanon", mean: "bronze fino, polido; palavra rara" }],
      echoes: ["Dn 10:6", "Ez 1:7", "Ez 1:24", "Ez 43:2"],
      symbols: ["muitas-aguas"],
    },
    {
      v: 16,
      text: "Na mão direita tinha sete estrelas, da boca saía uma espada afiada de dois gumes, e o rosto era como o sol brilhando com toda a força.",
      notes: [
        "As sete estrelas são explicadas no versículo 20: são os anjos das sete igrejas. Estão na mão direita: sob o seu poder e cuidado. Moedas de Domiciano mostram o filho morto do imperador sentado sobre o globo cercado de sete estrelas; alguns estudiosos veem aqui um contraste deliberado, mas a ligação é discutida.",
        "A espada (rhomphaia) é a espada longa de lâmina larga. Sai da boca: o poder de Cristo é a sua palavra, como em Isaías 49:2 (\"fez a minha boca como espada afiada\") e Isaías 11:4. Pérgamo, sede do governador com \"direito de espada\" (ius gladii), recebe esse título (2:12). A espada da boca volta em 19:15, 21.",
        "Rosto como o sol: a glória da transfiguração (Mt 17:2) e de Juízes 5:31 (\"os que o amam sejam como o sol quando sai na sua força\").",
      ],
      terms: [{ gr: "ῥομφαία", tr: "rhomphaia", mean: "espada grande, de lâmina larga" }],
      echoes: ["Is 49:2", "Is 11:4", "Jz 5:31", "Mt 17:2"],
      symbols: ["estrelas", "espada", "n7"],
    },
    {
      v: 17,
      text: "Quando o vi, caí aos seus pés como morto. Ele pôs a mão direita sobre mim e disse: Não temas. Eu sou o Primeiro e o Último,",
      notes: [
        "A reação de cair como morto e ser tocado e erguido reproduz Daniel 8:17–18 e 10:8–12, e também Ezequiel 1:28.",
        "\"Não temas\" é a palavra que acompanha as aparições de Deus no Antigo Testamento e as de Jesus nos evangelhos.",
        "\"O Primeiro e o Último\" é título exclusivo de Deus em Isaías 44:6 e 48:12 (\"Eu sou o primeiro e eu sou o último, e além de mim não há Deus\"). Jesus o assume.",
      ],
      echoes: ["Dn 8:17–18", "Dn 10:8–12", "Ez 1:28", "Is 44:6", "Is 48:12"],
      symbols: ["alfa-omega"],
    },
    {
      v: 18,
      text: "aquele que vive. Estive morto, e eis que estou vivo para todo o sempre, e tenho as chaves da morte e do Hades.",
      notes: [
        "\"O que vive\" é outro título de Deus (\"o Deus vivo\").",
        "\"Estive morto\" (egenomēn nekros): a morte foi real e histórica; agora vive para sempre.",
        "Hades é o mundo dos mortos, o equivalente grego do Sheol hebraico, não o lugar do castigo final (que no livro é o lago de fogo, 20:14). Chaves significam autoridade de abrir e fechar: Cristo controla quem entra e quem sai da morte. Na cultura grega, Hécate era tida como guardiã das chaves do Hades.",
      ],
      terms: [{ gr: "ᾅδης", tr: "hadēs", mean: "mundo dos mortos (como o Sheol)" }],
      echoes: ["Is 22:22", "Os 13:14"],
      symbols: ["chaves", "hades"],
    },
    {
      v: 19,
      text: "Escreve, pois, as coisas que viste, as que são e as que hão de acontecer depois destas.",
      notes: [
        "A frase final ecoa outra vez Daniel 2:29, 45 (\"o que há de acontecer depois disto\").",
        "Há duas leituras principais. Na primeira, é um esboço em três partes do livro: o que viste (a visão do cap. 1), o que é (as igrejas, cap. 2–3) e o que vem depois (cap. 4–22); é muito usada pelos futuristas. Na segunda, \"o que viste\" é a revelação toda, explicada em seguida como \"o que é e o que vem\": presente e futuro misturados no livro inteiro.",
      ],
      echoes: ["Dn 2:29, 45"],
    },
    {
      v: 20,
      text: "O mistério das sete estrelas que viste na minha mão direita e dos sete candelabros de ouro é este: as sete estrelas são os anjos das sete igrejas, e os sete candelabros são as sete igrejas.",
      notes: [
        "\"Mistério\" (mystērion) no sentido de Daniel 2: segredo revelado por Deus e agora explicado. Este é um dos raros lugares em que o próprio livro interpreta um símbolo, e ele interpreta símbolo com símbolo: estrelas = anjos.",
        "\"Anjos das igrejas\" (angelos = mensageiro) recebem três leituras: anjos celestes que representam ou guardam cada igreja (como os anjos das nações em Daniel 10); líderes humanos ou bispos (\"mensageiros\"); ou a personificação do espírito de cada igreja. No resto do livro, angelos sempre designa um ser celeste, o que favorece a primeira.",
        "As igrejas como candelabros: têm a função de levar a luz. A ameaça de remover o candelabro (2:5) significa deixar de ser igreja.",
      ],
      terms: [
        { gr: "μυστήριον", tr: "mystērion", mean: "segredo revelado" },
        { gr: "ἄγγελος", tr: "angelos", mean: "mensageiro, anjo" },
      ],
      echoes: ["Dn 2:47", "Dn 10:13, 20–21"],
      symbols: ["estrelas", "candelabros", "anjos", "n7"],
    },
  ],
};
