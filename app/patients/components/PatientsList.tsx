import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { usePatientsContext } from '../context/PatientsContext'
import { t } from '@/app/utils/constants'
import PatientCard from '@/app/patients/components/PatientCard'

export default function PatientsList() {
  const { patients } = usePatientsContext()

  return (
    <FlatList
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
      data={patients}
      contentContainerStyle={{ paddingBottom: 20, gap: 4 }}
      renderItem={({ item }) => <PatientCard pacient={item} />}
    />
  )
}