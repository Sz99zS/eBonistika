"use client";

import { useEffect, type ReactNode } from "react";

export function Modal({
  title,
  onClose,
  children,
  widthClass = "max-w-md",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full ${widthClass} rounded-2xl border border-slate-200 bg-white shadow-xl`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

/** Общие классы для инпутов/селектов внутри форм. */
export const fieldClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export const labelClass = "flex flex-col gap-1 text-xs font-medium text-slate-500";

/** Кнопки футера формы (Отмена / Submit). */
export function ModalFooter({
  onCancel,
  submitLabel,
  pending,
  danger = false,
  disabled = false,
}: {
  onCancel: () => void;
  submitLabel: string;
  pending: boolean;
  danger?: boolean;
  disabled?: boolean;
}) {
  const accent = danger
    ? "bg-rose-600 hover:bg-rose-700"
    : "bg-emerald-500 hover:bg-emerald-600";
  return (
    <div className="mt-5 flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Отмена
      </button>
      <button
        type="submit"
        disabled={pending || disabled}
        className={`rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${accent}`}
      >
        {pending ? "..." : submitLabel}
      </button>
    </div>
  );
}

/** Стандартный блок вывода ошибки мутации. */
export function ErrorNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
      {message}
    </p>
  );
}
