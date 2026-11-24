"use client";

import { useEffect, useRef, useState } from "react";
import type { GeoJSONSource, Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import {
  Compass,
  Minus,
  Mountain,
  Pause,
  Play,
  Plus,
  Satellite,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPlace, places } from "@/lib/places";
import { regions } from "@/lib/regions";
import { routes } from "@/lib/routes";
import type { EraId, LngLat, Route } from "@/lib/types";
import { cn } from "cn";

import "maplibre-gl/dist/maplibre-gl.css";

// O bundle do Next não publica o worker ao lado do chunk. Sem este arquivo o
// MapLibre não lê os tiles vetoriais e o mapa fica em branco.
const WORKER = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/maplibre-gl-worker.js`;
const POSITRON = "https://tiles.openfreemap.org/styles/positron";
const GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";
const TERRARIUM = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png";
const ESRI =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const SATELLITE: StyleSpecification = {
  version: 8,
  glyphs: GLYPHS,
  sources: {
    esri: {
      type: "raster",
      tiles: [ESRI],
      tileSize: 256,
      maxzoom: 18,
      attribution: "Esri",
    },
  },
  layers: [{ id: "esri", type: "raster", source: "esri" }],
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    properties: Record<string, string | number | boolean>;
    geometry:
      | { type: "Point"; coordinates: LngLat }
      | { type: "LineString"; coordinates: LngLat[] }
      | { type: "Polygon"; coordinates: LngLat[][] };
  }>;
};

export type BibleMapProps = {
  mode: "home" | "atlas" | "inset";
  era?: EraId;
  placeId?: string;
  className?: string;
  empty?: { title: string; text: string } | null;
  onSelectPlace?: (id: string) => void;
};

function styleFor(basemap: "claro" | "satelite"): string | StyleSpecification {
  return basemap === "satelite" ? SATELLITE : POSITRON;
}

function bearingTo(a: LngLat, b: LngLat): number {
  const φ1 = (a[1] * Math.PI) / 180;
  const φ2 = (b[1] * Math.PI) / 180;
  const Δλ = ((b[0] - a[0]) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function sample(coords: LngLat[], max: number): LngLat[] {
  if (coords.length <= max) return coords;
  const out: LngLat[] = [];
  const step = (coords.length - 1) / (max - 1);
  for (let index = 0; index < max; index += 1) {
    const point = coords[Math.round(index * step)];
    if (point) out.push(point);
  }
  return out;
}

function viewModel(mode: BibleMapProps["mode"], era?: EraId) {
  if (mode === "home") {
    return {
      placeList: places.filter((place) => place.eras.includes("exodo")),
      routeList: routes.filter((route) =>
        ["exodo", "filisteus", "caminho-do-rei"].includes(route.id),
      ),
      regionList: regions.filter((region) => region.eras.includes("exodo")),
    };
  }
  if (!era) {
    return { placeList: [], routeList: [], regionList: [] };
  }
  return {
    placeList: places.filter((place) => place.eras.includes(era)),
    routeList: routes.filter((route) => route.eras.includes(era)),
    regionList: regions.filter((region) => region.eras.includes(era)),
  };
}

function asCollection(data: FeatureCollection): GeoJSON.FeatureCollection {
  return data as GeoJSON.FeatureCollection;
}

export function BibleMap({
  mode,
  era,
  placeId,
  className,
  empty,
  onSelectPlace,
}: BibleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const libRef = useRef<typeof import("maplibre-gl") | null>(null);
  const marchToken = useRef(0);
  const aimed = useRef("");
  const reliefRef = useRef(mode === "home");
  const onSelectRef = useRef<(id: string) => void>(() => undefined);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [basemap, setBasemap] = useState<"claro" | "satelite">("claro");
  const [relief, setRelief] = useState(mode === "home");
  const [playing, setPlaying] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [generation, setGeneration] = useState(0);

  const model = viewModel(mode, era);
  const primary: Route | undefined =
    model.routeList.find((route) => route.id === "exodo") ?? model.routeList[0];

  useEffect(() => {
    onSelectRef.current = onSelectPlace ?? (() => undefined);
  }, [onSelectPlace]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let map: MapLibreMap | null = null;
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled && !map?.isStyleLoaded()) setStatus("error");
    }, 15000);

    (async () => {
      try {
        const maplibre = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        maplibre.setWorkerUrl(WORKER);
        libRef.current = maplibre;
        map = new maplibre.Map({
          container: containerRef.current,
          style: styleFor(basemap),
          center: [35.1, 31.4],
          zoom: mode === "home" ? 3.6 : 5,
          pitch: mode === "home" ? 20 : 0,
          bearing: mode === "home" ? -8 : 0,
          minZoom: 1.2,
          maxZoom: 14,
          maxPitch: 70,
          hash: false,
          attributionControl: false,
          scrollZoom: mode === "atlas",
          dragRotate: true,
          pitchWithRotate: true,
          touchPitch: true,
          touchZoomRotate: true,
          cooperativeGestures: false,
        });
        mapRef.current = map;

        map.on("error", (event) => {
          const sourceId = "sourceId" in event ? event.sourceId : undefined;
          if (sourceId) return;
          const message = event.error?.message ?? "";
          if (/WebGL|initialize|style sprite|Failed to fetch|Worker failed/i.test(message)) {
            setStatus("error");
          }
        });

        map.on("style.load", () => {
          if (!map || cancelled) return;
          for (const layer of map.getStyle().layers ?? []) {
            if (layer.type === "symbol" && !layer.id.startsWith("bib-")) {
              map.setLayoutProperty(layer.id, "visibility", "none");
            }
          }
          map.setProjection({ type: "globe" });
          if (!map.getSource("aws-dem")) {
            map.addSource("aws-dem", {
              type: "raster-dem",
              tiles: [TERRARIUM],
              encoding: "terrarium",
              tileSize: 256,
              maxzoom: 13,
              attribution: "AWS",
            });
          }
          map.setTerrain(
            reliefRef.current ? { source: "aws-dem", exaggeration: 1.3 } : null,
          );
          map.resize();
          setGeneration((value) => value + 1);
          setStatus("ready");
          window.clearTimeout(timeout);
        });
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      marchToken.current += 1;
      map?.remove();
      mapRef.current = null;
      aimed.current = "";
    };
    // O mapa nasce uma vez por tentativa. O estilo muda nos efeitos seguintes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, mode]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || generation === 0) return;
    const isSatellite = map.getStyle()?.layers?.some((layer) => layer.id === "esri") ?? false;
    if (isSatellite === (basemap === "satelite")) return;
    setStatus("loading");
    map.setStyle(styleFor(basemap));
  }, [basemap, generation]);

  useEffect(() => {
    reliefRef.current = relief;
    const map = mapRef.current;
    if (!map?.getSource("aws-dem")) return;
    map.setTerrain(relief ? { source: "aws-dem", exaggeration: 1.3 } : null);
  }, [relief, generation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || status !== "ready") return;
    const view = viewModel(mode, era);

    const placeData: FeatureCollection = {
      type: "FeatureCollection",
      features: view.placeList.map((place) => ({
        type: "Feature",
        properties: {
          id: place.id,
          name: place.name,
          tradition: Boolean(place.tradition),
        },
        geometry: { type: "Point", coordinates: [place.lng, place.lat] },
      })),
    };
    const routeData: FeatureCollection = {
      type: "FeatureCollection",
      features: view.routeList.map((route) => ({
        type: "Feature",
        properties: { id: route.id, name: route.name, color: route.color, dashed: route.dashed },
        geometry: { type: "LineString", coordinates: route.coordinates },
      })),
    };
    const regionData: FeatureCollection = {
      type: "FeatureCollection",
      features: view.regionList.map((region) => ({
        type: "Feature",
        properties: {
          id: region.id,
          name: region.name,
          color: region.color,
          tone: region.tone,
          large: region.largeLabel,
        },
        geometry: { type: "Polygon", coordinates: [region.ring] },
      })),
    };
    const labelData: FeatureCollection = {
      type: "FeatureCollection",
      features: view.regionList
        .filter((region) => region.largeLabel)
        .map((region) => ({
          type: "Feature",
          properties: { name: region.name },
          geometry: { type: "Point", coordinates: region.label },
        })),
    };

    const upsert = (id: string, data: FeatureCollection) => {
      const source = map.getSource(id);
      if (source?.type === "geojson") {
        (source as GeoJSONSource).setData(asCollection(data));
        return;
      }
      map.addSource(id, { type: "geojson", data: asCollection(data) });
    };

    upsert("bib-regions", regionData);
    upsert("bib-routes", routeData);
    upsert("bib-places", placeData);
    upsert("bib-region-labels", labelData);

    if (!map.getLayer("bib-regions")) {
      map.addLayer({
        id: "bib-regions",
        type: "fill",
        source: "bib-regions",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": [
            "match",
            ["get", "tone"],
            "reino",
            0.22,
            "imperio",
            0.16,
            0.12,
          ],
        },
      });
      map.addLayer({
        id: "bib-region-line",
        type: "line",
        source: "bib-regions",
        paint: { "line-color": ["get", "color"], "line-width": 1.2, "line-opacity": 0.75 },
      });
      map.addLayer({
        id: "bib-routes-solid",
        type: "line",
        source: "bib-routes",
        filter: ["==", ["get", "dashed"], false],
        paint: {
          "line-color": ["get", "color"],
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            ["case", ["==", ["get", "id"], "exodo"], 2.4, 1.4],
            8,
            ["case", ["==", ["get", "id"], "exodo"], 4.2, 2.6],
          ],
        },
        layout: { "line-cap": "round", "line-join": "round" },
      });
      map.addLayer({
        id: "bib-routes-dashed",
        type: "line",
        source: "bib-routes",
        filter: ["==", ["get", "dashed"], true],
        paint: {
          "line-color": ["get", "color"],
          "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1.3, 8, 2.4],
          "line-dasharray": [1.5, 1.3],
        },
        layout: { "line-cap": "butt", "line-join": "round" },
      });
      map.addLayer({
        id: "bib-places",
        type: "circle",
        source: "bib-places",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 3.5, 8, 6.5],
          "circle-color": ["case", ["get", "tradition"], "#8c3d2f", "#224b41"],
          "circle-stroke-width": 1.6,
          "circle-stroke-color": "#f6efe1",
        },
      });
      map.addLayer({
        id: "bib-place-labels",
        type: "symbol",
        source: "bib-places",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 4, 11, 8, 14],
          "text-offset": [0, 1.05],
          "text-anchor": "top",
          "text-max-width": 10,
          "text-allow-overlap": true,
          "text-padding": 0,
        },
        paint: {
          "text-color": "#241c16",
          "text-halo-color": "#f6efe1",
          "text-halo-width": 1.5,
        },
      });
      map.addLayer({
        id: "bib-region-labels",
        type: "symbol",
        source: "bib-region-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 3, 16, 6, 22],
          "text-letter-spacing": 0.14,
          "text-transform": "uppercase",
        },
        paint: {
          "text-color": "#241c16",
          "text-halo-color": "#f6efe1",
          "text-halo-width": 2,
        },
      });

      const onClick = (event: { features?: { properties?: { id?: unknown } }[] }) => {
        const id = event.features?.[0]?.properties?.id;
        if (typeof id === "string") onSelectRef.current(id);
      };
      map.on("click", "bib-places", onClick);
      map.on("mouseenter", "bib-places", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "bib-places", () => {
        map.getCanvas().style.cursor = "";
      });
    }
  }, [generation, status, mode, era]);

  useEffect(() => {
    const map = mapRef.current;
    const lib = libRef.current;
    if (!map || !lib || status !== "ready") return;
    const view = viewModel(mode, era);
    const key = `${mode}:${era ?? ""}:${placeId ?? ""}`;
    if (aimed.current === key) return;
    aimed.current = key;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (mode === "home") {
      const view = { center: [34.35, 29.55] as LngLat, zoom: 5.35, pitch: 58, bearing: -22 };
      if (reduce) {
        map.jumpTo(view);
        return;
      }
      map.jumpTo({ center: [34.1, 29.1], zoom: 3.5, pitch: 18, bearing: -8 });
      map.once("idle", () => {
        map.flyTo({ ...view, duration: 4600, essential: true });
      });
      return;
    }

    if (placeId) {
      const place = getPlace(placeId);
      if (place) {
        map.flyTo({
          center: [place.lng, place.lat],
          zoom: mode === "inset" ? 7.3 : 8,
          pitch: reliefRef.current ? 50 : 16,
          duration: reduce ? 0 : 900,
          essential: true,
        });
        return;
      }
    }

    const bounds = new lib.LngLatBounds();
    if (view.placeList.length === 0) {
      map.easeTo({ center: [35.2, 31.4], zoom: 5, duration: reduce ? 0 : 600 });
      return;
    }
    for (const place of view.placeList) bounds.extend([place.lng, place.lat]);
    for (const route of view.routeList) {
      for (const coord of route.coordinates) bounds.extend(coord);
    }
    const wide = typeof window !== "undefined" && window.innerWidth >= 768;
    map.fitBounds(bounds, {
      padding:
        mode === "atlas"
          ? wide
            ? { top: 78, right: 40, bottom: 64, left: 360 }
            : { top: 68, right: 16, bottom: 210, left: 16 }
          : 40,
      duration: reduce ? 0 : 900,
      maxZoom: mode === "inset" ? 7.2 : 5.8,
      pitch: reliefRef.current ? 46 : 0,
    });
  }, [status, mode, era, placeId, generation]);

  async function playMarch() {
    const map = mapRef.current;
    if (!map || !primary) return;
    if (playing) {
      marchToken.current += 1;
      map.stop();
      setPlaying(false);
      return;
    }
    const token = ++marchToken.current;
    setPlaying(true);
    const coords = sample(primary.coordinates, primary.id === "exodo" ? 12 : 8);
    for (let index = 0; index < coords.length; index += 1) {
      if (marchToken.current !== token) return;
      const here = coords[index];
      const next = coords[Math.min(index + 1, coords.length - 1)];
      if (!here || !next) continue;
      await new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, 2300);
        map.once("moveend", () => {
          window.clearTimeout(timer);
          resolve();
        });
        map.flyTo({
          center: here,
          zoom: mode === "home" ? 6.25 : 6.6,
          pitch: 54,
          bearing: bearingTo(here, next),
          duration: 1650,
          essential: true,
        });
      });
    }
    if (marchToken.current === token) setPlaying(false);
  }

  function zoomBy(delta: number) {
    mapRef.current?.zoomTo(mapRef.current.getZoom() + delta, { duration: 250 });
  }

  function faceNorth() {
    mapRef.current?.easeTo({
      bearing: 0,
      pitch: relief ? 50 : 0,
      duration: 700,
    });
  }

  const credit =
    basemap === "claro"
      ? "OpenFreeMap · OpenMapTiles · OpenStreetMap"
      : "Esri";
  const creditLine = relief ? `${credit} · Relevo: AWS` : credit;

  return (
    <div className={cn("bible-map relative h-full min-h-64 w-full bg-[#e6e0d2]", className)}>
      <div ref={containerRef} className="h-full w-full" role="application" aria-label="Mapa do Antigo Testamento" />

      {status === "loading" ? (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#efe2cc]/80">
          <p className="font-sans text-sm text-muted-foreground">Abrindo o mapa…</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#f6efe1] p-6 text-center">
          <div className="max-w-sm">
            <p className="kicker">O mapa não abriu</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              A geografia não carregou. Pode ser a rede, o bloqueio dos mapas ou a falta de WebGL
              neste navegador.
            </p>
            <Button
              type="button"
              className="mt-4 h-10 px-4"
              onClick={() => {
                setStatus("loading");
                setAttempt((value) => value + 1);
              }}
            >
              Tentar de novo
            </Button>
          </div>
        </div>
      ) : null}

      {status === "ready" ? (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <Button type="button" size="icon" variant="outline" className="bg-background" aria-label="Aproximar" onClick={() => zoomBy(1)}>
            <Plus />
          </Button>
          <Button type="button" size="icon" variant="outline" className="bg-background" aria-label="Afastar" onClick={() => zoomBy(-1)}>
            <Minus />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={relief ? "default" : "outline"}
            className={relief ? "" : "bg-background"}
            aria-pressed={relief}
            aria-label={relief ? "Voltar ao mapa plano" : "Inclinar e mostrar o relevo"}
            onClick={() => {
              const next = !relief;
              setRelief(next);
              mapRef.current?.easeTo({ pitch: next ? 55 : 0, duration: 800 });
            }}
          >
            <Mountain />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={basemap === "satelite" ? "default" : "outline"}
            className={basemap === "satelite" ? "" : "bg-background"}
            aria-pressed={basemap === "satelite"}
            aria-label="Satélite"
            onClick={() => setBasemap((value) => (value === "claro" ? "satelite" : "claro"))}
          >
            <Satellite />
          </Button>
          <Button type="button" size="icon" variant="outline" className="bg-background" aria-label="Norte" onClick={faceNorth}>
            <Compass />
          </Button>
          {primary ? (
            <Button type="button" variant="outline" className="h-8 bg-background px-2 text-xs" onClick={playMarch}>
              {playing ? <Pause /> : <Play />}
              {playing ? "Parar" : primary.id === "exodo" ? "Ver a marcha" : "Seguir a rota"}
            </Button>
          ) : null}
        </div>
      ) : null}

      {status === "ready" && empty && mode !== "atlas" ? (
        <div className="absolute top-16 right-3 left-3 z-10 max-w-sm rounded-lg border border-border bg-card p-4 shadow-sm md:top-3 md:right-auto md:left-3">
          <p className="kicker">Placa vazia</p>
          <p className="mt-1 font-heading text-xl">{empty.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{empty.text}</p>
        </div>
      ) : null}

      {status === "ready" && mode !== "atlas" ? (
        <div className="pointer-events-none absolute bottom-7 left-2 z-10 max-w-[16rem] rounded-md bg-[#f6efe1]/92 px-2.5 py-1.5 text-[11px] leading-relaxed text-ink shadow-sm">
          <ul className="space-y-0.5">
            {model.routeList.map((route) => (
              <li key={route.id} className="flex items-center gap-2">
                <span
                  className="inline-block h-0.5 w-5"
                  style={{
                    background: route.dashed
                      ? `repeating-linear-gradient(90deg, ${route.color} 0 5px, transparent 5px 8px)`
                      : route.color,
                  }}
                />
                {route.name}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-[10px] text-muted-foreground">{creditLine}</p>
        </div>
      ) : null}

      {status === "ready" && mode === "atlas" ? (
        <p className="pointer-events-none absolute top-3 left-3 z-10 max-w-[16rem] text-[10px] leading-snug text-[#241c16] md:top-auto md:right-3 md:bottom-2 md:left-auto md:text-right">
          {creditLine}
        </p>
      ) : null}
    </div>
  );
}
