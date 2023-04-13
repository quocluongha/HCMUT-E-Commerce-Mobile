import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type SearchScreenProps = StackScreenProps<
  MainStackParams,
  'Search',
  'MainStack'
>

export type SearchScreenNavigationProps = StackNavigationProp<
  MainStackParams,
  'Search',
  'MainStack'
>

export type SearchScreenRouteProps = RouteProp<MainStackParams, 'Search'>
