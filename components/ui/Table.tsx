import { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tabla - Encabezado: fila de cabecera de una tabla de datos. */
export function TableHeader({ columns }: { columns: string[] }) {
  return (
    <tr className="bg-gray-20/40">
      {columns.map((column) => (
        <th
          key={column}
          className="px-4 py-3 text-left text-label uppercase text-gray-60"
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
        "border-b border-gray-20 text-body text-gray-black",
        onClick && "cursor-pointer hover:bg-gray-20/20",
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
    <div className={cn("overflow-x-auto border border-gray-20", className)}>
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
