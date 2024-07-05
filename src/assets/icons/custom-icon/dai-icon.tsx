import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_301_1980)">
      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#F4B731" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4464 10H19.2054C23.9245 10 27.502 12.645 28.833 16.4925H31.25V18.8188H29.3422C29.3789 19.1863 29.3979 19.5613 29.3979 19.9413V19.9987C29.3979 20.4262 29.3742 20.8488 29.3268 21.2613H31.25V23.5862H28.7868C27.4214 27.3812 23.8724 30 19.2066 30H11.4464V23.5862H8.75V21.2613H11.4464V18.8188H8.75V16.4937H11.4464V10V10ZM13.6147 23.5862V27.9137H19.2042C22.655 27.9137 25.2176 26.18 26.4101 23.5862H13.6147V23.5862ZM27.0745 21.2613H13.6147V18.8188H27.0792C27.1278 19.2025 27.1538 19.5962 27.1538 19.9987V20.055C27.1538 20.4663 27.1266 20.8675 27.0745 21.26V21.2613ZM19.2066 12.0812C22.6716 12.0812 25.2425 13.8612 26.4279 16.4912H13.6147V12.0825H19.2042L19.2066 12.0812Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0_301_1980">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const DaiIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;