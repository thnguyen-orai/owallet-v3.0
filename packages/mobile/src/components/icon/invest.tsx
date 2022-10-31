import React, { FunctionComponent } from 'react';
import Svg, { Path } from 'react-native-svg';

export const InvestFillIcon: FunctionComponent<{
  color?: string;
  size?: number;
}> = ({ color = 'none', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.88 11.53C16.88 11.92 16.57 12.23 16.18 12.23C15.79 12.23 15.48 11.92 15.48 11.53V11.35L12.76 14.07C12.61 14.22 12.41 14.29 12.2 14.27C11.99 14.25 11.8 14.14 11.69 13.96L10.67 12.44L8.29 14.82C8.15 14.96 7.98 15.02 7.8 15.02C7.62 15.02 7.44 14.95 7.31 14.82C7.04 14.55 7.04 14.11 7.31 13.83L10.29 10.85C10.44 10.7 10.64 10.63 10.85 10.65C11.06 10.67 11.25 10.78 11.36 10.96L12.38 12.48L14.49 10.37H14.31C13.92 10.37 13.61 10.06 13.61 9.67C13.61 9.28 13.92 8.97 14.31 8.97H16.17C16.26 8.97 16.35 8.99 16.44 9.02C16.61 9.09 16.75 9.23 16.82 9.4C16.86 9.49 16.87 9.58 16.87 9.67V11.53H16.88Z"
        fill={color ?? '#1C1B4B'}
      />
    </Svg>
  );
};

export const InvestOutlineIcon: FunctionComponent<{
  color?: string;
  size?: number;
}> = ({ color = 'none', size = 24 }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color ?? '#5F5E77'}
    >
      <Path
        d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5"
        stroke={color ?? '#5F5E77'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.5 9.5H16.5V11.5"
        stroke={color ?? '#5F5E77'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke={color ?? '#5F5E77'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
