import React, { createContext, useContext, useState } from "react";
import { Patient, PatientBsType } from "../types";

interface PatientsContextType {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  isPatientBottomSheetOpen: PatientBsType | false;
  setIsPatientBottomSheetOpen: React.Dispatch<React.SetStateAction<PatientBsType | false>>;
  handleCloseBottomSheet: () => void;
  openEditPatientBs: (patient: Patient) => void;
  openAddPatientBs: () => void;
  handleSubmitEditExistingPatient: (editedPatient: Patient) => void;
  handleSubmitAddNewPatient: (newPatient: Patient) => void;
}

export const PatientsContext = createContext<PatientsContextType>({} as PatientsContextType);

export function PatientsContextProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isPatientBottomSheetOpen, setIsPatientBottomSheetOpen] = useState<PatientBsType | false>(false);

  const handleCloseBottomSheet = () => setIsPatientBottomSheetOpen(false);
  const openEditPatientBs = (patient: Patient) => setIsPatientBottomSheetOpen({ patient, type: 'edit' });
  const openAddPatientBs = () => setIsPatientBottomSheetOpen({ type: 'add' });

  const handleSubmitEditExistingPatient = (editedPatient: Patient) => {
    setPatients(patients.map(p => p.id === editedPatient.id ? editedPatient : p))
  }

  const handleSubmitAddNewPatient = (newPatient: Patient) => {
    setPatients([newPatient, ...patients])
  }

  const value = {
    patients,
    setPatients,
    isPatientBottomSheetOpen,
    setIsPatientBottomSheetOpen,
    handleCloseBottomSheet,
    openEditPatientBs,
    openAddPatientBs,
    handleSubmitEditExistingPatient,
    handleSubmitAddNewPatient
  };

  return <PatientsContext.Provider value={value}>{children}</PatientsContext.Provider>;
}

export const usePatientsContext = () => {
  const context = useContext(PatientsContext)
  if (!context) {
    throw new Error("usePatientsContext must be used within a PatientsContext");
  }
  return context
}