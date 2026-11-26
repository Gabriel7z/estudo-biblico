import type { KeyText, View } from "./types";

export const framing: string[] = [
  "O debate sobre \"pré\", \"meio\" e \"pós\" pergunta quando acontece o arrebatamento da igreja (1Ts 4:16–17) em relação a um período futuro de sete anos de tribulação. Esse período vem da leitura futurista da 70ª semana de Daniel (Dn 9:27), dividida em duas metades de três anos e meio, que se ligam aos 42 meses e 1.260 dias do Apocalipse.",
  "Por isso o debate existe quase só dentro do pré-milenarismo futurista, que espera a volta de Cristo antes de um reino de mil anos (Ap 20). As quatro posições abaixo concordam que haverá uma tribulação final, um Anticristo e uma volta visível de Cristo; discordam sobre se a igreja passará por esse período, e por quanto dele.",
  "A palavra \"arrebatamento\" vem do verbo de 1 Tessalonicenses 4:17, harpagēsometha (\"seremos arrebatados\"), que a Vulgata traduziu por rapiemur; daí o inglês rapture. Todas as tradições cristãs creem que os fiéis vivos serão transformados e se encontrarão com o Senhor (1Co 15:51–52); a questão é quando, e se esse encontro é um evento separado da volta visível.",
];

