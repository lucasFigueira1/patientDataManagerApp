import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomAvatar from '@/src/components/CustomAvatar'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useToast } from '@/src/ToastProvider';

interface Props {
  avatarUri?: string
  onChangeAvatar: (avatarUri: string) => void
}

export default function AvatarFormField({ avatarUri, onChangeAvatar }: Props) {
  const [currentAvatar, setCurrentAvatar] = useState<string>(avatarUri ?? '')
  const { showToast } = useToast()

  const pickImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled) {
        saveAvatar(result.assets[0].uri);
      }

    } catch (error) {
      showToast({
        message: 'Something went wrong trying to upload the image',
        preset: 'error'
      })
    }
  }

  const saveAvatar = (uri: string) => {
    setCurrentAvatar(uri)
    onChangeAvatar(uri)
  }

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