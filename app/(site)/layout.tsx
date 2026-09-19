import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreHydrator } from "@/components/layout/StoreHydrator";

/**
 * Layout compartido por las 38 pantallas: Cabecera y Pie de página
 * persistentes (sección 2 del PDF), con el contenido de cada pantalla en
 * medio.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <StoreHydrator />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
