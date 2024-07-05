import React from 'react';
import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_983_1812)">
      <circle cx="23" cy="22" r="20" fill="#6479D5" />
      <path d="M23.0457 7L22.8262 7.68041V27.4225L23.0457 27.6223L33.0889 22.2055L23.0457 7Z" fill="#CCD2F2" />
      <path d="M23.0435 7L13 22.2055L23.0435 27.6223V18.0401V7Z" fill="#FEFEFE" />
      <path d="M23.0461 29.3574L22.9224 29.4951V36.5275L23.0461 36.8571L33.0954 23.9434L23.0461 29.3574Z" fill="#CCD2F2" />
      <path d="M23.0435 36.8571V29.3574L13 23.9434L23.0435 36.8571Z" fill="#FEFEFE" />
      <path d="M23.042 27.6218L33.0852 22.205L23.042 18.0396V27.6218Z" fill="#8B9CE1" />
      <path d="M13 22.205L23.0435 27.6218V18.0396L13 22.205Z" fill="#CCD2F2" />
    </g>
    <defs>
      <filter id="filter0_d_983_1812" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.129412 0 0 0 0 0.105882 0 0 0 0 0.305882 0 0 0 0.15 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_983_1812" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_983_1812" result="shape" />
      </filter>
    </defs>
  </svg>
);

export const EthIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;