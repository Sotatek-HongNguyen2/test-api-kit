import BigNumber from "bignumber.js";

export const zeroCutterEnd = (value: string) => {
  const dotIndex = value.indexOf(".");
  if (dotIndex < 1) return value;

  let lastZeroIndex = 0;

  for (let i = value.length - 1; i >= 0; i--) {
    if (value.charAt(i) === ".") {
      lastZeroIndex = i;
      break;
    }
    if (value.charAt(i) !== "0") {
      lastZeroIndex = i + 1;
      break;
    }
  }
  return value.substring(0, lastZeroIndex);
};

export const formWei = (amount: string | number, decimal: string | number) => {
  decimal = typeof decimal === "number" ? decimal : parseInt(decimal);
  if (decimal != 0) {
    const amountToBN = new BigNumber(amount);
    const decimalPow = "1" + "0".repeat(decimal);

    const decimalToBN = new BigNumber(decimalPow);
    const newAmount = amountToBN.dividedBy(decimalToBN);
    return zeroCutterEnd(newAmount.toString());
  }

  if (amount.toString()?.indexOf(".") != -1) {
    amount = typeof amount === "string" ? Number(amount) : amount;
    return (amount - (amount % 1) + 1).toString();
  }
  return zeroCutterEnd(amount.toString());
};

export const serializeFormQuery = (params: any) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};
