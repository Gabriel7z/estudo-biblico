import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Suspense } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "@/lib/atlas";
import "./globals.css";

const outfit = Inter({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "A Terra e o Livro",
    template: "%s · A Terra e o Livro",
  },
  description:
    "Atlas de estudo bíblico, do Antigo Testamento à vida de Jesus e ao Apocalipse: mapas, maquetes 3D, governos e geografia de cada época.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
        >
          Ir para o conteúdo
        </a>
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <SiteHeader />
        </Suspense>
        <noscript>
          <style>{`main [style*="opacity:0"], main [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <main id="conteudo" className="flex-1 pt-16">
          {children}
        </main>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  );
}
