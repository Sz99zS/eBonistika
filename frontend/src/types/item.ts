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

  obverseUrl: string | null;
  reverseUrl: string | null;
}
