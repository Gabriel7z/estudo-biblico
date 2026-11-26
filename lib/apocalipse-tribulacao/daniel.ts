import type { Decree, Passage, Reading } from "./types";

export const danielIntro: string[] = [
  "Daniel 9 começa no primeiro ano de Dario, o medo (9:1), logo depois da queda da Babilônia (539 a.C., segundo a cronologia tradicional do livro). Daniel lê em Jeremias que a desolação de Jerusalém duraria setenta anos (Jr 25:11–12; 29:10) e responde com uma longa oração de confissão pelo pecado do povo (Dn 9:3–19).",
  "Enquanto ainda ora, o anjo Gabriel chega \"na hora da oferta da tarde\" (9:21) e traz uma resposta que amplia os setenta anos de Jeremias para \"setenta semanas\" (9:24). A palavra hebraica shavua designa um grupo de sete; quase todos os intérpretes entendem semanas de anos, isto é, 70 × 7 = 490 anos. A ideia combina com o ciclo de anos sabáticos e de jubileus da Lei (Lv 25:1–12) e com a ameaça de castigo \"sete vezes mais\" (Lv 26:18–35), e 2 Crônicas 36:21 já liga os setenta anos do exílio aos sábados da terra.",
  "Os quatro versículos de 9:24–27 estão entre os mais discutidos da Bíblia. O hebraico é difícil, a pontuação muda o sentido do versículo 25, e cada pronome (\"ele\", \"o seu fim\") tem mais de um antecedente possível. Por isso a página mostra o texto em paráfrase, as dificuldades do original e, para cada ponto, como as principais leituras o entendem.",
];

export const danielReadingsLegend: Reading[] = [
  {
    school: "Messiânica contínua",
    text: "As 70 semanas correm sem interrupção e se cumprem na primeira vinda de Cristo: o Ungido aparece depois de 69 semanas, é morto na metade da 70ª, e a destruição de Jerusalém em 70 d.C. é consequência da rejeição. Leitura comum na tradição cristã antiga e medieval, entre muitos reformados, historicistas e adventistas, e entre preteristas.",
  },
  {
    school: "Dispensacionalista (com intervalo)",
    text: "As 69 primeiras semanas terminam pouco antes da morte do Messias; entre a 69ª e a 70ª há um intervalo (a era da igreja, não prevista em Daniel); a 70ª semana é um período futuro de sete anos, a tribulação, em que o \"príncipe que há de vir\" (o Anticristo) faz uma aliança com Israel e a quebra na metade.",
  },
  {
    school: "Histórico-crítica (macabeia)",
    text: "O livro de Daniel teria recebido a forma final por volta de 167–164 a.C., durante a perseguição de Antíoco IV Epífanes. As semanas levam do exílio até essa crise: o ungido morto seria o sumo sacerdote Onias III (assassinado c. 171 a.C., 2Mc 4:33–35), e o \"príncipe que há de vir\", Antíoco. Os números são lidos como esquema, não como cronologia exata.",
  },
  {
    school: "Simbólica",
    text: "As 70 semanas são um período simbólico completo (sete vezes dez) que vai do fim do exílio até a consumação; a última semana cobre a era da igreja e termina com a oposição final ao povo de Deus. Leitura de alguns amilenaristas.",
  },
];

