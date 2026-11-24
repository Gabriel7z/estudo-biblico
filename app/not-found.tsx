import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <p className="kicker">Fora da placa</p>
      <h1 className="mt-2 font-heading text-4xl">Essa página não está no atlas.</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        O endereço não corresponde a uma estação, um governo ou um lugar deste estudo.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants(), "h-10 px-4")}>
          Voltar ao início
        </Link>
        <Link
          href="/mapa?era=exodo"
          className={cn(buttonVariants({ variant: "outline" }), "h-10 bg-background px-4")}
        >
          Abrir o mapa
        </Link>
      </div>
    </div>
  );
}
