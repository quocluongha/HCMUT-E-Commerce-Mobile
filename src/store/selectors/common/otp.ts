import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectOTPData = createDeepEqualSelector(
  [(state: AppState) => state.auth],
  authState => {
    const { otpData } = authState

    return otpData
  },
)
