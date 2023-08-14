import React, { FunctionComponent } from 'react';
import Svg, {
  Path,
  G,
  Rect,
  Stop,
  LinearGradient,
  Defs,
  ClipPath
} from 'react-native-svg';

export const AiriIcon: FunctionComponent<{
  color?: string;
  size?: number;
  onPress?: () => void;
}> = ({ color = '#AEAEB2', size = 20, onPress }) => {
  return (
    <Svg width="44" height="44" viewBox="0 0 32 33" fill="none">
      <G clip-Path="url(#clip0_370_7643)">
        <Path
          d="M27.8857 18.3857C27.0714 23.5143 23.0286 27.5714 17.8857 28.3857V32.5C25.2714 31.6429 31.1429 25.7714 32 18.3857H27.8857ZM4.11429 18.3857H0C0.857143 25.7714 6.71429 31.6429 14.1 32.5V28.3857C8.97143 27.5714 4.92857 23.5143 4.11429 18.3857ZM17.8857 0.5V4.61429C23.0143 5.42857 27.0714 9.48571 27.8857 14.6143H32C31.1429 7.22857 25.2714 1.35714 17.8857 0.5ZM0 14.6143H4.11429C4.92857 9.48571 8.97143 5.42857 14.1 4.61429V0.5C6.71429 1.35714 0.857143 7.22857 0 14.6143Z"
          fill="url(#paint0_linear_370_7643)"
        />
        <Path
          d="M16 6.7L13.1285 11.6714L16 16.6286L18.8857 21.6H24.6L16 6.7Z"
          fill="url(#paint1_linear_370_7643)"
        />
        <Path
          d="M10.2572 16.6428L7.38574 21.6H13.1143L16 16.6286"
          fill="url(#paint2_linear_370_7643)"
        />
        <Path
          d="M17.8857 32.5C20.2857 32.2143 22.6 31.4 24.6429 30.0857L20.6 29.0714L17.8857 32.5Z"
          fill="#0E4ADB"
        />
        <Path
          d="M28.5571 21.1143L29.5714 25.1571C30.8857 23.1143 31.7143 20.7857 31.9857 18.3714L28.5571 21.1143Z"
          fill="#0E4ADB"
        />
        <Path
          d="M26.0571 23.1143L29.5857 25.1714L28.5714 21.1286L26.0571 23.1143Z"
          fill="#105EE6"
        />
        <Path
          d="M17.8857 28.3857V32.5L20.6 29.0714L17.8857 28.3857Z"
          fill="#105EE6"
        />
        <Path
          d="M28.5572 21.1143L31.9857 18.3857H27.8715L28.5572 21.1143Z"
          fill="#105EE6"
        />
        <Path
          d="M22.5714 26.5714L20.6 29.0714L24.6428 30.0857V30.0714L22.5714 26.5714Z"
          fill="#105EE6"
        />
        <Path
          d="M26.0571 23.1143L28.5714 21.1143L27.8857 18.3857C27.6143 20.0714 26.9857 21.6857 26.0571 23.1143Z"
          fill="#3565FD"
        />
        <Path
          d="M20.6 29.0714L22.5715 26.5714C21.1572 27.5 19.5572 28.1143 17.8857 28.3857L20.6 29.0714Z"
          fill="#3565FD"
        />
        <Path
          d="M29.5714 25.1571L25.4571 25.9857L24.6428 30.0714C26.6285 28.8143 28.3143 27.1429 29.5714 25.1571Z"
          fill="#0044E3"
        />
        <Path
          d="M25.4714 25.9857L29.5857 25.1571L26.0571 23.1H26.0429L25.4714 25.9857Z"
          fill="#0E51ED"
        />
        <Path
          d="M24.6428 30.0857L25.4571 26L22.5714 26.5857L24.6428 30.0857Z"
          fill="#0E51ED"
        />
        <Path
          d="M25.4714 25.9857L26.0428 23.1143H26.0571C25.1428 24.5 23.9714 25.6714 22.5857 26.5714L25.4714 25.9857Z"
          fill="#1D63F0"
        />
        <Path
          d="M18.8429 21.6L18.8572 21.6429L18.8858 21.6H18.8429Z"
          fill="white"
        />
        <Path
          d="M17.8857 0.5C20.2857 0.785714 22.6 1.6 24.6429 2.91429L20.6 3.92857L17.8857 0.5Z"
          fill="#2BB7FD"
        />
        <Path
          d="M28.5571 11.8857L29.5714 7.84286C30.8857 9.88572 31.7143 12.2143 31.9857 14.6286L28.5571 11.8857Z"
          fill="#3564FD"
        />
        <Path
          d="M26.0571 9.88571L29.5714 7.84286L28.5571 11.8857L26.0571 9.88571Z"
          fill="#3F7CFD"
        />
        <Path
          d="M17.8857 4.61429V0.5L20.6 3.92857L17.8857 4.61429Z"
          fill="#68C6FD"
        />
        <Path
          d="M28.5572 11.8857L31.9857 14.6143H27.8715L28.5572 11.8857Z"
          fill="#105EE6"
        />
        <Path
          d="M22.5714 6.42857L20.6 3.92857L24.6428 2.91428L22.5714 6.42857Z"
          fill="#35ADFD"
        />
        <Path
          d="M26.0571 9.88571L28.5714 11.8857L27.8857 14.6143C27.6143 12.9286 26.9857 11.3143 26.0571 9.88571Z"
          fill="#3A71FD"
        />
        <Path
          d="M20.6 3.92857L22.5715 6.42857C21.1572 5.5 19.5572 4.88571 17.8857 4.61428L20.6 3.92857Z"
          fill="#30B5FD"
        />
        <Path
          d="M29.5714 7.84286L25.4571 7.01428L24.6428 2.92857C26.6285 4.17143 28.3143 5.85714 29.5714 7.84286Z"
          fill="#3A92FD"
        />
        <Path
          d="M25.4714 7.01428L29.5857 7.84286L26.0571 9.9H26.0429L25.4714 7.01428Z"
          fill="#3F88FD"
        />
        <Path
          d="M24.6428 2.91428L25.4571 7L22.5714 6.42857L24.6428 2.91428Z"
          fill="#389EFD"
        />
        <Path
          d="M25.4714 7.01429L26.0428 9.88571H26.0571C25.1428 8.5 23.9714 7.32857 22.5857 6.42857L25.4714 7.01429Z"
          fill="#2893FD"
        />
        <Path
          d="M14.1143 32.5C11.7143 32.2143 9.40003 31.4 7.35718 30.0857L11.4 29.0714L14.1143 32.5Z"
          fill="#3564FD"
        />
        <Path
          d="M3.42857 21.1143L2.41429 25.1571C1.11429 23.1143 0.285714 20.8 0 18.3857L3.42857 21.1143Z"
          fill="#2BB7FD"
        />
        <Path
          d="M5.94287 23.1143L2.42859 25.1571L3.44287 21.1143L5.94287 23.1143Z"
          fill="#35ADFD"
        />
        <Path
          d="M14.1 28.3857V32.5L11.3857 29.0714L14.1 28.3857Z"
          fill="#105EE6"
        />
        <Path
          d="M3.42857 21.1143L0 18.3857H4.11429L3.42857 21.1143Z"
          fill="#68C6FD"
        />
        <Path
          d="M9.42861 26.5714L11.4 29.0714L7.35718 30.0857V30.0714L9.42861 26.5714Z"
          fill="#3F7CFD"
        />
        <Path
          d="M5.94288 23.1143L3.42859 21.1143L4.1143 18.3857C4.38573 20.0714 5.0143 21.6857 5.94288 23.1143Z"
          fill="#30B5FD"
        />
        <Path
          d="M11.4 29.0714L9.42859 26.5714C10.8429 27.5 12.4429 28.1143 14.1143 28.3857L11.4 29.0714Z"
          fill="#3F7CFD"
        />
        <Path
          d="M2.42859 25.1571L6.54287 25.9857L7.35716 30.0714C5.37145 28.8143 3.68573 27.1429 2.42859 25.1571Z"
          fill="#3A92FD"
        />
        <Path
          d="M6.52859 25.9857L2.42859 25.1571L5.95716 23.1H5.97145L6.52859 25.9857Z"
          fill="#379DFC"
        />
        <Path
          d="M7.34285 30.0857L6.52856 26L9.41428 26.5857L7.34285 30.0857Z"
          fill="#3F88FD"
        />
        <Path
          d="M6.52859 25.9857L5.95716 23.1143H5.94287C6.85716 24.5 8.02859 25.6714 9.4143 26.5714L6.52859 25.9857Z"
          fill="#2893FD"
        />
        <Path
          d="M14.1143 0.5C11.7143 0.785714 9.40003 1.6 7.35718 2.91429L11.4 3.92857L14.1143 0.5Z"
          fill="#84E9FD"
        />
        <Path
          d="M3.42857 11.8857L2.41429 7.84286C1.11429 9.88571 0.285714 12.2 0 14.6143L3.42857 11.8857Z"
          fill="#84E9FD"
        />
        <Path
          d="M5.94287 9.88571L2.42859 7.84286L3.42859 11.8857L5.94287 9.88571Z"
          fill="#3AD2FD"
        />
        <Path
          d="M14.1 4.61429V0.5L11.3857 3.92857L14.1 4.61429Z"
          fill="#49CDFD"
        />
        <Path
          d="M3.42857 11.8857L0 14.6143H4.11429L3.42857 11.8857Z"
          fill="#49CDFD"
        />
        <Path
          d="M9.42861 6.42857L11.4 3.92857L7.35718 2.9L9.42861 6.42857Z"
          fill="#3AD2FD"
        />
        <Path
          d="M5.94288 9.88571L3.42859 11.8857L4.1143 14.6143C4.38573 12.9286 5.0143 11.3143 5.94288 9.88571Z"
          fill="#17C7FD"
        />
        <Path
          d="M11.4 3.92857L9.42859 6.42857C10.8429 5.5 12.4286 4.88571 14.1 4.61428L11.4 3.92857Z"
          fill="#17C7FD"
        />
        <Path
          d="M2.42859 7.84286L6.54287 7.01428L7.35716 2.92857C5.37145 4.17143 3.68573 5.85714 2.42859 7.84286Z"
          fill="#84E9FD"
        />
        <Path
          d="M6.52859 7.01428L2.42859 7.84286L5.95716 9.9H5.97145L6.52859 7.01428Z"
          fill="#49DFFD"
        />
        <Path
          d="M7.34285 2.91428L6.52856 7L9.42857 6.42857L7.34285 2.91428Z"
          fill="#49DFFD"
        />
        <Path
          d="M6.52859 7.01429L5.95716 9.88571H5.94287C6.85716 8.5 8.02859 7.32857 9.4143 6.42857L6.52859 7.01429Z"
          fill="#3AD2FD"
        />
        <Path
          d="M13.1 11.6571L13.1285 11.6714L13.1428 11.6571H13.1Z"
          fill="white"
        />
        <Path
          d="M7.40002 21.6H13.1143L10.2572 16.6429L7.40002 21.6Z"
          fill="#2BB7FD"
        />
        <Path
          d="M24.6 21.6L21.7429 16.6571L18.8857 21.6H24.6Z"
          fill="#3A71FD"
        />
        <Path
          d="M21.7429 16.6571L15.9857 16.6429L18.8429 21.6H18.8857L21.7429 16.6571Z"
          fill="#3A92FD"
        />
        <Path
          d="M15.9858 16.6429H10.2715L13.1286 21.6L15.9858 16.6429Z"
          fill="#49CDFD"
        />
        <Path
          d="M18.8571 11.6571L16 6.7L13.1428 11.6571H18.8571Z"
          fill="#84E9FD"
        />
        <Path
          d="M18.8571 11.6571L15.9857 16.6429H21.7286L18.8571 11.6571Z"
          fill="#30B5FD"
        />
        <Path
          d="M13.1428 11.6571L13.1285 11.6714L15.9857 16.6286L18.8571 11.6571H13.1428Z"
          fill="#49CDFD"
        />
      </G>
      <Defs>
        <LinearGradient
          x1="4.51614"
          y1="5.25823"
          x2="27.5678"
          y2="27.8236"
          gradientUnits="userSpaceOnUse"
        >
          <Stop Stop-color="#84E9FD" />
          <Stop offset="1" Stop-color="#0044E3" />
        </LinearGradient>
        <LinearGradient
          x1="6.39584"
          y1="3.33799"
          x2="29.4475"
          y2="25.9033"
          gradientUnits="userSpaceOnUse"
        >
          <Stop Stop-color="#84E9FD" />
          <Stop offset="1" Stop-color="#0044E3" />
        </LinearGradient>
        <LinearGradient
          x1="1.10164"
          y1="8.74632"
          x2="24.1534"
          y2="31.3117"
          gradientUnits="userSpaceOnUse"
        >
          <Stop Stop-color="#84E9FD" />
          <Stop offset="1" Stop-color="#0044E3" />
        </LinearGradient>
        <ClipPath id="clip0_370_7643">
          <Rect
            width="44"
            height="44"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
