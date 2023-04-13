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

import { ADDRESS_TYPE, Ward, addressActions } from 'store/reducers/address'
import { selectListWard } from 'store/selectors/address'

import { AddressList } from './AddressList'
import { SearchBox } from './SearchBox'
import { SelectButton } from './SelectButton'
import { SelectModal } from './SelectModal'

interface Props extends TouchableOpacityProps {
  containerStyle?: StyleProp<ViewStyle>
  onSelect?: (data: Ward, index: number) => void
}

export const SelectWard: React.FC<Props> = props => {
  const { containerStyle, disabled, onSelect = () => {} } = props

  const { t } = useTranslation('address')
  const [chosenWard, setChosenWard] = useState<Ward>({})
  const [isVisible, setIsVisible] = useState(false)
  const listDistrict = useAppSelector(selectListWard)

  const isNotSelectWard = isEmpty(chosenWard)
  const placeholderColor: StyleProp<TextStyle> = {
    color: disabled ? '#D1D1D1' : isNotSelectWard ? '#656B79' : '#000000',
  }

  const dispatch = useAppDispatch()

  const toggleModal = () => {
    setIsVisible(current => !current)
  }

  const selectAddressHandler = useCallback((address: Ward, index: number) => {
    const isSameDistrict = address?.WardCode === chosenWard?.WardCode

    if (!isSameDistrict) {
      setChosenWard(address)
      dispatch(addressActions.updateSelectWard(address))
      onSelect(address, index)
    }

    toggleModal()
  }, [])

  return (
    <React.Fragment>
      <SelectButton
        containerStyle={containerStyle}
        textStyle={placeholderColor}
        onPress={toggleModal}
        disabled={disabled}
        content={isNotSelectWard ? t('selectProvince') : chosenWard?.WardName}
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
          {t('chooseWard')}
        </Text>
        <SearchBox
          containerStyle={{ alignSelf: 'center' }}
          placeholder={t('search')}
        />
        <AddressList
          data={listDistrict}
          onSelect={selectAddressHandler}
          type={ADDRESS_TYPE.WARD}
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
