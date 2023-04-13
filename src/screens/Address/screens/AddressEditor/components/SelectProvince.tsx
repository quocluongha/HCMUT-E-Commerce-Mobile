import { isEmpty } from 'lodash'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

import { useAppDispatch, useAppSelector } from 'hooks'

import { ADDRESS_TYPE, Province, addressActions } from 'store/reducers/address'
import { selectListProvince } from 'store/selectors/address'

import { AddressList } from './AddressList'
import { SearchBox } from './SearchBox'
import { SelectButton } from './SelectButton'
import { SelectModal } from './SelectModal'

interface Props extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>
  onSelect?: (data: Province, index: number) => void
}

export const SelectProvince: React.FC<Props> = props => {
  const { containerStyle, disabled, onSelect = () => {} } = props

  const { t } = useTranslation('address')
  const [chosenProvince, setChosenProvince] = useState<Province>({})
  const [isVisible, setIsVisible] = useState(false)
  const listProvince = useAppSelector(selectListProvince)

  const isNotSelectProvince = isEmpty(chosenProvince)
  const placeholderColor: StyleProp<TextStyle> = {
    color: disabled ? '#D1D1D1' : isNotSelectProvince ? '#656B79' : '#000000',
  }

  const dispatch = useAppDispatch()

  const toggleModal = () => {
    setIsVisible(current => !current)
  }

  const selectAddressHandler = useCallback(
    (address: Province, index: number) => {
      const isSameProvince = address?.ProvinceID === chosenProvince?.ProvinceID

      if (!isSameProvince) {
        setChosenProvince(address)
        dispatch(addressActions.updateSelectProvince(address))
        onSelect(address, index)
      }

      toggleModal()
    },
    [],
  )

  return (
    <React.Fragment>
      <SelectButton
        containerStyle={containerStyle}
        textStyle={placeholderColor}
        onPress={toggleModal}
        disabled={disabled}
        content={
          isNotSelectProvince
            ? t('selectProvince')
            : chosenProvince?.ProvinceName
        }
        {...props}
      />
      <SelectModal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        onPressBar={toggleModal}
        onPressClose={toggleModal}
      >
        <Text style={[styles.text, styles.title]} numberOfLines={2}>
          {t('chooseProvince')}
        </Text>
        <SearchBox
          containerStyle={{ alignSelf: 'center' }}
          placeholder={t('search')}
        />
        <AddressList
          data={listProvince}
          onSelect={selectAddressHandler}
          type={ADDRESS_TYPE.PROVINCE}
        />
      </SelectModal>
    </React.Fragment>
  )
}

const styles = ScaledSheet.create({
  text: {
    fontFamily: Roboto.regular,
    fontSize: '14@ms',
    flex: 0.9,
  },
  title: {
    fontWeight: '700',
    fontSize: '18@ms',
    color: '#000000',
    flex: 0,
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
    marginBottom: '12@vs',
  },
})
