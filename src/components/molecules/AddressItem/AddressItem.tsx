import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import Animated, { AnimateProps } from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

import { useAppSelector } from 'hooks'

import { selectSelectedAddress } from 'store/selectors/address'

interface Props extends AnimateProps<ViewProps> {
  onPressChange?: (event: GestureResponderEvent) => void
}

export const AddressItem: React.FC<Props> = ({
  onPressChange,
  ...restProps
}) => {
  const { t } = useTranslation('common')

  const { address, ward, district, province } = useAppSelector(
    selectSelectedAddress,
  )

  return (
    <Animated.View style={styles.container} {...restProps}>
      <View style={{ flex: 0.8 }}>
        <Text style={[styles.text, styles.title]}>{t('deliveryTo')}</Text>
        <Text style={[styles.text, styles.address]}>
          {`${address}, ${ward?.WardName}, ${district?.DistrictName}, ${province?.ProvinceName}`}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.button}
        onPress={onPressChange}
      >
        <Text style={styles.buttonText}>{t('change')}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    marginTop: '12@vs',
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Roboto.regular,
    color: '#000000',
    fontSize: '12@ms',
  },
  title: {
    fontWeight: '600',
  },
  address: {
    marginTop: '4@vs',
    fontWeight: '700',
  },
  buttonText: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#FB8500',
    fontSize: '12@ms',
  },
})
