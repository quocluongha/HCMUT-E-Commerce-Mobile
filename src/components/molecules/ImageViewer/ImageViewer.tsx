import React, { useState } from 'react'
import {
  Dimensions,
  ImageLoadEventData,
  ImageSourcePropType,
  NativeSyntheticEvent,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT } =
  Dimensions.get('window')

interface Props {
  containerWidth?: number
  containerHeight?: number
  source: ImageSourcePropType
}

export const ImageViewer: React.FC<Props> = ({
  containerWidth = DEFAULT_WIDTH,
  containerHeight = DEFAULT_HEIGHT,
  source,
}) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const scaleValue = useSharedValue(1)
  const saveScaleValue = useSharedValue(1)
  const memoizedScaleValue = useSharedValue(1)

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const memoizedTranslateX = useSharedValue(0)
  const memoizedTranslateY = useSharedValue(0)

  const zoomMode = useSharedValue(false)

  const calculateScaleValue = (values: {
    base: number
    current: number
    min: number
    max: number
  }) => {
    'worklet'
    const newScaleValue = values.base * values.current

    if (newScaleValue < values.min) return values.min

    if (newScaleValue > values.max) return values.max

    return newScaleValue
  }

  const calculateEdgesValues = (values: {
    memoizedTranslateX: number
    memoizedTranslateY: number
    currentTranslateX: number
    currentTranslateY: number
  }) => {
    'worklet'
    const newTranslateX = values.memoizedTranslateX + values.currentTranslateX
    const newTranslateY = values.memoizedTranslateY + values.currentTranslateY
    const derivedImageHeight =
      (imageSize.height * containerWidth) / imageSize.width

    const maxTranslateX =
      imageSize.width * saveScaleValue.value < containerWidth
        ? 0
        : (imageSize.width * saveScaleValue.value - containerWidth) /
          (2 * saveScaleValue.value)

    const maxTranslateY =
      imageSize.height * saveScaleValue.value < containerHeight
        ? 0
        : (derivedImageHeight * saveScaleValue.value - containerHeight) /
          (2 * saveScaleValue.value)

    if (zoomMode.value) {
      let calculatedTranslateX
      let calculatedTranslateY

      if (newTranslateX > maxTranslateX) {
        calculatedTranslateX = maxTranslateX
      } else if (newTranslateX < -maxTranslateX) {
        calculatedTranslateX = -maxTranslateX
      } else {
        calculatedTranslateX = newTranslateX
      }

      if (newTranslateY > maxTranslateY) {
        calculatedTranslateY = maxTranslateY
      } else if (newTranslateY < -maxTranslateY) {
        calculatedTranslateY = -maxTranslateY
      } else {
        calculatedTranslateY = newTranslateY
      }

      return {
        calculatedTranslateX,
        calculatedTranslateY,
      }
    }
    return {
      calculatedTranslateX: newTranslateX,
      calculatedTranslateY: newTranslateY,
    }
  }

  const onLoad: (event: NativeSyntheticEvent<ImageLoadEventData>) => void = ({
    nativeEvent,
  }) => {
    const { width, height } = nativeEvent.source
    setImageSize({
      width,
      height,
    })
  }

  const panGesture = Gesture.Pan()
    .minPointers(1)
    .maxPointers(1)
    .onStart(() => {
      memoizedTranslateX.value = translateX.value
      memoizedTranslateY.value = translateY.value
    })
    .onUpdate(event => {
      const { calculatedTranslateX, calculatedTranslateY } =
        calculateEdgesValues({
          memoizedTranslateX: memoizedTranslateX.value,
          memoizedTranslateY: memoizedTranslateY.value,
          currentTranslateX: event.translationX,
          currentTranslateY: event.translationY,
        })

      translateX.value = calculatedTranslateX
      translateY.value = calculatedTranslateY
    })
    .onEnd(() => {
      if (!zoomMode.value) {
        translateX.value = withTiming(0, { duration: 200 })
        translateY.value = withTiming(0, { duration: 200 })
      }
    })

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => {
      const newScaleValue = calculateScaleValue({
        base: saveScaleValue.value,
        current: event.scale,
        min: 1,
        max: 10,
      })

      memoizedScaleValue.value = newScaleValue
      scaleValue.value = newScaleValue
    })
    .onEnd(() => {
      saveScaleValue.value = memoizedScaleValue.value

      if (memoizedScaleValue.value === 1) {
        zoomMode.value = false
        translateX.value = withTiming(0, { duration: 200 })
        translateY.value = withTiming(0, { duration: 200 })
      } else {
        zoomMode.value = true
      }
    })

  const tapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (zoomMode.value) {
        saveScaleValue.value = 1
        zoomMode.value = false
        scaleValue.value = withTiming(1, { duration: 200 })
        translateX.value = withTiming(0, { duration: 200 })
        translateY.value = withTiming(0, { duration: 200 })
      } else {
        scaleValue.value = withTiming(3, { duration: 200 })
        saveScaleValue.value = 3
        zoomMode.value = true
      }
    })

  const composedPanPinchGesture = Gesture.Race(
    pinchGesture,
    panGesture,
    tapGesture,
  )

  const scaleImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <GestureDetector gesture={composedPanPinchGesture}>
      <Animated.Image
        source={source}
        style={[{ flex: 1 }, scaleImageStyle]}
        resizeMode="contain"
        onLoad={onLoad}
      />
    </GestureDetector>
  )
}
