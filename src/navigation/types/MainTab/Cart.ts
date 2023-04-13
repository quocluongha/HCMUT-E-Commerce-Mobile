import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  RouteProp,
} from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainTabParams } from '.'
import { MainStackParams } from '../MainStack'

export type CartProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParams, 'Cart', 'MainTab'>,
  StackScreenProps<MainStackParams>
>

export type CartNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParams, 'Cart', 'MainTab'>,
  StackNavigationProp<MainStackParams>
>

export type CartRouteProps = RouteProp<MainTabParams, 'Cart'>
