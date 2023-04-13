import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Toast, { BaseToastProps } from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Roboto } from 'constants/fonts'

export interface CToastProps extends BaseToastProps {
  props: {
    message?: string
    LeftIcon?: JSX.Element
    RightIcon?: JSX.Element
    backgroundColor?: string
  }
}

export const CToast: React.FC<CToastProps> = ({ props }) => {
  const { LeftIcon, RightIcon, message, backgroundColor = '#38A169' } = props

  const leftIcon = LeftIcon ?? (
    <Ionicons
      name="checkmark-circle"
      color={'#FFFFFF'}
      size={moderateScale(26)}
    />
  )
  const rightIcon = RightIcon ?? (
    <Ionicons name="close" color={'#FFFFFF'} size={moderateScale(26)} />
  )

  const closeToast = () => {
    Toast.hide()
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {leftIcon}
      <Text style={styles.content} numberOfLines={1}>
        {message}
      </Text>
      <TouchableOpacity onPress={closeToast}>{rightIcon}</TouchableOpacity>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9,
    height: '50@vs',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '12@ms',
    paddingHorizontal: '16@ms',
  },
  content: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '16@ms',
    color: '#FFFFFF',
    flex: 0.9,
  },
})
