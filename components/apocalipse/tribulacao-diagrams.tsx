import type { ViewId } from "@/lib/apocalipse-tribulacao/types";

const GOLD = "#e4c78a";
const INK = "#efe6d6";
const MUTED = "#9aa3b2";
const WRATH = "#c2573f";

type Mark = { x1: number; x2: number; label: string };

const RAPTURE: Record<ViewId, { x: number; label: string }> = {
  pre: { x: 92, label: "Arrebatamento" },
  meio: { x: 177, label: "Arrebatamento" },
  "pre-ira": { x: 236, label: "Arrebatamento" },
  pos: { x: 262, label: "Arrebatamento = volta" },
};

const WRATH_MARK: Record<ViewId, Mark | null> = {
  pre: { x1: 92, x2: 262, label: "ira de Deus: toda a semana" },
  meio: { x1: 177, x2: 262, label: "ira de Deus: 2ª metade" },
  "pre-ira": { x1: 236, x2: 262, label: "ira: Dia do Senhor" },
  pos: { x1: 228, x2: 262, label: "ira sobre o mundo; igreja guardada" },
};

/** Linha do tempo de uma posição (pré, meio, pré-ira, pós). Só SVG: funciona sem JavaScript. */
export function ViewTimeline({ view, title }: { view: ViewId; title: string }) {
  const r = RAPTURE[view];
  const w = WRATH_MARK[view];
  const labelAnchor = r.x > 230 ? "end" : r.x < 110 ? "start" : "middle";
  const labelX = labelAnchor === "end" ? r.x + 8 : labelAnchor === "start" ? r.x - 8 : r.x;
  return (
    <svg
      viewBox="0 0 340 150"
      role="img"
      aria-label={`Linha do tempo: ${title}`}
      className="h-auto w-full"
      fontFamily="var(--font-outfit), sans-serif"
    >
      <title>{`Linha do tempo: ${title}`}</title>
      {/* era da igreja */}
      <line x1="6" y1="76" x2="92" y2="76" stroke={MUTED} strokeWidth="2" strokeDasharray="4 3" />
      <text x="48" y="97" textAnchor="middle" fontSize="11.5" fill={MUTED}>
        era da igreja
      </text>
      {/* 70ª semana */}
      <rect x="92" y="60" width="85" height="32" fill="#1a2232" stroke={GOLD} strokeOpacity="0.5" />
      <rect x="177" y="60" width="85" height="32" fill="#2a1f22" stroke={GOLD} strokeOpacity="0.5" />
      <text x="134.5" y="74" textAnchor="middle" fontSize="11" fill={INK}>
        1ª metade
      </text>
      <text x="134.5" y="87" textAnchor="middle" fontSize="11" fill={MUTED}>
        3½ anos
      </text>
      <text x="219.5" y="74" textAnchor="middle" fontSize="11" fill={INK}>
        2ª metade
      </text>
      <text x="219.5" y="87" textAnchor="middle" fontSize="11" fill={MUTED}>
        3½ anos
      </text>
      {/* milênio */}
      <rect x="262" y="60" width="72" height="32" fill={GOLD} fillOpacity="0.14" stroke={GOLD} strokeOpacity="0.5" />
      <text x="298" y="80" textAnchor="middle" fontSize="11" fill={GOLD}>
        milênio
      </text>
      {/* ira */}
      {w ? (
        <g>
          <line x1={w.x1 + 1} y1="100" x2={w.x2 - 1} y2="100" stroke={WRATH} strokeWidth="4" />
          <text x={w.x2 - 5} y="115" textAnchor="end" fontSize="11" fill={WRATH}>
            {w.label}
          </text>
        </g>
      ) : null}
      {/* semana */}
      <text x="92" y="131" textAnchor="start" fontSize="11" fill={MUTED}>
        70ª semana de Daniel: 7 anos
      </text>
      {/* volta visível */}
      <line x1="262" y1="50" x2="262" y2="142" stroke={GOLD} strokeWidth="2" />
      <text x="267" y="146" textAnchor="start" fontSize="11.5" fill={GOLD}>
        volta visível
      </text>
      {/* arrebatamento */}
      <line x1={r.x} y1="58" x2={r.x} y2="26" stroke={INK} strokeWidth="2" />
      <path d={`M ${r.x - 5} 32 L ${r.x} 22 L ${r.x + 5} 32 Z`} fill={INK} />
      <circle cx={r.x} cy="60" r="3.5" fill={INK} />
      <text x={labelX} y="14" textAnchor={labelAnchor} fontSize="12" fontWeight="600" fill={INK}>
        {r.label}
      </text>
    </svg>
  );
}

