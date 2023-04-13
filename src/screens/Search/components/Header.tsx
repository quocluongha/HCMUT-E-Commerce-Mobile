import { StackHeaderProps } from '@react-navigation/stack'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { CInput } from 'components/atoms'

import { HeaderButton } from 'navigation/components'

export interface HeaderProps extends StackHeaderProps {}

export const Header: React.FC<HeaderProps> = ({
  options,
  navigation,
  route,
}) => {
  const { top } = useSafeAreaInsets()

  return (
    <Animated.View style={[{ paddingTop: top }, styles.container]}>
      <HeaderButton
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: scale(12),
          top: top + (verticalScale(32) - moderateScale(26)) / 2,
        }}
        icon={
          <Entypo
            name="chevron-left"
            color={'#FFB703'}
            size={moderateScale(26)}
          />
        }
      />
      <CInput
        onLayout={e => {
          console.log(e.nativeEvent.layout.y)
        }}
        style={{ height: verticalScale(32), borderRadius: moderateScale(12) }}
        placeholder="Find book here..."
        autoFocus
      />
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#023047',
    paddingBottom: '12@vs',
    paddingHorizontal: '12@s',
  },
})
