import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#3BBFCF" />
    <path d="M10 9.25C10 8.83579 10.3358 8.5 10.75 8.5H21.25C21.6642 8.5 22 8.83579 22 9.25V22.75C22 23.1642 21.6642 23.5 21.25 23.5H10.75C10.3358 23.5 10 23.1642 10 22.75V9.25Z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
    <path d="M13 8.5V23.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 11.5H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 14.5H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.75 8.5H15.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.75 23.5H15.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const NoteIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;