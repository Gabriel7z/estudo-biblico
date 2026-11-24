import { BibleMap, type BibleMapProps, type MapFocus } from "@/components/bible-map";

export function InsetMap({
  era,
  placeId,
  focus,
  caption,
}: {
  era: BibleMapProps["era"];
  placeId?: string;
  focus?: MapFocus;
  caption?: string;
}) {
  return (
    <figure className="plate">
      <div className="plate-inner h-80 md:h-[420px]">
        <BibleMap mode="inset" era={era} placeId={placeId} focus={focus} />
      </div>
      <figcaption className="px-1 pt-2 text-xs leading-relaxed text-muted-foreground">
        {caption ??
          "Arraste para mover. A rolagem da página continua. A rota em cobre é a reconstrução tradicional do sul."}
      </figcaption>
    </figure>
  );
}
