import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

import { SafeAreaView, ScreenView } from 'components/organisms'
import { Check } from 'components/svgs'

import { Roboto } from 'constants/fonts'

import { CheckoutCompleteScreenProps } from 'navigation/types/MainStack/CheckoutComplete'

import { OrderSummary } from './components'

export interface CheckoutCompleteProps extends CheckoutCompleteScreenProps {}

export const CheckoutComplete: React.FC<CheckoutCompleteProps> = ({
  navigation,
  route,
}) => {
  const order = route?.params

  return (
    <ScreenView statusBarProps={{ barStyle: 'dark-content' }}>
      <SafeAreaView style={{ justifyContent: 'space-between' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: verticalScale(12),
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255, 183, 3, 0.2)',
              borderRadius: moderateScale(80),
            }}
          >
            <Check
              color={'#FFB703'}
              width={moderateScale(80)}
              height={moderateScale(80)}
            />
          </View>
          <Text
            style={{
              color: '#FFB703',
              fontFamily: Roboto.medium,
              fontSize: moderateScale(24),
            }}
          >
            Payment Complete
          </Text>
          <OrderSummary date={order?.create_time} id={order?.id} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFB703',
            borderRadius: moderateScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '80%',
            height: verticalScale(32),
          }}
          onPress={navigation.goBack}
        >
          <Text
            style={{
              fontFamily: Roboto.medium,
              color: '#212529',
              fontSize: moderateScale(14),
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScreenView>
  )
}
