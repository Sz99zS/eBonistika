export type ItemKind = "coin" | "banknote";

export type ItemCondition =
  | "UNC"
  | "AU"
  | "XF"
  | "VF"
  | "F"
  | "VG"
  | "G"
  | "P";

export interface Item {
  id: string;
  collectionId: string;
  seriesId: string;
  kind: ItemKind;

  nominal: string;
  currency: string;
  country: string;
  year: number;

  condition: ItemCondition;
  count: number;
  yearFrom: number;
  yearTo: number;

  purchasePrice: number | null;
  purchaseCurrency: string | null;
  purchaseDate: string | null;

  notes: string;

  // «в коллекции» (true) / «в поиске» (false). Заполняется бэком (см. CRUD_CONTRACT.md, раздел 4).
  // Опционален, пока бэк не добавил IsOwned в ItemDto.
  isOwned?: boolean;

  obverseUrl: string | null;
  reverseUrl: string | null;
}
