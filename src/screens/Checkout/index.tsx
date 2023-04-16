import { CommonActions, Route } from '@react-navigation/native'
import React, { useRef } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import WebView, { WebViewMessageEvent } from 'react-native-webview'

import { SafeAreaView } from 'components/organisms'

import { useAppSelector } from 'hooks'

import { CheckoutProps } from 'navigation/types'

interface Props extends CheckoutProps {}

export const Checkout: React.FC<Props> = ({ navigation }) => {
  const webViewRef = useRef<WebView | null>(null)

  const listCartProduct = useAppSelector(state => state.product.listCartProduct)

  const oneMessageHandler = (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent

    const items = listCartProduct.map(item => {
      return {
        name: item.id,
        quantity: item.quantity.toString(),
        unit_amount: {
          currency_code: 'USD',
          value: item.pricePerUnit.toString(),
        },
      }
    })

    const amount = {
      currency_code: 'USD',
      value: listCartProduct
        .reduce((prev, curr) => prev + curr.pricePerUnit * curr.quantity, 0)
        .toString(),
      breakdown: {
        item_total: {
          currency_code: 'USD',
          value: listCartProduct
            .reduce((prev, curr) => prev + curr.pricePerUnit * curr.quantity, 0)
            .toString(),
        },
      },
    }

    const purchase_units = [
      {
        items,
        amount,
      },
    ]

    console.log(purchase_units)

    try {
      const { type, payload } = JSON.parse(data)

      switch (type) {
        case 'PAYPAL_GATEWAY_LOADED':
          webViewRef.current?.postMessage(
            JSON.stringify({
              type: 'PAYPAL_CREATE_ORDER',
              payload: { purchase_units },
            }),
          )
          break
        case 'PAYPAL_ORDER_APPROVED':
          navigation.dispatch(state => {
            const updatedRoutes: Omit<Route<string>, 'key'>[] = [
              ...state.routes,
            ]

            updatedRoutes.splice(-1, 1, {
              name: 'CheckoutComplete',
              params: payload,
            })

            return CommonActions.reset({
              ...state,
              routes: updatedRoutes,
            })
          })
      }
    } catch {}
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <WebView
        ref={ref => (webViewRef.current = ref)}
        source={{ uri: 'https://book-store-b1976.firebaseapp.com/' }}
        cacheMode={'LOAD_NO_CACHE'}
        bounces={false}
        // onMessage={event => {
        //   const { data } = event.nativeEvent

        //   try {
        //     const { type, payload } = JSON.parse(data)

        //     switch (type) {
        //       case 'PAYPAL_GATEWAY_LOADED':
        //         webViewRef.current?.postMessage(
        //           JSON.stringify({
        //             type: 'PAYPAL_CREATE_ORDER',
        //             payload: {
        //               purchase_units: [
        //                 {
        //                   amount: {
        //                     currency_code: 'USD',
        //                     value: '2',
        //                   },
        //                 },
        //               ],
        //             },
        //           }),
        //         )
        //         break
        //       case 'PAYPAL_ORDER_APPROVED':
        //         navigation.dispatch(state => {
        //           const updatedRoutes: Omit<Route<string>, 'key'>[] = [
        //             ...state.routes,
        //           ]

        //           updatedRoutes.splice(-1, 1, {
        //             name: 'CheckoutComplete',
        //             params: payload,
        //           })

        //           return CommonActions.reset({
        //             ...state,
        //             routes: updatedRoutes,
        //           })
        //         })
        //     }
        //   } catch {}
        // }}
        onMessage={oneMessageHandler}
      />
    </SafeAreaView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
})
