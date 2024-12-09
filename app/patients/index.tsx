import { View, Text, TouchableOpacity } from "react-native";
import { usePatientsContext } from "./context/PatientsContext";
import { useQuery } from "@tanstack/react-query";
import { getPatients } from "./services/getPatients";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import PatientsList from "./components/PatientsList";
import FormBottomSheet from "./components/FormBottomSheet";

export default function Patients() {
  const { setPatients, isPatientBottomSheetOpen } = usePatientsContext();

  const { data } = useQuery({
    queryKey: ['patients'],
    queryFn: () => getPatients(),
  })

  useEffect(() => {
    if (!data) return;
    setPatients(data);
  }, [data])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <PatientsList />

      {!!isPatientBottomSheetOpen && <FormBottomSheet />}
    </SafeAreaView>
  )
}