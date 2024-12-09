import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { t } from '@/src/utils/constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Patient } from '@/src/patients/types';
import IconWithText from '@/src/components/IconWithText';
import CustomPressable from '@/src/components/CustomPressable';
import { usePatientsContext } from '../../context/PatientsContext';
import CustomAvatar from '@/src/components/CustomAvatar';

interface Props {
  pacient: Patient
}

export default function PatientCard({ pacient }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { openEditPatientBs } = usePatientsContext()
  const { name, avatar, description, website } = pacient || {}


  return (
    <View style={styles.container}>
      <CustomAvatar uri={avatar} size={56} />

      <View style={styles.infoContainer}>
        <CustomPressable
          onPress={() => openEditPatientBs(pacient)}
        >
          <IconWithText
            containerStyle={styles.textContainer}
            iconPosition='right'
            icon={<MaterialIcons name="edit" size={18} color={t.purple} />}
            text={name}
            textStyle={{
              fontSize: 21,
              fontWeight: 'bold',
              color: t.gray900,
            }}
          />
        </CustomPressable>


        <CustomPressable
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <IconWithText
            text={website}
            textStyle={{
              fontSize: 14,
              color: t.gray700,
              flex: 1
            }}
            icon={<MaterialIcons name="link" size={18} color={t.gray700} />}
            containerStyle={{ marginBottom: 4 }}
          />

          <Text
            numberOfLines={isExpanded ? undefined : 1}
            style={styles.secondaryText}
          >
            {description}
          </Text>
        </CustomPressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: t.ph,
    paddingVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  text: {
    fontSize: 21,
    fontWeight: 'bold',
    color: t.gray900,
  },
  secondaryText: {
    fontSize: 14,
    color: t.gray900,
    flex: 1,
  },
  secondaryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  infoContainer: {
    flex: 1,
    flexShrink: 1,
    marginHorizontal: 8
  }
});