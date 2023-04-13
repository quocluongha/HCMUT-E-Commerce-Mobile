import { debounce } from 'lodash'
import React, { ForwardedRef, RefObject, forwardRef, useCallback } from 'react'
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  LayoutRectangle,
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

export interface CollapsibleHeaderFlatlistProps<T>
  extends AnimateProps<FlatListProps<T>> {
  header?: React.ReactNode
  snapThreshold?: number
  onExpand?: (offset?: number) => void
  onCollapse?: (offset?: number) => void
}

export interface CollapsibleHeaderFlatlistExposedElements {}

export const CollapsibleHeaderFlatlistComponent = <T extends any>(
  {
    header,
    StickyHeaderComponent,
    children,
    snapThreshold = 2,
    onExpand = () => {},
    onCollapse = () => {},
    ...props
  }: CollapsibleHeaderFlatlistProps<T>,
  ref?: ForwardedRef<CollapsibleHeaderFlatlistExposedElements>,
) => {
  const headerLayout = useSharedValue<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const flatlistRef = useAnimatedRef<FlatList<T>>()

  const isScrolling = useSharedValue(false)

  const scrollViewOffset = useScrollViewOffset(
    flatlistRef as unknown as RefObject<Animated.ScrollView>,
  )

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
      flatlistRef.current?.scrollToOffset({ offset: 0, animated: true })

      onExpand(currentOffset)
    }

    if (
      currentOffset >= headerLayout.value.height / snapThreshold &&
      currentOffset < headerLayout.value.height
    ) {
      flatlistRef.current?.scrollToOffset({
        offset: headerLayout.value.height,
        animated: true,
      })

      onCollapse(currentOffset)
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
    <Animated.FlatList
      ref={ref ?? (flatlistRef as any)}
      onScrollBeginDrag={onScrollBeginDragHandler}
      onScrollEndDrag={onScrollEndDragHandler}
      onMomentumScrollBegin={onMomentumScrollBeginHandler}
      onMomentumScrollEnd={onMomentumScrollEndHandler}
      ListHeaderComponent={renderHeader}
      {...props}
    />
  )
}

export const CollapsibleHeaderFlatlist = forwardRef(
  CollapsibleHeaderFlatlistComponent,
) as <T extends any>(
  props: CollapsibleHeaderFlatlistProps<T> & {
    ref?: ForwardedRef<CollapsibleHeaderFlatlistExposedElements>
  },
) => ReturnType<typeof CollapsibleHeaderFlatlistComponent>
