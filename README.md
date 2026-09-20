# Dona Vida — Sitio web para donantes

Sitio web de alta fidelidad del proyecto **Dona Vida**, maquetado a partir de
los mockups de Figma *Dona Vida · Mockups Web* (38 pantallas). Acompaña al
prototipo móvil de donantes y comparte con él paleta, flujos y nomenclatura.

**Autores:** Alejandro Bernal López y Jerónimo Vásquez

---

## 1. Stack y versiones

| Tecnología | Versión | Rol |
| --- | --- | --- |
| [Next.js](https://nextjs.org) | 16.3.5 | Framework (App Router) |
| [React](https://react.dev) | 19.2.8 | Librería de interfaz |
| React DOM | 19.2.8 | Renderizado en navegador |
| [TypeScript](https://www.typescriptlang.org) | 5.9.3 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4.3.3 | Estilos utilitarios y tokens (`@theme`) |
| `@tailwindcss/postcss` | 4.x | Plugin de PostCSS para Tailwind v4 |
| [Zustand](https://zustand-demo.pmnd.rs) | 5.0.15 | Estado del prototipo (sesión, turno, perfil) |
| [ESLint](https://eslint.org) | 9.39.5 | Linter (`eslint-config-next`) |
| Fuente Inter | vía `next/font` | Tipografía del Design System |

**Entorno de desarrollo usado:** Node.js v26.4.0 · npm 11.17.0
(requiere Node 18.18 o superior).

---

## 2. Cómo ejecutarlo

```bash
# 1. Clonar
git clone https://github.com/jeronimov10/dona-vida-app-web.git
cd dona-vida-app-web

# 2. Instalar dependencias
npm install

# 3a. Modo desarrollo (recarga en caliente)
npm run dev

# 3b. Modo producción (lo que se despliega)
npm run build
npm run start
```

Luego abrir **http://localhost:3000**.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compilación de producción de las 36 rutas |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | Linter sobre todo el proyecto |

> Si tras `npm install` aparece `Permission denied` al ejecutar `next`,
> restaurar el permiso con `chmod +x node_modules/.bin/*`.

---

## 3. Sistema de diseño

### 3.1 Base: equivalencias con Material 3

El archivo de Figma **no vincula ninguna librería externa**: sus 31
componentes son locales, construidos como *equivalentes de los componentes de
Material 3* (sección 5.4 del documento del Design System) y luego
personalizados para la marca Dona Vida.

Este repositorio mantiene exactamente el mismo criterio: **no se usa una
librería de componentes de terceros**, sino los mismos 31 componentes
reimplementados en React + Tailwind, conservando la semántica de Material 3
—que queda anotada en cada archivo— y aplicando la personalización de marca
(paleta vinotinto, radios, sombras y tipografía propias).

| Componente en código | Equivalente Material 3 |
| --- | --- |
| `Button` (`primary` / `secondary`) | Filled button / Outlined button |
| `Chip` | Assist chip |
| `Tabs` | Primary tabs |
| `TextField` | Outlined text field |
| `Select` | Outlined select |
| `Checkbox`, `RadioOption` | Checkbox, Radio button |
| `Card`, `StatCard` | Elevated card |
| `Modal` | Dialog |
| `Banner`, `InfoNote` | Banner |
| `Stepper` | Progress indicator |
| `Table`, `Pagination`, `Calendar`, `Avatar` | Data table, Pagination, Date picker, Avatar |

### 3.2 Tokens de color

Definidos en `app/globals.css` con `@theme`; cada uno lleva anotado el nombre
de su variable en Figma.

| Token | Valor | Variable en Figma |
| --- | --- | --- |
| `primary` | `#7a1734` | `color/primary` |
| `surface` | `#ffffff` | `color/surface` |
| `background` | `#f5f2f1` | `color/background` |
| `ink` | `#1f1013` | `color/text-primary` |
| `ink-muted` | `#6b4c55` | `color/text-secondary` |
| `soft` | `#f4dce1` | `color/soft-fill` |
| `line` | `#c98ca0` | `color/border` |

### 3.3 Tipografía

Inter, en la escala del Design System: Display 48/56 · H1 32/40 · H2 24/32 ·
H3 18/26 · Body 15/24 · Label 13/18 · Button 14/20 · Caption 12/18.

### 3.4 Grilla

Lienzo de 1440px con márgenes laterales de 72px, es decir **1296px de
contenido** (`components/layout/Container.tsx`). En pantallas más anchas el
contenido se centra y crecen los márgenes; no se estira ni se refluye.

### 3.5 Iconos

Los 12 iconos (`components/icons/`) se exportaron del archivo de Figma y se
convirtieron a componentes React conservando los trazos originales. Usan
`currentColor` en lugar de colores fijos, de modo que heredan el color del
contexto. **No se usa ninguna imagen** para representar componentes.

---

## 4. Estructura del proyecto

```
app/
  (site)/            38 pantallas agrupadas por flujo (A–G)
  globals.css        tokens de color, escala tipográfica y capas decorativas
  layout.tsx         layout raíz, fuente Inter
components/
  layout/            Cabecera, Pie, Breadcrumb, Page/Section Header, Container
  ui/                los 31 componentes del Design System
  icons/             set de iconos exportado de Figma
lib/                 estado (Zustand), datos de ejemplo y utilidades
```

---

## 5. Notas

- Prototipo académico: los datos son simulados y no hay backend.
- El contenido de cada pantalla se monta en cliente (`ClientOnly`) porque
  depende de fechas relativas a “hoy”; esto elimina los errores de hidratación.
- El sitio es siempre claro: no implementa modo oscuro, igual que el diseño.
