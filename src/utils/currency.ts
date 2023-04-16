import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/vi'

import { getLanguage } from 'i18n'

export const getCurrency = (lang: string) => {
  switch (lang) {
    case 'vi':
      return 'VND'
    case 'en':
      return 'USD'
    default:
      return 'VND'
  }
}

export const formatCurrency = (
  input: number | string = 0,
  customCurrency?: string,
) => {
  const lang = getLanguage()
  const defaultCurrency = getCurrency(lang)

  const result = new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: customCurrency ?? defaultCurrency,
  }).format(Number(input))

  return result
}
