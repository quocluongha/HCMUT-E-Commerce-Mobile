import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type ProductDetailProps = StackScreenProps<
  MainStackParams,
  'ProductDetail',
  'MainStack'
>

export type ProductDetailNavigationProps = StackNavigationProp<
  MainStackParams,
  'ProductDetail',
  'MainStack'
>

export type ProductDetailRouteProps = RouteProp<
  MainStackParams,
  'ProductDetail'
>
