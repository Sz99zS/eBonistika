"use client";

import type { ItemCondition, ItemKind } from "@/types";

const CONDITIONS: ItemCondition[] = ["UNC", "AU", "XF", "VF", "F", "VG", "G", "P"];
const KINDS: { value: ItemKind | "all"; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "coin", label: "Монеты" },
  { value: "banknote", label: "Банкноты" },
];

export interface FiltersState {
  kind: ItemKind | "all";
  condition: ItemCondition | "all";
  yearFrom: string;
  yearTo: string;
}

export const DEFAULT_FILTERS: FiltersState = {
  kind: "all",
  condition: "all",
  yearFrom: "",
  yearTo: "",
};

export function FiltersBlock({
  value,
  onChange,
}: {
  value: FiltersState;
  onChange: (next: FiltersState) => void;
}) {
  const set = <K extends keyof FiltersState>(k: K, v: FiltersState[K]) =>
    onChange({ ...value, [k]: v });

  const cls =
    "rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 transition hover:border-indigo-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";

  return (
    <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Filters
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-slate-500">
          Тип
          <select
            value={value.kind}
            onChange={(e) => set("kind", e.target.value as FiltersState["kind"])}
            className={cls}
          >
            {KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-500">
          Состояние
          <select
            value={value.condition}
            onChange={(e) => set("condition", e.target.value as FiltersState["condition"])}
            className={cls}
          >
            <option value="all">Любое</option>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-500">
          Год от
          <input
            inputMode="numeric"
            placeholder="1921"
            value={value.yearFrom}
            onChange={(e) => set("yearFrom", e.target.value)}
            className={cls}
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-500">
          Год до
          <input
            inputMode="numeric"
            placeholder="1991"
            value={value.yearTo}
            onChange={(e) => set("yearTo", e.target.value)}
            className={cls}
          />
        </label>
      </div>
    </section>
  );
}
