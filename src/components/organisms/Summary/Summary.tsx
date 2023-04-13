import React from 'react'
import {
  ListRenderItem,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Animated, { AnimateProps } from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

export interface SummaryItem {
  title?: string
  content?: string
}

export type SummaryList = SummaryItem[]

interface Props extends AnimateProps<ViewProps> {
  data?: SummaryList
  containerStyle?: StyleProp<ViewStyle>
  Header?: JSX.Element
  summary?: SummaryItem
}

export const Summary: React.FC<Props> = ({
  containerStyle,
  Header,
  data,
  summary,
  ...restProps
}) => {
  const renderItem: ListRenderItem<SummaryItem> = ({ item }) => {
    return (
      <Animated.View style={styles.itemContainer}>
        <Text style={[styles.text, { maxWidth: '35%' }]}>{item.title}</Text>
        <Text style={[styles.text, { maxWidth: '60%' }]}>{item.content}</Text>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.container, containerStyle]} {...restProps}>
      {Header}
      <Animated.FlatList
        data={data ?? []}
        renderItem={renderItem}
        style={Header ? undefined : styles.list}
        contentContainerStyle={[styles.contentContainer]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.line} />
      <Animated.View style={[styles.itemContainer, styles.summaryItem]}>
        <Text style={[styles.text, styles.summaryTitle]}>{summary?.title}</Text>
        <Text style={[styles.text, styles.summaryContent]}>
          {summary?.content}
        </Text>
      </Animated.View>
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'rgba(2, 48, 71, 0.09)',
    alignSelf: 'center',
    borderRadius: '16@ms',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(2, 48, 71, 0.31)',
    width: '90%',
    alignSelf: 'center',
    marginVertical: '12@vs',
  },
  contentContainer: {
    paddingHorizontal: '16@s',
  },
  header: {
    height: '8@vs',
    backgroundColor: 'red',
  },
  separator: {
    height: '8@vs',
  },
  text: {
    fontFamily: Roboto.regular,
    color: '#000000',
    fontSize: '13@ms',
  },
  summaryTitle: {
    maxWidth: '35%',
    fontWeight: '700',
  },
  summaryContent: {
    maxWidth: '60%',
    color: '#FB8500',
    fontWeight: '700',
    fontSize: '14@ms',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    paddingHorizontal: '16@s',
    marginBottom: '12@vs',
  },
  list: {
    marginTop: '12@vs',
  },
})
