import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type CheckoutProps = StackScreenProps<
  MainStackParams,
  'Checkout',
  'MainStack'
>

export type CheckoutNavigationProps = StackNavigationProp<
  MainStackParams,
  'Checkout',
  'MainStack'
>

export type CheckoutRouteProps = RouteProp<MainStackParams, 'Checkout'>
