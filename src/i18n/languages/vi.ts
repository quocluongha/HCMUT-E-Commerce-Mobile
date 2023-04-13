import { navigator } from 'navigation/languages/vi'

import { address } from 'screens/Address/languages/vi'
import { cart } from 'screens/Cart/languages/vi'
import { checkout } from 'screens/Checkout/languages/vi'
import { home } from 'screens/Home/languages/vi'
import { login } from 'screens/Login/languages/vi'
import { otp } from 'screens/OTPScreen/languages/vi'
import { productDetail } from 'screens/ProductDetail/languages/vi'
import { registration } from 'screens/Registration/languages/vi'
import { splash } from 'screens/Splash/languages/vi'

import { error } from 'services/request/languages/errors/vi'

export const vi = {
  codePush: {
    descrption: 'Nội dung: ',
    title: 'Đã có bản cập nhật mới',
    update: 'Cập nhật',
    cancel: 'Hủy',
    mandatoryUpdateMessage: 'Đã có bản cập nhật mới và bắt buộc phải cập nhật.',
    optionalUpdateMessage: 'Đã có bản cập nhập mới.',
    checkForUpdate: 'Kiểm tra phiên bản...',
    downloadingUpdate: 'Đang tải bản cập nhật',
    installingUpdate: 'Đang cài đặt bản cập nhật',
  },
  common: {
    appTitle: 'Good Fresh',
    systemNotify: 'Thông báo hệ thống',
    deliveryTo: 'Giao đến:',
    change: 'Thay đổi',
    yes: 'Chấp nhận',
    no: 'Từ chối',
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
