import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';

interface Props {
  uri: string
  size?: number
}

export default function CustomAvatar({ uri, size = 56 }: Props) {

  const [imageError, setImageError] = useState(false)

  return (
    <>
      <Image
        onError={() => setImageError(true)}
        style={styles(size).image}
        source={(imageError || uri === '') ? require('@/assets/images/default-avatar.jpg') : { uri }}
      />
    </>
  )
}

const styles = (size: number) => StyleSheet.create({
  image: {
    backgroundColor: '#0553',
    width: size,
    height: size,
    borderRadius: 100,
  },
});