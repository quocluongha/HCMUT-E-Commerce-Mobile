import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters'

import { Search } from 'components/svgs'

export interface HomeHeaderProps extends BottomTabHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ navigation }) => {
  const { top } = useSafeAreaInsets()

  return (
    <Animated.View style={[{ paddingTop: top }, styles.container]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          height: verticalScale(32),
          borderRadius: moderateScale(12),
          backgroundColor: '#ECEFF6',
          alignItems: 'center',
          paddingHorizontal: scale(12),
        }}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Search')
        }}
      >
        <Search
          style={{ marginRight: scale(8) }}
          color={'#A7A7A7'}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
        <Text>Find book here...</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#023047',
    justifyContent: 'flex-end',
    paddingBottom: '12@vs',
    paddingHorizontal: '12@s',
  },
})
