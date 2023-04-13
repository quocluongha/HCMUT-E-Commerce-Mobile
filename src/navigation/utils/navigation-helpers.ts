import { StackActions } from '@react-navigation/native'

import { navigationRef } from '../index'

export const navigate = navigationRef.isReady()
  ? navigationRef.navigate
  : () => {}

export const reset = navigationRef.isReady() ? navigationRef.reset : () => {}

export const goBack = navigationRef.isReady() ? navigationRef.goBack : () => {}

export const replace = navigationRef.isReady()
  ? (name: string, params?: object) =>
      navigationRef.current?.dispatch(StackActions.replace(name, params))
  : () => {}

export const push = navigationRef.isReady()
  ? (name: string, params?: object) =>
      navigationRef.current?.dispatch(StackActions.push(name, params))
  : () => {}

export const pop = navigationRef.isReady()
  ? (count?: number) => navigationRef.dispatch(StackActions.pop(count))
  : () => {}

export const popToTop = navigationRef.isReady()
  ? () => navigationRef.dispatch(StackActions.popToTop())
  : () => {}

export const getCurrentRouteName = navigationRef.isReady()
  ? () => navigationRef?.getCurrentRoute()?.name
  : () => undefined
