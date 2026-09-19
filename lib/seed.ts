import { addDays, todayISO } from "./format";
import type {
  DonationPoint,
  DonationRecord,
  DonorProfile,
  FaqItem,
  NotificationPrefs,
  RecentSearch,
  RequisitoRow,
} from "./types";

/**
 * Datos semilla del donante de ejemplo del PDF (Laura Gómez). Las fechas se
 * calculan en relación con "hoy" (en vez de quedar fijas en 2024) para que
 * la elegibilidad ("Cumple" / "95 días") sea correcta sin importar cuándo
 * se abra esta demo.
 */
export function createSeedProfile(): DonorProfile {
  const today = todayISO();
  return {
    name: "Laura Gómez",
    email: "laura.gomez@email.com",
    phone: "300 000 0000",
    city: "Bogotá",
    bloodType: "O−",
    weight: 62,
    birthdateISO: addDays(today, -24 * 365),
    donorSinceISO: addDays(today, -540),
    hasDonatedBefore: true,
    lastDonationDateISO: addDays(today, -95),
  };
}

export function createSeedDonations(profile: DonorProfile): DonationRecord[] {
  return [
    {
      dateISO: profile.lastDonationDateISO,
      point: "Clínica de la 72",
      volumeMl: 450,
      status: "Completada",
    },
    {
      dateISO: addDays(profile.lastDonationDateISO, -97),
      point: "Cruz Roja Colombiana",
      volumeMl: 450,
      status: "Completada",
    },
    {
      dateISO: addDays(profile.lastDonationDateISO, -97 - 150),
      point: "Hospital San Rafael",
      volumeMl: 450,
      status: "Completada",
    },
    {
      dateISO: addDays(profile.lastDonationDateISO, -97 - 150 - 110),
      point: "Clínica de la 72",
      volumeMl: null,
      status: "No asistió",
    },
  ];
}

export const BLOOD_TYPE_OPTIONS = [
  "O−",
  "O+",
  "A−",
  "A+",
  "B−",
  "B+",
  "AB−",
  "AB+",
];

export const SEED_POINTS: DonationPoint[] = [
  {
    id: "clinica-de-la-72",
    name: "Clínica de la 72",
    address: "Cra 20 # 72-10",
    city: "Chapinero, Bogotá",
    distanceKm: 1.2,
    hoursStatus: "Abierto ahora · Cierra 5 p. m.",
    weekdayHours: "Lunes a viernes: 7:00 a. m. - 5:00 p. m.",
    saturdayHours: "Sábados: 7:00 a. m. - 12:00 m",
    whatToBring: "Documento de identidad · No requiere ayuno",
    urgentBloodType: "O−",
    weeklySlots: [
      { day: "Jueves 15", time: "3:00 p. m.", status: "Disponible", slots: 6 },
      { day: "Viernes 16", time: "9:00 a. m.", status: "Casi lleno", slots: 2 },
    ],
    bloodNeeds: [
      { bloodType: "O−", need: "Crítica", reserve: "Menos de 1 día", isYourType: true },
      { bloodType: "O+", need: "Alta", reserve: "2 días", isYourType: false },
      { bloodType: "A+", need: "Media", reserve: "3 días", isYourType: false },
    ],
  },
  {
    id: "hospital-san-rafael",
    name: "Hospital San Rafael",
    address: "Calle 45 # 30-12",
    city: "Bogotá",
    distanceKm: 2.5,
    hoursStatus: "Abierto ahora · Cierra 6 p. m.",
    weekdayHours: "Lunes a viernes: 7:00 a. m. - 5:00 p. m.",
    saturdayHours: "Sábados: 7:00 a. m. - 12:00 m",
    whatToBring: "Documento de identidad · No requiere ayuno",
    urgentBloodType: null,
    weeklySlots: [
      { day: "Jueves 15", time: "3:00 p. m.", status: "Disponible", slots: 5 },
      { day: "Viernes 16", time: "9:00 a. m.", status: "Disponible", slots: 4 },
    ],
    bloodNeeds: [
      { bloodType: "O−", need: "Alta", reserve: "1 día", isYourType: true },
      { bloodType: "O+", need: "Media", reserve: "3 días", isYourType: false },
      { bloodType: "A+", need: "Media", reserve: "3 días", isYourType: false },
    ],
  },
  {
    id: "cruz-roja-colombiana",
    name: "Cruz Roja Colombiana",
    address: "Av. 68 # 90-40",
    city: "Bogotá",
    distanceKm: 3.8,
    hoursStatus: "Abierto ahora · Cierra 4 p. m.",
    weekdayHours: "Lunes a viernes: 7:00 a. m. - 5:00 p. m.",
    saturdayHours: "Sábados: 7:00 a. m. - 12:00 m",
    whatToBring: "Documento de identidad · No requiere ayuno",
    urgentBloodType: null,
    weeklySlots: [
      { day: "Jueves 15", time: "3:00 p. m.", status: "Disponible", slots: 7 },
      { day: "Viernes 16", time: "9:00 a. m.", status: "Disponible", slots: 3 },
    ],
    bloodNeeds: [
      { bloodType: "O−", need: "Media", reserve: "3 días", isYourType: true },
      { bloodType: "O+", need: "Media", reserve: "3 días", isYourType: false },
      { bloodType: "A+", need: "Baja", reserve: "5 días", isYourType: false },
    ],
  },
  {
    id: "centro-de-salud-norte",
    name: "Centro de Salud Norte",
    address: "Cra 15 # 100-20",
    city: "Bogotá",
    distanceKm: 4.1,
    hoursStatus: "Cerrado hoy",
    weekdayHours: "Lunes a viernes: 7:00 a. m. - 5:00 p. m.",
    saturdayHours: "Sábados: 7:00 a. m. - 12:00 m",
    whatToBring: "Documento de identidad · No requiere ayuno",
    urgentBloodType: null,
    weeklySlots: [
      { day: "Jueves 15", time: "3:00 p. m.", status: "Disponible", slots: 9 },
      { day: "Viernes 16", time: "9:00 a. m.", status: "Disponible", slots: 6 },
    ],
    bloodNeeds: [
      { bloodType: "O−", need: "Baja", reserve: "5 días", isYourType: true },
      { bloodType: "O+", need: "Baja", reserve: "5 días", isYourType: false },
      { bloodType: "A+", need: "Baja", reserve: "5 días", isYourType: false },
    ],
  },
];

