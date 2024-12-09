import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Patients from './patients';
import { PatientsContextProvider } from './patients/context/PatientsContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from './ToastProvider';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <PatientsContextProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Patients />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PatientsContextProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}