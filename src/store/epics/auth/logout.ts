import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  catchError,
  exhaustMap,
  filter,
  merge,
  mergeMap,
  of,
  withLatestFrom,
} from 'rxjs'

import { AUTH_API } from 'constants/api'

import { reset } from 'navigation/utils'

import { appendBearerToken, request } from 'services/request'

import { AppState } from 'store'
import { authActions } from 'store/reducers/auth'
import { productActions } from 'store/reducers/product'

const logoutRequest$: Epic<PayloadAction<any>, PayloadAction<any>, AppState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(authActions.logoutRequest.match),
    withLatestFrom(state$),
    exhaustMap(([, state]) => {
      const { accessToken = '' } = state.auth.userInfo

      return request({
        url: AUTH_API.LOGOUT,
        method: 'POST',
        headers: {
          ...appendBearerToken(accessToken),
        },
      }).pipe(
        mergeMap(response => {
          reset({ routes: [{ name: 'Login' }] })
          return merge(
            of(authActions.logoutSuccess(response)),
            of(productActions.resetProductState()),
          )
        }),
        catchError(error => of(authActions.logoutFailed(error))),
      )
    }),
  )

export const logoutEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(logoutRequest$)
