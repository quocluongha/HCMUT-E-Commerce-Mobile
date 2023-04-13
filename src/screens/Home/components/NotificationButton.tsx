import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {}

export const NotificationButton: React.FC<Props> = (props: Props) => {
  //* For notification module
  const isNewNotification = false

  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <MaterialIcons
          name="notifications-none"
          size={moderateScale(28)}
          color="#656B79"
        />
        {isNewNotification && <View style={styles.badge}></View>}
      </View>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#ECEFF6',
    width: '40@vs',
    height: '40@vs',
    borderRadius: '16@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: '10@ms',
    height: '10@ms',
    borderRadius: moderateScale(10) / 2,
    backgroundColor: '#EB7532',
    position: 'absolute',
    right: '2@ms',
    top: '2@ms',
  },
})
