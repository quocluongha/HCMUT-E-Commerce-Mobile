import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer } from 'redux-persist'

import { addressReducer } from './address'
import { persistAuthReducer } from './auth'
import { productReducer } from './product'
import { profileReducer } from './profile'
import { rootReducer } from './root'

const appReducer = combineReducers({
  root: rootReducer,
  auth: persistAuthReducer,
  profile: profileReducer,
  product: productReducer,
  address: addressReducer,
})

//* Config which reducer to persist
const persistConfig: PersistConfig<ReturnType<typeof appReducer>> = {
  key: 'AppPersist',
  storage: AsyncStorage,
  whitelist: ['auth', 'root'],
  blacklist: [],
}

export const persistAppReducer = persistReducer(persistConfig, appReducer)
