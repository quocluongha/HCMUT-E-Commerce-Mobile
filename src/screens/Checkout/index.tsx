import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScaledSheet } from 'react-native-size-matters'

import { SafeAreaView } from 'components/organisms'

import { CheckoutProps } from 'navigation/types'

import { log } from 'utils'

interface Props extends CheckoutProps {}

export const Checkout: React.FC<Props> = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      return () => {
        log('CLEANING_UP')
      }
    }, []),
  )

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}></SafeAreaView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
