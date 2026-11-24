import type { Route } from "@/lib/types";

const COPPER = "#8c3d2f";
const INK = "#5c5148";
const ROAD = "#3e5870";
const KINGDOM = "#224b41";
const CLAN = "#7a5a32";

/**
 * A linha do êxodo é a reconstrução tradicional do sul:
 * Ramessés, Pitom, Sucote, o mar, Mara, Elim, Jebel Musa, Cades,
 * Eziom-Geber, a volta a leste de Edom e Moabe, Hesbom, Nebo.
 * Não é um caminho escavado.
 */
export const routes: Route[] = [
  {
    id: "exodo",
    name: "Rota do êxodo",
    color: COPPER,
    dashed: false,
    eras: ["exodo"],
    note: "Reconstrução tradicional do sul, em cobre. Não é um caminho medido no chão.",
    coordinates: [
      [31.838, 30.798],
      [31.988, 30.547],
      [32.099, 30.553],
      [32.28, 30.35],
      [32.55, 29.95],
      [32.62, 29.7],
      [32.78, 29.48],
      [32.97, 29.3],
      [33.08, 29.16],
      [33.4, 28.9],
      [33.7, 28.7],
      [33.975, 28.539],
      [34.15, 28.85],
      [34.35, 29.45],
      [34.42, 30.05],
      [34.441, 30.646],
      [34.55, 30.2],
      [34.75, 29.85],
      [34.98, 29.548],
      [35.55, 29.5],
      [36.05, 29.85],
      [36.2, 30.45],
      [36.2, 31.05],
      [36.1, 31.45],
      [35.95, 31.7],
      [35.809, 31.799],
      [35.726, 31.767],
    ],
  },
  {
    id: "filisteus",
    name: "Caminho dos filisteus",
    color: INK,
    dashed: true,
    eras: ["exodo", "juizes", "monarquia", "dividido"],
    note: "A estrada da costa que o texto diz não ter sido tomada.",
    coordinates: [
      [32.32, 30.86],
      [32.85, 31.12],
      [33.55, 31.27],
      [34.15, 31.38],
      [34.466, 31.502],
      [34.546, 31.664],
      [34.78, 31.95],
    ],
  },
  {
    id: "via-maris",
    name: "Via Maris",
    color: ROAD,
    dashed: false,
    eras: ["juizes", "monarquia", "dividido", "exilio", "persia"],
    note: "A estrada internacional do Egito a Damasco, pelo passo de Megido.",
    coordinates: [
      [32.4, 30.9],
      [33.8, 31.32],
      [34.466, 31.502],
      [34.546, 31.664],
      [34.85, 32.08],
      [35.05, 32.35],
      [35.185, 32.585],
      [35.35, 32.8],
      [35.568, 33.018],
      [35.9, 33.28],
      [36.292, 33.513],
    ],
  },
  {
    id: "caminho-do-rei",
    name: "Caminho do rei",
    color: KINGDOM,
    dashed: false,
    eras: ["exodo", "juizes", "monarquia", "dividido"],
    note: "A estrada do planalto, de Eziom-Geber a Damasco. Edom não a cede na marcha.",
    coordinates: [
      [34.98, 29.548],
      [35.3, 30.15],
      [35.607, 30.747],
      [35.7, 31.1],
      [35.785, 31.499],
      [35.809, 31.799],
      [35.934, 31.954],
      [36.05, 32.45],
      [36.15, 33.0],
      [36.292, 33.513],
    ],
  },
  {
    id: "patriarcas",
    name: "Arco dos patriarcas",
    color: CLAN,
    dashed: true,
    eras: ["patriarcas"],
    note: "De Ur a Harã, de Canaã ao delta. Um arco, não um império.",
    coordinates: [
      [46.103, 30.963],
      [45.1, 31.7],
      [44.421, 32.536],
      [43.4, 34.2],
      [41.2, 35.7],
      [39.031, 36.863],
      [37.5, 36.15],
      [36.7, 35.1],
      [36.292, 33.513],
      [35.55, 32.7],
      [35.282, 32.214],
      [35.239, 31.926],
      [35.109, 31.525],
      [34.841, 31.245],
      [33.5, 30.95],
      [32.15, 30.72],
    ],
  },
  {
    id: "retorno",
    name: "Volta do exílio",
    color: KINGDOM,
    dashed: true,
    eras: ["persia"],
    note: "O arco percorrido de volta, da Babilônia a Jerusalém. Não é o território da Pérsia.",
    coordinates: [
      [44.421, 32.536],
      [43.3, 34.3],
      [40.8, 36.1],
      [39.03, 36.86],
      [36.7, 35.2],
      [36.292, 33.513],
      [35.55, 32.4],
      [35.233, 31.768],
    ],
  },
];

export function routesInEra(era: string): Route[] {
  return routes.filter((route) => route.eras.includes(era as Route["eras"][number]));
}

export function getRoute(id: string): Route | undefined {
  return routes.find((route) => route.id === id);
}
