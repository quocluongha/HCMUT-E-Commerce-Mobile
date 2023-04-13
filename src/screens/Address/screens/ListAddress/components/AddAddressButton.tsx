import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

interface Props extends TouchableOpacityProps {
  buttonText?: string
}

export const AddAddressButton: React.FC<Props> = ({
  buttonText,
  ...restProps
}) => {
  return (
    <TouchableOpacity {...restProps}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  buttonText: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#FFB703',
    fontSize: '16@ms',
  },
})
