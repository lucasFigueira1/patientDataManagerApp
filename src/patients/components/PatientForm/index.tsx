import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { t } from '@/src/utils/constants'
import CustomInput from '@/src/components/CustomInput'
import { Patient, PatientBsType } from '../../types'
import FormHeader from './components/FormHeader'
import { usePatientsContext } from '../../context/PatientsContext'
import { useToast } from '@/src/ToastProvider'
import AvatarFormField from './components/AvatarFormField'

interface Props {
  patientToEdit: PatientBsType | false
}

function createId(name: string): string {
  return `${name}-${Date.now().toString()}`
}

export default function PatientForm({ patientToEdit }: Props) {
  const { handleSubmitEditExistingPatient, handleSubmitAddNewPatient, handleCloseBottomSheet } = usePatientsContext()
  const { showToast } = useToast() || {}

  const { type, patient } = patientToEdit || {}

  const emptyPatient: Patient = {
    id: '',
    createdAt: '',
    name: '',
    avatar: '',
    description: '',
    website: ''
  }

  const initialValues: Patient = useMemo(() => {
    if (patientToEdit && type === 'edit') return patient ?? emptyPatient
    return emptyPatient
  }, [patientToEdit])

  const { control, handleSubmit, clearErrors, setValue } = useForm({
    defaultValues: initialValues
  })

  const onSubmit = (values: Patient) => {
    try {
      if (type === 'edit') {
        handleSubmitEditExistingPatient(values)
      } else {
        const newPatient: Patient = {
          ...values,
          id: createId(values.name),
          createdAt: new Date().toISOString(),
        }

        handleSubmitAddNewPatient(newPatient)
      }

      handleCloseBottomSheet()
      showToast({
        message: `Patient ${type === 'add' ? 'added' : 'edited'} successfully`,
        preset: 'success'
      })

    } catch (error) {
      showToast({
        message: 'Something went wrong, please try again',
        preset: 'error'
      })
    }
  }

  const onChangeAvatar = (avatarUri: string) => {
    setValue('avatar', avatarUri)
  }

  return (
    <View style={{ paddingHorizontal: t.ph, gap: 10, paddingBottom: 30 }}>
      <FormHeader handleSubmit={() => handleSubmit(onSubmit)()} />
      <AvatarFormField
        avatarUri={patient?.avatar ?? ''}
        onChangeAvatar={onChangeAvatar}
      />
      <CustomInput
        clearErrors={clearErrors}
        name="name"
        control={control}
        title='Name'
        placeholder='e.g. John Doe'
        rules={{
          required: 'Name is required'
        }}
      />
      <CustomInput
        clearErrors={clearErrors}
        name="website"
        control={control}
        title='Website'
        placeholder='e.g. https://www.example.com'
        rules={{
          pattern: {
            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: 'Please enter a valid URL'
          },
          required: 'Website is required'
        }}
      />
      <CustomInput
        clearErrors={clearErrors}
        multiline
        name="description"
        control={control}
        title='Description'
        placeholder='Describe a bit more about the patient...'
        rules={{
          required: 'Description is required',
          minLength: {
            value: 10,
            message: 'Description must be at least 10 characters'
          },
        }}
      />
    </View>
  )
}