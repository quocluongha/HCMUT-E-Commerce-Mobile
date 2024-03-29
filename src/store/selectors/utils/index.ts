import { isEqual } from 'lodash'
import { createSelectorCreator, defaultMemoize } from 'reselect'

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, {
  equalityCheck: isEqual,
  resultEqualityCheck: isEqual,
})
