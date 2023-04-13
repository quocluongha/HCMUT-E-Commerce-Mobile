import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '..'

export type ListAddressProps = StackScreenProps<
  MainStackParams,
  'ListAddress',
  'MainStack'
>

export type ListAddressNavigationProps = StackNavigationProp<
  MainStackParams,
  'ListAddress',
  'MainStack'
>

export type ListAddressRouteProps = RouteProp<MainStackParams, 'ListAddress'>
