import type { Station } from "@/lib/types";

export const stations: Station[] = [
  {
    slug: "casa-no-egito",
    order: 1,
    title: "A casa no Egito",
    region: "Delta oriental",
    reading: "Êxodo 1–2",
    epigraph:
      "Um rei novo ocupa o Egito, e a dívida antiga com José já não conta na corte.",
    epigraphRef: "Êxodo 1:8",
    paragraphs: [
      "Êxodo abre com um problema político. Os filhos de Israel estão no Egito porque José tinha sido útil a um faraó. Essa memória acabou. O povo vira mão de obra e, na conta do rei, uma ameaça: se houver guerra, pode passar para o lado do inimigo.",
      "A geografia explica o medo e o proveito. Gósen fica no delta oriental, na faixa do uádi Tumilate, entre o Nilo e a porta do Sinai. É lavoura, perto das obras do estado e perto da saída. O livro nomeia duas cidades de depósito, Pitom e Ramessés. Ramessés aponta para Pi-Ramessés, a residência do delta perto da atual Qantir. O nome pesa para quem data a saída no século XIII a.C. Não é, sozinho, uma certidão: um nome pode entrar num texto mais tarde. Serve para situar a memória no leste do delta, não em Tebas.",
      "O governo que paira sobre essa casa é o Império Novo. O faraó está no centro de obras, templos e campanhas. No Levante, o Egito trata as cidades de Canaã como vassalas. Israel, dentro do Egito, está do lado de dentro da máquina. O texto não dá o nome do rei. Tutmés III ou Amenotep II, se a conta dos 480 anos de 1 Reis 6:1 for seguida; Ramsés II, se o nome da cidade pesar mais. Tudo isso é hipótese. A princesa que tira a criança da margem também não tem nome.",
      "O Nilo é o personagem geográfico do nascimento de Moisés. O Egito existe porque o rio inunda e deixa lodo. Mais adiante, Deuteronômio vai lembrar o contraste: lá se regava a horta com o pé; a terra da promessa depende da chuva. No capítulo 2, o rio é as duas coisas. É o instrumento do decreto e é o esconderijo da cesta. O estado controla o delta. Não controla o que uma mãe faz na margem.",
      "Moisés cresce na corte e volta ao canteiro. Mata um egípcio, é descoberto e foge. O mapa muda de lado. O homem criado entre o rio e o palácio sai para Midiã, a leste do golfo de Ácaba. O primeiro movimento da história dele é uma travessia de governo: do império mais organizado da região para uma tenda.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "Gósen não é o Egito inteiro. É a borda leste do delta, onde o estado constrói depósitos e onde uma família ainda pode criar rebanho. Tebas, no sul, fica de propósito fora desta cena.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "O faraó do Êxodo não é nomeado. O que se estuda é o tipo de poder: um rei tratado como divino, uma economia de obras e uma fronteira militar na direção do Sinai.",
    questions: [
      {
        prompt:
          "O que muda, na prática, quando o texto diz que o novo rei não tinha conhecido José?",
        ref: "Êxodo 1:8–14",
      },
      {
        prompt:
          "Pitom e Ramessés são cidades de depósito. O que isso diz sobre o lugar de Israel na economia do Egito?",
        ref: "Êxodo 1:11",
      },
      {
        prompt:
          "O Nilo aparece como ameaça e como esconderijo. Que poder o faraó tem sobre o rio, e que poder ele não tem?",
        ref: "Êxodo 2",
      },
      {
        prompt:
          "Por que a fuga para Midiã já é uma mudança de mapa, e não só de endereço?",
        ref: "Deuteronômio 11:10–12",
      },
    ],
    placeId: "rameses",
    governmentSlug: "egito",
    geographySlug: "delta-gosen",
  },
  {
    slug: "a-sarca",
    order: 2,
    title: "A sarça no monte",
    region: "Midiã e Horebe",
    reading: "Êxodo 3–4",
    epigraph:
      "Moisés guarda o rebanho do sogro e chega ao monte que o texto chama de Deus, Horebe.",
    epigraphRef: "Êxodo 3:1",
    paragraphs: [
      "Moisés está a serviço do rebanho de Jetro, também chamado Reuel, sacerdote de Midiã. Midiã não é um império. É um conjunto de grupos no noroeste da Arábia, a leste do golfo de Ácaba: gente de deserto, de oásis e de rota. O genro do sacerdote é um foragido do Egito. O chamado o alcança nesse ofício, longe do Nilo.",
      "O monte é chamado de monte de Deus e de Horebe. Êxodo, mais adiante, vai falar em Sinai. A leitura corrente trata os dois nomes como o mesmo maciço. Onde fica é pergunta aberta. A tradição do sul aponta Jebel Musa. Outra leitura, justamente por causa destes anos em Midiã, procura o monte do outro lado do golfo. A placa marca a tradição do sul na estação do Sinai. Aqui o que importa é a função: um lugar de pastagem que o texto chama de santo antes de Israel chegar em massa.",
      "A cena é vocação e embate de nomes. Moisés pergunta pelo nome de quem envia. A resposta — eu sou o que sou, e o nome que a tradição hebraica não pronuncia à toa — distingue este Deus dos deuses do Egito e também do culto que um midianita já praticava à sua maneira. Jetro não é tratado como inimigo. No capítulo 18 vai aconselhar a organização da justiça. Parentesco e diferença cabem na mesma família.",
      "Moisés resiste. Não fala bem, teme que não acreditem, e recebe sinais: o cajado, a mão, a água que vira sangue. Arão sai ao encontro dele. O retorno ao Egito é uma decisão política. O pastor vai de novo falar com o rei que o formou e do qual ele fugiu. A sarça não tira Israel do mapa do Egito. Manda Moisés de volta para dentro dele.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "Midiã fica além do golfo, não no delta. O chamado atravessa a fronteira que o fugitivo tinha usado para se salvar. Voltar é desfazer essa fuga de propósito.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "Do lado de Jetro não há faraó. Há um sacerdote de clã. A autoridade que Moisés recebe não é um cargo egípcio: é um envio, e ele ainda vai ter de negociar com o único governo que o texto reconhece no vale do Nilo.",
    questions: [
      {
        prompt:
          "Por que o chamado acontece no rebanho de Jetro, e não no palácio onde Moisés foi criado?",
        ref: "Êxodo 3:1–6",
      },
      {
        prompt:
          "Que diferença faz chamar o lugar de monte de Deus antes de Israel chegar em massa?",
        ref: "Êxodo 3:1",
      },
      {
        prompt:
          "Jetro é sacerdote de Midiã e, mais tarde, conselheiro. O que a narrativa faz com um culto que não é o de Israel?",
        ref: "Êxodo 18",
      },
      {
        prompt:
          "Quais resistências de Moisés são pessoais, e qual é o medo político de voltar à corte?",
        ref: "Êxodo 4",
      },
    ],
    placeId: "sinai",
    governmentSlug: "midia",
    geographySlug: "sinai",
  },
  {
    slug: "o-farao",
    order: 3,
    title: "O confronto com o faraó",
    region: "A corte do delta",
    reading: "Êxodo 5–11",
    epigraph:
      "O pedido para sair vira disputa com o rei: o rio, a colheita, a sucessão e o calendário entram no cerco.",
    epigraphRef: "Êxodo 5:1–2",
    paragraphs: [
      "Moisés e Arão não pedem uma reforma. Pedem que o povo saia para servir no deserto. O faraó ouve isso como perda de mão de obra e responde aumentando a cota: o tijolo continua, a palha deixa de ser dada. A primeira consequência do chamado é o trabalho ficar pior. Israel, no meio, ainda não tem motivo para confiar nos dois irmãos.",
      "As pragas não são um espetáculo solto. Cada golpe acerta uma peça do poder que se acha dono do país. O Nilo, que faz o Egito existir, vira sangue. Rãs, mosquitos e moscas saem do chão úmido do delta. O gado, a pele, o granizo sobre a cevada e o linho, o gafanhoto sobre o que restou, a escuridão: a corte que organiza a colheita perde o calendário agrícola. Os magos acompanham o começo e depois não acompanham mais. O estado tem especialistas. Eles têm limite.",
      "O faraó continua sem nome. Isso importa. O livro recusa transformar a cena num duelo de personalidades famosas. O adversário é o cargo: o rei que não solta, que negocia uma saída pela metade, que pede oração quando a praga aperta e volta atrás quando ela passa. A teimosia é política. Soltar Israel é admitir que o delta não é só dele.",
      "A última praga atinge a sucessão. Numa casa real em que o filho é a continuidade do deus-rei, a morte do primogênito é o golpe na dinastia, não só na família. Israel, na mesma noite, marca as portas e come apressado. O calendário de um povo que ainda não tem terra começa dentro da casa do império.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "As pragas conversam com o delta: rio, umidade, lavoura, gado. Não são prodígios genéricos. Atingem a máquina que faz o Egito ser o Egito, justamente na região onde Israel trabalha.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "A corte tem magos, capatazes e um rei que pode piorar a cota num dia. O que ela não tem, no livro, é um nome próprio para o faraó. As duas janelas de data continuam abertas.",
    questions: [
      {
        prompt:
          "Por que a primeira resposta do faraó é aumentar o trabalho, e não simplesmente negar uma audiência?",
        ref: "Êxodo 5",
      },
      {
        prompt:
          "Escolha três pragas e diga qual peça da economia do delta cada uma atinge.",
        ref: "Êxodo 7–10",
      },
      {
        prompt:
          "O que a morte do primogênito ameaça numa realeza que se entende como divina?",
        ref: "Êxodo 11–12",
      },
      {
        prompt:
          "Por que o livro ganha em precisão ao não nomear o faraó, em vez de perder?",
        ref: "1 Reis 6:1",
      },
    ],
    placeId: "rameses",
    governmentSlug: "egito",
    geographySlug: "nilo",
  },
  {
    slug: "a-saida",
    order: 4,
    title: "A saída e o mar",
    region: "De Ramessés ao mar",
    reading: "Êxodo 12–15",
    epigraph:
      "Na noite em que o calendário muda, o povo deixa a cidade de depósito e o mar corta a perseguição.",
    epigraphRef: "Êxodo 12:37",
    paragraphs: [
      "A noite da páscoa reorganiza o tempo. A festa fica amarrada à pressa: pão sem fermento, cinto apertado, sandália no pé. Israel sai de Ramessés na direção de Sucote. O número do livro é de um povo, não de uma família. A leitura de estudo não precisa resolver a conta demográfica para ver o que o texto afirma: quem sai é um grupo grande o bastante para assustar um rei.",
      "A rota é a decisão militar do capítulo 13. Pelo caminho da terra dos filisteus haveria guerra logo, e o povo voltaria ao Egito. Esse caminho é a estrada da costa, vigiada, a mesma faixa que mais tarde os impérios vão usar para entrar no Levante. O texto diz que ela não foi tomada. A linha tracejada do mapa é essa estrada. A linha de cobre é a outra: a volta pelo deserto do mar dos juncos.",
      "Yam Suf, no hebraico, é o mar dos juncos. “Mar Vermelho” chegou pelo grego e pelo latim. Onde a travessia aconteceu continua em debate: lagos amargos, o norte do golfo de Suez, propostas mais a norte ou mais a leste. A placa segue a reconstrução tradicional do sul e marca o mar como um vértice da marcha, não como uma descoberta arqueológica. O que o cântico afirma é outro: a perseguição dos carros acaba na água, e o deserto começa do outro lado.",
      "O cântico de Miriã e de Moisés é a primeira leitura pública da saída. O faraó ainda não tem nome. O mar tem. A partir daqui o inimigo deixa de ser a corte e passa a ser a sede, a fome e a memória do Egito, que vai voltar toda vez que o deserto apertar.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "A curva não é desorientação. É recusa da estrada militar. Quem olha o mapa e vê a costa mais curta precisa ler o versículo que explica por que ela ficou de fora.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "O faraó ainda persegue, com carros. Do outro lado da água esse governo acaba para Israel. O próximo poder não é um rei substituto. É o deserto, e depois a aliança.",
    questions: [
      {
        prompt:
          "O que a páscoa faz com o calendário de um povo que ainda não tem terra?",
        ref: "Êxodo 12",
      },
      {
        prompt:
          "Por que o caminho mais curto seria, ao mesmo tempo, o mais vigiado?",
        ref: "Êxodo 13:17–18",
      },
      {
        prompt:
          "Que diferença faz ler “mar dos juncos” em vez de tratar o nome como uma cor já decidida?",
        ref: "Êxodo 15",
      },
      {
        prompt:
          "O cântico conta a saída de que ponto de vista: de quem ainda está em Ramessés, ou de quem já está do outro lado?",
        ref: "Êxodo 15:1–21",
      },
    ],
    placeId: "sucote",
    governmentSlug: "egito",
    geographySlug: "yam-suf",
  },
  {
    slug: "o-deserto",
    order: 5,
    title: "Água, pão e o monte",
    region: "Do deserto de Sur ao Sinai",
    reading: "Êxodo 15:22 a 18",
    epigraph:
      "Depois do mar vêm a sede, o pão no chão e um conselho de organização, antes de o monte receber a lei.",
    epigraphRef: "Êxodo 16:4",
    paragraphs: [
      "Três dias sem água, e a água de Mara está amarga. O livro não romantiza o deserto. A primeira crise depois da vitória é logística. Elim, com fontes e palmeiras, mostra o outro lado do mesmo chão: o Sinai não é só pedra. É uma península de oásis raros. Mara e Elim ficam, neste atlas, no ponto em que os mapas de estudo costumam colocá-los. A identificação é tradição.",
      "O maná e as codornizes respondem à fome, e também ensinam um calendário. Recolher para um dia, em dobro na véspera do sábado, não guardar para o dia seguinte: a comida vira regra de tempo antes de haver templo. A murmuração compara o deserto com as panelas do Egito. A memória da escravidão, quando a barriga aperta, vira nostalgia.",
      "Em Refidim não há água, e há guerra. Amaleque ataca. Moisés no monte, Josué no vale, Arão e Hur segurando os braços: a cena junta oração e combate sem explicar um pelo outro. Dali o grupo chega ao monte. Jetro, o sacerdote de Midiã, ouve o relato, oferece sacrifício e vê Moisés julgando o povo sozinho do amanhecer ao anoitecer. O conselho é administrativo. Escolhe chefes de mil, de cem, de cinquenta e de dez. A lei ainda não foi dada, e o acampamento já precisa de uma ordem que caiba em gente cansada.",
      "Só então o monte entra de fato. O deserto teve de ensinar do que o povo precisa — água, pão, defesa, juízes — antes de a aliança dizer quem ele é. A tradição do sul identifica esse monte com Jebel Musa. Outras propostas encurtam a rota ou mudam o maciço para Midiã. A placa fica com a tradição, e diz isso.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "A península do Sinai é pobre de pão e pontuada de oásis. A marcha não atravessa um vazio abstrato. Atravessa um chão em que a próxima fonte decide o ânimo do dia.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "Ainda não há rei e ainda não há código. Há um mediador sobrecarregado e um sogro que entende de acampamento. O governo do deserto começa como escala de juízes, antes de ser lei escrita.",
    questions: [
      {
        prompt:
          "O que a murmuração em Mara revela sobre a distância entre o cântico do mar e o corpo com sede?",
        ref: "Êxodo 15:22–27",
      },
      {
        prompt:
          "Como o maná organiza a semana, e não só a refeição?",
        ref: "Êxodo 16",
      },
      {
        prompt:
          "O conselho de Jetro é religioso, militar ou administrativo? O que muda na leitura se for as três coisas?",
        ref: "Êxodo 18",
      },
      {
        prompt:
          "Por que o monte só chega depois que a fome e a sede já tiveram voz?",
        ref: "Êxodo 17–19",
      },
    ],
    placeId: "mara",
    governmentSlug: "midia",
    geographySlug: "sinai",
  },
  {
    slug: "a-alianca",
    order: 6,
    title: "A aliança e o acampamento",
    region: "Ao pé do Sinai",
    reading: "Êxodo 19–40 e Levítico",
    epigraph:
      "No monte, Israel ouve as dez palavras. No vale, um bezerro mostra que a corte ainda mora na memória.",
    epigraphRef: "Êxodo 20:1–2",
    paragraphs: [
      "No terceiro mês da saída o povo acampa diante do monte. A proposta é de aliança: um povo particular, um reino de sacerdotes, uma nação santa, com a condição de ouvir e guardar. O povo aceita antes de ouvir o conteúdo. A cena é solene de propósito. Trovoada, fumaça, limite marcado na encosta: o monte não é passeio.",
      "As dez palavras começam pela saída, não por uma ideia solta de moral. “Eu sou o Senhor, que te tirei do Egito.” A lei se apresenta como consequência da libertação. Idolatria, nome, sábado, pais, sangue, cama, furto, testemunho, cobiça: o código cabe na vida de um acampamento que ainda não tem cidade. O restante de Êxodo desdobra isso em casos — escravo, boi, altar, festa — no jeito dos códigos do antigo Oriente, aplicado a um povo sem palácio.",
      "O bezerro de ouro é a crise no meio do livro. Arão funde o brinco e diz que aquele é o deus que tirou Israel do Egito. A corte que Moisés deixou reaparece como hábito religioso. O mediador quebra as tábuas, intercede, sobe de novo. A aliança não é cancelada. É refeita por cima de uma traição já acontecida. Quem lê o Sinai como um momento puro pula o capítulo 32.",
      "A tenda é armada no centro. A glória enche o tabernáculo, e a nuvem decide quando se marcha. Levítico é o tempo em que ninguém anda. Santo, sacerdócio, sacrifício, tempo, mesa, lepra, dívidas: o acampamento parado aprende a morar com o centro sagrado. Sem Levítico, a marcha de Números parece só deslocamento. Com ele, o deslocamento tem uma ordem no meio das tribos.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "O lugar da lei é um vale de deserto, não uma capital. Israel recebe identidade antes de receber terra. O monte fica de um lado; as tendas, do outro. O caminho entre os dois é a encosta que o povo não sobe.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "O acampamento sem rei: mediador, sacerdotes, juízes e uma lei que viaja. Não há cidade. O centro político é uma tenda desmontável.",
    questions: [
      {
        prompt:
          "Por que as dez palavras começam com a saída do Egito, e não com o primeiro mandamento solto?",
        ref: "Êxodo 20:1–17",
      },
      {
        prompt:
          "O que o bezerro revela sobre o que a corte egípcia ainda faz dentro do acampamento?",
        ref: "Êxodo 32",
      },
      {
        prompt:
          "Se a tenda é o centro, o que muda na ideia de capital?",
        ref: "Êxodo 40",
      },
      {
        prompt:
          "Levítico não tem marcha. Por que mesmo assim ele pertence a esta estação, e não a um apêndice?",
        ref: "Levítico 1 e 25",
      },
    ],
    placeId: "sinai",
    governmentSlug: "acampamento",
    geographySlug: "sinai",
  },
  {
    slug: "quarenta-anos",
    order: 7,
    title: "Cades e a volta",
    region: "Do Sinai às planícies de Moabe",
    reading: "Números 10–14 e 20–25",
    epigraph:
      "A terra é vista de perto e recusada. Edom fecha a estrada, e a geração seguinte chega a Moabe por fora.",
    epigraphRef: "Números 14:1–4",
    paragraphs: [
      "A nuvem se levanta e o acampamento deixa o Sinai em ordem de tribos, com a arca no meio. O tom de Números é de marcha outra vez, e de murmuração outra vez. O maná cansa. Há fogo, há codornizes, há a queixa de Miriã e Arão contra Moisés por causa da mulher cuxita. O mediador não está acima do conflito de família.",
      "De Cades-Barneia, no oásis que os atlas associam a Ein el-Qudeirat, doze exploradores sobem à terra. Voltam com fruta e com dois relatórios. A terra é boa. As cidades são fortificadas. Calebe e Josué dizem para subir. A assembleia diz para voltar ao Egito e ameaça apedrejar os dois. A recusa não é ignorância geográfica. Eles viram o país. Recusam o risco. A sentença é uma geração no deserto. Cades vira longa espera, não só um pouso.",
      "Quando a marcha recomeça, o caminho óbvio seria o caminho do rei, a estrada do planalto que sobe de Eziom-Geber por Edom e Moabe. Edom não cede a passagem. Israel contorna. A linha de cobre do mapa faz essa volta a leste, de propósito, em vez de desenhar a estrada que foi negada como se tivesse sido usada. Moabe e Amom também são contornados. A geração nova chega pelo lado de fora.",
      "No caminho há a água da rocha, a morte de Miriã e de Arão, a serpente de bronze, a vitória sobre Seom de Hesbom e sobre Ogue de Basã. Hesbom entra na rota porque a porta da frente estava fechada e a lateral, não. No fim, o acampamento está nas planícies de Moabe, o Jordão na frente, Jericó no oásis. Balaão é chamado para amaldiçoar e acaba abençoando. O último obstáculo antes do Nebo não é um exército. É uma palavra comprada, que não funciona.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "Cades fica na borda do Neguebe, perto o bastante para ver a terra e longe o bastante para transformar o medo em quarenta anos. A volta por leste é uma fronteira fechada, não um capricho do cartógrafo.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "Edom, Moabe e Amom já são reinos de planalto, com estrada e com o direito de dizer não. Israel ainda é acampamento. O contraste de governo está na resposta de Edom: um rei recusa passagem a um povo sem cidade.",
    questions: [
      {
        prompt:
          "Os exploradores concordam sobre o que viram. Onde, exatamente, os relatórios se separam?",
        ref: "Números 13–14",
      },
      {
        prompt:
          "O que a recusa de Edom obriga a mudar no mapa, e não só no ânimo?",
        ref: "Números 20:14–21",
      },
      {
        prompt:
          "Por que Hesbom entra na história justamente quando o caminho do rei não entra?",
        ref: "Números 21",
      },
      {
        prompt:
          "Balaão vê Israel do planalto. O que um rei de Moabe teme num acampamento que ainda não atravessou o rio?",
        ref: "Números 22–24",
      },
    ],
    placeId: "cades",
    governmentSlug: "transjordania",
    geographySlug: "caminho-do-rei",
  },
  {
    slug: "o-nebo",
    order: 8,
    title: "O Nebo e a terra à vista",
    region: "Planícies de Moabe",
    reading: "Deuteronômio e Josué 1",
    epigraph:
      "Do cimo da serra, Moisés vê a terra em faixas e não atravessa. O túmulo não fica marcado.",
    epigraphRef: "Deuteronômio 34:1",
    paragraphs: [
      "Deuteronômio tem um cenário só: as planícies de Moabe, o Jordão na frente, Jericó no oásis. A geração que saiu do Egito morreu. Quem ouve são filhos e netos. Por isso o livro recomeça. Não é um diário atrasado. É um discurso de transmissão. A história do caminho, as dez palavras, o Shemá, as leis da terra que ainda não foi pisada: tudo é dito no tom de quem prepara um povo para um chão novo.",
      "A geografia entra na pregação. Deuteronômio 11 compara o Egito dos canais com a terra dos montes, que bebe a chuva do céu. As cidades de refúgio, os limites, a guerra, o rei que um dia hão de pedir — o capítulo 17 já desconfia da monarquia — são instituições para um país que o ouvinte ainda está vendo de longe. A lei, aqui, é antevisão. Foi dada no deserto para valer na serra.",
      "Moisés sobe o Nebo, na cadeia de Abarim, ao cimo de Pisga. A tradição aponta Ras es-Siyagha, com vista para o vale. O texto lista o que ele vê: Gileade, o norte até Dã, Efraim e Manassés, Judá até o mar ocidental, o Neguebe, a planície do vale de Jericó, a cidade das palmeiras. É um mapa falado. Cada nome é uma faixa, do planalto à costa. Ele vê e não atravessa.",
      "Morre ali, e o texto diz que o Senhor o sepulta e que ninguém sabe o lugar até hoje. Não há santuário de Moisés para disputar com o santuário que ainda vai ser construído na terra. Josué, filho de Num, recebe a ordem de atravessar. O governo que espera do outro lado não é um sucessor do faraó. É a lista de reis de cidades que Josué vai contar. O caminho guiado de Moisés termina na vista. O mapa, a partir daqui, é o das cidades, dos juízes e, muito depois, dos reis.",
    ],
    geographyTitle: "O que a geografia explica",
    geographyNote:
      "Do Nebo dá para entender Canaã como faixas, não como um bloco. Serra, vale, Neguebe, mar. A pregação de Deuteronômio e a vista do capítulo 34 dizem a mesma coisa em dois gêneros.",
    governmentTitle: "O governo desta cena",
    governmentNote:
      "Moisés morre sem fundar uma dinastia. Do outro lado do rio o poder são cidades-estado, cada uma com seu rei. O faraó fica para trás. A forma nova do inimigo é a muralha local, com o Egito ainda pairando sobre o Bronze.",
    questions: [
      {
        prompt:
          "Por que Deuteronômio precisa recontar a saída a uma geração que não viu o Egito?",
        ref: "Deuteronômio 1–4",
      },
      {
        prompt:
          "O que a comparação entre a horta do Nilo e a chuva da serra ensina sobre dependência?",
        ref: "Deuteronômio 11:10–12",
      },
      {
        prompt:
          "Liste as faixas que Moisés vê e diga qual corresponde a uma estrada, qual a uma serra e qual a um deserto.",
        ref: "Deuteronômio 34:1–4",
      },
      {
        prompt:
          "O que muda no mapa quando o túmulo de Moisés não pode virar santuário?",
        ref: "Deuteronômio 34:5–12",
      },
    ],
    placeId: "nebo",
    governmentSlug: "canaa",
    geographySlug: "canaa",
  },
];

export function getStation(slug: string): Station | undefined {
  return stations.find((station) => station.slug === slug);
}

export function stationNeighbors(slug: string): {
  previous?: Station;
  next?: Station;
} {
  const index = stations.findIndex((station) => station.slug === slug);
  return {
    previous: index > 0 ? stations[index - 1] : undefined,
    next: index >= 0 ? stations[index + 1] : undefined,
  };
}
