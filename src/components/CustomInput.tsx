import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Controller, FieldError, RegisterOptions, UseFormClearErrors, UseFormReturn } from 'react-hook-form'
import { t } from '../utils/constants';
import { Patient } from '../patients/types';

interface Props {
  control: UseFormReturn<any>['control'];
  name: string;
  placeholder?: string;
  title: string;
  rules?: Omit<RegisterOptions<any, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
  multiline?: boolean
  clearErrors: UseFormClearErrors<any>
}

export default function CustomInput({ name = '', control, placeholder = '', title = '', rules, multiline = false, clearErrors }: Props) {
  return (
    <Controller
      rules={rules}
      name={name as string}
      control={control}
      render={({ field: { onChange, value: fieldValue }, fieldState: { error } }) => (
        <View style={{ alignItems: 'flex-start', gap: 4 }}>
          <Text style={styles(error).title}>
            {title}
          </Text>
          <TextInput
            onPressIn={() => clearErrors(name)}
            multiline={multiline}
            style={[
              styles(error).inputText,
              multiline && styles(error).multilineInput
            ]}
            {...fieldValue}
            value={fieldValue}
            placeholder={placeholder || title}
            placeholderTextColor={t.gray500}
            onChangeText={onChange}
          />

          {error &&
            <Text style={styles(error).errorText}>
              {error?.message || 'This field is required'}
            </Text>
          }
        </View>
      )}
    />
  )
}

export const styles = (error: FieldError | undefined) => StyleSheet.create({
  inputText: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: error ? t.error : '#dee2e6',
    borderWidth: 1,
    color: t.gray900,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 100,
  },
  title: {
    fontSize: 15,
    color: t.gray900,
    fontWeight: '600',
    marginLeft: 6,
  },
  errorText: {
    fontSize: 13,
    color: t.error,
    fontWeight: '500',
  }
});