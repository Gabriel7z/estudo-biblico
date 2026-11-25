/** Planta esquemática do Templo de Salomão segundo 1 Reis 6–7. Unidades do SVG = côvados. Leste à direita. */

const GOLD = "#e4c78a";
const INK = "#090d14";

type Mark = { n: number; x: number; y: number };

function Badge({ n, x, y }: Mark) {
  return (
    <g>
      <circle cx={x} cy={y} r={2.1} fill={GOLD} stroke={INK} strokeWidth={0.4} />
      <text x={x} y={y + 0.75} textAnchor="middle" fontSize={2.3} fontWeight={700} fill={INK} fontFamily="Inter, sans-serif">
        {n}
      </text>
    </g>
  );
}

export const templeLegend: { n: number; name: string; text: string; ref: string }[] = [
  { n: 1, name: "Átrio interior", text: "Pátio dos sacerdotes, com muro de três fileiras de pedra lavrada e uma de vigas de cedro.", ref: "1 Rs 6:36; 7:12" },
  { n: 2, name: "Altar de bronze", text: "Altar dos holocaustos diante da casa. Reis não dá as medidas; 2 Crônicas fala de 20 × 20 × 10 côvados.", ref: "1 Rs 8:64; 2 Cr 4:1" },
  { n: 3, name: "Jaquim", text: "Coluna de bronze do lado sul (direito). 18 côvados de altura, 12 de circunferência, capitel de 5 com romãs e lírios. Nome: “ele estabelece”.", ref: "1 Rs 7:15–21" },
  { n: 4, name: "Boaz", text: "Coluna gêmea, do lado norte. Nome: “nele há força”. Se ficavam soltas ou sustentavam o pórtico é debatido.", ref: "1 Rs 7:21" },
  { n: 5, name: "Mar de fundição", text: "Grande bacia de bronze: 10 côvados de diâmetro, 5 de altura, 30 de circunferência, sobre 12 bois virados para os quatro pontos. Fica do lado sul, para o oriente.", ref: "1 Rs 7:23–26, 39" },
  { n: 6, name: "Dez suportes com pias", text: "Carrinhos de bronze com rodas, 4 × 4 × 3 côvados, cada um com uma pia; cinco ao sul e cinco ao norte da casa.", ref: "1 Rs 7:27–39" },
  { n: 7, name: "Pórtico (ulam)", text: "20 côvados de largura, na frente da casa, por 10 de fundo.", ref: "1 Rs 6:3" },
  { n: 8, name: "Santo lugar (hekal)", text: "A sala principal: 40 côvados de comprimento, revestida de cedro e ouro, com janelas altas.", ref: "1 Rs 6:4, 17–18" },
  { n: 9, name: "Altar do incenso", text: "Altar de cedro revestido de ouro, diante do santo dos santos.", ref: "1 Rs 6:20–22; 7:48" },
  { n: 10, name: "Mesa dos pães", text: "Mesa de ouro para os pães da presença.", ref: "1 Rs 7:48" },
  { n: 11, name: "Dez candelabros", text: "De ouro puro, cinco à direita e cinco à esquerda, diante do santuário.", ref: "1 Rs 7:49" },
  { n: 12, name: "Santo dos Santos (debir)", text: "Cubo de 20 × 20 × 20 côvados, todo revestido de ouro, com portas de oliveira.", ref: "1 Rs 6:16, 19–20, 31–32" },
  { n: 13, name: "Querubins e arca", text: "Dois querubins de oliveira dourada, 10 côvados de altura; cada asa mede 5, e as quatro asas cobrem os 20 côvados de parede a parede. A arca fica debaixo delas.", ref: "1 Rs 6:23–28; 8:6–7" },
  { n: 14, name: "Câmaras laterais", text: "Três andares em volta da casa, com 5, 6 e 7 côvados de largura, apoiados em recuos da parede.", ref: "1 Rs 6:5–10" },
];

