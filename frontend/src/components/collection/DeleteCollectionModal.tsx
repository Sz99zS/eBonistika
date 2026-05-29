"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteCollection } from "@/lib/api/collections";
import { mutationErrorMessage } from "@/lib/api-error";
import { ErrorNote, Modal } from "@/components/ui/Modal";
import type { Collection } from "@/types";

export function DeleteCollectionModal({
  collection,
  onClose,
  redirectTo,
}: {
  collection: Collection;
  onClose: () => void;
  // Куда уйти после удаления (например, на дашборд, если удаляем со страницы коллекции).
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Счётчики приходят с бэка (могут быть undefined, пока бэк не расширил DTO).
  const parts: string[] = [];
  if (collection.seriesCount !== undefined) parts.push(`серий: ${collection.seriesCount}`);
  if (collection.itemCount !== undefined) parts.push(`предметов: ${collection.itemCount}`);
  const countText = parts.length ? ` (${parts.join(", ")})` : "";

  async function handleDelete() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await deleteCollection(collection.id);
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      onClose();
    } catch (err) {
      setError(mutationErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <Modal title="Удалить коллекцию?" onClose={onClose}>
      <p className="text-sm text-slate-600">
        Вы уверены? Это действие безвозвратно удалит коллекцию{" "}
        <span className="font-semibold text-slate-900">«{collection.name}»</span>, а также все
        входящие в неё серии и предметы{countText}.
      </p>
      <ErrorNote message={error} />
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Отмена
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending}
          className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Удаление..." : "Удалить безвозвратно"}
        </button>
      </div>
    </Modal>
  );
}
