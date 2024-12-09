import { View, Text, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'
import React, { forwardRef } from 'react'
import { showToastProps } from './index'
import Animated from 'react-native-reanimated';
import { getStyles } from './styles';
import { getIcon } from './icon';

interface ToastProps extends showToastProps {
  resetToast: () => void;
  animatedBottomStyle: ViewStyle
}

const Toast = forwardRef(({ message, preset, animatedBottomStyle }: ToastProps, ref: any) => {
  const { backgroundColor, titleColor } = getStyles(preset) || {}
  const icon = getIcon(preset)

  return (
    <Animated.View ref={ref} style={[styles.toastContainer, animatedBottomStyle, { backgroundColor }]}>
      {icon ? icon : null}
      <View style={styles.titleCard}>
        <Text style={[styles.title, { color: titleColor ?? '#000' }]}>{message ?? ''}</Text>
      </View>
    </Animated.View>
  )
})

export default Toast;

export const styles = StyleSheet.create({
  toastContainer: {
    gap: 6,
    backgroundColor: '#def1d7',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6
  },
  titleCard: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 5
  },
  title: {
    fontSize: 14,
    fontWeight: '700'
  },
  description: {
    fontSize: 10,
    fontWeight: '500'
  }
})