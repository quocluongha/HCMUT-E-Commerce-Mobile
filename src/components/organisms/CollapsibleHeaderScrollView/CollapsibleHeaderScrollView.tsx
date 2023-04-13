import { debounce } from 'lodash'
import React, { forwardRef, useCallback } from 'react'
import {
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollViewProps,
  View,
} from 'react-native'
import Animated, {
  AnimateProps,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated'

export interface CollapsibleHeaderScrollViewProps
  extends AnimateProps<ScrollViewProps> {
  header?: React.ReactNode
  snapThreshold?: number
}

export interface CollapsibleHeaderScrollViewExposedElements {}

export const CollapsibleHeaderScrollView = forwardRef<
  CollapsibleHeaderScrollViewExposedElements,
  CollapsibleHeaderScrollViewProps
>(
  (
    { header, StickyHeaderComponent, children, snapThreshold = 2, ...props },
    ref,
  ) => {
    const headerLayout = useSharedValue<LayoutRectangle>({
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    })

    const scrollViewRef = useAnimatedRef<Animated.ScrollView>()

    const isScrolling = useSharedValue(false)

    const scrollViewOffset = useScrollViewOffset(scrollViewRef)

    const setIsScrolling = useCallback(
      debounce((value: boolean) => {
        isScrolling.value = value
      }, 300),
      [],
    )

    const onHeaderLayoutHandler = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent

      headerLayout.value = layout
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

    const snapToOffset = (currentOffset: number) => {
      if (currentOffset < headerLayout.value.height / snapThreshold) {
        scrollViewRef.current?.scrollTo({
          y: 0,
          animated: true,
        })
      }

      if (
        currentOffset >= headerLayout.value.height / snapThreshold &&
        currentOffset < headerLayout.value.height
      ) {
        scrollViewRef.current?.scrollTo({
          y: headerLayout.value.height,
          animated: true,
        })
      }
    }

    useAnimatedReaction(
      () => {
        return isScrolling.value
      },
      result => {
        if (!result) {
          runOnJS(snapToOffset)(scrollViewOffset.value)
        }
      },
    )

    const renderHeader = () => {
      return <View onLayout={onHeaderLayoutHandler}>{header}</View>
    }

    return (
      <Animated.ScrollView
        ref={ref ?? (scrollViewRef as any)}
        onScrollBeginDrag={onScrollBeginDragHandler}
        onScrollEndDrag={onScrollEndDragHandler}
        onMomentumScrollBegin={onMomentumScrollBeginHandler}
        onMomentumScrollEnd={onMomentumScrollEndHandler}
        {...props}
      >
        {renderHeader()}
        {children as React.ReactNode}
      </Animated.ScrollView>
    )
  },
)
