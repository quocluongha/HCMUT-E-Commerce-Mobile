import { PayloadAction } from '@reduxjs/toolkit'
import { combineEpics } from 'redux-observable'

import { AppState } from 'store'

import { productDetailEpic } from './detail'
import { listProductEpic } from './list'

export const productEpic = combineEpics<PayloadAction, PayloadAction, AppState>(
  listProductEpic,
  productDetailEpic,
)
