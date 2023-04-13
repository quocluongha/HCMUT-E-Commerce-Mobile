import { navigator } from 'navigation/languages/en'

import { address } from 'screens/Address/languages/en'
import { cart } from 'screens/Cart/languages/en'
import { checkout } from 'screens/Checkout/languages/en'
import { home } from 'screens/Home/languages/en'
import { login } from 'screens/Login/languages/en'
import { otp } from 'screens/OTPScreen/languages/en'
import { productDetail } from 'screens/ProductDetail/languages/en'
import { registration } from 'screens/Registration/languages/en'
import { splash } from 'screens/Splash/languages/en'

import { error } from 'services/request/languages/errors/en'

export const en = {
  codePush: {
    descrption: 'Descrption:',
    title: 'Update available',
    update: 'Update',
    cancel: 'Cancel',
    mandatoryUpdateMessage: 'An update is available that must be installed.',
    optionalUpdateMessage: 'An update is available',
    checkForUpdate: 'Checking for update...',
    downloadingUpdate: 'Downloading update',
    installingUpdate: 'Installing update',
  },
  common: {
    appTitle: 'Good Fresh',
    systemNotify: 'System Notification',
    deliveryTo: 'Delivery to:',
    change: 'Change',
    yes: 'Yes',
    no: 'No',
  },
  splash,
  login,
  home,
  navigator,
  productDetail,
  cart,
  checkout,
  address,
  otp,
  registration,
  error,
}
