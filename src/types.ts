export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'staff' | 'family' | 'patient';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  ward: string;
}

export interface Vital {
  id: string;
  type: string;
  value: string;
  unit: string;
  status: 'normal' | 'critical' | 'high' | 'borderline' | 'stable';
}

export interface Metric {
  label: string;
  value: string;
  change: string | number;
  trend: 'up' | 'down';
  icon?: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  physician: string;
  alert: boolean;
}

export interface HistoryEntry {
  id: string;
  dateTime: string;
  medication: string;
  dosage: string;
  administeredBy: string;
  status: 'SUCCESS' | 'MISSED';
  notes?: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'in-person' | 'telehealth';
}

export interface LabResult {
  id: string;
  analyte: string;
  value: string;
  reference: string;
  status: 'HIGH' | 'LOW' | 'NORMAL';
}
