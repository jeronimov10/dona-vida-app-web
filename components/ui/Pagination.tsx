import { cn } from "@/lib/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rangeLabel?: string;
  className?: string;
}

/**
 * Paginación: flechas de anterior/siguiente, botones numerados y una
 * leyenda de rango (p. ej. "1–5 de 24").
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rangeLabel,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Página anterior"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="h-8 w-8 rounded-md border border-line text-body text-ink disabled:opacity-40"
        >
          ‹
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "h-8 w-8 rounded-md text-body",
              page === currentPage
                ? "bg-primary text-surface"
                : "text-ink hover:bg-soft/60",
            )}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          aria-label="Página siguiente"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="h-8 w-8 rounded-md border border-line text-body text-ink disabled:opacity-40"
        >
          ›
        </button>
      </div>
      {rangeLabel && (
        <span className="text-caption text-ink-muted">{rangeLabel}</span>
      )}
    </div>
  );
}
