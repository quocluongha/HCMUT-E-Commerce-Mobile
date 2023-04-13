import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { CImage } from 'components/atoms'

import { Roboto } from 'constants/fonts'

import { LandingScreenProps } from 'navigation/types'

export interface LandingProps extends LandingScreenProps {}

export const Landing: React.FC<LandingProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CImage
        ImageProps={{ source: require('assets/images/login-background.png') }}
      />
      <Text
        style={{
          fontFamily: Roboto.medium,
          color: 'white',
          fontSize: moderateScale(24),
        }}
      >
        Welcome to our book store!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFB703',
          borderRadius: moderateScale(12),
          flexDirection: 'row',
          alignItems: 'center',
          padding: moderateScale(12),
          marginTop: verticalScale(120),
        }}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        }
      >
        <Text
          style={{
            fontFamily: Roboto.medium,
            color: '#000000',
            fontSize: moderateScale(14),
          }}
        >
          Get start
        </Text>
        <Entypo
          name="chevron-right"
          color={'#000000'}
          size={moderateScale(16)}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#023047',
  },
})
