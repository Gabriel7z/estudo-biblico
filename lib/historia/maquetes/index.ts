import { babilonia } from "@/lib/historia/maquetes/babilonia";
import { ninive } from "@/lib/historia/maquetes/ninive";
import { samaria } from "@/lib/historia/maquetes/samaria";
import type { CityDef } from "@/lib/historia/maquetes/types";

export const cities: CityDef[] = [babilonia, ninive, samaria];

export function getCity(slug: string): CityDef | undefined {
  return cities.find((city) => city.slug === slug);
}
