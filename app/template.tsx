import type { ReactNode } from "react";

// Não animar a opacidade da página inteira. O Framer gravava opacity:0 no HTML
// e, no Safari do iPhone (e com JavaScript desligado), a animação não concluía:
// sobrava só o cabeçalho sobre o fundo escuro.
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
