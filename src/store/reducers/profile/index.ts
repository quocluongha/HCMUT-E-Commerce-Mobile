import { createSlice } from '@reduxjs/toolkit'
import { from } from 'rxjs'

import { ProfileState } from './types'

const initialState: ProfileState = {}

const profileSlice = createSlice({
  initialState: initialState,
  name: 'profileReducer',
  reducers: {},
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice

export * from './types'

export default profileSlice
