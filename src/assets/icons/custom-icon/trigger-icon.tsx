import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" fill="#136AF3" />
    <g clipPath="url(#clip0_351_11178)">
      <path d="M10.75 17.5H21.25L17.875 14.125L21.25 10.75H10.75V22.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_351_11178">
        <rect width="18" height="18" fill="white" transform="translate(7 7)" />
      </clipPath>
    </defs>
  </svg>
);

export const TriggerIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;