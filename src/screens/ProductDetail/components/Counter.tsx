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
          size={moderateScale(20)}
        />
      </TouchableOpacity>
      <TextInput style={styles.input} {...props} />
      <TouchableOpacity style={styles.buttonContainer} onPress={onIncrease}>
        <MaterialCommunityIcons
          name="plus-thick"
          color="#FFB703"
          size={moderateScale(20)}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '160@s',
    height: '48@vs',
    backgroundColor: '#DBE1EB',
    borderRadius: '12@ms',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s',
  },
  input: {
    textAlign: 'center',
    width: '60%',
    fontFamily: Roboto.regular,
    fontWeight: '700',
    color: '#000000',
    fontSize: '20@ms',
  },
  buttonContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})
