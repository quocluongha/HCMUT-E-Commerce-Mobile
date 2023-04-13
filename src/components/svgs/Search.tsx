import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export const Search = (props: SvgProps) => (
  <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
    <Path
      d="M9.32166 16.3637C13.6402 16.3637 17.1411 13.1076 17.1411 9.09096C17.1411 5.07435 13.6402 1.81824 9.32166 1.81824C5.00312 1.81824 1.50226 5.07435 1.50226 9.09096C1.50226 13.1076 5.00312 16.3637 9.32166 16.3637Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.0959 18.1818L14.8441 14.2273"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
