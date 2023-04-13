import { configureStore } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import { Epic, createEpicMiddleware } from 'redux-observable'
import { persistStore } from 'redux-persist'

import Reactotron from 'services/reactotron'

import { appEpic } from './epics'
import { persistAppReducer } from './reducers'

const epicMiddleware = createEpicMiddleware()

const middleware = __DEV__ ? [epicMiddleware, logger] : [epicMiddleware]

const store = configureStore({
  reducer: persistAppReducer,
  middleware: middleware,
  ...(Reactotron?.createEnhancer
    ? { enhancers: [Reactotron.createEnhancer()] }
    : undefined),
})

epicMiddleware.run(appEpic as Epic)

const persistor = persistStore(store)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store, persistor }
