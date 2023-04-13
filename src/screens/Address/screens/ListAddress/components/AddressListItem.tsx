import React, { memo } from 'react'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Octicons from 'react-native-vector-icons/Octicons'

import { Roboto } from 'constants/fonts'

import { useAppSelector } from 'hooks'

import { Address } from 'store/reducers/address'
import { selectIsSelectedAddress } from 'store/selectors/address'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  data: Address
  index: number
  onPress?: (event: GestureResponderEvent) => void
  onPressEdit?: (event: GestureResponderEvent) => void
}

export const AddressListItem: React.FC<Props> = memo(
  ({ data, onPress, index, onPressEdit }) => {
    const { name, phoneNumber, address, ward, district, province } = data

    const isSelect = useAppSelector(state =>
      selectIsSelectedAddress(state, index),
    )

    return (
      <AnimatedTouchable
        entering={
          index % 2 === 0
            ? FadeInLeft.delay(index * 100)
            : FadeInRight.delay(index * 100)
        }
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.itemContainer,
          isSelect
            ? {
                backgroundColor: 'rgba(255, 183, 3, 0.1)',
                borderColor: '#FFB703',
              }
            : {},
        ]}
      >
        {isSelect && (
          <View style={styles.badge}>
            <Octicons name="check" color={'#FFFFFF'} size={moderateScale(18)} />
          </View>
        )}
        <Text style={[styles.text, styles.name]}>{name}</Text>
        <Text style={[styles.text, styles.phoneNumber]}>{phoneNumber}</Text>
        <Text style={[styles.text, styles.address]} numberOfLines={2}>
          {`${address}, ${ward?.WardName}, ${district?.DistrictName}, ${province?.ProvinceName}`}
        </Text>
        <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
          <Text style={[styles.text, styles.editText]}>{'Edit'}</Text>
        </TouchableOpacity>
      </AnimatedTouchable>
    )
  },
)

const styles = ScaledSheet.create({
  itemContainer: {
    backgroundColor: '#F5F7FA',
    padding: '12@ms',
    borderRadius: '8@ms',
    borderWidth: 1,
    borderColor: '#F5F7FA',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: '8@ms',
    borderBottomLeftRadius: '8@ms',
    backgroundColor: '#FFB703',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: '30%',
  },
  text: {
    fontFamily: Roboto.regular,
    color: '#000000',
  },
  name: {
    fontWeight: '700',
    fontSize: '14@ms',
  },
  phoneNumber: {
    fontWeight: '400',
    fontSize: '14@ms',
    marginVertical: '8@vs',
  },
  address: {
    fontWeight: '400',
    fontSize: '14@ms',
    color: '#656B79',
    width: '85%',
  },
  editButton: {
    position: 'absolute',
    bottom: '12@ms',
    right: '12@ms',
  },
  editText: {
    fontWeight: '400',
    fontSize: '12@ms',
    color: '#FB8500',
  },
})
