import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectListWard = createDeepEqualSelector(
  [(state: AppState) => state.address.listWard],
  listWard => listWard ?? [],
)
