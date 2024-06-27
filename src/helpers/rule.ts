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
