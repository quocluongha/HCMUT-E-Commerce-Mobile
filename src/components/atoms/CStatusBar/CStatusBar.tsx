import React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'

interface Props extends StatusBarProps {}

export const CStatusBar: React.FC<Props> = props => {
  return (
    <StatusBar
      animated
      barStyle={'light-content'}
      backgroundColor={'#023047'}
      {...props}
    />
  )
}
