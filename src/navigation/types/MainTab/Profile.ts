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

export type ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParams, 'Profile', 'MainTab'>,
  StackScreenProps<MainStackParams>
>

export type ProfileNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParams, 'Profile', 'MainTab'>,
  StackNavigationProp<MainStackParams>
>

export type ProfileRouteProps = RouteProp<MainTabParams, 'Profile'>
