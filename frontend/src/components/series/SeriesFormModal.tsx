"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSeries, updateSeries } from "@/lib/api/series";
import { mutationErrorMessage } from "@/lib/api-error";
import { ErrorNote, fieldClass, labelClass, Modal, ModalFooter } from "@/components/ui/Modal";
import type { Series } from "@/types";

export function SeriesFormModal({
  mode,
  collectionId,
  series,
  onClose,
}: {
  mode: "create" | "edit";
  // нужен при создании (откуда берём CollectionId — из URL коллекции)
  collectionId?: string;
  // нужен при редактировании
  series?: Series;
  onClose: () => void;
}) {
  const router = useRouter();
  const isCreate = mode === "create";

  const [name, setName] = useState(series?.name ?? "");
  const [yearFrom, setYearFrom] = useState(series ? String(series.yearFrom) : "");
  const [yearTo, setYearTo] = useState(series ? String(series.yearTo) : "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = name.trim();
  const from = Number.parseInt(yearFrom, 10);
  const to = Number.parseInt(yearTo, 10);
  const yearsValid = Number.isFinite(from) && Number.isFinite(to) && from <= to;
  const valid = trimmed.length > 0 && yearsValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || pending) return;
    setPending(true);
    setError(null);
    try {
      if (isCreate) {
        await createSeries({ collectionId: collectionId!, name: trimmed, yearFrom: from, yearTo: to });
      } else {
        await updateSeries(series!.id, { name: trimmed, yearFrom: from, yearTo: to });
      }
      router.refresh();
      onClose();
    } catch (err) {
      setError(mutationErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <Modal title={isCreate ? "Новая серия" : "Изменить серию"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className={labelClass}>
          Название
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Николай II"
            className={fieldClass}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={labelClass}>
            Год от
            <input
              inputMode="numeric"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              placeholder="1894"
              className={fieldClass}
            />
          </label>
          <label className={labelClass}>
            Год до
            <input
              inputMode="numeric"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              placeholder="1917"
              className={fieldClass}
            />
          </label>
        </div>
        {yearFrom && yearTo && !yearsValid && (
          <p className="text-xs text-rose-600">«Год от» должен быть не больше «года до».</p>
        )}
        <ErrorNote message={error} />
        <ModalFooter
          onCancel={onClose}
          submitLabel={isCreate ? "Создать" : "Сохранить"}
          pending={pending}
          disabled={!valid}
        />
      </form>
    </Modal>
  );
}
