import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { KingsTimeline } from "@/components/reis/kings-timeline";

export const metadata: Metadata = {
  title: "Reis de Israel e Judá",
  description:
    "Todos os reis de Israel e de Judá lado a lado, com datas aproximadas, o veredito de 1 e 2 Reis e os profetas de cada reinado.",
};

export default function CronologiaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">
        <Link href="/reis" className="hover:text-gold">
          Reis
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Cronologia
      </p>
      <PageHeader
        kicker="Israel e Judá · 931–586 a.C."
        title="Os reis de Israel e Judá"
        lede="Dezenove reis no norte, em nove dinastias (mais Tibni, que disputou o trono com Onri), e vinte governantes no sul, todos da casa de Davi menos Atalia. Ao lado de cada nome: o veredito que o próprio livro dá, as referências e os profetas que atuaram no reinado."
      />

      <div className="folio mt-8 p-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          <span className="text-foreground">Datas aproximadas.</span> Os anos seguem em geral a
          cronologia de Edwin Thiele (<em>The Mysterious Numbers of the Hebrew Kings</em>), uma entre
          várias propostas; outras diferem em alguns anos. Reinados que se sobrepõem indicam
          corregências (pai e filho governando juntos) ou reis rivais. A barra mostra o reinado na
          escala de 931 a 586 a.C.
        </p>
        <p className="mt-3">
          <span className="text-foreground">Profetas.</span> Nomes entre parênteses aparecem em 2
          Crônicas, não em Reis. Profetas literários (Amós, Oseias, Isaías, Miqueias, Jeremias...)
          estão ligados aos reis citados no início dos seus livros. “Naum?” indica datação incerta.
        </p>
      </div>

      <div className="mt-8">
        <KingsTimeline />
      </div>
    </div>
  );
}
