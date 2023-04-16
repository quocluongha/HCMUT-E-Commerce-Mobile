import { NavigatorScreenParams } from '@react-navigation/native'

import { Product } from 'constants/api'

import { MainTabParams } from '../MainTab'

export type MainStackParams = {
  MainTab: NavigatorScreenParams<MainTabParams>
  Splash: any
  Login: any
  ProductDetail: { id: string }
  Checkout: any
  ListAddress: any
  AddressEditor: { isEditMode: boolean }
  OTPScreen: any
  Registration: any
  Search: any
  Landing: any
  CheckoutComplete: any
}

export * from './Address'
export * from './Checkout'
export * from './Landing'
export * from './Login'
export * from './OTPScreen'
export * from './ProducDetail'
export * from './Registration'
export * from './Search'
export * from './Splash'
