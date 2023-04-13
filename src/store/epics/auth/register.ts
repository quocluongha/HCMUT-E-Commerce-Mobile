import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  catchError,
  filter,
  merge,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs'

import { AUTH_API, RegistrationResponse } from 'constants/api'

import { push } from 'navigation/utils'

import { request } from 'services/request'

import { AppState } from 'store'
import { RegistrationRequest, authActions } from 'store/reducers/auth'

const registerRequest$: Epic<
  PayloadAction<RegistrationRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(authActions.registerRequest.match),
    withLatestFrom(state$),
    switchMap(([action]) => {
      return request<RegistrationResponse>({
        url: AUTH_API.SIGNUP,
        method: 'POST',
        data: action.payload.request,
      }).pipe(
        mergeMap(response => {
          const { data } = response.data

          push('OTPScreen')

          return merge(
            of(authActions.registerRequestSuccess({ response: response.data })),
            of(
              authActions.generateOTP({ request: { userID: data?._id ?? '' } }),
            ),
          )
        }),
        catchError(error => of(authActions.registerRequestFailed(error))),
      )
    }),
  )

export const registerEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(registerRequest$)
