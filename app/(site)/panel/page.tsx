import { ScreenStub } from "@/components/layout/ScreenStub";

export default function PanelPage() {
  return (
    <ScreenStub
      number="10"
      name="Mi panel"
      group="C"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Mi panel" }]}
    />
  );
}
