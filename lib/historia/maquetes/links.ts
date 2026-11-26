/** Maquetes por lugar do atlas (para os mapas dos episódios). */
export const modelForSite: Record<string, { href: string; label: string }> = {
  jerusalem: { href: "/historia/jerusalem#entrar", label: "Entrar na maquete 3D de Jerusalém" },
  babilonia: { href: "/historia/maquetes/babilonia#entrar", label: "Entrar na maquete 3D de Babilônia" },
  ninive: { href: "/historia/maquetes/ninive#entrar", label: "Entrar na maquete 3D de Nínive" },
  samaria: { href: "/historia/maquetes/samaria#entrar", label: "Entrar na maquete 3D de Samaria" },
};

const herodes = { href: "/historia/maquetes/jerusalem-herodes#entrar", label: "Entrar na maquete 3D da Jerusalém de Herodes" };

/** Nos mapas do Novo Testamento, Jerusalém e seus lugares levam à maquete da cidade de Herodes (c. 30 d.C.). */
export const modelForSiteNT: Record<string, { href: string; label: string }> = Object.fromEntries(
  [
    "jerusalem",
    "templo-herodes",
    "portico-real",
    "arco-robinson",
    "antonia",
    "palacio-herodes",
    "palacio-hasmoneu",
    "cenaculo",
    "caifas",
    "getsemani",
    "golgota",
    "betesda",
    "siloe",
    "oliveiras",
    "dominus-flevit",
    "eleona",
    "tumulo-jardim",
  ].map((id) => [id, herodes]),
);
