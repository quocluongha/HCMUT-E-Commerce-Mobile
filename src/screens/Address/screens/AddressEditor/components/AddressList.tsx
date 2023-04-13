import React from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

import { ADDRESS_TYPE } from 'store/reducers/address'

import { AddressItem } from './AddressItem'

interface Props<T> {
  data: T[]
  type: ADDRESS_TYPE
  onSelect?: (data: T, index: number) => void
}

export const AddressList = <T,>({
  data,
  type,
  onSelect,
}: React.PropsWithChildren<Props<T>>) => {
  const renderItem: ListRenderItem<T> = ({ item, index }) => {
    const selectAddressHandler = () => {
      if (onSelect) {
        onSelect(item, index)
      }
    }

    return (
      <AddressItem
        data={item}
        index={index}
        type={type}
        onSelect={selectAddressHandler}
      />
    )
  }

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={<View style={styles.header} />}
      keyboardShouldPersistTaps="handled"
    />
  )
}

const styles = ScaledSheet.create({
  header: {
    height: '20@vs',
  },
  item: {
    minHeight: '40@vs',
  },
  itemText: {
    fontFamily: Roboto.regular,
    fontWeight: '400',
    fontSize: '16@ms',
    color: '#000000',
  },
})
