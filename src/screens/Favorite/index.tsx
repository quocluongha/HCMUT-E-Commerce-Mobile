import React from 'react'
import { StyleSheet, View } from 'react-native'

import { FocusAwareStatusBar } from 'components/molecules'

import { FavoriteProps } from 'navigation/types'

interface Props extends FavoriteProps {}

export const Favorite: React.FC<Props> = props => {
  return (
    <React.Fragment>
      <FocusAwareStatusBar />
      <View style={styles.container}></View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
