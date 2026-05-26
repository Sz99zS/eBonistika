import { apiFetch } from "@/lib/api-client";
// import { getMockSeriesByCollection, getMockSeriesById } from "@/lib/mock-data";
import type { Series } from "@/types";

export async function fetchSeriesByCollection(collectionId: string): Promise<Series[]> {
  try {
    return await apiFetch<Series[]>(`/series?collectionId=${collectionId}`, { cache: "no-store" });
  } catch (e) {
    console.error("[fetchSeriesByCollection] failed:", e);
    throw e;
  }
}

export async function fetchSeriesById(seriesId: string): Promise<Series | null> {
  // try {
  return await apiFetch<Series>(`/series/${seriesId}`, { cache: "no-store" });
  // } catch {
  //   return getMockSeriesById(seriesId) ?? null;
  // }
}
