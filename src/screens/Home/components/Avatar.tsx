import React from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import FastImage, {
  FastImageProps,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

interface Props extends FastImageProps {
  uri?: string
  imageContainerStyle?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  fastImageStyle?: StyleProp<FastImageStyle>
  ImageComponentProps?: ImageProps
  onPress?: (event: GestureResponderEvent) => void
}

export const Avatar: React.FC<Props> = props => {
  const {
    uri,
    imageContainerStyle,
    ImageComponentProps,
    imageStyle,
    fastImageStyle,
    onPress,
  } = props

  return (
    <TouchableOpacity style={imageContainerStyle} onPress={onPress}>
      {uri ? (
        <FastImage
          {...props}
          source={{ uri: uri }}
          resizeMode="cover"
          style={[styles.image, fastImageStyle]}
        />
      ) : (
        <Image
          source={require('assets/images/login-background.png')}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
          {...ImageComponentProps}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  image: {
    width: '32@ms',
    height: '32@ms',
    borderRadius: moderateScale(32) / 2,
  },
})
