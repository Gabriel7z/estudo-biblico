import type { Site } from "@/lib/historia/types";

/**
 * Gazetteer dos mapas por episódio. Coordenadas do sítio arqueológico (graus decimais),
 * conferidas com o Wikidata quando há registro. Onde a identificação é discutida,
 * `certainty` diz isso e o mapa mostra o ponto como provável ou debatido.
 */
export const sites: Site[] = [
  // Terra de Israel: centro e sul
  { id: "jerusalem", name: "Jerusalém", modern: "Cidade de Davi e monte do Templo", lat: 31.7767, lng: 35.2353, certainty: "segura" },
  { id: "oliveiras", name: "Monte das Oliveiras", modern: "a leste do vale do Cedrom", lat: 31.7779, lng: 35.2457, certainty: "segura" },
  { id: "belem", name: "Belém", modern: "Belém", lat: 31.7044, lng: 35.2064, certainty: "segura" },
  { id: "hebrom", name: "Hebrom", modern: "Tel Rumeida", lat: 31.5244, lng: 35.1036, certainty: "segura" },
  { id: "silo", name: "Siló", modern: "Khirbet Seilun", lat: 32.0557, lng: 35.2895, certainty: "segura" },
  { id: "ebenezer", name: "Ebenézer", modern: "Izbet Sartah (proposta)", lat: 32.1047, lng: 34.9681, certainty: "debatida" },
  { id: "afeque", name: "Afeque", modern: "Tel Afeq (Antipátride)", lat: 32.1053, lng: 34.9306, certainty: "segura" },
  { id: "asdode", name: "Asdode", modern: "Tel Ashdod", lat: 31.7543, lng: 34.6628, certainty: "segura" },
  { id: "gate", name: "Gate", modern: "Tell es-Safi", lat: 31.6994, lng: 34.8467, certainty: "segura" },
  { id: "ecrom", name: "Ecrom", modern: "Tel Miqne", lat: 31.7789, lng: 34.8511, certainty: "segura" },
  { id: "ascalom", name: "Ascalom", modern: "Tel Ashkelon", lat: 31.6658, lng: 34.5664, certainty: "segura" },
  { id: "gaza", name: "Gaza", modern: "Tell Harube, Gaza", lat: 31.511, lng: 34.458, certainty: "segura" },
  { id: "bete-semes", name: "Bete-Semes", modern: "Tel Beit Shemesh", lat: 31.7517, lng: 34.975, certainty: "segura" },
  { id: "quiriate-jearim", name: "Quiriate-Jearim", modern: "Deir el-Azar", lat: 31.8033, lng: 35.1, certainty: "segura" },
  { id: "mispa", name: "Mispá", modern: "Tell en-Nasbeh", lat: 31.8851, lng: 35.2164, certainty: "provavel" },
  { id: "rama", name: "Ramá", modern: "er-Ram", lat: 31.85, lng: 35.2317, certainty: "provavel" },
  { id: "gibea", name: "Gibeá de Saul", modern: "Tell el-Ful", lat: 31.8233, lng: 35.2311, certainty: "debatida" },
  { id: "geba", name: "Geba", modern: "Jaba'", lat: 31.8575, lng: 35.2611, certainty: "segura" },
  { id: "micmas", name: "Micmás", modern: "Mukhmas", lat: 31.8728, lng: 35.2769, certainty: "segura" },
  { id: "bozez", name: "Passagem de Bozez e Sené", modern: "Wadi es-Suweinit", lat: 31.8655, lng: 35.2712, certainty: "provavel" },
  { id: "bete-horom", name: "Bete-Horom", modern: "Beit Ur al-Fauqa", lat: 31.8858, lng: 35.1142, certainty: "segura" },
  { id: "aijalom", name: "Aijalom", modern: "vale de Aijalom (Yalo)", lat: 31.8403, lng: 35.0206, certainty: "segura" },
  { id: "ofra", name: "Ofra", modern: "et-Taiyibe", lat: 31.9547, lng: 35.3, certainty: "provavel" },
  { id: "gilgal", name: "Gilgal", modern: "perto de Jericó (local exato desconhecido)", lat: 31.865, lng: 35.5, certainty: "debatida" },
  { id: "jerico", name: "Jericó", modern: "Tell es-Sultan", lat: 31.8717, lng: 35.4446, certainty: "segura" },
  { id: "vau-jordao", name: "Vaus do Jordão", modern: "a leste de Jericó", lat: 31.84, lng: 35.545, certainty: "provavel" },
  { id: "gibeom", name: "Gibeom", modern: "el-Jib", lat: 31.8475, lng: 35.1864, certainty: "segura" },
  { id: "soco", name: "Socó", modern: "Khirbet Shuweikeh", lat: 31.6786, lng: 34.9767, certainty: "provavel" },
  { id: "azeca", name: "Azeca", modern: "Tel Azekah", lat: 31.7008, lng: 34.9358, certainty: "segura" },
  { id: "qeiyafa", name: "Khirbet Qeiyafa", modern: "fortaleza sobre o vale de Elá", lat: 31.6964, lng: 34.9572, certainty: "segura" },
  { id: "ela", name: "Vale de Elá", modern: "Wadi es-Sant", lat: 31.6903, lng: 34.9521, certainty: "segura" },
  { id: "nobe", name: "Nobe", modern: "perto do monte Scopus (proposta)", lat: 31.7945, lng: 35.2425, certainty: "debatida" },
  { id: "adulao", name: "Adulão", modern: "Tel Adullam", lat: 31.6547, lng: 34.9625, certainty: "provavel" },
  { id: "queila", name: "Queila", modern: "Khirbet Qila", lat: 31.6122, lng: 35.0011, certainty: "provavel" },
  { id: "zife", name: "Zife", modern: "Tell Zif", lat: 31.4797, lng: 35.1361, certainty: "provavel" },
  { id: "maom", name: "Maom", modern: "Khirbet Ma'in", lat: 31.4167, lng: 35.1361, certainty: "provavel" },
  { id: "carmelo-juda", name: "Carmelo de Judá", modern: "Khirbet el-Kirmil", lat: 31.4225, lng: 35.1311, certainty: "provavel" },
  { id: "en-gedi", name: "En-Gedi", modern: "oásis de En-Gedi", lat: 31.4613, lng: 35.3889, certainty: "segura" },
  { id: "ziclague", name: "Ziclague", modern: "Tel Sera' (uma das propostas)", lat: 31.39, lng: 34.68, certainty: "debatida" },
  { id: "besor", name: "Ribeiro de Besor", modern: "Nahal Besor", lat: 31.33, lng: 34.5, certainty: "provavel" },
  { id: "berseba", name: "Berseba", modern: "Tel Be'er Sheva", lat: 31.2447, lng: 34.8406, certainty: "segura" },
  { id: "arade", name: "Arade", modern: "Tel Arad", lat: 31.2808, lng: 35.125, certainty: "segura" },
  { id: "laquis", name: "Laquis", modern: "Tel Lachish", lat: 31.5653, lng: 34.8492, certainty: "segura" },
  { id: "timna", name: "Timna", modern: "Tel Batash", lat: 31.7864, lng: 34.9108, certainty: "segura" },
  { id: "gezer", name: "Gezer", modern: "Tel Gezer", lat: 31.859, lng: 34.919, certainty: "segura" },
  { id: "jope", name: "Jope", modern: "Jafa", lat: 32.0544, lng: 34.7519, certainty: "segura" },
  { id: "betel", name: "Betel", modern: "Beitin", lat: 31.9228, lng: 35.2414, certainty: "provavel" },

  // Centro e norte
  { id: "siquem", name: "Siquém", modern: "Tell Balata", lat: 32.2136, lng: 35.2819, certainty: "segura" },
  { id: "tirza", name: "Tirza", modern: "Tell el-Far'ah (norte)", lat: 32.2874, lng: 35.3378, certainty: "segura" },
  { id: "samaria", name: "Samaria", modern: "Sebastia", lat: 32.2766, lng: 35.1897, certainty: "segura" },
  { id: "dota", name: "Dotã", modern: "Tel Dothan", lat: 32.4135, lng: 35.2399, certainty: "segura" },
  { id: "ibleam", name: "Ibleã", modern: "Khirbet Bel'ameh", lat: 32.4503, lng: 35.2878, certainty: "segura" },
  { id: "megido", name: "Megido", modern: "Tel Megiddo", lat: 32.5853, lng: 35.1844, certainty: "segura" },
  { id: "taanaque", name: "Taanaque", modern: "Tell Ti'innik", lat: 32.5197, lng: 35.2211, certainty: "segura" },
  { id: "jezreel", name: "Jezreel", modern: "Tel Jezreel", lat: 32.5579, lng: 35.328, certainty: "segura" },
  { id: "sunem", name: "Suném", modern: "Sulam", lat: 32.6056, lng: 35.3343, certainty: "segura" },
  { id: "endor", name: "En-Dor", modern: "perto da antiga Indur", lat: 32.642, lng: 35.385, certainty: "provavel" },
  { id: "gilboa", name: "Monte Gilboa", modern: "serra de Gilboa", lat: 32.4339, lng: 35.4144, certainty: "segura" },
  { id: "bete-sea", name: "Bete-Seã", modern: "Tel Beit She'an", lat: 32.5044, lng: 35.5028, certainty: "segura" },
  { id: "reobe", name: "Reobe", modern: "Tel Rehov", lat: 32.4571, lng: 35.4982, certainty: "segura" },
  { id: "bezeque", name: "Bezeque", modern: "Khirbet Ibziq", lat: 32.3647, lng: 35.4183, certainty: "provavel" },
  { id: "jabes", name: "Jabes-Gileade", modern: "Tell Abu al-Kharaz (proposta)", lat: 32.399, lng: 35.5951, certainty: "debatida" },
  { id: "maanaim", name: "Maanaim", modern: "Tell edh-Dhahab el-Gharbi (proposta)", lat: 32.1825, lng: 35.6833, certainty: "debatida" },
  { id: "penuel", name: "Penuel", modern: "Tell edh-Dhahab esh-Sherqi (proposta)", lat: 32.1833, lng: 35.7, certainty: "debatida" },
  { id: "ramote", name: "Ramote-Gileade", modern: "Tell er-Rumeith (provável)", lat: 32.4458, lng: 35.9906, certainty: "provavel" },
  { id: "dor", name: "Dor", modern: "Tel Dor", lat: 32.6174, lng: 34.9164, certainty: "segura" },
  { id: "carmelo", name: "Monte Carmelo", modern: "El-Muhraqa (tradição)", lat: 32.6714, lng: 35.0889, certainty: "provavel" },
  { id: "hazor", name: "Hazor", modern: "Tel Hazor", lat: 33.0167, lng: 35.5669, certainty: "segura" },
  { id: "quedes", name: "Quedes", modern: "Tel Kedesh", lat: 33.1116, lng: 35.5295, certainty: "segura" },
  { id: "abel-bete-maaca", name: "Abel-Bete-Maaca", modern: "Tel Abel Beth Maacah", lat: 33.2578, lng: 35.5797, certainty: "segura" },
  { id: "da", name: "Dã", modern: "Tel Dan", lat: 33.249, lng: 35.652, certainty: "segura" },

  // Transjordânia
  { id: "raba", name: "Rabá dos amonitas", modern: "Cidadela de Amã", lat: 31.9547, lng: 35.9343, certainty: "segura" },
  { id: "dibom", name: "Dibom", modern: "Dhiban", lat: 31.5011, lng: 35.7767, certainty: "segura" },
  { id: "atarote", name: "Atarote", modern: "Khirbet Ataruz", lat: 31.5853, lng: 35.6644, certainty: "provavel" },
  { id: "nebo", name: "Nebo (cidade)", modern: "Khirbet el-Mukhayyat (provável)", lat: 31.7608, lng: 35.7397, certainty: "provavel" },
  { id: "quir-haresete", name: "Quir-Haresete", modern: "Kerak", lat: 31.1808, lng: 35.7019, certainty: "provavel" },
  { id: "bozra", name: "Bozra", modern: "Busayra", lat: 30.7389, lng: 35.6072, certainty: "segura" },
  { id: "eziom-geber", name: "Eziom-Geber / Elate", modern: "Tell el-Kheleifeh (proposta)", lat: 29.5472, lng: 34.9803, certainty: "debatida" },

  // Fenícia, Síria
  { id: "tiro", name: "Tiro", modern: "Sur, Líbano", lat: 33.2708, lng: 35.1961, certainty: "segura" },
  { id: "sidom", name: "Sidom", modern: "Saida, Líbano", lat: 33.5606, lng: 35.3758, certainty: "segura" },
  { id: "damasco", name: "Damasco", modern: "cidade antiga", lat: 33.5131, lng: 36.3094, certainty: "segura" },
  { id: "hamate", name: "Hamate", modern: "Hama", lat: 35.135, lng: 36.75, certainty: "segura" },
  { id: "qarqar", name: "Qarqar", modern: "Tell Qarqur", lat: 35.7426, lng: 36.3305, certainty: "provavel" },
  { id: "alepo", name: "Alepo (Halab)", modern: "Alepo", lat: 36.2, lng: 37.16, certainty: "segura" },
  { id: "ribla", name: "Ribla", modern: "Ribla, no Orontes", lat: 34.4333, lng: 36.55, certainty: "provavel" },
  { id: "carquemis", name: "Carquemis", modern: "Jerablus / Karkamış", lat: 36.8294, lng: 38.0164, certainty: "segura" },
  { id: "til-barsip", name: "Til-Barsip", modern: "Tell Ahmar", lat: 36.674, lng: 38.121, certainty: "segura" },
  { id: "hara", name: "Harã", modern: "Harran", lat: 36.8708, lng: 39.025, certainty: "segura" },
  { id: "goza", name: "Gozã", modern: "Tell Halaf, rio Habor", lat: 36.8268, lng: 40.0397, certainty: "segura" },

  // Mesopotâmia
  { id: "ninive", name: "Nínive", modern: "Kuyunjik, Mossul", lat: 36.3594, lng: 43.1528, certainty: "segura" },
  { id: "cala", name: "Calá (Nimrud)", modern: "Nimrud", lat: 36.0981, lng: 43.3289, certainty: "segura" },
  { id: "dur-sharrukin", name: "Dur-Sharrukin", modern: "Khorsabad", lat: 36.5094, lng: 43.2294, certainty: "segura" },
  { id: "babilonia", name: "Babilônia", modern: "perto de Hilla, Iraque", lat: 32.5425, lng: 44.4211, certainty: "segura" },
  { id: "cuta", name: "Cuta", modern: "Tell Ibrahim", lat: 32.76, lng: 44.6129, certainty: "segura" },

  // Egito
  { id: "pelusio", name: "Pelúsio", modern: "Tell el-Farama", lat: 31.05, lng: 32.6, certainty: "segura" },
  { id: "tafnes", name: "Tafnes", modern: "Tell Defenneh", lat: 30.8606, lng: 32.1714, certainty: "segura" },
  { id: "bubastis", name: "Bubástis", modern: "Tell Basta", lat: 30.5728, lng: 31.5097, certainty: "segura" },
  { id: "menfis", name: "Mênfis", modern: "Mit Rahina", lat: 29.8494, lng: 31.255, certainty: "segura" },
];

const byId = new Map(sites.map((site) => [site.id, site]));

export function getSite(id: string): Site {
  const site = byId.get(id);
  if (!site) throw new Error(`Sítio desconhecido: ${id}`);
  return site;
}
