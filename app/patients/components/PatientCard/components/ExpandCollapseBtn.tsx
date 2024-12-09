import { Text, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { t } from '@/app/utils/constants'

interface Props {
  isExpanded: boolean,
}

export default function ExpandCollapseBtn({ isExpanded }: Props) {
  return (
    <View style={styles.expandContainer}>
      <MaterialIcons name={isExpanded ? 'expand-less' : 'expand-more'} size={18} color={t.purple} />
      <Text style={{ color: t.purple, fontSize: 14, fontWeight: '500' }}>
        {isExpanded ? 'View less' : 'View more'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  expandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-end',
    padding: 4,
  }
});