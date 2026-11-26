import { TERRAIN, elevation, eras, hotspots, tunnel, walls, type Era, type XZ } from "@/lib/historia/jerusalem";

/**
 * Planta topográfica da maquete, desenhada no servidor (funciona sem JavaScript).
 * Curvas de nível a cada 10 m calculadas do mesmo relevo da maquete 3D.
 */
const VIEW = { minX: -720, maxX: 880, minZ: -760, maxZ: 760 };
const STEP = 16;

function contours(): { level: number; d: string }[] {
  const nx = Math.floor((VIEW.maxX - VIEW.minX) / STEP);
  const nz = Math.floor((VIEW.maxZ - VIEW.minZ) / STEP);
  const grid: number[][] = [];
  for (let j = 0; j <= nz; j += 1) {
    const row: number[] = [];
    for (let i = 0; i <= nx; i += 1) row.push(elevation(VIEW.minX + i * STEP, VIEW.minZ + j * STEP));
    grid.push(row);
  }
  const out: { level: number; d: string }[] = [];
  for (let level = 600; level <= 820; level += 10) {
    let d = "";
    for (let j = 0; j < nz; j += 1) {
      for (let i = 0; i < nx; i += 1) {
        const v = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
        const corners: XZ[] = [
          [i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1],
        ];
        const pts: XZ[] = [];
        for (let k = 0; k < 4; k += 1) {
          const a = v[k];
          const b = v[(k + 1) % 4];
          if ((a < level) !== (b < level)) {
            const t = (level - a) / (b - a);
            const [ax, az] = corners[k];
            const [bx, bz] = corners[(k + 1) % 4];
            pts.push([VIEW.minX + (ax + (bx - ax) * t) * STEP, VIEW.minZ + (az + (bz - az) * t) * STEP]);
          }
        }
        for (let k = 0; k + 1 < pts.length; k += 2) {
          d += `M${pts[k][0].toFixed(0)} ${pts[k][1].toFixed(0)}L${pts[k + 1][0].toFixed(0)} ${pts[k + 1][1].toFixed(0)}`;
        }
      }
    }
    out.push({ level, d });
  }
  return out;
}

const lines = contours();
const eraColor: Record<Era, string> = { davi: "#e7b089", salomao: "#e4c78a", ezequias: "#8fd0b4" };

function ring(points: XZ[]) {
  return points.map(([x, z]) => `${x},${z}`).join(" ");
}

export function CityPlan({ era }: { era?: Era }) {
  const shown = era ? [era] : (["ezequias", "salomao", "davi"] as Era[]);
  const spots = hotspots.filter((spot) => !era || spot.eras.includes(era));
  const uniq = spots.filter((spot, i) => spots.findIndex((s) => s.at[0] === spot.at[0] && s.at[1] === spot.at[1]) === i);
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-gold/25 bg-[#0e141d]">
      <svg
        viewBox={`${VIEW.minX} ${VIEW.minZ} ${VIEW.maxX - VIEW.minX} ${VIEW.maxZ - VIEW.minZ}`}
        className="h-auto w-full"
        role="img"
        aria-label="Planta topográfica de Jerusalém com os muros de Davi, Salomão e Ezequias"
      >
        <rect x={TERRAIN.minX} y={TERRAIN.minZ} width={TERRAIN.maxX - TERRAIN.minX} height={TERRAIN.maxZ - TERRAIN.minZ} fill="#121a25" />
        {lines.map((line) => (
          <path
            key={line.level}
            d={line.d}
            fill="none"
            stroke={line.level % 50 === 0 ? "#6d6450" : "#3a3a33"}
            strokeWidth={line.level % 50 === 0 ? 2.4 : 1.2}
          />
        ))}
        {shown.map((id) =>
          walls[id].map((wall) => (
            <polygon
              key={`${id}-${wall.label}`}
              points={ring(wall.ring)}
              fill={eraColor[id]}
              fillOpacity={era ? 0.12 : 0.05}
              stroke={eraColor[id]}
              strokeWidth={id === "ezequias" ? 7 : 5}
              strokeDasharray={id === "davi" && !era ? "14 8" : undefined}
              strokeLinejoin="round"
            />
          )),
        )}
        {!era || era === "ezequias" ? (
          <polyline points={ring(tunnel)} fill="none" stroke="#7fd6ff" strokeWidth={5} strokeDasharray="10 7" />
        ) : null}
        {!era || era !== "davi" ? (
          <g>
            <rect x={127 - 70} y={-449 - 45} width={140} height={90} fill="none" stroke="#e4c78a" strokeWidth={2} />
            <rect x={127 - 22} y={-449 - 5} width={36} height={10} fill="#e4c78a" />
          </g>
        ) : null}
        {uniq.map((spot) => (
          <g key={spot.id}>
            <circle cx={spot.at[0]} cy={spot.at[1]} r={9} fill="#e4c78a" stroke="#090d14" strokeWidth={3} />
            <text
              x={spot.at[0] + 14}
              y={spot.at[1] + 6}
              fontSize={24}
              fill="#f4eee6"
              stroke="#090d14"
              strokeWidth={5}
              paintOrder="stroke"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {spot.id === "eira" && era !== "davi" ? "Templo / eira de Araúna" : spot.name}
            </text>
          </g>
        ))}
        <g fontFamily="Georgia, serif" fill="#c9bfb2" fontSize={26} fontStyle="italic" opacity={0.8}>
          <text x={340} y={40} transform="rotate(-80 340 40)">vale do Cedrom</text>
          <text x={-430} y={640}>vale de Hinom</text>
          <text x={-170} y={-300} transform="rotate(62 -170 -300)">vale central</text>
        </g>
        <g transform={`translate(${VIEW.maxX - 130} ${VIEW.minZ + 70})`} fill="#e4c78a" fontFamily="ui-sans-serif" fontSize={22}>
          <path d="M0 40 L12 0 L24 40 L12 30 Z" />
          <text x={4} y={66}>N</text>
        </g>
        <g transform={`translate(${VIEW.minX + 40} ${VIEW.maxZ - 50})`} fill="#c9bfb2" fontFamily="ui-sans-serif" fontSize={20}>
          <rect width={200} height={6} fill="#c9bfb2" />
          <text y={30}>200 m · curvas de 10 m</text>
        </g>
      </svg>
      <figcaption className="flex flex-wrap gap-x-5 gap-y-2 px-4 py-3 font-sans text-xs text-muted-foreground">
        {eras
          .filter((item) => shown.includes(item.id))
          .map((item) => (
            <span key={item.id} className="inline-flex items-center gap-2">
              <span className="inline-block h-1 w-6 rounded" style={{ background: eraColor[item.id] }} />
              Muro de {item.label} ({item.date})
            </span>
          ))}
        {!era || era === "ezequias" ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-1 w-6 rounded bg-[#7fd6ff]" />
            Túnel de Ezequias
          </span>
        ) : null}
        <span>Traçados aproximados; relevo simplificado.</span>
      </figcaption>
    </figure>
  );
}
