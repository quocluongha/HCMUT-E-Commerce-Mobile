import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type CheckoutCompleteScreenProps = StackScreenProps<
  MainStackParams,
  'CheckoutComplete',
  'MainStack'
>

export type CheckoutCompleteScreenNavigationProps = StackNavigationProp<
  MainStackParams,
  'CheckoutComplete',
  'MainStack'
>

export type CheckoutCompleteScreenRouteProps = RouteProp<
  MainStackParams,
  'CheckoutComplete'
>
