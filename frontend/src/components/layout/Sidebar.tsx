"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Collection } from "@/types";

import { useAppContext } from "./AppContext";

function HomeIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 17l5-5-5-5" />
      <path d="M20 12H9" />
      <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

export function Sidebar({ collections }: { collections: Collection[] }) {
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  const pathname = usePathname();

  if (!sidebarOpen) {
    return (
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Show sidebar"
        className="fixed left-4 top-4 z-30 inline-flex size-9 items-center justify-center rounded-md border border-indigo-200 bg-white text-indigo-700 shadow-sm transition hover:bg-indigo-50"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-gradient-to-b from-indigo-800 to-violet-900 text-indigo-50">
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          eBonistika
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Hide sidebar"
          title="Hide sidebar"
          className="inline-flex size-7 items-center justify-center rounded-md text-indigo-200 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <Link
          href="/"
          className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
            pathname === "/"
              ? "bg-white/15 text-white"
              : "text-indigo-100 hover:bg-white/10 hover:text-white"
          }`}
        >
          <HomeIcon />
          Home
        </Link>

        <div className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-indigo-300">
          My collections
        </div>

        <ul className="mt-2 space-y-0.5">
          {collections.length === 0 ? (
            <li className="px-3 py-2 text-xs text-indigo-300">No collections yet</li>
          ) : (
            collections.map((c) => {
              const href = `/collections/${c.id}`;
              const active = pathname?.startsWith(href);
              return (
                <li key={c.id}>
                  <Link
                    href={href}
                    title={c.name}
                    className={`flex items-center gap-2 truncate rounded-md px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-indigo-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <FolderIcon />
                    <span className="truncate">{c.name}</span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-indigo-100 transition hover:bg-white/10 hover:text-white"
        >
          <LogOutIcon />
          Log out
        </button>
      </div>
    </aside>
  );
}
