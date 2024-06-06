export enum LoginFormItems {
  email = 'email',
  password = 'password',
  remember = 'remember',
  userName = 'userName',
  validRecaptcha = 'validRecaptcha',
  referralCode = 'referralCode',
  fingerprint = 'fingerprint',
  recaptchaResponse = 'recaptchaResponse'
}

export interface ILoginForm {
  [LoginFormItems.email]: string;
  [LoginFormItems.password]: string;
  [LoginFormItems.remember]: boolean;
  [LoginFormItems.userName]: string;
  [LoginFormItems.validRecaptcha]: boolean;
  [LoginFormItems.referralCode]: string;
  [LoginFormItems.fingerprint]: string;
  [LoginFormItems.recaptchaResponse]: string;
}

export enum ECaptchaStatus {
  UNKNOWN = 0,
  VALID,
  IN_VALID
}
