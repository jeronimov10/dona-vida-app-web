import { ReactNode } from "react";
import { Button } from "./Button";

export interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

/** Modal (dialog): título + cuerpo + par de botones Cancelar/Guardar. */
export function Modal({
  open,
  title,
  children,
  onCancel,
  onConfirm,
  cancelLabel = "Cancelar",
  confirmLabel = "Guardar",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-black/40 px-4">
      <div className="w-full max-w-[420px] border border-gray-40 bg-gray-white p-6">
        <p className="text-h3">{title}</p>
        <div className="text-body mt-2 text-gray-60">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
