import React, { FC, useCallback, useContext, useRef, useState } from 'react'
import { createContext } from "react";
import Toast from './Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';

export type ToastPresetTypes = "success" | "error" | "info" | null;

interface ToastContextProps {
  showToast: (toastProps: showToastProps) => void;
}

export interface showToastProps {
  message: string | null;
  preset: ToastPresetTypes;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const animatedViewRef = useRef({})
  const [toastParams, setToastParams] = useState<showToastProps>({
    message: null,
    preset: null,
  });

  const toastBottomAnimationValue = useSharedValue(-100)
  const insets = useSafeAreaInsets()

  const showToast = useCallback((toastProps: showToastProps) => {
    setToastParams({
      message: toastProps.message,
      preset: toastProps.preset
    })

    toastBottomAnimationValue.value = withSequence(
      withTiming(Math.max(Number(insets.bottom), 15)),
      withDelay(
        5000,
        withTiming(-100, undefined, finish => {
          if (finish) {
            runOnJS(() => {
              resetToast()
            })
          }
        })
      )
    )
  }, [insets, toastBottomAnimationValue])

  const resetToast = () => {
    setToastParams({
      message: null,
      preset: null
    })
  }

  const animatedBottomStyle = useAnimatedStyle(() => {
    return {
      bottom: toastBottomAnimationValue.value
    }
  })

  const value: ToastContextProps = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <>
        {children}
        {toastParams.message && toastParams.preset &&
          <Toast
            ref={animatedViewRef}
            message={toastParams.message}
            preset={toastParams.preset}
            resetToast={resetToast}
            animatedBottomStyle={animatedBottomStyle}
          />
        }
      </>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}