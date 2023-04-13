import React from 'react'
import { Text } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

interface Props {
  description?: string
  isGettingData?: boolean
}

export const EmptyListComponent: React.FC<Props> = ({
  description,
  isGettingData,
}) => {
  return isGettingData ? (
    <MaterialIndicator color="#656B79" size={moderateScale(30)} />
  ) : (
    <Text style={styles.description}>{description}</Text>
  )
}

const styles = ScaledSheet.create({
  description: {
    fontFamily: Roboto.regular,
    color: '#656B79',
    fontSize: '14@ms',
  },
})
