import { GenerateOTPResponseData, LoginResponseData } from 'constants/api'

import { AuthState } from './types'

export const initialUserInfo = {
  __v: 1,
  _id: '',
  address: {},
  createdAt: '',
  email: '',
  isVerifiedMail: false,
  phoneNumber: '',
  role: '',
  updatedAt: '',
  accessToken: '',
  refreshToken: '',
} as const satisfies LoginResponseData

export const initialOTPData = {
  email: '',
  expiredAt: '',
  otp: '',
} as const satisfies GenerateOTPResponseData

export const initialState: AuthState = {
  isSaveLoggedIn: true,
  isSubmitting: false,
  isLoggingOut: false,
  isSubmittingRegister: false,
  isGeneratingOTP: false,
  isVerifyingOTP: false,
  userInfo: initialUserInfo,
  otpData: initialOTPData,
}
