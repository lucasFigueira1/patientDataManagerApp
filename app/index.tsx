import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Patients from '../src/patients';
import { PatientsContextProvider } from '../src/patients/context/PatientsContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from '../src/ToastProvider';
import { KeyboardAvoidingView, Platform } from 'react-native';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ToastProvider>
          <PatientsContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <Patients />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </PatientsContextProvider>
        </ToastProvider>
      </KeyboardAvoidingView>
    </QueryClientProvider>
  );
}