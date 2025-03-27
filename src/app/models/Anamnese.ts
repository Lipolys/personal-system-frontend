import { Patient } from './patient';

export interface Anamnese {
  id?: number;
  patient: Patient;
  anamnesisDate: string;
  mainComplaints: string;
  medicalHistory: string;
  observations?: string;
  weight: number;
  height: number;
  waistCircumference: number;
  hipCircumference: number;
  bodyFatPercentage: number;
  muscleMass: number;
  bodyMassIndex: number;
  waistHipRatio: number;
}
