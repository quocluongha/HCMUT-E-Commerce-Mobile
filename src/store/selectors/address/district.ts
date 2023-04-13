import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectListDistrict = createDeepEqualSelector(
  [(state: AppState) => state.address.listDistrict],
  listDistrict => listDistrict ?? [],
)
