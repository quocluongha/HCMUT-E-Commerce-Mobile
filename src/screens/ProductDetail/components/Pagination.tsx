import React from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { ScaledSheet } from 'react-native-size-matters'

import { PaginationItem } from '.'

interface Props {
  activeIndex: number
  data: any[]
  carouselRef?: React.ElementRef<typeof Carousel>
}

export const Pagination: React.FC<Props> = ({
  data,
  carouselRef,
  activeIndex,
}) => {
  const renderItem: ListRenderItem<any> = ({ index }) => {
    const snapHandler = () => {
      carouselRef?.scrollTo({ index, animated: true })
    }

    return (
      <PaginationItem isActive={activeIndex === index} onPress={snapHandler} />
    )
  }

  return (
    <FlatList
      style={styles.list}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[data]}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = ScaledSheet.create({
  list: {
    marginTop: '10@vs',
  },
  separator: {
    width: '10@s',
  },
})
