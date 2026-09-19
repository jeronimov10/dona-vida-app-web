import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { PageHeader } from "./PageHeader";
import { Container } from "./Container";

/**
 * Placeholder temporal usado únicamente por el esqueleto de rutas del Paso 1.
 * Cada pantalla recibe su implementación real en el Paso 3 (grupos A y B) o
 * en el Paso 4 (grupos C a G), momento en el que este componente deja de
 * usarse.
 */
export function ScreenStub({
  number,
  name,
  group,
  breadcrumb,
}: {
  number: string;
  name: string;
  group: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return (
    <>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <PageHeader title={`${number} ${name}`} body={`Grupo ${group} · pendiente de implementación.`} />
      <Container className="pb-16">
        <div className="border border-dashed border-gray-40 p-8 text-center text-body text-gray-60">
          Esta pantalla se implementa en un paso posterior del plan.
        </div>
      </Container>
    </>
  );
}
