import {
  TypedUseSelectorHook,
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux'

import { AppDispatch, AppState } from 'store'

interface CustomUseSelectorHook extends TypedUseSelectorHook<AppState> {
  <TSelected>(
    selector: (state: AppState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
    useShallowEqual?: boolean,
  ): TSelected
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: CustomUseSelectorHook = (
  selector,
  equalityFn = shallowEqual,
  useShallowEqual?: boolean,
) => useSelector(selector, useShallowEqual ? equalityFn : undefined)
