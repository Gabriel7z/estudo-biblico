import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { geography, geographyGroups } from "@/lib/geography";

export const metadata: Metadata = {
  title: "Geografia",
  description: "Regiões, águas e rotas que explicam o Antigo Testamento, do delta ao Eufrates.",
};

export default function GeographyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="O chão"
        title="Geografia da época"
        lede="O relevo não é cenário. Explica por que a saída não usa a costa, por que Jerusalém fica fora da grande estrada e por que o último olhar de Moisés é um vale fundo."
      />
      <div className="mt-12 space-y-12">
        {geographyGroups.map((group) => (
          <section key={group.id}>
            <h2 className="font-heading text-3xl">{group.title}</h2>
            <p className="mt-2 text-muted-foreground">{group.lede}</p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {geography
                .filter((item) => item.kind === group.id)
                .map((item) => (
                  <li key={item.slug} className="py-4">
                    <h3 className="font-heading text-2xl">
                      <Link className="hover:text-primary" href={`/geografia/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{item.lede}</p>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
