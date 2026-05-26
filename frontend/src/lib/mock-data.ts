import type { Collection, Item, Series } from "@/types";

export const MOCK_COLLECTIONS: Collection[] = [
  { id: "11111111-0000-0000-0000-000000000001", name: "Монеты Российской Империи" },
  { id: "22222222-0000-0000-0000-000000000002", name: "Советские монеты 1921–1991" },
  { id: "33333333-0000-0000-0000-000000000003", name: "Современная Россия 1992–2025" },
  { id: "44444444-0000-0000-0000-000000000004", name: "Банкноты СССР" },
  { id: "55555555-0000-0000-0000-000000000005", name: "Памятные 10-рублёвые" },
  { id: "66666666-0000-0000-0000-000000000006", name: "Юбилейные биметаллы" },
];

const SERIES_BY_COLLECTION: Record<string, Series[]> = {
  "22222222-0000-0000-0000-000000000002": [
    {
      id: "s-soviet-early",
      collectionId: "22222222-0000-0000-0000-000000000002",
      name: "Ранние советские монеты",
      yearFrom: 1921,
      yearTo: 1957,
      createdAt: "2026-02-04T10:00:00Z",
      itemCount: 8,
    },
    {
      id: "s-soviet-reform-1961",
      collectionId: "22222222-0000-0000-0000-000000000002",
      name: "После реформы 1961",
      yearFrom: 1961,
      yearTo: 1991,
      createdAt: "2026-03-12T10:00:00Z",
      itemCount: 9,
    },
    {
      id: "s-soviet-jubilee",
      collectionId: "22222222-0000-0000-0000-000000000002",
      name: "Юбилейные рубли",
      yearFrom: 1965,
      yearTo: 1991,
      createdAt: "2026-04-21T10:00:00Z",
      itemCount: 6,
    },
  ],
  "33333333-0000-0000-0000-000000000003": [
    {
      id: "s-modern-90s",
      collectionId: "33333333-0000-0000-0000-000000000003",
      name: "Ельцинская эпоха",
      yearFrom: 1992,
      yearTo: 1998,
      createdAt: "2026-01-08T10:00:00Z",
      itemCount: 7,
    },
    {
      id: "s-modern-2000s",
      collectionId: "33333333-0000-0000-0000-000000000003",
      name: "После деноминации",
      yearFrom: 1998,
      yearTo: 2014,
      createdAt: "2026-02-19T10:00:00Z",
      itemCount: 9,
    },
  ],
  "11111111-0000-0000-0000-000000000001": [
    {
      id: "s-imperial-paul",
      collectionId: "11111111-0000-0000-0000-000000000001",
      name: "Павел I",
      yearFrom: 1796,
      yearTo: 1801,
      createdAt: "2025-12-01T10:00:00Z",
      itemCount: 5,
    },
    {
      id: "s-imperial-nicholas-ii",
      collectionId: "11111111-0000-0000-0000-000000000001",
      name: "Николай II",
      yearFrom: 1894,
      yearTo: 1917,
      createdAt: "2026-04-30T10:00:00Z",
      itemCount: 9,
    },
  ],
};

const DEFAULT_NOTES =
  "Куплена на аукционе, оригинальная патина, без следов чистки. Хранится в холдере PCGS.";

function makeItems(series: Series, kind: "coin" | "banknote"): Item[] {
  const items: Item[] = [];
  const totalYears = Math.max(1, series.yearTo - series.yearFrom);
  for (let i = 0; i < series.itemCount; i += 1) {
    const year = series.yearFrom + Math.round((i / series.itemCount) * totalYears);
    const nominal = kind === "coin" ? [1, 3, 5, 10, 15, 20, 50][i % 7] : [1, 3, 5, 10, 25, 50, 100][i % 7];
    items.push({
      id: `${series.id}-i-${i + 1}`,
      collectionId: series.collectionId,
      seriesId: series.id,
      kind,
      nominal: String(nominal),
      currency: "Рубль",
      country: "СССР",
      year,
      condition: (["UNC", "AU", "XF", "VF", "F"] as const)[i % 5],
      count: (i % 3) + 1,
      yearFrom: series.yearFrom,
      yearTo: series.yearTo,
      purchasePrice: 350 + i * 175,
      purchaseCurrency: "RUB",
      purchaseDate: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-15`,
      notes: i === 0 ? DEFAULT_NOTES : "",
      obverseUrl: null,
      reverseUrl: null,
    });
  }
  return items;
}

const ITEMS_BY_SERIES: Record<string, Item[]> = Object.fromEntries(
  Object.values(SERIES_BY_COLLECTION)
    .flat()
    .map((s) => [
      s.id,
      makeItems(s, s.collectionId === "44444444-0000-0000-0000-000000000004" ? "banknote" : "coin"),
    ]),
);

export function getMockCollectionById(id: string): Collection | undefined {
  return MOCK_COLLECTIONS.find((c) => c.id === id);
}

export function getMockSeriesByCollection(collectionId: string): Series[] {
  return SERIES_BY_COLLECTION[collectionId] ?? [];
}

export function getMockSeriesById(seriesId: string): Series | undefined {
  return Object.values(SERIES_BY_COLLECTION)
    .flat()
    .find((s) => s.id === seriesId);
}

export function getMockItemsBySeries(seriesId: string): Item[] {
  return ITEMS_BY_SERIES[seriesId] ?? [];
}

export function getMockItemById(itemId: string): Item | undefined {
  return Object.values(ITEMS_BY_SERIES)
    .flat()
    .find((i) => i.id === itemId);
}
