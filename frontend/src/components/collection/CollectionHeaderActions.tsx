"use client";

import { useState } from "react";

import { CollectionFormModal } from "@/components/collection/CollectionFormModal";
import { DeleteCollectionModal } from "@/components/collection/DeleteCollectionModal";
import type { Collection } from "@/types";

export function CollectionHeaderActions({ collection }: { collection: Collection }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          Переименовать
        </button>
        <button
          type="button"
          onClick={() => setDeleting(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
          Удалить
        </button>
      </div>

      {editing && (
        <CollectionFormModal
          mode="edit"
          collectionId={collection.id}
          initialName={collection.name}
          onClose={() => setEditing(false)}
        />
      )}
      {deleting && (
        <DeleteCollectionModal
          collection={collection}
          redirectTo="/"
          onClose={() => setDeleting(false)}
        />
      )}
    </>
  );
}
