import React, { FunctionComponent } from 'react';
import Svg, { Path } from 'react-native-svg';

export const AtomIcon: FunctionComponent<{
  color?: string;
  size?: number;
  onPress?: () => void;
}> = ({ color = '#AEAEB2', size = 20, onPress }) => {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 0.0422363C34.1269 0.0422363 43.9579 9.87306 43.9579 22C43.9579 34.1269 34.1269 43.9579 22 43.9579C9.87306 43.9579 0.0422363 34.1269 0.0422363 22C0.0422363 9.87306 9.87306 0.0422363 22 0.0422363Z"
        fill="#2E3148"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.9577 9.33203C28.954 9.33203 34.6257 15.0037 34.6257 22C34.6257 28.9963 28.954 34.668 21.9577 34.668C14.9614 34.668 9.28979 28.9963 9.28979 22C9.28979 15.0037 14.9614 9.33203 21.9577 9.33203Z"
        fill="#161931"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.3449 3.79808C22.1704 3.63756 22.0804 3.63452 22.0653 3.63452C22.0501 3.63452 21.9601 3.63756 21.7857 3.79808C21.6067 3.96286 21.3926 4.24716 21.162 4.68584C20.7017 5.56141 20.2611 6.88485 19.8814 8.59251C19.1251 11.994 18.6499 16.7347 18.6499 22.0001C18.6499 27.2655 19.1251 32.0062 19.8814 35.4076C20.2611 37.1153 20.7017 38.4388 21.162 39.3143C21.3926 39.753 21.6067 40.0373 21.7857 40.2021C21.9601 40.3626 22.0501 40.3657 22.0653 40.3657C22.0804 40.3657 22.1704 40.3626 22.3449 40.2021C22.5239 40.0373 22.7379 39.753 22.9686 39.3143C23.4288 38.4388 23.8694 37.1153 24.2491 35.4076C25.0055 32.0062 25.4807 27.2655 25.4807 22.0001C25.4807 16.7347 25.0055 11.994 24.2491 8.59251C23.8694 6.88485 23.4288 5.56141 22.9686 4.68584C22.7379 4.24716 22.5239 3.96286 22.3449 3.79808ZM26.3401 22.0001C26.3401 11.3824 24.4261 2.77515 22.0653 2.77515C19.7044 2.77515 17.7905 11.3824 17.7905 22.0001C17.7905 32.6177 19.7044 41.225 22.0653 41.225C24.4261 41.225 26.3401 32.6177 26.3401 22.0001Z"
        fill="#6F7390"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.9785 13.1405C38.0304 12.9094 37.988 12.8303 37.9806 12.8176C37.9732 12.8048 37.9258 12.7284 37.6993 12.6577C37.4668 12.585 37.1133 12.5419 36.6178 12.5617C35.6287 12.6011 34.2615 12.8815 32.5917 13.4067C29.2658 14.4529 24.92 16.412 20.3572 19.0446C15.7943 21.6773 11.9238 24.459 9.35431 26.8144C8.0643 27.9969 7.13772 29.0399 6.60908 29.8761C6.34426 30.2951 6.20496 30.6224 6.15172 30.8597C6.09986 31.0907 6.14222 31.1698 6.14961 31.1825C6.15696 31.1953 6.20448 31.2717 6.43097 31.3425C6.66339 31.4151 7.0169 31.4582 7.51245 31.4385C8.50151 31.399 9.86878 31.1186 11.5385 30.5934C14.8644 29.5473 19.2102 27.5882 23.773 24.9555C28.3359 22.3228 32.2065 19.5412 34.7759 17.1858C36.0659 16.0033 36.9925 14.9602 37.5211 14.124C37.786 13.7051 37.9253 13.3777 37.9785 13.1405ZM5.40548 31.6124C6.58596 33.6558 15.0017 31.0086 24.2025 25.6999C33.4034 20.3911 39.9052 14.4311 38.7248 12.3877C37.5443 10.3444 29.1285 12.9915 19.9277 18.3003C10.7268 23.609 4.22502 29.5691 5.40548 31.6124Z"
        fill="#6F7390"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38.7248 31.6124C39.9052 29.5691 33.4034 23.609 24.2025 18.3003C15.0017 12.9915 6.58596 10.3444 5.40548 12.3877C4.22502 14.4311 10.7268 20.3911 19.9277 25.6999C29.1285 31.0086 37.5443 33.6558 38.7248 31.6124ZM6.14961 12.8176C6.157 12.8048 6.20457 12.7284 6.43097 12.6577C6.66339 12.585 7.0169 12.5419 7.51245 12.5617C8.50151 12.6011 9.86878 12.8815 11.5385 13.4067C14.8644 14.4529 19.2102 16.412 23.773 19.0446C28.3359 21.6773 32.2065 24.459 34.7759 26.8144C36.0659 27.9969 36.9925 29.0399 37.5211 29.8761C37.786 30.2951 37.9253 30.6224 37.9785 30.8597C38.0304 31.0908 37.988 31.1699 37.9806 31.1825C37.9732 31.1953 37.9258 31.2717 37.6993 31.3425C37.4668 31.4151 37.1133 31.4582 36.6178 31.4385C35.6287 31.399 34.2615 31.1186 32.5917 30.5934C29.2658 29.5473 24.92 27.5882 20.3572 24.9555C15.7943 22.3228 11.9238 19.5412 9.35431 17.1858C8.0643 16.0033 7.13772 14.9602 6.60908 14.124C6.34426 13.7051 6.20496 13.3777 6.15172 13.1405C6.09986 12.9095 6.14222 12.8303 6.14961 12.8176Z"
        fill="#6F7390"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.77746 16.6162C10.5241 16.6162 11.1294 17.2218 11.1294 17.9687C11.1294 18.7157 10.5241 19.3213 9.77746 19.3213C9.03084 19.3213 8.42554 18.7157 8.42554 17.9687C8.42554 17.2218 9.03084 16.6162 9.77746 16.6162Z"
        fill="#B7B9C8"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31.2635 11.9844C32.0104 11.9844 32.616 12.5899 32.616 13.3369C32.616 14.084 32.0104 14.6895 31.2635 14.6895C30.5164 14.6895 29.9109 14.084 29.9109 13.3369C29.9109 12.5899 30.5164 11.9844 31.2635 11.9844Z"
        fill="#B7B9C8"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.3411 33.2139C20.0881 33.2139 20.6937 33.8191 20.6937 34.5658C20.6937 35.3124 20.0881 35.9177 19.3411 35.9177C18.5941 35.9177 17.9885 35.3124 17.9885 34.5658C17.9885 33.8191 18.5941 33.2139 19.3411 33.2139Z"
        fill="#B7B9C8"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.9899 19.7C23.2546 19.7 24.2799 20.7252 24.2799 21.9899C24.2799 23.2546 23.2546 24.2799 21.9899 24.2799C20.7252 24.2799 19.7 23.2546 19.7 21.9899C19.7 20.7252 20.7252 19.7 21.9899 19.7Z"
        fill="#B7B9C8"
      />
    </Svg>
  );
};
