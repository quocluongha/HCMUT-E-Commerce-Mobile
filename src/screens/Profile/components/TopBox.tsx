import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters'

import { CImage } from 'components/atoms'

import { Roboto } from 'constants/fonts'

export interface TopBoxProps {}

export const TopBox: React.FC<TopBoxProps> = props => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <TouchableOpacity>
        <CImage
          ImageProps={{
            style: {
              width: moderateScale(80),
              height: moderateScale(80),
              borderRadius: moderateScale(80) / 2,
            },
          }}
        />
      </TouchableOpacity>
      <View style={{ rowGap: verticalScale(12), width: '100%', flex: 1 }}>
        <Text
          style={{
            fontFamily: Roboto.medium,
            fontSize: moderateScale(18),
            color: '#FFFFFF',
          }}
        >
          {'Ha Quoc Luong'}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: Roboto.regular,
              fontSize: moderateScale(14),
              color: '#FFFFFF',
              width: '50%',
            }}
          >
            {'Followers'}{' '}
            <Text style={{ fontFamily: Roboto.medium }}>{100}</Text>
          </Text>
          <Text
            style={{
              fontFamily: Roboto.regular,
              fontSize: moderateScale(14),
              color: '#FFFFFF',
              width: '50%',
            }}
          >
            {'Followings'}{' '}
            <Text style={{ fontFamily: Roboto.medium }}>{100}</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#023047',
    flexDirection: 'row',
    paddingHorizontal: '20@s',
    columnGap: '20@s',
    alignItems: 'center',
    paddingBottom: '12@vs',
    borderBottomLeftRadius: '18@ms',
    borderBottomRightRadius: '18@ms',
  },
})
