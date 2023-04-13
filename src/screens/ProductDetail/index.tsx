import { Formik, FormikHelpers } from 'formik'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Markdown from 'react-native-markdown-display'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters'
import Toast from 'react-native-toast-message'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { CImage, SubmitButton } from 'components/atoms'
import { ScreenView } from 'components/organisms'

import { Roboto } from 'constants/fonts'

import { useAppDispatch, useAppSelector } from 'hooks'

import { HeaderButton } from 'navigation/components'
import { ProductDetailProps } from 'navigation/types'

import { productActions } from 'store/reducers/product'

import { formatCurrency } from 'utils'

import { Counter, Pagination } from './components'
import { markdownStyles } from './markdownStyles'

interface Props extends ProductDetailProps {}

interface Values {
  quantity: number
}

export const ProductDetail: React.FC<Props> = ({ navigation, route }) => {
  const { t, i18n } = useTranslation('productDetail')
  const { bottom } = useSafeAreaInsets()
  const bottomTabHeight = Dimensions.get('window').height * 0.1 + bottom

  const [activeIndex, setActiveIndex] = useState(0)
  const [carouselRef, setCarouselRef] =
    useState<React.ElementRef<typeof Carousel>>()

  const {
    photoDescribesUrl,
    _id,
    pricePerUnit,
    description,
    enProductName,
    viProductName,
  } = useAppSelector(state => state.product.productDetail, undefined, true)

  const productName =
    i18n.resolvedLanguage === 'vi' ? viProductName : enProductName

  const dispatch = useAppDispatch()

  const initialValues: Values = {
    quantity: 1,
  }

  const handleAddToCart = (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => {
    dispatch(
      productActions.updateCart({
        id: _id ?? '',
        quantity: values.quantity,
        totalPrice: values.quantity * (pricePerUnit ?? 0),
        isOverrideQuantity: false,
      }),
    )
    Toast.show({ type: 'success', props: { message: t('addSuccess') } })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: productName ?? '',
      headerRight(props) {
        return (
          <HeaderButton
            {...props}
            style={styles.headerRightButton}
            icon={
              <AntDesign
                name="hearto"
                size={moderateScale(24)}
                color={'#FFB703'}
              />
            }
          />
        )
      },
    })
  }, [_id])

  useEffect(() => {
    const { id } = route.params

    dispatch(productActions.getProductDetail({ request: { id } }))
  }, [])

  return (
    <Formik initialValues={initialValues} onSubmit={handleAddToCart}>
      {({ values, setFieldValue, handleSubmit }) => {
        const handleQuantityInputChange = (text: string) => {
          if (text === '') {
            setFieldValue('quantity', 1)
          } else {
            const result = Number(text.replace(/[.-]*/gi, ''))
            setFieldValue('quantity', result)
          }
        }

        const handleIncrement = () => {
          setFieldValue('quantity', values.quantity + 1)
        }

        const handleDecrement = () => {
          const result = values.quantity - 1
          setFieldValue('quantity', result <= 1 ? 1 : result)
        }

        const submitHandler = () => handleSubmit()

        const renderCarouselItem: CarouselRenderItem<string> = ({ item }) => {
          return (
            <CImage
              useFastImage
              FastImageProps={{
                source: { uri: item },
                style: { flex: 1 },
              }}
            />
          )
        }

        const renderCarousel = () => (
          <View style={{ alignItems: 'center' }}>
            {photoDescribesUrl?.length !== 0 ? (
              <Carousel
                ref={ref => {
                  if (ref && !carouselRef) {
                    setCarouselRef(ref)
                  }
                }}
                loop={false}
                data={photoDescribesUrl || []}
                renderItem={renderCarouselItem}
                height={verticalScale(300)}
                width={Dimensions.get('window').width * 0.95}
                onSnapToItem={index => setActiveIndex(index)}
                style={styles.carousel}
              />
            ) : (
              <CImage ImageProps={{ style: styles.fallback }} />
            )}
            <Pagination
              data={photoDescribesUrl || []}
              carouselRef={carouselRef}
              activeIndex={activeIndex}
            />
          </View>
        )

        const renderTitleAndCounter = () => {
          return (
            <React.Fragment>
              <Text
                style={[
                  styles.title,
                  { marginLeft: scale(16), marginTop: verticalScale(20) },
                ]}
              >
                {productName}
              </Text>
              <View style={styles.subContainer}>
                <Text
                  style={[styles.title, { color: '#FFB703', flex: 1 }]}
                  numberOfLines={2}
                >
                  {formatCurrency(pricePerUnit, 'VND')}
                </Text>
                <Counter
                  keyboardType="numeric"
                  value={String(values.quantity)}
                  onChangeText={handleQuantityInputChange}
                  onIncrease={handleIncrement}
                  onDecrease={handleDecrement}
                />
              </View>
            </React.Fragment>
          )
        }

        return (
          <ScreenView>
            <KeyboardAwareScrollView
              keyboardOpeningTime={350}
              contentContainerStyle={{
                paddingBottom: bottomTabHeight,
                paddingTop: verticalScale(4),
              }}
            >
              {renderCarousel()}
              {renderTitleAndCounter()}
              <Animated.View style={styles.markdownContainer}>
                <Markdown style={markdownStyles}>{description ?? ''}</Markdown>
              </Animated.View>
            </KeyboardAwareScrollView>
            <Animated.View
              entering={FadeInDown}
              layout={FadeInDown}
              style={[styles.bottomContainer, { height: bottomTabHeight }]}
            >
              <SubmitButton
                onPress={submitHandler}
                submitText={t('addToCart')}
                containerStyle={{ alignSelf: 'center' }}
              />
            </Animated.View>
          </ScreenView>
        )
      }}
    </Formik>
  )
}

const styles = ScaledSheet.create({
  carousel: {
    borderRadius: '16@ms',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  title: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '20@ms',
    color: '#000000',
  },
  bottomContainer: {
    backgroundColor: '#E9ECEF',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    borderTopLeftRadius: '12@ms',
    borderTopRightRadius: '12@ms',
    bottom: 0,
  },
  markdownContainer: {
    paddingHorizontal: '16@s',
    marginTop: '20@vs',
  },
  fallback: {
    height: '300@vs',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: '16@ms',
  },
  headerRightButton: {
    marginRight: '16@s',
  },
})
