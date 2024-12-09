import { Pressable } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { t } from '@/src/utils/constants';
import { usePatientsContext } from '../context/PatientsContext';


export default function AddPacientBtn() {
  const { openAddPatientBs } = usePatientsContext()

  return (
    <Pressable
      onPress={openAddPatientBs}
      style={({ pressed }) => [{
        opacity: pressed ? 0.5 : 1,
        padding: 4,
      }]}>
      <Ionicons name="person-add" size={22} color={t.purple} />
    </Pressable>
  )
}