import React from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { StyleProp } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { Roboto } from 'constants/fonts'

export interface FieldProps {
  title?: string
  content?: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<TextStyle>
  renderCustomTitle?: (style: StyleProp<TextStyle>) => React.ReactNode
  renderCustomContent?: (style: StyleProp<TextStyle>) => React.ReactNode
}

export const Field: React.FC<FieldProps> = ({
  title,
  content,
  titleStyle,
  contentStyle,
  containerStyle,
  renderCustomTitle,
  renderCustomContent,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {renderCustomTitle ? (
        renderCustomTitle(styles.title)
      ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}
      {renderCustomContent ? (
        renderCustomContent(styles.content)
      ) : (
        <Text style={[styles.content, contentStyle]}>{content}</Text>
      )}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {},
  title: {
    fontFamily: Roboto.medium,
    fontSize: '12@ms',
    color: '#ADB5BD',
  },
  content: {
    fontFamily: Roboto.medium,
    fontSize: '14@ms',
    color: '#212529',
  },
})
