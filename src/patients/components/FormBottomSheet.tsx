import { View, Text } from 'react-native'
import React from 'react'
import CustomBottomSheet from '@/src/components/CustomBottomSheet'
import { usePatientsContext } from '../context/PatientsContext'
import PatientForm from './PatientForm'

export default function FormBottomSheet() {
  const { isPatientBottomSheetOpen, handleCloseBottomSheet } = usePatientsContext()

  return (
    <CustomBottomSheet
      closeBottomSheet={handleCloseBottomSheet}
      isOpen={!!isPatientBottomSheetOpen}
    >
      <PatientForm patientToEdit={isPatientBottomSheetOpen} />
    </CustomBottomSheet>
  )
}