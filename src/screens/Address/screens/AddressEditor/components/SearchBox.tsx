import React from 'react'
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const SearchBox: React.FC<Props> = props => {
  const { containerStyle } = props

  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialIcons name="search" color={'#656B79'} size={moderateScale(28)} />
      <TextInput style={styles.input} {...props} />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '40@vs',
    backgroundColor: '#ECEFF6',
    borderRadius: '16@ms',
    paddingHorizontal: '12@s',
  },
  input: {
    flex: 1,
    height: '100%',
  },
})
