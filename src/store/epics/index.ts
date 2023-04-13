import { combineEpics } from 'redux-observable'

import { authEpic } from './auth'
import { productEpic } from './product'
import { rootEpic } from './root'

export const appEpic = combineEpics(rootEpic, authEpic, productEpic)
