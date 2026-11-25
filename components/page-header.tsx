export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="kicker">{kicker}</p>
      <h1 className="mt-2 font-heading text-5xl tracking-tight text-ink md:text-6xl">{title}</h1>
      <p className="ornament mt-4 text-xs tracking-[0.28em] uppercase">✦</p>
      <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">{lede}</p>
    </header>
  );
}
