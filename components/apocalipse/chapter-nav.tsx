import Link from "next/link";

import { cn } from "cn";

/**
 * Barra de capítulos fixa no topo (abaixo do cabeçalho do site).
 * Só links renderizados no servidor: funciona sem JavaScript e rola na horizontal no celular.
 */
export function ChapterNav({
  current,
  active,
  className,
}: {
  current?: number;
  active?: "tribulacao" | "simbolos";
  className?: string;
}) {
  return (
    <nav
      aria-label="Capítulos do Apocalipse"
      className={cn(
        "sticky top-16 z-30 -mx-4 border-y border-gold/15 bg-[#090d14]/92 backdrop-blur-md md:-mx-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] md:px-6">
        <Link
          href="/apocalipse"
          className="mr-1 shrink-0 rounded-full px-3 py-1.5 font-sans text-[11px] tracking-[0.16em] text-gold uppercase hover:bg-white/5"
        >
          Ap
        </Link>
        {Array.from({ length: 22 }, (_, index) => index + 1).map((n) => (
          <Link
            key={n}
            href={`/apocalipse/capitulo/${n}`}
            aria-current={n === current ? "page" : undefined}
            className={cn(
              "grid h-8 min-w-7 shrink-0 place-items-center rounded-full px-1 font-sans text-sm tabular-nums",
              n === current
                ? "bg-gold font-semibold text-[#1a140c]"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            )}
          >
            {n}
          </Link>
        ))}
        <Link
          href="/apocalipse/tribulacao"
          aria-current={active === "tribulacao" ? "page" : undefined}
          className={cn(
            "ml-1 shrink-0 rounded-full border px-3 py-1.5 font-sans text-[11px] tracking-[0.16em] uppercase",
            active === "tribulacao"
              ? "border-gold bg-gold text-[#1a140c]"
              : "border-gold/30 text-gold hover:border-gold",
          )}
        >
          Tribulação
        </Link>
        <Link
          href="/apocalipse/simbolos"
          aria-current={active === "simbolos" ? "page" : undefined}
          className={cn(
            "ml-1 shrink-0 rounded-full border px-3 py-1.5 font-sans text-[11px] tracking-[0.16em] uppercase",
            active === "simbolos"
              ? "border-gold bg-gold text-[#1a140c]"
              : "border-gold/30 text-gold hover:border-gold",
          )}
        >
          Símbolos
        </Link>
      </div>
    </nav>
  );
}
