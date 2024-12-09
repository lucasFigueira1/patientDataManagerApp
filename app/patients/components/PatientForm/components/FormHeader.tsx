import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { usePatientsContext } from '@/app/patients/context/PatientsContext'
import CustomPressable from '@/app/components/CustomPressable'
import { t } from '@/app/utils/constants'

interface Props {
  handleSubmit: () => void
}

export default function FormHeader({ handleSubmit }: Props) {
  const { isPatientBottomSheetOpen, handleCloseBottomSheet } = usePatientsContext()

  return (
    <View style={styles.container}>
      <CustomPressable
        containerStyle={styles.buttonContainer}
        onPress={handleCloseBottomSheet}
      >
        <Text style={styles.btnLabel}>
          Cancel
        </Text>
      </CustomPressable>

      <CustomPressable
        containerStyle={styles.buttonContainer}
        onPress={handleSubmit}
      >
        <Text style={styles.btnLabel}>
          {isPatientBottomSheetOpen && isPatientBottomSheetOpen?.type === 'add' ? 'Add' : 'Edit'}
        </Text>
      </CustomPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: t.purple
  },
  buttonContainer: {
    padding: 4
  }
});