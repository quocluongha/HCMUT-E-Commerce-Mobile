import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Roboto } from 'constants/fonts'

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const SearchBar = (props: Props) => {
  const { t } = useTranslation('home')

  return (
    <View style={[styles.container, props.containerStyle]}>
      <MaterialIcons
        name="search"
        size={moderateScale(25)}
        style={{ marginLeft: scale(12) }}
        color="#656B79"
      />
      <TextInput
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={'#656B79'}
        style={styles.input}
        {...props}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: '40@vs',
    backgroundColor: '#F8F9FA',
    borderRadius: '24@ms',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontFamily: Roboto.regular,
    fontWeight: '400',
    fontSize: '13@ms',
  },
})
