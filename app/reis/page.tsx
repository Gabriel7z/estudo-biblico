import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { atlasSrc } from "@/lib/imagery";
import { reisScenes, type ReisScene } from "@/lib/reis";

export const metadata: Metadata = {
  title: "1 e 2 Reis",
  description:
    "1 e 2 Reis destrinchados: 25 cenas pintadas com contexto histórico e arqueológico, todos os reis de Israel e Judá, o mapa do reino dividido e a planta do Templo de Salomão.",
};

const extras = [
  {
    href: "/historia",
    kicker: "Mapas e guerras",
    title: "Um mapa para cada episódio",
    text: "Samuel e Reis em 23 mapas com marchas e cercos, a linha do tempo sincronizada com Assíria, Babilônia e Egito, o índice das guerras e a maquete 3D de Jerusalém.",
  },
  {
    href: "/reis/cronologia",
    kicker: "Cronologia",
    title: "Todos os reis, lado a lado",
    text: "De Saul a Zedequias: os reis de Israel e Judá com datas aproximadas, o veredito do texto e os profetas de cada reinado. Dá para filtrar.",
  },
  {
    href: "/reis/mapa",
    kicker: "Mapa",
    title: "O reino dividido",
    text: "Samaria, Jerusalém, Betel, Dã, o Carmelo, Jezreel e os lugares para onde a história vai: Damasco, Nínive, Babilônia.",
  },
  {
    href: "/reis/templo-de-salomao",
    kicker: "Planta",
    title: "O Templo de Salomão",
    text: "Átrio, Jaquim e Boaz, o mar de fundição, o santo lugar e o santo dos santos, com as medidas em côvados de 1 Reis 6–7.",
  },
];

function SceneCard({ scene }: { scene: ReisScene }) {
  return (
    <li>
      <Link
        href={`/reis/${scene.slug}`}
        className="folio group flex h-full flex-col overflow-hidden rounded-[1.25rem] hover:border-gold/50"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-gold/15 bg-[#0b1018]">
          <Image
            src={atlasSrc(scene.image)}
            alt={scene.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090d14]/75 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 font-sans text-[11px] tracking-[0.18em] text-gold uppercase">
            {String(scene.order).padStart(2, "0")} · {scene.ref}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-2xl">{scene.title}</h3>
          <p className="mt-1 font-sans text-xs tracking-[0.12em] text-muted-foreground uppercase">{scene.date}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{scene.happens[0]}</p>
        </div>
      </Link>
    </li>
  );
}

export default function ReisPage() {
  const first = reisScenes.filter((scene) => scene.book === "1 Reis");
  const second = reisScenes.filter((scene) => scene.book === "2 Reis");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <PageHeader
        kicker="1 e 2 Reis"
        title="De Salomão ao exílio"
        lede="Cerca de quatro séculos, de Davi idoso (c. 970 a.C.) até um rei de Judá comendo à mesa do rei de Babilônia (c. 561 a.C.). O reino de Salomão se divide, o norte cai diante da Assíria, o sul diante de Babilônia. Pelo caminho, Elias e Eliseu. Cada cena abaixo tem o que acontece no texto, o contexto histórico e geográfico com o que a arqueologia diz e onde ela diverge, e o que a passagem significa no livro."
      />

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {extras.map((item) => (
          <Link key={item.href} href={item.href} className="folio block rounded-[1.25rem] p-6 hover:border-gold/50">
            <p className="kicker">{item.kicker}</p>
            <h2 className="mt-2 font-heading text-2xl md:text-3xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="folio mt-10 p-6 md:p-8">
        <h2 className="font-heading text-3xl">Como ler Reis</h2>
        <div className="mt-4 grid gap-6 text-muted-foreground md:grid-cols-3">
          <p className="leading-relaxed">
            <span className="text-foreground">Uma régua só.</span> Cada rei é medido por uma pergunta:
            fez o que era reto aos olhos do Senhor, como Davi, ou andou no pecado de Jeroboão? Poder,
            riqueza e vitórias quase não entram na conta.
          </p>
          <p className="leading-relaxed">
            <span className="text-foreground">Duas histórias entrelaçadas.</span> Depois de 1 Reis 12 o
            narrador alterna entre Israel e Judá, datando cada rei pelo ano do rei do outro reino. É
            daí que vêm os quebra-cabeças da cronologia.
          </p>
          <p className="leading-relaxed">
            <span className="text-foreground">Profetas no centro.</span> Aías, Elias, Micaías, Eliseu,
            Isaías e Hulda falam e a história cumpre. Reis é também uma resposta à pergunta do exílio:
            por que caímos, e ainda há esperança?
          </p>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-4xl md:text-5xl">1 Reis</h2>
          <Link href="/livros/1-reis" className="font-sans text-sm text-gold hover:underline">
            Estudo do livro
          </Link>
        </div>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Salomão, o Templo, a divisão do reino e o confronto de Elias com Acabe e Jezabel.
        </p>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {first.map((scene) => (
            <SceneCard key={scene.slug} scene={scene} />
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-heading text-4xl md:text-5xl">2 Reis</h2>
          <Link href="/livros/2-reis" className="font-sans text-sm text-gold hover:underline">
            Estudo do livro
          </Link>
        </div>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Eliseu, a revolta de Jeú, a queda de Samaria, Ezequias, Josias e o exílio em Babilônia.
        </p>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {second.map((scene) => (
            <SceneCard key={scene.slug} scene={scene} />
          ))}
        </ol>
      </section>

      <p className="mt-14 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        As pinturas são interpretações artísticas. Seguem os detalhes do texto, mas roupas,
        arquitetura e paisagens são aproximações. Os textos parafraseiam a Bíblia, com capítulo e
        versículo, para conferir na tradução de sua preferência.
      </p>
    </div>
  );
}
