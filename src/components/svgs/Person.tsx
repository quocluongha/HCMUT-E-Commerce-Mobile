import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const Person = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <Path
      d="M10.0001 10C12.5784 10 14.6667 7.91169 14.6667 5.33335C14.6667 2.75502 12.5784 0.666687 10.0001 0.666687C7.42175 0.666687 5.33341 2.75502 5.33341 5.33335C5.33341 7.91169 7.42175 10 10.0001 10ZM10.0001 12.3334C6.88508 12.3334 0.666748 13.8967 0.666748 17V19.3334H19.3334V17C19.3334 13.8967 13.1151 12.3334 10.0001 12.3334Z"
      fill="currentColor"
    />
  </Svg>
)
