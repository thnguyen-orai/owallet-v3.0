import React, { FunctionComponent } from 'react';
import Svg, { Path } from 'react-native-svg';

export const BrowserIcon: FunctionComponent<{
  color?: string;
  size?: number;
}> = ({ color = 'none', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        d="M19.0695 4.93052C15.1625 1.02347 8.83813 1.02285 4.93053 4.93052C1.02345 8.83757 1.02286 15.1619 4.93053 19.0695C8.8375 22.9765 15.1619 22.9771 19.0695 19.0695C22.9766 15.1624 22.9771 8.83815 19.0695 4.93052ZM18.6516 17.6443C18.1845 17.2266 17.6848 16.857 17.1581 16.5384C17.5063 15.3359 17.7125 14.0126 17.7612 12.6371H20.7006C20.5677 14.4912 19.8553 16.2304 18.6516 17.6443ZM3.29936 12.6371H6.23872C6.28747 14.0126 6.49371 15.3359 6.84183 16.5384C6.31515 16.857 5.81548 17.2266 5.34836 17.6443C4.14465 16.2304 3.4323 14.4912 3.29936 12.6371V12.6371ZM5.3484 6.35569C5.81552 6.77339 6.31519 7.14305 6.84187 7.46162C6.49375 8.66412 6.28751 9.98737 6.23876 11.3629H3.29936C3.4323 9.50886 4.14465 7.76961 5.3484 6.35569V6.35569ZM11.3629 7.59331C10.3238 7.51899 9.32195 7.26307 8.39314 6.84088C8.93332 5.44986 9.92915 3.7815 11.3629 3.36804V7.59331ZM11.3629 8.86992V11.3629H7.51351C7.55761 10.1993 7.72248 9.08202 7.99667 8.05969C9.05217 8.52111 10.1873 8.79666 11.3629 8.86992V8.86992ZM11.3629 12.6371V15.1301C10.1873 15.2034 9.05217 15.4789 7.99667 15.9404C7.72248 14.918 7.55761 13.8007 7.51351 12.6371H11.3629ZM11.3629 16.4067V20.632C9.92923 20.2185 8.9334 18.5503 8.39314 17.1592C9.32195 16.737 10.3238 16.4811 11.3629 16.4067ZM12.6371 16.4067C13.6762 16.4811 14.6781 16.737 15.6069 17.1592C15.0666 18.5502 14.0709 20.2185 12.6371 20.632V16.4067ZM12.6371 15.1301V12.6371H16.4865C16.4424 13.8007 16.2775 14.918 16.0033 15.9404C14.9478 15.4789 13.8127 15.2034 12.6371 15.1301ZM12.6371 11.3629V8.86992C13.8127 8.79666 14.9478 8.52111 16.0033 8.05969C16.2775 9.08202 16.4424 10.1993 16.4865 11.3629H12.6371ZM12.6371 7.59331V3.36808C14.0709 3.78153 15.0667 5.4499 15.6069 6.84091C14.6781 7.26307 13.6762 7.51899 12.6371 7.59331ZM15.4988 4.00417C16.3144 4.3613 17.0752 4.84555 17.7573 5.44639C17.4326 5.73264 17.0901 5.99219 16.7324 6.22431C16.4147 5.43776 16.0089 4.67339 15.4988 4.00417V4.00417ZM7.26761 6.22431C6.9099 5.99219 6.56736 5.73264 6.24267 5.44639C6.92473 4.84555 7.68559 4.3613 8.50114 4.00417C7.99109 4.67346 7.58528 5.43784 7.26761 6.22431V6.22431ZM7.26765 17.7757C7.58528 18.5623 7.99116 19.3267 8.50118 19.9959C7.68563 19.6388 6.92477 19.1545 6.24271 18.5537C6.56736 18.2674 6.90994 18.0079 7.26765 17.7757V17.7757ZM16.7324 17.7757C17.0901 18.0079 17.4326 18.2674 17.7573 18.5536C17.0752 19.1545 16.3144 19.6387 15.4988 19.9958C16.0088 19.3267 16.4147 18.5623 16.7324 17.7757ZM17.7613 11.3629C17.7125 9.98741 17.5063 8.66412 17.1582 7.46166C17.6849 7.14309 18.1845 6.77343 18.6516 6.35572C19.8554 7.76961 20.5677 9.50886 20.7006 11.3629H17.7613Z"
        fill={color ?? 'white'}
      />
    </Svg>
  );
};

