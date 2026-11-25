import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { TemplePlan, templeLegend } from "@/components/reis/temple-plan";

export const metadata: Metadata = {
  title: "Planta do Templo de Salomão",
  description:
    "Planta do Templo de Salomão segundo 1 Reis 6–7: átrio, Jaquim e Boaz, mar de fundição, santo lugar, santo dos santos e querubins, com as medidas em côvados.",
};

const measures = [
  ["Casa", "60 × 20 × 30 côvados", "1 Rs 6:2"],
  ["Pórtico", "20 de largura × 10 de fundo", "1 Rs 6:3"],
  ["Santo lugar", "40 × 20", "1 Rs 6:17"],
  ["Santo dos santos", "20 × 20 × 20 (cubo)", "1 Rs 6:20"],
  ["Câmaras laterais", "3 andares: 5, 6 e 7 de largura", "1 Rs 6:6"],
  ["Querubins", "10 de altura, asas de 5 + 5", "1 Rs 6:23–27"],
  ["Jaquim e Boaz", "18 de altura, 12 de circunferência, capitéis de 5", "1 Rs 7:15–16"],
  ["Mar de fundição", "10 de diâmetro, 5 de altura, sobre 12 bois", "1 Rs 7:23–25"],
  ["Suportes das pias", "4 × 4 × 3, dez ao todo", "1 Rs 7:27, 38"],
];

export default function TemploPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <p className="kicker">
        <Link href="/reis" className="hover:text-gold">
          Reis
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        Templo
      </p>
      <PageHeader
        kicker="1 Reis 6–7"
        title="O Templo de Salomão"
        lede="Visto de cima, com a entrada para o leste. Quem entrava passava pelo átrio, pelo altar de bronze e pelas colunas Jaquim e Boaz; atravessava o pórtico e o santo lugar; e só o sumo sacerdote entrava, uma vez por ano, no cubo dourado do santo dos santos, onde a arca ficava debaixo das asas dos querubins."
      />

      <div className="mt-10">
        <TemplePlan />
      </div>

      <ol className="mt-8 grid gap-3 md:grid-cols-2">
        {templeLegend.map((item) => (
          <li key={item.n} className="folio flex gap-4 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-primary-foreground">
              {item.n}
            </span>
            <div>
              <p className="font-heading text-xl">{item.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              <p className="mt-1 font-sans text-xs tracking-[0.12em] text-gold uppercase">{item.ref}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="folio p-6">
          <h2 className="font-heading text-3xl">Medidas</h2>
          <table className="mt-4 w-full text-left text-sm">
            <tbody>
              {measures.map(([name, value, ref]) => (
                <tr key={name} className="border-t border-white/8">
                  <th className="py-2 pr-3 font-normal text-foreground">{name}</th>
                  <td className="py-2 pr-3 text-muted-foreground">{value}</td>
                  <td className="py-2 font-sans text-xs whitespace-nowrap text-gold">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-muted-foreground">
            O côvado ia do cotovelo à ponta dos dedos: cerca de 45 cm no comum e 52 cm no real.
          </p>
        </div>
        <div className="folio p-6">
          <h2 className="font-heading text-3xl">O que sabemos e o que não</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Nada do templo de Salomão foi escavado: o monte do templo nunca foi aberto à arqueologia.
            Esta planta é reconstrução a partir do texto. A espessura das paredes, a posição exata do
            mar e dos suportes e se o santo dos santos tinha o piso elevado ou o teto mais baixo (30
            côvados de casa contra 20 do cubo) são pontos discutidos.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            O plano em três partes em linha (pórtico, sala, santuário), com duas colunas na entrada e
            câmaras em volta, tem paralelos próximos em templos sírios da Idade do Ferro, como Ain Dara
            e Tell Tayinat. As medidas do altar vêm de 2 Crônicas 4:1, porque Reis não as dá.
          </p>
          <p className="mt-4">
            <Link href="/reis/templo" className="text-gold hover:underline">
              A construção do Templo →
            </Link>
            <span className="mx-3 text-muted-foreground">·</span>
            <Link href="/reis/dedicacao" className="text-gold hover:underline">
              A dedicação →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
