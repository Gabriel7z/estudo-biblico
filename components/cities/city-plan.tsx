import { getCity } from "@/lib/historia/maquetes";
import type { Block, CityDef, XZ } from "@/lib/historia/maquetes/types";

/**
 * Planta da maquete desenhada no servidor (funciona sem JavaScript e sem WebGL):
 * rios, fossos, muros, prédios, curvas de nível e os lugares numerados.
 */

function contours(city: CityDef): { level: number; d: string; major: boolean }[] {
  const c = city.plan.contours;
  if (!c) return [];
  const v = city.plan.view;
  const step = Math.max(10, Math.round((v.maxX - v.minX) / 220));
  const nx = Math.floor((v.maxX - v.minX) / step);
  const nz = Math.floor((v.maxZ - v.minZ) / step);
  const grid: number[][] = [];
  for (let j = 0; j <= nz; j += 1) {
    const row: number[] = [];
    for (let i = 0; i <= nx; i += 1) row.push(city.elevation(v.minX + i * step, v.minZ + j * step));
    grid.push(row);
  }
  const out: { level: number; d: string; major: boolean }[] = [];
  for (let level = c.from; level <= c.to; level += c.step) {
    let d = "";
    for (let j = 0; j < nz; j += 1) {
      for (let i = 0; i < nx; i += 1) {
        const vals = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
        const corners: XZ[] = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]];
        const pts: XZ[] = [];
        for (let k = 0; k < 4; k += 1) {
          const a = vals[k];
          const b = vals[(k + 1) % 4];
          if (a < level !== b < level) {
            const t = (level - a) / (b - a);
            const [ax, az] = corners[k];
            const [bx, bz] = corners[(k + 1) % 4];
            pts.push([v.minX + (ax + (bx - ax) * t) * step, v.minZ + (az + (bz - az) * t) * step]);
          }
        }
        for (let k = 0; k + 1 < pts.length; k += 2) {
          d += `M${pts[k][0].toFixed(0)} ${pts[k][1].toFixed(0)}L${pts[k + 1][0].toFixed(0)} ${pts[k + 1][1].toFixed(0)}`;
        }
      }
    }
    out.push({ level, d, major: level % c.major === 0 });
  }
  return out;
}

function line(points: XZ[]) {
  return points.map(([x, z]) => `${x.toFixed(0)},${z.toFixed(0)}`).join(" ");
}

function footprint(b: Block): XZ[] {
  const w = b.kind === "tiers" && b.tiers ? b.tiers[0][0] : b.size[0];
  const d = b.kind === "tiers" && b.tiers ? b.tiers[0][1] : b.size[2];
  const rot = b.rot ?? 0;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  return ([[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]] as XZ[]).map(([lx, lz]) => [
    b.at[0] + lx * cos + lz * sin,
    b.at[1] - lx * sin + lz * cos,
  ]);
}

