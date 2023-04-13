import { initReactI18next } from 'react-i18next'

import i18next from 'i18next'

import { en, vi } from './languages'

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: { en, vi },
  lng: 'en',
  fallbackLng: ['en', 'vi'],
})

export default i18next

export const translate = i18next.t

export const getLanguage = () => i18next.resolvedLanguage
