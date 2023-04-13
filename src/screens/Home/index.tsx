import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'
import Animated, {
  Extrapolation,
  SlideInRight,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

import { ScreenView } from 'components/organisms'

import { Product } from 'constants/api'

import { useAppDispatch } from 'hooks'

import { HomeProps } from 'navigation/types'

import { productActions } from 'store/reducers/product'

import { HomeHeader, ProductList, SearchBar } from './components'

interface Props extends HomeProps {}

const TopBoxHeight = verticalScale(40)
const MiddleBoxHeight = verticalScale(50)
const BottomBoxHeight = verticalScale(70)
const HeaderBaseHeight = TopBoxHeight + MiddleBoxHeight + BottomBoxHeight

export const Home: React.FC<Props> = ({ navigation }) => {
  const productListRef = useAnimatedRef<FlatList<Product>>()

  const { top } = useSafeAreaInsets()
  const HeaderFullHeight = HeaderBaseHeight + verticalScale(4)
  const HeaderCollapseHeight = HeaderBaseHeight + top
  const CollapseRatio =
    HeaderFullHeight / (TopBoxHeight + MiddleBoxHeight + top)

  const dispatch = useAppDispatch()

  const isScrolling = useSharedValue(false)
  const headerHeight = useSharedValue(HeaderFullHeight)
  const categoryBarHeight = useSharedValue(0)

  const setIsScrolling = useCallback(
    debounce((value: boolean) => {
      isScrolling.value = value
    }, 300),
    [],
  )

  const listOffset = useScrollViewOffset(productListRef as any)

  const derivedHeaderTranslateY = useDerivedValue(() => {
    return interpolate(
      listOffset.value,
      [0, HeaderFullHeight / CollapseRatio],
      [0, -HeaderFullHeight / CollapseRatio],
      Extrapolation.CLAMP,
    )
  })

  const headerAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: derivedHeaderTranslateY.value }],
    }
  })

  const headerHeightStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
    }
  })

  const categoryBarStyle = useAnimatedStyle(() => {
    return {
      marginTop: categoryBarHeight.value,
    }
  })

  const snapHandler = (currentOffset: number) => {
    if (productListRef.current) {
      if (currentOffset < HeaderFullHeight / CollapseRatio / 1.5) {
        productListRef.current?.scrollToOffset({ offset: 0, animated: true })
      }

      if (
        currentOffset >= HeaderFullHeight / CollapseRatio / 1.5 &&
        currentOffset < HeaderFullHeight
      ) {
        productListRef.current?.scrollToOffset({
          offset: HeaderFullHeight / CollapseRatio,
          animated: true,
        })
      }
    }
  }

  const onScrollBeginDragHandler = () => {
    setIsScrolling(true)
    setIsScrolling.flush()
  }

  const onScrollEndDragHandler = () => {
    setIsScrolling(false)
  }

  const onMomentumScrollBeginHandler = () => {
    setIsScrolling(true)
    setIsScrolling.flush()
  }

  const onMomentumScrollEndHandler = () => {
    setIsScrolling(false)
    setIsScrolling.flush()
  }

  useAnimatedReaction(
    () => {
      return isScrolling.value
    },
    result => {
      if (!result) {
        runOnJS(snapHandler)(listOffset.value)
      }
    },
  )

  useAnimatedReaction(
    () => {
      return listOffset.value
    },
    result => {
      if (result <= 0) {
        headerHeight.value = withTiming(HeaderFullHeight, { duration: 100 })
        categoryBarHeight.value = withTiming(0, { duration: 100 })
        return
      }

      if (result >= HeaderFullHeight / CollapseRatio / 1.5) {
        headerHeight.value = withTiming(HeaderCollapseHeight, { duration: 100 })
        categoryBarHeight.value = withTiming(top, { duration: 100 })
        return
      }
    },
  )

  const renderSearchAndNotification = () => {
    return (
      <Animated.View
        entering={SlideInRight.duration(500)}
        style={styles.searchBarAndNotification}
      >
        <SearchBar />
      </Animated.View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <HomeHeader {...(props as BottomTabHeaderProps)} />,
      headerShown: true,
    })
  })

  useEffect(() => {
    dispatch(
      productActions.getListProduct({
        request: { currentPage: 0, itemsPerPage: 10 },
      }),
    )
  }, [])

  return (
    <ScreenView>
      {/* <Animated.View
          style={[
            styles.headerWrapper,
            headerAnimationStyle,
            headerHeightStyle,
            // { top },
          ]}
        > */}
      {/* <TopBox /> */}
      {/* {renderSearchAndNotification()} */}
      {/* </Animated.View> */}
      {/* <Category containerStyle={[styles.category]} /> */}
      <ProductList
        // contentContainerStyle={[{ paddingTop: HeaderFullHeight }]}
        progressViewOffset={HeaderFullHeight}
        onScrollBeginDrag={onScrollBeginDragHandler}
        onScrollEndDrag={onScrollEndDragHandler}
        onMomentumScrollBegin={onMomentumScrollBeginHandler}
        onMomentumScrollEnd={onMomentumScrollEndHandler}
        ref={productListRef as any}
      />
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  searchBarAndNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '12@s',
    height: '50@vs',
  },
  category: {
    paddingHorizontal: '2@s',
    height: '70@vs',
  },
  headerWrapper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    backgroundColor: '#E9ECEF',
  },
})
