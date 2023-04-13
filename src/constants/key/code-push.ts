import { Platform } from 'react-native'
import { Config } from 'react-native-config'

const { ANDROID_CODEPUSH_KEY, IOS_CODEPUSH_KEY } = Config

export const CODEPUSH_DEPLOYMENT_ENV = Platform.select({
  ios: IOS_CODEPUSH_KEY,
  android: ANDROID_CODEPUSH_KEY,
  default: ANDROID_CODEPUSH_KEY,
})
