import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#DCE0EA" />
    <path d="M9.65771 18H26.1577" stroke="#0A0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M15.1577 23.5L9.65771 18L15.1577 12.5" stroke="#0A0B0C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const ArrowOutlinedIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;