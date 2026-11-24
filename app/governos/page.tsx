import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { governments } from "@/lib/governments";

export const metadata: Metadata = {
  title: "Governos",
  description: "Fichas dos poderes que o Antigo Testamento nomeia, da corte do faraó à província persa.",
};

export default function GovernmentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="Quem manda"
        title="Governos da época"
        lede="Do faraó que não tem nome à província persa que não tem rei. Cada ficha diz onde o poder se sentava, como ele entra na narrativa e o que olhar no mapa."
      />
      <ol className="mt-10 divide-y divide-border border-y border-border">
        {governments.map((government) => (
          <li key={government.slug} className="grid gap-2 py-5 sm:grid-cols-[4rem_1fr]">
            <p className="font-heading text-copper">
              {String(government.order).padStart(2, "0")}
            </p>
            <div>
              <p className="font-sans text-xs tracking-wide text-muted-foreground uppercase">
                {government.kind}
              </p>
              <h2 className="mt-1 font-heading text-2xl">
                <Link className="hover:text-primary" href={`/governos/${government.slug}`}>
                  {government.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {government.capital} · {government.centuries}
              </p>
              <p className="mt-2 leading-relaxed">{government.lede}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
