import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const SettingPersonOutline = (props: SvgProps) => (
  <Svg width={20} height={22} viewBox="0 0 20 22" {...props}>
    <Path
      d="M14.125 5.75C13.9413 8.22828 12.0625 10.25 10 10.25C7.93754 10.25 6.05551 8.22875 5.87504 5.75C5.68754 3.17188 7.51566 1.25 10 1.25C12.4844 1.25 14.3125 3.21875 14.125 5.75Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.0001 13.25C5.92199 13.25 1.78293 15.5 1.01699 19.7469C0.924645 20.2588 1.21433 20.75 1.75011 20.75H18.2501C18.7864 20.75 19.0761 20.2588 18.9837 19.7469C18.2173 15.5 14.0782 13.25 10.0001 13.25Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
  </Svg>
)
