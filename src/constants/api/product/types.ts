import { ServerResponse } from 'services/request'

export interface Product {
  _id: string
  photoAvatarUrl: string
  photoDescribesUrl: string[]
  enProductName: string
  viProductName: string
  description: string
  productCategoryCode: string
  pricePerUnit: number
  unitOfMassCode: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ProductListResponseData {
  totalPages: number
  currentPage: number
  totalItems: number
  totalItemsCurrentPage: number
  items: Product[]
  hasNext: boolean
  hasPrevious: boolean
}

export type ProductListResponse = ServerResponse<
  Partial<ProductListResponseData>
>

export type ProductDetailResponse = ServerResponse<Partial<Product>>
