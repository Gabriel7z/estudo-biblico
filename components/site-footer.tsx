"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/mapa") return null;

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between md:px-6">
        <div className="max-w-xl">
          <p className="font-heading text-lg">A Terra e o Livro</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            As datas são aproximações de estudo. O faraó do êxodo não é nomeado. A rota em
            cobre segue a reconstrução tradicional do sul, uma leitura entre outras.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm">
          <Link className="hover:text-primary" href="/moises">
            Moisés
          </Link>
          <Link className="hover:text-primary" href="/mapa?era=exodo">
            Mapa
          </Link>
          <Link className="hover:text-primary" href="/tempo">
            Tempo
          </Link>
          <Link className="hover:text-primary" href="/livros">
            Livros
          </Link>
        </div>
      </div>
    </footer>
  );
}
