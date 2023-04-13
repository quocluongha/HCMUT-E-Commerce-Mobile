import React from 'react'
import { Text, TextProps, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

export interface TouchableTextProps extends TextProps {}

export const TouchableText: React.FC<TouchableTextProps> = ({
  style,
  ...restProps
}) => {
  return <Text style={[styles.base, style]} {...restProps} />
}

const styles = ScaledSheet.create({
  base: {
    fontFamily: Roboto.regular,
    fontSize: '14@ms',
    color: '#157E4E',
    textDecorationLine: 'underline',
    textDecorationColor: '#157E4E',
    textDecorationStyle: 'solid',
  },
})
