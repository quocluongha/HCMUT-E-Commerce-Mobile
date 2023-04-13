import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg'

export const Facebook = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0_43_142)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.6752 0H1.3248C0.5928 0 0 0.5928 0 1.3248V22.6752C0 23.4072 0.5928 24 1.3248 24H12.8184V14.706H9.6912V11.0844H12.8184V8.412C12.8184 5.3112 14.712 3.624 17.478 3.624C18.8028 3.624 19.9404 3.7224 20.2728 3.7668V7.0068H18.3552C16.8504 7.0068 16.56 7.722 16.56 8.7708V11.0832H20.1468L19.6788 14.7048H16.5588V24H22.6752C23.4072 24 24 23.4072 24 22.6752V1.3248C24 0.5928 23.4072 0 22.6752 0Z"
        fill="#F8F9FA"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_43_142">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)
