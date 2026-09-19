import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tabla - Encabezado: fila de cabecera de una tabla de datos. */
export function TableHeader({ columns }: { columns: string[] }) {
  return (
    <tr className="bg-soft/60">
      {columns.map((column) => (
        <th
          key={column}
          className="px-4 py-3 text-left text-label uppercase text-ink-muted"
        >
          {column}
        </th>
      ))}
    </tr>
  );
}

/** Tabla - Fila: fila de datos, opcionalmente clicable (navega al detalle). */
export function TableRow({
  cells,
  onClick,
}: {
  cells: ReactNode[];
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "border-b border-soft text-body text-ink",
        onClick && "cursor-pointer hover:bg-soft/40",
      )}
    >
      {cells.map((cell, index) => (
        <td key={index} className="px-4 py-3">
          {cell}
        </td>
      ))}
    </tr>
  );
}

export interface TableProps {
  columns: string[];
  rows: ReactNode[][];
  onRowClick?: (rowIndex: number) => void;
  className?: string;
}

/** Tabla: composición estándar de Tabla - Encabezado + Tabla - Fila. */
export function Table({ columns, rows, onRowClick, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-soft bg-surface", className)}>
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <TableHeader columns={columns} />
        </thead>
        <tbody>
          {rows.map((cells, index) => (
            <TableRow
              key={index}
              cells={cells}
              onClick={onRowClick ? () => onRowClick(index) : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
