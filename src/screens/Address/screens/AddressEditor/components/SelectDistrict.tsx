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

import { ADDRESS_TYPE, District, addressActions } from 'store/reducers/address'
import { selectListDistrict } from 'store/selectors/address'

import { AddressList } from './AddressList'
import { SearchBox } from './SearchBox'
import { SelectButton } from './SelectButton'
import { SelectModal } from './SelectModal'

interface Props extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>
  onSelect?: (data: District, index: number) => void
}

export const SelectDistrict: React.FC<Props> = props => {
  const { containerStyle, disabled, onSelect = () => {} } = props

  const { t } = useTranslation('address')
  const [chosenDistrict, setChosenDistrict] = useState<District>({})
  const [isVisible, setIsVisible] = useState(false)
  const listDistrict = useAppSelector(selectListDistrict)

  const isNotSelectDistrict = isEmpty(chosenDistrict)
  const placeholderColor: StyleProp<TextStyle> = {
    color: disabled ? '#D1D1D1' : isNotSelectDistrict ? '#656B79' : '#000000',
  }

  const dispatch = useAppDispatch()

  const toggleModal = () => {
    setIsVisible(current => !current)
  }

  const selectAddressHandler = useCallback(
    (address: District, index: number) => {
      const isSameDistrict = address?.DistrictID === chosenDistrict?.DistrictID

      if (!isSameDistrict) {
        setChosenDistrict(address)
        dispatch(addressActions.updateSelectDistrict(address))
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
          isNotSelectDistrict
            ? t('selectProvince')
            : chosenDistrict?.DistrictName
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
          {t('chooseDistrict')}
        </Text>
        <SearchBox
          containerStyle={{ alignSelf: 'center' }}
          placeholder={t('search')}
        />
        <AddressList
          data={listDistrict}
          onSelect={selectAddressHandler}
          type={ADDRESS_TYPE.DISTRICT}
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
