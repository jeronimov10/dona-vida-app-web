import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreHydrator } from "@/components/layout/StoreHydrator";
import { ClientOnly } from "@/components/layout/ClientOnly";
import { Decor } from "@/components/layout/Decor";

/**
 * Layout compartido por las 38 pantallas: Cabecera y Pie de página
 * persistentes (sección 2 del PDF), con el contenido de cada pantalla en
 * medio. El contenido va dentro de `ClientOnly` porque casi todas las
 * pantallas muestran datos derivados de "hoy" y del store; ver el
 * comentario de `ClientOnly` para el porqué.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Decor />
      <StoreHydrator />
      <Header />
      <main className="flex-1">
        <ClientOnly>{children}</ClientOnly>
      </main>
      <Footer />
    </div>
  );
}