export function CityPlan({ slug }: { slug: string }) {
  const city = getCity(slug);
  if (!city) return null;
  const v = city.plan.view;
  const W = v.maxX - v.minX;
  const unit = W / 1600; // tamanho de traço e de texto proporcional à planta
  const lines = contours(city);
  return (
    <figure className="overflow-hidden rounded-[1.5rem] border border-gold/25 bg-[#0e141d]">
      <svg
        viewBox={`${v.minX} ${v.minZ} ${W} ${v.maxZ - v.minZ}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Planta de ${city.name} com muros, rios, prédios principais e lugares numerados`}
      >
        <rect x={v.minX} y={v.minZ} width={W} height={v.maxZ - v.minZ} fill="#121a25" />
        {lines.map((l) => (
          <path key={l.level} d={l.d} fill="none" stroke={l.major ? "#6d6450" : "#3a3a33"} strokeWidth={(l.major ? 2.4 : 1.2) * unit} />
        ))}
        {city.zones.map((zone) => (
          <polygon key={zone.seed} points={line(zone.ring)} fill="#e4c78a" fillOpacity={0.05} stroke="none" />
        ))}
        {city.waters.map((w) => (
          <polyline
            key={w.label}
            points={line(w.closed ? [...w.path, w.path[0]] : w.path)}
            fill="none"
            stroke="#3f7fa0"
            strokeWidth={w.width}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}
        {city.roads.map((r) => (
          <polyline key={r.label} points={line(r.path)} fill="none" stroke="#d9cdb6" strokeWidth={Math.max(r.width, 6 * unit)} strokeLinejoin="round" opacity={0.85} />
        ))}
        {city.walls.map((w) => (
          <polyline
            key={w.label}
            points={line(w.closed ? [...w.ring, w.ring[0]] : w.ring)}
            fill="none"
            stroke="#e4c78a"
            strokeWidth={Math.max(w.thick, 3 * unit)}
            strokeLinejoin="round"
          />
        ))}
        {city.blocks
          .filter((b) => b.size[0] * b.size[2] > 150)
          .map((b) => (
            <polygon
              key={b.id}
              points={line(footprint(b))}
              fill={b.frieze || b.kind === "glazed" ? "#5f8fd0" : b.kind === "gate" ? "#e4c78a" : "#c9b48d"}
              stroke="#090d14"
              strokeWidth={1.2 * unit}
            />
          ))}
        {city.plan.labels.map((label) => (
          <text
            key={label.text}
            x={label.at[0]}
            y={label.at[1]}
            transform={label.rot ? `rotate(${label.rot} ${label.at[0]} ${label.at[1]})` : undefined}
            fontSize={(label.size ?? 60) * unit * 0.6}
            fontFamily="Georgia, serif"
            fontStyle="italic"
            fill={label.kind === "agua" ? "#9fd3ee" : "#c9bfb2"}
            opacity={0.85}
            textAnchor="middle"
          >
            {label.text}
          </text>
        ))}
        {city.hotspots.map((spot, i) => (
          <g key={spot.id}>
            <circle cx={spot.at[0]} cy={spot.at[1]} r={13 * unit} fill="#e4c78a" stroke="#090d14" strokeWidth={3 * unit} />
            <text
              x={spot.at[0]}
              y={spot.at[1] + 5 * unit}
              fontSize={14 * unit}
              textAnchor="middle"
              fill="#1a140c"
              fontWeight={700}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {i + 1}
            </text>
          </g>
        ))}
        <g transform={`translate(${v.maxX - 90 * unit} ${v.minZ + 50 * unit}) scale(${unit})`} fill="#e4c78a" fontFamily="ui-sans-serif" fontSize={22}>
          <path d="M0 40 L12 0 L24 40 L12 30 Z" />
          <text x={4} y={66}>N</text>
        </g>
        <g transform={`translate(${v.minX + 40 * unit} ${v.maxZ - 50 * unit})`} fill="#c9bfb2" fontFamily="ui-sans-serif" fontSize={20 * unit}>
          <rect width={city.plan.scale} height={6 * unit} fill="#c9bfb2" />
          <text y={30 * unit}>
            {city.plan.scale >= 1000 ? `${city.plan.scale / 1000} km` : `${city.plan.scale} m`}
            {city.plan.contours ? ` · curvas de ${city.plan.contours.step} m` : ""}
          </text>
        </g>
      </svg>
      <figcaption className="px-4 py-3 font-sans text-xs text-muted-foreground">
        <ol className="grid gap-x-5 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {city.hotspots.map((spot, i) => (
            <li key={spot.id}>
              <span className="text-gold">{i + 1}.</span> <a href={`#${spot.id}`} className="hover:text-white">{spot.name}</a>
            </li>
          ))}
        </ol>
        <p className="mt-2">
          {city.blocks.some((b) => b.frieze) ? "Azul: tijolo vidrado. " : ""}Traçados aproximados; prédios simplificados.
        </p>
      </figcaption>
    </figure>
  );
}
