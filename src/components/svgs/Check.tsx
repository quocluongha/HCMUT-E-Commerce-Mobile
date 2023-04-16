import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const Check = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      fill="currentColor"
      d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
    />
  </Svg>
)