export const SEED_RECENT_SEARCHES: RecentSearch[] = [
  { location: "Bogotá · Chapinero", pointsNear: 4, lastSearched: "Hace 2 días", avgDistanceKm: 1.8 },
  { location: "Bogotá · Usaquén", pointsNear: 3, lastSearched: "Hace 1 semana", avgDistanceKm: 3.2 },
];

export const SEED_NOTIFICATION_PREFS: NotificationPrefs = {
  email: true,
  push: false,
  sms: false,
};

export const SEED_FAQS: FaqItem[] = [
  {
    question: "¿Duele?",
    answer: "Se siente un pinchazo de un segundo. El resto del proceso no duele.",
  },
  {
    question: "¿Cuánto tarda?",
    answer: "Entre 30 y 45 minutos contando el registro y el descanso.",
  },
  {
    question: "¿Puedo donar si tomo medicamentos?",
    answer: "Depende del medicamento. Los antibióticos sí lo impiden.",
  },
  {
    question: "¿Cada cuánto puedo donar?",
    answer: "Cada 90 días. Te avisamos cuando vuelvas a ser elegible.",
  },
];

export const SEED_REQUISITOS: RequisitoRow[] = [
  {
    requisito: "Edad",
    condicion: "Entre 18 y 65 años",
    comoSeVerifica: "Con tu documento",
    nota: "Los menores no pueden donar",
  },
  {
    requisito: "Peso",
    condicion: "Más de 50 kg",
    comoSeVerifica: "En el punto de donación",
    nota: "Se pesa antes de donar",
  },
  {
    requisito: "Última donación",
    condicion: "Mínimo 90 días",
    comoSeVerifica: "Con tu historial",
    nota: "Se calcula automáticamente",
  },
  {
    requisito: "Salud",
    condicion: "Sin fiebre ni gripa 7 días antes",
    comoSeVerifica: "Cuestionario y valoración",
    nota: "Un profesional confirma",
  },
  {
    requisito: "Medicamentos",
    condicion: "Sin antibióticos",
    comoSeVerifica: "Cuestionario",
    nota: "Consulta si tienes dudas",
  },
];

/**
 * Escenario que ilustra el PDF para "aún no eres elegible" (pantallas 17 y
 * 31): se llega aquí cuando, en el cuestionario de la pantalla 15, no se
 * marcan las seis casillas. Los números (82 días, faltan 8) son los del
 * PDF; la fecha se calcula en relación con "hoy" para que nunca quede vieja.
 */
export function getIneligibleScenario() {
  const today = todayISO();
  const daysSince = 82;
  const daysRemaining = 8;
  return {
    daysSince,
    daysRemaining,
    nextEligibleDateISO: addDays(today, daysRemaining),
  };
}

/** Fecha semilla, dentro de "Elegir fecha" (18), sin cupos de horario a propósito. */
export function getNoCapacityDateISO(): string {
  return addDays(todayISO(), 2);
}
