import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  EMPTY,
  Observable,
  exhaustMap,
  filter,
  race,
  takeWhile,
  withLatestFrom,
} from 'rxjs'

import { MessageModalController } from 'components/organisms'

import { translate } from 'i18n'

import { ErrorResponse } from 'services/request'

import { AppState } from 'store'
import { authActions } from 'store/reducers/auth'

const filterErrorAction = (action$: Observable<PayloadAction<ErrorResponse>>) =>
  race(
    action$.pipe(filter(authActions.loginFailed.match)),
    action$.pipe(filter(authActions.logoutFailed.match)),
    action$.pipe(filter(authActions.registerRequestFailed.match)),
  )

const handleError$: Epic<PayloadAction<ErrorResponse>, never, AppState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filterErrorAction,
    withLatestFrom(state$),
    takeWhile(([, state]) => state.root.isInternetReachable),
    exhaustMap(([action]) => {
      const { response } = action.payload

      const errorMessages = response?.data?.error?.message?.map(message =>
        translate(message?.code ?? 'defaultError', { ns: 'error' }),
      )

      MessageModalController.show({
        content: errorMessages ?? translate('defaultError', { ns: 'error' }),
      })

      return EMPTY
    }),
  )

export const errorEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(handleError$)
