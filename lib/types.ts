export interface DonorProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  bloodType: string;
  weight: number;
  birthdateISO: string;
  donorSinceISO: string;
  hasDonatedBefore: boolean;
  lastDonationDateISO: string;
}

export interface DonationRecord {
  dateISO: string;
  point: string;
  volumeMl: number | null;
  status: "Completada" | "No asistió";
}

export interface DonationPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  distanceKm: number;
  hoursStatus: string;
  weekdayHours: string;
  saturdayHours: string;
  whatToBring: string;
  urgentBloodType: string | null;
  weeklySlots: { day: string; time: string; status: string; slots: number }[];
  bloodNeeds: {
    bloodType: string;
    need: string;
    reserve: string;
    isYourType: boolean;
  }[];
}

export interface Turno {
  pointId: string;
  pointName: string;
  address: string;
  dateISO: string;
  time: string;
  code: string;
  reprogramCount: number;
}

export interface BookingDraft {
  pointId?: string;
  dateISO?: string;
  time?: string;
}

export interface NotificationPrefs {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface RecentSearch {
  location: string;
  pointsNear: number;
  lastSearched: string;
  avgDistanceKm: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RequisitoRow {
  requisito: string;
  condicion: string;
  comoSeVerifica: string;
  nota: string;
}
