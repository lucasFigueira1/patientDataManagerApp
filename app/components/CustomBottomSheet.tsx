import { View, Text, Platform, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

interface Props {
  children: React.ReactNode
  isOpen: boolean
  closeBottomSheet: () => void
}

export default function CustomBottomSheet({ children, isOpen, closeBottomSheet }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.6}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present()
    } else if (!isOpen) {
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      closeBottomSheet()
    }
  };

  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        enableDynamicSizing
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        keyboardBehavior="interactive"
        backgroundStyle={styles.bottomSheetShadow}
        onDismiss={closeBottomSheet}
      >
        <BottomSheetView style={{ flex: 0, minHeight: 100 }}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

const shadowStyle = Platform.select({
  ios: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  android: {
    elevation: 12,
  },
});

const styles = StyleSheet.create({
  bottomSheetShadow: {
    ...shadowStyle,
    backgroundColor: '#fff'
  },
});