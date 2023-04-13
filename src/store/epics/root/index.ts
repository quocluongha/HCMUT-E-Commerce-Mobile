import { PayloadAction } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

import { AppState } from 'store'

import { errorEpic } from './error'

export const rootEpic = combineEpics<PayloadAction, PayloadAction, AppState>(
  errorEpic,
)
