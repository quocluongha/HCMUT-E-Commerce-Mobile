import { useFocusEffect } from '@react-navigation/native'
import { Formik, FormikHelpers } from 'formik'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ObjectSchema, object, string } from 'yup'

import { useAppDispatch, useAppSelector } from 'hooks'

import { OTPScreenProps } from 'navigation/types'

import { authActions } from 'store/reducers/auth'
import { selectOTPData, selectUserId } from 'store/selectors/common'

import { OTPScreenComponent } from './OTPScreenConponent'
import { NUM_OF_DIGITS } from './constants'
import { FormValues } from './types'

export interface OTPProps extends OTPScreenProps {}

const initialValues: FormValues = {
  otp: '',
}

export const OTPScreen: React.FC<OTPProps> = ({ navigation }) => {
  const { t } = useTranslation('otp')

  const { otp: OTPValue = 'XXXX' } = useAppSelector(selectOTPData)
  const userID = useAppSelector(selectUserId)

  const dispatch = useAppDispatch()

  const validationSchema: ObjectSchema<FormValues> = useMemo(
    () =>
      object({
        otp: string()
          .required(t('insufficentDigits'))
          .max(NUM_OF_DIGITS, t('insufficentDigits'))
          .oneOf([OTPValue], t('notMatchOTP')),
      }),
    [OTPValue],
  )

  const submitHandler = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const { otp } = values
    const { setSubmitting } = formikHelpers

    dispatch(authActions.verifyOTP({ request: { userID, otp } }))

    setSubmitting(false)
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(authActions.generateOTP({ request: { userID } }))

      navigation.addListener('beforeRemove', () => {
        dispatch(authActions.cleanOTPData())
      })
    }, []),
  )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
      validateOnMount
    >
      {props => {
        return <OTPScreenComponent {...props} />
      }}
    </Formik>
  )
}
