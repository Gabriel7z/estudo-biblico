import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { bookOrder, episodePoster, episodes } from "@/lib/historia";
import { wars } from "@/lib/historia/guerras";
import { hotspots } from "@/lib/historia/jerusalem";
import { events } from "@/lib/historia/linha-do-tempo";
import { atlasSrc } from "@/lib/imagery";

export const metadata: Metadata = {
  title: "História de Samuel a Reis",
  description:
    "Um mapa para cada episódio de 1 Samuel a 2 Reis, linha do tempo sincronizada com os impérios, índice das guerras e a maquete 3D de Jerusalém.",
};

export default function HistoriaPage() {
  const stopCount = episodes.reduce((sum, episode) => sum + episode.stops.length, 0);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <PageHeader
        kicker="Contexto histórico · 1100–586 a.C."
        title="A história, mapa por mapa"
        lede={`Cada episódio de Samuel e Reis com seu próprio mapa: ${episodes.length} mapas, ${stopCount} paradas explicadas, marchas, cercos e fronteiras. Tudo ligado a uma linha do tempo que mostra o que os impérios faziam no mesmo ano, e a uma maquete de Jerusalém que dá para atravessar a pé.`}
      />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link href="/historia/jerusalem" className="folio group relative overflow-hidden p-0 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={atlasSrc("/historia/jerusalem-maquete.webp")} alt="" className="h-44 w-full object-cover opacity-90 transition group-hover:opacity-100" />
          <div className="p-5">
            <p className="kicker">Maquete 3D</p>
            <p className="mt-1 font-heading text-2xl">Jerusalém de Davi a Ezequias</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Vales, muralhas, templo, Giom e o túnel de Ezequias. Vista aérea ou caminhando. {hotspots.length} pontos explicados.
            </p>
          </div>
        </Link>
        <Link href="/historia/linha-do-tempo" className="folio group p-6">
          <p className="kicker">Linha do tempo</p>
          <p className="mt-1 font-heading text-2xl">Tudo ao mesmo tempo</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Israel, Judá, profetas, Assíria, Babilônia, Egito, Pérsia e gregos em faixas paralelas, de 1100 a 160 a.C. {events.length}{" "}
            acontecimentos datados.
          </p>
          <p className="mt-4 font-sans text-sm text-gold">Abrir →</p>
        </Link>
        <Link href="/historia/guerras" className="folio group p-6">
          <p className="kicker">Guerras</p>
          <p className="mt-1 font-heading text-2xl">{wars.length} conflitos</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Quem lutou, por quê, como terminou, e o que dizem a Estela de Mesa, o Prisma de Senaqueribe, as Crônicas Babilônicas e outras fontes.
          </p>
          <p className="mt-4 font-sans text-sm text-gold">Abrir →</p>
        </Link>
      </section>

      {bookOrder.map((book) => {
        const list = episodes.filter((episode) => episode.book === book.book);
        return (
          <section key={book.book} id={book.slug} className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-heading text-3xl md:text-4xl">{book.book}</h2>
              <Link href={`/livros/${book.slug}`} className="font-sans text-sm text-gold hover:underline">
                Ler o livro →
              </Link>
            </div>
            <p className="mt-1 text-muted-foreground">{book.blurb}</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((episode) => (
                <li key={episode.slug}>
                  <Link href={`/historia/mapas/${episode.slug}`} className="folio group block h-full overflow-hidden p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={atlasSrc(episode.image ?? episodePoster(episode.slug))}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover opacity-90 transition group-hover:opacity-100"
                    />
                    <div className="p-5">
                      <p className="font-sans text-[11px] tracking-[0.14em] text-gold uppercase">
                        {episode.date} · {episode.ref}
                      </p>
                      <p className="mt-1 font-heading text-xl leading-snug">{episode.title}</p>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{episode.summary}</p>
                      <p className="mt-3 font-sans text-xs text-muted-foreground">{episode.stops.length} paradas no mapa</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="folio mt-14 p-6 md:p-8">
        <p className="kicker">Em preparação</p>
        <h2 className="mt-1 font-heading text-2xl md:text-3xl">Isaías, Jeremias, Ezequiel e Daniel</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          A próxima fase traz os mapas dos profetas (a Assíria de Isaías, a queda de Judá vista por Jeremias, o exílio de
          Ezequiel junto ao Quebar, a Babilônia e a Pérsia de Daniel) e as maquetes de Babilônia, Nínive e Samaria. Enquanto
          isso, os profetas já aparecem na linha do tempo.
        </p>
      </section>
    </div>
  );
}
