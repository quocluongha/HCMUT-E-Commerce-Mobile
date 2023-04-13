import { Formik, FormikHelpers } from 'formik'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { CImage } from 'components/atoms'

import { Product } from 'constants/api'
import { Roboto } from 'constants/fonts'

import { useAppDispatch } from 'hooks'

import { productActions } from 'store/reducers/product'

import { formatCurrency } from 'utils'

import { Counter } from './Counter'

interface Props extends Product {
  index: number
  quantity: number
  totalPrice: number
  onPress?: (event: GestureResponderEvent) => void
}

interface Values {
  quantity: number
  totalPrice: number
}

const AnimatedSwipeable = Animated.createAnimatedComponent(Swipeable)

export const CartProductItem: React.FC<Props> = ({
  _id,
  index,
  enProductName,
  viProductName,
  pricePerUnit,
  quantity,
  totalPrice,
  photoAvatarUrl,
  onPress,
}) => {
  const [initialValues, setInitialValues] = useState<Values>({
    quantity: quantity,
    totalPrice: totalPrice,
  })

  const { i18n } = useTranslation()

  const productName =
    i18n.resolvedLanguage === 'en' ? enProductName : viProductName

  const dispatch = useAppDispatch()

  const updateCart = debounce((quantity: number, totalPrice: number) => {
    dispatch(
      productActions.updateCart({
        id: _id ?? '',
        quantity: quantity,
        totalPrice: totalPrice,
        isOverrideQuantity: true,
      }),
    )
  }, 300)

  const submitHandler = (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => {
    const { quantity, totalPrice } = values

    updateCart(quantity, totalPrice)
  }

  useEffect(() => {
    setInitialValues(currValues => ({ ...currValues, quantity, totalPrice }))
  }, [quantity, totalPrice])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      enableReinitialize
    >
      {({ values, setFieldValue, handleSubmit }) => {
        const handleQuantityInputChange = (text: string) => {
          if (text === '') {
            setFieldValue('quantity', 1)
            setFieldValue('totalPrice', pricePerUnit ?? 0)
            updateCart(1, pricePerUnit ?? 0)
          } else {
            const updatedQuantity = Number(text.replace(/[.-]*/gi, ''))
            const updatedTotalPrice = updatedQuantity * (pricePerUnit ?? 0)

            setFieldValue('quantity', updatedQuantity)
            setFieldValue('totalPrice', updatedTotalPrice)
            updateCart(updatedQuantity, updatedTotalPrice)
          }
        }

        const handleIncrement = () => {
          const updatedQuantity = values.quantity + 1
          const updatedTotalPrice = updatedQuantity * (pricePerUnit ?? 0)

          setFieldValue('quantity', updatedQuantity)
          setFieldValue('totalPrice', updatedTotalPrice)
          updateCart(updatedQuantity, updatedTotalPrice)
        }

        const handleDecrement = () => {
          const updatedQuantity =
            values.quantity - 1 <= 1 ? 1 : values.quantity - 1
          const updatedTotalPrice = updatedQuantity * (pricePerUnit ?? 0)

          setFieldValue('quantity', updatedQuantity)
          setFieldValue('totalPrice', updatedTotalPrice)
          updateCart(updatedQuantity, updatedTotalPrice)
        }

        const renderRightActions = () => {
          const handleDelete = () =>
            dispatch(productActions.deleteItemFromCart(_id ?? ''))

          return (
            <TouchableOpacity
              style={styles.leftActionContainer}
              onPress={handleDelete}
            >
              <FontAwesome5
                name="trash"
                color={'#FFFFFF'}
                size={moderateScale(24)}
              />
            </TouchableOpacity>
          )
        }

        const submitHandler = () => {
          handleSubmit()
        }

        return (
          <AnimatedSwipeable
            renderRightActions={renderRightActions}
            overshootRight={false}
            overshootLeft={false}
            entering={FadeInLeft.delay(index * 50)}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.itemContainer}
              onPress={onPress}
            >
              <CImage
                useFastImage
                FastImageProps={{
                  source: { uri: photoAvatarUrl },
                  style: styles.image,
                }}
              />
              <View style={styles.subContainer}>
                <Text style={[styles.text, styles.title]}>{productName}</Text>
                <Text style={[styles.text, styles.pricePerUnit]}>
                  {formatCurrency(pricePerUnit, 'VND')}
                </Text>
                <View style={styles.itemBottomContainer}>
                  <Counter
                    value={String(values.quantity)}
                    keyboardType="numeric"
                    onChangeText={handleQuantityInputChange}
                    onBlur={submitHandler}
                    onIncrease={handleIncrement}
                    onDecrease={handleDecrement}
                  />
                  <Text
                    style={[
                      styles.text,
                      styles.pricePerUnit,
                      styles.totalPrice,
                    ]}
                  >
                    {formatCurrency(values.totalPrice, 'VND')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </AnimatedSwipeable>
        )
      }}
    </Formik>
  )
}

const styles = ScaledSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '8@s',
  },
  leftActionContainer: {
    backgroundColor: 'red',
    width: '80@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100@ms',
    width: '100@ms',
    borderRadius: '16@ms',
    marginRight: '12@s',
  },
  subContainer: {
    flex: 1,
    minHeight: '100@ms',
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
  },
  title: {
    color: '#000000',
    fontSize: '16@ms',
  },
  pricePerUnit: {
    color: '#656B79',
    fontSize: '12@ms',
  },
  totalPrice: {
    fontSize: '16@ms',
  },
  itemBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
