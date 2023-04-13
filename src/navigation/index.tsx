import { useNetInfo } from '@react-native-community/netinfo'
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native'
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { hide } from 'react-native-bootsplash'

import { useAppDispatch } from 'hooks'

import {
  AddressEditor,
  Checkout,
  Landing,
  ListAddress,
  Login,
  OTPScreen,
  ProductDetail,
  RegistrationScreen,
  Search,
  Splash,
} from 'screens'

import { rootActions } from 'store/reducers/root'

import { MainTab } from './MainTab'
import { linking } from './configs'
import { defaultMainStackScreenOptions } from './options'
import { MainStackParams } from './types'

const Stack = createStackNavigator<MainStackParams>()

export const navigationRef = createNavigationContainerRef<MainStackParams>()

export const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isInternetReachable } = useNetInfo()
  const { t } = useTranslation('navigator')

  const internetStateChangeHandler = () => {
    if (isInternetReachable) {
      dispatch(rootActions.updateInternetState(isInternetReachable))
    } else {
      dispatch(rootActions.updateInternetState(false))
    }
  }

  const onReadyHandler = () => {
    hide({ fade: true, duration: 300 })
  }

  useEffect(() => {
    internetStateChangeHandler()
  }, [isInternetReachable])

  return (
    <NavigationContainer<MainStackParams>
      ref={navigationRef}
      onReady={onReadyHandler}
      linking={linking}
    >
      <Stack.Navigator
        id="MainStack"
        screenOptions={defaultMainStackScreenOptions}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />

        {
          //* Search
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
          </Stack.Group>
        }

        {
          //* Auth Stack
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ cardStyle: { backgroundColor: '#023047' } }}
            />
          </Stack.Group>
        }

        {
          //* Registration
          <Stack.Group>
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                title: t('registration'),
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="OTPScreen"
              component={OTPScreen}
              options={{ title: t('otp') }}
            />
          </Stack.Group>
        }

        {
          //* Main Tab
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTab" component={MainTab} />
          </Stack.Group>
        }

        {
          //* Product
          <Stack.Group>
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </Stack.Group>
        }

        {
          //* Checkout
          <Stack.Group>
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ title: t('checkout') }}
            />
          </Stack.Group>
        }

        {
          //* Address
          <Stack.Group>
            <Stack.Screen
              name="ListAddress"
              component={ListAddress}
              options={{ title: t('listAddress') }}
            />
            <Stack.Screen name="AddressEditor" component={AddressEditor} />
          </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
