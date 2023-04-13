import {
  GenerateOTPResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegistrationResponse,
} from 'constants/api/auth'

import {
  PayloadWithAPIRequest,
  PayloadWithAPIResponse,
} from 'store/reducers/types'

export type LoginRequestPayload = {
  email: string
  password: string
}

export interface LoginRequest
  extends PayloadWithAPIRequest<LoginRequestPayload> {
  isSaveLoggedIn: boolean
}

export type LoginRequestSuccess = PayloadWithAPIResponse<LoginResponse>

export type RegistrationRequestPayload = {
  username: string
  password: string
}

export type RegistrationRequest =
  PayloadWithAPIRequest<RegistrationRequestPayload>

export type RegistrationRequestSuccess =
  PayloadWithAPIResponse<RegistrationResponse>

export type GenerateOTPRequestPayload = {
  userID: string
}

export type GenerateOTPRequest =
  PayloadWithAPIRequest<GenerateOTPRequestPayload>

export type GenerateOTPSuccess = PayloadWithAPIResponse<GenerateOTPResponse>

export type VerifyOTPPayload = {
  userID: string
  otp: string
}

export type VerifyOTPRequest = PayloadWithAPIRequest<VerifyOTPPayload>

export type RefreshTokenSuccess = PayloadWithAPIResponse<RefreshTokenResponse>
