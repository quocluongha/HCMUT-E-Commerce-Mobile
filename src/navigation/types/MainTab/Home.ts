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

export type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParams, 'Home', 'MainTab'>,
  StackScreenProps<MainStackParams>
>

export type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParams, 'Home', 'MainTab'>,
  StackNavigationProp<MainStackParams>
>

export type HomeRouteProps = RouteProp<MainTabParams, 'Home'>
