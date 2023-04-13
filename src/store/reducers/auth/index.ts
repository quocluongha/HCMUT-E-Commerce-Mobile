import AsyncStorage from '@react-native-async-storage/async-storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PersistConfig } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { ErrorResponse } from 'services/request'

import { initialOTPData, initialState } from './initial-state'
import {
  GenerateOTPRequest,
  GenerateOTPSuccess,
  LoginRequest,
  LoginRequestSuccess,
  RefreshTokenSuccess,
  RegistrationRequest,
  RegistrationRequestSuccess,
  VerifyOTPRequest,
} from './types'

const authSlice = createSlice({
  initialState: initialState,
  name: 'authReducer',
  reducers: {
    loginRequest(state, action: PayloadAction<LoginRequest>) {
      return {
        ...state,
        isSaveLoggedIn: action.payload.isSaveLoggedIn,
        isSubmitting: true,
      }
    },
    loginRequestSuccess(state, action: PayloadAction<LoginRequestSuccess>) {
      return {
        ...state,
        userInfo: { ...action.payload.response.data },
        isSubmitting: false,
      }
    },
    loginSuccess(state) {
      return {
        ...state,
        isSubmitting: false,
      }
    },
    loginFailed(state, action: PayloadAction<ErrorResponse>) {
      return {
        ...state,
        isSubmitting: false,
      }
    },
    logoutRequest(state) {
      return {
        ...state,
        isLoggingOut: true,
      }
    },
    logoutSuccess(state, action: PayloadAction<any>) {
      return {
        ...initialState,
        isLoggingOut: false,
      }
    },
    logoutFailed(state, action: PayloadAction<ErrorResponse>) {
      return {
        ...state,
        isLoggingOut: false,
      }
    },
    updateToken(state, action: PayloadAction<RefreshTokenSuccess>) {
      return {
        ...state,
        userInfo: { ...action.payload.response.data },
      }
    },
    registerRequest(state, action: PayloadAction<RegistrationRequest>) {
      return {
        ...state,
        isSubmittingRegister: true,
      }
    },
    registerRequestSuccess(
      state,
      action: PayloadAction<RegistrationRequestSuccess>,
    ) {
      return {
        ...state,
        isSubmittingRegister: false,
      }
    },
    registerRequestFailed(state, action: PayloadAction<ErrorResponse>) {
      return {
        ...state,
        isSubmittingRegister: false,
      }
    },
    generateOTP(state, action: PayloadAction<GenerateOTPRequest>) {
      return {
        ...state,
        isGeneratingOTP: true,
        otpData: { ...initialOTPData },
      }
    },
    generateOTPSuccess(state, action: PayloadAction<GenerateOTPSuccess>) {
      return {
        ...state,
        otpData: { ...action.payload.response.data },
        isGeneratingOTP: false,
      }
    },
    generateOTPFailed(state) {
      return { ...state, isGeneratingOTP: false }
    },
    cleanOTPData(state) {
      return {
        ...state,
        otpData: { ...initialOTPData },
      }
    },
    verifyOTP(state, action: PayloadAction<VerifyOTPRequest>) {
      return {
        ...state,
        isVerifyingOTP: true,
      }
    },
    verifyOTPSuccess(state) {
      return {
        ...state,
        isVerifyingOTP: false,
      }
    },
    verifyOTPFailed(state) {
      return {
        ...state,
        isVerifyingOTP: false,
      }
    },
  },
})

export const { actions: authActions, reducer: authReducer } = authSlice

export const authPersistConfig: PersistConfig<ReturnType<typeof authReducer>> =
  {
    key: 'AuthPersist',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['userInfo'],
  }

export const persistAuthReducer = persistReducer(authPersistConfig, authReducer)

export * from './types'

export default authSlice
