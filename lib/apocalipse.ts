export type Vision = {
  slug: string;
  order: number;
  title: string;
  ref: string;
  image: string;
  alt: string;
  saw: string[];
  means: string[];
};

export type Church = {
  id: string;
  name: string;
  ancient: string;
  lng: number;
  lat: number;
  ref: string;
  letter: string;
};

export const churches: Church[] = [
  {
    id: "efeso",
    name: "Éfeso",
    ancient: "Éfeso",
    lng: 27.3417,
    lat: 37.9394,
    ref: "Apocalipse 2:1–7",
    letter:
      "A carta reconhece o trabalho, a perseverança e o discernimento contra os falsos apóstolos. O reparo é ter abandonado o primeiro amor. A promessa é comer da árvore da vida.",
  },
  {
    id: "esmirna",
    name: "Esmirna",
    ancient: "Esmirna",
    lng: 27.1428,
    lat: 38.4192,
    ref: "Apocalipse 2:8–11",
    letter:
      "A igreja é pobre e caluniada, e mesmo assim rica aos olhos de quem fala. Vem tribulação de dez dias. A ordem é ser fiel até a morte. A promessa é a coroa da vida e não ser atingido pela segunda morte.",
  },
  {
    id: "pergamo",
    name: "Pérgamo",
    ancient: "Pérgamo",
    lng: 27.1842,
    lat: 39.1316,
    ref: "Apocalipse 2:12–17",
    letter:
      "A igreja mora onde está o trono de Satanás e não negou o nome, mesmo depois do martírio de Antipas. O reparo é tolerar o ensino de Balaão e o dos nicolaítas. A promessa é o maná escondido e uma pedra branca com um nome novo.",
  },
  {
    id: "tiatira",
    name: "Tiatira",
    ancient: "Tiatira",
    lng: 27.8456,
    lat: 38.9208,
    ref: "Apocalipse 2:18–29",
    letter:
      "O amor, a fé, o serviço e a perseverança são maiores do que no princípio. O reparo é tolerar Jezabel, que ensina a imoralidade e a comida sacrificada aos ídolos. A quem vence é dada autoridade sobre as nações.",
  },
  {
    id: "sardes",
    name: "Sardes",
    ancient: "Sardes",
    lng: 28.0403,
    lat: 38.4883,
    ref: "Apocalipse 3:1–6",
    letter:
      "Tem nome de quem vive, mas está morta. As obras não foram achadas completas. Uns poucos não mancharam as vestes. A promessa é andar de branco e não ter o nome apagado do livro da vida.",
  },
  {
    id: "filadelfia",
    name: "Filadélfia",
    ancient: "Filadélfia",
    lng: 28.5206,
    lat: 38.3506,
    ref: "Apocalipse 3:7–13",
    letter:
      "Tem pouca força e guardou a palavra sem negar o nome. Diante dela há uma porta aberta que ninguém fecha. A promessa é ser coluna no templo e receber o nome de Deus, o da nova Jerusalém e o nome novo.",
  },
  {
    id: "laodiceia",
    name: "Laodiceia",
    ancient: "Laodiceia",
    lng: 29.1073,
    lat: 37.8364,
    ref: "Apocalipse 3:14–22",
    letter:
      "Não é fria nem quente. Diz que é rica e não precisa de nada, e não vê que é miserável, pobre, cega e nua. O conselho é comprar ouro provado, vestes brancas e colírio. O texto termina com a ceia: quem ouve e abre a porta.",
  },
];

