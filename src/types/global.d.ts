type PAYMENT_METHOD = 'DEPOSIT' | 'WITHDRAW';

type AxiosResponse = {
  code: number;
  message: string;
  data: any;
};

interface ILocationState {
  openLoginDialog?: string;
  battleUuid?: string;
  isNavigateFromGame?: string;
  keepDropdownOpen?: boolean;
}

interface IEnv {
  [key: string]: string;
  VITE_FOOTER_DESCRIPTION_1(
    VITE_FOOTER_DESCRIPTION_1: string
  ): import('react-i18next').ReactI18NextChild | Iterable<import('react-i18next').ReactI18NextChild>;
  VITE_PORT: string;
  VITE_BASE_SOCKET: string;
  VITE_BASE_URL_API: string;
  VITE_BASE_URL: string;
  VITE_BASE_CDN: string;
  VITE_WALLET_CONNECT_PROJECT_ID: string;
  VITE_SIGN_UP_REDIRECT_LABEL: string;
  VITE_DEFAULT_MERCHANT: string;
  VITE_DEFAULT_BRAND_ID: string;
  VITE_CHAIN_ID_HEX: string;
  VITE_CHAIN_ID: string;
  VITE_NETWORK_NAME: string;
  VITE_ETH_EXPLORER_URL: string;
  VITE_RPC_URL: string;
  VITE_ETHERSCAN_EXPLORER_URL: string;
  VITE_GOOGLE_CLIENT_ID: string;
  VITE_GOOGLE_CLIENT_SECRET: string;
  VITE_TELEGRAM_BOT_ID: string;
  VITE_TELEGRAM_BOT_USERNAME: string;
  VITE_TELEGRAM_SECRET_KEY: string;
  VITE_METAMASK_SECRET_KEY: string;
  VITE_GOOGLE_SECRET_KEY: string;
  VITE_GOOGLE_RECAPTCHA: string;
  VITE_MINIMUM_DEPOSIT_CREATE_CLAN: string;
  VITE_METAMASK_APP_DEEP_LINK: string;
  VITE_CHAT_APP_KEY: string;
  VITE_COMMUNITY_CHANNEL: string;
  VITE_CHANNEL_KEY: string;
  VITE_ACCESS_TOKEN_TIME: string;
  VITE_DOWNLOAD_BANNER_LINK: string;
  VITE_BLOCK_EXPLORER_URL: string;
  VITE_MESSAGES_SIGN: string;
  VITE_FOOTER_CONTACT_LIST: string;
  VITE_FOOTER_EMAIL: string;
  VITE_API_ENDPOINT: string;
  VITE_MONTHLY_COMMISSION_LINK: string;
}

interface ILayout {
  component: string;
  _uid: string;
  props: Record<string, number>;
}
[];

type IThemes = Record<string, string>;
interface Window {
  env: IEnv;
  layout: ILayout;
  themes: IThemes;
}
