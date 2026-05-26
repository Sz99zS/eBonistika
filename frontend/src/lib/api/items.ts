import { apiFetch } from "@/lib/api-client";
// import { getMockItemsBySeries } from "@/lib/mock-data";
import type { Item } from "@/types";

export async function fetchItemsBySeries(seriesId: string): Promise<Item[]> {
  // try {
  return await apiFetch<Item[]>(`/items?seriesId=${seriesId}`, { cache: "no-store" });
  // } catch {
  //   return getMockItemsBySeries(seriesId);
  // }
}
