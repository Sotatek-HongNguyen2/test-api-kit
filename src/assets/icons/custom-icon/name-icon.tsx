import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#3BBFCF" />
    <path d="M8.5 9.25V22.75H18.25V9.25H8.5Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.5 22.75V9.25" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M23.5 9.25H20.5V21.25L22 22.75L23.5 21.25V9.25Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M20.5 11.5H23.5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.25 9.25H8.5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.25 22.75H8.5" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M20.5 9.25V15.25" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M23.5 9.25V15.25" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const NameIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;