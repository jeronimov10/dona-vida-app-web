import { SVGProps } from "react";

/**
 * Set de iconos exportado del archivo de Figma "Dona Vida · Mockups Web".
 * Cada trazo usa `currentColor`, de modo que el icono toma el color del
 * texto que lo rodea y sirve igual sobre fondo claro que sobre el vinotinto.
 * El tamaño se controla con clases (`className="h-5 w-5"`).
 */
export type IconProps = SVGProps<SVGSVGElement>;

/** Gota de marca, en relleno sólido (logotipo de la cabecera). */
export function IconGota(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path d="M16 2.66667C16 2.66667 6.66667 14.4 6.66667 20.8C6.66667 25.8667 10.84 30 16 30C21.16 30 25.3333 25.8667 25.3333 20.8C25.3333 14.4 16 2.66667 16 2.66667Z" fill="currentColor"/>
    </svg>
  );
}

/** Gota de marca en contorno (pie de página). */
export function IconGotaOutline(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.2C12 3.2 18.2 10.1 18.2 14.3C18.2 15.9443 17.5468 17.5213 16.3841 18.6841C15.2213 19.8468 13.6443 20.5 12 20.5C10.3557 20.5 8.77866 19.8468 7.61594 18.6841C6.45321 17.5213 5.8 15.9443 5.8 14.3C5.8 10.1 12 3.2 12 3.2Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"/>
    </svg>
  );
}

/** Silueta de persona (botón de cuenta). */
export function IconUser(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M8 8C9.47276 8 10.6667 6.80609 10.6667 5.33333C10.6667 3.86057 9.47276 2.66667 8 2.66667C6.52724 2.66667 5.33333 3.86057 5.33333 5.33333C5.33333 6.80609 6.52724 8 8 8Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M2.66667 14C2.66667 11.0667 5.06667 8.66667 8 8.66667C10.9333 8.66667 13.3333 11.0667 13.3333 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  );
}

/** Corazón (enlaces de contacto del pie). */
export function IconHeart(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17.0833C10 17.0833 2.91667 12.5 2.91667 8C2.88628 7.15608 3.13542 6.32575 3.62538 5.63795C4.11535 4.95016 4.81872 4.44341 5.62625 4.1964C6.43378 3.94939 7.30028 3.97595 8.09117 4.27195C8.88206 4.56795 9.55308 5.11683 10 5.83333C10.4469 5.11683 11.1179 4.56795 11.9088 4.27195C12.6997 3.97595 13.5662 3.94939 14.3737 4.1964C15.1813 4.44341 15.8846 4.95016 16.3746 5.63795C16.8646 6.32575 17.1137 7.15608 17.0833 8C17.0833 12.5 10 17.0833 10 17.0833Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"/>
    </svg>
  );
}

/** Sobre (enlaces de contacto del pie). */
export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M3 6L10 10.8333L17 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Teléfono (enlaces de contacto del pie). */
export function IconPhone(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M6.16667 2.91667L8.16667 6.66667L6.66667 8.16667C7.67551 10.479 9.52105 12.3245 11.8333 13.3333L13.3333 11.8333L17.0833 13.8333L16.0833 16.5833C15.9374 16.934 15.6761 17.2242 15.3427 17.4061C15.0093 17.5879 14.6238 17.6505 14.25 17.5833C8.66667 16.6667 3.33333 11.3333 2.41667 6.16667C2.34953 5.79287 2.41207 5.40736 2.59393 5.07396C2.77578 4.74056 3.06605 4.47926 3.41667 4.33333L6.16667 2.91667Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"/>
    </svg>
  );
}

/** Lupa (campo de búsqueda). */
export function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M9.16667 15C12.3883 15 15 12.3883 15 9.16667C15 5.94501 12.3883 3.33333 9.16667 3.33333C5.94501 3.33333 3.33333 5.94501 3.33333 9.16667C3.33333 12.3883 5.94501 15 9.16667 15Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M13.3333 13.3333L17.5 17.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  );
}

/** Chevron a la derecha (acción de tarjeta). */
export function IconChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M6 3.33333L10.6667 8L6 12.6667" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Círculo con chulo (insignia de tarjeta). */
export function IconCheckCircle(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M6.66667 10L9.16667 12.5L13.3333 7.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Reloj (insignia de tarjeta). */
export function IconClock(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M10 10V5.83333" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
      <path d="M10 10L13.3333 10.8333" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  );
}

/** Calendario (insignia de tarjeta). */
export function IconCalendar(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth={2}/>
      <path d="M6.66667 1.66667V5" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
      <path d="M13.3333 1.66667V5" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
    </svg>
  );
}

/** Círculo de información (nota informativa). */
export function IconInfo(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="currentColor" strokeWidth={2}/>
      <path d="M10 9.16667V13.75" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
      <path d="M10 7.33333C10.4602 7.33333 10.8333 6.96024 10.8333 6.5C10.8333 6.03976 10.4602 5.66667 10 5.66667C9.53976 5.66667 9.16667 6.03976 9.16667 6.5C9.16667 6.96024 9.53976 7.33333 10 7.33333Z" fill="currentColor"/>
    </svg>
  );
}
