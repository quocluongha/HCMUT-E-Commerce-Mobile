import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

import { useAppSelector } from 'hooks'

import {
  ADDRESS_TYPE,
  AddressType,
  District,
  Province,
  Ward,
} from 'store/reducers/address'
import { selectIsSelectedAddressType } from 'store/selectors/address'

interface Props<T> {
  data: T
  index: number
  type: ADDRESS_TYPE
  onSelect?: (data: T, index: number) => void
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export const AddressItem = <T,>({
  data,
  index,
  type,
  onSelect,
}: React.PropsWithChildren<Props<T>>) => {
  const isSelected = useAppSelector(state =>
    selectIsSelectedAddressType(state, type, data as AddressType<T>),
  )

  const selectAddressName = () => {
    const { ProvinceName } = data as Province
    const { DistrictName } = data as District
    const { WardName } = data as Ward

    return ProvinceName ?? DistrictName ?? WardName
  }

  const selectAddressHandler = () => {
    if (onSelect) {
      onSelect(data, index)
    }
  }

  return (
    <AnimatedTouchableOpacity
      style={styles.item}
      entering={FadeInDown.delay(index * 50 + 200)}
      onPress={selectAddressHandler}
    >
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedItem : styles.unselectedItem,
        ]}
      >
        {selectAddressName()}
      </Text>
    </AnimatedTouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  item: {
    minHeight: '40@vs',
  },
  text: {
    fontFamily: Roboto.regular,
    fontSize: '16@ms',
  },
  unselectedItem: {
    fontWeight: '400',
    color: '#000000',
  },
  selectedItem: {
    fontWeight: '700',
    color: '#157E4E',
  },
})
