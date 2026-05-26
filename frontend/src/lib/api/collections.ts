import { apiFetch } from "@/lib/api-client";
// import { MOCK_COLLECTIONS } from "@/lib/mock-data";
import type { Collection } from "@/types";

export async function fetchCollections(): Promise<Collection[]> {
  // try {
  return await apiFetch<Collection[]>("/collections", { cache: "no-store" });
  // } catch {
  //   return MOCK_COLLECTIONS;
  // }
}
