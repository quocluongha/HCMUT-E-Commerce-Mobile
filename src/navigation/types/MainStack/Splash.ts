import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '../MainStack'

export type SplashProps = StackScreenProps<
  MainStackParams,
  'Splash',
  'MainStack'
>

export type SplashNavigationProps = StackNavigationProp<
  MainStackParams,
  'Splash',
  'MainStack'
>

export type SplashRouteProps = RouteProp<MainStackParams, 'Splash'>
