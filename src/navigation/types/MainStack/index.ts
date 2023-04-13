import { NavigatorScreenParams } from '@react-navigation/native'

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
}

export * from './Address'
export * from './Checkout'
export * from './Login'
export * from './OTPScreen'
export * from './ProducDetail'
export * from './Registration'
export * from './Splash'
export * from './Search'
export * from './Landing'
