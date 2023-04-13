import { Formik } from 'formik'
import { isEqual } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ScaledSheet } from 'react-native-size-matters'
import { ObjectSchema, object, string } from 'yup'

import { RegistrationProps } from 'navigation/types'

import { RegistrationScreenComponent } from './RegistrationScreenComponent'
import { FormValues } from './types'

export interface RegistrationScreenProps extends RegistrationProps {}

const initialValues: FormValues = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = props => {
  const { t } = useTranslation('registration')

  const validationSchema: ObjectSchema<FormValues> = useMemo(
    () =>
      object({
        email: string().required(t('emptyEmail')).email(t('wrongEmailFormat')),
        name: string().required(t('emptyName')),
        password: string().required(t('emptyPassword')),
        confirmPassword: string()
          .required(t('emptyConfirmPassword'))
          .when('password', ([password]: string[], schema) => {
            return schema.test({
              test: value => isEqual(value, password),
              message: t('notMatchPassword'),
            })
          }),
        phoneNumber: string()
          .required(t('emptyPhoneNumber'))
          .matches(/^\d+$/, t('wrongNumberFormat'))
          .min(4, t('phoneNumberDigitsError'))
          .max(12, t('phoneNumberDigitsError')),
      }),
    [],
  )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={validationSchema}
    >
      {props => {
        return <RegistrationScreenComponent {...props} />
      }}
    </Formik>
  )
}

const styles = ScaledSheet.create({
  container: {},
})
