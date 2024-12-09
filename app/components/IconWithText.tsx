import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
  icon: React.ReactNode
  text: string
  textStyle: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
  iconPosition?: 'left' | 'right'
}

export default function IconWithText({ icon, text, textStyle, containerStyle = {}, iconPosition = 'left' }: Props) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 5 }, containerStyle]}>
      {iconPosition === 'left' && icon}
      <Text
        numberOfLines={1}
        style={textStyle}
        selectable
      >
        {text}
      </Text>
      {iconPosition === 'right' && icon}
    </View>
  )
}