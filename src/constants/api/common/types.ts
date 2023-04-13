export interface AddressType {
  province_city: string
  district: string
  wards: string
  detailedLocation: string
}

export interface Address extends Partial<AddressType> {}
