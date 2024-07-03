import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1577_1858)">
      <path d="M9 6L15 12L9 18" stroke="#6F7688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_1577_1858">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const RightIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;