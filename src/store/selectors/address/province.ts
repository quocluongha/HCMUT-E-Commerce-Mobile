import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectListProvince = createDeepEqualSelector(
  [(state: AppState) => state.address.listProvince],
  listProvince => listProvince ?? [],
)
