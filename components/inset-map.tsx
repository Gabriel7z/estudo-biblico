import { BibleMap, type BibleMapProps } from "@/components/bible-map";

export function InsetMap({
  era,
  placeId,
  caption,
}: {
  era: BibleMapProps["era"];
  placeId?: string;
  caption?: string;
}) {
  return (
    <figure className="plate">
      <div className="plate-inner h-80 md:h-[420px]">
        <BibleMap mode="inset" era={era} placeId={placeId} />
      </div>
      <figcaption className="px-1 pt-2 text-xs leading-relaxed text-muted-foreground">
        {caption ??
          "Arraste para mover. A rolagem da página continua. A rota em cobre é a reconstrução tradicional do sul."}
      </figcaption>
    </figure>
  );
}
