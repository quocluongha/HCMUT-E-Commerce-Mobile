import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ErrorResponse } from 'services/request'

import {
  CartProduct,
  GetProductDetailRequest,
  GetProductDetailSuccess,
  GetProductListRequest,
  GetProductListSuccess,
  ProductState,
} from './types'

const initialState: ProductState = {
  isRefreshingProductList: false,
  isGettingProduct: false,
  listProductdData: {},
  listCartProduct: [],
  productDetail: {},
  isGettingProductDetail: false,
}

const updateCart = (
  state: ProductState,
  action: PayloadAction<CartProduct & { isOverrideQuantity: boolean }>,
) => {
  const { id, quantity, totalPrice, isOverrideQuantity } = action.payload

  const index = state.listCartProduct.findIndex(item => item.id === id)

  if (index !== -1) {
    const updatedQuantiy = isOverrideQuantity
      ? quantity
      : state.listCartProduct[index].quantity + quantity
    const updatedQPrice = isOverrideQuantity
      ? totalPrice
      : state.listCartProduct[index].totalPrice + totalPrice

    state.listCartProduct[index].quantity = updatedQuantiy
    state.listCartProduct[index].totalPrice = updatedQPrice
    state.listCartProduct
  } else {
    const updatedCart = state.listCartProduct.concat({
      id: id,
      quantity: quantity,
      totalPrice: totalPrice,
    })
    state.listCartProduct = updatedCart
  }
}

const deleteItemFromCart = (
  state: ProductState,
  action: PayloadAction<string>,
) => {
  state.listCartProduct = state.listCartProduct.filter(
    item => item.id !== action.payload,
  )
}

const productSlice = createSlice({
  initialState: initialState,
  name: 'productReducer',
  reducers: {
    getListProduct(state, action: PayloadAction<GetProductListRequest>) {
      return {
        ...state,
        listProduct: [],
        isGettingProduct: true,
      }
    },
    getListProductSuccess(state, action: PayloadAction<GetProductListSuccess>) {
      return {
        ...state,
        isGettingProduct: false,
        listProductdData: action.payload.response?.data ?? {},
      }
    },
    getListProductFailed(state, action: PayloadAction<ErrorResponse>) {
      return {
        ...state,
        isGettingProduct: false,
      }
    },
    cancelGetListProductProduct(state, action: PayloadAction) {
      return {
        ...state,
        isGettingProduct: false,
        listProduct: [],
      }
    },
    getProductDetail(state, action: PayloadAction<GetProductDetailRequest>) {
      return {
        ...state,
        isGettingProductDetail: true,
        productDetail: {},
      }
    },
    getProductDetailSuccess(
      state,
      action: PayloadAction<GetProductDetailSuccess>,
    ) {
      return {
        ...state,
        isGettingProductDetail: false,
        productDetail: action.payload.response?.data ?? {},
      }
    },
    getProductDetailFailed(state) {
      return {
        ...state,
        isGettingProductDetail: false,
        productDetail: {},
      }
    },
    cancelGetProductDetail(state) {
      return {
        ...state,
        isGettingProductDetail: false,
        productDetail: {},
      }
    },
    updateCart,
    deleteItemFromCart,
    resetProductState() {
      return initialState
    },
  },
})

export const { actions: productActions, reducer: productReducer } = productSlice

export * from './types'

export default productSlice
