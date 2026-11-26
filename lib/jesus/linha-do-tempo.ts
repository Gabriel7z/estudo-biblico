/** Linha do tempo da vida de Jesus: anos com sinal (negativo = a.C.). Não existe ano 0. */

export type JesusLane = "jesus" | "herodianos" | "imperadores" | "prefeitos" | "sacerdotes";

export const jesusLanes: { id: JesusLane; label: string; color: string }[] = [
  { id: "jesus", label: "Jesus e João Batista", color: "#f6e3a8" },
  { id: "herodianos", label: "Herodes e filhos", color: "#8fd0b4" },
  { id: "imperadores", label: "Imperadores romanos", color: "#d9705f" },
  { id: "prefeitos", label: "Prefeitos da Judeia", color: "#e4a87a" },
  { id: "sacerdotes", label: "Sumos sacerdotes", color: "#9fc7e8" },
];

export type JesusSpan = { lane: JesusLane; name: string; start: number; end: number; note?: string; uncertain?: boolean };

export const jesusSpans: JesusSpan[] = [
  { lane: "imperadores", name: "Augusto", start: -27, end: 14, note: "Otaviano recebe o título de Augusto em 27 a.C.; morre em 19 de agosto de 14 d.C." },
  { lane: "imperadores", name: "Tibério", start: 14, end: 37, note: "O “César” dos Evangelhos durante o ministério (Lc 3:1; 20:22–25)." },
  { lane: "imperadores", name: "Calígula", start: 37, end: 41 },
  { lane: "imperadores", name: "Cláudio", start: 41, end: 54 },
  { lane: "herodianos", name: "Herodes, o Grande", start: -37, end: -4, note: "Rei da Judeia, nomeado pelo Senado em 40 a.C., no poder desde 37 a.C." },
  { lane: "herodianos", name: "Arquelau (Judeia)", start: -4, end: 6, note: "Etnarca da Judeia, Samaria e Idumeia; deposto e exilado por Augusto." },
  { lane: "herodianos", name: "Antipas (Galileia e Pereia)", start: -4, end: 39, note: "Tetrarca; matou João Batista; exilado por Calígula." },
  { lane: "herodianos", name: "Filipe (Itureia)", start: -4, end: 34, note: "Tetrarca do nordeste; fundou Cesareia de Filipe." },
  { lane: "herodianos", name: "Agripa I", start: 37, end: 44, note: "Rei do antigo território de Filipe (37), de Antipas (39/40) e de toda a Judeia (41–44); At 12." },
  { lane: "prefeitos", name: "Copônio", start: 6, end: 9 },
  { lane: "prefeitos", name: "Ambíbulo", start: 9, end: 12 },
  { lane: "prefeitos", name: "Rufo", start: 12, end: 15 },
  { lane: "prefeitos", name: "Valério Grato", start: 15, end: 26 },
  { lane: "prefeitos", name: "Pôncio Pilatos", start: 26, end: 36, note: "Prefeito da Judeia; inscrição de Cesareia: [PRAEF]ECTVS IVDA[EAE]." },
  { lane: "prefeitos", name: "Marcelo", start: 36, end: 37 },
  { lane: "prefeitos", name: "Marulo", start: 37, end: 41 },
  { lane: "sacerdotes", name: "Anás", start: 6, end: 15, note: "Nomeado por Quirino; continua influente: cinco filhos e o genro Caifás foram sumos sacerdotes." },
  { lane: "sacerdotes", name: "Ismael, Eleazar, Simão", start: 15, end: 18, note: "Três sumos sacerdotes em três anos, nomeados por Valério Grato." },
  { lane: "sacerdotes", name: "José Caifás", start: 18, end: 36 },
  { lane: "sacerdotes", name: "Jônatas, Teófilo…", start: 36, end: 44 },
  { lane: "jesus", name: "Nascimento (7–4 a.C.)", start: -7, end: -4, uncertain: true, note: "Antes da morte de Herodes." },
  { lane: "jesus", name: "Em Nazaré", start: -4, end: 28 },
  { lane: "jesus", name: "Ministério", start: 28, end: 30, note: "Cronologia com morte em 30 d.C." },
  { lane: "jesus", name: "ou ministério até 33", start: 30, end: 33, uncertain: true, note: "Cronologia com morte em 33 d.C." },
];

export type JesusTimelineEvent = { year: number; lane: JesusLane; title: string; text: string; refs?: string; episode?: string; uncertain?: boolean };

