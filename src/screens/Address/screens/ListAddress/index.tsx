import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useLayoutEffect } from 'react'
import { ScaledSheet } from 'react-native-size-matters'

import { SafeAreaView, ScreenView } from 'components/organisms'

import { useAppDispatch, useAppSelector } from 'hooks'

import { ListAddressProps } from 'navigation/types'

import { addressActions } from 'store/reducers/address'
import { selectListAddress } from 'store/selectors/address'

import { AddAddressButton, AddressList } from './components'

interface Props extends ListAddressProps {}

export const ListAddress: React.FC<Props> = ({ navigation }) => {
  const { listAddress, listSelectedAddress } = useAppSelector(selectListAddress)

  const dispatch = useAppDispatch()

  const onPressAddAddressHandler = () => {
    navigation.navigate('AddressEditor', { isEditMode: false })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight() {
        return (
          <AddAddressButton
            buttonText={'Add'}
            style={styles.headerRightButton}
            onPress={onPressAddAddressHandler}
          />
        )
      },
    })
  }, [])

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(addressActions.updateAddressList())
      }
    }, []),
  )

  return (
    <ScreenView>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <AddressList
          data={listAddress}
          listSeletedAddress={listSelectedAddress}
        />
      </SafeAreaView>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerRightButton: {
    marginRight: '16@s',
  },
})
