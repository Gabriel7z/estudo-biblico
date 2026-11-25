"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { stripTrailingSlash } from "@/lib/path";
import { cn } from "cn";

const links = [
  { href: "/livros", label: "Livros" },
  { href: "/reis", label: "Reis" },
  { href: "/apocalipse", label: "Apocalipse" },
  { href: "/mapa", label: "Mapa" },
  { href: "/governos", label: "Governos" },
  { href: "/geografia", label: "Geografia" },
  { href: "/tempo", label: "Tempo" },
  { href: "/moises", label: "Moisés" },
];

function isActive(pathname: string, href: string): boolean {
  const current = stripTrailingSlash(pathname);
  const target = stripTrailingSlash(href);
  return current === target || current.startsWith(`${target}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-gold/50 font-heading text-lg text-gold">
            T
          </span>
          <span className="leading-none">
            <span className="block font-heading text-lg tracking-tight text-ink md:text-xl">
              A Terra e o Livro
            </span>
            <span className="mt-0.5 block font-sans text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              Antigo Testamento
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 font-sans text-sm",
                isActive(pathname, link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="border-gold/30 bg-background/40 md:hidden"
                aria-label="Abrir o menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle>A Terra e o Livro</SheetTitle>
              <SheetDescription>Antigo Testamento, com o mapa ao lado do texto.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-3 py-2 font-sans text-base",
                        isActive(pathname, link.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground",
                      )}
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
