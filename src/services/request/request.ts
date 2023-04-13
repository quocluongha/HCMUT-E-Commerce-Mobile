import axios, { AxiosRequestConfig } from 'axios'
import Config from 'react-native-config'
import { catchError, from, map, throwError } from 'rxjs'

import './interceptors'
import { ErrorResponse } from './types'

export const request = <T>(configs: AxiosRequestConfig) => {
  const { baseURL = Config.GCLOUD_DOMAIN, ...restConfigs } = configs

  return from(
    axios.request<T>({
      baseURL,
      ...restConfigs,
    }),
  ).pipe(
    map(response => response),
    catchError((error: ErrorResponse) => {
      return throwError(() => error)
    }),
  )
}
