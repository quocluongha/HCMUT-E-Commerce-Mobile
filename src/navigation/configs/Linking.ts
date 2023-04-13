import { LinkingOptions, PathConfigMap } from '@react-navigation/native'

import { MainStackParams } from 'navigator/types'

const config: {
  initialRouteName?: keyof MainStackParams
  screens: PathConfigMap<MainStackParams>
} = {
  initialRouteName: 'MainTab',
  screens: {
    MainTab: {
      screens: {
        Cart: 'cart',
      },
    },
  },
}

export const linking: LinkingOptions<MainStackParams> = {
  prefixes: ['greenmart://'],
  config,
}
