import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from './types'

const initialState: RootState = {
  isInternetReachable: false,
}

const rootSlice = createSlice({
  initialState: initialState,
  name: 'rootReducer',
  reducers: {
    updateInternetState(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isInternetReachable: action.payload,
      }
    },
  },
})

export const { actions: rootActions, reducer: rootReducer } = rootSlice

export * from './types'

export default rootSlice
