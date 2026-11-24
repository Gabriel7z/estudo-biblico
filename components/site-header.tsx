"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
  { href: "/moises", label: "Moisés" },
  { href: "/mapa", label: "Mapa" },
  { href: "/governos", label: "Governos" },
  { href: "/geografia", label: "Geografia" },
  { href: "/tempo", label: "Tempo" },
  { href: "/livros", label: "Livros" },
];

function isActive(pathname: string, href: string): boolean {
  const current = stripTrailingSlash(pathname);
  const target = stripTrailingSlash(href);
  return current === target || current.startsWith(`${target}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-sm bg-primary font-heading text-sm text-primary-foreground">
            T
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px]">A Terra e o Livro</span>
            <span className="block font-sans text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              Antigo Testamento
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-2.5 py-1.5 font-sans text-sm hover:text-foreground",
                isActive(pathname, link.href)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
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
                className="md:hidden"
                aria-label="Abrir o menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
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
                        "rounded-md px-2 py-2 font-sans text-base",
                        isActive(pathname, link.href)
                          ? "bg-secondary text-foreground"
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
