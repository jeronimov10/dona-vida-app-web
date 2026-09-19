"use client";

import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Banner } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";

const STEPS = [
  "Revisa tu conexión a internet y vuelve a intentarlo.",
  "Si el error se repite, espera unos minutos y recarga la página.",
  "Si persiste, escríbenos desde la página de contacto y te ayudamos.",
];

export default function ErrorConexionPage() {
  const router = useRouter();

  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Error" }]} />
      <PageHeader title="No pudimos completar la acción" body="Algo falló al conectarnos con el servidor." />
      <Container className="flex flex-col gap-6 pb-16">
        <Banner variant="error" title="Error de conexión">
          No pudimos guardar los cambios. Revisa tu conexión e inténtalo de
          nuevo.
        </Banner>

        <div>
          <p className="text-h2 mb-4">Qué puedes hacer</p>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-body text-ink">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <InfoNote>
          Ningún dato se perdió: el formulario conserva lo que ya habías
          escrito.
        </InfoNote>

        <div className="flex gap-4">
          <Button onClick={() => router.back()}>Reintentar</Button>
          <Button variant="secondary" href="/panel">
            Ir a mi panel
          </Button>
        </div>
      </Container>
    </>
  );
}
