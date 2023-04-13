import React from 'react'
import { StyleSheet } from 'react-native'

import { ScreenView } from 'components/organisms'

import { ProfileProps } from 'navigation/types'

import { SectionList, TopBox } from './components'

interface Props extends ProfileProps {}

export const Settings: React.FC<Props> = props => {
  return (
    <ScreenView>
      <TopBox />
      <SectionList />
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
