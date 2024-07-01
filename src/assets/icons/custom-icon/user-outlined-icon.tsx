import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CustomIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#3BBFCF" fill-opacity="0.12" />
    <g clip-path="url(#clip0_1452_18451)">
      <path d="M10 9.25C10 10.0456 10.3161 10.8087 10.8787 11.3713C11.4413 11.9339 12.2044 12.25 13 12.25C13.7956 12.25 14.5587 11.9339 15.1213 11.3713C15.6839 10.8087 16 10.0456 16 9.25C16 8.45435 15.6839 7.69129 15.1213 7.12868C14.5587 6.56607 13.7956 6.25 13 6.25C12.2044 6.25 11.4413 6.56607 10.8787 7.12868C10.3161 7.69129 10 8.45435 10 9.25Z" stroke="#136AF3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.5 19.75V18.25C8.5 17.4544 8.81607 16.6913 9.37868 16.1287C9.94129 15.5661 10.7044 15.25 11.5 15.25H14.5C15.2956 15.25 16.0587 15.5661 16.6213 16.1287C17.1839 16.6913 17.5 17.4544 17.5 18.25V19.75" stroke="#136AF3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_1452_18451">
        <rect width="18" height="18" fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
);

export const UserOutlinedIcon = (props: IconComponentProps) => <Icon component={CustomIcon} {...props} />;