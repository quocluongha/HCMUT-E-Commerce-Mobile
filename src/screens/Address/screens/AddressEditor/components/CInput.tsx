import React from 'react'
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
}

export const CInput: React.FC<Props> = props => {
  const { containerStyle, inputStyle, multiline } = props

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          { textAlignVertical: multiline ? 'top' : 'center' },
          inputStyle,
        ]}
        placeholderTextColor={'#656B79'}
        {...props}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '40@vs',
    backgroundColor: '#ECEFF6',
    borderRadius: '16@ms',
    borderColor: '#ECEFF6',
    borderWidth: 1,
    paddingHorizontal: '8@s',
  },
  input: {
    flex: 1,
    fontFamily: Roboto.regular,
    color: '#000000',
    fontSize: '14@ms',
  },
})
