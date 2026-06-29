import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  pageSize?: number;
}

export default function DataTable<T>({
  columns, rows, keyExtractor, onRowClick, emptyMessage = 'No data found', pageSize = 10,
}: Props<T>) {
  const [page, setPage] = useState(0);
  const totalPages = pageSize ? Math.ceil(rows.length / pageSize) : 1;
  const paginatedRows = useMemo(() => {
    if (!pageSize) return rows;
    return rows.slice(page * pageSize, (page + 1) * pageSize);
  }, [rows, page, pageSize]);

  if (rows.length === 0) return null;

  return (
    <div className="card overflow-hidden !p-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-800">
              {columns.map((col) => (
                <th key={col.key} className={`text-left text-xs font-medium text-surface-500 uppercase tracking-wider px-4 py-3 ${col.className || ''}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800/50">
            {paginatedRows.map((row) => (
              <tr
                key={keyExtractor(row)}
                className={`${onRowClick ? 'cursor-pointer hover:bg-surface-800/50' : ''} transition-colors`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-sm text-surface-300 ${col.className || ''}`}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageSize && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-800">
          <span className="text-xs text-surface-500">
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, rows.length)} of {rows.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="btn-ghost p-1.5 disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  i === page ? 'bg-primary-500/10 text-primary-400' : 'text-surface-500 hover:text-surface-300 hover:bg-surface-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="btn-ghost p-1.5 disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
