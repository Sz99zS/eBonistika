import { apiFetch, mutate, remove } from "@/lib/api-client";
import type { Item } from "@/types";

// CollectionId фронт не шлёт — бэк выводит его из Series по seriesId (см. CRUD_CONTRACT.md, раздел 4).
export interface CreateItemInput {
  seriesId: string;
  kind: Item["kind"];
  nominal: string;
  currency: string;
  country: string;
  year: number;
  condition: Item["condition"];
  count: number;
  yearFrom: number;
  yearTo: number;
  purchasePrice: number | null;
  purchaseCurrency: string | null;
  purchaseDate: string | null;
  notes: string;
  isOwned: boolean;
}

// SeriesId менять нельзя.
export type UpdateItemInput = Omit<CreateItemInput, "seriesId">;

export async function fetchItemsBySeries(seriesId: string): Promise<Item[]> {
  return await apiFetch<Item[]>(`/items?seriesId=${seriesId}`, { cache: "no-store" });
}

export async function createItem(input: CreateItemInput): Promise<Item> {
  return await mutate<Item>("/items", "POST", input);
}

export async function updateItem(id: string, input: UpdateItemInput): Promise<Item> {
  return await mutate<Item>(`/items/${id}`, "PUT", input);
}

export async function deleteItem(id: string): Promise<void> {
  await remove(`/items/${id}`);
}
