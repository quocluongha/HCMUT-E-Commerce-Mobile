import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScaledSheet } from 'react-native-size-matters'

import { SafeAreaView } from 'components/organisms'

import { SearchScreenProps } from 'navigation/types'

import { Header } from './components'

export interface SearchProps extends SearchScreenProps {}

export const Search: React.FC<SearchProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: props => <Header {...props} />,
    })
  }, [navigation])

  return (
    <SafeAreaView edges={['bottom']}>
      <KeyboardAwareScrollView></KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = ScaledSheet.create({
  container: {},
})
