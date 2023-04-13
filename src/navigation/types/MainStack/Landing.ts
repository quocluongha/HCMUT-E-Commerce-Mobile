import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type LandingScreenProps = StackScreenProps<
  MainStackParams,
  'Landing',
  'MainStack'
>

export type LandingScreenNavigationProps = StackNavigationProp<
  MainStackParams,
  'Landing',
  'MainStack'
>

export type LandingScreenRouteProps = RouteProp<MainStackParams, 'Landing'>
