import { HeaderBackButtonProps } from '@react-navigation/elements'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

interface Props extends HeaderBackButtonProps {
  icon?: JSX.Element
}

export const HeaderButton: React.FC<Props> = ({
  onPress,
  disabled,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
    >
      {icon}
    </TouchableOpacity>
  )
}

export const styles = ScaledSheet.create({
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '40@ms',
    // height: '40@ms',
    // borderRadius: '14@ms',
    // backgroundColor: '#ECEFF6',
  },
})
