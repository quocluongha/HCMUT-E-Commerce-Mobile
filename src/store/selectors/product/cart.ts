import { Product } from 'constants/api'

import { AppState } from 'store'

import { createDeepEqualSelector } from '../utils'

export const selectCartProduct = createDeepEqualSelector(
  [
    (state: AppState) => state.product.listProductdData?.items ?? [],
    (state: AppState) => state.product.listCartProduct,
  ],
  (listProduct, listCartProduct) =>
    listCartProduct.map(
      product => listProduct.find(item => item?._id === product.id) as Product,
    ),
)
