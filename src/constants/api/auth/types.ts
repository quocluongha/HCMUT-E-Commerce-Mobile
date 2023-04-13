import { ServerResponse } from 'services/request'

import { Address } from '../common'

export interface CommonAuthInfo {
  _id: string
  email: string
  isVerifiedMail: boolean
  phoneNumber: string
  role: string
  address: Address
  createdAt: string
  updatedAt: string
  __v: number
}

export interface LoginResponseData extends CommonAuthInfo {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = ServerResponse<Partial<LoginResponseData>>

export type RegistrationResponse = ServerResponse<Partial<CommonAuthInfo>>

export type GenerateOTPResponseData = {
  email: string
  otp: string
  expiredAt: string
}

export type GenerateOTPResponse = ServerResponse<
  Partial<GenerateOTPResponseData>
>

export type OTPVerificationResponseData = {
  isVerifiedMail: boolean
  message: string
}

export type OTPVerificationResponse = ServerResponse<
  Partial<OTPVerificationResponseData>
>

export type RefreshTokenResponseData = {
  accessToken: string
  refreshToken: string
}

export type RefreshTokenResponse = ServerResponse<
  Partial<RefreshTokenResponseData>
>