export const danielPassages: Passage[] = [
  {
    id: "dn-9-24",
    ref: "Daniel 9:24",
    book: "Dn",
    chapter: 9,
    from: 24,
    to: 24,
    title: "Setenta semanas e seis objetivos",
    text: "Setenta semanas estão determinadas sobre o teu povo e sobre a tua santa cidade, para fazer cessar a transgressão, dar fim ao pecado, expiar a iniquidade, trazer a justiça eterna, selar a visão e o profeta e ungir o Santo dos Santos.",
    notes: [
      "\"Determinadas\" (nechtak) aparece só aqui na Bíblia hebraica; o sentido provável é \"cortadas\", \"delimitadas\": um tempo fixado por Deus.",
      "O alvo é \"o teu povo e a tua santa cidade\": Israel e Jerusalém. Os dispensacionalistas insistem nesse foco para separar Israel da igreja; outras leituras entendem que o povo de Deus se alarga em Cristo.",
      "Os seis objetivos formam dois grupos de três. Os três primeiros tratam do pecado: (1) fazer cessar a transgressão (pesha', rebelião); (2) dar fim ao pecado (o texto escrito diz \"selar\" os pecados, a leitura dos massoretas diz \"acabar\"); (3) expiar a iniquidade (kipper, o verbo do Dia da Expiação). Os três últimos tratam da restauração: (4) trazer a justiça eterna; (5) selar a visão e o profeta, isto é, confirmar ou encerrar a profecia; (6) ungir o \"santo dos santos\".",
      "\"Santo dos santos\" (qodesh qodashim), sem artigo, em geral designa o lugar santíssimo ou o altar e os objetos consagrados do santuário (Êx 29:37; 30:29). Por isso muitos pensam na consagração de um santuário: a rededicação do templo em 164 a.C. (leitura macabeia), o templo futuro (dispensacionalistas) ou Cristo e a igreja como templo (leitura messiânica). Muitos intérpretes cristãos antigos leram aqui uma pessoa, o próprio Messias.",
      "Para a leitura messiânica, os seis objetivos se cumpriram na cruz e na ressurreição (Hb 9:12–14, 26). Para a dispensacionalista, só se cumprem por completo na volta de Cristo, quando Israel for restaurado (Rm 11:26–27). Para a macabeia, descrevem a esperança da purificação depois da crise de Antíoco.",
    ],
    terms: [
      { gr: "שָׁבֻעִים שִׁבְעִים", tr: "shavu'im shiv'im", mean: "setenta semanas (grupos de sete)" },
      { gr: "נֶחְתַּךְ", tr: "nechtak", mean: "determinado, delimitado, cortado" },
      { gr: "לְכַפֵּר עָוֹן", tr: "lekhapper 'awon", mean: "expiar a iniquidade" },
      { gr: "קֹדֶשׁ קָדָשִׁים", tr: "qodesh qodashim", mean: "santo dos santos, coisa santíssima" },
    ],
  },
  {
    id: "dn-9-25",
    ref: "Daniel 9:25",
    book: "Dn",
    chapter: 9,
    from: 25,
    to: 25,
    title: "Da ordem de reconstruir até um ungido: 7 + 62 semanas",
    text: "Sabe e entende: desde a saída da ordem para restaurar e reconstruir Jerusalém até um ungido, um príncipe, haverá sete semanas e sessenta e duas semanas; a cidade será reconstruída com praça e fosso, mas em tempos de angústia.",
    notes: [
      "\"A ordem\" (davar, \"palavra\") pode ser uma palavra de Deus (como a profecia de Jeremias, Jr 29:10) ou um decreto de um rei. Os candidatos estão na tabela abaixo: Ciro (538 a.C.), Artaxerxes I a Esdras (458/457 a.C.) e Artaxerxes I a Neemias (445/444 a.C.).",
      "\"Um ungido, um príncipe\" (mashiach nagid) não tem artigo. A palavra mashiach se aplica no Antigo Testamento a reis, sacerdotes e até a Ciro (Is 45:1). A leitura cristã tradicional vê aqui Jesus, o Messias; a leitura macabeia vê Ciro ou o sumo sacerdote Josué, que voltou do exílio (Ed 3:2).",
      "A pontuação muda o sentido. O texto massorético (o hebraico padrão, com sinais acrescentados na Idade Média) põe uma pausa forte depois de \"sete semanas\": o ungido viria depois de 7 semanas (49 anos), e as 62 semanas seriam o tempo da cidade reconstruída. Teodócio, a Vulgata e muitas traduções (como a de Almeida) juntam os números: o ungido vem depois de 7 + 62 = 69 semanas (483 anos). As leituras messiânica e dispensacionalista adotam a segunda forma; a macabeia, em geral, a primeira.",
      "Por que dividir em 7 e 62? Os que somam as duas partes pensam que as 7 semanas (49 anos) correspondem ao período de reconstrução da cidade nos dias de Esdras e Neemias; a pausa massorética faz das 7 semanas o tempo até o primeiro ungido.",
      "\"Praça e fosso\" (rechov vecharuts): a cidade com espaço público e defesa. \"Em tempos de angústia\": Neemias 4 e 6 contam a oposição durante a reconstrução das muralhas.",
    ],
    terms: [
      { gr: "מָשִׁיחַ נָגִיד", tr: "mashiach nagid", mean: "um ungido, um príncipe (líder)" },
      { gr: "דָּבָר", tr: "davar", mean: "palavra, ordem, decreto" },
    ],
  },
  {
    id: "dn-9-26",
    ref: "Daniel 9:26",
    book: "Dn",
    chapter: 9,
    from: 26,
    to: 26,
    title: "O ungido cortado e o povo do príncipe que há de vir",
    text: "Depois das sessenta e duas semanas, o ungido será cortado e ficará sem nada; e o povo de um príncipe que há de vir destruirá a cidade e o santuário. O fim virá como uma inundação, e até o fim haverá guerra; as desolações estão decretadas.",
    notes: [
      "\"Será cortado\" (yikkaret) é o verbo usado para a pena de morte e para a eliminação de alguém do povo (Lv 7:20; Is 53:8 usa outro verbo com sentido parecido, \"foi cortado da terra dos viventes\"). \"E não terá nada\" (ve'en lo) é obscuro: \"nada para si\", \"ninguém por ele\", ou \"sem sucessor\".",
      "Leitura messiânica e dispensacionalista: o Ungido cortado é Jesus, morto depois da 69ª semana. Para a messiânica contínua, a morte ocorre na metade da 70ª semana (v. 27); para a dispensacionalista, ocorre depois da 69ª e antes do intervalo.",
      "Leitura macabeia: o ungido é o sumo sacerdote Onias III, deposto e depois assassinado por volta de 171 a.C. (2Mc 4:33–35).",
      "\"O povo do príncipe que há de vir destruirá a cidade e o santuário\": quase todas as leituras cristãs veem aqui os romanos, que destruíram Jerusalém e o templo em 70 d.C. sob Tito. A diferença está no \"príncipe\": para a leitura contínua, é Tito (ou o próprio Messias, cujo juízo vem por meio dos romanos); para a dispensacionalista, é um governante futuro saído do mesmo povo (o \"Império Romano restaurado\"), o Anticristo. Para a leitura macabeia, o povo é o exército de Antíoco IV, que saqueou Jerusalém em 169 e 167 a.C. (1Mc 1:20–40).",
      "A destruição de 70 d.C. é narrada em detalhe por Flávio Josefo (Guerra dos Judeus, livros 5–6). Jesus a anuncia em Mateus 24:2 e Lucas 19:43–44 e 21:20–24.",
    ],
    terms: [{ gr: "יִכָּרֵת", tr: "yikkaret", mean: "será cortado, eliminado (morto)" }],
  },
  {
    id: "dn-9-27",
    ref: "Daniel 9:27",
    book: "Dn",
    chapter: 9,
    from: 27,
    to: 27,
    title: "A aliança, a metade da semana e a abominação desoladora",
    text: "Ele confirmará uma aliança com muitos por uma semana; na metade da semana fará cessar o sacrifício e a oferta; e sobre a asa das abominações virá o desolador, até que a destruição decretada se derrame sobre o desolador.",
    notes: [
      "Quem é \"ele\"? Gramaticalmente, o antecedente mais próximo é \"o príncipe que há de vir\" (v. 26), e é assim que leem os dispensacionalistas e os críticos (Antíoco). A leitura messiânica entende que o sujeito principal da passagem é o Ungido (vv. 25–26), e que \"ele\" é Cristo.",
      "\"Confirmará (ou fará prevalecer) uma aliança com muitos\" (higbir berit larabbim). Leitura messiânica: Cristo confirma a nova aliança, \"o sangue da aliança derramado por muitos\" (Mt 26:28; ver Is 53:11–12). Dispensacionalista: o Anticristo faz um acordo de sete anos com Israel e o quebra na metade. Macabeia: Antíoco se alia aos judeus helenizantes que \"fizeram aliança com as nações\" (1Mc 1:11–15).",
      "\"Na metade da semana fará cessar o sacrifício e a oferta\": três anos e meio. Leitura messiânica: a morte de Cristo, depois de um ministério de cerca de três anos e meio, torna os sacrifícios sem efeito (Hb 10:8–18), e o véu se rasga (Mt 27:51). Dispensacionalista: os sacrifícios de um templo futuro são interrompidos pelo Anticristo (2Ts 2:4). Macabeia: Antíoco proibiu os sacrifícios em dezembro de 167 a.C. (1Mc 1:44–54); o culto foi restaurado em dezembro de 164 a.C. (1Mc 4:52–54), cerca de três anos depois (a festa de Hanucá lembra essa rededicação).",
      "\"Sobre a asa das abominações virá o desolador\" (shiqquts meshomem, \"abominação que desola\"). A mesma expressão volta em Daniel 11:31 e 12:11, e 1 Macabeus 1:54 a usa (em grego, bdelygma erēmōseōs) para o altar pagão erguido sobre o altar dos holocaustos em 167 a.C., ligado a Zeus Olímpico (2Mc 6:2). Muitos estudiosos veem em shiqquts meshomem um jogo de palavras com Baal Shamem, \"senhor dos céus\", nome semítico de Zeus. \"Asa\" pode ser o canto (pináculo) do templo ou do altar.",
      "Jesus retoma a expressão em Mateus 24:15 (\"a abominação da desolação, de que falou o profeta Daniel\") como algo ainda futuro para os discípulos. Lucas 21:20 traduz o aviso por \"Jerusalém cercada de exércitos\". Daí as leituras: os exércitos romanos ou a profanação do templo pelos zelotes em 66–70 d.C. (preteristas e leitura contínua), ou uma profanação futura (futuristas, ligando a 2Ts 2:4 e Ap 13:14–15).",
      "\"Até que a destruição decretada se derrame sobre o desolador\": o opressor também será julgado. Antíoco morreu em 164 a.C. (1Mc 6:1–16); a leitura futurista vê aqui o fim do Anticristo (Ap 19:20).",
    ],
    terms: [
      { gr: "הִגְבִּיר בְּרִית", tr: "higbir berit", mean: "confirmar, fazer prevalecer uma aliança" },
      { gr: "שִׁקּוּץ מְשֹׁמֵם", tr: "shiqquts meshomem", mean: "abominação que desola" },
      { gr: "βδέλυγμα τῆς ἐρημώσεως", tr: "bdelygma tēs erēmōseōs", mean: "abominação da desolação (Septuaginta; Mt 24:15)" },
    ],
  },
];

