import { ScreenStub } from "@/components/layout/ScreenStub";

export default function ErrorConexionPage() {
  return (
    <ScreenStub
      number="38"
      name="Error de conexión"
      group="G"
      breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Error" }]}
    />
  );
}
