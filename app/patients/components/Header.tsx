import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { t } from '@/app/utils/constants'
import AddPacientBtn from './AddPacientBtn'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Patients
      </Text>
      <AddPacientBtn />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: t.py,
    paddingHorizontal: t.ph,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})