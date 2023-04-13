import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  ScaledSheet,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { CInput, SubmitButton } from 'components/atoms'
import { SafeAreaView, ScreenView } from 'components/organisms'

import { Roboto } from 'constants/fonts'

import { FormValues } from './types'

export interface RegistrationScreenComponentProps
  extends FormikProps<FormValues> {}

export const RegistrationScreenComponent: React.FC<
  RegistrationScreenComponentProps
> = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  touched,
  errors,
  isSubmitting,
  isValid,
  dirty,
}) => {
  const { t } = useTranslation('registration')

  return (
    <ScreenView
      statusBarProps={{ barStyle: 'light-content', backgroundColor: '#000' }}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainerStyle}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.field, { marginTop: verticalScale(12) }]}>
            <CInput
              containerStyle={styles.inputContainer}
              placeholder={t('email')}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              icon={
                <Feather
                  name="mail"
                  color={'#656B79'}
                  size={moderateScale(26)}
                />
              }
            />
            {touched.email && errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <CInput
              containerStyle={styles.inputContainer}
              placeholder={t('name')}
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              autoComplete="name"
              textContentType="name"
              icon={
                <Ionicons
                  name="person-sharp"
                  color={'#656B79'}
                  size={moderateScale(26)}
                />
              }
            />
            {touched.name && errors.name ? (
              <Text style={styles.error}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <CInput
              containerStyle={styles.inputContainer}
              placeholder={t('phoneNumber')}
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              iconSource={require('assets/icons/icon-phone.png')}
            />
            {touched.phoneNumber && errors.phoneNumber ? (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <CInput
              containerStyle={styles.inputContainer}
              placeholder={t('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoComplete="password-new"
              textContentType="newPassword"
              isPasswordInput
              iconSource={require('assets/icons/icon-password.png')}
            />
            {touched.password && errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <CInput
              containerStyle={styles.inputContainer}
              placeholder={t('confirmPassword')}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              autoComplete="password-new"
              textContentType="newPassword"
              isPasswordInput
              iconSource={require('assets/icons/icon-password.png')}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}
          </View>
        </KeyboardAwareScrollView>
        <SubmitButton
          isSubmitting={isSubmitting}
          containerStyle={styles.submitBtn}
          submitText={t('createAccount')}
          disabled={!isValid || !dirty || isSubmitting}
          onPress={handleSubmit}
        />
      </SafeAreaView>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    rowGap: '20@vs',
  },
  field: {
    alignSelf: 'center',
    rowGap: '8@vs',
    width: '90%',
  },
  submitBtn: {
    alignSelf: 'center',
  },
  error: {
    fontFamily: Roboto.regular,
    fontSize: '12@ms',
    color: 'red',
  },
  inputContainer: {
    width: '100%',
  },
})
