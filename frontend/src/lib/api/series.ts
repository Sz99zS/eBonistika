import { apiFetch, mutate, remove } from "@/lib/api-client";
import type { Series } from "@/types";

export interface CreateSeriesInput {
  collectionId: string;
  name: string;
  yearFrom: number;
  yearTo: number;
}

// CollectionId менять нельзя — серия не «переезжает» между коллекциями.
export type UpdateSeriesInput = Omit<CreateSeriesInput, "collectionId">;

export async function fetchSeriesByCollection(collectionId: string): Promise<Series[]> {
  return await apiFetch<Series[]>(`/series?collectionId=${collectionId}`, { cache: "no-store" });
}

export async function fetchSeriesById(seriesId: string): Promise<Series | null> {
  return await apiFetch<Series>(`/series/${seriesId}`, { cache: "no-store" });
}

export async function createSeries(input: CreateSeriesInput): Promise<Series> {
  return await mutate<Series>("/series", "POST", input);
}

export async function updateSeries(id: string, input: UpdateSeriesInput): Promise<Series> {
  return await mutate<Series>(`/series/${id}`, "PUT", input);
}

export async function deleteSeries(id: string): Promise<void> {
  await remove(`/series/${id}`);
}