export const views: View[] = [
  {
    id: "pre",
    name: "Pré-tribulacionismo",
    summary:
      "O arrebatamento acontece antes da 70ª semana. A igreja é levada ao encontro de Cristo nos ares, sem aviso prévio; depois vêm os sete anos de tribulação, centrados em Israel; no fim, Cristo volta visivelmente com os santos para reinar mil anos. A vinda de Cristo tem, portanto, duas fases: o arrebatamento (para os santos) e a manifestação (com os santos).",
    texts: ["1Ts 4:13–18", "1Ts 1:10; 5:9", "Ap 3:10", "Jo 14:1–3", "Ap 4:1", "Dn 9:24–27", "Tt 2:13"],
    arguments: [
      "A igreja não está destinada à ira (1Ts 1:10; 5:9), e toda a 70ª semana é vista como tempo da ira de Deus.",
      "Cristo promete guardar a igreja \"da hora da provação que virá sobre o mundo inteiro\" (Ap 3:10): guardar \"de\" (tērein ek) a própria hora, e não só dentro dela.",
      "A palavra \"igreja\" (ekklēsia) aparece 19 vezes nos capítulos 1–3 do Apocalipse e não volta até 22:16; nos capítulos de juízo, fala-se de \"santos\" e de Israel.",
      "A 70ª semana, como as outras 69, diz respeito a \"teu povo e tua santa cidade\" (Dn 9:24), isto é, a Israel; a igreja seria um parêntese não previsto em Daniel.",
      "Iminência: o Novo Testamento pede que se espere o Senhor a qualquer momento (Tt 2:13; Tg 5:8–9), o que só faz sentido se nenhum sinal da tribulação precisar acontecer antes.",
    ],
    objections: [
      "Nenhum texto afirma explicitamente um arrebatamento antes da tribulação; a posição depende de inferências combinadas.",
      "Os textos usam as mesmas palavras (parousia, \"vinda\"; apokalypsis, \"revelação\") para o arrebatamento e para a volta visível (1Ts 4:15; 2Ts 2:1, 8; Mt 24:27), o que sugere um só evento.",
      "Há santos durante a tribulação (Ap 7:9–14; 13:7), e Jesus em João 17:15 pede que os discípulos sejam guardados \"do maligno\" (tērēsēs ek) sem serem tirados do mundo.",
      "A distinção radical entre Israel e igreja é contestada por muitos (Gl 3:28–29; Ef 2:14–16).",
      "Origem recente: a forma sistematizada aparece só no século XIX.",
    ],
    origin: [
      "Formulada nos anos 1830 por John Nelson Darby, entre os Irmãos de Plymouth, como parte do sistema dispensacionalista. Difundida nos Estados Unidos pelas conferências bíblicas do fim do século XIX, pela Bíblia de Referência Scofield (1909), por escolas como o Seminário Teológico de Dallas e, no fim do século XX, por livros populares como A Agonia do Planeta Terra (Hal Lindsey, 1970) e a série Deixados para Trás (Tim LaHaye e Jerry Jenkins, 1995–2007).",
      "Os defensores apontam antecedentes, como um sermão atribuído a Efrém (o Pseudo-Efrém, de data incerta, entre os séculos IV e VII) que fala dos santos \"reunidos antes da tribulação\", e o batista Morgan Edwards (1788). O sentido desses textos é debatido. Também é debatida a tese de que Darby teria tirado a ideia de uma visão de Margaret MacDonald (1830).",
    ],
  },
  {
    id: "meio",
    name: "Meio-tribulacionismo",
    summary:
      "O arrebatamento acontece na metade da 70ª semana. A igreja passa pela primeira metade (as dores e as perseguições do início) e é arrebatada antes da grande tribulação, os 3½ anos finais em que se derrama a ira de Deus. Muitos meio-tribulacionistas identificam a \"última trombeta\" de 1 Coríntios 15:52 com a sétima trombeta do Apocalipse (Ap 11:15).",
    texts: ["Dn 9:27", "1Co 15:51–52", "Ap 11:11–15", "Mt 24:15–21", "1Ts 5:9"],
    arguments: [
      "Daniel e o Apocalipse dividem a semana em duas metades; a ira e a \"grande tribulação\" começam na metade, com a abominação desoladora (Dn 9:27; Mt 24:15, 21).",
      "A \"última trombeta\" (1Co 15:52) seria a sétima trombeta (Ap 11:15), tocada no meio da sequência de juízos.",
      "A subida das duas testemunhas ao céu numa nuvem (Ap 11:12) seria uma imagem do arrebatamento no meio da semana.",
    ],
    objections: [
      "A sétima trombeta do Apocalipse faz parte de uma série de juízos; a \"última trombeta\" de Paulo pode ser simplesmente a trombeta final de Deus (Mt 24:31; 1Ts 4:16), sem relação com a série.",
      "No próprio Apocalipse, a sétima trombeta não está claramente na metade da semana.",
      "As duas testemunhas são uma figura específica; não é evidente que representem a igreja inteira arrebatada.",
      "Poucos defensores; a posição é muitas vezes vista como uma solução intermediária.",
    ],
    origin: [
      "Posição do século XX, sempre minoritária. Um dos defensores mais conhecidos foi Gleason Archer, que a apresentou no livro conjunto The Rapture: Pre-, Mid-, or Post-Tribulational? (1984), ao lado de Paul Feinberg (pré) e Douglas Moo (pós).",
    ],
  },
  {
    id: "pre-ira",
    name: "Pré-ira",
    tag: "variante",
    summary:
      "Variante próxima do meio-tribulacionismo, mas com outro momento. O arrebatamento acontece depois da metade da semana, durante a grande tribulação (a perseguição do Anticristo), mas antes da ira de Deus, o Dia do Senhor, que começa com o sétimo selo e inclui as trombetas e as taças. Os dias da perseguição são \"abreviados\" (Mt 24:22) pela vinda de Cristo para buscar os seus.",
    texts: ["Mt 24:21–31", "Ap 6:12–17", "Ap 7:9–14", "1Ts 4:13–5:9", "Jl 2:31"],
    arguments: [
      "A Bíblia distingue a tribulação causada pelos homens e por Satanás (que os fiéis sofrem) da ira de Deus (da qual são guardados, 1Ts 5:9).",
      "No sexto selo os homens dizem que \"chegou o grande dia da ira\" (Ap 6:17), com os mesmos sinais cósmicos que precedem a vinda em Mateus 24:29 e o Dia do Senhor em Joel 2:31.",
      "Logo depois, aparece no céu uma multidão inumerável \"que vem da grande tribulação\" (Ap 7:9–14), lida como a igreja recém-arrebatada.",
      "Mateus 24:31 (reunião dos escolhidos) segue a grande tribulação, mas a vinda acontece antes do fim da semana.",
    ],
    objections: [
      "Muitos intérpretes entendem que a ira já está presente nos primeiros selos, abertos pelo Cordeiro (Ap 6:1, 16), e não só a partir do sétimo.",
      "A cronologia exige separar a vinda para os santos (dentro da semana) e a vitória final (no fim), como o pré-tribulacionismo, o que tem as mesmas dificuldades.",
      "A multidão de Apocalipse 7 pode ser lida como os mártires ou o povo de Deus de todos os tempos, sem indicar um arrebatamento.",
      "Posição muito recente, sem antecedentes claros na história da igreja.",
    ],
    origin: [
      "Formulada por Robert Van Kampen e divulgada por Marvin Rosenthal no livro The Pre-Wrath Rapture of the Church (1990); Van Kampen publicou The Sign (1992). É apresentada aqui como variante: concorda com o pós-tribulacionismo que a igreja enfrenta o Anticristo e com o pré-tribulacionismo que ela é retirada antes da ira de Deus.",
    ],
  },
  {
    id: "pos",
    name: "Pós-tribulacionismo",
    summary:
      "A igreja passa pela tribulação, guardada por Deus mas não retirada. O arrebatamento e a volta visível de Cristo são um único evento, no fim: os santos ressuscitados e os vivos transformados sobem \"ao encontro\" do Senhor e o acompanham na sua vinda à terra, como uma cidade sai ao encontro de um rei que chega.",
    texts: ["Mt 24:29–31", "1Ts 4:15–17", "2Ts 1:6–10", "2Ts 2:1–8", "1Co 15:51–52", "Ap 20:4–6", "Jo 17:15"],
    arguments: [
      "Mateus 24:29–31 põe a reunião dos escolhidos, com trombeta, \"logo depois da tribulação\"; é o mesmo quadro de 1 Tessalonicenses 4:16 e 1 Coríntios 15:52 (trombeta, anjos, nuvens, ressurreição).",
      "Paulo diz que \"a nossa reunião com ele\" não virá antes da apostasia e da manifestação do homem da iniquidade (2Ts 2:1–3); e que o descanso dos aflitos virá \"quando o Senhor Jesus se revelar do céu com os anjos\" em fogo (2Ts 1:7).",
      "A palavra apantēsis (\"encontro\", 1Ts 4:17) designava a delegação que saía da cidade para receber uma autoridade e voltava com ela (ver Mt 25:6; At 28:15).",
      "A \"primeira ressurreição\" (Ap 20:4–6) inclui os que não adoraram a besta e acontece depois da volta de Cristo (Ap 19); não há ressurreição dos santos antes disso no Apocalipse.",
      "Ser guardado \"da hora da provação\" (Ap 3:10) pode significar proteção dentro dela, como em João 17:15 (\"não peço que os tires do mundo, mas que os guardes do maligno\").",
    ],
    objections: [
      "Se todos os fiéis são arrebatados e glorificados na volta, quem entrará no milênio em corpos mortais para povoá-lo (Is 65:20; Ap 20:7–9)? (Respostas comuns: os que se convertem na volta, ou o remanescente de Israel.)",
      "Parece enfraquecer a esperança iminente: se a tribulação vem antes, o fiel esperaria primeiro o Anticristo, e não Cristo.",
      "Para o pré-tribulacionista, contradiz a promessa de que a igreja não está destinada à ira (1Ts 5:9).",
      "O encontro nos ares seguido de volta imediata à terra é visto por críticos como um movimento sem propósito.",
    ],
    origin: [
      "Na igreja antiga, os autores que trataram do Anticristo, como Ireneu (Contra as Heresias, livro 5) e Hipólito (Sobre o Anticristo), esperavam que a igreja o enfrentasse antes da volta de Cristo; nesse sentido amplo, a expectativa de uma só vinda depois da tribulação foi a mais comum na história da igreja.",
      "Como posição definida dentro do pré-milenarismo moderno, foi defendida no século XX por George Eldon Ladd (The Blessed Hope, 1956), Robert Gundry (The Church and the Tribulation, 1973) e Douglas Moo, entre outros.",
    ],
  },
];

