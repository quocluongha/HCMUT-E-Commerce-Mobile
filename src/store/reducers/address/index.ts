import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AddressState, District, Province, Ward } from './types'

export const DUMMY_ADDRESS_LIST = [
  {
    name: 'Ha Quoc Luong',
    phoneNumber: '031621572',
    address: '47 1D Street',
    isSelect: true,
    district: { DistrictName: 'Binh Tan' },
    ward: { WardName: 'An Lac' },
    province: { ProvinceName: 'TPHCM' },
  },
  {
    name: 'Nguyen Thien Bao',
    phoneNumber: '031621572',
    address: '47 2D Street',
    isSelect: false,
    district: { DistrictName: 'Binh Tan' },
    ward: { WardName: 'An Lac' },
    province: { ProvinceName: 'TPHCM' },
  },
  {
    name: 'Quang Chan Vi',
    phoneNumber: '031621572',
    address: '47 3D Street',
    isSelect: false,
    district: { DistrictName: 'Binh Tan' },
    ward: { WardName: 'An Lac' },
    province: { ProvinceName: 'TPHCM' },
  },
  {
    name: 'Trinh Duy Hung',
    phoneNumber: '031621572',
    address: '47 4D Street',
    isSelect: false,
    district: { DistrictName: 'Binh Tan' },
    ward: { WardName: 'An Lac' },
    province: { ProvinceName: 'TPHCM' },
  },
]

const DUMMY_SELECTED_ADDRESS_LIST = DUMMY_ADDRESS_LIST.map(
  address => address.isSelect,
)

const DUMMY_PROVINCE_LIST: Province[] = [
  {
    ProvinceID: 1,
    ProvinceName: 'Tinh 1',
  },
  {
    ProvinceID: 2,
    ProvinceName: 'Tinh 2',
  },
  {
    ProvinceID: 3,
    ProvinceName: 'Tinh 3',
  },
  {
    ProvinceID: 4,
    ProvinceName: 'Tinh 4',
  },
  {
    ProvinceID: 5,
    ProvinceName: 'Tinh 5',
  },
]

const DUMMY_DISTRICT_LIST: District[] = [
  {
    DistrictID: 1,
    DistrictName: 'Quan 1',
  },
  {
    DistrictID: 2,
    DistrictName: 'Quan 2',
  },
  {
    DistrictID: 3,
    DistrictName: 'Quan 3',
  },
  {
    DistrictID: 4,
    DistrictName: 'Quan 4',
  },
  {
    DistrictID: 5,
    DistrictName: 'Quan 5',
  },
]

const DUMMY_WARD_LIST: Ward[] = [
  {
    WardCode: '1',
    WardName: 'Phuong 1',
  },
  {
    WardCode: '2',
    WardName: 'Phuong 2',
  },
  {
    WardCode: '3',
    WardName: 'Phuong 3',
  },
  {
    WardCode: '4',
    WardName: 'Phuong 4',
  },
  {
    WardCode: '5',
    WardName: 'Phuong 5',
  },
]

const initialState: AddressState = {
  // listAddress: [],
  // listProvince: [],
  // listDistrict: [],
  // listWard: [],
  listAddress: DUMMY_ADDRESS_LIST,
  selectedAddressList: DUMMY_SELECTED_ADDRESS_LIST,
  listProvince: DUMMY_PROVINCE_LIST,
  listDistrict: DUMMY_DISTRICT_LIST,
  listWard: DUMMY_WARD_LIST,
  selectedProvince: {},
  selectedDistrict: {},
  selectedWard: {},
}

const updateAddressList = (state: AddressState) => {
  state.listAddress = state.listAddress.map((address, index) => ({
    ...address,
    isSelect: state.selectedAddressList[index],
  }))
}

const addressSlice = createSlice({
  name: 'addressReducer',
  initialState: initialState,
  reducers: {
    updateSelectedAddressList(state, action: PayloadAction<boolean[]>) {
      return {
        ...state,
        selectedAddressList: action.payload,
      }
    },
    updateAddressList,
    updateSelectProvince(state, action: PayloadAction<Province>) {
      return {
        ...state,
        selectedProvince: action.payload,
      }
    },
    updateSelectDistrict(state, action: PayloadAction<District>) {
      return {
        ...state,
        selectedDistrict: action.payload,
      }
    },
    updateSelectWard(state, action: PayloadAction<Ward>) {
      return {
        ...state,
        selectedWard: action.payload,
      }
    },
  },
})

export const { actions: addressActions, reducer: addressReducer } = addressSlice

export * from './types'

export default addressSlice
