import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.75" width="20.25" height="2" rx="1" fill="#6F7688" />
    <rect x="12.5357" y="16" width="14.4643" height="2" rx="1" fill="#6F7688" />
    <rect y="8" width="27" height="2" rx="1" fill="#6F7688" />
  </svg>
);

export const MenuIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;