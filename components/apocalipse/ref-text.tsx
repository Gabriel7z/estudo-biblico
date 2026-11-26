import Link from "next/link";

import { linkifyRefs } from "@/lib/apocalipse-capitulos/refs";

/** Texto com as referências ao Apocalipse transformadas em links para o versículo. */
export function RefText({ text, bareIsAp = true }: { text: string; bareIsAp?: boolean }) {
  const segments = linkifyRefs(text, { bareIsAp });
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <Link
            key={`${segment.href}-${index}`}
            href={segment.href}
            className="text-gold underline decoration-gold/30 underline-offset-2 hover:decoration-gold"
          >
            {segment.label}
          </Link>
        ),
      )}
    </>
  );
}
