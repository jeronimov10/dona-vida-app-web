import { ScreenStub } from "@/components/layout/ScreenStub";

export default function RegistroPage() {
  return (
    <ScreenStub
      number="02"
      name="Crear cuenta"
      group="A"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Crear cuenta" }]}
    />
  );
}