export const jesusEvents: JesusTimelineEvent[] = [
  { year: -37, lane: "herodianos", title: "Herodes toma Jerusalém", text: "Com tropas romanas de Sósio, depois de um cerco, Herodes derruba o último rei hasmoneu, Antígono.", refs: "Josefo, Antiguidades 14.465–491" },
  { year: -31, lane: "imperadores", title: "Batalha de Ácio", text: "Otaviano vence Antônio e Cleópatra. Herodes, aliado de Antônio, passa para o lado do vencedor e é confirmado rei." },
  { year: -20, lane: "herodianos", title: "Começa a reforma do Templo", text: "No 18º ano de Herodes (20/19 a.C.). O santuário fica pronto em ano e meio; as obras do conjunto seguem até 63 d.C.", refs: "Jo 2:20; Josefo, Antiguidades 15.380, 421; 20.219" },
  { year: -7, lane: "jesus", title: "Conjunção de Júpiter e Saturno", text: "Três conjunções em Peixes nesse ano: uma das explicações propostas para a estrela dos magos.", refs: "Mt 2:2", uncertain: true },
  { year: -7, lane: "jesus", title: "Anunciações a Zacarias e a Maria", text: "Nos dias de Herodes, rei da Judeia.", refs: "Lc 1:5–38", episode: "anunciacao", uncertain: true },
  { year: -6, lane: "jesus", title: "Visita a Isabel; nasce João Batista", text: "João é seis meses mais velho que Jesus.", refs: "Lc 1:36–80", episode: "visita-a-isabel", uncertain: true },
  { year: -5, lane: "jesus", title: "Nascimento em Belém", text: "Data provável entre 7 e 4 a.C.", refs: "Mt 2:1; Lc 2:1–20", episode: "nascimento-em-belem", uncertain: true },
  { year: -5, lane: "jesus", title: "Os magos e a fuga para o Egito", text: "Herodes manda matar os meninos de dois anos para baixo, o que sugere um intervalo desde o nascimento.", refs: "Mt 2", episode: "os-magos", uncertain: true },
  { year: -4, lane: "herodianos", title: "Morte de Herodes; o reino dividido", text: "Morre em Jericó, depois de um eclipse lunar (provavelmente 13 de março de 4 a.C.) e antes da Páscoa. Augusto confirma o testamento: Arquelau, Antipas e Filipe.", refs: "Mt 2:19–22; Josefo, Antiguidades 17.167, 191, 317–320", episode: "reino-de-herodes" },
  { year: -4, lane: "jesus", title: "Volta do Egito para Nazaré", text: "Por medo de Arquelau, José vai para a Galileia.", refs: "Mt 2:19–23", episode: "fuga-para-o-egito" },
  { year: 6, lane: "herodianos", title: "Arquelau deposto; recenseamento de Quirino", text: "A Judeia vira província. Quirino, legado da Síria, faz o censo; Judas, o Galileu, lidera uma revolta contra o tributo (At 5:37). A relação com o censo de Lucas 2:2 é discutida.", refs: "Josefo, Antiguidades 17.342–18.10" },
  { year: 8, lane: "jesus", title: "O menino de doze anos no Templo", text: "Se nasceu por volta de 5 a.C., Jesus teria doze anos por volta de 7–8 d.C.", refs: "Lc 2:41–52", episode: "menino-no-templo", uncertain: true },
  { year: 14, lane: "imperadores", title: "Morte de Augusto; Tibério imperador", text: "Tibério tinha poderes de corregente desde 12/13 d.C., o que muda a contagem do “15º ano” de Lucas para alguns." },
  { year: 18, lane: "sacerdotes", title: "Caifás sumo sacerdote", text: "Nomeado por Valério Grato; fica até 36, o mais longo do período." },
  { year: 19, lane: "herodianos", title: "Fundação de Tiberíades", text: "Antipas funda sua nova capital à beira do lago, em honra de Tibério (c. 19–20 d.C.).", refs: "Jo 6:23; Josefo, Antiguidades 18.36–38" },
  { year: 26, lane: "prefeitos", title: "Pilatos chega à Judeia", text: "Logo provoca os judeus levando a Jerusalém estandartes com a imagem do imperador.", refs: "Josefo, Antiguidades 18.55–59" },
  { year: 28, lane: "jesus", title: "João Batista e o batismo de Jesus", text: "O 15º ano de Tibério (Lc 3:1) cai em 28/29 d.C. contando de 14; Jesus tinha “cerca de trinta anos”.", refs: "Lc 3:1–23", episode: "batismo-no-jordao" },
  { year: 28, lane: "jesus", title: "A primeira Páscoa", text: "“Em quarenta e seis anos foi edificado este santuário”: 20/19 a.C. + 46 = 27/28 d.C.", refs: "Jo 2:13–20", episode: "pascoa-e-nicodemos" },
  { year: 29, lane: "jesus", title: "Ministério na Galileia; morte de João Batista", text: "João morre em Maqueronte por ordem de Antipas.", refs: "Mc 6:14–29", episode: "ministerio-na-galileia" },
  { year: 30, lane: "jesus", title: "Crucificação (hipótese 1: 7 de abril de 30)", text: "Sexta-feira, 14 de nisã, segundo o cálculo astronômico mais aceito para esse ano.", refs: "Jo 19:14, 31", episode: "crucificacao-e-sepultamento", uncertain: true },
  { year: 33, lane: "jesus", title: "Crucificação (hipótese 2: 3 de abril de 33)", text: "A outra data possível, preferida por quem conta três anos e meio de ministério a partir de 29.", refs: "Jo 19:14, 31", uncertain: true },
  { year: 34, lane: "herodianos", title: "Morte de Filipe", text: "Seu território é anexado à Síria e depois dado a Agripa I.", refs: "Josefo, Antiguidades 18.106–108" },
  { year: 36, lane: "prefeitos", title: "Pilatos removido; Caifás deposto", text: "Depois de um massacre de samaritanos no Gerizim, o legado Vitélio manda Pilatos a Roma e depõe Caifás.", refs: "Josefo, Antiguidades 18.85–95" },
  { year: 36, lane: "herodianos", title: "Aretas derrota Antipas", text: "O povo viu na derrota um castigo pela morte de João Batista.", refs: "Josefo, Antiguidades 18.113–119" },
  { year: 37, lane: "imperadores", title: "Morte de Tibério", text: "Calígula imperador; Agripa I recebe a tetrarquia de Filipe." },
  { year: 39, lane: "herodianos", title: "Antipas exilado", text: "Acusado por Agripa, Antipas é exilado por Calígula na Gália, com Herodias.", refs: "Josefo, Antiguidades 18.240–255" },
  { year: 44, lane: "herodianos", title: "Morte de Agripa I em Cesareia", text: "Lucas e Josefo contam a mesma morte súbita no teatro.", refs: "At 12:20–23; Josefo, Antiguidades 19.343–350" },
];

