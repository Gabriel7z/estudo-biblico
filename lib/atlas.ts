import { bookStudies } from "@/lib/book-studies";
import { eras } from "@/lib/eras";
import { polities } from "@/lib/polities";
import { geography } from "@/lib/geography";
import { getGovernment, governments } from "@/lib/governments";
import { getPlace, places } from "@/lib/places";
import { regions } from "@/lib/regions";
import { getRoute, routes } from "@/lib/routes";
import { getStation, stations } from "@/lib/stations";
import { ERA_IDS, type EraId } from "@/lib/types";

export function isEraId(value: string | undefined | null): value is EraId {
  return ERA_IDS.includes(value as EraId);
}

export function eraName(id: EraId): string {
  return eras.find((era) => era.id === id)?.name ?? id;
}

function assertAtlas(): void {
  const problems: string[] = [];
  const placeIds = new Set(places.map((place) => place.id));
  const governmentIds = new Set(governments.map((item) => item.slug));
  const geographyIds = new Set(geography.map((item) => item.slug));
  const routeIds = new Set(routes.map((route) => route.id));

  if (places.length !== 34) {
    problems.push(`esperava 34 lugares, veio ${places.length}`);
  }
  if (stations.length !== 8) problems.push("as estações de Moisés não são oito");
  if (governments.length !== 13) problems.push("os governos não são treze");
  if (geography.length !== 14) problems.push("os verbetes de geografia não são catorze");
  if (eras.length !== 7) problems.push("os períodos não são sete");

  for (const place of places) {
    if (!Number.isFinite(place.lng) || !Number.isFinite(place.lat)) {
      problems.push(`coordenada inválida em ${place.id}`);
    }
    if (place.lat < 24 || place.lat > 38 || place.lng < 29 || place.lng > 48) {
      problems.push(`${place.id} saiu da placa do atlas`);
    }
    if (place.tradition && !place.blurb.toLowerCase().includes("tradi")) {
      problems.push(`${place.id} é tradição e o texto não diz`);
    }
  }

  for (const station of stations) {
    if (!placeIds.has(station.placeId)) problems.push(`estação ${station.slug} sem lugar`);
    if (!governmentIds.has(station.governmentSlug)) {
      problems.push(`estação ${station.slug} sem governo`);
    }
    if (!geographyIds.has(station.geographySlug)) {
      problems.push(`estação ${station.slug} sem geografia`);
    }
  }

  for (const government of governments) {
    if (!isEraId(government.era)) problems.push(`governo ${government.slug} sem era`);
    for (const placeId of government.placeIds) {
      if (!placeIds.has(placeId)) problems.push(`governo ${government.slug} cita ${placeId}`);
    }
  }

  for (const item of geography) {
    if (item.routeId && !routeIds.has(item.routeId)) {
      problems.push(`geografia ${item.slug} cita rota ${item.routeId}`);
    }
    for (const placeId of item.placeIds) {
      if (!getPlace(placeId)) problems.push(`geografia ${item.slug} cita ${placeId}`);
    }
  }

  for (const era of eras) {
    for (const slug of era.governmentSlugs) {
      if (!getGovernment(slug)) problems.push(`era ${era.id} cita governo ${slug}`);
    }
  }

  for (const route of routes) {
    if (route.coordinates.length < 2) problems.push(`rota ${route.id} curta demais`);
    for (const [lng, lat] of route.coordinates) {
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
        problems.push(`vértice inválido em ${route.id}`);
      }
    }
  }

  for (const region of regions) {
    if (region.ring.length < 4) problems.push(`região ${region.id} sem anel`);
    const [first] = region.ring;
    const last = region.ring[region.ring.length - 1];
    if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
      problems.push(`anel aberto em ${region.id}`);
    }
  }

  const traditional = ["mara", "elim", "pitom", "sucote"];
  for (const id of traditional) {
    const place = getPlace(id);
    if (!place?.tradition) problems.push(`${id} precisa estar marcado como tradição`);
  }

  if (!getRoute("exodo")?.color.toLowerCase().includes("8c3d2f")) {
    problems.push("a rota do êxodo não está em cobre");
  }

  for (const book of bookStudies) {
    for (const placeId of book.placeIds) {
      if (!placeIds.has(placeId)) problems.push(`${book.slug} cita lugar ${placeId}`);
    }
    for (const routeId of book.routeIds) {
      if (!routeIds.has(routeId)) problems.push(`${book.slug} cita rota ${routeId}`);
    }
    for (const regionId of book.regionIds) {
      if (!regions.some((region) => region.id === regionId)) {
        problems.push(`${book.slug} cita região ${regionId}`);
      }
    }
  }

  for (const polity of polities) {
    for (const placeId of polity.placeIds) {
      if (!placeIds.has(placeId)) problems.push(`política ${polity.id} cita lugar ${placeId}`);
    }
    for (const regionId of polity.regionIds) {
      if (!regions.some((region) => region.id === regionId)) {
        problems.push(`política ${polity.id} cita região ${regionId}`);
      }
    }
  }

  if (regions.some((region) => region.id === "persia" || region.name === "Pérsia")) {
    problems.push("não desenhe a Pérsia por cima do mapa");
  }

  if (!getStation("o-nebo") || stations[0]?.slug !== "casa-no-egito") {
    problems.push("a ordem das estações quebrou");
  }

  if (problems.length > 0) {
    throw new Error(`Atlas inconsistente:\n${problems.join("\n")}`);
  }
}

assertAtlas();
