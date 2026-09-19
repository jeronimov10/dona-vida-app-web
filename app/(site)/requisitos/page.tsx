import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { InfoNote } from "@/components/ui/InfoNote";
import { SEED_REQUISITOS } from "@/lib/seed";

export default function RequisitosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Requisitos" }]} />
      <PageHeader
        title="Requisitos para donar"
        body="Revisa estas condiciones antes de agendar tu turno."
      />
      <Container className="flex flex-col gap-6 pb-16">
        <SectionHeader title="Requisitos básicos" />
        <Table
          columns={["Requisito", "Condición", "Cómo se verifica", "Nota"]}
          rows={SEED_REQUISITOS.map((r) => [
            r.requisito,
            r.condicion,
            r.comoSeVerifica,
            r.nota,
          ])}
        />

        <InfoNote>
          Estas condiciones las define la Red Nacional de Bancos de Sangre y
          pueden variar según el tipo de donación.
        </InfoNote>

        <div className="flex gap-4">
          <Button href="/agendar/elegibilidad">Verificar si puedo donar</Button>
          <Button href="/preguntas-frecuentes" variant="secondary">
            Preguntas frecuentes
          </Button>
        </div>
      </Container>
    </>
  );
}
