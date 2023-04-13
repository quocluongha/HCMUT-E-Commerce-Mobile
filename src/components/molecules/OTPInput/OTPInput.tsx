import { isEmpty } from 'lodash'
import React, { ElementRef, useCallback, useRef, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

import { CInput } from 'components/atoms'

export interface OTPInputProps {
  numOfDigits?: number
  editable?: boolean
  onChange?: (values: string[]) => void
}

export const OTPInput: React.FC<OTPInputProps> = ({
  numOfDigits = 4,
  editable = true,
  onChange = () => {},
}) => {
  const inputRefs = useRef<(ElementRef<typeof CInput> | null)[]>(
    new Array(numOfDigits).fill(null),
  )
  const [inputValues, setInputValues] = useState<string[]>(
    new Array(numOfDigits).fill(''),
  )

  const updateInputValues = useCallback(
    (current: string[], value: string, index: number) => {
      const updatedValues = [...current]

      updatedValues.splice(index, 1, value)

      return updatedValues
    },
    [],
  )

  const onChangeValuesHandler = (values: string[]) => {
    onChange(values)

    return values
  }

  const renderItem: ListRenderItem<ElementRef<typeof CInput> | null> = ({
    index,
  }) => {
    const onChangeTextHandler = (text: string) => {
      if (isNaN(Number(text))) {
        return setInputValues(current => updateInputValues(current, '', index))
      }

      setInputValues(current => {
        const updatedValues = updateInputValues(current, text, index)

        return onChangeValuesHandler(updatedValues)
      })

      if (!isEmpty(text) && isEmpty(inputValues[index + 1])) {
        inputRefs.current[index + 1]?.focus()
      }
    }

    const onKeyPressHandler = ({
      nativeEvent,
    }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const { key } = nativeEvent

      if (key === 'Backspace' && isEmpty(inputValues[index])) {
        inputRefs.current[index - 1]?.focus()

        setInputValues(current => {
          const updatedValues = updateInputValues(current, '', index - 1)

          return onChangeValuesHandler(updatedValues)
        })
      }
    }

    return (
      <CInput
        value={inputValues[index]}
        containerStyle={styles.inputContainer}
        style={[styles.inputContainer, { fontSize: moderateScale(16) }]}
        textAlign="center"
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={onChangeTextHandler}
        onKeyPress={onKeyPressHandler}
        editable={editable}
        ref={ref => {
          inputRefs.current.splice(index, 1, ref)
        }}
      />
    )
  }

  return (
    <FlatList
      data={inputRefs.current}
      renderItem={renderItem}
      horizontal
      bounces={false}
      contentContainerStyle={styles.container}
      extraData={editable}
    />
  )
}

const styles = ScaledSheet.create({
  container: {
    columnGap: '12@s',
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    width: '50@s',
    height: '50@s',
  },
})