export const decrees: Decree[] = [
  {
    id: "ciro",
    name: "Decreto de Ciro",
    date: "538 a.C.",
    refs: "Ed 1:1–4; 6:3–5; Is 44:28; 45:13",
    scope: "Autoriza a volta dos exilados e a reconstrução do templo. Isaías 44:28 diz que Ciro dirá de Jerusalém: \"seja reconstruída\".",
    calc: [
      "538 a.C. − 483 anos = 55 a.C.: não chega a nenhum ungido conhecido, por isso quem soma 69 semanas literais quase não parte daqui.",
      "Leitura macabeia: parte da palavra de Jeremias (c. 587 a.C.) e chega, depois de 7 semanas (49 anos), a 538 a.C. e a Ciro, chamado \"ungido\" em Isaías 45:1. As 62 semanas seguintes (434 anos) levariam a 104 a.C., cerca de 67 anos depois da morte de Onias III; os defensores dessa leitura tratam os números como esquema, e não como cronologia precisa.",
    ],
    usedBy: "Leitura macabeia (como marco das 7 semanas) e leituras simbólicas.",
  },
  {
    id: "esdras",
    name: "Decreto de Artaxerxes I a Esdras",
    date: "458/457 a.C. (7º ano de Artaxerxes)",
    refs: "Ed 7:7–26; ver 9:9",
    scope: "Autoriza Esdras a restabelecer o culto e a Lei, nomear juízes e magistrados e usar recursos do tesouro real. Esdras 9:9 agradece um \"muro\" em Judá e Jerusalém, palavra que pode ser figurada.",
    calc: [
      "Anos solares: 457 a.C. + 483 anos (69 semanas) = 27 d.C. (não há ano zero). Muitos datam aí o batismo de Jesus (\"ungido\" pelo Espírito, Lc 3:21–22; 4:18; At 10:38), com base em Lucas 3:1, conforme a contagem dos anos de Tibério.",
      "Metade da 70ª semana: 27 + 3½ = cerca de 30/31 d.C., a crucifixão. Fim da 70ª semana: 34 d.C., data ligada à morte de Estêvão e à saída do evangelho para além dos judeus (At 7–8).",
    ],
    usedBy: "Leitura messiânica contínua (muitos reformados e historicistas, adventistas).",
  },
  {
    id: "neemias",
    name: "Decreto de Artaxerxes I a Neemias",
    date: "445/444 a.C. (mês de nisã do 20º ano de Artaxerxes)",
    refs: "Ne 2:1–8",
    scope: "Autoriza Neemias a reconstruir a cidade, os portões e as muralhas, com madeira do bosque real. É o único decreto que fala explicitamente de reconstruir a cidade.",
    calc: [
      "Anos solares: 444 a.C. + 483 = 40 d.C., data tardia demais para a morte de Jesus. Por isso esta opção vem em geral com o cálculo do \"ano profético\" de 360 dias.",
      "Ano profético (uma interpretação): 69 semanas × 7 anos × 360 dias = 173.880 dias, o que equivale a cerca de 476 anos solares. 444 a.C. + 476 = 33 d.C. A base do ano de 360 dias é a equivalência entre 42 meses e 1.260 dias em Apocalipse 11:2–3 e 12:6, e os 150 dias do dilúvio contados como cinco meses (Gn 7:11, 24; 8:3–4).",
      "Esse cálculo foi popularizado por Sir Robert Anderson em The Coming Prince (1894), que contou de março de 445 a.C. até a entrada triunfal em 32 d.C., e revisado por Harold Hoehner em Chronological Aspects of the Life of Christ (1977), que chegou a 444 a.C. → 30 de março de 33 d.C. Os críticos lembram que nem o calendário persa nem o judaico usavam anos de 360 dias, e que as datas exatas da crucifixão são debatidas.",
    ],
    usedBy: "Leitura dispensacionalista (com intervalo).",
  },
];

