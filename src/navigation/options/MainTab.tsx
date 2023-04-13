import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Animated, Platform, StyleProp, Text, ViewStyle } from 'react-native'
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

export const tabBarStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
  borderTopLeftRadius: moderateScale(18),
  borderTopRightRadius: moderateScale(18),
  position: 'absolute',
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: -4 },
  shadowRadius: 5,
  shadowOpacity: 0.1,
  zIndex: 3,
  elevation: 10,
  backgroundColor: '#F8F9FA',
}

export const defaultMainTabScreenOptions: BottomTabNavigationOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#FFB703',
  tabBarInactiveTintColor: '#ADB5BD',
  tabBarBadgeStyle: {
    fontFamily: Roboto.regular,
    fontSize: moderateScale(10),
    backgroundColor: '#F8DA70',
    color: '#7E5A15',
    fontWeight: '400',
  },
  headerShown: false,
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#023047',
  },
  headerTitle: ({ children }) => (
    <Text style={styles.headerTitle}>{children}</Text>
  ),
}

const styles = ScaledSheet.create({
  headerTitle: {
    color: '#F8F9FA',
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '20@ms',
  },
})
