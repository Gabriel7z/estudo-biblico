"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { BibleMap } from "@/components/bible-map";
import { isEraId } from "@/lib/atlas";
import { eras } from "@/lib/eras";
import { getPlace, places } from "@/lib/places";
import { routes } from "@/lib/routes";
import type { EraId } from "@/lib/types";
import { cn } from "cn";

function query(era: string, lugar?: string): string {
  const params = new URLSearchParams();
  params.set("era", era);
  if (lugar) params.set("lugar", lugar);
  return `/mapa/?${params.toString()}`;
}

export function MapScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const eraParam = params.get("era");
  const placeParam = params.get("lugar");
  const eraInvalid = Boolean(eraParam) && !isEraId(eraParam);
  const era: EraId = isEraId(eraParam) ? eraParam : "exodo";
  const place = placeParam ? getPlace(placeParam) : undefined;
  const unknownPlace = Boolean(placeParam) && !place;
  const outOfEra = Boolean(place && !place.eras.includes(era));
  const current = eras.find((item) => item.id === era);
  const visiblePlaces = eraInvalid ? [] : places.filter((item) => item.eras.includes(era));
  const legend = eraInvalid ? [] : routes.filter((route) => route.eras.includes(era));
  const selected = place && !unknownPlace && !outOfEra && !eraInvalid ? place : undefined;

  const empty = eraInvalid
    ? {
        title: "Esse período não está no atlas.",
        text: "A placa vai dos patriarcas ao retorno da Pérsia. Escolha um dos séculos ao lado.",
      }
    : unknownPlace
      ? {
          title: "Esse lugar não está nesta placa.",
          text: "O nome não corresponde a um sítio deste estudo. As cidades marcadas são as do século escolhido.",
        }
      : outOfEra && place
        ? {
            title: `${place.name} não entra neste século.`,
            text: `${place.blurb} Abra o período em que o sítio importa.`,
          }
        : null;

  return (
    <div className="relative h-[calc(100dvh-4rem)] min-h-[520px]">
      <BibleMap
        mode="atlas"
        era={eraInvalid ? undefined : era}
        placeId={selected?.id}
        empty={empty}
        onSelectPlace={(id) => {
          router.replace(query(era, id), { scroll: false });
        }}
      />

      <div className="absolute top-3 left-3 z-10 flex max-w-[calc(100%-8.5rem)] gap-1.5 overflow-x-auto pb-1">
        {eras.map((item) => {
          const active = !eraInvalid && item.id === era;
          return (
            <Link
              key={item.id}
              href={query(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 font-sans text-xs",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-gold/40 bg-[#fbf6ec]/95 text-foreground",
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <aside className="absolute right-3 bottom-0 left-3 z-10 max-h-[42vh] overflow-auto rounded-t-lg border border-border bg-card/95 p-4 shadow-sm md:top-16 md:bottom-8 md:left-3 md:max-h-[calc(100%-7rem)] md:w-80 md:rounded-lg">
        <p className="kicker">{eraInvalid ? "Fora da placa" : (current?.centuries ?? "")}</p>
        <h1 className="mt-1 font-heading text-2xl text-ink">
          {selected ? selected.name : empty ? empty.title : current?.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {selected
            ? selected.blurb
            : empty
              ? empty.text
              : current?.summary}
        </p>
        {selected?.tradition ? (
          <p className="mt-2 text-sm leading-relaxed">
            Este ponto é tradição de atlas de estudo, não uma identificação escavada.
          </p>
        ) : null}
        {selected ? (
          <p className="mt-2 font-sans text-xs text-muted-foreground">
            {selected.site} · {selected.lat.toFixed(3)}° N, {selected.lng.toFixed(3)}° L
          </p>
        ) : null}
        {outOfEra && place ? (
          <Link
            className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
            href={query(place.eras[0] ?? "exodo", place.id)}
          >
            Ver {place.name} no século em que importa
          </Link>
        ) : null}
        {!eraInvalid && current ? (
          <Link
            className="mt-3 inline-block text-sm text-primary underline-offset-4 hover:underline"
            href={`/eras/${current.id}`}
          >
            Ler o período
          </Link>
        ) : null}

        {legend.length > 0 ? (
          <ul className="mt-4 space-y-1 text-xs">
            {legend.map((route) => (
              <li key={route.id} className="flex items-center gap-2">
                <span
                  className="inline-block h-0.5 w-5 shrink-0"
                  style={{
                    background: route.dashed
                      ? `repeating-linear-gradient(90deg, ${route.color} 0 5px, transparent 5px 8px)`
                      : route.color,
                  }}
                />
                <span>{route.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Nenhuma rota deste estudo entra na seleção.
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visiblePlaces.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma cidade marcada neste recorte.</p>
          ) : (
            visiblePlaces.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => router.replace(query(era, item.id), { scroll: false })}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-left font-sans text-xs",
                  selected?.id === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary",
                )}
              >
                {item.name}
              </button>
            ))
          )}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          {eraInvalid
            ? "Mapa base sem o século bíblico."
            : "A rolagem aproxima. Arraste para mover, gire e incline. As datas são de estudo."}{" "}
          {current?.mapNote}
        </p>
      </aside>
    </div>
  );
}
