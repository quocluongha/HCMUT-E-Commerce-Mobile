import React, { forwardRef, useCallback, useState } from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import Animated, {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  Keyframe,
} from 'react-native-reanimated'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Roboto } from 'constants/fonts'

interface Props extends TextInputProps {
  iconSource?: ImageSourcePropType
  icon?: JSX.Element
  containerStyle?: StyleProp<ViewStyle>
  iconContainerStyle?: StyleProp<ViewStyle>
  isPasswordInput?: boolean
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe
}

const IconWrapper: React.FC<ViewProps> = ({ style, ...props }) => (
  <View pointerEvents="none" style={[styles.icon, style]} {...props} />
)

export const CInput = forwardRef<TextInput, Props>(
  (
    {
      containerStyle,
      iconContainerStyle,
      iconSource,
      icon,
      isPasswordInput,
      entering,
      style,
      ...restProps
    },
    ref,
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
      setIsShowPassword(!isShowPassword)
    }

    const renderIcon = useCallback(() => {
      if (icon) {
        return <IconWrapper style={iconContainerStyle}>{icon}</IconWrapper>
      }

      if (iconSource) {
        return (
          <IconWrapper style={iconContainerStyle}>
            <Image source={iconSource} resizeMode="contain" />
          </IconWrapper>
        )
      }

      return null
    }, [icon, iconSource])

    return (
      <Animated.View
        entering={entering}
        style={[styles.container, containerStyle]}
      >
        {renderIcon()}
        <TextInput
          ref={ref}
          placeholderTextColor="#656B79"
          style={[
            styles.input,
            iconSource || icon ? styles.haveIconInput : {},
            isPasswordInput ? styles.passwordInput : {},
            style,
          ]}
          autoCapitalize="none"
          secureTextEntry={!isShowPassword && isPasswordInput}
          {...restProps}
        />
        {isPasswordInput ? (
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={styles.toggleVisibleBtn}
          >
            <MaterialCommunityIcons
              name={isShowPassword ? 'eye-off-outline' : 'eye-outline'}
              color="#656B79"
              size={moderateScale(24)}
            />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    )
  },
)

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  icon: {
    width: '26@ms',
    height: '26@ms',
    position: 'absolute',
    zIndex: 1,
    left: '16@s',
  },
  input: {
    fontFamily: Roboto.regular,
    color: '#000000',
    flex: 1,
    height: '40@vs',
    fontSize: '14@ms',
    backgroundColor: '#ECEFF6',
    borderRadius: '16@ms',
    paddingHorizontal: '12@ms',
  },
  haveIconInput: {
    paddingLeft: '48@s',
  },
  passwordInput: {
    paddingRight: '38@ms',
  },
  toggleVisibleBtn: {
    position: 'absolute',
    right: '12@ms',
  },
})
