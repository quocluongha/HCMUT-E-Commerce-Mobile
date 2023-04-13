import React from 'react'
import { FlatList, Text, View } from 'react-native'
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters'

import {
  ClockOutline,
  HeartOutline,
  InformationOutline,
  ListOutline,
  QuestionOutline,
  SettingPersonOutline,
  StarOutline,
} from 'components/svgs'

import { Section } from './Section'

export interface SectionListProps {}

const SECTIONS = [
  {
    settings: [
      {
        name: 'Favorites',
        icon: (
          <HeartOutline
            color={'#FB8500'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
      {
        name: 'History',
        icon: (
          <ClockOutline
            color={'#6C757D'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
      {
        name: 'Ratings',
        icon: (
          <StarOutline
            color={'#FFB703'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
      {
        name: 'My Purchases',
        icon: (
          <ListOutline
            color={'#219EBC'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
    ],
  },
  {
    settings: [
      {
        name: 'Account Settings',
        icon: (
          <SettingPersonOutline
            color={'#FB8500'}
            fill="none"
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
      {
        name: 'App Information',
        icon: (
          <InformationOutline
            color={'#FFB703'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
      {
        name: 'Help Centre',
        icon: (
          <QuestionOutline
            color={'#8ECAE6'}
            width={moderateScale(20)}
            height={moderateScale(20)}
          />
        ),
      },
    ],
  },
]

export const SectionList: React.FC<SectionListProps> = props => {
  const renderItem = ({ item }: any) => {
    return <Section data={item.settings} />
  }

  return (
    <FlatList
      data={SECTIONS}
      contentContainerStyle={{
        rowGap: verticalScale(12),
        paddingTop: verticalScale(12),
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
    />
  )
}

const styles = ScaledSheet.create({
  container: {},
})