/** Leituras que não usam o esquema de sete anos */
export const otherFrameworks: { name: string; text: string }[] = [
  {
    name: "Amilenarismo",
    text: "Os mil anos de Apocalipse 20 são a era atual. Não há uma 70ª semana futura de sete anos: a tribulação é a condição da igreja ao longo de toda a era (Jo 16:33; At 14:22; Ap 1:9), com uma intensificação no fim. Há uma só volta de Cristo, com ressurreição e juízo gerais; o \"arrebatamento\" de 1 Tessalonicenses 4 é o encontro dos fiéis com Cristo nessa única volta. Posição de Agostinho e da maioria das tradições católica, ortodoxa, luterana e reformada.",
  },
  {
    name: "Pós-milenarismo",
    text: "Cristo volta depois de um longo período de expansão do evangelho. Muitos pós-milenaristas são preteristas parciais e situam a grande tribulação em 66–70 d.C. Também aqui há uma só volta de Cristo no fim.",
  },
  {
    name: "Preterismo",
    text: "A grande tribulação de Mateus 24 e boa parte do Apocalipse se cumpriram no século I (a guerra judaica e a destruição de Jerusalém). O preterismo parcial ainda espera a volta de Cristo, a ressurreição e o juízo; o preterismo completo, que afirma que tudo já se cumpriu, é rejeitado pela grande maioria das igrejas.",
  },
  {
    name: "Historicismo",
    text: "O Apocalipse descreve a história da igreja do século I até o fim; os 1.260 dias são lidos como 1.260 anos (um dia por ano, ver Nm 14:34; Ez 4:6). Foi a leitura dominante entre os protestantes da Reforma até o século XIX e não usa um período final de sete anos.",
  },
];

