import Clipboard from '@react-native-clipboard/clipboard'
import { format } from 'date-fns'
import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters'
import Toast from 'react-native-toast-message'

import { Copy } from 'components/svgs'

import { Field } from './Field'

export interface OrderSummaryProps {
  date: any
  id: string
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ date, id }) => {
  const renderId = (style: StyleProp<TextStyle>) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: scale(16),
        }}
      >
        <Text style={[style, { flex: 1 }]}>{id}</Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(id)

            Toast.show({ props: { message: 'ID has been copied' } })
          }}
        >
          <Copy
            width={moderateScale(26)}
            height={moderateScale(26)}
            color={'#FFB703'}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Field
          title="Date"
          content={format(new Date(date), 'EEE MMM dd, yyyy')}
        />
        <Field
          title="Time"
          content={format(new Date(date), 'kk:mm z')}
          titleStyle={{ textAlign: 'right' }}
          contentStyle={{ textAlign: 'right' }}
        />
      </View>
      <Field title="Order ID" renderCustomContent={renderId} />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: '8@ms',
    padding: '16@ms',
    rowGap: '12@vs',
    width: '85%',
  },
})
