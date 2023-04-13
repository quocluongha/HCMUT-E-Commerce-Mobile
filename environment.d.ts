declare module 'react-native-config' {
  export interface NativeConfig {
    //* Domain
    RAILWAY_DOMAIN: string
    GCLOUD_DOMAIN: string
    GHN: string

    //* Codepush
    IOS_CODEPUSH_KEY: string
    ANDROID_CODEPUSH_KEY: string
  }

  export const Config: NativeConfig
  export default Config
}