export const visions: Vision[] = [
  {
    slug: "patmos",
    order: 1,
    title: "João em Patmos e o Filho do Homem",
    ref: "Apocalipse 1:9–20",
    image: "/apocalipse/patmos.webp",
    alt: "Pintura sacra de João ajoelhado em Patmos diante dos sete candelabros de ouro e do Filho do Homem com cabelos brancos, olhos de fogo, sete estrelas na mão direita e uma espada saindo da boca.",
    saw: [
      "João está na ilha de Patmos, por causa da palavra e do testemunho. No dia do Senhor ouve uma voz forte, como de trombeta, e se volta. Vê sete candelabros de ouro e, no meio deles, alguém semelhante a um filho de homem.",
      "A veste desce até os pés, e um cinto de ouro prende o peito. A cabeça e os cabelos são brancos como lã e como neve. Os olhos são chama de fogo. Os pés parecem bronze em brasa. A voz é como muitas águas. Na mão direita há sete estrelas. Da boca sai uma espada de dois gumes. O rosto brilha como o sol na força.",
    ],
    means: [
      "O próprio texto decifra dois sinais: os sete candelabros são as sete igrejas, e as sete estrelas são os anjos das sete igrejas (1:20). O restante descreve a presença que João não consegue olhar sem cair.",
      "As escolas não disputam o cenário de Patmos. Divergem no alcance do que vem depois: se as cartas e as visões falam sobretudo do século I (preterismo), de uma linha contínua na história da igreja (historicismo), de um desfecho ainda futuro (futurismo) ou de um padrão que se repete em toda época (idealismo). Esta página não escolhe uma.",
    ],
  },
  {
    slug: "igrejas",
    order: 2,
    title: "As sete igrejas da Ásia",
    ref: "Apocalipse 2–3",
    image: "/apocalipse/igrejas.webp",
    alt: "Pintura noturna de sete candelabros de ouro acesos sobre colinas diante das sete cidades antigas da Ásia Menor, com sete estrelas ligadas por feixes de luz dourada.",
    saw: [
      "Sete cartas, na ordem do livro: Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia. Cada uma começa com um traço da visão do capítulo 1 e termina com um ouvido que ouve e uma promessa a quem vence.",
      "O mapa marca as sete cidades da província romana da Ásia, no oeste da atual Turquia. Não são capitais de império. São comunidades concretas, cada uma com um elogio, um reparo ou os dois.",
    ],
    means: [
      "O texto trata as sete como igrejas reais daquele circuito. Muitos leitores, em todas as escolas, também as leem como um espelho: amor esfriado, perseguição, ensino misturado, fama sem vida, porta aberta, riqueza cega.",
      "O historicismo clássico chegou a distribuir as sete por eras sucessivas da igreja. Preteristas, futuristas e idealistas em geral recusam essa grade e ficam nas cidades do século I, ou numa aplicação que não depende de um calendário. O atlas mostra as cidades e o que cada carta diz, sem transformar a ordem em uma cronologia.",
    ],
  },
  {
    slug: "trono",
    order: 3,
    title: "O trono, os anciãos e os quatro seres",
    ref: "Apocalipse 4",
    image: "/apocalipse/trono.webp",
    alt: "Pintura celestial do trono de Deus cercado por um arco como esmeralda, sete lâmpadas de fogo, mar de vidro, vinte e quatro anciãos de branco com coroas de ouro e os quatro seres viventes cheios de olhos.",
    saw: [
      "Uma porta aberta no céu. Um trono, e alguém sentado com aspecto de jaspe e sardônio. Ao redor, um arco como esmeralda. Do trono saem relâmpagos, vozes e trovões. Diante dele ardem sete lâmpadas, que o texto chama de os sete espíritos de Deus.",
      "Vinte e quatro anciãos, de branco, com coroas de ouro. Diante do trono, um mar de vidro, semelhante ao cristal. No meio e ao redor, quatro seres viventes, cheios de olhos: um como leão, outro como bezerro, outro com rosto de homem, outro como águia. Não descansam, e os anciãos depõem as coroas.",
    ],
    means: [
      "O capítulo não entrega uma legenda para cada joia. Diz o que João viu e o que se canta: santo, santo, santo, e digno de receber glória. O mar de vidro é calmo, diferente do mar agitado de onde, mais tarde, sobe uma besta.",
      "Leitores ligam os quatro seres aos querubins de Ezequiel e às figuras do acampamento de Israel, mas o Apocalipse não faz essa conta. As escolas concordam que a cena é de culto diante do trono. Divergem se o trono abre um relógio futuro ou revela o governo de Deus sobre qualquer século.",
    ],
  },
  {
    slug: "cordeiro",
    order: 4,
    title: "O livro selado e o Cordeiro",
    ref: "Apocalipse 5",
    image: "/apocalipse/cordeiro.webp",
    alt: "Pintura do Cordeiro em pé como que imolado, com sete chifres e sete olhos, diante do trono e do livro fechado com sete selos, cercado pelos quatro seres viventes, anciãos com harpas e incensários e multidão de anjos.",
    saw: [
      "Na mão direita de quem está no trono há um livro escrito por dentro e por fora, fechado com sete selos. Ninguém no céu, na terra ou debaixo da terra é digno de abrir. João chora.",
      "Um dos anciãos aponta o Leão da tribo de Judá, a raiz de Davi. O que João vê, porém, é um Cordeiro, em pé, como que imolado. Tem sete chifres e sete olhos. Toma o livro. Os seres e os anciãos cantam, e a eles se junta toda criatura.",
    ],
    means: [
      "O texto explica os sete olhos: são os sete espíritos de Deus enviados por toda a terra (5:6). Os sete chifres ficam na imagem, sem outra glosa. O paradoxo é do próprio capítulo: o Leão anunciado aparece como Cordeiro morto e de pé.",
      "Quase todas as leituras cristãs reconhecem aqui o Messias. O que muda é o livro: testamento, plano da história, escritura de juízo. Preteristas, historicistas, futuristas e idealistas seguem daqui para os selos com calendários diferentes. O capítulo, em si, só diz quem é digno de abrir.",
    ],
  },
  {
    slug: "cavaleiros",
    order: 5,
    title: "Os quatro cavaleiros e os selos seguintes",
    ref: "Apocalipse 6:1–17; 8:1",
    image: "/apocalipse/cavaleiros.webp",
    alt: "Pintura dramática dos quatro cavaleiros do Apocalipse sob sol enegrecido e lua de sangue: cavalo branco com arco e coroa, cavalo vermelho com grande espada, cavalo preto com balança e cavalo amarelo-esverdeado com a Morte seguida pelo Hades.",
    saw: [
      "O Cordeiro abre os selos um a um, e cada um dos quatro seres diz: vem. Sai um cavalo branco: o cavaleiro tem um arco, recebe uma coroa e sai vencendo. Sai um cavalo vermelho: ao cavaleiro é dada uma grande espada, para tirar a paz e fazer com que se matem. Sai um cavalo preto: o cavaleiro traz uma balança, e uma voz anuncia o preço do trigo e da cevada, e poupa o azeite e o vinho. Sai um cavalo amarelo-esverdeado: o nome do cavaleiro é Morte, e o Hades o segue. Recebem autoridade sobre a quarta parte da terra.",
      "No quinto selo, almas debaixo do altar pedem justiça e recebem vestes brancas. No sexto, há terremoto: o sol fica negro, a lua como sangue, as estrelas caem, o céu se enrola, e montes e ilhas saem do lugar. Reis e escravos pedem às rochas que os escondam da face de quem está no trono e da ira do Cordeiro. O sétimo selo, já no capítulo 8, abre com silêncio no céu por cerca de meia hora, e então entram as trombetas.",
    ],
    means: [
      "O livro nomeia só o quarto cavaleiro. Os três primeiros ficam em gesto: coroa e conquista, espada e guerra, balança e carestia. A cor do quarto cavalo, no grego, é chloros, o verde-pálido da doença e do cadáver, não um amarelo de bandeira.",
      "Aqui as escolas se separam com força. O preterismo lê os selos na crise do século I, sobretudo a guerra judaico-romana. O historicismo reparte os cavaleiros por séculos da era cristã. O futurismo os coloca num período ainda por vir. O idealismo vê padrões de conquista, violência, fome e morte que atravessam a história. O texto não data os cavaleiros com um ano.",
    ],
  },
  {
    slug: "multidao",
    order: 6,
    title: "Os cento e quarenta e quatro mil e a grande multidão",
    ref: "Apocalipse 7",
    image: "/apocalipse/multidao.webp",
    alt: "Pintura da grande multidão incontável de vestes brancas e palmas diante do trono e do Cordeiro sobre o mar de vidro, enquanto um anjo sobe com o selo e quatro anjos retêm os ventos.",
    saw: [
      "Antes que os ventos soprem, um anjo sela servos de Deus na testa. O número é cento e quarenta e quatro mil, doze mil de cada tribo nomeada: Judá, Rúben, Gade, Aser, Naftali, Manassés, Simeão, Levi, Issacar, Zebulom, José e Benjamim.",
      "Depois João vê outra coisa, que ninguém consegue contar: gente de todas as nações, tribos, povos e línguas, de vestes brancas, com palmas, diante do trono e do Cordeiro. Um ancião explica: saíram da grande tribulação e lavaram as vestes no sangue do Cordeiro.",
    ],
    means: [
      "O capítulo põe lado a lado um censo por tribos e uma multidão sem número. Não diz, com uma frase, se são o mesmo grupo visto de dois modos ou dois grupos. A lista de tribos também não é a lista clássica: Dã não aparece, e José entra junto com Manassés.",
      "Há quem leia os cento e quarenta e quatro mil como Israel étnico, quem leia como a igreja inteira em número simbólico de completude (12 × 12 × 1.000), e quem reserve a multidão aos mártires. As quatro escolas cabem nessas opções. O que o ancião afirma, sem ambiguidade, é a origem das vestes brancas.",
    ],
  },
  {
    slug: "trombetas",
    order: 7,
    title: "As sete trombetas",
    ref: "Apocalipse 8–9",
    image: "/apocalipse/trombetas.webp",
    alt: "Pintura de sete anjos tocando sete trombetas nos céus enquanto saraiva, fogo, a montanha em chamas e a estrela Absinto caem, e abaixo sobem gafanhotos com ferrões do abismo e cavalos com cabeças de leão junto ao Eufrates.",
    saw: [
      "Sete anjos recebem sete trombetas. Primeiro, saraiva e fogo misturados com sangue: a terça parte da terra, das árvores e de toda a erva verde. Segundo, uma como que montanha em chamas cai no mar: a terça parte do mar vira sangue, morre a terça parte das criaturas do mar e naufraga a terça parte dos navios. Terceiro, cai a estrela Absinto: a terça parte das águas amarga, e muitos morrem. Quarto, são feridos a terça parte do sol, da lua e das estrelas. Uma águia anuncia três ais.",
      "Quinto, uma estrela abre o poço do abismo. Sobe fumaça, e dela gafanhotos com poder como de escorpiões. Não tocam a erva. Atormentam por cinco meses quem não tem o selo. Têm aparência de cavalos preparados para a guerra, coroas como de ouro, rostos de homem, cabelos de mulher, dentes de leão, couraças de ferro e caudas com ferrões. O rei deles é o anjo do abismo: Abadom em hebraico, Apoliom em grego. Sexto, quatro anjos soltos junto ao Eufrates. O número dos cavaleiros é duas miríades de miríades. Os cavalos têm cabeças como de leão; da boca saem fogo, fumaça e enxofre; as caudas são como serpentes. Com essas três pragas morre a terça parte da humanidade. O sétimo toque fica para o capítulo 11.",
    ],
    means: [
      "As quatro primeiras trombetas ferem terra, mar, rios e céu, sempre na medida de um terço. A quinta e a sexta são os dois primeiros ais, e o texto detalha os gafanhotos e os cavaleiros do Eufrates para que a imagem não seja genérica.",
      "Quem lê como pragas literais futuras, quem lê como invasões históricas (entre elas a queda de impérios e exércitos do leste) e quem lê como o mal interior atormentando um mundo sem o selo estão nas escolas futurista, historicista e idealista. O preterismo procura o cumprimento no século I. O livro não identifica o Eufrates com um exército moderno, nem os gafanhotos com uma máquina. Descreve o que João viu.",
    ],
  },
  {
    slug: "livrinho",
    order: 8,
    title: "O anjo e o livrinho",
    ref: "Apocalipse 10",
    image: "/apocalipse/livrinho.webp",
    alt: "Pintura do anjo forte envolto em nuvem, com arco-íris sobre a cabeça, rosto como o sol e pernas como colunas de fogo, com o pé direito no mar e o esquerdo na terra, segurando o livrinho aberto diante de João em Patmos.",
    saw: [
      "Outro anjo forte desce do céu, envolto numa nuvem, com o arco-íris sobre a cabeça. O rosto é como o sol, as pernas como colunas de fogo. Põe o pé direito sobre o mar e o esquerdo sobre a terra. Na mão, um livrinho aberto. Grita, e sete trovões falam. João vai escrever, e a voz do céu manda selar o que os trovões disseram.",
      "O anjo jura por quem vive pelos séculos que já não haverá demora: no dia em que o sétimo anjo tocar, se completa o mistério de Deus. João come o livrinho. Na boca é doce como mel. No estômago é amargo. Depois recebe a ordem de profetizar de novo sobre povos, nações, línguas e reis.",
    ],
    means: [
      "Os sete trovões ficam de fora do livro de propósito. O que entra é o gesto: a palavra é doce de receber e amarga de carregar, e a profecia ainda não acabou.",
      "As escolas discutem se este intervalo pausa o relógio dos juízos ou se é a comissão do próprio João. Nenhuma delas tem, no capítulo, o conteúdo dos trovões. O atlas também não inventa.",
    ],
  },
  {
    slug: "testemunhas",
    order: 9,
    title: "As duas testemunhas",
    ref: "Apocalipse 11:1–19",
    image: "/apocalipse/testemunhas.webp",
    alt: "Pintura das duas testemunhas vestidas de saco com fogo saindo da boca, entre as duas oliveiras e os dois candelabros, enquanto águas se tornam sangue e o templo no céu se abre revelando a arca da aliança.",
    saw: [
      "João mede o templo, o altar e os que adoram. O átrio de fora fica de fora: é dado às nações, que pisam a cidade santa por quarenta e dois meses. Duas testemunhas profetizam mil duzentos e sessenta dias, vestidas de saco. São as duas oliveiras e os dois candelabros diante do Senhor. Fogo sai da boca delas. Podem fechar o céu para que não chova, transformar águas em sangue e ferir a terra com pragas.",
      "A besta que sobe do abismo as mata. Os corpos ficam na praça da grande cidade, chamada espiritualmente Sodoma e Egito, onde também o Senhor deles foi crucificado. Povos veem os corpos por três dias e meio e não deixam sepultar. Depois um espírito de vida entra nelas, sobem numa nuvem, e um terremoto derruba a décima parte da cidade. O sétimo anjo toca. Vozes no céu anunciam que o reino do mundo passou ao Senhor e ao seu Cristo. Abre-se o templo no céu, aparece a arca da aliança, e há relâmpagos, terremoto e saraiva.",
    ],
    means: [
      "O texto identifica as testemunhas com as duas oliveiras e os dois candelabros, imagem de Zacarias 4, e situa a morte na cidade da crucificação, com os nomes figurados de Sodoma e Egito. Não diz os nomes próprios.",
      "Há leituras que veem Moisés e Elias, ou a Lei e os Profetas, ou a igreja em testemunho, ou duas figuras ainda futuras. Preterismo, historicismo, futurismo e idealismo se distribuem entre essas hipóteses. O que fica firme no capítulo é o prazo, a morte, a recusa do túmulo e a subida.",
    ],
  },
  {
    slug: "dragao",
    order: 10,
    title: "A mulher, o filho e o dragão",
    ref: "Apocalipse 12",
    image: "/apocalipse/dragao.webp",
    alt: "Pintura cósmica da mulher vestida do sol, com a lua debaixo dos pés e coroa de doze estrelas, confrontada pelo grande dragão vermelho de sete cabeças que arrasta estrelas, enquanto Miguel e os anjos lutam no céu.",
    saw: [
      "Um grande sinal: uma mulher vestida do sol, a lua debaixo dos pés, e na cabeça uma coroa de doze estrelas. Está em dores de parto. Outro sinal: um dragão vermelho, enorme, com sete cabeças, dez chifres e sete diademas. A cauda arrasta a terça parte das estrelas e as lança na terra. O dragão para diante da mulher para devorar o filho quando nascer.",
      "Nasce um filho varão, que há de reger as nações com cetro de ferro, e ele é arrebatado para Deus e para o seu trono. A mulher foge para o deserto, onde é alimentada por mil duzentos e sessenta dias. Há guerra no céu: Miguel e os seus anjos lutam contra o dragão. O dragão é lançado à terra. O texto o nomeia: a antiga serpente, o diabo, Satanás. Na terra persegue a mulher. A terra a socorre. O dragão vai fazer guerra ao restante da descendência dela, aos que guardam os mandamentos e o testemunho de Jesus.",
    ],
    means: [
      "A identidade do dragão é dada no próprio capítulo. O filho que há de reger as nações e é levado ao trono é lido, na quase totalidade das tradições cristãs, como o Messias. A mulher é o ponto em aberto: Israel, a igreja, ou o povo de Deus de onde vem o filho. O livro não escreve um nome próprio para ela.",
      "Os mil duzentos e sessenta dias reaparecem no livro ao lado de quarenta e dois meses e de um tempo, tempos e metade de um tempo. As escolas discutem se o prazo é literal, se equivale a anos, ou se marca um período de proteção e de perseguição sem calendário único. Miguel entra como o anjo da guerra celeste, não como um dos cavaleiros.",
    ],
  },
  {
    slug: "bestas",
    order: 11,
    title: "A besta do mar, a besta da terra e o 666",
    ref: "Apocalipse 13",
    image: "/apocalipse/bestas.webp",
    alt: "Pintura da besta de sete cabeças que sobe do mar, semelhante a leopardo com pés de urso e boca de leão, e da segunda besta da terra com dois chifres como de cordeiro fazendo descer fogo diante de adoradores.",
    saw: [
      "Do mar sobe uma besta com dez chifres e sete cabeças, e sobre os chifres dez diademas. Nas cabeças, nomes de blasfêmia. É semelhante a um leopardo, com pés de urso e boca de leão. O dragão lhe dá o seu poder, o seu trono e grande autoridade. Uma das cabeças parece ferida de morte, e a ferida cura. A terra se maravilha e adora o dragão e a besta. Ela age por quarenta e dois meses, blasfema e vence os santos. Adoram-na todos os que não têm o nome escrito no livro da vida do Cordeiro.",
      "Da terra sobe outra besta, com dois chifres semelhantes aos de um cordeiro, e fala como dragão. Faz a terra adorar a primeira besta, opera sinais, manda fazer uma imagem da besta e que a imagem fale, e mata quem não a adora. Impõe uma marca na mão direita ou na testa, e sem a marca ninguém compra nem vende. O número da besta é número de homem: seiscentos e sessenta e seis.",
    ],
    means: [
      "O capítulo pede sabedoria para calcular o número, e diz que é número de homem. Não entrega o nome. A primeira besta concentra poder político e culto. A segunda parece o Cordeiro e fala como o dragão: é o propaganda do culto, com imagem, sinais e controle do comércio.",
      "O preterismo costuma olhar para o culto imperial romano. O historicismo, para poderes político-religiosos ao longo dos séculos, muitas vezes com a leitura de 666 em nomes. O futurismo, para um governante e um falso profeta ainda futuros. O idealismo, para o Estado que se faz deus e a religião que o serve, em qualquer século. O atlas registra o número como o texto o dá, sem fechar a conta num nome contemporâneo.",
    ],
  },
  {
    slug: "seara",
    order: 12,
    title: "O Cordeiro no Sião, três anjos e a ceifa",
    ref: "Apocalipse 14",
    image: "/apocalipse/seara.webp",
    alt: "Pintura do Cordeiro no monte Sião com o coro de harpas, três anjos voando no céu, alguém semelhante a um filho de homem com coroa e foice sobre a nuvem e a vindima pisada no lagar fora da cidade.",
    saw: [
      "O Cordeiro está em pé sobre o monte Sião, e com ele cento e quarenta e quatro mil, com o nome dele e o nome do Pai escritos na testa. Cantam um cântico novo que ninguém mais aprende. São os que não se contaminaram, seguem o Cordeiro e na boca deles não se achou mentira.",
      "Três anjos voam. O primeiro tem um evangelho eterno e chama a temer a Deus e a adorá-lo, porque chegou a hora do juízo. O segundo anuncia: caiu, caiu a grande Babilônia, que fez as nações beberem do vinho da sua imoralidade. O terceiro avisa que quem adora a besta e a imagem, e recebe a marca, bebe do vinho da ira de Deus. Depois João vê uma ceifa: alguém semelhante a um filho de homem, com uma coroa de ouro e uma foice, lança a foice sobre a terra. Outro anjo lança a foice na vindima, e o lagar é pisado fora da cidade. O sangue sobe até os freios dos cavalos, numa extensão de mil e seiscentos estádios.",
    ],
    means: [
      "O capítulo contrapõe a marca da besta ao nome na testa, e o cântico novo ao comércio fechado do capítulo anterior. Os três anúncios vêm em ordem: adoração, queda de Babilônia, aviso sobre a marca. A ceifa e o lagar fecham a cena com duas colheitas.",
      "As escolas discutem se os cento e quarenta e quatro mil daqui são os mesmos do capítulo 7, e se a ceifa é o fim da história ou um juízo dentro dela. O texto distingue o anúncio do evangelho, a notícia da queda e o aviso. Não mistura os três numa frase só.",
    ],
  },
  {
    slug: "tacas",
    order: 13,
    title: "As sete taças e Armagedom",
    ref: "Apocalipse 15–16",
    image: "/apocalipse/tacas.webp",
    alt: "Pintura de sete anjos saindo do templo celestial e derramando sete taças de ouro sobre o mar de sangue, o rio seco, o trono em trevas e os exércitos reunidos no Armagedom, enquanto vencedores estão sobre o mar de vidro com fogo.",
    saw: [
      "Sete anjos saem do templo com sete pragas, que o texto chama de as últimas. Os vencedores da besta estão sobre o mar de vidro misturado com fogo e cantam o cântico de Moisés e do Cordeiro. O templo se enche de fumaça, e ninguém entra até que as pragas acabem. Uma voz manda derramar as sete taças da ira sobre a terra.",
      "A primeira produz úlceras em quem tem a marca e adora a imagem. A segunda torna o mar em sangue, e morre todo ser vivo do mar. A terceira faz o mesmo aos rios e às fontes. A quarta entrega o sol ao poder de queimar. A quinta escurece o trono da besta, e os homens mordem a língua de dor. A sexta seca o Eufrates, para que se prepare o caminho dos reis do oriente. Da boca do dragão, da besta e do falso profeta saem três espíritos imundos, como rãs, que reúnem os reis para a batalha do grande dia. O lugar, em hebraico, é Armagedom. A sétima taça vai ao ar. Uma voz diz: está feito. Há relâmpagos, um terremoto como nunca houve, a grande cidade se divide em três, as cidades das nações caem, e saraiva enorme desce do céu.",
    ],
    means: [
      "As taças repetem alvos das trombetas, terra, mar, rios e céu, sem a fração de um terço. O livro as chama de últimas. Armagedom entra como o lugar do ajuntamento, não como um discurso. O nome hebraico é dado; a geografia exata do combate não é narrada neste capítulo.",
      "Historicistas procuraram Armagedom em batalhas já ocorridas. Futuristas o leem como confronto ainda futuro, às vezes no vale de Megido, às vezes como nome de um ajuntamento maior do que um vale. Idealistas o tratam como o confronto final entre o reino e os reis, sem mapa militar. Preteristas o aproximam das guerras do século I. O texto nomeia o lugar e descreve as taças. Não conta o desenrolar da batalha aqui. Ela reaparece no capítulo 19.",
    ],
  },
  {
    slug: "babilonia",
    order: 14,
    title: "A grande meretriz e a queda de Babilônia",
    ref: "Apocalipse 17–18",
    image: "/apocalipse/babilonia.webp",
    alt: "Pintura da mulher vestida de púrpura e escarlate com cálice de ouro montada na besta escarlate de sete cabeças junto às águas, enquanto a grande cidade da Babilônia arde em chamas ao fundo.",
    saw: [
      "Um anjo mostra a grande prostituta sentada sobre muitas águas, com quem os reis se prostituíram. João a vê montada numa besta escarlate, cheia de nomes de blasfêmia, com sete cabeças e dez chifres. A mulher veste púrpura e escarlate, ouro, pedras e pérolas, e tem na mão um cálice de ouro cheio de abominações. Na testa, um nome misterioso: Babilônia, a grande, a mãe das prostituições e das abominações da terra. Está embriagada com o sangue dos santos e das testemunhas de Jesus.",
      "O anjo interpreta. As águas são povos, multidões, nações e línguas. A besta era, não é, e está para subir do abismo. As sete cabeças são sete montes e também sete reis: cinco caíram, um existe, outro ainda não veio, e dura pouco. A besta é um oitavo e é um dos sete. Os dez chifres são dez reis que ainda não receberam reino, entregam o poder à besta, fazem guerra ao Cordeiro e são vencidos, porque ele é Senhor dos senhores e Rei dos reis. Esses reis e a besta odeiam a prostituta, deixam-na desolada e nua, e a queimam. A mulher é a grande cidade que reina sobre os reis da terra. O capítulo 18 canta a queda: em uma hora chegam o luto dos mercadores, o silêncio da música e o convite a sair dela, para não participar dos seus pecados.",
    ],
    means: [
      "Desta vez a legenda é do anjo, e convém não trocá-la por outra. Cabeças, águas, chifres e a cidade são explicados no capítulo. O que o anjo não faz é escrever o nome moderno da cidade. Diz que ela reina sobre os reis da terra e que está embriagada com o sangue dos santos.",
      "A identificação histórica é o grande divisor das escolas: Roma imperial, uma Jerusalém infiel, um sistema comercial e religioso que atravessa os séculos, ou uma capital ainda futura. O preterismo, o historicismo, o futurismo e o idealismo escolhem combinações diferentes dessas leituras. O atlas fica com a interpretação que o anjo deu e com a queda contada no capítulo 18.",
    ],
  },
  {
    slug: "cavaleiro",
    order: 15,
    title: "As bodas do Cordeiro e o cavaleiro do cavalo branco",
    ref: "Apocalipse 19",
    image: "/apocalipse/cavaleiro.webp",
    alt: "Pintura do céu aberto com o cavaleiro Fiel e Verdadeiro sobre o cavalo branco, olhos em chama de fogo, muitos diademas, manto tingido de sangue, espada saindo da boca e os exércitos celestiais de linho branco atrás dele.",
    saw: [
      "Uma grande multidão no céu celebra. Chegaram as bodas do Cordeiro, e a esposa se preparou. Foi-lhe dado vestir linho fino, brilhante e puro, que o texto explica: são os atos justos dos santos. Um anjo chama João a escrever: bem-aventurados os convocados à ceia das bodas.",
      "O céu se abre. Sai um cavalo branco, e quem o monta chama-se Fiel e Verdadeiro. Julga e guerreia com justiça. Os olhos são chama de fogo. Na cabeça há muitos diademas. Tem um nome que ninguém conhece senão ele mesmo. O manto está tingido de sangue. O nome pelo qual se chama é a Palavra de Deus. Os exércitos do céu o seguem em cavalos brancos, vestidos de linho fino e branco. Da boca sai uma espada afiada, com que fere as nações, e ele as rege com cetro de ferro. Pisa o lagar do vinho do furor da ira de Deus. No manto e na coxa está escrito: Rei dos reis e Senhor dos senhores. A besta e o falso profeta são lançados no lago de fogo. Os demais são mortos pela espada que sai da boca do cavaleiro.",
    ],
    means: [
      "Este cavalo branco não é o do primeiro selo. O capítulo dá os nomes: Fiel e Verdadeiro, a Palavra de Deus, Rei dos reis e Senhor dos senhores. A espada sai da boca, não da mão. O linho da esposa é explicado como os atos justos dos santos.",
      "As escolas concordam, em peso, que o cavaleiro é o Messias. Divergem se a cena é uma batalha datável, a vitória da palavra ao longo da história, ou o juízo que encerra o livro. O primeiro cavaleiro do capítulo 6 não recebe esses títulos. Confundi-los é ir além do que o texto iguala.",
    ],
  },
  {
    slug: "milenio",
    order: 16,
    title: "O milênio, Gogue e Magogue, o grande trono branco",
    ref: "Apocalipse 20",
    image: "/apocalipse/milenio.webp",
    alt: "Pintura do anjo descendo com a chave e grande corrente para prender o dragão de sete cabeças sobre o abismo, e acima o grande trono branco com os livros abertos diante da multidão de mortos.",
    saw: [
      "Um anjo desce com a chave do abismo e uma grande corrente. Prende o dragão, a antiga serpente, por mil anos, lança-o no abismo e o sela, para que não engane as nações até que se completem os mil anos. Depois disso é preciso que seja solto por um pouco de tempo. João vê tronos, e os que se assentam neles recebem juízo. Vê as almas dos decapitados por causa do testemunho de Jesus e da palavra de Deus, os que não adoraram a besta nem receberam a marca. Vivem e reinam com Cristo durante mil anos. Os outros mortos não vivem até que se completem os mil anos. Esta é a primeira ressurreição.",
      "Quando os mil anos se acabam, Satanás é solto, engana as nações nos quatro cantos da terra, Gogue e Magogue, e os reúne para a guerra. Cercam o acampamento dos santos e a cidade amada. Desce fogo do céu e os devora. O diabo é lançado no lago de fogo, onde já estão a besta e o falso profeta. Depois João vê um grande trono branco. Fogem a terra e o céu, e não se acha lugar para eles. Os mortos, grandes e pequenos, estão diante do trono. Abrem-se livros, e outro livro, o da vida. Os mortos são julgados pelo que está escrito, segundo as obras. A morte e o Hades são lançados no lago de fogo. Quem não se acha inscrito no livro da vida também.",
    ],
    means: [
      "O capítulo diz mil anos, três vezes seguidas, e distingue uma primeira ressurreição de um restante de mortos. Também distingue o acampamento cercado por Gogue e Magogue do trono branco que vem depois. A ordem interna é: prisão, reino de mil anos, soltura breve, cerco, fogo, trono, livros.",
      "É o ponto em que as escolas mais se separam. O futurismo premilenista lê os mil anos como um reino futuro e literal depois da vinda do cavaleiro. O preterismo e boa parte do idealismo e do amilenismo leem os mil anos como um modo de dizer o reinado presente de Cristo, completo, não um calendário de dez séculos. O historicismo clássico procurou os mil anos em datas da era cristã. O pós-milenismo espera um longo florescimento do evangelho antes da volta. O atlas não converte o número numa dessas agendas. Mostra a sequência que o capítulo escreve.",
    ],
  },
  {
    slug: "jerusalem",
    order: 17,
    title: "A nova Jerusalém",
    ref: "Apocalipse 21–22",
    image: "/apocalipse/jerusalem.webp",
    alt: "Pintura da nova Jerusalém descendo do céu sobre a nova terra sem mar, cidade cúbica de ouro transparente como cristal com doze fundamentos de pedras preciosas, doze portas de pérola, o rio da vida e a árvore da vida nas margens.",
    saw: [
      "João vê um novo céu e uma nova terra. O primeiro céu e a primeira terra passaram, e o mar já não existe. A cidade santa, a nova Jerusalém, desce do céu, preparada como uma esposa. Uma voz diz que o tabernáculo de Deus está com os homens, que ele enxugará toda lágrima, e que a morte já não existirá. Quem está no trono diz: eis que faço novas todas as coisas. A cidade tem a glória de Deus. O brilho é semelhante a uma pedra de jaspe cristalino. Há uma muralha grande e alta, e doze portas, doze anjos, e nomes escritos: os das doze tribos de Israel. A muralha tem doze fundamentos, e neles os nomes dos doze apóstolos do Cordeiro.",
      "A cidade é quadrada, e o comprimento é igual à largura e à altura: doze mil estádios. A muralha mede cento e quarenta e quatro côvados. Os fundamentos são doze pedras preciosas, cada porta é uma pérola, e a praça é ouro puro como vidro transparente. João não vê templo: o Senhor Deus todo-poderoso e o Cordeiro são o templo. A cidade não precisa de sol nem de lua. As nações andam à sua luz, e as portas nunca se fecham. No meio da praça, e de cada lado do rio da água da vida, está a árvore da vida, que dá doze frutos, um em cada mês, e as folhas servem para a cura das nações. Não haverá mais noite. Os servos o verão face a face, e o nome dele estará nas testas. O livro termina com o convite de quem tem sede e com a palavra: venho sem demora.",
    ],
    means: [
      "O anjo chama a cidade de a esposa, a mulher do Cordeiro (21:9). As medidas são as do texto: um cubo de doze mil estádios e uma muralha de cento e quarenta e quatro côvados. Doze portas, doze fundamentos, doze frutos. O ouro é transparente. Não há templo separado, nem sol, nem mar, nem noite.",
      "Há quem converta os estádios em quilômetros e desenhe uma cidade literal dessa aresta, e quem leia o cubo como o santo dos santos levado à escala do mundo, número de plenitude e não de engenharia. As escolas cabem entre esses dois polos, muitas vezes misturando os dois. O desenho desta página usa o cubo, as doze portas, o rio e a árvore, que são o que João mediu e viu, sem completar a cidade com ruas que o texto não descreve.",
    ],
  },
];

export const series = [
  {
    id: "selos",
    title: "Sete selos",
    href: "/apocalipse/cavaleiros",
    items: [
      "Cavalo branco",
      "Cavalo vermelho",
      "Cavalo preto",
      "Cavalo esverdeado",
      "Almas sob o altar",
      "Terremoto e céu",
      "Silêncio no céu",
    ],
  },
  {
    id: "trombetas",
    title: "Sete trombetas",
    href: "/apocalipse/trombetas",
    items: [
      "Terra",
      "Mar",
      "Absinto",
      "Sol, lua, estrelas",
      "Gafanhotos",
      "Eufrates",
      "O reino",
    ],
  },
  {
    id: "tacas",
    title: "Sete taças",
    href: "/apocalipse/tacas",
    items: [
      "Úlceras",
      "Mar de sangue",
      "Rios de sangue",
      "Sol que queima",
      "Trono em trevas",
      "Armagedom",
      "Está feito",
    ],
  },
] as const;

const bySlug = new Map(visions.map((vision) => [vision.slug, vision]));

export function getVision(slug: string): Vision | undefined {
  return bySlug.get(slug);
}
