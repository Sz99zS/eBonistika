"use client";

import Link from "next/link";

import { useAppContext } from "./AppContext";

function ChevronRight() {
  return (
    <svg className="size-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  );
}

export function TopBar() {
  const { crumbs } = useAppContext();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-4">
      <nav aria-label="Breadcrumbs" className="min-w-0">
        {crumbs.length === 0 ? (
          <span className="text-sm text-slate-400">&nbsp;</span>
        ) : (
          <ol className="flex items-center gap-2 truncate">
            {crumbs.map((c, idx) => {
              const last = idx === crumbs.length - 1;
              return (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-2 truncate">
                  {idx > 0 && <ChevronRight />}
                  {c.href && !last ? (
                    <Link
                      href={c.href}
                      className="truncate text-sm text-slate-500 transition hover:text-indigo-700 hover:underline"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span
                      className={`truncate text-sm ${last ? "font-semibold text-slate-900" : "text-slate-500"}`}
                    >
                      {c.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </nav>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
      >
        <span className="grid size-7 place-items-center rounded-full bg-indigo-100 text-indigo-700">
          <UserIcon />
        </span>
        <span className="pr-1 font-medium">Profile</span>
      </button>
    </header>
  );
}
