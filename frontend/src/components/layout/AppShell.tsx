"use client";

import type { ReactNode } from "react";

import type { Collection } from "@/types";

import { AppContextProvider } from "./AppContext";
import { SearchBar } from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({
  collections,
  children,
}: {
  collections: Collection[];
  children: ReactNode;
}) {
  return (
    <AppContextProvider>
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        <Sidebar collections={collections} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <SearchBar />
          <main className="flex-1 px-8 py-6">{children}</main>
        </div>
      </div>
    </AppContextProvider>
  );
}