export const BrowserFillIcon: FunctionComponent<{
  color?: string;
  size?: number;
}> = ({ color = 'none', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        d="M7.65 20.91C7.62 20.91 7.58 20.93 7.55 20.93C5.61 19.97 4.03 18.38 3.06 16.44C3.06 16.41 3.08 16.37 3.08 16.34C4.3 16.7 5.56 16.97 6.81 17.18C7.03 18.44 7.29 19.69 7.65 20.91Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M20.94 16.45C19.95 18.44 18.3 20.05 16.29 21.02C16.67 19.75 16.99 18.47 17.2 17.18C18.46 16.97 19.7 16.7 20.92 16.34C20.91 16.38 20.94 16.42 20.94 16.45Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M21.02 7.71001C19.76 7.33001 18.49 7.02001 17.2 6.80001C16.99 5.51001 16.68 4.23001 16.29 2.98001C18.36 3.97001 20.03 5.64001 21.02 7.71001Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M7.65 3.09C7.29 4.31 7.03 5.55 6.82 6.81C5.53 7.01 4.25 7.33 2.98 7.71C3.95 5.7 5.56 4.05 7.55 3.06C7.58 3.06 7.62 3.09 7.65 3.09Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M15.49 6.59C13.17 6.33 10.83 6.33 8.51 6.59C8.76 5.22 9.08 3.85 9.53 2.53C9.55 2.45 9.54 2.39 9.55 2.31C10.34 2.12 11.15 2 12 2C12.84 2 13.66 2.12 14.44 2.31C14.45 2.39 14.45 2.45 14.47 2.53C14.92 3.86 15.24 5.22 15.49 6.59Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M6.59 15.49C5.21 15.24 3.85 14.92 2.53 14.47C2.45 14.45 2.39 14.46 2.31 14.45C2.12 13.66 2 12.85 2 12C2 11.16 2.12 10.34 2.31 9.56001C2.39 9.55001 2.45 9.55001 2.53 9.53001C3.86 9.09001 5.21 8.76001 6.59 8.51001C6.34 10.83 6.34 13.17 6.59 15.49Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M22 12C22 12.85 21.88 13.66 21.69 14.45C21.61 14.46 21.55 14.45 21.47 14.47C20.14 14.91 18.78 15.24 17.41 15.49C17.67 13.17 17.67 10.83 17.41 8.51001C18.78 8.76001 20.15 9.08001 21.47 9.53001C21.55 9.55001 21.61 9.56001 21.69 9.56001C21.88 10.35 22 11.16 22 12Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M15.49 17.41C15.24 18.79 14.92 20.15 14.47 21.47C14.45 21.55 14.45 21.61 14.44 21.69C13.66 21.88 12.84 22 12 22C11.15 22 10.34 21.88 9.55 21.69C9.54 21.61 9.55 21.55 9.53 21.47C9.09 20.14 8.76 18.79 8.51 17.41C9.67 17.54 10.83 17.63 12 17.63C13.17 17.63 14.34 17.54 15.49 17.41Z"
        fill={color ?? '#1C1B4B'}
      />
      <Path
        d="M15.7633 15.7633C13.2622 16.0789 10.7378 16.0789 8.23667 15.7633C7.92111 13.2622 7.92111 10.7378 8.23667 8.23667C10.7378 7.92111 13.2622 7.92111 15.7633 8.23667C16.0789 10.7378 16.0789 13.2622 15.7633 15.7633Z"
        fill={color ?? '#1C1B4B'}
      />
    </Svg>
  );
};

export const BrowserOutLineIcon: FunctionComponent<{
  color?: string;
  size?: number;
}> = ({ color = 'none', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path
        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        fill={color ?? '#5F5E77'}
      />
      <Path
        d="M9 21.75H8C7.59 21.75 7.25 21.41 7.25 21C7.25 20.59 7.57 20.26 7.98 20.25C6.41 14.89 6.41 9.11 7.98 3.75C7.57 3.74 7.25 3.41 7.25 3C7.25 2.59 7.59 2.25 8 2.25H9C9.24 2.25 9.47 2.37 9.61 2.56C9.75 2.76 9.79 3.01 9.71 3.24C7.83 8.89 7.83 15.11 9.71 20.77C9.79 21 9.75 21.25 9.61 21.45C9.47 21.63 9.24 21.75 9 21.75Z"
        fill={color ?? '#5F5E77'}
      />
      <Path
        d="M15 21.75C14.92 21.75 14.84 21.74 14.76 21.71C14.37 21.58 14.15 21.15 14.29 20.76C16.17 15.11 16.17 8.89 14.29 3.23C14.16 2.84 14.37 2.41 14.76 2.28C15.16 2.15 15.58 2.36 15.71 2.75C17.7 8.71 17.7 15.27 15.71 21.22C15.61 21.55 15.31 21.75 15 21.75Z"
        fill={color ?? '#5F5E77'}
      />
      <Path
        d="M12 17.2C9.21 17.2 6.43 16.81 3.75 16.02C3.74 16.42 3.41 16.75 3 16.75C2.59 16.75 2.25 16.41 2.25 16V15C2.25 14.76 2.37 14.53 2.56 14.39C2.76 14.25 3.01 14.21 3.24 14.29C8.89 16.17 15.12 16.17 20.77 14.29C21 14.21 21.25 14.25 21.45 14.39C21.65 14.53 21.76 14.76 21.76 15V16C21.76 16.41 21.42 16.75 21.01 16.75C20.6 16.75 20.27 16.43 20.26 16.02C17.57 16.81 14.79 17.2 12 17.2Z"
        fill={color ?? '#5F5E77'}
      />
      <Path
        d="M21 9.75C20.92 9.75 20.84 9.74 20.76 9.71C15.11 7.83 8.88 7.83 3.23 9.71C2.83 9.84 2.41 9.63 2.28 9.24C2.16 8.84 2.37 8.42 2.76 8.29C8.72 6.3 15.28 6.3 21.23 8.29C21.62 8.42 21.84 8.85 21.7 9.24C21.61 9.55 21.31 9.75 21 9.75Z"
        fill={color ?? '#5F5E77'}
      />
    </Svg>
  );
};
