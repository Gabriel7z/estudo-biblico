export type AtlasImage = {
  src: string;
  alt: string;
  credit: string;
};

export const atlasImages = {
  sinai: {
    src: "/atlas/sinai.jpg",
    alt: "Deserto do Sinai, picos e vales rochosos",
    credit: "Deserto do Sinai. Vyacheslav Argenberg, CC BY 4.0, Wikimedia Commons.",
  },
  nile: {
    src: "/atlas/nile.jpg",
    alt: "O Nilo visto do espaço",
    credit: "O Nilo visto do espaço. NASA, domínio público, Wikimedia Commons.",
  },
  jerusalem: {
    src: "/atlas/jerusalem.jpg",
    alt: "Porta de Jafa, em Jerusalém, ao anoitecer",
    credit: "Porta de Jafa ao anoitecer. Jorge Láscar, CC BY 2.0, Wikimedia Commons.",
  },
  isaiah: {
    src: "/atlas/isaiah.jpg",
    alt: "Grande Rolo de Isaías, capítulo 53",
    credit: "Grande Rolo de Isaías, capítulo 53. Fotografia de Ardon Bar Hama. Domínio público, Wikimedia Commons.",
  },
  judean: {
    src: "/atlas/judean.jpg",
    alt: "Deserto da Judeia, perto de Massada",
    credit: "Deserto da Judeia, perto de Massada. Godot13, CC BY-SA 4.0, Wikimedia Commons.",
  },
} satisfies Record<string, AtlasImage>;

export const atlasCredits = Object.values(atlasImages).map((image) => image.credit);

export function atlasSrc(src: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
