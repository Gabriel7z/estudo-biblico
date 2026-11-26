import type { Gospel } from "@/lib/jesus/types";

export type GospelInfo = {
  gospel: Gospel;
  slug: string;
  title: string;
  author: string;
  date: string;
  traits: string[];
  only: string;
};

/** Quatro retratos de uma mesma vida. Datas e autoria seguem o consenso e a tradição, com os debates indicados. */
export const gospelInfo: GospelInfo[] = [
  {
    gospel: "Mateus",
    slug: "mateus",
    title: "Evangelho segundo Mateus",
    author: "A tradição antiga (Pápias, Ireneu) o atribui ao apóstolo Mateus, o publicano; o texto é anônimo.",
    date: "Geralmente datado entre 70 e 90 d.C.; alguns defendem antes de 70.",
    traits: [
      "Escrito para leitores judeus que creram em Jesus: cita o Antigo Testamento mais de 60 vezes, muitas com a fórmula “para que se cumprisse”.",
      "Organiza o ensino em cinco grandes discursos, a começar pelo Sermão da Montanha (Mt 5–7).",
      "Jesus é o Messias, filho de Davi, e o novo Moisés que interpreta a Lei.",
    ],
    only: "Os magos, a fuga para o Egito, a matança dos inocentes, a moeda na boca do peixe, a morte de Judas, os guardas no túmulo, a Grande Comissão no monte da Galileia.",
  },
  {
    gospel: "Marcos",
    slug: "marcos",
    title: "Evangelho segundo Marcos",
    author: "Segundo Pápias (c. 120), Marcos registrou a pregação de Pedro em Roma. Costuma ser identificado com João Marcos de Atos.",
    date: "O mais antigo dos quatro para a maioria dos estudiosos: c. 65–70 d.C.",
    traits: [
      "Curto e rápido: a palavra “logo” (euthys) aparece dezenas de vezes.",
      "Guarda palavras de Jesus em aramaico: talitá cumi, efatá, Abba, Eloí, Eloí, lamá sabactâni.",
      "Quase metade do livro é a última semana em Jerusalém. Os manuscritos mais antigos terminam em 16:8, com o túmulo vazio; o “final longo” (16:9–20) foi acrescentado depois.",
    ],
    only: "A cura do surdo-mudo na Decápolis, o cego de Betsaida curado em duas etapas, o jovem que fugiu nu no Getsêmani.",
  },
  {
    gospel: "Lucas",
    slug: "lucas",
    title: "Evangelho segundo Lucas",
    author: "Atribuído desde o século 2 a Lucas, médico e companheiro de Paulo (Cl 4:14). É a primeira parte de uma obra em dois volumes, com Atos.",
    date: "Geralmente c. 80–90 d.C.; alguns o põem antes de 64.",
    traits: [
      "Diz ter investigado tudo “desde o princípio” e escrito “por ordem” a Teófilo (Lc 1:1–4).",
      "Data os acontecimentos pelos governantes romanos e herodianos (Lc 2:1–2; 3:1–2).",
      "Dá atenção especial aos pobres, às mulheres, aos samaritanos e à oração. Metade do livro é uma longa viagem para Jerusalém (Lc 9:51–19:28).",
    ],
    only: "A anunciação a Zacarias e a Maria, a visita a Isabel, os pastores, Simeão e Ana, o menino no Templo, o filho da viúva de Naim, Zaqueu, Jesus diante de Herodes Antipas, o caminho de Emaús, a ascensão perto de Betânia.",
  },
  {
    gospel: "João",
    slug: "joao",
    title: "Evangelho segundo João",
    author: "A tradição (Ireneu) o atribui ao apóstolo João, “o discípulo que Jesus amava”; a autoria é muito discutida.",
    date: "Geralmente c. 90–100 d.C.",
    traits: [
      "Conta sete “sinais” e os grandes “Eu sou”: o pão da vida, a luz do mundo, o bom pastor, a ressurreição e a vida, o caminho, a videira.",
      "Mostra Jesus subindo várias vezes a Jerusalém para as festas, com três Páscoas: é daqui que vem a duração de dois a três anos do ministério.",
      "Tem detalhes precisos da Judeia e de Jerusalém confirmados pela arqueologia, como os tanques de Betesda e de Siloé.",
    ],
    only: "As bodas de Caná, Nicodemos, a samaritana, o cego de nascença em Siloé, Lázaro, o lava-pés, o discurso de despedida, Tomé, a pesca dos 153 peixes.",
  },
];

export function getGospel(slug: string): GospelInfo | undefined {
  return gospelInfo.find((item) => item.slug === slug);
}
