import { Rule } from "antd/es/form";

export const REGEX_EMAIL = () =>
  RegExp(String.raw`^[a-zA-Z0-9._\-+]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$`);

export const EMAIL_RULES: Rule[] = [
  {
    validator(_, value: string) {
      const convertedValue = value?.trim();

      if (!convertedValue) {
        return Promise.reject(`Please enter your email address!`);
      }

      if (!REGEX_EMAIL().test(convertedValue)) {
        return Promise.reject("Invalid email. Please re-enter");
      }

      if (convertedValue.length > 254) {
        return Promise.reject(
          new Error(
            "The entire email address should typically not exceed 254 characters"
          )
        );
      }

      const [localPart, domainPart] = convertedValue.split("@");

      if (localPart && localPart.length > 64) {
        return Promise.reject(
          new Error("The part before '@' should not exceed 64 characters")
        );
      }
      const domainPartRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (!domainPartRegex.test(domainPart)) {
        return Promise.reject(new Error("Invalid email. Please re-enter"));
      }

      if (domainPart.startsWith("-") || domainPart.endsWith("-")) {
        return Promise.reject(new Error("Invalid email. Please re-enter"));
      }

      return Promise.resolve();
    },
  },
];

export const WILL_NAME_RULES: Rule[] = [
  {
    validator(_, value: string) {
      const regex1 = /^[a-zA-Z0-9]*$/;
      const convertedValue = value?.trim();

      if (!convertedValue) {
        return Promise.reject(`Please input your will name!`);
      }

      if (!regex1.test(convertedValue)) {
        return Promise.reject(`Will name cannot contain special characters`);
      }

      return Promise.resolve();
    },
  },
];

export const BENEFICIARY_RULES: Rule[] = [
  {
    validator(_, value: string) {
      const regex1 = /^[a-zA-Z0-9]*$/;
      const convertedValue = value?.trim();

      if (!convertedValue) {
        return Promise.reject(`Please input beneficiary name!`);
      }

      if (!regex1.test(convertedValue)) {
        return Promise.reject(
          `Beneficiary name cannot contain special characters`
        );
      }

      return Promise.resolve();
    },
  },
];

export const ETHEREUM_ADDRESS_RULES: Rule[] = [
  {
    validator(_, value: string) {
      const trimmedValue = value?.trim();

      if (!trimmedValue) {
        return Promise.reject("Please enter the wallet address!");
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedValue)) {
        return Promise.reject("Wrong wallet address");
      }
      return Promise.resolve();
    },
  },
];
