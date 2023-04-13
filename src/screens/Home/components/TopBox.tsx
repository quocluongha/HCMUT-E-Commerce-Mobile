import React from 'react'
import { Text, View } from 'react-native'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Roboto } from 'constants/fonts'

import { Avatar } from './Avatar'

interface Props {
  onPressAvatar?: () => void
}

export const TopBox: React.FC<Props> = ({ onPressAvatar }) => {
  return (
    <Animated.View entering={SlideInLeft.duration(500)} style={styles.topBox}>
      <View style={styles.addressContainer}>
        <Ionicons
          name="location-sharp"
          color="#023047"
          size={moderateScale(26)}
          style={{ marginRight: scale(6) }}
        />
        <Text style={styles.address} numberOfLines={2}>
          36, 3C Street, Binh Tan, Ho Chi Minh
        </Text>
      </View>
      <Avatar />
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '16@s',
    height: '40@vs',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.9,
  },
  address: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#000000',
  },
})
