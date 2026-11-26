"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { ErrorBoundary } from "@/components/error-boundary";
import type { WalkInput } from "@/components/cities/city-model";
import { atlasSrc } from "@/lib/imagery";
import { getCity } from "@/lib/historia/maquetes";
import { cn } from "cn";

const CityModel = dynamic(() => import("@/components/cities/city-model").then((mod) => mod.CityModel), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-[#16110b] font-sans text-sm text-gold">
      Levantando a cidade…
    </div>
  ),
});

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function Joystick({ onMove }: { onMove: (x: number, y: number) => void }) {
  const base = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const update = (e: React.PointerEvent) => {
    const el = base.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    let dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    setKnob({ x: dx, y: dy });
    onMove(dx, -dy);
  };
  const end = () => {
    setKnob({ x: 0, y: 0 });
    onMove(0, 0);
  };
  return (
    <div
      ref={base}
      className="absolute bottom-5 left-5 z-20 size-28 touch-none rounded-full border border-gold/40 bg-[#090d14]/55 backdrop-blur"
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        update(e);
      }}
      onPointerMove={(e) => {
        if (e.buttons || e.pointerType === "touch") update(e);
      }}
      onPointerUp={end}
      onPointerCancel={end}
      aria-label="Joystick para andar"
      role="application"
    >
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 size-11 rounded-full bg-gold/80 shadow-lg"
        style={{ transform: `translate(calc(-50% + ${knob.x * 36}px), calc(-50% + ${knob.y * 36}px))` }}
      />
    </div>
  );
}

