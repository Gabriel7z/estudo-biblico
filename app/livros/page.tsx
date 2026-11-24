import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { eraName } from "@/lib/atlas";
import { bookSections } from "@/lib/books";

export const metadata: Metadata = {
  title: "Livros",
  description:
    "Os livros do Antigo Testamento na ordem protestante, com uma seção de deuterocanônicos, cada um no seu chão.",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="A prateleira"
        title="Livros no seu chão"
        lede="Cada livro ganha uma frase de lugar e de poder. A ordem é a da Bíblia protestante. A Bíblia hebraica agrupa o mesmo núcleo de outro modo. Os deuterocanônicos, lidos na Bíblia católica, ficam no fim e alguns já entram no período grego."
      />
      <div className="mt-12 space-y-12">
        {bookSections.map((section) => (
          <section key={section.id}>
            <h2 className="font-heading text-3xl">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{section.intro}</p>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {section.books.map((book) => (
                <li key={section.id + book.name} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]">
                  <h3 className="font-heading text-xl">{book.name}</h3>
                  <div>
                    <p className="font-sans text-xs tracking-wide text-copper uppercase">
                      <Link href={`/eras/${book.era}`}>{eraName(book.era)}</Link>
                    </p>
                    <p className="mt-1 leading-relaxed">{book.line}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{book.ground}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