export function TemplePlan() {
  const lamps = [30, 35, 40, 45, 50];
  const stands = [18, 27, 36, 45, 54];
  return (
    <figure className="folio overflow-hidden p-3 md:p-5">
      <div className="overflow-x-auto">
      <svg
        viewBox="-16 -22 142 72"
        role="img"
        aria-labelledby="templo-titulo templo-desc"
        className="h-auto w-full min-w-[680px]"
      >
        <title id="templo-titulo">Planta do Templo de Salomão</title>
        <desc id="templo-desc">
          Planta esquemática vista de cima, com a entrada a leste, à direita: átrio, altar de bronze, colunas Jaquim e Boaz, mar de fundição, pias, pórtico,
          santo lugar, santo dos santos com os querubins, e câmaras laterais. Medidas em côvados.
        </desc>
        <defs>
          <pattern id="grade" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0H0V5" fill="none" stroke={GOLD} strokeOpacity={0.07} strokeWidth={0.15} />
          </pattern>
          <linearGradient id="ouro" x1="0" x2="1">
            <stop offset="0" stopColor={GOLD} stopOpacity={0.35} />
            <stop offset="1" stopColor={GOLD} stopOpacity={0.18} />
          </linearGradient>
        </defs>

        {/* átrio */}
        <rect x={-12} y={-15} width={130} height={60} rx={1} fill="url(#grade)" stroke={GOLD} strokeOpacity={0.5} strokeWidth={0.4} strokeDasharray="1.5 1" />
        <Badge n={1} x={-8} y={-11} />

        {/* câmaras laterais */}
        <path d="M65 0H0V30H65V25H5V5H65Z" fill={GOLD} fillOpacity={0.08} stroke={GOLD} strokeOpacity={0.55} strokeWidth={0.3} />
        {[10, 20, 30, 40, 50, 60].map((x) => (
          <g key={x} stroke={GOLD} strokeOpacity={0.3} strokeWidth={0.2}>
            <line x1={x} y1={0} x2={x} y2={5} />
            <line x1={x} y1={25} x2={x} y2={30} />
          </g>
        ))}
        <Badge n={14} x={2.5} y={-2.5} />

        {/* debir */}
        <rect x={5} y={5} width={20} height={20} fill="url(#ouro)" stroke={GOLD} strokeWidth={0.5} />
        {/* asas dos querubins: parede a parede */}
        <path d="M5 15 Q10 11 15 15 Q20 11 25 15" fill="none" stroke={GOLD} strokeWidth={0.6} />
        <path d="M5 15 Q10 19 15 15" fill="none" stroke={GOLD} strokeOpacity={0.4} strokeWidth={0.3} />
        <path d="M15 15 Q20 19 25 15" fill="none" stroke={GOLD} strokeOpacity={0.4} strokeWidth={0.3} />
        <circle cx={10} cy={15} r={1.2} fill={GOLD} />
        <circle cx={20} cy={15} r={1.2} fill={GOLD} />
        <rect x={13.75} y={14.1} width={2.5} height={1.8} fill={INK} stroke={GOLD} strokeWidth={0.3} />
        <Badge n={12} x={8.5} y={8.5} />
        <Badge n={13} x={15} y={21} />

        {/* parede/portas entre debir e hekal */}
        <line x1={25} y1={5} x2={25} y2={12.5} stroke={GOLD} strokeWidth={0.8} />
        <line x1={25} y1={17.5} x2={25} y2={25} stroke={GOLD} strokeWidth={0.8} />

        {/* hekal */}
        <rect x={25} y={5} width={40} height={20} fill={GOLD} fillOpacity={0.1} stroke={GOLD} strokeWidth={0.5} />
        <rect x={27} y={14} width={2} height={2} fill={GOLD} />
        <Badge n={9} x={28} y={20.5} />
        <rect x={33} y={13.5} width={4} height={3} fill="none" stroke={GOLD} strokeWidth={0.4} />
        <Badge n={10} x={35} y={20.5} />
        {lamps.map((x) => (
          <g key={x} fill={GOLD}>
            <circle cx={x} cy={7.5} r={0.7} />
            <circle cx={x} cy={22.5} r={0.7} />
          </g>
        ))}
        <Badge n={11} x={53.5} y={10.5} />
        <Badge n={8} x={58} y={17} />

        {/* pórtico */}
        <rect x={65} y={5} width={10} height={20} fill={GOLD} fillOpacity={0.05} stroke={GOLD} strokeWidth={0.5} />
        <line x1={65} y1={12} x2={65} y2={18} stroke={INK} strokeWidth={0.9} />
        <line x1={75} y1={11} x2={75} y2={19} stroke={INK} strokeWidth={1} />
        <Badge n={7} x={70} y={9} />

        {/* colunas: Boaz ao norte, Jaquim ao sul */}
        <circle cx={77.5} cy={8.5} r={1.9} fill={GOLD} fillOpacity={0.85} stroke={INK} strokeWidth={0.3} />
        <circle cx={77.5} cy={21.5} r={1.9} fill={GOLD} fillOpacity={0.85} stroke={INK} strokeWidth={0.3} />
        <Badge n={4} x={82} y={5} />
        <Badge n={3} x={82} y={25} />

        {/* altar de bronze (2 Cr 4:1) */}
        <rect x={88} y={5} width={20} height={20} fill="#b9773d" fillOpacity={0.22} stroke="#d09a5f" strokeWidth={0.5} />
        <path d="M88 5L108 25M108 5L88 25" stroke="#d09a5f" strokeOpacity={0.35} strokeWidth={0.25} />
        <Badge n={2} x={98} y={15} />

        {/* mar de fundição: sul, para o oriente */}
        <circle cx={76} cy={37} r={5} fill="#b9773d" fillOpacity={0.2} stroke="#d09a5f" strokeWidth={0.5} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={76 + Math.cos(a) * 5.9} cy={37 + Math.sin(a) * 5.9} r={0.45} fill="#d09a5f" />;
        })}
        <Badge n={5} x={84} y={37} />

        {/* dez suportes */}
        {stands.map((x) => (
          <g key={x} fill="#d09a5f" fillOpacity={0.5} stroke="#d09a5f" strokeWidth={0.2}>
            <rect x={x} y={-8} width={4} height={4} />
            <rect x={x} y={34} width={4} height={4} />
          </g>
        ))}
        <Badge n={6} x={61} y={36} />

        {/* cotas */}
        <g stroke={GOLD} strokeOpacity={0.7} strokeWidth={0.2} fill={GOLD} fontFamily="Inter, sans-serif" fontSize={1.9}>
          <line x1={5} y1={-12} x2={65} y2={-12} />
          <line x1={5} y1={-13} x2={5} y2={-11} />
          <line x1={25} y1={-13} x2={25} y2={-11} />
          <line x1={65} y1={-13} x2={65} y2={-11} />
          <line x1={75} y1={-13} x2={75} y2={-11} />
          <line x1={65} y1={-12} x2={75} y2={-12} />
          <text x={15} y={-13.6} textAnchor="middle" stroke="none">20</text>
          <text x={45} y={-13.6} textAnchor="middle" stroke="none">40 côvados</text>
          <text x={70} y={-13.6} textAnchor="middle" stroke="none">10</text>
          <line x1={-4} y1={5} x2={-4} y2={25} />
          <line x1={-5} y1={5} x2={-3} y2={5} />
          <line x1={-5} y1={25} x2={-3} y2={25} />
          <text x={-5.5} y={15.6} textAnchor="end" stroke="none">20</text>
        </g>

        {/* rosa dos ventos */}
        <g fontFamily="Inter, sans-serif" fontSize={2} fill={GOLD} fillOpacity={0.8}>
          <text x={112} y={-9} textAnchor="middle">N</text>
          <path d="M112 -8L111 -4H113Z" fill={GOLD} />
          <text x={112} y={42} textAnchor="middle">LESTE →</text>
          <text x={-11} y={42}>OESTE</text>
        </g>
      </svg>
      </div>
      <p className="mt-2 px-2 font-sans text-xs text-muted-foreground md:hidden">Arraste para o lado para ver a planta inteira.</p>
      <figcaption className="mt-3 px-2 font-sans text-xs leading-relaxed text-muted-foreground">
        Esquema sem escala exata das paredes. Medidas internas segundo 1 Reis 6–7, em côvados (cerca de 45 cm no côvado comum ou 52 cm no
        côvado real; a casa teria uns 27–31 m de comprimento). O mar e os suportes estão dispostos de forma ilustrativa.
      </figcaption>
    </figure>
  );
}