export const keyTexts: KeyText[] = [
  {
    ref: "Daniel 7:25; 12:7 · Apocalipse 11:2–3; 12:6, 14; 13:5",
    title: "3½ tempos, 42 meses, 1.260 dias",
    says: "Daniel fala de \"um tempo, tempos e metade de um tempo\" de perseguição dos santos; o Apocalipse repete a duração em três formas: 42 meses, 1.260 dias e \"um tempo, tempos e metade de um tempo\".",
    readings: [
      { view: "Futuristas (pré, meio, pré-ira, pós)", text: "A segunda metade (às vezes cada metade) da 70ª semana: 3½ anos literais." },
      { view: "Preteristas", text: "A guerra judaica (66–70 d.C., cerca de 3½ anos) ou a perseguição de Nero (64–68 d.C.)." },
      { view: "Historicistas", text: "1.260 anos, num esquema de dia por ano." },
      { view: "Amilenaristas e idealistas", text: "Símbolo do tempo limitado de perseguição, que cobre a era da igreja (metade de sete: tempo interrompido)." },
    ],
    links: [
      { href: "/apocalipse/capitulo/11#v2", label: "Ap 11:2" },
      { href: "/apocalipse/capitulo/12#v6", label: "Ap 12:6" },
      { href: "/apocalipse/capitulo/12#v14", label: "Ap 12:14" },
      { href: "/apocalipse/capitulo/13#v5", label: "Ap 13:5" },
      { href: "/apocalipse/simbolos#n3-e-meio", label: "Glossário: 3½" },
    ],
  },
  {
    ref: "Daniel 12:11–12",
    title: "1.290 e 1.335 dias",
    says: "Desde que o sacrifício contínuo for tirado e posta a abominação desoladora, 1.290 dias; feliz quem chegar a 1.335 dias.",
    readings: [
      { view: "Futuristas", text: "Os 30 e 45 dias além dos 1.260 seriam um período de transição depois da volta de Cristo (purificação do templo, juízo das nações)." },
      { view: "Histórico-crítica", text: "Ajustes sucessivos durante a crise de Antíoco, quando o fim esperado demorava." },
      { view: "Historicistas", text: "Anos, contados a partir de datas da história da igreja." },
    ],
  },
  {
    ref: "1 Tessalonicenses 4:13–18",
    title: "Seremos arrebatados",
    says: "O Senhor descerá do céu com voz de comando, voz de arcanjo e trombeta de Deus; os mortos em Cristo ressuscitarão primeiro; depois os vivos serão arrebatados com eles nas nuvens ao encontro do Senhor nos ares.",
    readings: [
      { view: "Pré-tribulacionismo", text: "O arrebatamento separado: Cristo vem até os ares e leva a igreja ao céu antes da tribulação." },
      { view: "Pós-tribulacionismo e amilenarismo", text: "A mesma vinda visível de Mateus 24:30–31; os santos sobem \"ao encontro\" (apantēsis) e voltam com o Senhor." },
    ],
  },
  {
    ref: "2 Tessalonicenses 2:1–12",
    title: "A apostasia e o homem da iniquidade",
    says: "Paulo diz que \"a vinda e a nossa reunião com ele\" não virá sem que antes venha a apostasia e se manifeste o homem da iniquidade, que se assenta no santuário de Deus. Algo e alguém o \"detém\" (to katechon, ho katechōn) até ser afastado.",
    readings: [
      { view: "Pré-tribulacionismo", text: "O que detém seria o Espírito Santo atuando pela igreja; retirada a igreja, o homem da iniquidade se revela. Alguns entendem apostasia como \"partida\" (o arrebatamento), leitura minoritária." },
      { view: "Pós-tribulacionismo", text: "A \"reunião\" (o arrebatamento) só acontece depois da manifestação do homem da iniquidade; logo, a igreja estará na terra quando ele surgir." },
      { view: "Outras leituras", text: "O que detém foi identificado com o Império Romano e a ordem civil (leitura antiga, por exemplo em Tertuliano), com a pregação do evangelho ou com um anjo. Agostinho admitiu que não sabia o que Paulo queria dizer (A Cidade de Deus 20.19)." },
    ],
  },
  {
    ref: "1 Coríntios 15:51–52",
    title: "A última trombeta",
    says: "Nem todos dormiremos, mas todos seremos transformados, num instante, num abrir e fechar de olhos, ao som da última trombeta.",
    readings: [
      { view: "Pré-tribulacionismo", text: "\"Última\" para a igreja, sem relação com as trombetas de juízo do Apocalipse." },
      { view: "Meio-tribulacionismo", text: "A sétima trombeta (Ap 11:15), na metade da semana." },
      { view: "Pós-tribulacionismo", text: "A trombeta de Mateus 24:31, depois da tribulação." },
    ],
  },
  {
    ref: "Apocalipse 3:10",
    title: "Guardar da hora da provação",
    says: "À igreja de Filadélfia: \"porque guardaste a palavra da minha perseverança, também eu te guardarei da hora da provação que virá sobre o mundo inteiro\".",
    readings: [
      { view: "Pré-tribulacionismo", text: "Guardar \"de\" (tērēsō ek) a hora: retirada antes do período." },
      { view: "Pós-tribulacionismo", text: "Proteção dentro da provação, como em João 17:15 (mesma construção)." },
      { view: "Preteristas e idealistas", text: "Uma promessa concreta à igreja de Filadélfia diante de uma provação do século I, aplicável a fiéis de outras épocas." },
    ],
    links: [{ href: "/apocalipse/capitulo/3#v10", label: "Estudo de Ap 3:10" }],
  },
  {
    ref: "Apocalipse 4:1",
    title: "\"Sobe para aqui\"",
    says: "Depois das cartas, João vê uma porta aberta no céu e ouve: \"sobe para aqui\".",
    readings: [
      { view: "Alguns pré-tribulacionistas", text: "Uma figura do arrebatamento da igreja antes dos juízos dos capítulos 6–19." },
      { view: "A maioria dos intérpretes", text: "O chamado de João à visão (como Ez 1:1), sem sentido de arrebatamento." },
    ],
    links: [{ href: "/apocalipse/capitulo/4#v1", label: "Estudo de Ap 4:1" }],
  },
  {
    ref: "Apocalipse 7",
    title: "Os 144 mil e a grande multidão",
    says: "Os servos de Deus são selados antes dos juízos; depois aparece uma multidão inumerável \"que vem da grande tribulação\".",
    readings: [
      { view: "Pré-tribulacionismo", text: "Judeus convertidos (os 144 mil) e convertidos durante a tribulação (a multidão), depois do arrebatamento." },
      { view: "Pré-ira", text: "A multidão é a igreja recém-arrebatada, entre o sexto e o sétimo selo." },
      { view: "Pós-tribulacionismo e outras", text: "O povo de Deus selado (protegido) durante a tribulação e depois visto no céu; muitos identificam os 144 mil com a multidão." },
    ],
    links: [
      { href: "/apocalipse/capitulo/7#v4", label: "Ap 7:4" },
      { href: "/apocalipse/capitulo/7#v14", label: "Ap 7:14" },
    ],
  },
  {
    ref: "Apocalipse 19–20",
    title: "A volta de Cristo e a primeira ressurreição",
    says: "O cavaleiro do cavalo branco vem com os exércitos do céu; depois, os que não adoraram a besta voltam à vida e reinam mil anos: \"esta é a primeira ressurreição\".",
    readings: [
      { view: "Pré-tribulacionismo", text: "Os exércitos incluem a igreja, arrebatada antes; a ressurreição de 20:4 completa a dos mártires da tribulação." },
      { view: "Pós-tribulacionismo", text: "A primeira ressurreição vem depois da volta e inclui os que enfrentaram a besta; logo, a ressurreição dos santos (e o arrebatamento) é pós-tribulacional." },
      { view: "Amilenarismo", text: "Ver o estudo de Apocalipse 20: os mil anos são a era atual." },
    ],
    links: [
      { href: "/apocalipse/capitulo/19#v11", label: "Ap 19:11" },
      { href: "/apocalipse/capitulo/20#v4", label: "Ap 20:4" },
    ],
  },
];
