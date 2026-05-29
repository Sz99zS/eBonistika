import { apiFetch, mutate, remove } from "@/lib/api-client";
import type { Collection } from "@/types";

export interface CreateCollectionInput {
  name: string;
}

export type UpdateCollectionInput = CreateCollectionInput;

export async function fetchCollections(): Promise<Collection[]> {
  return await apiFetch<Collection[]>("/collections", { cache: "no-store" });
}

export async function fetchCollectionById(id: string): Promise<Collection> {
  // Бэк: GET /api/collections/{id} (см. CRUD_CONTRACT.md, раздел 2).
  return await apiFetch<Collection>(`/collections/${id}`, { cache: "no-store" });
}

export async function createCollection(input: CreateCollectionInput): Promise<Collection> {
  return await mutate<Collection>("/collections", "POST", input);
}

export async function updateCollection(
  id: string,
  input: UpdateCollectionInput,
): Promise<Collection> {
  return await mutate<Collection>(`/collections/${id}`, "PUT", input);
}

export async function deleteCollection(id: string): Promise<void> {
  await remove(`/collections/${id}`);
}
