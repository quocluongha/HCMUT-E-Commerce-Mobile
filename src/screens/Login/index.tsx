import { Formik, FormikErrors, FormikHelpers } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated'
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters'

import { CInput, SubmitButton } from 'components/atoms'
import { SafeAreaView, ScreenView } from 'components/organisms'
import { Facebook, Google } from 'components/svgs'

import { Roboto } from 'constants/fonts'

import { useAppDispatch, useAppSelector } from 'hooks'

import { LoginProps } from 'navigation/types'

import { authActions } from 'store/reducers/auth'

interface Props extends LoginProps {}

interface FormValues {
  username: string
  password: string
  isSaveLoggedIn: boolean
}

export const Login: React.FC<Props> = ({ navigation }) => {
  const initialValues: FormValues = {
    username: '',
    password: '',
    isSaveLoggedIn: true,
  }
  const isSubmitting = useAppSelector(state => state.auth.isSubmitting)
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['login', 'common'])

  const goToRegistration = () => {
    navigation.navigate('Registration')
  }

  const validate = (values: FormValues): FormikErrors<FormValues> => {
    const errors: FormikErrors<FormValues> = {}

    if (!values.username) {
      errors.username = t('emptyUsername')
    }
    if (!values.password) {
      errors.password = t('emptyPassword')
    }

    return errors
  }

  const submitHandler = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const { isSaveLoggedIn, password, username } = values

    dispatch(
      authActions.loginRequest({
        isSaveLoggedIn,
        request: { email: username, password },
      }),
    )
  }

  return (
    <ScreenView>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={validate}
      >
        {({ values, touched, errors, handleSubmit, setFieldValue }) => {
          const submitHandler = () => handleSubmit()

          const onChangeUsernameHandler = (value: string) => {
            setFieldValue('username', value)
          }

          const onChangePasswordHandler = (value: string) => {
            setFieldValue('password', value)
          }

          return (
            <SafeAreaView style={styles.container}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                bounces={false}
                contentContainerStyle={styles.contentContainer}
              >
                <View>
                  <Animated.Image
                    source={require('assets/images/login-background.png')}
                    entering={FadeIn.duration(500)}
                    style={{
                      width: scale(300),
                      height: verticalScale(160),
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />

                  <Text style={styles.title}>{'Login'}</Text>
                </View>

                <View style={styles.inputContainer}>
                  <CInput
                    value={values.username}
                    onChangeText={onChangeUsernameHandler}
                    placeholder={t('phoneNumberPlaceholder')}
                    containerStyle={styles.input}
                    entering={SlideInLeft.duration(500)}
                    textContentType="username"
                    autoCorrect={false}
                    autoComplete="username"
                  />
                  {touched.username && errors.username ? (
                    <Text style={styles.error}>{errors.username}</Text>
                  ) : null}

                  <CInput
                    value={values.password}
                    onChangeText={onChangePasswordHandler}
                    placeholder={t('passwordPlaceholder')}
                    containerStyle={styles.input}
                    isPasswordInput
                    entering={SlideInRight.duration(500)}
                    textContentType="password"
                    autoCorrect={false}
                    autoComplete="password"
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}
                </View>

                <SubmitButton
                  disabled={isSubmitting}
                  onPress={submitHandler}
                  containerStyle={styles.submitBtn}
                  submitText={t('loginNow')}
                  isSubmitting={isSubmitting}
                />
                <Animated.View entering={SlideInDown.duration(500)}>
                  <Text style={styles.newToApp} onPress={goToRegistration}>
                    {"Don't have an account? "}
                  </Text>
                </Animated.View>
              </KeyboardAwareScrollView>

              <View style={{ rowGap: verticalScale(12), alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: scale(12),
                  }}
                >
                  <View
                    style={{ height: 1, flex: 1, backgroundColor: '#F8F9FA' }}
                  />
                  <Text
                    style={{
                      fontFamily: Roboto.medium,
                      color: '#F8F9FA',
                      marginHorizontal: scale(12),
                    }}
                  >
                    {'Or sign in with'}
                  </Text>
                  <View
                    style={{ height: 1, flex: 1, backgroundColor: '#F8F9FA' }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#F8F9FA',
                    height: verticalScale(40),
                    width: '80%',
                    borderRadius: moderateScale(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Google style={{ position: 'absolute', left: scale(20) }} />
                  <Text style={{ fontFamily: Roboto.medium, color: '#000000' }}>
                    {'SIGN IN WITH GOOGLE'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#3B5998',
                    height: verticalScale(40),
                    width: '80%',
                    borderRadius: moderateScale(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Facebook style={{ position: 'absolute', left: scale(20) }} />
                  <Text style={{ fontFamily: Roboto.medium, color: '#F8F9FA' }}>
                    {'SIGN IN WITH FACEBOOK'}
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )
        }}
      </Formik>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    rowGap: '24@vs',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    rowGap: '12@vs',
  },
  title: {
    fontFamily: Roboto.regular,
    fontWeight: '800',
    color: '#F8F9FA',
    fontSize: '30@ms',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: Roboto.regular,
    fontWeight: '400',
    color: '#000000',
    fontSize: '18@ms',
    textAlign: 'center',
    marginTop: '10@vs',
  },
  forgotPassword: {
    color: '#157E4E',
    fontFamily: Roboto.regular,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginRight: '40@s',
    fontSize: '13@ms',
  },
  newToApp: {
    fontFamily: Roboto.regular,
    fontSize: '14@ms',
    fontWeight: '700',
    textAlign: 'center',
    color: '#8ECAE6',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    alignSelf: 'center',
    // marginTop: '60@vs',
  },
  error: {
    fontFamily: Roboto.regular,
    fontSize: '12@ms',
    color: 'red',
    marginLeft: '40@s',
    marginTop: '4@vs',
  },
  saveLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '40@s',
  },
  remember: {
    fontFamily: Roboto.regular,
    fontSize: '13@ms',
    color: '#656B79',
    marginLeft: '3@s',
  },
  input: {
    alignSelf: 'center',
  },
  inputContainer: {
    rowGap: '10@vs',
  },
})
