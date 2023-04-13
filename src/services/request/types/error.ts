import { AxiosError } from 'axios'

export type ErrorMessage = {
  code?: string
  detail?: string
}

export type ErrorResponseData = {
  code?: number
  message?: Array<ErrorMessage>
}

export type ServerError = {
  error?: ErrorResponseData
}

export type ErrorResponse = AxiosError<ServerError>
