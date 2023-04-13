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

import { PRODUCT_API, ProductDetailResponse } from 'constants/api'

import { appendBearerToken, request } from 'services/request'

import { AppState } from 'store'
import { GetProductDetailRequest, productActions } from 'store/reducers/product'

const getProductDetail$: Epic<
  PayloadAction<GetProductDetailRequest>,
  PayloadAction<any>,
  AppState
> = (action$, state$) =>
  action$.pipe(
    filter(productActions.getProductDetail.match),
    withLatestFrom(state$),
    exhaustMap(([action, state]) => {
      const { id } = action.payload.request
      const { accessToken = '' } = state.auth.userInfo

      return request<ProductDetailResponse>({
        url: `${PRODUCT_API.DETAIL_PRODUCT}/${id}`,
        method: 'GET',
        headers: {
          ...appendBearerToken(accessToken),
        },
      }).pipe(
        map(response => {
          return productActions.getProductDetailSuccess({
            response: response.data,
          })
        }),
        catchError(error => of(productActions.getProductDetailFailed(error))),
        takeUntil(
          action$.pipe(
            filter(productActions.cancelGetListProductProduct.match),
          ),
        ),
      )
    }),
  )

export const productDetailEpic = combineEpics<
  PayloadAction<any>,
  PayloadAction,
  AppState
>(getProductDetail$)
