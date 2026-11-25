"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

import { churches } from "@/lib/apocalipse";

import "maplibre-gl/dist/maplibre-gl.css";

const WORKER = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/maplibre-gl-worker.js`;
const STYLE = "https://tiles.openfreemap.org/styles/dark";

export function ChurchesMap() {
  const node = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [active, setActive] = useState(churches[0]?.id ?? "efeso");
  const church = churches.find((item) => item.id === active) ?? churches[0];

  useEffect(() => {
    const container = node.current;
    if (!container) return;
    let map: MapLibreMap | undefined;
    let dead = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      maplibregl.setWorkerUrl(WORKER);
      if (dead || !node.current) return;
      map = new maplibregl.Map({
        container: node.current,
        style: STYLE,
        center: [28.15, 38.45],
        zoom: 6.15,
        attributionControl: false,
      });
      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.on("load", () => {
        if (!map) return;
        map.addSource("igrejas", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: churches.map((item, index) => ({
              type: "Feature",
              properties: { id: item.id, name: item.name, order: String(index + 1) },
              geometry: { type: "Point", coordinates: [item.lng, item.lat] },
            })),
          },
        });
        map.addLayer({
          id: "igrejas-halo",
          type: "circle",
          source: "igrejas",
          paint: {
            "circle-radius": 16,
            "circle-color": "#e4c78a",
            "circle-opacity": 0.2,
          },
        });
        map.addLayer({
          id: "igrejas",
          type: "circle",
          source: "igrejas",
          paint: {
            "circle-radius": 7,
            "circle-color": "#e4c78a",
            "circle-stroke-color": "#090d14",
            "circle-stroke-width": 2,
          },
        });
        map.addLayer({
          id: "igrejas-nome",
          type: "symbol",
          source: "igrejas",
          layout: {
            "text-field": ["concat", ["get", "order"], "  ", ["get", "name"]],
            "text-font": ["Noto Sans Regular"],
            "text-size": 13,
            "text-offset": [0, 1.35],
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#e4c78a",
            "text-halo-color": "#090d14",
            "text-halo-width": 1.4,
          },
        });
        map.on("click", "igrejas", (event) => {
          const id = event.features?.[0]?.properties?.id;
          if (typeof id === "string") setActive(id);
        });
        map.on("mouseenter", "igrejas", () => {
          map!.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "igrejas", () => {
          map!.getCanvas().style.cursor = "";
        });
      });
    })();

    return () => {
      dead = true;
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !church) return;
    map.flyTo({ center: [church.lng, church.lat], zoom: 8, essential: true });
  }, [church]);

  if (!church) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <div className="bible-map h-[28rem] overflow-hidden rounded-[1.5rem] border border-white/10">
        <div ref={node} className="h-full w-full" />
      </div>
      <div className="folio flex flex-col p-5">
        <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">{church.ref}</p>
        <h3 className="mt-2 font-heading text-3xl">{church.name}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{church.letter}</p>
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {churches.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                className={
                  item.id === church.id
                    ? "w-full rounded-full bg-primary px-3 py-1.5 text-left font-sans text-sm text-primary-foreground"
                    : "w-full rounded-full border border-white/10 px-3 py-1.5 text-left font-sans text-sm text-muted-foreground hover:text-foreground"
                }
              >
                {index + 1}. {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
