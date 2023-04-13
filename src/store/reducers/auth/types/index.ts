import { GenerateOTPResponseData, LoginResponseData } from 'constants/api'

export interface AuthState {
  isSaveLoggedIn: boolean
  isSubmitting: boolean
  isLoggingOut: boolean
  isSubmittingRegister: boolean
  isGeneratingOTP: boolean
  isVerifyingOTP: boolean
  userInfo: Partial<LoginResponseData>
  otpData: Partial<GenerateOTPResponseData>
}

export * from './actions'
