"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const Drift = createContext<MotionValue<number> | null>(null);

function Stars() {
  const points = [
    [40, 36],
    [120, 70],
    [210, 28],
    [300, 64],
    [390, 22],
    [470, 58],
    [560, 30],
    [650, 72],
    [740, 34],
    [90, 140],
    [700, 120],
    [180, 110],
    [620, 150],
  ];
  return (
    <g fill="#f4eee6">
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.2} opacity={0.55} />
      ))}
    </g>
  );
}

function Layer({ order, children }: { order: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  const progress = useContext(Drift);
  const fallback = useMotionValue(0);
  const depth = 8 + order * 10;
  const y = useTransform(progress ?? fallback, [0, 1], reduce || !progress ? [0, 0] : [depth, -depth]);
  return (
    <motion.g
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: reduce ? 0 : order * 0.18, duration: 0.6 }}
      style={{ y }}
    >
      {children}
    </motion.g>
  );
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 800 480" className="h-auto w-full" role="img" aria-label={label}>
      <rect width="800" height="480" fill="#10161f" />
      <rect x="16" y="16" width="768" height="448" fill="none" stroke="#e4c78a" strokeOpacity="0.28" />
      <Stars />
      {children}
    </svg>
  );
}

function Patmos() {
  return (
    <Frame label="Sete candelabros e a figura no meio, em Patmos">
      <Layer order={0}>
        <path d="M30 430 C180 360 280 450 430 400 C580 350 680 430 780 380 L780 464 L30 464 Z" fill="#16324a" />
        <path d="M120 400 C170 360 230 390 250 368 C280 390 300 420 250 430 C200 450 150 430 120 400 Z" fill="#243044" />
        <circle cx="168" cy="392" r="5" fill="#f4eee6" opacity="0.7" />
      </Layer>
      <Layer order={1}>
        {[78, 168, 258, 348, 492, 582, 672].map((x) => (
          <g key={x}>
            <line x1={x} y1="318" x2={x} y2="400" stroke="#c6a15a" strokeWidth="4" />
            <path d={`M${x - 16} 300 h32 l-6 20 h-20 z`} fill="#e4c78a" />
            <path d={`M${x - 14} 286 q14 -22 28 0 q-6 12 -14 12 q-8 0 -14 -12 z`} fill="#e07a5f" />
          </g>
        ))}
      </Layer>
      <Layer order={2}>
        <path d="M372 176 L428 176 L446 348 L354 348 Z" fill="#f7f1e8" />
        <path d="M366 214 H434 L428 242 H372 Z" fill="#e4c78a" />
        <path d="M388 158 H412 V180 H388 Z" fill="#f7f1e8" />
        <circle cx="400" cy="136" r="26" fill="#fffaf2" />
        <path d="M374 132 Q400 96 426 132 Q408 116 400 116 Q392 116 374 132 Z" fill="#f4eee6" />
        <ellipse cx="390" cy="140" rx="4" ry="3" fill="#e07a5f" />
        <ellipse cx="410" cy="140" rx="4" ry="3" fill="#e07a5f" />
        <path d="M408 150 L530 168 L408 160 Z" fill="#d5dde8" stroke="#9aa7b8" />
        <path d="M372 210 Q330 240 338 286" fill="none" stroke="#f7f1e8" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={292 + (i % 4) * 16} cy={268 + Math.floor(i / 4) * 16} r="4" fill="#e4c78a" />
        ))}
        <path d="M366 340 h24 l4 22 h-20 z" fill="#c47a45" />
        <path d="M404 340 h24 l6 22 h-20 z" fill="#c47a45" />
      </Layer>
    </Frame>
  );
}

function Igrejas() {
  const names = ["Éfeso", "Esmirna", "Pérgamo", "Tiatira", "Sardes", "Filadélfia", "Laodiceia"];
  return (
    <Frame label="Sete lâmpadas, uma para cada igreja da Ásia">
      <Layer order={0}>
        <path d="M80 360 C200 300 600 300 720 360" fill="none" stroke="#8fd0b4" strokeOpacity="0.4" />
      </Layer>
      {names.map((name, i) => (
        <Layer key={name} order={i + 1}>
          <g>
            <circle cx={110 + i * 95} cy={210} r="28" fill="#182230" stroke="#e4c78a" />
            <path
              d={`M${98 + i * 95} 210 h24 l-4 16 h-16 z`}
              fill="#e4c78a"
            />
            <text x={110 + i * 95} y="280" textAnchor="middle" fill="#f4eee6" fontSize="13" fontFamily="Georgia, serif">
              {name}
            </text>
          </g>
        </Layer>
      ))}
    </Frame>
  );
}

