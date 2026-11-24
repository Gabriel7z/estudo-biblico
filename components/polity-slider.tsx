"use client";

import { useMemo, useState } from "react";

import { BibleMap } from "@/components/bible-map";
import { polities } from "@/lib/polities";

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

  return (
    <section className="mt-10">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="kicker">Mapa geopolítico</p>
          <h2 className="mt-1 font-heading text-3xl">Quem manda, século a século</h2>
        </div>
        <p className="font-sans text-sm text-muted-foreground">
          {index + 1} / {polities.length}
        </p>
      </div>
      <label className="block font-sans text-sm text-muted-foreground" htmlFor="polity-slider">
        Arraste do clã patriarcal até a Judeia helenística
        <input
          id="polity-slider"
          className="mt-2 w-full accent-[#224b41]"
          type="range"
          min={0}
          max={polities.length - 1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
      </label>
      <ol className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {polities.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              className={
                itemIndex === index
                  ? "rounded-full border border-primary bg-primary px-3 py-1 font-sans text-xs text-primary-foreground"
                  : "rounded-full border border-border bg-background px-3 py-1 font-sans text-xs"
              }
              onClick={() => setIndex(itemIndex)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
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
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="kicker">{polity.peripheral ? "Periferia do atlas" : polity.dates}</p>
          <h3 className="mt-1 font-heading text-2xl">{polity.name}</h3>
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
    </section>
  );
}
