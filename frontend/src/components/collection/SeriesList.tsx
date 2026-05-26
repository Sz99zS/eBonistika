"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Series } from "@/types";

type SortMode = "createdDesc" | "yearAsc" | "yearDesc";

const OPTIONS: { value: SortMode; label: string }[] = [
  { value: "createdDesc", label: "По дате добавления" },
  { value: "yearAsc", label: "По годам ↑" },
  { value: "yearDesc", label: "По годам ↓" },
];

export function SeriesList({
  collectionId,
  series,
}: {
  collectionId: string;
  series: Series[];
}) {
  const [mode, setMode] = useState<SortMode>("createdDesc");

  const sorted = useMemo(() => {
    const copy = [...series];
    switch (mode) {
      case "yearAsc":
        return copy.sort((a, b) => a.yearFrom - b.yearFrom);
      case "yearDesc":
        return copy.sort((a, b) => b.yearFrom - a.yearFrom);
      case "createdDesc":
      default:
        return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }, [series, mode]);

  if (series.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        В этой коллекции пока нет серий.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">Серий: {series.length}</span>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span>Сортировка:</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as SortMode)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 transition hover:border-indigo-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {sorted.map((s) => (
          <li key={s.id}>
            <Link
              href={`/collections/${collectionId}/series/${s.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-indigo-50"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-800">{s.name}</div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {s.yearFrom}–{s.yearTo} · предметов: {s.itemCount}
                </div>
              </div>
              <span className="text-slate-300 transition group-hover:text-indigo-500">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
