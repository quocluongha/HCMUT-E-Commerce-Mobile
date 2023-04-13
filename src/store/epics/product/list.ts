import { PayloadAction } from '@reduxjs/toolkit'
import { Epic, combineEpics } from 'redux-observable'
import {
  catchError,
  exhaustMap,
  filter,
  map,
  of,
  takeUntil,
  withLatestFrom,
} from 'rxjs'

import { PRODUCT_API, ProductListResponse } from 'constants/api'

import { appendBearerToken, request } from 'services/request'

import { AppState } from 'store'
import { GetProductListRequest, productActions } from 'store/reducers/product'

const getProduct$: Epic<
  PayloadAction<GetProductListRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(productActions.getListProduct.match),
    withLatestFrom(state$),
    exhaustMap(([, state]) => {
      const { accessToken = '' } = state.auth.userInfo

      return request<ProductListResponse>({
        url: PRODUCT_API.LIST_PRODUCT,
        method: 'GET',
        headers: {
          ...appendBearerToken(accessToken),
        },
      }).pipe(
        map(response => {
          return productActions.getListProductSuccess({
            response: response.data,
          })
        }),
        catchError(error => of(productActions.getListProductFailed(error))),
        takeUntil(
          action$.pipe(
            filter(productActions.cancelGetListProductProduct.match),
          ),
        ),
      )
    }),
  )

export const listProductEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(getProduct$)
