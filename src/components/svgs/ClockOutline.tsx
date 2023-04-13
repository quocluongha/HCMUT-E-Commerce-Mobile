import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const ClockOutline = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <Path
      d="M10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18ZM10 0C15.5 0 20 4.5 20 10C20 15.5 15.5 20 10 20C4.47 20 0 15.5 0 10C0 4.5 4.5 0 10 0ZM10.5 11H9V5H10.5V9.26L14.2 7.13L14.95 8.43L10.5 11Z"
      fill="currentColor"
    />
  </Svg>
)
