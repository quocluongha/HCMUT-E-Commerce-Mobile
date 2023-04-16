import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ListRenderItem, StyleProp, View, ViewStyle } from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import Animated from 'react-native-reanimated'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

import { Product } from 'constants/api'

import { useAppSelector } from 'hooks'

import { CartNavigationProps } from 'navigation/types'

import { selectCartProduct } from 'store/selectors/product'

import { CartProductItem } from './CartProductItem'

const AnimatedKeyboardAwareFlatList = Animated.createAnimatedComponent(
  KeyboardAwareFlatList,
)

interface Props {
  containerStyle?: StyleProp<ViewStyle>
}

export const CartProductList: React.FC<Props> = () => {
  const { navigate } = useNavigation<CartNavigationProps>()

  const listDetailCartProduct = useAppSelector(selectCartProduct)
  const listCartProduct = useAppSelector(state => state.product.listCartProduct)

  const renderItem: ListRenderItem<Product> = ({ item, index }) => {
    const { quantity } = listCartProduct[index]

    const onPressItemHandler = () => {
      navigate('ProductDetail', { id: item?._id })
    }

    return (
      <CartProductItem
        {...item}
        index={index}
        quantity={quantity}
        onPress={onPressItemHandler}
      />
    )
  }

  return (
    <AnimatedKeyboardAwareFlatList
      enableOnAndroid
      bounces={false}
      data={listDetailCartProduct}
      contentContainerStyle={{
        paddingTop: verticalScale(12),
        rowGap: verticalScale(12),
      }}
      renderItem={renderItem}
    />
  )
}

const styles = ScaledSheet.create({
  separator: {
    height: '12@vs',
  },
})
