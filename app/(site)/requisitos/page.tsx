import { ScreenStub } from "@/components/layout/ScreenStub";

export default function RequisitosPage() {
  return (
    <ScreenStub
      number="08"
      name="Requisitos para donar"
      group="B"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Requisitos" }]}
    />
  );
}
