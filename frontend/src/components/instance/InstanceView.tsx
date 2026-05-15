"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Item } from "@/types";

function CoinFace({ label, item }: { label: string; item: Item }) {
  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
      <span className="absolute left-3 top-3 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>
      <div className="text-center">
        <div className="text-5xl font-bold text-slate-400">{item.nominal}</div>
        <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{item.currency}</div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-0.5 text-sm text-slate-800">{value ?? "—"}</div>
    </div>
  );
}

export function InstanceView({
  item,
  prevHref,
  nextHref,
  closeHref,
}: {
  item: Item;
  prevHref: string | null;
  nextHref: string | null;
  closeHref: string;
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* LEFT */}
      <div className="space-y-4">
        <CoinFace label="AB · Аверс" item={item} />
        <CoinFace label="PEB · Реверс" item={item} />

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => prevHref && router.push(prevHref)}
              disabled={!prevHref}
              aria-label="Предыдущая карточка"
              className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => nextHref && router.push(nextHref)}
              disabled={!nextHref}
              aria-label="Следующая карточка"
              className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          <Link
            href={closeHref}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
            Закрыть
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-4">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
            Delete
          </button>
        </div>

        {/* Passport */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <SectionTitle>Паспорт</SectionTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-slate-900">{item.nominal}</span>
            <span className="text-lg font-medium text-slate-600">{item.currency}</span>
          </div>
          <div className="mt-1 text-sm text-slate-600">{item.country}</div>
        </section>

        {/* Main params */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <SectionTitle>Основные параметры</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Серия (годы)" value={`${item.yearFrom}–${item.yearTo}`} />
            <Field label="Состояние" value={item.condition} />
            <Field label="Количество" value={item.count} />
            <Field label="Год выпуска" value={item.year} />
          </div>
        </section>

        {/* Finance */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 text-slate-500">
          <SectionTitle>Учёт и финансы</SectionTitle>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <Field
              label="Цена покупки"
              value={
                item.purchasePrice !== null ? (
                  <span className="text-sm text-slate-600">
                    {item.purchasePrice.toLocaleString("ru-RU")}
                  </span>
                ) : null
              }
            />
            <Field
              label="Валюта"
              value={<span className="text-sm text-slate-600">{item.purchaseCurrency}</span>}
            />
            <Field
              label="Дата покупки"
              value={<span className="text-sm text-slate-600">{item.purchaseDate}</span>}
            />
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <SectionTitle>Заметки</SectionTitle>
          <textarea
            defaultValue={item.notes}
            rows={4}
            placeholder="Комментарий по предмету..."
            className="w-full resize-y rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </section>
      </div>
    </div>
  );
}
