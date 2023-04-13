import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { StatusBarProps } from 'react-native'

import { CStatusBar } from 'components/atoms'

export interface FocusAwareStatusBarProps extends StatusBarProps {}

export const FocusAwareStatusBar: React.FC<
  FocusAwareStatusBarProps
> = props => {
  const isFocused = useIsFocused()

  return isFocused ? <CStatusBar {...props} /> : null
}
