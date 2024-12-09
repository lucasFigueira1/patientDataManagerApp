import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomAvatar from '@/app/components/CustomAvatar'
import * as ImagePicker from 'expo-image-picker';

interface Props {
  avatarUri?: string
}

export default function AvatarFormField({ avatarUri }: Props) {
  const [currentAvatar, setCurrentAvatar] = useState<string>(avatarUri ?? '')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={pickImage}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
      >
        <CustomAvatar uri={currentAvatar ?? ''} size={80} />
        <Text style={styles.label}>
          Edit
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 15,
    color: '#0080ff',
    fontWeight: '400',
  },
  btn: {
    gap: 4,
    alignItems: 'center',
  }
})