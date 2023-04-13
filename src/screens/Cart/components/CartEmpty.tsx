import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { CImage } from 'components/atoms'

import { Roboto } from 'constants/fonts'

interface Props {}

export const CartEmpty: React.FC<Props> = () => {
  const { t } = useTranslation('cart')

  return (
    <Animated.View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      entering={FadeInDown.delay(300)}
    >
      <CImage
        ImageProps={{ source: require('assets/images/empty-cart.png') }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{t('emptyCart')}</Text>
      </View>
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%',
  },
  title: {
    fontFamily: Roboto.regular,
    color: '#023047',
    fontSize: '16@ms',
    fontWeight: '700',
  },
  subText: {
    color: '#656B79',
    fontSize: '14@ms',
    marginTop: '12@vs',
  },
})
