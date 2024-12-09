export interface Patient {
  id: string;
  createdAt: string;
  name: string
  avatar: string
  description: string
  website: string
}


export type PatientBottomSheetType = 'add' | 'edit';

export interface PatientBsType {
  patient?: Patient;
  type: PatientBottomSheetType;
}