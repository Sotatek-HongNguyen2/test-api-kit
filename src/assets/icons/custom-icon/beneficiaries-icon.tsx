import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#3BBFCF" />
    <path d="M16 14.5C17.6569 14.5 19 13.1569 19 11.5C19 9.84315 17.6569 8.5 16 8.5C14.3431 8.5 13 9.84315 13 11.5C13 13.1569 14.3431 14.5 16 14.5Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M22.75 23.5C22.75 19.7721 19.7279 16.75 16 16.75C12.2721 16.75 9.25 19.7721 9.25 23.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.25 20.5L15.25 23.5L13.75 22" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const BeneficiariesIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;