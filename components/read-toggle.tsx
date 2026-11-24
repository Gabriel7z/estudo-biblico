"use client";

import { useSyncExternalStore } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  readStationsServerSnapshot,
  readStationsSnapshot,
  subscribeReadStations,
  writeStation,
} from "@/lib/progress";

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function useReadSlugs(): string[] {
  const raw = useSyncExternalStore(
    subscribeReadStations,
    readStationsSnapshot,
    readStationsServerSnapshot,
  );
  return parse(raw);
}

export function ReadToggle({ slug }: { slug: string }) {
  const read = useReadSlugs().includes(slug);

  return (
    <Button
      type="button"
      variant={read ? "secondary" : "default"}
      className="h-10 px-4"
      onClick={() => writeStation(slug, !read)}
    >
      {read ? <Check /> : null}
      {read ? "Estação lida neste navegador" : "Marcar esta estação como lida"}
    </Button>
  );
}
