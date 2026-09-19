import { Container } from "./Container";

/**
 * Page Header (componente "Web/Page Header"): H1 de la pantalla + una línea
 * de apoyo en Body.
 */
export function PageHeader({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <Container className="pb-8 pt-2">
      <h1 className="text-h1">{title}</h1>
      {body && <p className="text-body mt-2 text-gray-60">{body}</p>}
    </Container>
  );
}
