import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#3BBFCF" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9886 8.875H21.0114L23.875 13.8625L16 23.125L8.125 13.8625L10.9886 8.875Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.9888 8.875L16.0001 23.125L21.0115 8.875" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.125 13.8623H23.875" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.7783 13.8625L15.9999 8.875L19.2215 13.8625" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

export const AssetIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;