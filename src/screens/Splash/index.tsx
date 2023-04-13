import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import CodePush from 'react-native-code-push'
import { MaterialIndicator } from 'react-native-indicators'
import { moderateScale, scale } from 'react-native-size-matters'

import { FocusAwareStatusBar } from 'components/molecules'

import { Roboto } from 'constants/fonts'

import { useAppSelector } from 'hooks'

import { SplashProps } from 'navigation/types'

import { codePushOptions } from 'services/code-push'

import { log } from 'utils'

interface Props extends SplashProps {}

export const Splash: React.FC<Props> = ({ navigation }) => {
  const [codePushStatus, setCodePushStatus] = useState<CodePush.SyncStatus>()
  const { t } = useTranslation('codePush')
  const isLoggedIn = useAppSelector(
    state => state.auth.isSaveLoggedIn && state.auth.userInfo.accessToken,
  )

  const navigateToApp = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: isLoggedIn ? 'MainTab' : 'Login' }],
    })

  const codePushSync = () => {
    CodePush.sync(
      codePushOptions,
      status => {
        log('CODE_PUSH_STATUS', status)
        setCodePushStatus(status)

        switch (status) {
          case CodePush.SyncStatus.UP_TO_DATE:
            navigateToApp()
            break
          case CodePush.SyncStatus.UPDATE_IGNORED:
            navigateToApp()
            break
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            navigateToApp()
            break
        }
      },
      progress => {
        if (__DEV__) {
          console.log('CODEPUSH_SYNC_STATUS', progress)
        }
      },
    )
  }

  const renderStatus = () => {
    switch (codePushStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        return t('checkForUpdate')
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        return t('downloadingUpdate')
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        return t('installingUpdate')
      default:
        return ''
    }
  }

  useEffect(() => {
    codePushSync()
  }, [])

  return (
    <React.Fragment>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        backgroundColor="#023047"
      />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIndicator
            color="#FFFFFF"
            size={moderateScale(16)}
            style={{ flex: 0, marginRight: scale(4) }}
          />
          <Text style={styles.status}>{renderStatus()}</Text>
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontFamily: Roboto.regular,
    color: '#FFFFFF',
    fontSize: moderateScale(14),
  },
})
