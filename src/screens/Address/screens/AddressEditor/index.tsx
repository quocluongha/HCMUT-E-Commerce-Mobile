import { Formik } from 'formik'
import React, { useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated from 'react-native-reanimated'
import { ScaledSheet } from 'react-native-size-matters'

import { SafeAreaView, ScreenView } from 'components/organisms'

import { Roboto } from 'constants/fonts'

import { useAppDispatch } from 'hooks'

import { AddressEditorProps } from 'navigation/types'

import {
  Address,
  DUMMY_ADDRESS_LIST,
  addressActions,
} from 'store/reducers/address'

import {
  CInput,
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from './components'

interface Props extends AddressEditorProps {}

interface Values extends Address {}

const Separator: React.FC = () => {
  return <View style={styles.separator} />
}

export const AddressEditor: React.FC<Props> = ({ navigation, route }) => {
  const { isEditMode } = route.params
  const { t } = useTranslation('address')

  const dispatch = useAppDispatch()

  const initialValues: Values = isEditMode
    ? DUMMY_ADDRESS_LIST[0]
    : {
        name: '',
        phoneNumber: '',
        province: {},
        district: {},
        ward: {},
        address: '',
      }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? t('editAddress') : t('addAddress'),
    })
  }, [])

  useEffect(() => {
    return () => {
      dispatch(addressActions.updateSelectProvince({}))
      dispatch(addressActions.updateSelectDistrict({}))
      dispatch(addressActions.updateSelectWard({}))
    }
  }, [])

  return (
    <ScreenView>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          keyboardOpeningTime={350}
          keyboardShouldPersistTaps="handled"
        >
          <Formik initialValues={initialValues} onSubmit={() => {}}>
            {() => {
              return (
                <React.Fragment>
                  <Animated.View style={styles.subContainer}>
                    <Text style={styles.title}>{t('contact')}</Text>

                    <Separator />

                    <View style={styles.fieldContainer}>
                      <CInput containerStyle={{ alignSelf: 'center' }} />
                    </View>

                    <Separator />

                    <View style={styles.fieldContainer}>
                      <CInput containerStyle={{ alignSelf: 'center' }} />
                    </View>
                  </Animated.View>
                  <Separator />
                  <Animated.View style={styles.subContainer}>
                    <Text style={styles.title}>{t('address')}</Text>

                    <Separator />
                    <View style={styles.fieldContainer}>
                      <SelectProvince />
                    </View>

                    <Separator />

                    <View style={styles.fieldContainer}>
                      <SelectDistrict />
                    </View>

                    <Separator />

                    <View style={styles.fieldContainer}>
                      <SelectWard />
                    </View>

                    <Separator />

                    <View style={styles.fieldContainer}>
                      <CInput containerStyle={{ alignSelf: 'center' }} />
                    </View>
                  </Animated.View>
                </React.Fragment>
              )
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScreenView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  subContainer: {
    paddingHorizontal: '12@s',
  },
  title: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    fontSize: '18@ms',
    color: '#000000',
  },
  separator: {
    height: '12@vs',
    width: '100%',
  },
  fieldContainer: {},
})
