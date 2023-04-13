import { isEqual } from 'lodash'

import { AppState } from 'store'
import { ADDRESS_TYPE, District, Province, Ward } from 'store/reducers/address'

import { createDeepEqualSelector } from '../utils'

export const selectListAddress = createDeepEqualSelector(
  [(state: AppState) => state.address.listAddress],
  listAddress => ({
    listAddress,
    listSelectedAddress: listAddress.map(address => address?.isSelect ?? false),
  }),
)

export const selectIsSelectedAddress = createDeepEqualSelector(
  [
    (state: AppState) => state.address.selectedAddressList,
    (_, index: number) => index,
  ],
  (selectedAddressList, index) => selectedAddressList[index],
)

export const selectSelectedAddress = createDeepEqualSelector(
  [(state: AppState) => state.address.listAddress],
  listAddress => listAddress.find(address => address.isSelect) ?? {},
)

export const selectIsSelectedAddressType = createDeepEqualSelector(
  [
    (state: AppState, type: ADDRESS_TYPE) => {
      const { selectedProvince, selectedDistrict, selectedWard } = state.address

      switch (type) {
        case ADDRESS_TYPE.PROVINCE:
          return selectedProvince
        case ADDRESS_TYPE.DISTRICT:
          return selectedDistrict
        case ADDRESS_TYPE.WARD:
          return selectedWard
      }
    },
    (state, type, address: Province | District | Ward) => address,
  ],
  (currAddress, nextAddress) => {
    return isEqual(currAddress, nextAddress)
  },
)