type Tick = { x: number; label: string; anchor?: "start" | "middle" | "end" };
type Row = {
  title: string;
  segments: { x1: number; x2: number; label: string; dashed?: boolean; fill?: string }[];
  below: Tick[];
  above?: Tick[];
};

const ROWS: Row[] = [
  {
    title: "Messiânica contínua · desde Artaxerxes a Esdras",
    segments: [
      { x1: 8, x2: 64, label: "7 sem." },
      { x1: 64, x2: 250, label: "62 semanas (434 anos)" },
      { x1: 250, x2: 332, label: "70ª sem.", fill: "#2a1f22" },
    ],
    above: [{ x: 291, label: "cruz, c. 30/31", anchor: "middle" }],
    below: [
      { x: 8, label: "457 a.C.", anchor: "start" },
      { x: 64, label: "408", anchor: "middle" },
      { x: 250, label: "27 d.C. batismo", anchor: "end" },
      { x: 332, label: "34", anchor: "end" },
    ],
  },
  {
    title: "Dispensacionalista · desde Artaxerxes a Neemias",
    segments: [
      { x1: 8, x2: 64, label: "7 sem." },
      { x1: 64, x2: 206, label: "62 sem. (360 d/ano)" },
      { x1: 206, x2: 262, label: "intervalo", dashed: true },
      { x1: 262, x2: 332, label: "70ª sem.", fill: "#2a1f22" },
    ],
    above: [
      { x: 234, label: "era da igreja", anchor: "middle" },
      { x: 332, label: "futura", anchor: "end" },
    ],
    below: [
      { x: 8, label: "444 a.C.", anchor: "start" },
      { x: 206, label: "33 d.C.", anchor: "middle" },
      { x: 297, label: "7 anos", anchor: "middle" },
    ],
  },
  {
    title: "Histórico-crítica (macabeia) · desde Jeremias",
    segments: [
      { x1: 8, x2: 64, label: "7 sem." },
      { x1: 64, x2: 250, label: "62 sem. (esquemáticas)" },
      { x1: 250, x2: 332, label: "70ª sem.", fill: "#2a1f22" },
    ],
    above: [
      { x: 64, label: "Ciro, \u201cungido\u201d", anchor: "middle" },
      { x: 291, label: "167 abominação", anchor: "middle" },
    ],
    below: [
      { x: 8, label: "587 a.C.", anchor: "start" },
      { x: 64, label: "538", anchor: "middle" },
      { x: 250, label: "171 Onias", anchor: "end" },
      { x: 332, label: "164", anchor: "end" },
    ],
  },
];

/** As setenta semanas de Daniel 9 em três leituras (fora de escala). */
export function SeventyWeeksDiagram() {
  const rowH = 92;
  const height = ROWS.length * rowH + 8;
  return (
    <svg
      viewBox={`0 0 340 ${height}`}
      role="img"
      aria-label="As setenta semanas de Daniel 9 em três leituras: messiânica contínua, dispensacionalista com intervalo e histórico-crítica"
      className="h-auto w-full"
      fontFamily="var(--font-outfit), sans-serif"
    >
      <title>As setenta semanas de Daniel 9 em três leituras</title>
      {ROWS.map((row, index) => {
        const y = index * rowH;
        const barY = y + 40;
        return (
          <g key={row.title}>
            <text x="8" y={y + 14} fontSize="12" fontWeight="600" fill={GOLD}>
              {row.title}
            </text>
            {row.above?.map((tick) => (
              <text
                key={`a-${tick.label}`}
                x={tick.x}
                y={barY - 6}
                textAnchor={tick.anchor ?? "middle"}
                fontSize="11"
                fill={INK}
              >
                {tick.label}
              </text>
            ))}
            {row.segments.map((segment) => (
              <g key={segment.label}>
                <rect
                  x={segment.x1}
                  y={barY}
                  width={segment.x2 - segment.x1}
                  height="24"
                  fill={segment.dashed ? "transparent" : (segment.fill ?? "#1a2232")}
                  stroke={GOLD}
                  strokeOpacity={segment.dashed ? 0.7 : 0.5}
                  strokeDasharray={segment.dashed ? "4 3" : undefined}
                />
                <text
                  x={(segment.x1 + segment.x2) / 2}
                  y={barY + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill={segment.dashed ? MUTED : INK}
                >
                  {segment.label}
                </text>
              </g>
            ))}
            {row.below.map((tick) => (
              <text
                key={`b-${tick.label}`}
                x={tick.x}
                y={barY + 40}
                textAnchor={tick.anchor ?? "middle"}
                fontSize="11"
                fill={MUTED}
              >
                {tick.label}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
