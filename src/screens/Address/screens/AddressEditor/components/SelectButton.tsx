import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { Roboto } from 'constants/fonts'

interface Props extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  content?: string
}

export const SelectButton: React.FC<Props> = ({
  disabled,
  containerStyle,
  textStyle,
  content,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled
          ? { backgroundColor: '#E5E5E5A6', borderColor: '#D1D1D1' }
          : { backgroundColor: '#ECEFF6', borderColor: '#ECEFF6' },
        containerStyle,
      ]}
      {...restProps}
    >
      <Text numberOfLines={1} style={[styles.text, textStyle]}>
        {content}
      </Text>
      <Entypo
        name="chevron-right"
        color={disabled ? '#D1D1D1' : '#656B79'}
        size={moderateScale(22)}
      />
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '40@vs',
    borderRadius: '16@ms',
    borderWidth: 1,
    paddingHorizontal: '8@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: Roboto.regular,
    fontSize: '14@ms',
    flex: 0.9,
  },
})
