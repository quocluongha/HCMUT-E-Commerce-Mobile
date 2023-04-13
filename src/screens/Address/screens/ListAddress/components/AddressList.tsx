import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { useAppDispatch } from 'hooks'

import { ListAddressNavigationProps } from 'navigation/types'

import { Address, addressActions } from 'store/reducers/address'

import { AddressListItem } from './AddressListItem'

interface Props {
  data?: Address[]
  listSeletedAddress?: boolean[]
}

export const AddressList: React.FC<Props> = ({
  data = [],
  listSeletedAddress = [],
}) => {
  const { navigate } = useNavigation<ListAddressNavigationProps>()

  const dispatch = useAppDispatch()

  const renderItem: ListRenderItem<Address> = ({ item, index }) => {
    const selectAddressHandler = () => {
      const updatedSelectedAddressList = listSeletedAddress.map(
        (_, idx) => idx === index,
      )

      dispatch(
        addressActions.updateSelectedAddressList(updatedSelectedAddressList),
      )
    }

    const onPressEditHandler = () => {
      navigate('AddressEditor', { isEditMode: true })
    }

    return (
      <AddressListItem
        data={item}
        index={index}
        onPress={selectAddressHandler}
        onPressEdit={onPressEditHandler}
      />
    )
  }

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={<View style={styles.header} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = ScaledSheet.create({
  header: {
    height: '12@vs',
  },
  contentContainer: {
    paddingHorizontal: '20@s',
  },
  separator: {
    height: '8@vs',
  },
})
