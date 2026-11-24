import type { BookSection } from "@/lib/types";

export const bookSections: BookSection[] = [
  {
    id: "tora",
    title: "A Torá",
    intro:
      "Os cinco livros de Moisés. São o chão de todo o resto: promessa, saída, lei, deserto e discursos à beira da terra.",
    books: [
      {
        name: "Gênesis",
        era: "patriarcas",
        line: "Da criação ao clã. O mundo se estreita até uma família que caminha de Ur ao Egito.",
        ground: "Ur, Harã, Siquém, Hebrom, Berseba e o delta.",
      },
      {
        name: "Êxodo",
        era: "exodo",
        line: "Da escravidão no delta à tenda armada no deserto.",
        ground: "Ramessés, o mar, o Sinai. O faraó não é nomeado.",
      },
      {
        name: "Levítico",
        era: "exodo",
        line: "O acampamento parado. Santo, sacerdócio, tempo e mesa, ao pé do monte.",
        ground: "Não há marcha. O lugar é a tenda no meio das tribos.",
      },
      {
        name: "Números",
        era: "exodo",
        line: "Do Sinai às planícies de Moabe, com a recusa da terra no meio.",
        ground: "Cades, Edom, o caminho do rei, Hesbom, o vale diante de Jericó.",
      },
      {
        name: "Deuteronômio",
        era: "exodo",
        line: "Discursos de Moisés a uma geração que não viu o Egito, e a sua morte no Nebo.",
        ground: "Planícies de Moabe, com a terra à vista.",
      },
    ],
  },
  {
    id: "historicos",
    title: "Históricos",
    intro:
      "Da entrada na terra ao retorno. Na ordem da Bíblia hebraica, vários destes livros estão entre os Profetas Anteriores ou entre os Escritos.",
    books: [
      {
        name: "Josué",
        era: "juizes",
        line: "A entrada na terra como campanha contra reis de cidades.",
        ground: "Jericó, a serra, Hazor ao norte, trinta e um reis.",
      },
      {
        name: "Juízes",
        era: "juizes",
        line: "Libertadores locais, sem rei, entre a montanha e a planície filisteia.",
        ground: "Sem capital. A frase do livro é uma forma de governo.",
      },
      {
        name: "Rute",
        era: "juizes",
        line: "Uma família de Belém, no tempo dos juízes, e uma moabita na genealogia de Davi.",
        ground: "Belém de Judá e a memória de Moabe.",
      },
      {
        name: "1 Samuel",
        era: "monarquia",
        line: "De Siló e do pedido de um rei até a morte de Saul.",
        ground: "Filístia na costa, a serra, e o fim da liderança solta.",
      },
      {
        name: "2 Samuel",
        era: "monarquia",
        line: "Davi, a tomada de Jerusalém e o preço da casa real.",
        ground: "Hebrom primeiro, Jerusalém depois.",
      },
      {
        name: "1 Reis",
        era: "dividido",
        line: "Salomão, o templo, o cisma, Elias e os reis até o século IX.",
        ground: "Jerusalém, Siquém, Samaria, Damasco, Tiro.",
      },
      {
        name: "2 Reis",
        era: "exilio",
        line: "De Elias e Eliseu às duas quedas: Samaria em 722 e Jerusalém em 586.",
        ground: "Assíria e Babilônia entram e não saem mais.",
      },
      {
        name: "1 Crônicas",
        era: "monarquia",
        line: "A mesma memória real, contada para quem precisa de genealogia e de Davi.",
        ground: "Olha para trás a partir de quem já voltou do exílio.",
      },
      {
        name: "2 Crônicas",
        era: "persia",
        line: "Judá, o templo e, no fecho, o edito de Ciro.",
        ground: "O norte quase some. O livro termina na Pérsia.",
      },
      {
        name: "Esdras",
        era: "persia",
        line: "O retorno, o altar e a reconstrução do templo sob a Pérsia.",
        ground: "Yehud, pequena, em volta de Jerusalém.",
      },
      {
        name: "Neemias",
        era: "persia",
        line: "O muro, a leitura da lei e a cidade que cabe num governador.",
        ground: "Jerusalém sem rei, com censo e com porta.",
      },
      {
        name: "Ester",
        era: "persia",
        line: "Judeus na diáspora, na corte persa, sem mencionar Jerusalém.",
        ground: "O império visto de dentro, longe de Yehud.",
      },
    ],
  },
  {
    id: "poesia",
    title: "Poesia e sabedoria",
    intro:
      "Não contam uma campanha. Cantam, argumentam e ensinam dentro do mundo que os outros livros mapearam: Sião, a casa, a corte, o exílio, o deserto do leste.",
    books: [
      {
        name: "Jó",
        era: "patriarcas",
        line: "Um homem do leste, fora da corte e fora do templo, e a pergunta pelo sofrimento.",
        ground: "A terra de Uz não é uma capital. O cenário é o deserto habitado.",
      },
      {
        name: "Salmos",
        era: "exilio",
        line: "Oração de Sião, do rei, do peregrino e do deportado.",
        ground: "Jerusalém está no centro de muitos hinos, mesmo quando o cantor está longe.",
      },
      {
        name: "Provérbios",
        era: "monarquia",
        line: "Sabedoria de casa e de corte, associada a Salomão e a outros mestres.",
        ground: "A cidade e o campo de um reino já formado.",
      },
      {
        name: "Eclesiastes",
        era: "monarquia",
        line: "A voz de quem viu obra, poder e limite debaixo do sol.",
        ground: "Tradicionalmente Jerusalém, sem campanha e sem data fechada.",
      },
      {
        name: "Cânticos",
        era: "monarquia",
        line: "Amor em linguagem de vinha, pastor e cidade.",
        ground: "A geografia de Israel como jardim, não como fronteira de guerra.",
      },
    ],
  },
  {
    id: "profetas",
    title: "Profetas",
    intro:
      "Vozes datadas por reis e por impérios. O profeta quase sempre fala de uma cidade concreta sob uma ameaça concreta.",
    books: [
      {
        name: "Isaías",
        era: "dividido",
        line: "Judá diante da Assíria e, nos capítulos finais, um horizonte de retorno.",
        ground: "Jerusalém cercada, e um mapa que se abre além do cerco.",
      },
      {
        name: "Jeremias",
        era: "exilio",
        line: "Os últimos reis de Judá, a queda e o grupo que foge ao Egito.",
        ground: "Jerusalém, Mispá, e o Egito como refúgio amargo.",
      },
      {
        name: "Lamentações",
        era: "exilio",
        line: "Cinco poemas diante da cidade destruída.",
        ground: "Sião vazia. O mapa inteiro cabe numa rua em ruína.",
      },
      {
        name: "Ezequiel",
        era: "exilio",
        line: "Visões junto ao rio Quebar, na Babilônia, e a promessa de um templo.",
        ground: "O profeta está no exílio, não nas cinzas do monte.",
      },
      {
        name: "Daniel",
        era: "exilio",
        line: "A corte babilônica e a persa, e os impérios vistos como estátuas e animais.",
        ground: "Babilônia primeiro, Pérsia depois. Jerusalém fica fora de cena e no centro da oração.",
      },
      {
        name: "Oseias",
        era: "dividido",
        line: "O amor infiel como figura do reino do norte, às vésperas da queda.",
        ground: "Samaria e o culto de Betel e Dã.",
      },
      {
        name: "Joel",
        era: "dividido",
        line: "Gafanhoto, dia do Senhor e o sopro sobre toda carne.",
        ground: "Sião. A data do livro é das mais abertas entre os profetas.",
      },
      {
        name: "Amós",
        era: "dividido",
        line: "Um homem de Judá sentado na porta do norte, contra o luxo de Samaria.",
        ground: "Israel do norte no século VIII, com a Assíria já no horizonte.",
      },
      {
        name: "Obadias",
        era: "exilio",
        line: "O mais breve dos profetas, voltado contra Edom.",
        ground: "A serra de Edom e a queda de Jerusalém como vizinhança traída.",
      },
      {
        name: "Jonas",
        era: "dividido",
        line: "Um profeta mandado à capital do inimigo.",
        ground: "Nínive, não Jerusalém.",
      },
      {
        name: "Miqueias",
        era: "dividido",
        line: "Julgamento sobre Samaria e sobre Jerusalém, e uma palavra sobre Belém.",
        ground: "Os dois reinos ainda de pé, no tempo de Ezequias.",
      },
      {
        name: "Naum",
        era: "dividido",
        line: "A queda de Nínive como alívio e como aviso.",
        ground: "612 a.C. no horizonte. A capital assíria deixa o mapa.",
      },
      {
        name: "Habacuque",
        era: "exilio",
        line: "A pergunta pela violência, com a Babilônia subindo.",
        ground: "Judá ainda em pé, e o império novo já a caminho.",
      },
      {
        name: "Sofonias",
        era: "dividido",
        line: "Dia do Senhor sobre Judá, nos dias de Josias.",
        ground: "Jerusalém antes da reforma e antes da queda.",
      },
      {
        name: "Ageu",
        era: "persia",
        line: "Quatro discursos curtos para retomar a obra do templo.",
        ground: "Jerusalém por volta de 520 a.C., sob Dario.",
      },
      {
        name: "Zacarias",
        era: "persia",
        line: "Visões da reconstrução e, na segunda parte, um horizonte mais largo.",
        ground: "Yehud pequena, com o templo no centro da esperança.",
      },
      {
        name: "Malaquias",
        era: "persia",
        line: "O último tom do cânon hebraico: culto cansado, espera de um mensageiro.",
        ground: "A província persa, não o reino de Salomão.",
      },
    ],
  },
  {
    id: "deuterocanonicos",
    title: "Deuterocanônicos",
    intro:
      "Estão na Bíblia católica e na ortodoxa. Não entram no cânon hebraico nem no protestante. Vários se passam já no período grego, depois do mapa persa deste atlas.",
    books: [
      {
        name: "Tobias",
        era: "dividido",
        line: "Uma família deportada, na diáspora do norte.",
        ground: "Nínive e a viagem até a Média. Livro da Bíblia católica.",
      },
      {
        name: "Judite",
        era: "dividido",
        line: "Um relato de resistência com geografia e reis de propósito misturados.",
        ground: "A Judeia sob cerco. A história não fecha com a cronologia dos impérios.",
      },
      {
        name: "Sabedoria",
        era: "persia",
        line: "Sabedoria escrita em grego, em conversa com o Egito e com a filosofia.",
        ground: "Alexandria está no horizonte, já fora do século persa clássico.",
      },
      {
        name: "Eclesiástico",
        era: "persia",
        line: "Jesus Ben Sira ensina em Jerusalém, no início do século II a.C.",
        ground: "A cidade do segundo templo, antes da revolta dos Macabeus.",
      },
      {
        name: "Baruque",
        era: "exilio",
        line: "Voz associada ao secretário de Jeremias, lida no exílio.",
        ground: "Babilônia e a esperança de retorno.",
      },
      {
        name: "1 Macabeus",
        era: "persia",
        line: "A revolta contra o domínio grego selêucida, de 175 a 134 a.C.",
        ground: "Jerusalém, o templo profanado e a serra da Judeia. Já é outro império.",
      },
      {
        name: "2 Macabeus",
        era: "persia",
        line: "Outra narrativa da mesma crise, mais litúrgica, até a morte de Nicanor.",
        ground: "O templo no centro. O mapa político é helenístico.",
      },
    ],
  },
];
