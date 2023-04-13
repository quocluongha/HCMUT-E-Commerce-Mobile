import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  EMPTY,
  catchError,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs'

import { MessageModalController } from 'components/organisms'

import { AUTH_API, GenerateOTPResponse } from 'constants/api'

import { translate } from 'i18n'

import { pop } from 'navigation/utils'

import { request } from 'services/request'

import { AppState } from 'store'
import {
  GenerateOTPRequest,
  VerifyOTPRequest,
  authActions,
} from 'store/reducers/auth'

export const generateOTP$: Epic<
  PayloadAction<GenerateOTPRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.generateOTP.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      return request<GenerateOTPResponse>({
        method: 'POST',
        url: AUTH_API.GENERATE_OTP,
        data: action.payload.request,
      }).pipe(
        map(response => {
          return authActions.generateOTPSuccess({ response: response.data })
        }),
        catchError(error => {
          return of(authActions.generateOTPFailed(error))
        }),
      )
    }),
  )

export const verifyOTP$: Epic<
  PayloadAction<VerifyOTPRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.verifyOTP.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      return request({
        method: 'POST',
        url: AUTH_API.VERIFY_OTP,
        data: action.payload.request,
      }).pipe(
        map(response => {
          MessageModalController.show({
            content: translate('optVerifySuccess', { ns: 'otp' }),
            onPress: () => pop(),
          })

          return authActions.verifyOTPSuccess()
        }),
        catchError(error => {
          return of(authActions.verifyOTPFailed(error))
        }),
      )
    }),
  )

export const OTPEpic: Epic<
  PayloadAction<any>,
  PayloadAction,
  AppState
> = combineEpics(generateOTP$, verifyOTP$)
