import type { EraId, RouteId } from "@/lib/types";

export type BookGroup = "pentateuco" | "historicos" | "perifericos" | "deuterocanonicos";

export type BookStudy = {
  slug: string;
  name: string;
  group: BookGroup;
  era: EraId;
  dates: string;
  uncertainty: string;
  government: string;
  characters: string[];
  history: string[];
  geography: string[];
  placeIds: string[];
  routeIds: RouteId[];
  regionIds: string[];
  focusPlaceId?: string;
};

export const bookGroupLabel: Record<BookGroup, string> = {
  pentateuco: "Pentateuco",
  historicos: "Livros históricos",
  perifericos: "Profetas do mesmo chão",
  deuterocanonicos: "Deuterocanônicos",
};

export const bookStudies: BookStudy[] = [
  {
    slug: "genesis",
    name: "Gênesis",
    group: "pentateuco",
    era: "patriarcas",
    dates: "Os relatos dos patriarcas cabem, no estudo usual, no começo do segundo milênio a.C. Não há data de arquivo.",
    uncertainty:
      "Ur, Harã e as cidades de Canaã são sítios reais. A cronologia interna da família não fecha com um século só.",
    government:
      "Clã, não reino. O pai da casa decide a marcha. No Egito, no fim do livro, já se vê uma corte. Em Canaã, cidades-estado.",
    characters: ["Abraão", "Sara", "Isaque", "Rebeca", "Jacó", "José", "Faraó da fome"],
    history: [
      "Gênesis estreita o mundo até uma família. Abraão sai de Ur, passa por Harã e se instala entre Siquém, Betel, Hebrom e Berseba. A promessa é de terra e de descendência, ainda sem fronteira desenhada.",
      "A fome leva o clã ao Egito. José sobe na corte, e os irmãos se assentam no delta. O livro termina com um povo dentro de um império, ainda sem lei e sem rei próprio.",
    ],
    geography: [
      "O arco é Mesopotâmia, Crescente e Nilo. Canaã aparece como corredor de cidades, não como país unido. O Neguebe é a borda seca por onde o clã desce.",
    ],
    placeIds: ["ur", "hara", "damasco", "siquem", "betel", "hebrom", "berseba", "menfis"],
    routeIds: ["patriarcas"],
    regionIds: ["egito", "gosen", "canaa", "neguebe", "aram"],
    focusPlaceId: "hebrom",
  },
  {
    slug: "exodo",
    name: "Êxodo",
    group: "pentateuco",
    era: "exodo",
    dates:
      "Duas janelas de estudo: cerca de 1446 a.C., a partir de 1 Reis 6:1, ou o século XIII a.C., com Ramessés e a estela de Merneptá.",
    uncertainty:
      "O faraó do êxodo não é nomeado. A rota em cobre é a reconstrução tradicional do sul, não um caminho escavado. Mara, Elim, Pitom e Sucote são tradição de atlas.",
    government:
      "Teocracia de acampamento. Do lado egípcio, o faraó do Império Novo. Do lado de Israel, Moisés media uma lei sem capital e sem rei.",
    characters: ["Moisés", "Arão", "Miriã", "o faraó não nomeado", "Jetro"],
    history: [
      "Um rei novo esquece José. Israel vira mão de obra no delta oriental, entre Ramessés e os depósitos que o texto chama de Pitom e Sucote. Moisés foge para Midiã, ouve a sarça e volta para confrontar a corte.",
      "A saída não toma o caminho dos filisteus. O livro leva o povo pelo deserto até o monte, onde a aliança e a tenda organizam um acampamento. A terra prometida ainda está longe.",
    ],
    geography: [
      "Delta e Gósen, o istmo, a península do Sinai e o maciço do sul, na tradição de Jebel Musa. O Grande Mar fica à esquerda da estrada que o texto diz não ter sido tomada.",
    ],
    placeIds: ["rameses", "pitom", "sucote", "mara", "elim", "sinai", "menfis", "tebas"],
    routeIds: ["exodo", "filisteus"],
    regionIds: ["egito", "gosen", "sinai", "midia", "filistia"],
    focusPlaceId: "sinai",
  },
  {
    slug: "levitico",
    name: "Levítico",
    group: "pentateuco",
    era: "exodo",
    dates: "O mesmo horizonte do acampamento no Sinai, sem uma data própria.",
    uncertainty: "O livro quase não marcha. Situá-lo no monte depende da mesma incerteza do êxodo.",
    government:
      "Sacerdócio dentro da teocracia. Arão e os levitas guardam a tenda. Não há rei, nem cidade, nem fronteira de província.",
    characters: ["Moisés", "Arão", "os sacerdotes", "a congregação"],
    history: [
      "Levítico para o acampamento. Sacrifício, pureza, festas e o ano sabático regulam um povo que ainda mora em tendas. O centro político é o santuário no meio das tribos.",
      "O livro ensina como a presença divina ocupa o meio do arraial. A geografia é concêntrica: tenda, tribos, deserto em volta.",
    ],
    geography: [
      "O chão é o de Êxodo 19 em diante: o monte e a planície do acampamento. Não há campanha, rio ou capital nova.",
    ],
    placeIds: ["sinai"],
    routeIds: ["exodo"],
    regionIds: ["sinai"],
    focusPlaceId: "sinai",
  },
  {
    slug: "numeros",
    name: "Números",
    group: "pentateuco",
    era: "exodo",
    dates: "Do segundo ano no Sinai até as planícies de Moabe. Quarenta anos, na conta do próprio livro.",
    uncertainty:
      "Cades-Barneia é associada a Ein el-Qudeirat, com debate. A volta a leste de Edom e Moabe segue a leitura tradicional, não uma estrada escavada.",
    government:
      "Ainda o acampamento sem rei. Moisés conta, julga e envia. No caminho aparecem os reis de Edom, Moabe e Basã, que recusam ou caem.",
    characters: ["Moisés", "Arão", "Miriã", "Calebe", "Josué", "Balaão", "Seom", "Ogue"],
    history: [
      "O povo sai do monte em ordem de tribos. De Cades, os espias veem a terra e a geração recusa entrar. O castigo é o desvio, não a conquista.",
      "Décadas depois, a nova geração contorna Edom e Moabe, vence Hesbom e acampa diante do Jordão. O livro é a ponte entre o deserto e Josué.",
    ],
    geography: [
      "Sinai, Neguebe, Arabá, o planalto transjordânico e o caminho do rei. O Jordão ainda não é cruzado.",
    ],
    placeIds: ["sinai", "cades", "eziom-geber", "bozra", "dibom", "hesbom", "nebo", "jerico"],
    routeIds: ["exodo", "caminho-do-rei"],
    regionIds: ["sinai", "neguebe", "edom", "moabe", "amom", "canaa"],
    focusPlaceId: "cades",
  },
  {
    slug: "deuteronomio",
    name: "Deuteronômio",
    group: "pentateuco",
    era: "exodo",
    dates: "O último mês de Moisés, nas planícies de Moabe, no fim dos quarenta anos.",
    uncertainty:
      "O monte Nebo é identificado, na tradição, com Ras es-Siyagha. A data absoluta depende da janela escolhida para o êxodo.",
    government:
      "Moisés entrega a lei a uma geração que vai entrar sem ele. O livro prevê rei, juiz e profeta, mas o poder presente ainda é o da aliança, não o da coroa.",
    characters: ["Moisés", "Josué", "os anciãos"],
    history: [
      "Três discursos recontam a marcha, a falha de Cades e a aliança. A terra é descrita em faixas, do Neguebe ao Hermom, para quem ainda está do lado de fora.",
      "Moisés sobe o Nebo, vê a terra e morre. O túmulo não é marcado. O governo que espera do outro lado ainda não é um reino.",
    ],
    geography: [
      "Planícies de Moabe, vale do Jordão, mar Morto aos pés do monte, e a terra à vista: Jericó, a serra, o norte até Dã.",
    ],
    placeIds: ["nebo", "hesbom", "dibom", "jerico", "betel", "hebrom", "da"],
    routeIds: ["exodo", "caminho-do-rei"],
    regionIds: ["moabe", "canaa", "neguebe", "edom"],
    focusPlaceId: "nebo",
  },
  {
    slug: "josue",
    name: "Josué",
    group: "historicos",
    era: "juizes",
    dates: "Logo depois de Moisés. Se o êxodo é do século XV, a campanha cai no fim desse século; se é do XIII, Josué acompanha essa data.",
    uncertainty:
      "Jericó e Hazor têm debates arqueológicos sérios. O livro lista trinta e um reis de cidades. A fronteira tribal do fim do livro é esquema de estudo, não um tratado.",
    government:
      "Continua a teocracia. Josué sucede Moisés sem ser rei. Do outro lado, cidades-estado cananeias, cada uma com o seu rei.",
    characters: ["Josué", "Calebe", "Raabe", "Acã", "os reis de Jericó, Ai e Hazor"],
    history: [
      "Israel cruza o Jordão e acampa em Gilgal. Jericó e Ai abrem o centro. Um tratado com Gibeão quebra a frente, e a campanha do sul desce até a Sefelá.",
      "Hazor, no norte, é o rei que reúne a coalizão. O livro reparte a terra entre tribos. Muitas cidades ficam por tomar. O mapa de Josué é promessa e lista, não um reino contínuo.",
    ],
    geography: [
      "O vale do Jordão, a serra central, a Sefelá e a planície de Jezreel até Hazor. O Jordão é a porta. O mar ainda está com outros povos.",
    ],
    placeIds: ["jerico", "betel", "siquem", "hebrom", "hazor", "megido", "gaza", "da"],
    routeIds: ["via-maris"],
    regionIds: ["canaa", "filistia", "neguebe", "fenicia"],
    focusPlaceId: "jerico",
  },
  {
    slug: "juizes",
    name: "Juízes",
    group: "historicos",
    era: "juizes",
    dates: "Entre Josué e Saul. O estudo costuma pôr os séculos XII e XI a.C., com sobreposição entre os juízes.",
    uncertainty:
      "Os relatos são regionais e podem ser contemporâneos, não uma fila de governos nacionais. Não há capital.",
    government:
      "Confederação tribal sob uma teocracia frágil. O juiz liberta uma região e não funda dinastia. A frase do livro é a ausência de rei.",
    characters: ["Débora", "Gideão", "Jefté", "Sansão", "Mica", "os filisteus"],
    history: [
      "O ciclo é opressão, clamor, juiz, alívio e recaída. Débora desce da serra contra os carros da planície. Gideão enfrenta Midiã. Jefté está na Transjordânia. Sansão vive na borda filisteia.",
      "O fim do livro é violência interna, de Gibeá a Dã. A terra está ocupada em manchas. A planície e várias cidades cananeias não são de Israel.",
    ],
    geography: [
      "Serra de Efraim e de Judá, vale de Jezreel, costa filisteia e o planalto a leste do Jordão. O poder não cobre o mapa inteiro.",
    ],
    placeIds: ["megido", "hazor", "betel", "siquem", "hebrom", "gaza", "ascalom", "da"],
    routeIds: ["via-maris"],
    regionIds: ["israel", "filistia", "moabe", "amom", "fenicia", "neguebe"],
    focusPlaceId: "megido",
  },
  {
    slug: "rute",
    name: "Rute",
    group: "historicos",
    era: "juizes",
    dates: "“No tempo em que julgavam os juízes.” A história cabe no século XI, se se liga à genealogia de Davi.",
    uncertainty: "Belém não está na lista de sítios deste atlas. O livro é uma família, não uma fronteira.",
    government:
      "O mesmo mundo sem rei de Juízes, visto de uma aldeia. O poder local é o resgate da parentela, não um trono.",
    characters: ["Rute", "Noemi", "Boaz", "Elimeleque"],
    history: [
      "Uma família de Belém vai a Moabe na fome. Morrem os homens. Rute, moabita, volta com Noemi para a colheita.",
      "Boaz resgata o campo e a casa. O filho entra na linha de Davi. O livro é a porta pequena da monarquia, ainda sem coroa.",
    ],
    geography: [
      "A serra de Judá e a memória de Moabe, do outro lado do mar Morto. A distância é curta e a fronteira, neste tempo, é porosa.",
    ],
    placeIds: ["hebrom", "jerusalem", "dibom", "nebo"],
    routeIds: [],
    regionIds: ["israel", "moabe", "neguebe"],
    focusPlaceId: "hebrom",
  },
  {
    slug: "1-samuel",
    name: "1 Samuel",
    group: "historicos",
    era: "monarquia",
    dates: "Fim do século XI a.C. Saul é posto por volta de 1025, em cronologias de estudo, com margem de décadas.",
    uncertainty: "Siló e Gibeá não estão pinados aqui. A passagem de juiz a rei é o tema, e a data de Saul não é fixa.",
    government:
      "O fim da liderança solta. Samuel julga. O povo pede um rei “como as nações”. Saul é a primeira monarquia, ainda instável, diante dos filisteus.",
    characters: ["Samuel", "Saul", "Jônatas", "Davi", "Ana"],
    history: [
      "A arca sai de Siló e é tomada. Samuel une tribos só o bastante para pedir um rei. Saul é ungido e guerrea na serra e na fronteira.",
      "Davi entra na corte, foge e vive entre o deserto e a Filístia. Saul morre em Gilboa. O livro deixa dois polos: a casa de Saul e o guerreiro de Judá.",
    ],
    geography: [
      "A serra central, a costa filisteia e o Neguebe por onde Davi foge. A planície ainda pertence a quem tem carros e ferro.",
    ],
    placeIds: ["siquem", "betel", "hebrom", "gaza", "ascalom", "megido", "berseba"],
    routeIds: ["via-maris"],
    regionIds: ["israel", "filistia", "neguebe", "fenicia"],
    focusPlaceId: "hebrom",
  },
  {
    slug: "2-samuel",
    name: "2 Samuel",
    group: "historicos",
    era: "monarquia",
    dates: "Reinado de Davi, em geral c. 1010–970 a.C. As décadas são de estudo.",
    uncertainty: "A tomada de Jerusalém é narrada, não datada por uma inscrição. O reino “de Dã a Berseba” é fórmula, não um levantamento.",
    government:
      "Monarquia unida. Davi reina primeiro em Hebrom sobre Judá e depois em Jerusalém sobre as tribos. O poder é a casa real, o exército e a arca.",
    characters: ["Davi", "Joabe", "Bate-Seba", "Natã", "Absalão", "Mefibosete"],
    history: [
      "Davi é rei em Hebrom por sete anos. Conquista Jerusalém, traz a arca e recebe a promessa de uma casa. O mapa ganha um centro que Saul não teve.",
      "Guerra, censo e a revolta de Absalão mostram o preço da corte. O reino se estende em campanhas, mas a unidade depende da pessoa do rei.",
    ],
    geography: [
      "Hebrom na serra do sul, Jerusalém no divisor de águas, e vizinhos em volta: Filístia, Moabe, Amom, Edom, Aram.",
    ],
    placeIds: ["hebrom", "jerusalem", "jerico", "raba", "damasco", "gaza"],
    routeIds: ["caminho-do-rei", "via-maris"],
    regionIds: ["israel", "filistia", "moabe", "edom", "amom", "aram"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "1-reis",
    name: "1 Reis",
    group: "historicos",
    era: "dividido",
    dates:
      "Salomão por volta de 970–930 a.C. O cisma, logo depois. O templo, no quarto ano de Salomão, é a âncora de 1 Reis 6:1.",
    uncertainty:
      "A data de 480 anos antes do templo é uma leitura, não um consenso. As fronteiras de Salomão nos vizinhos são influência, não anexação contínua.",
    government:
      "Monarquia unida sob Salomão, com trabalhos forçados e aliança com Tiro. Depois, dois reinos: Israel no norte, com capital móvel até Samaria, e Judá em Jerusalém.",
    characters: ["Salomão", "Roboão", "Jeroboão", "Elias", "Acabe", "Jezabel", "Hirão"],
    history: [
      "Salomão constrói o templo e o palácio, casa com o Egito e arma o comércio até Eziom-Geber. A riqueza tem um avesso: o jugo sobre as tribos.",
      "Jeroboão levanta o norte. Betel e Dã viram santuários. Elias enfrenta Acabe. Damasco e Tiro entram na política do norte. O livro é o começo dos dois reinos.",
    ],
    geography: [
      "Jerusalém e o templo, Siquém, Samaria no horizonte, a planície de Jezreel, a Fenícia e o golfo em Eziom-Geber.",
    ],
    placeIds: ["jerusalem", "siquem", "betel", "da", "samaria", "megido", "tiro", "eziom-geber", "damasco"],
    routeIds: ["via-maris", "caminho-do-rei"],
    regionIds: ["israel-norte", "juda", "fenicia", "aram", "filistia", "egito"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "2-reis",
    name: "2 Reis",
    group: "historicos",
    era: "exilio",
    dates:
      "Do século IX ao VI a.C. Samaria cai em 722 a.C. Jerusalém, em 586 a.C. Essas duas datas são as mais firmes da história deuteronomista.",
    uncertainty:
      "722 e 586 são âncoras. Os reis intermediários têm sincronismos discutidos em poucos anos, não em séculos.",
    government:
      "Dois reinos até 722. Depois, só Judá, vassalo da Assíria e em seguida da Babilônia. No fim, não há rei em Jerusalém: há deportação e um governador.",
    characters: ["Eliseu", "Jeú", "Ezequias", "Senaqueribe", "Josias", "Nabucodonosor"],
    history: [
      "Eliseu ainda circula pelo norte. Jeú derruba a casa de Acabe. A Assíria sobe, e em 722 Samaria deixa de ser reino.",
      "Ezequias resiste a Senaqueribe e Jerusalém fica. Josias reforma e morre em Megido. Nabucodonosor toma a cidade em 586, queima o templo e leva a casa real. O livro acaba com um rei cego na Babilônia.",
    ],
    geography: [
      "Samaria, Jerusalém, Megido, Laquis na Sefelá, Nínive e Babilônia. O mapa deixa de ser só o corredor e passa a incluir os dois rios.",
    ],
    placeIds: ["samaria", "jerusalem", "megido", "ninive", "assur", "babilonia", "damasco"],
    routeIds: ["via-maris"],
    regionIds: ["israel-norte", "juda", "assiria", "babilonia-terra", "egito"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "1-cronicas",
    name: "1 Crônicas",
    group: "historicos",
    era: "monarquia",
    dates: "Conta a geração de Davi. Foi composto depois, para leitores do período persa, talvez no século V ou IV a.C.",
    uncertainty:
      "A data da escrita é posterior ao mundo que o livro descreve. Genealogias comprimem séculos.",
    government:
      "A monarquia de Davi, relida como culto. O rei interessa porque organiza levitas, arca e templo, não porque amplia fronteira.",
    characters: ["Davi", "os levitas", "as tribos nas listas"],
    history: [
      "Listas ligam o presente pós-exílico a Judá, a Levi e a Davi. A história de Saul é curta. O centro é a passagem da arca e a preparação do templo.",
      "O livro quase não entra no norte como reino rival. Ele escolhe a memória que ainda sustenta Jerusalém.",
    ],
    geography: [
      "Jerusalém e Hebrom de novo. As listas percorrem a terra tribal, mas o mapa que importa é o da cidade e do santuário.",
    ],
    placeIds: ["hebrom", "jerusalem", "jerico", "berseba"],
    routeIds: [],
    regionIds: ["israel", "juda"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "2-cronicas",
    name: "2 Crônicas",
    group: "historicos",
    era: "persia",
    dates: "De Salomão ao edito de Ciro, 538 a.C. A redação olha esse arco a partir do retorno.",
    uncertainty: "O norte some de propósito. Não é que Israel não tenha existido. O livro escolhe Judá e o templo.",
    government:
      "Reis de Judá julgados pelo culto. O fecho não é um rei davídico no trono, e sim Ciro, rei da Pérsia, autorizando a volta.",
    characters: ["Salomão", "Roboão", "Josafá", "Ezequias", "Josias", "Ciro"],
    history: [
      "O templo de Salomão abre o livro. Os reis de Judá sobem e descem conforme buscam a Deus. Reformas e invasões repetem o que Reis conta, com outro acento.",
      "A queda chega, e a última frase é o edito persa. A história não termina no exílio. Termina numa licença imperial para reconstruir.",
    ],
    geography: [
      "Jerusalém quase sozinha no primeiro plano. Egito, Assíria e Pérsia entram como poderes de fora. Yehud ainda não tem muro.",
    ],
    placeIds: ["jerusalem", "samaria", "megido", "babilonia"],
    routeIds: ["retorno"],
    regionIds: ["juda", "egito", "yehud"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "esdras",
    name: "Esdras",
    group: "historicos",
    era: "persia",
    dates: "De 538 a.C., o edito de Ciro, até meados do século V, se Esdras chega no reinado de Artaxerxes. A ordem dos capítulos é debatida.",
    uncertainty:
      "Há discussão se Esdras precede ou segue Neemias. A província de Yehud é pequena. Não se desenhe o império persa por cima do mapa.",
    government:
      "Província persa. Quem manda no alto é o rei em outra capital. Em Jerusalém, governador, sacerdotes e um escriba com o livro da lei. Sem rei davídico.",
    characters: ["Ciro", "Zorobabel", "Jesua", "Esdras", "Dario", "Artaxerxes"],
    history: [
      "Um grupo volta, levanta o altar e, depois de atraso, termina o templo por volta de 515 a.C. Os vizinhos da província resistem à obra.",
      "Esdras chega com a lei e enfrenta os casamentos com os povos da terra. O livro é administração e culto, não campanha.",
    ],
    geography: [
      "O caminho da Babilônia a Jerusalém, pela estepe e por Damasco. No destino, uma Yehud de poucas aldeias em volta da cidade.",
    ],
    placeIds: ["babilonia", "hara", "damasco", "jerusalem", "tiro"],
    routeIds: ["retorno", "via-maris"],
    regionIds: ["yehud", "egito", "fenicia"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "neemias",
    name: "Neemias",
    group: "historicos",
    era: "persia",
    dates: "Neemias chega a Jerusalém em 445 a.C., no ano vigésimo de Artaxerxes, se a leitura usual do livro estiver certa.",
    uncertainty: "445 a.C. é a data mais citada. A extensão do muro e a lista dos construtores não desenham um reino.",
    government:
      "Governador persa, copeiro do rei, com licença para levantar o muro. O poder local é conselho, sacerdócio e a leitura pública da lei.",
    characters: ["Neemias", "Artaxerxes", "Sambalate", "Tobias", "Esdras"],
    history: [
      "Neemias ouve que o muro está caído, pede licença e reconstrói em meio à oposição de Samaria e de Amom. A cidade ganha porta e censo.",
      "A lei é lida na praça. O livro fecha a sequência histórica do cânon protestante com uma comunidade pequena, juramentada e sem rei.",
    ],
    geography: [
      "Jerusalém intra-muros e a Yehud em volta. Samaria ao norte e Amom a leste são vizinhos, não súditos.",
    ],
    placeIds: ["jerusalem", "samaria", "raba", "jerico"],
    routeIds: ["retorno"],
    regionIds: ["yehud"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "ester",
    name: "Ester",
    group: "historicos",
    era: "persia",
    dates: "Corte de Assuero, em geral identificado com Xerxes, 486–465 a.C. A identificação é a leitura usual, não uma prova.",
    uncertainty:
      "O livro não nomeia Jerusalém nem a lei. A capital persa da narrativa não está neste mapa. Não se desenha um círculo do império.",
    government:
      "Império persa visto de dentro. O rei decreta. Um ministro persegue. Uma rainha judia intervém. Não há governador de Yehud em cena.",
    characters: ["Ester", "Mordecai", "Assuero", "Hamã"],
    history: [
      "Judeus da diáspora vivem na administração persa. Um decreto ameaça o povo em todas as províncias. Ester entra na corte e o decreto é revertido.",
      "A história explica a festa de Purim. O chão de Yehud fica fora do enredo, e mesmo assim o livro pertence ao século persa.",
    ],
    geography: [
      "O mapa deste atlas só alcança a beira ocidental desse império: Babilônia, o corredor e a pequena Yehud, que o livro não visita.",
    ],
    placeIds: ["babilonia", "hara", "jerusalem"],
    routeIds: ["retorno"],
    regionIds: ["yehud"],
    focusPlaceId: "babilonia",
  },
  {
    slug: "oseias",
    name: "Oseias",
    group: "perifericos",
    era: "dividido",
    dates: "Reinos de Uzias, Jotão, Acaz e Ezequias, e de Jeroboão II. Século VIII a.C., antes de 722.",
    uncertainty: "Os reis nomeados situam o livro. Os oráculos internos não têm dia e mês.",
    government:
      "Reino de Israel no norte, já rico e já frágil, com culto real em Betel. Judá aparece como irmão, não como capital do profeta.",
    characters: ["Oseias", "Gômer", "Jeroboão II"],
    history: [
      "O casamento do profeta vira parábola do norte infiel. Samaria confia no Egito e na Assíria. O livro anuncia que o reino não se sustenta.",
      "É voz de dentro de Israel, contemporânea de Amós e anterior à queda. Não funda outro governo. Julga o que há.",
    ],
    geography: ["Samaria, Betel, o vale e a sombra da Assíria a nordeste. A terra do norte é o assunto inteiro."],
    placeIds: ["samaria", "betel", "da", "megido"],
    routeIds: ["via-maris"],
    regionIds: ["israel-norte", "juda", "assiria"],
    focusPlaceId: "samaria",
  },
  {
    slug: "amos",
    name: "Amós",
    group: "perifericos",
    era: "dividido",
    dates: "Dias de Uzias de Judá e de Jeroboão II de Israel, meados do século VIII a.C.",
    uncertainty: "“Dois anos antes do terremoto” fixa o livro na memória local, não num ano absoluto.",
    government:
      "Um criador de Tecoa fala contra a monarquia e o culto do norte. O rei não o chamou. O poder denunciado é a corte de Samaria.",
    characters: ["Amós", "Amazias", "Jeroboão II"],
    history: [
      "Oráculos contra Damasco, Gaza, Edom, Amom, Moabe e os dois reinos. O alvo longo é Israel: luxo, tribunal vendido e santuário.",
      "Amós é expulso de Betel. O livro fica como testemunha do norte ainda de pé, com a Assíria já no horizonte.",
    ],
    geography: [
      "Da porta de Samaria aos vizinhos em volta. Tecoa, na serra de Judá, não está pinada. O mapa mostra quem ele acusa.",
    ],
    placeIds: ["samaria", "betel", "damasco", "gaza", "bozra", "raba"],
    routeIds: ["via-maris", "caminho-do-rei"],
    regionIds: ["israel-norte", "juda", "aram", "filistia", "edom", "moabe", "amom"],
    focusPlaceId: "samaria",
  },
  {
    slug: "isaias",
    name: "Isaías",
    group: "perifericos",
    era: "dividido",
    dates:
      "Capítulos da Assíria, no fim do século VIII, com Acaz e Ezequias. Os capítulos do consolo pressupõem o exílio e Ciro. O livro atravessa mais de um século.",
    uncertainty:
      "A unidade do livro é debatida. A geografia muda: cerco assírio primeiro, retorno da Babilônia depois.",
    government:
      "Judá monárquica sob ameaça assíria. Mais adiante, o rei que liberta não é davídico: é Ciro da Pérsia. O profeta não governa.",
    characters: ["Isaías", "Acaz", "Ezequias", "Senaqueribe", "Ciro"],
    history: [
      "Isaías aconselha Jerusalém a não trocar o temor do Senhor por aliança com o Egito ou com a Assíria. O cerco de Senaqueribe é o centro histórico da primeira parte.",
      "A segunda voz abre caminho no deserto e nomeia Ciro. O mapa deixa de ser só a cidade cercada e passa a incluir Babilônia e a volta.",
    ],
    geography: [
      "Jerusalém, a Sefelá por onde sobe o exército, o Nilo como aliado tentador, e depois o corredor do retorno.",
    ],
    placeIds: ["jerusalem", "samaria", "megido", "ninive", "babilonia", "menfis"],
    routeIds: ["via-maris", "retorno"],
    regionIds: ["juda", "israel-norte", "assiria", "egito"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "jeremias",
    name: "Jeremias",
    group: "perifericos",
    era: "exilio",
    dates: "De Josias até depois de 586 a.C. O profeta vê os últimos reis de Judá e a queda.",
    uncertainty: "Os capítulos não estão em ordem cronológica. A fuga ao Egito é o fim da biografia, não uma data de reinado.",
    government:
      "Judá ainda é monarquia, vassala da Babilônia. Jeremias aconselha render-se. Depois da queda, Gedalias governa sem ser rei, e é morto.",
    characters: ["Jeremias", "Baruque", "Joaquim", "Zedequias", "Nabucodonosor", "Gedalias"],
    history: [
      "Jeremias anuncia que a Babilônia veio para ficar. Reis queimam o rolo, prendem o profeta e esperam o Egito. Em 586 a cidade cai.",
      "Um resto mata o governador e desce ao Egito, levando Jeremias. O livro é a agonia da monarquia de Judá.",
    ],
    geography: [
      "Jerusalém, Anatote na serra, Mispá, e o caminho do resto até o delta. Babilônia é o destino dos exilados.",
    ],
    placeIds: ["jerusalem", "jerico", "menfis", "babilonia", "raba"],
    routeIds: ["via-maris"],
    regionIds: ["juda", "egito", "babilonia-terra"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "ezequiel",
    name: "Ezequiel",
    group: "perifericos",
    era: "exilio",
    dates: "A partir de 593 a.C., quinto ano do exílio de Joaquim, junto ao rio Quebar. As visões seguem até depois da queda.",
    uncertainty: "Quebar é um canal da Babilônia, não uma coordenada deste atlas. O profeta está longe do monte.",
    government:
      "Não há rei em exercício sobre o povo que ele pastoreia. Ezequiel é sacerdote no exílio. A Babilônia é o império. A esperança é um príncipe futuro, não o trono de Zedequias.",
    characters: ["Ezequiel", "Joaquim", "o príncipe das visões"],
    history: [
      "Visões de glória que deixa o templo e de julgamento que alcança Jerusalém à distância. A cidade cai, e o livro muda de tom.",
      "Os últimos capítulos medem uma terra e um templo restaurados. É mapa de esperança, com fronteiras esquemáticas, não um censo persa.",
    ],
    geography: [
      "Babilônia como lugar do profeta. Jerusalém como lugar da visão. Os rios do leste substituem o Jordão.",
    ],
    placeIds: ["babilonia", "jerusalem", "assur", "ninive"],
    routeIds: ["retorno"],
    regionIds: ["babilonia-terra", "juda"],
    focusPlaceId: "babilonia",
  },
  {
    slug: "daniel",
    name: "Daniel",
    group: "perifericos",
    era: "exilio",
    dates:
      "As histórias da corte situam Daniel da Babilônia de Nabucodonosor à Pérsia. Parte do livro olha para o período grego. A data de composição é debatida, do exílio ao século II a.C.",
    uncertainty:
      "Este atlas não escolhe entre as datas. O chão narrado é Babilônia. O horizonte dos impérios vai além do mapa persa.",
    government:
      "Impérios sucessivos, não o trono de Davi. Daniel serve na corte e não governa Yehud. Os reinos sobem e caem como estátuas e animais.",
    characters: ["Daniel", "Nabucodonosor", "Belsazar", "Dario", "Ciro"],
    history: [
      "Jovens deportados entram no serviço do rei. A fornalha, a escrita na parede e a cova contam a fidelidade dentro do império.",
      "As visões empilham reinos até um domínio que o livro não chama de Pérsia. Por isso Daniel fica na periferia do mapa: o chão é o exílio, o alcance é maior.",
    ],
    geography: ["Babilônia no primeiro plano. Jerusalém é a cidade da oração voltada para o oeste, fora da cena."],
    placeIds: ["babilonia", "jerusalem", "assur"],
    routeIds: [],
    regionIds: ["babilonia-terra"],
    focusPlaceId: "babilonia",
  },
  {
    slug: "ageu",
    name: "Ageu",
    group: "perifericos",
    era: "persia",
    dates: "Quatro datas no segundo ano de Dario, 520 a.C. É um dos livros com mês e dia.",
    uncertainty: "520 a.C. é firme para estes oráculos. O tamanho da comunidade que os ouviu não é.",
    government:
      "Província persa. Zorobabel é governador da linhagem de Davi, não rei coroado. Josué é sumo sacerdote. Ageu empurra os dois a retomar o templo.",
    characters: ["Ageu", "Zorobabel", "Josué", "Dario"],
    history: [
      "A casa de cada um está coberta, e a casa de Deus não. Em poucos meses o profeta cobra a obra parada desde o retorno.",
      "O livro é curto porque a tarefa é uma: reconstruir. Não há guerra nem fronteira nova.",
    ],
    geography: ["Jerusalém e a Yehud imediata. O império só aparece como o nome do rei que data os discursos."],
    placeIds: ["jerusalem"],
    routeIds: ["retorno"],
    regionIds: ["yehud"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "zacarias",
    name: "Zacarias",
    group: "perifericos",
    era: "persia",
    dates: "Visões em 520–518 a.C., com Ageu. A segunda parte do livro não traz data e pode ser posterior.",
    uncertainty: "Os capítulos finais alargam o mapa e a escatologia. Não se deve lê-los como um censo de 520.",
    government:
      "Os mesmos dois polos de Ageu: governador e sumo sacerdote, debaixo da Pérsia. Zacarias os chama de dois ungidos, não de uma monarquia restaurada.",
    characters: ["Zacarias", "Zorobabel", "Josué"],
    history: [
      "Cavaleiros, candelabro e o templo medem uma restauração pequena e vigiada. O profeta encoraja quem acha o dia das coisas pequenas.",
      "Mais adiante, nações e um rei humilde entram em vista. Continua sendo Yehud, não o reino de Salomão redesenhado.",
    ],
    geography: ["Jerusalém no centro. O corredor do retorno explica de onde a comunidade veio."],
    placeIds: ["jerusalem", "babilonia", "damasco"],
    routeIds: ["retorno"],
    regionIds: ["yehud"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "tobias",
    name: "Tobias",
    group: "deuterocanonicos",
    era: "exilio",
    dates: "A história se passa depois da deportação do norte, com Nínive ainda de pé, portanto antes de 612 a.C.",
    uncertainty:
      "Livro deuterocanônico. Não está no cânon hebraico nem no protestante. A geografia da viagem mistura lugares de propósito edificante. Não é um itinerário escavado.",
    government:
      "Família deportada sob a Assíria. Não há rei de Israel. O poder é o império, e a piedade é doméstica.",
    characters: ["Tobias", "Tobite", "Sara", "Rafael"],
    history: [
      "Tobite, deportado, pratica caridade em Nínive e fica cego. O filho viaja para recuperar um depósito e encontra Sara.",
      "A cura e o retorno fecham um conto de diáspora. O mapa só marca Nínive e a direção do leste. A Média não é um reino deste atlas.",
    ],
    geography: ["Nínive no Tigre. A viagem sai da capital assíria para o planalto a leste, fora da placa principal."],
    placeIds: ["ninive", "assur"],
    routeIds: [],
    regionIds: ["assiria"],
    focusPlaceId: "ninive",
  },
  {
    slug: "judite",
    name: "Judite",
    group: "deuterocanonicos",
    era: "dividido",
    dates: "O livro mistura Nabucodonosor, a Assíria e um cerco à Judeia de um modo que não fecha com a cronologia dos impérios.",
    uncertainty:
      "Deuterocanônico. A própria abertura é um sinal de que a geografia é narrativa, não relatório. Não se corrija o livro para caber num século só.",
    government:
      "Uma cidade da serra resiste a um general imperial. Israel não tem rei em cena. Judite age fora das instituições, e o conto celebra essa resistência.",
    characters: ["Judite", "Holofernes", "Ozias"],
    history: [
      "Um exército sobe contra as cidades do norte da Judeia e corta a água de Betúlia. Os anciãos quase entregam a praça.",
      "Judite entra no acampamento e volta com a cabeça do general. O cerco se desfaz. O lugar de Betúlia não está identificado com segurança.",
    ],
    geography: [
      "A serra entre a planície e Jerusalém. O livro usa nomes conhecidos, como Jericó e o vale, sem uma fronteira que se possa traçar.",
    ],
    placeIds: ["jerusalem", "jerico", "samaria", "betel"],
    routeIds: ["via-maris"],
    regionIds: ["juda", "israel-norte"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "1-macabeus",
    name: "1 Macabeus",
    group: "deuterocanonicos",
    era: "persia",
    dates: "De 175 a 134 a.C., da ascensão de Antíoco IV à morte de Simão. Já é o período grego, depois do mapa persa.",
    uncertainty:
      "Deuterocanônico. As fronteiras da Judeia hasmoneia mudam de década em década e são contestadas. Este atlas desenha só a serra, não um império.",
    government:
      "Domínio selêucida, depois uma casa sacerdotal em armas. Os Macabeus não são a monarquia de Davi. No fim do livro, Simão acumula liderança civil e culto. A realeza hasmoneia vem depois, com Aristóbulo.",
    characters: ["Matatias", "Judas Macabeu", "Jônatas", "Simão", "Antíoco IV"],
    history: [
      "Antíoco profana o templo e proíbe a lei. Matatias recusa o sacrifício em Modein. Judas retoma o templo em 164 a.C. e guerrea na serra e na planície.",
      "Os irmãos negociam com Esparta, Roma e os reis gregos. Jerusalém volta a ser centro, agora entre potências helenísticas, não entre Egito e Assíria.",
    ],
    geography: [
      "Jerusalém, a serra até Hebrom e Siquém, a costa ainda em outras mãos. Selêucidas e Ptolomeus não são desenhados como um disco.",
    ],
    placeIds: ["jerusalem", "hebrom", "siquem", "gaza", "jerico"],
    routeIds: ["via-maris"],
    regionIds: ["judeia-hasmoneia", "filistia"],
    focusPlaceId: "jerusalem",
  },
  {
    slug: "2-macabeus",
    name: "2 Macabeus",
    group: "deuterocanonicos",
    era: "persia",
    dates: "O mesmo conflito, contado até a morte de Nicanor, 161 a.C. O prefácio diz que resume uma obra de Jasão de Cirene.",
    uncertainty:
      "Deuterocanônico. É outra teologia do mesmo tempo, não uma segunda cronologia. As datas de 1 Macabeus continuam sendo a espinha.",
    government:
      "O templo está no centro do poder. O sumo sacerdócio é comprado e disputado sob o rei selêucida. Judas luta para purificar o santuário, não para restaurar Salomão.",
    characters: ["Judas Macabeu", "Onias", "Jasão", "Menelau", "Antíoco IV", "Nicanor"],
    history: [
      "O livro abre com cartas e com o martírio de quem recusa comer o que a lei proíbe. A profanação do templo é o agravo máximo.",
      "Judas vence, purifica o lugar e institui a festa da dedicação. A narrativa para antes da casa hasmoneia virar reino.",
    ],
    geography: ["Quase só Jerusalém e o santuário. O mapa político é o da Judeia helenística, desenhado pequeno de propósito."],
    placeIds: ["jerusalem", "hebrom", "jerico"],
    routeIds: [],
    regionIds: ["judeia-hasmoneia"],
    focusPlaceId: "jerusalem",
  },
];

const bySlug = new Map(bookStudies.map((book) => [book.slug, book]));
const byName = new Map(bookStudies.map((book) => [book.name, book]));

export function getBookStudy(slug: string): BookStudy | undefined {
  return bySlug.get(slug);
}

export function studyForName(name: string): BookStudy | undefined {
  return byName.get(name);
}
