"use client";

import Link from "next/link";
import { useState } from "react";

import type { Item } from "@/types";

export function ItemCard({ item, href }: { item: Item; href: string }) {
  const [reverse, setReverse] = useState(false);
  const sideLabel = reverse ? "PEB" : "AB";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md">
      <Link href={href} className="block">
        <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-400">{item.nominal}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
              {item.currency}
            </div>
          </div>
          <span className="absolute left-2 top-2 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
            {sideLabel}
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setReverse((r) => !r);
        }}
        aria-label="Перевернуть карточку"
        title="Перевернуть"
        className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:bg-indigo-50 hover:text-indigo-700"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 4v4h-4" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 20v-4h4" />
        </svg>
      </button>

      <Link href={href} className="block px-3 py-2">
        <div className="text-sm font-medium text-slate-800 group-hover:text-indigo-700">
          {item.nominal} {item.currency}, {item.year}
        </div>
        <div className="text-xs text-slate-500">
          {item.country} · {item.condition}
        </div>
      </Link>
    </div>
  );
}
