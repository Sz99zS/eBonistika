"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { DeleteSeriesModal } from "@/components/series/DeleteSeriesModal";
import { SeriesFormModal } from "@/components/series/SeriesFormModal";
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
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Series | null>(null);
  const [deleting, setDeleting] = useState<Series | null>(null);

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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">Серий: {series.length}</span>
        <div className="flex items-center gap-3">
          {series.length > 0 && (
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
          )}
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Серия
          </button>
        </div>
      </div>

      {series.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          В этой коллекции пока нет серий. Создайте первую кнопкой «+ Серия».
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {sorted.map((s) => (
            <li key={s.id} className="flex items-center gap-2 pr-3 transition hover:bg-indigo-50">
              <Link
                href={`/collections/${collectionId}/series/${s.id}`}
                className="flex min-w-0 flex-1 items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-800">{s.name}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {s.yearFrom}–{s.yearTo} · предметов: {s.itemCount}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setEditing(s)}
                aria-label="Изменить серию"
                title="Изменить"
                className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-indigo-700"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setDeleting(s)}
                aria-label="Удалить серию"
                title="Удалить"
                className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-white hover:text-rose-700"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {creating && (
        <SeriesFormModal mode="create" collectionId={collectionId} onClose={() => setCreating(false)} />
      )}
      {editing && (
        <SeriesFormModal mode="edit" series={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && <DeleteSeriesModal series={deleting} onClose={() => setDeleting(null)} />}
    </div>
  );
}
