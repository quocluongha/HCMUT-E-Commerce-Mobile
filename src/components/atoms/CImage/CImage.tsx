import React from 'react'
import { Image, ImageProps } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'

interface Props {
  useFastImage?: boolean
  ImageProps?: Partial<ImageProps>
  FastImageProps?: FastImageProps
}

export const CImage: React.FC<Props> = ({
  useFastImage = false,
  ImageProps,
  FastImageProps,
}) => {
  return useFastImage ? (
    <FastImage resizeMode="cover" {...FastImageProps} />
  ) : (
    <Image
      source={require('assets/images/fallback.png')}
      resizeMode="cover"
      {...ImageProps}
    />
  )
}
