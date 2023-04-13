import { District } from './district'
import { Province } from './province'
import { Ward } from './ward'

export * from './common'
export * from './district'
export * from './province'
export * from './ward'

export type AddressType<T> = Extract<Province | District | Ward, T>

export enum ADDRESS_TYPE {
  PROVINCE,
  DISTRICT,
  WARD,
}

export type Address = {
  id?: string
  name?: string
  phoneNumber?: string
  address?: string
  isSelect?: boolean
  province?: Province
  district?: District
  ward?: Ward
}

export interface AddressState {
  listAddress: Address[]
  selectedAddressList: boolean[]
  listProvince: Province[]
  listDistrict: District[]
  listWard: Ward[]
  selectedProvince: Province
  selectedDistrict: District
  selectedWard: Ward
}
