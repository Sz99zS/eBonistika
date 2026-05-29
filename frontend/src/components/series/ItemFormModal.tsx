"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createItem, updateItem } from "@/lib/api/items";
import { mutationErrorMessage } from "@/lib/api-error";
import { ErrorNote, fieldClass, labelClass, Modal, ModalFooter } from "@/components/ui/Modal";
import type { Item, ItemCondition, ItemKind } from "@/types";

const CONDITIONS: ItemCondition[] = ["UNC", "AU", "XF", "VF", "F", "VG", "G", "P"];
const KINDS: { value: ItemKind; label: string }[] = [
  { value: "coin", label: "Монета" },
  { value: "banknote", label: "Банкнота" },
];

const intOr = (v: string, fallback: number) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

export function ItemFormModal({
  mode,
  seriesId,
  item,
  defaultYearFrom,
  defaultYearTo,
  onClose,
}: {
  mode: "create" | "edit";
  seriesId?: string;
  item?: Item;
  defaultYearFrom?: number;
  defaultYearTo?: number;
  onClose: () => void;
}) {
  const router = useRouter();
  const isCreate = mode === "create";

  const [kind, setKind] = useState<ItemKind>(item?.kind ?? "coin");
  const [nominal, setNominal] = useState(item?.nominal ?? "");
  const [currency, setCurrency] = useState(item?.currency ?? "");
  const [country, setCountry] = useState(item?.country ?? "");
  const [year, setYear] = useState(item ? String(item.year) : "");
  const [condition, setCondition] = useState<ItemCondition>(item?.condition ?? "UNC");
  const [count, setCount] = useState(item ? String(item.count) : "1");
  const [yearFrom, setYearFrom] = useState(
    item ? String(item.yearFrom) : defaultYearFrom != null ? String(defaultYearFrom) : "",
  );
  const [yearTo, setYearTo] = useState(
    item ? String(item.yearTo) : defaultYearTo != null ? String(defaultYearTo) : "",
  );
  const [purchasePrice, setPurchasePrice] = useState(
    item?.purchasePrice != null ? String(item.purchasePrice) : "",
  );
  const [purchaseCurrency, setPurchaseCurrency] = useState(item?.purchaseCurrency ?? "");
  const [purchaseDate, setPurchaseDate] = useState(item?.purchaseDate ?? "");
  const [notes, setNotes] = useState(item?.notes ?? "");
  const [isOwned, setIsOwned] = useState(item?.isOwned ?? true);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = nominal.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || pending) return;
    setPending(true);
    setError(null);

    const priceNum = purchasePrice.trim() ? Number.parseFloat(purchasePrice) : null;
    const payload = {
      kind,
      nominal: nominal.trim(),
      currency: currency.trim(),
      country: country.trim(),
      year: intOr(year, 0),
      condition,
      count: intOr(count, 1),
      yearFrom: intOr(yearFrom, 0),
      yearTo: intOr(yearTo, 0),
      purchasePrice: priceNum != null && Number.isFinite(priceNum) ? priceNum : null,
      purchaseCurrency: purchaseCurrency.trim() || null,
      purchaseDate: purchaseDate.trim() || null,
      notes: notes.trim(),
      isOwned,
    };

    try {
      if (isCreate) {
        await createItem({ seriesId: seriesId!, ...payload });
      } else {
        await updateItem(item!.id, payload);
      }
      router.refresh();
      onClose();
    } catch (err) {
      setError(mutationErrorMessage(err));
      setPending(false);
    }
  }

  return (
    <Modal
      title={isCreate ? "Новый предмет" : "Изменить предмет"}
      onClose={onClose}
      widthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Обязательное + статус */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className={labelClass}>
            Тип
            <select value={kind} onChange={(e) => setKind(e.target.value as ItemKind)} className={fieldClass}>
              {KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Номинал *
            <input
              autoFocus
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              placeholder="Например: 5"
              className={fieldClass}
            />
          </label>
        </div>

        {/* Статус владения */}
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <div className="text-sm font-medium text-slate-800">
              {isOwned ? "В коллекции" : "В поиске"}
            </div>
            <div className="text-xs text-slate-500">
              {isOwned ? "Предмет уже у вас" : "Предмет в списке желаемого"}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isOwned}
            onClick={() => setIsOwned((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              isOwned ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                isOwned ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Описание */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <label className={labelClass}>
            Валюта
            <input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="Рубль" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Страна
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="СССР" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Год выпуска
            <input inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1980" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Состояние
            <select value={condition} onChange={(e) => setCondition(e.target.value as ItemCondition)} className={fieldClass}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Количество
            <input inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} placeholder="1" className={fieldClass} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className={labelClass}>
              Серия от
              <input inputMode="numeric" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} className={fieldClass} />
            </label>
            <label className={labelClass}>
              до
              <input inputMode="numeric" value={yearTo} onChange={(e) => setYearTo(e.target.value)} className={fieldClass} />
            </label>
          </div>
        </div>

        {/* Финансы */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <label className={labelClass}>
            Цена покупки
            <input inputMode="decimal" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="3200" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Валюта покупки
            <input value={purchaseCurrency} onChange={(e) => setPurchaseCurrency(e.target.value)} placeholder="RUB" className={fieldClass} />
          </label>
          <label className={labelClass}>
            Дата покупки
            <input type="date" value={purchaseDate ? purchaseDate.slice(0, 10) : ""} onChange={(e) => setPurchaseDate(e.target.value)} className={fieldClass} />
          </label>
        </div>

        <label className={labelClass}>
          Комментарий
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Заметки по предмету..." className={`${fieldClass} resize-y`} />
        </label>

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
