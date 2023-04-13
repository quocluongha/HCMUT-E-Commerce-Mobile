import { PayloadAction } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

import { AppState } from 'store'

import { loginEpic } from './login'
import { logoutEpic } from './logout'
import { OTPEpic } from './otp'
import { registerEpic } from './register'

export const authEpic = combineEpics<PayloadAction, PayloadAction, AppState>(
  loginEpic,
  logoutEpic,
  registerEpic,
  OTPEpic,
)
