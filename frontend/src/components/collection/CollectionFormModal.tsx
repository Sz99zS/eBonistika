"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createCollection, updateCollection } from "@/lib/api/collections";
import { mutationErrorMessage } from "@/lib/api-error";
import { ErrorNote, fieldClass, labelClass, Modal, ModalFooter } from "@/components/ui/Modal";

export function CollectionFormModal({
  mode,
  collectionId,
  initialName = "",
  onClose,
}: {
  mode: "create" | "edit";
  collectionId?: string;
  initialName?: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmed = name.trim();
  const isCreate = mode === "create";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trimmed || pending) return;
    setPending(true);
    setError(null);
    try {
      if (isCreate) {
        await createCollection({ name: trimmed });
      } else {
        await updateCollection(collectionId!, { name: trimmed });
      }
      router.refresh();
      onClose();
    } catch (err) {
      setError(mutationErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <Modal title={isCreate ? "Новая коллекция" : "Переименовать коллекцию"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className={labelClass}>
          Название
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например: Монеты Российской Империи"
            className={fieldClass}
          />
        </label>
        <ErrorNote message={error} />
        <ModalFooter
          onCancel={onClose}
          submitLabel={isCreate ? "Создать" : "Сохранить"}
          pending={pending}
          disabled={!trimmed}
        />
      </form>
    </Modal>
  );
}
