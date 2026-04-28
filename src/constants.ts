import { Patient, Vital, Metric, Insight, Appointment, LabResult } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "P-001",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    age: 42,
    gender: "Female",
    bloodType: "A-",
    ward: "3A-05"
  },
  {
    id: "P-002",
    name: "Robert Chen",
    email: "robert.c@example.com",
    age: 71,
    gender: "Male",
    bloodType: "B+",
    ward: "ICU-02"
  },
  {
    id: "P-003",
    name: "Ramesh Kumar",
    email: "ramesh.k@example.com",
    age: 68,
    gender: "Male",
    bloodType: "O+",
    ward: "4B-12"
  }
];

export const MOCK_VITALS: Vital[] = [
  { id: "v1", type: "BP", value: "120/80", unit: "mmHg", status: 'stable' },
  { id: "v2", type: "GLUCOSE", value: "98", unit: "mg/dL", status: 'stable' },
  { id: "v3", type: "HR", value: "72", unit: "BPM", status: 'stable' },
  { id: "v4", type: "SPO2", value: "98", unit: "%", status: 'stable' },
  { id: "v5", type: "TEMP", value: "98.6", unit: "°F", status: 'normal' },
  { id: "v6", type: "WEIGHT", value: "75kg", unit: "Stable", status: 'normal' }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "A-001",
    doctor: "Dr. Sarah Jenkins",
    specialty: "CARDIOLOGIST",
    date: "Oct 24, 2023",
    time: "09:30 AM",
    location: "West Wing, Suite 402",
    status: 'upcoming',
    type: 'in-person'
  },
  {
    id: "A-002",
    doctor: "Dr. Michael Chen",
    specialty: "ORTHOPEDICS",
    date: "Oct 27, 2023",
    time: "02:15 PM",
    location: "Telehealth Session",
    status: 'upcoming',
    type: 'telehealth'
  }
];

export const MOCK_LAB_RESULTS: LabResult[] = [
  { id: "L-001", analyte: "HbA1c", value: "8.4%", reference: "4.0 - 5.6%", status: 'HIGH' },
  { id: "L-002", analyte: "Creatinine", value: "1.8 mg/dL", reference: "0.7 - 1.3 mg/dL", status: 'HIGH' },
  { id: "L-003", analyte: "Hemoglobin", value: "11.2 g/dL", reference: "13.5 - 17.5 g/dL", status: 'LOW' }
];

export const MOCK_METRICS: Metric[] = [
  { label: "Total Admissions", value: "1,240", change: "+12", trend: "up" },
  { label: "Avg Wait Time", value: "18m", change: "-4m", trend: "down" },
  { label: "Critical Vitals", value: "8", change: "+2", trend: "up" },
  { label: "Staff Active", value: "24", change: "+5", trend: "up" }
];

export const MOCK_INSIGHTS: Insight[] = [
  { id: "i1", title: "Bed Capacity Alert", description: "Ward 4B is reaching 95% capacity. Recommend protocol B-2.", priority: "High", timestamp: "5m ago" },
  { id: "i2", title: "Supply Chain", description: "Antibiotic stock projected to deplete in 48 hours.", priority: "Medium", timestamp: "12m ago" },
  { id: "i3", title: "Patient Satisfaction", description: "Positive feedback trend identified in outpatient surgery.", priority: "Low", timestamp: "1h ago" }
];
