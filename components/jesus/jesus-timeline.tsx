import Link from "next/link";

import { JESUS_END, JESUS_START, astro, jesusEvents, jesusLanes, jesusSpans, yearAnchor } from "@/lib/jesus/linha-do-tempo";
import { yearLabel } from "@/lib/jesus/types";

const PX = 15;
const TOP = 30;
const LEFT = 120;
const SPAN = astro(JESUS_END) - astro(JESUS_START);
const WIDTH = SPAN * PX + 40;
const x = (year: number) => 20 + (astro(year) - astro(JESUS_START)) * PX;
/** Fim de um período: o fim do ano final. */
const xEnd = (year: number) => x(year) + (year < 0 ? 0 : PX);

/** Períodos que se sobrepõem na mesma faixa vão para linhas diferentes. */
const BAR_H = 20;
const ROW_H = 24;
const spanRow: number[] = [];
const laneRows = jesusLanes.map((lane) => {
  const ends: number[] = [];
  jesusSpans.forEach((span, k) => {
    if (span.lane !== lane.id) return;
    const x0 = x(span.start);
    let r = ends.findIndex((e) => e <= x0);
    if (r < 0) r = ends.length;
    ends[r] = xEnd(span.end);
    spanRow[k] = r;
  });
  return Math.max(1, ends.length);
});
const laneH = laneRows.map((rows) => rows * ROW_H + 22);
const laneTop = laneH.map((_, i) => TOP + laneH.slice(0, i).reduce((a, b) => a + b, 0));
const HEIGHT = TOP + laneH.reduce((a, b) => a + b, 0) + 10;

const TICKS = [-40, -30, -20, -10, 1, 10, 20, 30, 40];

/** Panorama horizontal em SVG, renderizado no servidor (funciona sem JavaScript). */
export function JesusTimeline() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/20 bg-[#0b1018]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#0b1018] via-[#0b1018]/90 to-transparent md:w-36">
        {jesusLanes.map((lane, i) => (
          <p
            key={lane.id}
            className="absolute left-3 font-sans text-[10px] leading-tight tracking-[0.08em] uppercase md:text-[11px]"
            style={{ top: laneTop[i] + 8, color: lane.color, width: "6.5rem" }}
          >
            {lane.label}
          </p>
        ))}
      </div>
      <div className="overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label="Panorama da linha do tempo, role para os lados">
        <svg width={WIDTH + LEFT} height={HEIGHT} className="block" role="img" aria-label="De 40 a.C. a 45 d.C., em faixas paralelas">
          <g transform={`translate(${LEFT} 0)`}>
            {TICKS.map((year) => (
              <g key={year}>
                <line x1={x(year)} x2={x(year)} y1={TOP - 6} y2={HEIGHT} stroke="#ffffff" strokeOpacity={year === 1 ? 0.25 : 0.07} />
                <text x={x(year) + 3} y={16} fontSize={11} fill="#c9bfb2" fontFamily="ui-sans-serif, system-ui">
                  {yearLabel(year)}
                </text>
              </g>
            ))}
            {jesusLanes.map((lane, i) => (
              <rect key={lane.id} x={0} y={laneTop[i]} width={WIDTH} height={laneH[i] - 4} fill={lane.color} fillOpacity={i % 2 ? 0.025 : 0.045} />
            ))}
            {jesusSpans.map((span, k) => {
              const li = jesusLanes.findIndex((lane) => lane.id === span.lane);
              const color = jesusLanes[li].color;
              const x0 = x(span.start);
              const w = Math.max(3, xEnd(span.end) - x0 - 2);
              const y = laneTop[li] + 5 + spanRow[k] * ROW_H;
              return (
                <g key={`${span.lane}-${span.name}`}>
                  <rect
                    x={x0}
                    y={y}
                    width={w}
                    height={BAR_H}
                    rx={4}
                    fill={color}
                    fillOpacity={span.uncertain ? 0.12 : 0.28}
                    stroke={color}
                    strokeOpacity={0.7}
                    strokeDasharray={span.uncertain ? "4 3" : undefined}
                  >
                    <title>{`${span.name}: ${yearLabel(span.start)}–${yearLabel(span.end)}${span.note ? `. ${span.note}` : ""}`}</title>
                  </rect>
                  {w > span.name.length * 5.6 + 6 ? (
                    <text x={x0 + 4} y={y + 14} fontSize={10.5} fill="#f4eee6" fontFamily="ui-sans-serif, system-ui">
                      {span.name}
                    </text>
                  ) : null}
                </g>
              );
            })}
            {jesusEvents.map((event) => {
              const li = jesusLanes.findIndex((lane) => lane.id === event.lane);
              const cx = x(event.year) + PX / 2;
              const cy = laneTop[li] + laneH[li] - 13;
              return (
                <Link key={`${event.year}-${event.title}`} href={event.episode ? `/jesus/${event.episode}` : `#${yearAnchor(event.year)}`}>
                  <title>{`${yearLabel(event.year)} · ${event.title}`}</title>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4.5}
                    fill={event.uncertain ? "#0b1018" : "#f4eee6"}
                    stroke={event.uncertain ? "#f4eee6" : "#090d14"}
                    strokeWidth={1.5}
                  />
                </Link>
              );
            })}
          </g>
        </svg>
      </div>
      <p className="border-t border-white/10 px-4 py-2 font-sans text-[11px] text-muted-foreground">
        Role para os lados. Barras: governos e períodos; tracejado = data debatida. ● acontecimento; ○ data incerta. Não existe ano 0: de
        1 a.C. se passa a 1 d.C.
      </p>
    </div>
  );
}
