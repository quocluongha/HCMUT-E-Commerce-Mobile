import { WhiteList, WhiteListClient } from './common'

export interface Ward {
  WardCode?: string
  DistrictID?: number
  WardName?: string
  NameExtension?: string[]
  WardEncode?: string
  CanUpdateCOD?: boolean
  SupportType?: number
  WhiteListClient?: WhiteListClient
  WhiteListWard?: WhiteList
  Status?: number
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
