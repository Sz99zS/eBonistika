"use client";

import { useAppContext } from "./AppContext";

function SearchIcon() {
  return (
    <svg className="size-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SearchBar({ placeholder = "Поиск..." }: { placeholder?: string }) {
  const { headerAction } = useAppContext();
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-8 py-3">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      {headerAction}
    </div>
  );
}
