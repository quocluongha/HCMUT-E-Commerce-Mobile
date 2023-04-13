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

export type FavoriteProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParams, 'Favorite', 'MainTab'>,
  StackScreenProps<MainStackParams>
>

export type FavoriteNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParams, 'Favorite', 'MainTab'>,
  StackNavigationProp<MainStackParams>
>

export type FavoriteRouteProps = RouteProp<MainTabParams, 'Favorite'>
