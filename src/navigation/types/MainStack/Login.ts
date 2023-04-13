import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '.'

export type LoginProps = StackScreenProps<MainStackParams, 'Login', 'MainStack'>

export type LoginNavigationProps = StackNavigationProp<
  MainStackParams,
  'Login',
  'MainStack'
>

export type LoginRouteProps = RouteProp<MainStackParams, 'Login'>
