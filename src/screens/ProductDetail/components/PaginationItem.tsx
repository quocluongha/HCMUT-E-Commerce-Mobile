import React, { useEffect } from 'react'
import { GestureResponderEvent, TouchableOpacity } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

interface Props {
  isActive: boolean
  onPress?: (event: GestureResponderEvent) => void
}

const PaginationItemComponent: React.FC<Props> = ({ isActive, onPress }) => {
  const progressValue = useSharedValue(0)

  const animStyle = useAnimatedStyle(() => {
    const inputRange = isActive ? [0, 1] : [1, 0]
    const outputRange = isActive ? [0, 1] : [1, 0]

    return {
      transform: [
        {
          scale: interpolate(
            progressValue.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    }
  })

  useEffect(() => {
    if (isActive) {
      progressValue.value = withTiming(1)
    } else {
      progressValue.value = withTiming(0)
    }
  })

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}
    >
      <Animated.View style={[styles.active, animStyle]} />
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#023047',
    borderWidth: 1,
    borderRadius: moderateScale(12) / 2,
    width: '12@ms',
    height: '12@ms',
  },
  active: {
    width: '12@ms',
    height: '12@ms',
    borderRadius: moderateScale(12) / 2,
    backgroundColor: '#023047',
  },
})

export const PaginationItem = React.memo(
  PaginationItemComponent,
  (prevProps, nextProps) => prevProps.isActive === nextProps.isActive,
)
