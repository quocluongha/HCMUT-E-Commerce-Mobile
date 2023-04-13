import React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import {
  CountdownCircleTimer as CountdownCircleTimerBase,
  Props,
  TimeProps,
} from 'react-native-countdown-circle-timer'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

export type CountdownCircleTimerProps = {
  containerStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<TextStyle>
} & Props

export const CountdownCircleTimer: React.FC<CountdownCircleTimerProps> = ({
  containerStyle,
  contentStyle,
  children,
  ...restProps
}) => {
  const renderChildren =
    children ??
    (({ remainingTime }: TimeProps) => {
      return (
        <Text style={[styles.defaultTextStyle, contentStyle]}>
          {remainingTime}
        </Text>
      )
    })

  return (
    <View style={containerStyle}>
      <CountdownCircleTimerBase
        rotation="counterclockwise"
        size={moderateScale(40)}
        strokeWidth={moderateScale(4)}
        {...restProps}
      >
        {renderChildren}
      </CountdownCircleTimerBase>
    </View>
  )
}

const styles = ScaledSheet.create({
  defaultTextStyle: {
    fontFamily: Roboto.medium,
    color: '#000000',
    fontSize: '14@ms',
  },
})
