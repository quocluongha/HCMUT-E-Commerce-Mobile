import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import Animated, { ZoomIn } from 'react-native-reanimated'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Toast from 'react-native-toast-message'
import Octicons from 'react-native-vector-icons/Octicons'

import { CImage } from 'components/atoms'
import { EmptyListComponent } from 'components/molecules'

import { Product } from 'constants/api'
import { Roboto } from 'constants/fonts'

import { useAppDispatch, useAppSelector } from 'hooks'

import { HomeNavigationProps } from 'navigation/types'

import { productActions } from 'store/reducers/product'

import { formatCurrency } from 'utils'

import { Category } from './Category'

interface Props {
  progressViewOffset?: number
  contentContainerStyle?: StyleProp<ViewStyle>
  onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  onMomentumScrollBegin: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void
  onMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export const ProductList = React.forwardRef<
  Animated.FlatList<Partial<Product>>,
  Props
>(
  (
    {
      onScrollBeginDrag,
      onScrollEndDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      progressViewOffset,
      contentContainerStyle,
    },
    ref,
  ) => {
    const { navigate } = useNavigation<HomeNavigationProps>()

    const { t, i18n } = useTranslation('productDetail')

    const dispatch = useAppDispatch()

    const { listProductdData, isGettingProduct, isRefreshingProductList } =
      useAppSelector(state => state.product, undefined, true)

    const renderItem: ListRenderItem<Partial<Product>> = ({ item }) => {
      const handleAddToCart = () => {
        dispatch(
          productActions.updateCart({
            id: item?._id ?? '',
            quantity: 1,
            totalPrice: item?.pricePerUnit ?? 0,
            isOverrideQuantity: false,
          }),
        )
        Toast.show({ type: 'success', props: { message: t('addSuccess') } })
      }

      return (
        <AnimatedTouchableOpacity
          entering={ZoomIn.duration(500)}
          style={styles.item}
          activeOpacity={1}
          onPress={() => navigate('ProductDetail', { id: item?._id ?? '' })}
        >
          <CImage
            useFastImage
            FastImageProps={{
              source: { uri: item?.photoAvatarUrl, priority: 'high' },
              style: styles.image,
            }}
          />
          <View style={styles.itemName}>
            <View style={{ flex: 0.5 }}>
              <Text numberOfLines={2} style={styles.name}>
                {i18n.resolvedLanguage === 'vi'
                  ? item?.viProductName
                  : item?.enProductName}
              </Text>
            </View>
            <View style={styles.itemBottomContainer}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.name, { color: '#FFB703' }]}
              >
                {formatCurrency(item?.pricePerUnit, 'VND')}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddToCart}
              >
                <Octicons
                  name="plus"
                  color="#FFFFFF"
                  size={moderateScale(14)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedTouchableOpacity>
      )
    }

    return (
      <Animated.FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingProductList}
            progressViewOffset={progressViewOffset}
          />
        }
        data={listProductdData?.items ?? []}
        renderItem={renderItem}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={[
          styles.contentContainer,
          {
            alignItems:
              listProductdData?.items && listProductdData.items.length === 0
                ? 'center'
                : undefined,
          },
          contentContainerStyle,
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Category containerStyle={{ backgroundColor: '#E9ECEF' }} />
        }
        ListFooterComponent={<View style={styles.footer} />}
        ListEmptyComponent={
          <EmptyListComponent
            description="Empty product"
            isGettingData={isGettingProduct}
          />
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ref={ref}
        bounces={false}
      />
    )
  },
)

const styles = ScaledSheet.create({
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  item: {
    width: '150@s',
    height: '180@vs',
    backgroundColor: '#FFFFFF',
    borderRadius: '16@ms',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.11,
  },
  separator: {
    height: '30@vs',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: '12@s',
  },
  image: {
    width: '100%',
    height: '62%',
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
  },
  name: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#000000',
    fontSize: '14@ms',
  },
  itemName: {
    paddingHorizontal: '8@s',
    paddingTop: '8@vs',
    flex: 1,
  },
  itemBottomContainer: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFB703',
    width: '22@ms',
    height: '22@ms',
    borderRadius: moderateScale(22) / 2,
  },
  footer: {
    height: '16@vs',
  },
  list: {
    flex: 1,
  },
})
