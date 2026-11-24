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
      <h1 className="mt-2 font-heading text-4xl tracking-tight text-ink md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lede}</p>
    </header>
  );
}
