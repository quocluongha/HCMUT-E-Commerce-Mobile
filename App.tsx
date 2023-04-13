import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { CStatusBar } from 'components/atoms'
import { MessageModal } from 'components/organisms'

import i18n from 'i18n'

import { AppNavigator } from 'navigation'

import AppToast from 'services/toast'

import { persistor, store } from 'store'

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <CStatusBar />
              <AppNavigator />
              <MessageModal />
              <AppToast />
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </SafeAreaProvider>
  )
}

export default App
