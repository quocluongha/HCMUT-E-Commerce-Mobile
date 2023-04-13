import React from 'react'
import {
  SafeAreaView as SafeAreaViewBase,
  SafeAreaViewProps as SafeAreaViewBaseProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

export interface SafeAreaViewProps extends SafeAreaViewBaseProps {}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  style,
  ...props
}) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <SafeAreaViewBase
      style={[
        styles.container,
        bottom === 0 ? { paddingBottom: verticalScale(12) } : {},
        style,
      ]}
      {...props}
    />
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
