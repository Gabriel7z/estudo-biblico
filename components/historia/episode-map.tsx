"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";

import { atlasSrc } from "@/lib/imagery";
import { certaintyLabel, kindLabel, sideColor, type Area, type Certainty, type LngLat, type MapLabel, type Side, type StopKind } from "@/lib/historia/types";
import { cn } from "cn";

import "maplibre-gl/dist/maplibre-gl.css";

const WORKER = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/maplibre-gl-worker.js`;
const STYLE = "https://tiles.openfreemap.org/styles/dark";

export type MapStop = {
  n: number;
  siteId: string;
  name: string;
  modern: string;
  certainty: Certainty;
  lng: number;
  lat: number;
  title: string;
  date: string;
  kind: StopKind;
  text: string;
  refs: string;
  archaeology?: string;
};

export type MapRoute = { label: string; side: Side; coords: LngLat[]; dashed?: boolean };

type Props = {
  stops: MapStop[];
  routes: MapRoute[];
  areas: Area[];
  labels: MapLabel[];
  bounds: [number, number, number, number];
  poster: string;
  title: string;
};

const BATTLE: StopKind[] = ["batalha", "cerco"];

function arrowImage(): ImageData {
  const size = 32;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(6, 6);
  ctx.lineTo(28, 16);
  ctx.lineTo(6, 26);
  ctx.lineTo(11, 16);
  ctx.closePath();
  ctx.fill();
  return ctx.getImageData(0, 0, size, size);
}

/** Esconde rótulos, estradas e fronteiras modernas do mapa base. */
function quietBase(map: MapLibreMap) {
  for (const layer of map.getStyle().layers ?? []) {
    const id = layer.id.toLowerCase();
    if (
      layer.type === "symbol" ||
      /road|highway|bridge|tunnel|rail|transit|aeroway|building|boundary|admin|poi|housenumber/.test(id)
    ) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
}

export function EpisodeMap({ stops, routes, areas, labels, bounds, poster, title }: Props) {
  const node = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [active, setActive] = useState(0);
  const follow = useRef(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const stop = stops[active];

  const sitesGeo = useMemo(() => {
    const bySite = new Map<string, { lng: number; lat: number; name: string; nums: number[]; battle: boolean; certainty: Certainty }>();
    for (const item of stops) {
      const entry = bySite.get(item.siteId) ?? { lng: item.lng, lat: item.lat, name: item.name, nums: [], battle: false, certainty: item.certainty };
      entry.nums.push(item.n);
      entry.battle ||= BATTLE.includes(item.kind);
      bySite.set(item.siteId, entry);
    }
    return [...bySite.entries()].map(([id, e]) => ({
      type: "Feature" as const,
      properties: { id, name: e.name, nums: e.nums.join("·"), first: e.nums[0], battle: e.battle ? 1 : 0, uncertain: e.certainty === "debatida" ? 1 : 0 },
      geometry: { type: "Point" as const, coordinates: [e.lng, e.lat] },
    }));
  }, [stops]);

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => setVisible(true), 0);
      return () => globalThis.clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let map: MapLibreMap | undefined;
    let dead = false;
    let observer: ResizeObserver | undefined;
    (async () => {
      const maplibregl = await import("maplibre-gl");
      maplibregl.setWorkerUrl(WORKER);
      if (dead || !node.current) return;
      map = new maplibregl.Map({
        container: node.current,
        style: STYLE,
        bounds: [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ],
        fitBoundsOptions: { padding: 36 },
        attributionControl: { compact: true },
        cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
      });
      mapRef.current = map;
      if ("ResizeObserver" in window) {
        observer = new ResizeObserver(() => map?.resize());
        observer.observe(node.current);
      }
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.on("load", () => {
        if (!map) return;
        quietBase(map);
        map.addImage("seta", arrowImage(), { sdf: true });

        map.addSource("areas", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: areas.map((area) => ({
              type: "Feature",
              properties: { color: sideColor[area.side] },
              geometry: { type: "Polygon", coordinates: [[...area.polygon, area.polygon[0]]] },
            })),
          },
        });
        map.addLayer({ id: "areas-fill", type: "fill", source: "areas", paint: { "fill-color": ["get", "color"], "fill-opacity": 0.1 } });
        map.addLayer({
          id: "areas-line",
          type: "line",
          source: "areas",
          paint: { "line-color": ["get", "color"], "line-opacity": 0.45, "line-width": 1.2, "line-dasharray": [2, 2] },
        });

        map.addSource("rotas", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: routes.map((route) => ({
              type: "Feature",
              properties: { color: sideColor[route.side], dashed: route.dashed ? 1 : 0 },
              geometry: { type: "LineString", coordinates: route.coords },
            })),
          },
        });
        map.addLayer({
          id: "rotas-halo",
          type: "line",
          source: "rotas",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#090d14", "line-width": 6, "line-opacity": 0.55 },
        });
        map.addLayer({
          id: "rotas",
          type: "line",
          source: "rotas",
          filter: ["==", ["get", "dashed"], 0],
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": ["get", "color"], "line-width": 3 },
        });
        map.addLayer({
          id: "rotas-tracejadas",
          type: "line",
          source: "rotas",
          filter: ["==", ["get", "dashed"], 1],
          layout: { "line-join": "round" },
          paint: { "line-color": ["get", "color"], "line-width": 2.4, "line-dasharray": [2, 1.6] },
        });
        map.addLayer({
          id: "setas",
          type: "symbol",
          source: "rotas",
          layout: {
            "symbol-placement": "line",
            "symbol-spacing": 70,
            "icon-image": "seta",
            "icon-size": 0.55,
            "icon-allow-overlap": true,
            "icon-rotation-alignment": "map",
          },
          paint: { "icon-color": ["get", "color"], "icon-halo-color": "#090d14", "icon-halo-width": 1 },
        });

        map.addSource("rotulos", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: labels.map((label) => ({
              type: "Feature",
              properties: { text: label.text, kind: label.kind ?? "regiao" },
              geometry: { type: "Point", coordinates: [label.lng, label.lat] },
            })),
          },
        });
        map.addLayer({
          id: "rotulos",
          type: "symbol",
          source: "rotulos",
          layout: {
            "text-field": ["get", "text"],
            "text-font": ["Noto Sans Regular"],
            "text-size": ["match", ["get", "kind"], "regiao", 13, "povo", 13, 12],
            "text-letter-spacing": ["match", ["get", "kind"], "regiao", 0.25, "povo", 0.2, 0.05],
            "text-max-width": 12,
          },
          paint: {
            "text-color": ["match", ["get", "kind"], "mar", "#7eb0e0", "rio", "#7eb0e0", "povo", "#f0c58a", "#e4c78a"],
            "text-opacity": 0.62,
            "text-halo-color": "#090d14",
            "text-halo-width": 1.2,
          },
        });

        map.addSource("paradas", { type: "geojson", data: { type: "FeatureCollection", features: sitesGeo } });
        map.addLayer({
          id: "paradas-batalha",
          type: "circle",
          source: "paradas",
          filter: ["==", ["get", "battle"], 1],
          paint: { "circle-radius": 17, "circle-color": "#e0645a", "circle-opacity": 0.22, "circle-stroke-color": "#e0645a", "circle-stroke-width": 1.5 },
        });
        map.addLayer({
          id: "paradas-ativa",
          type: "circle",
          source: "paradas",
          filter: ["==", ["get", "id"], ""],
          paint: { "circle-radius": 20, "circle-color": "#fff3cf", "circle-opacity": 0.25 },
        });
        map.addLayer({
          id: "paradas",
          type: "circle",
          source: "paradas",
          paint: {
            "circle-radius": 11,
            "circle-color": "#e4c78a",
            "circle-stroke-color": "#090d14",
            "circle-stroke-width": 2,
            "circle-opacity": ["case", ["==", ["get", "uncertain"], 1], 0.75, 1],
          },
        });
        map.addLayer({
          id: "paradas-num",
          type: "symbol",
          source: "paradas",
          layout: {
            "text-field": ["to-string", ["get", "first"]],
            "text-font": ["Noto Sans Bold"],
            "text-size": 12,
            "text-allow-overlap": true,
          },
          paint: { "text-color": "#1a140c" },
        });
        map.addLayer({
          id: "paradas-nome",
          type: "symbol",
          source: "paradas",
          layout: {
            "text-field": ["concat", ["get", "name"], ["case", ["==", ["get", "uncertain"], 1], " ?", ""]],
            "text-font": ["Noto Sans Regular"],
            "text-size": 12.5,
            "text-offset": [0, 1.35],
            "text-anchor": "top",
            "text-optional": true,
          },
          paint: { "text-color": "#f4eee6", "text-halo-color": "#090d14", "text-halo-width": 1.5 },
        });
        const pick = (event: { features?: { properties?: Record<string, unknown> }[] }) => {
          const id = event.features?.[0]?.properties?.id;
          if (typeof id !== "string") return;
          setActive((current) => {
            const same = stops.findIndex((item, i) => i > current && item.siteId === id);
            if (stops[current]?.siteId === id && same >= 0) return same;
            const first = stops.findIndex((item) => item.siteId === id);
            return first >= 0 ? first : current;
          });
        };
        map.on("click", "paradas", pick);
        map.on("mouseenter", "paradas", () => {
          map!.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "paradas", () => {
          map!.getCanvas().style.cursor = "";
        });
        // Créditos do mapa recolhidos no botão "i" para não cobrir o mapa no celular.
        map!.getContainer().querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
        setReady(true);
      });
    })();
    return () => {
      dead = true;
      observer?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [visible, areas, routes, labels, bounds, sitesGeo, stops]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !stop) return;
    map.setFilter("paradas-ativa", ["==", ["get", "id"], stop.siteId]);
    if (follow.current) {
      follow.current = false;
      map.easeTo({ center: [stop.lng, stop.lat], zoom: Math.max(map.getZoom(), 7.6), duration: 900 });
    }
  }, [stop, ready]);

  const choose = (index: number) => {
    follow.current = true;
    setActive(index);
  };
  const go = (delta: number) => choose((active + delta + stops.length) % stops.length);
  const showAll = () =>
    mapRef.current?.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      { padding: 36, duration: 900 },
    );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]">
      <div className="bible-map relative h-[62vh] min-h-[360px] overflow-hidden rounded-[1.5rem] border border-gold/20 bg-[#0b1018] md:h-[34rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={atlasSrc(poster)}
          alt={`Mapa: ${title}`}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", ready ? "opacity-0" : "opacity-100")}
        />
        <div ref={node} className="absolute inset-0" />
        {ready ? (
          <button
            type="button"
            onClick={showAll}
            className="absolute top-3 left-3 z-10 rounded-full border border-gold/40 bg-[#090d14]/80 px-3 py-1.5 font-sans text-xs text-gold backdrop-blur hover:bg-gold hover:text-[#1a140c]"
          >
            Ver o mapa inteiro
          </button>
        ) : null}
        <div className="map-legend pointer-events-none absolute top-14 left-3 md:top-auto md:bottom-3 z-10 max-w-[70%] rounded-xl px-3 py-2 font-sans text-[11px] leading-snug">
          <span className="mr-3 inline-flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-full border border-[#e0645a] bg-[#e0645a]/30" /> batalha ou cerco
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-full bg-gold/70" /> “?” local debatido
          </span>
        </div>
      </div>
      {stop ? (
        <aside className="folio flex flex-col rounded-[1.5rem] p-5" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
              {stop.n} de {stops.length} · {kindLabel[stop.kind]}
            </p>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => go(-1)} className="rounded-full border border-gold/30 px-3 py-1 font-sans text-sm hover:bg-gold hover:text-[#1a140c]" aria-label="Parada anterior">
                ←
              </button>
              <button type="button" onClick={() => go(1)} className="rounded-full border border-gold/30 px-3 py-1 font-sans text-sm hover:bg-gold hover:text-[#1a140c]" aria-label="Próxima parada">
                →
              </button>
            </div>
          </div>
          <h3 className="mt-3 font-heading text-3xl leading-tight">{stop.title}</h3>
          <p className="mt-1 font-sans text-xs tracking-[0.1em] text-muted-foreground uppercase">
            {stop.date} · {stop.name} ({stop.modern}, {certaintyLabel[stop.certainty]})
          </p>
          <p className="mt-3 leading-relaxed">{stop.text}</p>
          {stop.archaeology ? (
            <p className="mt-3 border-l border-gold/40 pl-3 text-sm leading-relaxed text-muted-foreground">
              <span className="text-gold">Arqueologia. </span>
              {stop.archaeology}
            </p>
          ) : null}
          <p className="mt-3 font-sans text-xs tracking-[0.12em] text-gold uppercase">{stop.refs}</p>
          {stop.siteId === "jerusalem" ? (
            <Link
              href="/historia/jerusalem#entrar"
              className="mt-4 inline-flex w-fit rounded-full bg-gold px-4 py-2 font-sans text-sm font-semibold text-[#1a140c]"
            >
              Entrar na maquete 3D de Jerusalém
            </Link>
          ) : null}
          <ol className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
            {stops.map((item, i) => (
              <li key={`${item.n}-${item.siteId}`}>
                <button
                  type="button"
                  onClick={() => choose(i)}
                  className={cn(
                    "size-8 rounded-full font-sans text-xs",
                    i === active ? "bg-gold text-[#1a140c]" : BATTLE.includes(item.kind) ? "border border-[#e0645a]/60 text-[#f4eee6]" : "border border-white/15 text-muted-foreground",
                  )}
                  title={item.title}
                >
                  {item.n}
                </button>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}
    </div>
  );
}
