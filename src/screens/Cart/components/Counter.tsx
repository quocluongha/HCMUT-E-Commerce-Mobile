import React from 'react'
import {
  GestureResponderEvent,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Roboto } from 'constants/fonts'

interface Props extends TextInputProps {
  onIncrease: (event: GestureResponderEvent) => void
  onDecrease: (event: GestureResponderEvent) => void
}

export const Counter: React.FC<Props> = props => {
  const { onIncrease, onDecrease } = props

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onDecrease}>
        <MaterialCommunityIcons
          name="minus-thick"
          color="#656B79"
          size={moderateScale(16)}
        />
      </TouchableOpacity>
      <TextInput style={styles.input} {...props} />
      <TouchableOpacity style={styles.buttonContainer} onPress={onIncrease}>
        <MaterialCommunityIcons
          name="plus-thick"
          color="#FFB703"
          size={moderateScale(16)}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    height: '36@vs',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    width: '30%',
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#000000',
    fontSize: '14@ms',
  },
  buttonContainer: {
    width: '30@ms',
    height: '30@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DBE1EB',
    borderWidth: 1,
    borderRadius: '8@ms',
  },
})
