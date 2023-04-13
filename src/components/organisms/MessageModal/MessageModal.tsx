import { debounce } from 'lodash'
import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  FlatList,
  GestureResponderEvent,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'

import { DEVICE_HEIGHT } from 'constants/dimensions'
import { Roboto } from 'constants/fonts'

interface Props {}

type MessageModalConfig = {
  isSingleButton?: boolean
  title?: string
  content?: string | string[]
  btnText?: string
  leftBtnText?: string
  rightBtnText?: string
  onPress?: (event?: GestureResponderEvent) => void
  onPressLeftBtn?: (event?: GestureResponderEvent) => void
  onPressRightBtn?: (event?: GestureResponderEvent) => void
}

type MessageModalHandler = {
  show: (config?: MessageModalConfig) => void
  hide: () => void
}

const MessageModalComponent = forwardRef<MessageModalHandler, Props>(
  (props, ref) => {
    const { t } = useTranslation('common')

    const initialState: MessageModalConfig = useMemo(
      () => ({
        isSingleButton: true,
        title: t('systemNotify'),
        content: 'Content.',
        btnText: 'OK',
        leftBtnText: t('no'),
        rightBtnText: t('yes'),
        onPressLeftBtn: () => {},
        onPressRightBtn: () => {},
        onPress: () => {},
      }),
      [],
    )

    const [visible, setVisible] = useState(false)
    const [config, setConfig] = useState<MessageModalConfig>(initialState)

    const toggleModal = useCallback(
      debounce(isVisible => setVisible(isVisible), 300),
      [],
    )

    const show = (config?: MessageModalConfig) => {
      setConfig({ ...initialState, ...config })
      toggleModal(true)
    }

    const hide = () => toggleModal(false)

    const btnPressHandler = () => {
      config?.onPress && config.onPress()
      hide()
    }

    const leftBtnPressHandler = () => {
      config?.onPressLeftBtn && config.onPressLeftBtn()
      hide()
    }

    const rightBtnPressHandler = () => {
      config?.onPressRightBtn && config.onPressRightBtn()
      hide()
    }

    const renderButton = () =>
      config.isSingleButton ? (
        <TouchableOpacity style={styles.singleButton} onPress={btnPressHandler}>
          <Text style={[styles.buttonText]} numberOfLines={2}>
            {config.btnText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#656B79' }]}
            onPress={leftBtnPressHandler}
          >
            <Text style={[styles.buttonText]} numberOfLines={2}>
              {config.leftBtnText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#157E4E' }]}
            onPress={rightBtnPressHandler}
          >
            <Text style={[styles.buttonText]} numberOfLines={2}>
              {config.rightBtnText}
            </Text>
          </TouchableOpacity>
        </View>
      )

    const renderMessageItem: ListRenderItem<string> = ({ item }) => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Entypo
            name="dot-single"
            size={moderateScale(16)}
            color={'#157E4E'}
          />
          <Text style={[styles.content, { flex: 1 }]}>{item}</Text>
        </View>
      )
    }

    const renderContent = () => {
      if (typeof config.content === 'string') {
        return (
          <View style={styles.contentContainer}>
            <Text style={[styles.content, { textAlign: 'center' }]}>
              {config.content}
            </Text>
          </View>
        )
      }

      return (
        <FlatList
          style={styles.list}
          centerContent
          bounces={false}
          contentContainerStyle={styles.listContentContainer}
          data={config.content}
          renderItem={renderMessageItem}
        />
      )
    }

    useImperativeHandle(ref, () => ({
      show: show,
      hide: hide,
    }))

    return (
      <Modal
        {...props}
        isVisible={visible}
        style={{ margin: 0, alignItems: 'center' }}
        coverScreen
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        hideModalContentWhileAnimating
        onModalHide={() => setConfig(initialState)}
        statusBarTranslucent
        deviceHeight={DEVICE_HEIGHT}
        useNativeDriverForBackdrop
      >
        <View style={styles.container}>
          <Text style={styles.title}>{config.title}</Text>
          {renderContent()}
          {renderButton()}
        </View>
      </Modal>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: '12@ms',
    rowGap: '8@vs',
    maxHeight: '50%',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Roboto.regular,
    color: '#157E4E',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: '16@ms',
    marginTop: '8@vs',
  },
  contentContainer: {
    minHeight: '50@vs',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '12@s',
  },
  list: {
    minHeight: '50@vs',
  },
  listContentContainer: {
    paddingHorizontal: '12@s',
    rowGap: '8@vs',
  },
  content: {
    fontFamily: Roboto.regular,
    color: '#000000',
    fontSize: '14@ms',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: '12@s',
    marginBottom: '8@vs',
  },
  button: {
    minWidth: '35%',
    maxWidth: '45%',
    height: '36@vs',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10@ms',
  },
  singleButton: {
    minWidth: '35%',
    height: '36@vs',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10@ms',
    backgroundColor: '#157E4E',
    marginBottom: '8@vs',
  },
  buttonText: {
    fontFamily: Roboto.regular,
    fontWeight: '700',
    marginHorizontal: '12@ms',
    color: '#FFFFFF',
    fontSize: '13@ms',
  },
})

export const MessageModalRef =
  createRef<React.ElementRef<typeof MessageModalComponent>>()

export const MessageModal: React.FC<Props> = props => (
  <MessageModalComponent {...props} ref={MessageModalRef} />
)

export const MessageModalController = {
  show: (config?: MessageModalConfig) => MessageModalRef.current?.show(config),
  hide: () => MessageModalRef.current?.hide(),
}