function Trono() {
  return (
    <Frame label="Trono, vinte e quatro anciãos, quatro seres e o mar de vidro">
      <Layer order={0}>
        <ellipse cx="400" cy="360" rx="280" ry="46" fill="#7eb0e0" opacity="0.28" />
        <ellipse cx="400" cy="360" rx="200" ry="28" fill="#d7e7f5" opacity="0.18" />
      </Layer>
      <Layer order={1}>
        <path d="M300 250 q100 -40 200 0 v70 h-200 z" fill="#243044" stroke="#e4c78a" />
        <path d="M330 180 q70 -80 140 0" fill="none" stroke="#8fd0b4" strokeWidth="8" />
      </Layer>
      <Layer order={2}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI * (i + 0.5)) / 12;
          const x = 400 + Math.cos(a) * 250 - 125;
          const y = 300 + Math.sin(a) * 70;
          return <circle key={i} cx={x} cy={y} r="7" fill="none" stroke="#e4c78a" />;
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI * (i + 0.5)) / 12;
          const x = 400 - Math.cos(a) * 250 + 125;
          const y = 300 + Math.sin(a) * 70;
          return <circle key={`b${i}`} cx={x} cy={y} r="7" fill="none" stroke="#e4c78a" />;
        })}
      </Layer>
      <Layer order={3}>
        <text x="120" y="150" fill="#f4eee6" fontSize="28">
          leão
        </text>
        <text x="600" y="150" fill="#f4eee6" fontSize="28">
          bezerro
        </text>
        <text x="90" y="250" fill="#f4eee6" fontSize="28">
          homem
        </text>
        <text x="620" y="250" fill="#f4eee6" fontSize="28">
          águia
        </text>
      </Layer>
    </Frame>
  );
}

