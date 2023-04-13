import { WhiteList, WhiteListClient } from './common'

export interface District {
  DistrictID?: number
  ProvinceID?: number
  DistrictName?: string
  Type?: number
  SupportType?: number
  NameExtension?: string[]
  DistrictEncode?: string
  CanUpdateCOD?: boolean
  Status?: number
  WhiteListClient?: WhiteListClient
  WhiteListDistrict?: WhiteList
  ReasonCode?: string
  ReasonMessage?: string
  OnDates?: any
  CreatedIP?: string
  CreatedEmployee?: number
  CreatedSource?: string
  CreatedDate?: string
  UpdatedIP?: string
  UpdatedEmployee?: number
  UpdatedSource?: string
  UpdatedDate?: string
}
