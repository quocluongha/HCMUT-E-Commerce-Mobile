import { ProductDetailResponse, ProductListResponse } from 'constants/api'

import {
  PayloadWithAPIRequest,
  PayloadWithAPIResponse,
} from 'store/reducers/types'

export interface GetProductListRequestData {
  currentPage: number
  itemsPerPage: number
}

export interface GetProductListRequest
  extends PayloadWithAPIRequest<GetProductListRequestData> {}

export interface GetProductListSuccess
  extends PayloadWithAPIResponse<ProductListResponse> {}

export interface GetProductDetailRequestData {
  id: string
}

export interface GetProductDetailRequest
  extends PayloadWithAPIRequest<GetProductDetailRequestData> {}

export interface GetProductDetailSuccess
  extends PayloadWithAPIResponse<ProductDetailResponse> {}