function Cordeiro() {
  return (
    <Frame label="Cordeiro com sete chifres e sete olhos diante do livro selado">
      <Layer order={0}>
        <rect x="470" y="150" width="150" height="200" rx="6" fill="#f4eee6" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx="545" cy={175 + i * 24} r="7" fill="none" stroke="#9a1f1f" strokeWidth="3" />
        ))}
      </Layer>
      <Layer order={1}>
        <ellipse cx="300" cy="300" rx="70" ry="36" fill="#f4eee6" />
        <circle cx="360" cy="270" r="22" fill="#f4eee6" />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${338 + i * 6} 252 q4 -16 8 0`} fill="none" stroke="#e4c78a" strokeWidth="2" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={346 + (i % 4) * 7} cy={268 + Math.floor(i / 4) * 8} r="1.6" fill="#10161f" />
        ))}
      </Layer>
    </Frame>
  );
}

function Horse({
  color,
  ink,
  x,
  kind,
}: {
  color: string;
  ink: string;
  x: number;
  kind: "bow" | "sword" | "scales" | "death";
}) {
  return (
    <g transform={`translate(${x} 168)`}>
      <ellipse cx="92" cy="214" rx="72" ry="12" fill="#000" opacity="0.28" />
      <path
        d="M24 168 C40 128 78 118 112 132 C132 112 158 96 186 108 C206 118 210 136 196 146 L184 142 C176 156 168 164 150 168 L168 196 L156 214 L140 188 L118 196 L108 214 L94 214 L106 186 L78 190 L64 214 L50 214 L64 176 C44 184 28 186 24 168 Z"
        fill={color}
        stroke={ink}
        strokeWidth="1.5"
      />
      <path d="M150 120 C138 140 132 160 134 176" fill="none" stroke={ink} strokeWidth="2" opacity="0.7" />
      <circle cx="196" cy="112" r="3" fill={ink} />
      <path d="M96 132 C108 86 126 78 118 118" fill="#243044" stroke="#e4c78a" />
      <circle cx="116" cy="78" r="11" fill="#f4eee6" stroke="#e4c78a" />
      {kind === "bow" ? (
        <g>
          <path d="M100 70 l14 -16 l6 8 l-12 10 z" fill="#e4c78a" />
          <path d="M78 108 q-18 18 2 40" fill="none" stroke="#e4c78a" strokeWidth="2.5" />
          <path d="M78 108 L92 132" stroke="#f4eee6" strokeWidth="1.4" />
        </g>
      ) : null}
      {kind === "sword" ? (
        <path d="M138 96 l34 -46 l6 4 l-32 48 z" fill="#d7dde6" />
      ) : null}
      {kind === "scales" ? (
        <g stroke="#e4c78a" fill="none" strokeWidth="1.6">
          <path d="M132 96 v28" />
          <path d="M116 104 h32" />
          <path d="M116 104 l-8 16 h16 z" fill="#e4c78a" />
          <path d="M148 104 l-8 16 h16 z" fill="#e4c78a" />
        </g>
      ) : null}
      {kind === "death" ? (
        <g>
          <circle cx="116" cy="78" r="11" fill="#1a140c" />
          <path d="M148 150 q28 10 18 36" fill="none" stroke="#6d4c32" strokeWidth="8" opacity="0.85" />
          <text x="92" y="248" textAnchor="middle" fill="#f4eee6" fontSize="13" fontFamily="Georgia, serif">
            Morte
          </text>
        </g>
      ) : (
        <text x="92" y="248" textAnchor="middle" fill="#f4eee6" fontSize="14" fontFamily="Georgia, serif">
          {kind === "bow" ? "branco" : kind === "sword" ? "vermelho" : "preto"}
        </text>
      )}
    </g>
  );
}

function Cavaleiros() {
  return (
    <Frame label="Quatro cavaleiros: branco com arco, vermelho com espada, preto com balança, esverdeado com a Morte">
      <Layer order={0}>
        <path d="M24 400 C180 372 320 418 460 386 C600 354 700 400 780 376 L780 464 L24 464 Z" fill="#1a2433" />
        <path d="M40 392 H760" stroke="#e4c78a" strokeOpacity="0.35" />
      </Layer>
      <Layer order={1}>
        <Horse color="#f7f3ea" ink="#1a140c" x={18} kind="bow" />
      </Layer>
      <Layer order={2}>
        <Horse color="#9a1f1f" ink="#f4eee6" x={206} kind="sword" />
      </Layer>
      <Layer order={3}>
        <Horse color="#161616" ink="#e4c78a" x={394} kind="scales" />
      </Layer>
      <Layer order={4}>
        <Horse color="#b7c36a" ink="#1a140c" x={582} kind="death" />
      </Layer>
    </Frame>
  );
}

function Multidao() {
  return (
    <Frame label="Doze grupos selados e uma multidão sem número">
      <Layer order={0}>
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i}>
            <rect x={70 + (i % 6) * 60} y={80 + Math.floor(i / 6) * 70} width="40" height="48" fill="#182230" stroke="#e4c78a" />
            <text x={90 + (i % 6) * 60} y={108 + Math.floor(i / 6) * 70} textAnchor="middle" fill="#e4c78a" fontSize="11">
              12
            </text>
          </g>
        ))}
      </Layer>
      <Layer order={1}>
        {Array.from({ length: 42 }, (_, i) => (
          <circle
            key={i}
            cx={470 + (i % 7) * 36}
            cy={120 + Math.floor(i / 7) * 42}
            r="10"
            fill="#f4eee6"
            opacity="0.85"
          />
        ))}
      </Layer>
    </Frame>
  );
}

function Trombetas() {
  return (
    <Frame label="Sete trombetas, gafanhotos do abismo e cavaleiros do Eufrates">
      <Layer order={0}>
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M${80 + i * 90} 90 q30 20 10 50`}
            fill="none"
            stroke="#e4c78a"
            strokeWidth="6"
          />
        ))}
      </Layer>
      <Layer order={1}>
        <ellipse cx="220" cy="300" rx="70" ry="28" fill="#243044" />
        <path d="M170 290 q20 -40 50 -10 q20 10 40 0" fill="#8fd0b4" />
        <circle cx="250" cy="270" r="8" fill="#e4c78a" />
        <text x="220" y="360" textAnchor="middle" fill="#f4eee6" fontSize="14">
          abismo
        </text>
      </Layer>
      <Layer order={2}>
        <path d="M430 320 h220" stroke="#7eb0e0" strokeWidth="8" />
        <path d="M500 250 l30 50 h-40 z" fill="#9a1f1f" />
        <path d="M590 250 l30 50 h-40 z" fill="#9a1f1f" />
        <text x="540" y="360" textAnchor="middle" fill="#f4eee6" fontSize="14">
          Eufrates
        </text>
      </Layer>
    </Frame>
  );
}

