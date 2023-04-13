import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadingTransition,
} from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { SubmitButton } from 'components/atoms'
import { AddressItem } from 'components/molecules'
import { ScreenView, Summary, SummaryItem } from 'components/organisms'

import { useAppSelector } from 'hooks'

import { CartProps } from 'navigation/types'

import { formatCurrency } from 'utils'

import { AddAdressButton, CartEmpty, CartProductList } from './components'

const AnimationTiming = 300

const SummaryAnimation = {
  layout: FadingTransition.duration(AnimationTiming),
}

const AddressItemAnimation = {
  enter: FadeInDown.duration(AnimationTiming).delay(AnimationTiming),
  exit: FadeOutDown.duration(AnimationTiming),
}

const AddAddressButtonAnimation = {
  enter: FadeInDown.duration(AnimationTiming).delay(AnimationTiming),
  exit: FadeOutDown.duration(AnimationTiming),
}

interface Props extends CartProps {}

export const Cart: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation('cart')

  const cartProductQuantity = useAppSelector(
    state => state.product.listCartProduct.length,
  )

  const listAddressLength = useAppSelector(
    state => state.address.listAddress.length,
  )

  const totalPrice = useAppSelector(state =>
    state.product.listCartProduct
      .map(item => item.totalPrice)
      .reduce((prev, curr) => prev + curr, 0),
  )

  const total: SummaryItem = {
    title: t('totalAmount'),
    content: formatCurrency(totalPrice, 'VND'),
  }

  const onPressChangeAddressHandler = () => {
    navigation.navigate('ListAddress')
  }

  const onPressAddAddressHandler = () => {
    navigation.navigate('AddressEditor', { isEditMode: false })
  }

  const checkoutHandler = () => {
    navigation.navigate('Checkout')
  }

  const renderSummaryHeader = () => {
    switch (listAddressLength) {
      case 0:
        return (
          <AddAdressButton
            entering={AddAddressButtonAnimation.enter}
            exiting={AddAddressButtonAnimation.exit}
            style={styles.addAddressButton}
            onPress={onPressAddAddressHandler}
            buttonText={t('addAddress')}
          />
        )
      default:
        return (
          <AddressItem
            onPressChange={onPressChangeAddressHandler}
            entering={AddressItemAnimation.enter}
            exiting={AddressItemAnimation.exit}
          />
        )
    }
  }

  return (
    <ScreenView>
      <View style={styles.container}>
        {cartProductQuantity !== 0 ? (
          <React.Fragment>
            <CartProductList />
            <Animated.View
              style={styles.bottomContainer}
              entering={FadeInDown.duration(500)}
            >
              <Summary
                containerStyle={styles.summary}
                layout={SummaryAnimation.layout}
                Header={renderSummaryHeader()}
                summary={total}
              />
              <SubmitButton
                containerStyle={styles.button}
                submitText={t('checkout')}
                onPress={checkoutHandler}
              />
            </Animated.View>
          </React.Fragment>
        ) : (
          <CartEmpty />
        )}
      </View>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  summary: {
    width: '85%',
  },
  bottomContainer: {
    width: '100%',
  },
  button: {
    marginVertical: '12@vs',
    alignSelf: 'center',
    width: '85%',
  },
  addAddressButton: {
    marginTop: '12@vs',
    alignSelf: 'center',
  },
})
