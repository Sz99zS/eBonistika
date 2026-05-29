"use client";

import { useMemo, useState } from "react";

import type { Item } from "@/types";

import { DEFAULT_FILTERS, FiltersBlock, type FiltersState } from "./FiltersBlock";
import { ItemCard } from "./ItemCard";
import { ItemFormModal } from "./ItemFormModal";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 6;

export function ItemsGrid({
  collectionId,
  seriesId,
  items,
  seriesYearFrom,
  seriesYearTo,
}: {
  collectionId: string;
  seriesId: string;
  items: Item[];
  seriesYearFrom?: number;
  seriesYearTo?: number;
}) {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filters.kind !== "all" && i.kind !== filters.kind) return false;
      if (filters.condition !== "all" && i.condition !== filters.condition) return false;
      const yFrom = filters.yearFrom ? Number.parseInt(filters.yearFrom, 10) : null;
      const yTo = filters.yearTo ? Number.parseInt(filters.yearTo, 10) : null;
      if (yFrom !== null && Number.isFinite(yFrom) && i.year < yFrom) return false;
      if (yTo !== null && Number.isFinite(yTo) && i.year > yTo) return false;
      return true;
    });
  }, [items, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">Предметов: {items.length}</span>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Предмет
        </button>
      </div>

      <FiltersBlock
        value={filters}
        onChange={(next) => {
          setFilters(next);
          setPage(1);
        }}
      />

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          В этой серии пока нет предметов. Добавьте первый кнопкой «+ Предмет».
        </p>
      ) : filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          По фильтрам ничего не найдено.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {visible.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                href={`/collections/${collectionId}/series/${seriesId}/items/${item.id}`}
              />
            ))}
          </div>
          <Pagination page={safePage} pageCount={pageCount} onChange={setPage} />
        </>
      )}

      {creating && (
        <ItemFormModal
          mode="create"
          seriesId={seriesId}
          defaultYearFrom={seriesYearFrom}
          defaultYearTo={seriesYearTo}
          onClose={() => setCreating(false)}
        />
      )}
    </div>
  );
}
