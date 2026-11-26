import Link from "next/link";

import { episodes } from "@/lib/historia";
import { TIMELINE_END, TIMELINE_START, events, lanes, reigns } from "@/lib/historia/linha-do-tempo";

const PX = 3.2;
const LANE_H = 46;
const TOP = 30;
const WIDTH = (TIMELINE_START - TIMELINE_END) * PX + 40;
const HEIGHT = TOP + lanes.length * LANE_H + 10;
const x = (year: number) => 20 + (TIMELINE_START - year) * PX;

/** Panorama horizontal: uma faixa por povo, os reinados como barras, guerras como losangos. */
export function TimelinePanorama() {
  const episodeSet = new Set(episodes.map((episode) => episode.slug));
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/20 bg-[#0b1018]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#0b1018] via-[#0b1018]/90 to-transparent md:w-40">
        {lanes.map((lane, i) => (
          <p
            key={lane.id}
            className="absolute left-3 font-sans text-[10px] leading-tight tracking-[0.08em] uppercase md:text-[11px]"
            style={{ top: TOP + i * LANE_H + 8, color: lane.color, width: "7rem" }}
          >
            {lane.label}
          </p>
        ))}
      </div>
      <div className="overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label="Panorama da linha do tempo, role para os lados">
        <svg width={WIDTH + 120} height={HEIGHT} className="block" role="img" aria-label="Reinados e guerras de 1100 a 160 a.C., em faixas paralelas">
          <g transform="translate(110 0)">
            {Array.from({ length: Math.floor((TIMELINE_START - TIMELINE_END) / 50) + 1 }, (_, i) => TIMELINE_START - i * 50).map((year) => (
              <g key={year}>
                <line x1={x(year)} x2={x(year)} y1={TOP - 6} y2={HEIGHT} stroke="#ffffff" strokeOpacity={year % 100 === 0 ? 0.12 : 0.05} />
                <text x={x(year) + 3} y={16} fontSize={11} fill="#c9bfb2" fontFamily="ui-sans-serif, system-ui">
                  {year}
                </text>
              </g>
            ))}
            {lanes.map((lane, i) => (
              <rect key={lane.id} x={0} y={TOP + i * LANE_H} width={WIDTH} height={LANE_H - 4} fill={lane.color} fillOpacity={i % 2 ? 0.025 : 0.045} />
            ))}
            {reigns.map((reign, k) => {
              const li = lanes.findIndex((lane) => lane.id === reign.lane);
              const color = lanes[li].color;
              const x0 = x(reign.start);
              const w = Math.max(2, (reign.start - reign.end) * PX);
              const y = TOP + li * LANE_H + 6 + (k % 2) * 4;
              return (
                <g key={`${reign.lane}-${reign.name}-${reign.start}`}>
                  <rect x={x0} y={y} width={w} height={22} rx={4} fill={color} fillOpacity={0.28} stroke={color} strokeOpacity={0.6}>
                    <title>{`${reign.name}: ${reign.start}–${reign.end} a.C.`}</title>
                  </rect>
                  {w > reign.name.length * 5.6 + 6 ? (
                    <text x={x0 + 4} y={y + 15} fontSize={10.5} fill="#f4eee6" fontFamily="ui-sans-serif, system-ui">
                      {reign.name}
                    </text>
                  ) : null}
                </g>
              );
            })}
            {events.map((event) => {
              const li = lanes.findIndex((lane) => lane.id === event.lane);
              const cx = x(event.year);
              const cy = TOP + li * LANE_H + 36;
              const href = event.episode && episodeSet.has(event.episode) ? `/historia/mapas/${event.episode}` : `#ano-${event.year}`;
              return (
                <Link key={`${event.year}-${event.title}`} href={href}>
                  <title>{`${event.year} a.C. · ${event.title}`}</title>
                  {event.war ? (
                    <path d={`M${cx} ${cy - 7} L${cx + 7} ${cy} L${cx} ${cy + 7} L${cx - 7} ${cy} Z`} fill="#e0645a" stroke="#090d14" strokeWidth={1.5} />
                  ) : (
                    <circle cx={cx} cy={cy} r={4.5} fill="#f4eee6" stroke="#090d14" strokeWidth={1.5} />
                  )}
                </Link>
              );
            })}
          </g>
        </svg>
      </div>
      <p className="border-t border-white/10 px-4 py-2 font-sans text-[11px] text-muted-foreground">
        Role para os lados. Barras: reinados. <span className="text-[#e0645a]">◆</span> guerra, batalha ou cerco; ● outro acontecimento. Toque para abrir o mapa.
      </p>
    </div>
  );
}
