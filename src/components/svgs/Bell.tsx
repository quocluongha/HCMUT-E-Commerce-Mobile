import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const Bell = (props: SvgProps) => (
  <Svg width={22} height={26} viewBox="0 0 22 26" {...props}>
    <Path
      d="M11 0.333313C16.7983 0.333313 21.5 5.05015 21.5 10.8695V21.3333H0.5V10.8695C0.5 5.05015 5.20167 0.333313 11 0.333313ZM8.08333 22.5H13.9167C13.9167 23.2735 13.6094 24.0154 13.0624 24.5624C12.5154 25.1094 11.7735 25.4166 11 25.4166C10.2265 25.4166 9.48459 25.1094 8.9376 24.5624C8.39062 24.0154 8.08333 23.2735 8.08333 22.5Z"
      fill="currentColor"
    />
  </Svg>
)
