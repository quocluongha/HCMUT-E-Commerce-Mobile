import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

import { CATEGORIES } from '../constants'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  onSelectItem?: (item: any) => void
}

export const Category: React.FC<Props> = ({ containerStyle, onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState(CATEGORIES[0])
  const { t } = useTranslation('home')

  const renderItem: ListRenderItem<any> = ({ item }) => {
    const checkSelected = () => {
      return selectedItem?.id === item?.id
    }

    const selectItemHandler = () => {
      setSelectedItem(item)

      if (onSelectItem) {
        onSelectItem(item)
      }
    }

    return (
      <TouchableOpacity
        style={[
          styles.item,
          { backgroundColor: checkSelected() ? '#FFB703' : '#E9ECEF' },
        ]}
        onPress={selectItemHandler}
      >
        <Text
          style={[
            styles.itemText,
            { color: checkSelected() ? '#FFFFFF' : '#656B79' },
          ]}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={[styles.container, containerStyle]}
    >
      <Text style={styles.title}>{t('category')}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        style={{ marginTop: verticalScale(10) }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </Animated.View>
  )
}

const styles = ScaledSheet.create({
  container: {
    paddingBottom: '12@vs',
  },
  title: {
    fontFamily: Roboto.regular,
    color: '#000000',
    fontWeight: '700',
    fontSize: '22@ms',
    marginLeft: '12@s',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '60@s',
    height: '24@vs',
    borderRadius: '16@ms',
  },
  itemText: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '12@ms',
    marginHorizontal: '6@s',
  },
  itemSeparator: {
    width: '18@s',
  },
})
