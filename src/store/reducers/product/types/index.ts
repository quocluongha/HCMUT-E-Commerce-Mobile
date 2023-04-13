import { Product, ProductListResponseData } from 'constants/api'

import { CartProduct } from './cart'

export * from './actions'
export * from './cart'

export interface ProductState {
  isRefreshingProductList: boolean
  isGettingProduct: boolean
  listProductdData: Partial<ProductListResponseData>
  listCartProduct: CartProduct[]
  productDetail: Partial<Product>
  isGettingProductDetail: boolean
}
