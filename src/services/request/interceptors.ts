import axios from 'axios'
import { lastValueFrom } from 'rxjs'

import { AUTH_API, RefreshTokenResponse } from 'constants/api'

import { store } from 'store'
import { authActions } from 'store/reducers/auth'

import { appendBearerToken } from './headers'
import { request } from './request'

axios.interceptors.response.use(
  response => response,
  async error => {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.config.url?.includes(AUTH_API.LOGIN)
      ) {
        return lastValueFrom(
          request<RefreshTokenResponse>({
            method: 'GET',
            url: AUTH_API.REFRESH,
            headers: {
              ...appendBearerToken(
                store.getState().auth.userInfo.refreshToken ?? '',
              ),
            },
          }),
        ).then(async response => {
          const { data } = response.data

          store.dispatch(authActions.updateToken({ response: response.data }))

          return await lastValueFrom(
            request({
              ...error.config,
              headers: {
                ...appendBearerToken(data?.accessToken ?? ''),
              },
            }),
          )
        })
      }
    }
    return Promise.reject(error)
  },
)