function Livrinho() {
  return (
    <Frame label="Anjo com um pé no mar e outro na terra, e o livrinho aberto">
      <Layer order={0}>
        <path d="M40 340 h340 v80 h-340 z" fill="#1c2836" />
        <path d="M420 360 h340 v60 h-340 z" fill="#7eb0e0" opacity="0.35" />
      </Layer>
      <Layer order={1}>
        <path d="M360 120 v180" stroke="#f4eee6" strokeWidth="10" />
        <path d="M300 300 h40 v40 h-40 z" fill="#e07a5f" />
        <path d="M460 300 h40 v40 h-40 z" fill="#7eb0e0" />
        <circle cx="360" cy="100" r="26" fill="#f4eee6" />
        <path d="M300 70 q60 -40 120 0" fill="none" stroke="#8fd0b4" strokeWidth="6" />
        <rect x="390" y="150" width="70" height="48" fill="#f4eee6" />
      </Layer>
    </Frame>
  );
}

function Testemunhas() {
  return (
    <Frame label="Duas oliveiras e dois candelabros diante da cidade">
      <Layer order={0}>
        <path d="M250 400 V180 h300 v220" fill="none" stroke="#e4c78a" />
        <rect x="360" y="230" width="80" height="120" fill="#182230" stroke="#f4eee6" />
      </Layer>
      <Layer order={1}>
        <path d="M160 400 v-120 q40 -80 80 0 v120" fill="#8fd0b4" />
        <path d="M560 400 v-120 q40 -80 80 0 v120" fill="#8fd0b4" />
        <line x1="210" y1="250" x2="210" y2="390" stroke="#e4c78a" strokeWidth="4" />
        <line x1="600" y1="250" x2="600" y2="390" stroke="#e4c78a" strokeWidth="4" />
      </Layer>
    </Frame>
  );
}

function Dragao() {
  return (
    <Frame label="Mulher vestida de sol, o filho e o dragão de sete cabeças">
      <Layer order={0}>
        <circle cx="230" cy="210" r="70" fill="#e4c78a" opacity="0.85" />
        <path d="M150 250 q80 20 160 0" fill="#d7dde6" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 12;
          return (
            <circle
              key={i}
              cx={230 + Math.cos(a) * 108}
              cy={150 + Math.sin(a) * 48}
              r="4"
              fill="#f4eee6"
            />
          );
        })}
      </Layer>
      <Layer order={1}>
        <circle cx="300" cy="250" r="12" fill="#f4eee6" />
      </Layer>
      <Layer order={2}>
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={470 + i * 36} cy={180 + (i % 2) * 16} r="16" fill="#9a1f1f" />
        ))}
        <path d="M470 230 q80 80 220 40" fill="none" stroke="#9a1f1f" strokeWidth="18" />
      </Layer>
    </Frame>
  );
}

function Bestas() {
  return (
    <Frame label="Besta do mar com sete cabeças e besta da terra, com o número 666">
      <Layer order={0}>
        <path d="M40 300 q120 40 240 0 v80 h-240 z" fill="#7eb0e0" opacity="0.25" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={80 + i * 32} cy={210} r="14" fill="#243044" stroke="#e4c78a" />
        ))}
        <text x="160" y="360" fill="#f4eee6" fontSize="14">
          mar
        </text>
      </Layer>
      <Layer order={1}>
        <path d="M480 300 q40 -70 90 0 v50 h-90 z" fill="#8fd0b4" />
        <path d="M500 250 q10 -24 16 0" fill="none" stroke="#f4eee6" strokeWidth="3" />
        <path d="M530 250 q10 -24 16 0" fill="none" stroke="#f4eee6" strokeWidth="3" />
      </Layer>
      <Layer order={2}>
        <text x="560" y="160" fill="#e4c78a" fontSize="42" fontFamily="Georgia, serif">
          666
        </text>
      </Layer>
    </Frame>
  );
}

