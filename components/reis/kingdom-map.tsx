"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import Link from "next/link";

import { reisPlaces, reisScenes } from "@/lib/reis";

import "maplibre-gl/dist/maplibre-gl.css";

const WORKER = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/maplibre-gl-worker.js`;
const STYLE = "https://tiles.openfreemap.org/styles/dark";

/** Linha aproximada da fronteira entre Israel (norte) e Judá (sul), ao norte de Betel/Jericó. */
const BORDER: [number, number][] = [
  [34.65, 31.93],
  [35.0, 31.95],
  [35.2, 31.9],
  [35.33, 31.86],
  [35.55, 31.78],
];

export function KingdomMap({ focus, compact = false }: { focus?: string; compact?: boolean }) {
  const node = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [active, setActive] = useState(focus ?? "jerusalem");
  const place = reisPlaces.find((item) => item.id === active) ?? reisPlaces[0];
  const scenesHere = reisScenes.filter((scene) => scene.placeId === place.id);
  const near = reisPlaces.filter((item) => !item.far);
  const far = reisPlaces.filter((item) => item.far);

  useEffect(() => {
    const container = node.current;
    if (!container) return;
    let map: MapLibreMap | undefined;
    let dead = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      maplibregl.setWorkerUrl(WORKER);
      if (dead || !node.current) return;
      const start = reisPlaces.find((item) => item.id === (focus ?? "jerusalem"));
      map = new maplibregl.Map({
        container: node.current,
        style: STYLE,
        center: start && !start.far ? [start.lng, start.lat] : [35.35, 32.35],
        zoom: start && !start.far ? 7.6 : 6.9,
        attributionControl: false,
      });
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.on("load", () => {
        if (!map) return;
        map.addSource("fronteira", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: BORDER } },
        });
        map.addLayer({
          id: "fronteira",
          type: "line",
          source: "fronteira",
          paint: { "line-color": "#e4c78a", "line-opacity": 0.55, "line-width": 1.5, "line-dasharray": [3, 2] },
        });
        map.addSource("reinos", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              { type: "Feature", properties: { name: "ISRAEL" }, geometry: { type: "Point", coordinates: [35.55, 32.75] } },
              { type: "Feature", properties: { name: "JUDÁ" }, geometry: { type: "Point", coordinates: [35.05, 31.45] } },
            ],
          },
        });
        map.addLayer({
          id: "reinos",
          type: "symbol",
          source: "reinos",
          layout: { "text-field": ["get", "name"], "text-font": ["Noto Sans Regular"], "text-size": 15, "text-letter-spacing": 0.4 },
          paint: { "text-color": "#e4c78a", "text-opacity": 0.45 },
        });
        map.addSource("lugares", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: reisPlaces.map((item) => ({
              type: "Feature",
              properties: { id: item.id, name: item.name },
              geometry: { type: "Point", coordinates: [item.lng, item.lat] },
            })),
          },
        });
        map.addLayer({
          id: "lugares-halo",
          type: "circle",
          source: "lugares",
          paint: { "circle-radius": 13, "circle-color": "#e4c78a", "circle-opacity": 0.18 },
        });
        map.addLayer({
          id: "lugares",
          type: "circle",
          source: "lugares",
          paint: {
            "circle-radius": 6,
            "circle-color": "#e4c78a",
            "circle-stroke-color": "#090d14",
            "circle-stroke-width": 2,
          },
        });
        map.addLayer({
          id: "lugares-nome",
          type: "symbol",
          source: "lugares",
          layout: {
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Regular"],
            "text-size": 12,
            "text-offset": [0, 1.2],
            "text-anchor": "top",
          },
          paint: { "text-color": "#e4c78a", "text-halo-color": "#090d14", "text-halo-width": 1.4 },
        });
        map.on("click", "lugares", (event) => {
          const id = event.features?.[0]?.properties?.id;
          if (typeof id === "string") setActive(id);
        });
        map.on("mouseenter", "lugares", () => {
          map!.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "lugares", () => {
          map!.getCanvas().style.cursor = "";
        });
      });
    })();

    return () => {
      dead = true;
      map?.remove();
      mapRef.current = null;
    };
  }, [focus]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !place) return;
    map.flyTo({ center: [place.lng, place.lat], zoom: place.far ? 4.6 : 8.2, essential: true });
  }, [place]);

  const pill = (id: string) =>
    id === place.id
      ? "w-full rounded-full bg-primary px-3 py-1.5 text-left font-sans text-sm text-primary-foreground"
      : "w-full rounded-full border border-white/10 px-3 py-1.5 text-left font-sans text-sm text-muted-foreground hover:text-foreground";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <div
        className={`bible-map overflow-hidden rounded-[1.5rem] border border-white/10 ${compact ? "h-[22rem]" : "h-[30rem]"}`}
      >
        <div ref={node} className="h-full w-full" />
      </div>
      <div className="folio flex flex-col p-5">
        <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">{place.site}</p>
        <h3 className="mt-2 font-heading text-3xl">{place.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{place.note}</p>
        {place.id === "jerusalem" ? (
          <Link
            href="/historia/jerusalem#entrar"
            className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 px-3 py-1.5 font-sans text-sm text-gold hover:bg-gold/10"
          >
            Entrar na maquete 3D →
          </Link>
        ) : null}
        {scenesHere.length ? (
          <ul className="mt-3 space-y-1 font-sans text-sm">
            {scenesHere.map((scene) => (
              <li key={scene.slug}>
                <Link href={`/reis/${scene.slug}`} className="text-gold hover:underline">
                  {scene.title}
                </Link>
                <span className="text-muted-foreground"> · {scene.ref}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {compact ? null : (
          <>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {near.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => setActive(item.id)} className={pill(item.id)}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Mais longe
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {far.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => setActive(item.id)} className={pill(item.id)}>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
