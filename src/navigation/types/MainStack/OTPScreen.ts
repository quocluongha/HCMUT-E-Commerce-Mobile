import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type OTPScreenProps = StackScreenProps<
  MainStackParams,
  'OTPScreen',
  'MainStack'
>

export type OTPScreenNavigationProps = StackNavigationProp<
  MainStackParams,
  'OTPScreen',
  'MainStack'
>

export type OTPScreenRouteProps = RouteProp<MainStackParams, 'OTPScreen'>
