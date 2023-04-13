import { StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'
import { Text } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { Roboto } from 'constants/fonts'

import { HeaderButton } from 'navigation/components'

export const defaultMainStackScreenOptions: StackNavigationOptions = {
  cardStyle: { backgroundColor: '#E9ECEF' },
  headerShadowVisible: false,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#023047',
  },
  headerTitle: ({ children }) => (
    <Text style={styles.headerTitle}>{children}</Text>
  ),
  headerLeft: props => (
    <HeaderButton
      {...props}
      style={styles.button}
      icon={
        <Entypo
          name="chevron-left"
          color={'#FFB703'}
          size={moderateScale(26)}
        />
      }
    />
  ),
}

const styles = ScaledSheet.create({
  headerTitle: {
    color: '#F8F9FA',
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '20@ms',
  },
  button: {
    marginLeft: '16@s',
  },
})
