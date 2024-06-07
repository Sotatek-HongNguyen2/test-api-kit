type PAYMENT_METHOD = "DEPOSIT" | "WITHDRAW";

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
  ):
    | import("react-i18next").ReactI18NextChild
    | Iterable<import("react-i18next").ReactI18NextChild>;
  VITE_PORT: string;

  VITE_BASE_URL_API: string;
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
