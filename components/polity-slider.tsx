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
import { useMemo, useState } from "react";

import { BibleMap } from "@/components/bible-map";
import { polities } from "@/lib/polities";
import { cn } from "cn";

const tones: Record<string, { color: string; era: string; icon: LucideIcon }> = {
  clas: { color: "#6e5428", era: "Clã", icon: Users },
  teocracia: { color: "#2f5d4a", era: "Teocracia", icon: ScrollText },
  juizes: { color: "#3d6b58", era: "Juízes", icon: Scale },
  unida: { color: "#8c3d2f", era: "Monarquia unida", icon: Crown },
  dividida: { color: "#1e3a5f", era: "Reinos divididos", icon: Split },
  imperios: { color: "#6b3a32", era: "Exílio", icon: Landmark },
  yehud: { color: "#6e5428", era: "Persa", icon: Tent },
  hasmoneus: { color: "#3e4a6b", era: "Helenístico · hasmoneu", icon: Shield },
};

export function PolitySlider() {
  const [index, setIndex] = useState(3);
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

  return (
    <section className="mt-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <div>
          <p className="kicker">Mapa geopolítico</p>
          <h2 className="mt-1 font-heading text-4xl">Quem manda, século a século</h2>
        </div>
        <p className="font-sans text-sm whitespace-nowrap text-muted-foreground">
          {index + 1} / {polities.length}
        </p>
      </div>
      <label className="block font-sans text-sm text-muted-foreground" htmlFor="polity-slider">
        Arraste do clã patriarcal até a Judeia helenística
        <input
          id="polity-slider"
          className="mt-2 w-full accent-[#243f38]"
          type="range"
          min={0}
          max={polities.length - 1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
      </label>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <ol className="relative space-y-1 border-l border-gold/60 pl-4">
          {polities.map((item, itemIndex) => {
            const itemTone = tones[item.id] ?? tones.clas;
            const Icon = itemTone?.icon ?? Users;
            const active = itemIndex === index;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 py-2 text-left",
                    active ? "text-ink" : "text-muted-foreground hover:text-ink",
                  )}
                  onClick={() => setIndex(itemIndex)}
                >
                  <span
                    className="era-node -ml-[1.85rem]"
                    style={{ background: itemTone?.color ?? "#243f38" }}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-sans text-[10px] tracking-[0.16em] uppercase">
                      {itemTone?.era}
                    </span>
                    <span className={cn("font-heading text-lg leading-tight", active && "text-xl")}>
                      {item.name}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <figure className="plate">
            <div className="plate-inner h-80 md:h-[460px]">
              <BibleMap
                mode="inset"
                era={polity.era}
                placeId={polity.focusPlaceId}
                focus={focus}
              />
            </div>
            <figcaption className="px-1 pt-2 text-xs leading-relaxed text-muted-foreground">
              Território de estudo, com borda aproximada. Vizinhos aparecem quando importam nesse
              século. A Pérsia não é um disco, e a Judeia hasmoneia é só a serra.
            </figcaption>
          </figure>
          <article className="folio p-4" style={{ borderTop: `3px solid ${tone?.color ?? "#243f38"}` }}>
            <p className="kicker">{polity.peripheral ? "Periferia do atlas" : polity.dates}</p>
            <h3 className="mt-1 font-heading text-3xl">{polity.name}</h3>
            {polity.peripheral ? (
              <p className="mt-1 text-sm text-muted-foreground">{polity.dates}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed">
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
          </article>
        </div>
      </div>
    </section>
  );
}
