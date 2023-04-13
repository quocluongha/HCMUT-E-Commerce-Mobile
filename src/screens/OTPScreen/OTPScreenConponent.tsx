import { differenceInSeconds } from 'date-fns'
import { FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScaledSheet } from 'react-native-size-matters'
import { v1 } from 'uuid'

import { TouchableText } from 'components/atoms'
import { CountdownCircleTimer, OTPInput } from 'components/molecules'
import { ScreenView } from 'components/organisms'

import { Roboto } from 'constants/fonts'

import { useAppDispatch, useAppSelector } from 'hooks'

import { FormValues } from 'screens/OTPScreen/types'

import { authActions } from 'store/reducers/auth'
import { selectUserId } from 'store/selectors/common'

import { NUM_OF_DIGITS } from './constants'

export interface OTPScreenComponentProps extends FormikProps<FormValues> {}

export const OTPScreenComponent: React.FC<OTPScreenComponentProps> = ({
  setFieldValue,
  submitForm,
  isValid,
  isSubmitting,
}) => {
  const { t } = useTranslation('otp')

  const [countdownKey, setCountdownKey] = useState(v1())
  const [isTimeout, setIsTimeout] = useState(false)

  const isGeneratingOTP = useAppSelector(state => state.auth.isGeneratingOTP)
  const { expiredAt } = useAppSelector(state => state.auth.otpData)
  const userID = useAppSelector(selectUserId)

  const dispatch = useAppDispatch()

  const countdownDuration = expiredAt
    ? differenceInSeconds(new Date(expiredAt), new Date())
    : 60

  const onChangeValuesHandler = (values: string[]) => {
    const OTPValues = values.join('')

    setFieldValue('otp', OTPValues)
  }

  const resendOTP = () => {
    setIsTimeout(false)

    dispatch(authActions.generateOTP({ request: { userID } }))
  }

  const OTPTimeoutHandler = () => {
    setIsTimeout(true)
  }

  const renderTimer = () => {
    return isGeneratingOTP ? (
      <Text style={[styles.text]}>{t('generatingOTP')}</Text>
    ) : (
      <CountdownCircleTimer
        key={countdownKey}
        containerStyle={styles.countdownContainer}
        colors={'#157E4E'}
        duration={countdownDuration}
        rotation="counterclockwise"
        isPlaying={!isGeneratingOTP}
        onComplete={OTPTimeoutHandler}
      />
    )
  }

  const renderBottomText = () => {
    if (isGeneratingOTP) {
      return null
    }

    return (
      <Text style={styles.text}>
        {isTimeout ? t('otpTimeout') : t('cannotReceiveOTP')}{' '}
        <TouchableText onPress={resendOTP} disabled={isGeneratingOTP}>
          {t('resendOTP')}
        </TouchableText>
      </Text>
    )
  }

  useEffect(() => {
    if (isValid) {
      Keyboard.dismiss()

      submitForm()
    }
  }, [isValid])

  useEffect(() => {
    setCountdownKey(v1())
  }, [expiredAt])

  return (
    <ScreenView>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.container}
      >
        <Text style={[styles.text]}>{t('checkEmailOTP')}</Text>
        <OTPInput
          numOfDigits={NUM_OF_DIGITS}
          onChange={onChangeValuesHandler}
          editable={!isSubmitting}
        />
        {renderTimer()}
        {renderBottomText()}
      </KeyboardAwareScrollView>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    rowGap: '24@vs',
  },
  countdownContainer: {
    alignSelf: 'center',
  },
  text: {
    fontFamily: Roboto.regular,
    fontSize: '14@ms',
    color: '#000000',
    textAlign: 'center',
  },
})
