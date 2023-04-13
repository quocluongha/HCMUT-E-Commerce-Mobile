import React, { PropsWithChildren } from 'react'

import {
  FocusAwareStatusBar,
  FocusAwareStatusBarProps,
} from 'components/molecules'

export interface ScreenViewProps extends PropsWithChildren {
  statusBarProps?: FocusAwareStatusBarProps
}

export const ScreenView: React.FC<ScreenViewProps> = ({
  children,
  statusBarProps,
}) => {
  return (
    <React.Fragment>
      <FocusAwareStatusBar {...statusBarProps} />
      {children}
    </React.Fragment>
  )
}
