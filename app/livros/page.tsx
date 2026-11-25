import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { eraName } from "@/lib/atlas";
import { bookSections } from "@/lib/books";
import { studyForName } from "@/lib/book-studies";

export const metadata: Metadata = {
  title: "Livros",
  description:
    "Os livros do Antigo Testamento na ordem protestante, com uma seção de deuterocanônicos, cada um no seu chão.",
};

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="A prateleira"
        title="Livros no seu chão"
        lede="A entrada do atlas é o livro no seu chão. O Pentateuco, os doze históricos, os profetas do mesmo século e, marcados à parte, os deuterocanônicos têm página própria, com história, governo e mapa. A ordem da prateleira continua sendo a protestante. A Bíblia hebraica agrupa o mesmo núcleo de outro modo."
      />
      <div className="mt-12 space-y-12">
        {bookSections.map((section) => (
          <section key={section.id}>
            <h2 className="font-heading text-3xl">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{section.intro}</p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {section.books.map((book) => {
                const study = studyForName(book.name);
                return (
                  <li key={section.id + book.name} className="folio p-4">
                    <h3 className="font-heading text-2xl">
                      {study ? (
                        <Link className="hover:text-primary" href={`/livros/${study.slug}`}>
                          {book.name}
                        </Link>
                      ) : (
                        book.name
                      )}
                    </h3>
                    <p className="mt-1 font-sans text-xs tracking-wide text-copper uppercase">
                      <Link href={`/eras/${book.era}`}>{eraName(book.era)}</Link>
                    </p>
                    <p className="mt-2 leading-relaxed">{book.line}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{book.ground}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
