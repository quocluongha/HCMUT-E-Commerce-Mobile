import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectUserId = createDeepEqualSelector(
  [(state: AppState) => state.auth],
  authState => {
    const { _id = '' } = authState.userInfo

    return _id
  },
)

export const selectAuthenToken = createDeepEqualSelector(
  [(state: AppState) => state.auth],
  authState => {
    const { accessToken = '', refreshToken = '' } = authState.userInfo

    return { accessToken, refreshToken }
  },
)
