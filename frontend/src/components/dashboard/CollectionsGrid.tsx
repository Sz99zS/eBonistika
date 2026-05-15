"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  getRecentCollectionIds,
  subscribeRecentCollections,
} from "@/lib/recent-collections";
import type { Collection } from "@/types";

import { CollectionCard } from "./CollectionCard";

const MAX_ON_HOME = 4;

function getSnapshot(): string {
  return JSON.stringify(getRecentCollectionIds());
}

function getServerSnapshot(): string {
  return "__ssr__";
}

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  const snapshot = useSyncExternalStore(
    subscribeRecentCollections,
    getSnapshot,
    getServerSnapshot,
  );
  const recentIds = snapshot === "__ssr__" ? null : (JSON.parse(snapshot) as string[]);

  const visible = useMemo<Collection[]>(() => {
    if (collections.length <= MAX_ON_HOME) return collections;
    if (recentIds === null) return collections.slice(0, MAX_ON_HOME);

    const byId = new Map(collections.map((c) => [c.id, c]));
    const ordered: Collection[] = [];
    for (const id of recentIds) {
      const c = byId.get(id);
      if (c) {
        ordered.push(c);
        byId.delete(id);
        if (ordered.length === MAX_ON_HOME) break;
      }
    }
    if (ordered.length < MAX_ON_HOME) {
      for (const c of byId.values()) {
        ordered.push(c);
        if (ordered.length === MAX_ON_HOME) break;
      }
    }
    return ordered;
  }, [collections, recentIds]);

  if (collections.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        Коллекций пока нет. Создайте первую через кнопку «+».
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
      {collections.length > MAX_ON_HOME && (
        <p className="mt-4 text-xs text-slate-500">
          Показаны 4 последние открытые из {collections.length}.
        </p>
      )}
    </>
  );
}
