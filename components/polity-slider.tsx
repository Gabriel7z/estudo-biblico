"use client";

import {
  Crown,
  Landmark,
  Scale,
  ScrollText,
  Shield,
  Split,
  Tent,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { BibleMap } from "@/components/bible-map";
import { polities } from "@/lib/polities";
import { cn } from "cn";

const tones: Record<string, { color: string; era: string; icon: LucideIcon }> = {
  clas: { color: "#e4c78a", era: "Clã", icon: Users },
  teocracia: { color: "#8fd0b4", era: "Teocracia", icon: ScrollText },
  juizes: { color: "#7dcec0", era: "Juízes", icon: Scale },
  unida: { color: "#e07a5f", era: "Monarquia unida", icon: Crown },
  dividida: { color: "#7eb0e0", era: "Reinos divididos", icon: Split },
  imperios: { color: "#d4a017", era: "Exílio", icon: Landmark },
  yehud: { color: "#f0d78c", era: "Persa", icon: Tent },
  hasmoneus: { color: "#b7a6e6", era: "Helenístico · hasmoneu", icon: Shield },
};

export function PolitySlider() {
  const [index, setIndex] = useState(3);
  const reduce = useReducedMotion();
  const polity = polities[index] ?? polities[0];
  const focus = useMemo(
    () =>
      polity
        ? {
            placeIds: polity.placeIds,
            routeIds: polity.routeIds,
            regionIds: polity.regionIds,
          }
        : undefined,
    [polity],
  );
  if (!polity || !focus) return null;
  const tone = tones[polity.id] ?? tones.clas;
  const progress = ((index + 1) / polities.length) * 100;

  return (
    <section className="mt-14">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div>
          <p className="kicker">Mapa geopolítico</p>
          <h2 className="mt-1 font-heading text-4xl md:text-6xl">Quem manda, século a século</h2>
        </div>
        <p className="font-heading text-4xl text-gold whitespace-nowrap">
          {index + 1}
          <span className="text-xl text-muted-foreground"> / {polities.length}</span>
        </p>
      </div>
      <label className="block font-sans text-sm text-muted-foreground" htmlFor="polity-slider">
        Arraste do clã patriarcal até a Judeia helenística
        <input
          id="polity-slider"
          className="mt-3 w-full accent-[#e4c78a]"
          type="range"
          min={0}
          max={polities.length - 1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
      </label>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ background: tone?.color ?? "#e4c78a" }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
        />
      </div>
      <ol className="mt-5 flex snap-x gap-3 overflow-x-auto pb-3">
        {polities.map((item, itemIndex) => {
          const itemTone = tones[item.id] ?? tones.clas;
          const Icon = itemTone?.icon ?? Users;
          const active = itemIndex === index;
          return (
            <li key={item.id} className="snap-start">
              <button
                type="button"
                className={cn(
                  "flex w-56 items-start gap-3 rounded-2xl border px-3 py-3 text-left transition",
                  active
                    ? "border-gold/50 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-white/25",
                )}
                onClick={() => setIndex(itemIndex)}
              >
                <span className="era-node" style={{ background: itemTone?.color ?? "#e4c78a" }}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-sans text-[10px] tracking-[0.16em] uppercase" style={{ color: itemTone?.color }}>
                    {itemTone?.era}
                  </span>
                  <span className="mt-1 block font-heading text-lg leading-tight">{item.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <figure className="plate">
          <div className="plate-inner h-[68vh] min-h-[420px]">
            <BibleMap mode="inset" era={polity.era} placeId={polity.focusPlaceId} focus={focus} />
          </div>
          <figcaption className="px-2 pt-3 text-xs leading-relaxed text-muted-foreground">
            Território de estudo, com borda aproximada. Vizinhos aparecem quando importam nesse
            século. A Pérsia não é um disco, e a Judeia hasmoneia é só a serra.
          </figcaption>
        </figure>
        <motion.article
          key={polity.id}
          className="folio rounded-3xl p-5"
          style={{ borderTop: `3px solid ${tone?.color ?? "#e4c78a"}` }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        >
          <p className="kicker">{polity.peripheral ? "Periferia do atlas" : polity.dates}</p>
          <h3 className="mt-2 font-heading text-4xl">{polity.name}</h3>
          {polity.peripheral ? <p className="mt-1 text-sm text-muted-foreground">{polity.dates}</p> : null}
          <p className="mt-4 text-sm leading-relaxed">
            <span className="font-medium text-ink">Quem manda. </span>
            {polity.rule}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-medium text-ink">Como o poder funciona. </span>
            {polity.power}
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-medium text-ink">Textos. </span>
            {polity.texts}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{polity.uncertainty}</p>
        </motion.article>
      </div>
    </section>
  );
}