/** Daniel 12:11–12 e os números que se ligam à metade da semana */
export const danielNumbers: { label: string; value: string; refs: string; note: string }[] = [
  {
    label: "Um tempo, dois tempos e metade de um tempo",
    value: "3½ \"tempos\"",
    refs: "Dn 7:25; 12:7; Ap 12:14",
    note: "Em Daniel 7:25, o tempo em que os santos são entregues ao \"chifre pequeno\"; em Daniel 12:7, a duração até o fim do poder que esmaga o povo santo.",
  },
  {
    label: "Quarenta e dois meses",
    value: "42 meses",
    refs: "Ap 11:2; 13:5",
    note: "O tempo em que as nações pisam a cidade santa e em que a besta age.",
  },
  {
    label: "Mil duzentos e sessenta dias",
    value: "1.260 dias",
    refs: "Ap 11:3; 12:6",
    note: "O tempo da profecia das duas testemunhas e da proteção da mulher no deserto.",
  },
  {
    label: "Mil duzentos e noventa dias",
    value: "1.290 dias",
    refs: "Dn 12:11",
    note: "Contados \"desde o tempo em que for tirado o sacrifício contínuo e posta a abominação desoladora\". São 30 dias a mais que 1.260.",
  },
  {
    label: "Mil trezentos e trinta e cinco dias",
    value: "1.335 dias",
    refs: "Dn 12:12",
    note: "\"Feliz o que esperar e chegar a mil trezentos e trinta e cinco dias\": 45 dias a mais que 1.290. Leituras: um período de transição depois da volta de Cristo (futuristas); ajustes ao calendário durante a crise de Antíoco (críticos); anos, num esquema dia-ano (historicistas); números simbólicos de perseverança.",
  },
];
