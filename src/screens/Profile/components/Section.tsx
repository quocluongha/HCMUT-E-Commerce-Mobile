import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { Roboto } from 'constants/fonts'

export interface SectionProps {
  data: any
}

export const Section: React.FC<SectionProps> = ({ data }) => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(12),
            flex: 1,
          }}
        >
          {item.icon}
          <Text
            style={{
              fontFamily: Roboto.regular,
              fontSize: moderateScale(14),
              color: '#000000',
            }}
          >
            {item.name}
          </Text>
        </View>
        <Entypo
          name="chevron-right"
          color={'#ADB5BD'}
          size={moderateScale(20)}
        />
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={renderItem}
      style={{ backgroundColor: '#F8F9FA' }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: '#E9ECEF',
            width: '95%',
            alignSelf: 'center',
          }}
        />
      )}
    />
  )
}

const styles = ScaledSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    paddingVertical: '12@vs',
    paddingHorizontal: '12@s',
  },
})
