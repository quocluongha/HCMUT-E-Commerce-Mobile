import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron, { networking } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export default Reactotron?.setAsyncStorageHandler
  ? Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({ name: 'Green Mart' })
      .useReactNative()
      .use(reactotronRedux())
      .use(networking())
      .connect()
  : undefined