export function CityStage({ slug, fallback }: { slug: string; fallback: ReactNode }) {
  const city = getCity(slug)!;
  const [started, setStarted] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [mode, setMode] = useState<"orbita" | "caminhar">("orbita");
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [touch, setTouch] = useState(false);
  const input = useRef<WalkInput>({ keys: new Set(), joy: { x: 0, y: 0 }, look: { dx: 0, dy: 0 }, teleport: null });
  const frame = useRef<HTMLDivElement>(null);

  const moveJoy = useCallback((x: number, y: number) => {
    input.current.joy = { x, y };
  }, []);

  const start = useCallback(() => {
    const ok = hasWebGL();
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    setWebgl(ok);
    setStarted(true);
  }, []);

  useEffect(() => {
    const open = () => {
      if (window.location.hash !== "#entrar") return;
      start();
      frame.current?.scrollIntoView({ block: "center" });
    };
    const timer = window.setTimeout(open, 0);
    window.addEventListener("hashchange", open);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", open);
    };
  }, [start]);

  useEffect(() => {
    if (!started || mode !== "caminhar") return;
    const keys = input.current.keys;
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"].includes(key)) {
        if (key.startsWith("arrow")) e.preventDefault();
        keys.add(key);
      }
    };
    const up = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      keys.clear();
    };
  }, [started, mode]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", esc);
    };
  }, [expanded]);

  const spot = city.hotspots.find((item) => item.id === selected);

  const goThere = () => {
    if (!spot) return;
    input.current.teleport = spot.at;
    setMode("caminhar");
  };

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 font-sans text-xs transition md:text-sm",
      active ? "bg-gold text-[#1a140c]" : "bg-[#090d14]/70 text-[#f4eee6] hover:bg-[#090d14]/90",
    );

  if (started && !webgl) {
    return (
      <div>
        {fallback}
        <p className="mt-3 text-sm text-muted-foreground">
          Este aparelho não abriu gráficos 3D (WebGL). A planta acima mostra os mesmos muros, rios e lugares.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={frame}
        className={cn(
          "relative overflow-hidden border border-gold/30 bg-[#16110b]",
          expanded ? "fixed inset-0 z-[60] rounded-none" : "h-[72vh] min-h-[420px] rounded-[1.5rem] md:h-[78vh]",
        )}
      >
        {!started ? (
          <button type="button" onClick={start} className="group absolute inset-0 block h-full w-full text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={atlasSrc(city.poster)}
              alt={city.posterAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-95"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#090d14] via-[#090d14]/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <span className="kicker block">Maquete 3D</span>
              <span className="mt-2 block font-heading text-3xl text-white md:text-5xl">Entrar na cidade</span>
              <span className="mt-3 block max-w-xl text-sm text-[#f4eee6]/80 md:text-base">
                Gire em volta da cidade, toque nos nomes e caminhe pelas ruas na altura dos olhos.
              </span>
              <span className="mt-5 inline-flex rounded-full bg-gold px-5 py-2.5 font-sans text-sm font-semibold text-[#1a140c]">
                Abrir a maquete
              </span>
            </span>
          </button>
        ) : (
          <ErrorBoundary
            fallback={
              <div className="h-full overflow-auto p-4">
                {fallback}
                <p className="mt-3 text-sm text-muted-foreground">A maquete 3D falhou neste aparelho. A planta acima tem o mesmo conteúdo.</p>
              </div>
            }
          >
            <CityModel slug={slug} mode={mode} selected={selected} onSelect={setSelected} input={input} resetKey={resetKey} />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start justify-between gap-2 p-3">
              <p className="pointer-events-none rounded-full border border-gold/30 bg-[#090d14]/55 px-3 py-1.5 font-sans text-xs text-[#f4eee6] backdrop-blur md:text-sm">
                {city.name} <span className="opacity-70">{city.date}</span>
              </p>
              <div className="pointer-events-auto flex flex-wrap gap-1.5 rounded-full border border-gold/30 bg-[#090d14]/55 p-1 backdrop-blur">
                <button type="button" className={pill(mode === "orbita")} onClick={() => setMode("orbita")}>
                  Vista aérea
                </button>
                <button type="button" className={pill(mode === "caminhar")} onClick={() => setMode("caminhar")}>
                  Caminhar
                </button>
                <button type="button" className={pill(false)} onClick={() => setResetKey((k) => k + 1)}>
                  Recomeçar
                </button>
                <button type="button" className={pill(expanded)} onClick={() => setExpanded((v) => !v)}>
                  {expanded ? "Sair da tela cheia" : "Tela cheia"}
                </button>
              </div>
            </div>
            {mode === "caminhar" && touch ? <Joystick onMove={moveJoy} /> : null}
            <p className="pointer-events-none absolute right-3 bottom-3 z-10 max-w-[16rem] rounded-xl bg-[#090d14]/60 px-3 py-2 text-right font-sans text-[11px] leading-snug text-[#f4eee6]/85 backdrop-blur"
              style={mode === "caminhar" && touch ? { bottom: "8.5rem" } : undefined}
            >
              {mode === "caminhar"
                ? touch
                  ? "Joystick para andar, arraste a tela para olhar."
                  : "W A S D ou setas para andar, Shift corre, arraste para olhar."
                : touch
                  ? "Um dedo gira, dois aproximam. Toque num nome."
                  : "Arraste para girar, roda para aproximar, botão direito para mover. Clique num nome."}
            </p>
            {spot ? (
              <aside className="absolute bottom-3 left-3 z-30 max-h-[55%] w-[min(26rem,calc(100%-1.5rem))] overflow-auto rounded-2xl border border-gold/40 bg-[#090d14]/88 p-4 shadow-2xl backdrop-blur-md md:top-16 md:bottom-auto md:left-auto md:right-3 md:max-h-[calc(100%-6rem)]"
                style={mode === "caminhar" && touch ? { bottom: "9rem" } : undefined}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-2xl text-white">{spot.name}</h3>
                  <button type="button" onClick={() => setSelected(null)} className="font-sans text-sm text-muted-foreground hover:text-white" aria-label="Fechar">
                    ✕
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#f4eee6]/90">{spot.text}</p>
                {spot.note ? <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{spot.note}</p> : null}
                <p className="mt-3 font-sans text-xs tracking-[0.12em] text-gold uppercase">{spot.refs}</p>
                <button type="button" onClick={goThere} className="mt-3 rounded-full border border-gold/50 px-3 py-1.5 font-sans text-xs text-gold hover:bg-gold hover:text-[#1a140c]">
                  Ir até lá a pé
                </button>
              </aside>
            ) : null}
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
