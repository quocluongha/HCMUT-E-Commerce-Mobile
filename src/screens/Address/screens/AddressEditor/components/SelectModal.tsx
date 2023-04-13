import React, { PropsWithChildren } from 'react'
import {
  GestureResponderEvent,
  PanResponderGestureState,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal, { OnSwipeCompleteParams } from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { WINDOW_HEIGHT } from 'constants/dimensions'

interface Props {
  isVisible: boolean
  onBackdropPress?: () => void
  onSwipeComplete?: (
    params: OnSwipeCompleteParams,
    gestureState: PanResponderGestureState,
  ) => void
  onPressBar?: (event: GestureResponderEvent) => void
  onPressClose?: (event: GestureResponderEvent) => void
}

export const SelectModal: React.FC<PropsWithChildren<Props>> = props => {
  const { children, onPressBar, onPressClose } = props
  const { bottom } = useSafeAreaInsets()

  return (
    <Modal
      coverScreen
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={0}
      statusBarTranslucent
      propagateSwipe
      swipeDirection={['down']}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      swipeThreshold={WINDOW_HEIGHT * 0.9 * 0.3}
      avoidKeyboard
      {...props}
    >
      <View style={[styles.container, { paddingBottom: bottom }]}>
        <TouchableOpacity style={styles.bar} onPress={onPressBar} />
        <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
          <Ionicons
            name="ios-close"
            selectionColor={'#000000'}
            size={moderateScale(14)}
          />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  )
}

const styles = ScaledSheet.create({
  container: {
    height: '90%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '16@ms',
    borderTopRightRadius: '16@ms',
    paddingHorizontal: '12@ms',
  },
  bar: {
    height: '6@vs',
    width: '64@s',
    alignSelf: 'center',
    backgroundColor: '#C5C6C8',
    borderRadius: scale(64) / 2,
    marginVertical: '12@vs',
  },
  closeButton: {
    width: '26@ms',
    height: '26@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C5C6C8',
    borderRadius: moderateScale(30) / 2,
    position: 'absolute',
    right: '8@s',
    top: '8@vs',
    zIndex: 1,
  },
})
