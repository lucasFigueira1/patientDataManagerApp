import { Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export default function CustomPressable({ children, onPress, containerStyle = {} }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        containerStyle
      ]}
    >
      {children}
    </Pressable>
  )
}