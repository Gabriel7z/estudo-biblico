# A Terra e o Livro

Atlas de estudo do Antigo Testamento em português do Brasil. O caminho guiado começa em Moisés, do delta do Nilo ao monte Nebo. O resto do cânon entra pelo mapa, pelos governos, pela geografia, pela linha do tempo e pelos livros.

Não há login nem banco. A marca de “estação lida” fica só no navegador, em `localStorage`.

Os trechos no topo de cada estação são paráfrases de estudo, com a referência ao lado, para a pessoa ler o capítulo na Bíblia dela. Nenhuma tradução bíblica é reproduzida.

## Honestidade do mapa

As datas são aproximações de estudo. O faraó do êxodo não é nomeado. Ficam abertas as duas janelas clássicas: cerca de 1446 a.C., a partir de 1 Reis 6:1, e o século XIII a.C., com Ramessés e a estela de Merneptá.

A rota em cobre é a reconstrução tradicional do sul (Ramessés, Pitom, Sucote, o mar, Mara, Elim, Jebel Musa, Cades, Eziom-Geber, a volta a leste de Edom e Moabe, Hesbom, Nebo). Não é um caminho escavado. Mara, Elim, Pitom e Sucote ficam no ponto em que os atlas de estudo costumam colocá-los, e o texto diz que são tradição.

A ordem dos livros é a protestante. Há uma nota sobre a Bíblia hebraica e uma seção de deuterocanônicos. O império persa não é desenhado por cima do mapa: o que aparece é a pequena Yehud.

## Como rodar

Requer Node.js 20.9 ou mais novo.

```bash
npm install
npm run dev
```

Em desenvolvimento o site fica em [http://localhost:3000/estudo-biblico](http://localhost:3000/estudo-biblico), por causa do `basePath` usado no GitHub Pages.

```bash
npm run lint
npm run build
```

O build gera o site estático em `./out`. A publicação é o GitHub Actions em `.github/workflows/pages.yml`, no push para `main`. O endereço publicado é [https://gabriel7z.github.io/estudo-biblico/](https://gabriel7z.github.io/estudo-biblico/).

## Mapa

- Claro: estilo Positron do [OpenFreeMap](https://openfreemap.org/) (OpenMapTiles e OpenStreetMap). Os nomes modernos do mapa-base ficam escondidos.
- Satélite: imagens da Esri.
- Relevo 3D: tiles Terrarium da AWS.
- Projeção globo quando a câmera se afasta.
- Na página do mapa, a rolagem aproxima. Nas outras, a rolagem desce a página.
- Atribuição na placa: OpenFreeMap, OpenMapTiles, OpenStreetMap; no satélite, Esri; no relevo, AWS.
- O `postinstall` copia o worker do MapLibre para `public/maplibre-gl-worker.js`. Sem esse arquivo o mapa vetorial não abre.

## Páginas

- `/` a marcha e os atalhos
- `/moises` e `/moises/[slug]` as oito estações
- `/mapa?era=&lugar=` o mapa que muda com o século
- `/governos` e `/governos/[slug]`
- `/geografia` e `/geografia/[slug]`
- `/tempo` a linha do tempo
- `/eras/[slug]` os sete períodos
- `/livros` a ordem protestante e os deuterocanônicos
