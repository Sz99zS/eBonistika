"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteSeries } from "@/lib/api/series";
import { mutationErrorMessage } from "@/lib/api-error";
import { ErrorNote, Modal } from "@/components/ui/Modal";
import type { Series } from "@/types";

export function DeleteSeriesModal({
  series,
  onClose,
}: {
  series: Series;
  onClose: () => void;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await deleteSeries(series.id);
      router.refresh();
      onClose();
    } catch (err) {
      setError(mutationErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <Modal title="Удалить серию?" onClose={onClose}>
      <p className="text-sm text-slate-600">
        Серия <span className="font-semibold text-slate-900">«{series.name}»</span> будет удалена
        вместе со всеми входящими предметами (предметов: {series.itemCount}). Действие необратимо.
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
