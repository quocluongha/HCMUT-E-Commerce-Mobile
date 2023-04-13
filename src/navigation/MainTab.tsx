import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { merge } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ImageSourcePropType } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {
  Bell,
  BellOutline,
  Cart as CartIcon,
  CartOutline,
  Mall,
  MallOutline,
  Person,
  PersonOutline,
} from 'components/svgs'

import { useAppSelector } from 'hooks'

import { Cart, Favorite, Home, Settings } from 'screens'

import CBottomTab from './components/CBottomTab'
import { defaultMainTabScreenOptions, tabBarStyle } from './options'
import { MainTabParams } from './types'

const Tab = createBottomTabNavigator<MainTabParams>()

export const MainTab: React.FC = () => {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation('navigator')

  const responsiveHeight = verticalScale(36) + bottom

  const cartProductQuantity = useAppSelector(
    state => state.product.listCartProduct.length,
  )

  return (
    <Tab.Navigator
      id="MainTab"
      screenOptions={{
        ...defaultMainTabScreenOptions,
        tabBarStyle: merge({}, tabBarStyle, {
          height: responsiveHeight,
        }),
      }}
      sceneContainerStyle={{
        backgroundColor: '#E9ECEF',
        paddingBottom: responsiveHeight,
      }}
      tabBar={props => (
        <CBottomTab tabBarHeight={responsiveHeight} {...props} />
      )}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          title: t('home'),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Mall width={size} height={size} color={color} fill={color} />
            ) : (
              <MallOutline
                width={size}
                height={size}
                color={color}
                fill={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          title: t('cart'),
          ...(cartProductQuantity !== 0 && {
            tabBarBadge: cartProductQuantity,
          }),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <CartIcon width={size} height={size} color={color} fill={color} />
            ) : (
              <CartOutline
                width={size}
                height={size}
                color={color}
                fill={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: t('favorite'),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Bell width={size} height={size} color={color} fill={color} />
            ) : (
              <BellOutline
                width={size}
                height={size}
                color={color}
                fill={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          title: t('settings'),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Person width={size} height={size} color={color} fill={color} />
            ) : (
              <PersonOutline
                width={size}
                height={size}
                color={color}
                fill={color}
              />
            ),
        }}
      />
    </Tab.Navigator>
  )
}
