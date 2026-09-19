import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card } from "@/components/ui/Card";
import { InfoNote } from "@/components/ui/InfoNote";
import { SEED_FAQS } from "@/lib/seed";

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Preguntas frecuentes" }]}
      />
      <PageHeader
        title="Preguntas frecuentes"
        body="Lo que más nos preguntan los donantes antes de su primera vez."
      />
      <Container className="flex flex-col gap-6 pb-16">
        <SectionHeader title="Antes de donar" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SEED_FAQS.map((faq) => (
            <Card
              key={faq.question}
              title={faq.question}
              action={{ label: "Leer más" }}
            >
              {faq.answer}
            </Card>
          ))}
        </div>

        <InfoNote>
          Si tu duda no está aquí, escríbenos y te respondemos en menos de 24
          horas.
        </InfoNote>
      </Container>
    </>
  );
}
