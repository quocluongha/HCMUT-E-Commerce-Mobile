import React, { useState } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

interface Props extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>
  submitText?: string
  isSubmitting?: boolean
}

export const SubmitButton: React.FC<Props> = ({
  containerStyle,
  submitText,
  disabled,
  isSubmitting,
  onLayout = () => {},
  ...props
}) => {
  const [buttonHeight, setButtonHeight] = useState(0)

  const onLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent

    setButtonHeight(layout.height)

    onLayout(event)
  }

  return (
    <TouchableOpacity
      style={[
        styles.submitBtn,
        {
          backgroundColor: disabled ? 'rgba(255, 183, 3, 0.6)' : '#FFB703',
        },
        containerStyle,
      ]}
      onLayout={onLayoutHandler}
      disabled={disabled}
      {...props}
    >
      {isSubmitting ? (
        <MaterialIndicator color="#000000" size={buttonHeight * 0.6} />
      ) : (
        <Text style={styles.text}>{submitText}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '40@vs',
    borderRadius: '16@ms',
  },
  text: {
    color: '#000000',
    fontFamily: Roboto.regular,
    fontSize: '16@ms',
    fontWeight: '700',
  },
})
