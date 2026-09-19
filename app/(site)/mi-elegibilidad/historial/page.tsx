import { ScreenStub } from "@/components/layout/ScreenStub";

export default function HistorialPage() {
  return (
    <ScreenStub
      number="32"
      name="Historial de donaciones"
      group="F"
      breadcrumb={[
        { label: "Inicio", href: "/" },
        { label: "Mi elegibilidad", href: "/mi-elegibilidad" },
        { label: "Historial" },
      ]}
    />
  );
}
