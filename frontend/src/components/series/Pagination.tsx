"use client";

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const base =
    "inline-flex size-8 items-center justify-center rounded-md border text-sm transition";
  const inactive =
    "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700";
  const active = "border-indigo-500 bg-indigo-500 text-white";
  const disabled = "cursor-not-allowed opacity-40";

  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-2">
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? active : inactive}`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        aria-label="Next page"
        className={`${base} ${inactive} ${page === pageCount ? disabled : ""}`}
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
}
