import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import Toast from 'react-native-toast-message'

import { CToast, CToastProps } from './CToast'

export const ToastConfig = {
  success: (props: CToastProps) => <CToast {...props} />,
}

const AppToast: React.FC = () => {
  const { top } = useSafeAreaInsets()
  const topOffset = top + verticalScale(8)

  return (
    <Toast config={ToastConfig} visibilityTime={2000} topOffset={topOffset} />
  )
}

export default AppToast