function Seara() {
  return (
    <Frame label="O Cordeiro no Sião, três anjos e a foice da ceifa">
      <Layer order={0}>
        <path d="M80 400 L220 180 L360 400 Z" fill="#1c2836" stroke="#e4c78a" />
        <ellipse cx="220" cy="230" rx="26" ry="14" fill="#f4eee6" />
      </Layer>
      <Layer order={1}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${430 + i * 90} 120)`}>
            <circle cx="20" cy="20" r="16" fill="#182230" stroke="#e4c78a" />
            <path d="M4 28 q16 -20 32 0" fill="none" stroke="#f4eee6" />
            <text x="20" y="70" textAnchor="middle" fill="#e4c78a" fontSize="12">
              {i + 1}
            </text>
          </g>
        ))}
      </Layer>
      <Layer order={2}>
        <path d="M640 250 q40 20 10 80" fill="none" stroke="#e4c78a" strokeWidth="4" />
        <path d="M600 360 h120" stroke="#8fd0b4" strokeWidth="3" />
      </Layer>
    </Frame>
  );
}

function Tacas() {
  return (
    <Frame label="Sete taças derramadas e o ajuntamento em Armagedom">
      <Layer order={0}>
        {Array.from({ length: 7 }, (_, i) => (
          <g key={i} transform={`translate(${70 + i * 95} 80)`}>
            <path d="M10 10 h40 l-8 28 h-24 z" fill="none" stroke="#e4c78a" strokeWidth="3" />
            <path d="M22 38 q8 30 16 0" fill="#9a1f1f" opacity="0.8" />
          </g>
        ))}
      </Layer>
      <Layer order={1}>
        <path d="M120 340 h560" stroke="#7eb0e0" strokeWidth="6" />
        <text x="400" y="390" textAnchor="middle" fill="#f4eee6" fontSize="22" fontFamily="Georgia, serif">
          Armagedom
        </text>
      </Layer>
    </Frame>
  );
}

function Babilonia() {
  return (
    <Frame label="A mulher vestida de púrpura sentada sobre a besta escarlate">
      <Layer order={0}>
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={140 + i * 48} cy={250} r="20" fill="#9a1f1f" />
        ))}
        <path d="M120 290 q200 50 420 0" fill="none" stroke="#9a1f1f" strokeWidth="28" />
      </Layer>
      <Layer order={1}>
        <path d="M300 120 l40 80 h80 l-30 50 h-100 l-30 -50 h80 z" fill="#7a2348" />
        <circle cx="370" cy="100" r="18" fill="#e4c78a" />
        <rect x="420" y="150" width="28" height="40" rx="4" fill="#e4c78a" />
      </Layer>
    </Frame>
  );
}

function Cavaleiro() {
  return (
    <Frame label="O cavaleiro do cavalo branco, com muitos diademas e a espada da boca">
      <Layer order={0}>
        <text x="70" y="90" fill="#e4c78a" fontSize="18" fontFamily="Georgia, serif">
          bodas do Cordeiro
        </text>
        <path d="M70 120 h180 v4 h-180 z" stroke="#f4eee6" />
      </Layer>
      <Layer order={1}>
        <path d="M180 300 q80 -50 180 -10 l30 40 h-230 z" fill="#f4eee6" />
        <circle cx="400" cy="230" r="16" fill="#f4eee6" />
        <path d="M360 180 l30 -16 l30 16 v16 h-60 z" fill="#e4c78a" />
        <path d="M430 230 l70 10" stroke="#d7dde6" strokeWidth="3" />
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={520 + (i % 6) * 28} cy={250 + Math.floor(i / 6) * 36} r="8" fill="#f4eee6" opacity="0.8" />
        ))}
      </Layer>
    </Frame>
  );
}

function Milenio() {
  return (
    <Frame label="O dragão preso, os mil anos e o grande trono branco">
      <Layer order={0}>
        <circle cx="160" cy="250" r="70" fill="#10161f" stroke="#e4c78a" />
        <path d="M120 250 h80 M160 210 v80" stroke="#7eb0e0" strokeWidth="4" />
        <text x="160" y="360" textAnchor="middle" fill="#f4eee6" fontSize="14">
          abismo
        </text>
      </Layer>
      <Layer order={1}>
        <text x="400" y="200" textAnchor="middle" fill="#e4c78a" fontSize="42" fontFamily="Georgia, serif">
          1000
        </text>
        <text x="400" y="230" textAnchor="middle" fill="#f4eee6" fontSize="14">
          anos
        </text>
      </Layer>
      <Layer order={2}>
        <path d="M600 180 h120 v140 h-120 z" fill="#f4eee6" />
        <text x="660" y="360" textAnchor="middle" fill="#f4eee6" fontSize="14">
          trono branco
        </text>
      </Layer>
    </Frame>
  );
}

function Jerusalem() {
  const jewels = ["#e07a5f", "#7eb0e0", "#8fd0b4", "#e4c78a", "#c47a45", "#f4eee6", "#9a1f1f", "#6d4c32", "#d7dde6", "#8fd0b4", "#e4c78a", "#7eb0e0"];
  return (
    <Frame label="Cidade cúbica, doze portas de pérola, rio e árvore da vida">
      <Layer order={0}>
        <path d="M240 170 L400 80 L560 170 L400 260 Z" fill="#31445e" stroke="#e4c78a" strokeWidth="2" />
        <path d="M240 170 L400 260 L400 400 L240 310 Z" fill="#3c5168" stroke="#e4c78a" strokeWidth="2" />
        <path d="M400 260 L560 170 L560 310 L400 400 Z" fill="#2a3c52" stroke="#e4c78a" strokeWidth="2" />
      </Layer>
      <Layer order={1}>
        {[0, 1, 2].map((i) => (
          <g key={`gate${i}`}>
            <circle cx={300} cy={230 + i * 48} r="11" fill="#f7f3ea" stroke="#e4c78a" />
            <circle cx={490} cy={220 + i * 42} r="11" fill="#f7f3ea" stroke="#e4c78a" />
          </g>
        ))}
        {jewels.map((color, i) => (
          <rect key={color + i} x={168 + i * 38} y="438" width="22" height="10" rx="2" fill={color} />
        ))}
      </Layer>
      <Layer order={2}>
        <path d="M400 110 C418 160 412 220 400 250" fill="none" stroke="#7eb0e0" strokeWidth="5" />
        <rect x="396" y="132" width="8" height="28" fill="#6d4c32" />
        <path d="M376 124 q24 -22 48 0 q-10 14 -48 0" fill="#8fd0b4" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={386 + (i % 4) * 8} cy={108 + Math.floor(i / 4) * 6} r="2.1" fill="#e07a5f" />
        ))}
        <text x="400" y="36" textAnchor="middle" fill="#e4c78a" fontSize="14" fontFamily="Georgia, serif">
          12.000 estádios · muralha de 144 côvados
        </text>
      </Layer>
    </Frame>
  );
}

const scenes: Record<string, () => React.JSX.Element> = {
  patmos: Patmos,
  igrejas: Igrejas,
  trono: Trono,
  cordeiro: Cordeiro,
  cavaleiros: Cavaleiros,
  multidao: Multidao,
  trombetas: Trombetas,
  livrinho: Livrinho,
  testemunhas: Testemunhas,
  dragao: Dragao,
  bestas: Bestas,
  seara: Seara,
  tacas: Tacas,
  babilonia: Babilonia,
  cavaleiro: Cavaleiro,
  milenio: Milenio,
  jerusalem: Jerusalem,
};

export function VisionArt({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const Scene = scenes[slug] ?? Patmos;
  return (
    <div ref={ref} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#10161f]">
      <Drift.Provider value={reduce ? null : scrollYProgress}>
        <Scene />
      </Drift.Provider>
    </div>
  );
}
