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
      <h1 className="mt-3 font-heading text-5xl tracking-tight text-ink md:text-7xl">{title}</h1>
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
      <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">{lede}</p>
    </header>
  );
}
