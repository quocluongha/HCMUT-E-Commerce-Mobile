import React, { useLayoutEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

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

  return null
}

const styles = ScaledSheet.create({
  container: {},
})
