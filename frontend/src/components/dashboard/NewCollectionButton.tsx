"use client";

export function NewCollectionButton() {
  return (
    <button
      type="button"
      aria-label="Создать коллекцию"
      title="Создать коллекцию"
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
}
