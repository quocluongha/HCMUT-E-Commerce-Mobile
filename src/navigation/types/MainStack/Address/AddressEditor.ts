import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import { MainStackParams } from '..'

export type AddressEditorProps = StackScreenProps<
  MainStackParams,
  'AddressEditor',
  'MainStack'
>

export type AddressEditorNavigationProps = StackNavigationProp<
  MainStackParams,
  'AddressEditor',
  'MainStack'
>

export type AddressEditorRouteProps = RouteProp<
  MainStackParams,
  'AddressEditor'
>
