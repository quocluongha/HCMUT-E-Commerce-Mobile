import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  EMPTY,
  catchError,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs'

import { MessageModalController } from 'components/organisms'

import { AUTH_API, LoginResponse } from 'constants/api'

import { translate } from 'i18n'

import { push, reset } from 'navigation/utils'

import { request } from 'services/request'

import { AppState, store } from 'store'
import {
  LoginRequest,
  LoginRequestSuccess,
  authActions,
} from 'store/reducers/auth'

const loginRequest$: Epic<
  PayloadAction<LoginRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.loginRequest.match),
    withLatestFrom(state$),
    exhaustMap(([action]) => {
      return request<LoginResponse>({
        url: AUTH_API.LOGIN,
        method: 'POST',
        data: action.payload.request,
      }).pipe(
        map(response => {
          return authActions.loginRequestSuccess({ response: response.data })
        }),
        catchError(error => {
          return of(authActions.loginFailed(error))
        }),
      )
    }),
  )

const verifyLoginResponse$: Epic<
  PayloadAction<LoginRequestSuccess>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.loginRequestSuccess.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      const { response } = action.payload

      if (!response?.data?.isVerifiedMail) {
        MessageModalController.show({
          isSingleButton: false,
          content: translate('OTPIsNotVerified', { ns: 'otp' }),
          onPressRightBtn: () => {
            push('OTPScreen')
            store.dispatch(
              authActions.generateOTP({
                request: { userID: response?.data?._id ?? '' },
              }),
            )
          },
        })

        return EMPTY
      }

      return of(authActions.loginSuccess())
    }),
  )

export const loginSuccessListener$: Epic<
  PayloadAction,
  PayloadAction,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.loginSuccess.match),
    withLatestFrom(state$),
    switchMap(() => {
      reset({ routes: [{ name: 'MainTab' }] })

      return EMPTY
    }),
  )

export const loginEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(loginRequest$, verifyLoginResponse$, loginSuccessListener$)
