import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Animated from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

interface Props extends Animated.AnimateProps<TouchableOpacityProps> {
  buttonText?: string
}

export const AddAdressButton: React.FC<Props> = ({
  buttonText,
  ...restProps
}) => {
  return (
    <AnimatedTouchableOpacity {...restProps}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </AnimatedTouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  buttonText: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#FFB703',
    fontSize: '14@ms',
  },
})