export const jesusDebates: { title: string; text: string }[] = [
  {
    title: "Quando Jesus nasceu?",
    text: "Mateus e Lucas o põem nos dias de Herodes, que morreu em 4 a.C. (alguns defendem 1 a.C.). Por isso a data mais aceita fica entre 7 e 4 a.C. O “ano 1” vem de um cálculo de Dionísio, o Exíguo, no século 6; o 25 de dezembro é uma data litúrgica do século 4, não histórica.",
  },
  {
    title: "O recenseamento de Quirino",
    text: "Lucas 2:2 liga o nascimento a um censo “quando Quirino governava a Síria”. Josefo põe o censo de Quirino em 6 d.C. Há quem leia “antes de Quirino”, quem proponha um censo anterior sob Herodes, e quem veja um erro de data. Nenhuma solução é consenso.",
  },
  {
    title: "O 15º ano de Tibério",
    text: "Contando do início do reinado (agosto de 14 d.C.), dá 28/29 d.C. Contando de uma corregência com Augusto (12 d.C.), dá 26/27. Junto com Jo 2:20 (46 anos de obras do Templo), a maioria situa o início do ministério entre 27 e 29.",
  },
  {
    title: "Quanto durou o ministério?",
    text: "Mateus, Marcos e Lucas cabem em um ano e pouco; João cita três Páscoas (2:13; 6:4; 11:55) e talvez uma quarta festa (5:1), o que dá dois a três anos e meio.",
  },
  {
    title: "Morte em 30 ou em 33 d.C.?",
    text: "Os Evangelhos dão: sexta-feira, Páscoa, sob Pilatos (26–36) e Caifás (18–36). Pelos cálculos da lua nova, o 14 de nisã caiu numa sexta em 7 de abril de 30 e em 3 de abril de 33. As duas datas têm defensores sérios.",
  },
  {
    title: "A Última Ceia foi a refeição pascal?",
    text: "Para Mateus, Marcos e Lucas, sim; para João, Jesus morreu na véspera, quando os cordeiros eram imolados. Propostas de solução incluem calendários diferentes em uso entre os judeus ou uma ceia de despedida com sentido pascal.",
  },
];

export const JESUS_START = -40;
export const JESUS_END = 45;

/** Posição contínua sem ano 0: 1 a.C. = 0, 1 d.C. = 1. */
export function astro(year: number): number {
  return year < 0 ? year + 1 : year;
}

export function yearAnchor(year: number): string {
  return year < 0 ? `ano-${-year}-ac` : `ano-${year}-dc`;
}
