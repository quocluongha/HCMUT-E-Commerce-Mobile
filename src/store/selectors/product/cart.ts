import { AppState } from 'store'
import { Product } from 'store/reducers/product'

import { createDeepEqualSelector } from '../utils'

export const selectCartProduct = createDeepEqualSelector(
  [
    (state: AppState) => state.product.listProduct,
    (state: AppState) => state.product.listCartProduct,
  ],
  (listProduct, listCartProduct) =>
    listCartProduct.map(
      product => listProduct.find(item => item.id === product.id) as Product,
    ),
)
