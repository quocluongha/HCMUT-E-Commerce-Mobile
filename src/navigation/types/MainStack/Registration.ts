import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type RegistrationProps = StackScreenProps<
  MainStackParams,
  'Registration',
  'MainStack'
>

export type RegistrationNavigationProps = StackNavigationProp<
  MainStackParams,
  'Registration',
  'MainStack'
>

export type RegistrationRouteProps = RouteProp<MainStackParams, 'Registration'>
