"use client";

import Link from "next/link";

import { touchRecentCollection } from "@/lib/recent-collections";
import type { Collection } from "@/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      onClick={() => touchRecentCollection(collection.id)}
      className="group flex h-32 flex-col justify-between rounded-xl border border-slate-200 bg-slate-100 p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:shadow-md"
    >
      <span className="text-base font-semibold text-slate-800 transition group-hover:text-indigo-700">
        {collection.name}
      </span>
      <span className="text-xs text-slate-500">Открыть коллекцию →</span>
    </Link>
  );
}
