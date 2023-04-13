import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Roboto } from 'constants/fonts'

import { useAppSelector } from 'hooks'

interface Props extends BottomTabBarProps {
  tabBarHeight: number
}

export const CBottomTab: React.FC<Props> = props => {
  const { t } = useTranslation('navigator')
  const isInternetReachable = useAppSelector(
    state => state.root.isInternetReachable,
  )

  return (
    <React.Fragment>
      {!isInternetReachable && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={[
            styles.internetInfoContainer,
            { bottom: 0, height: props.tabBarHeight + verticalScale(22) },
          ]}
        >
          <MaterialIcons
            name="wifi-off"
            size={moderateScale(20)}
            color="red"
            style={{ marginRight: scale(8) }}
          />
          <Text numberOfLines={1} style={styles.offlineText}>
            {t('offline')}
          </Text>
        </Animated.View>
      )}
      <BottomTabBar {...props} />
    </React.Fragment>
  )
}

const styles = ScaledSheet.create({
  internetInfoContainer: {
    zIndex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F8DA70',
    width: '100%',
    position: 'absolute',
    paddingTop: '2@vs',
    borderTopLeftRadius: '18@ms',
    borderTopRightRadius: '18@ms',
  },
  offlineText: {
    color: '#000000',
    maxWidth: '80%',
    fontFamily: Roboto.regular,
    fontSize: '13@ms',
  },
})

export default CBottomTab
