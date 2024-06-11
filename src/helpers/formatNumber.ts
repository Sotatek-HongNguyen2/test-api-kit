import BigNumber from "bignumber.js";
var bigDecimal = require("bigdecimal");

type IBigNumberArg = string | number | BigNumber;

export const formatRoundFloorDisplay = (
  value: IBigNumberArg,
  decimalPlace = 4,
  shiftedBy = 0
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toFormat();
};

export const formatRoundFloorDisplayWithPrecision = (
  value: IBigNumberArg,
  decimalPlace = 4,
  shiftedBy = 0,
  decimalCount = 0
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toFormat(decimalCount);
};

export const formatRoundFloorDisplayOrderBook = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toFormat(decimalPlace);
};

function roundPriceOrderBook(
  value: any,
  precision: any = 10,
  roundingMode: any
) {
  if (value % precision !== 0) {
    const decimal = new bigDecimal.BigDecimal(0.1 / precision);
    const scale = new bigDecimal.BigDecimal(10 * precision);
    value = new bigDecimal.BigDecimal(value)
      .multiply(decimal)
      .setScale(1, roundingMode)
      .multiply(scale);
  }
  return new BigNumber(value).toString() === "0" ? 1 : new BigNumber(value);
}

export const formatRoundUpOrderBookAsks = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0,
  precision: string | number
): string => {
  if (Number(precision) >= 10) {
    return roundPriceOrderBook(
      value.toString(),
      precision,
      bigDecimal.BigDecimal.ROUND_UP
    ).toString();
  } else {
    return new BigNumber(value || 0)
      .shiftedBy(-shiftedBy)
      .decimalPlaces(decimalPlace, BigNumber.ROUND_UP)
      .toFormat(decimalPlace);
  }
};

export const formatRoundDownOrderBookBids = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0,
  precision: string | number | BigNumber
): string => {
  if (Number(precision) >= 10) {
    return roundPriceOrderBook(
      value.toString(),
      precision,
      bigDecimal.BigDecimal.ROUND_DOWN
    ).toString();
  } else {
    return new BigNumber(value || 0)
      .shiftedBy(-shiftedBy)
      .decimalPlaces(decimalPlace, BigNumber.ROUND_DOWN)
      .toFormat(decimalPlace);
  }
};

export const formatRoundFloorDisplayWithCompare = (
  value: IBigNumberArg,
  decimalPlace = 4,
  shiftedBy = 0
): string => {
  const data = new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toFormat(decimalPlace)
    .toString();
  if (Number(value.toString()) !== 0 && new BigNumber(data).lt(0.01)) {
    return "<0.01";
  }
  return data;
};

export const formatRoundFloorDisplayWithCompareFixed = (
  value: IBigNumberArg,
  decimalPlace = 4,
  shiftedBy = 0
): string => {
  const data = new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .toFixed(decimalPlace);
  if (Number(value.toString()) !== 0 && new BigNumber(data).lt(0.01)) {
    return "<0.01";
  }
  return data;
};

export const convertRoundFloor = (
  value: IBigNumberArg,
  decimalPlace = 4,
  shiftedBy = 0
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toString();
};

export const nFormatter = (
  number: string,
  digits = 4,
  roundingMode?: BigNumber.RoundingMode
) => {
  const SI = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const num = parseFloat(number);
  let i;
  for (i = SI.length - 1; i > 0; i--) {
    if (num >= SI[i].value) {
      break;
    }
  }
  if (roundingMode) {
    return (
      new BigNumber(num)
        .div(SI[i].value)
        .toFixed(digits, roundingMode)
        .toString()
        .replace(rx, "$1") + SI[i].symbol
    );
  }

  return (num / SI[i].value).toFixed(digits).replace(rx, "$1") + SI[i].symbol;
};

export const formatFixedPoint = (number: IBigNumberArg, dp: number) => {
  return new BigNumber(number).toFixed(dp);
};

export const formatPriceRoundDown = (value: any, decimal: number) => {
  const decimalFinal = decimal >= 0 ? decimal : 2;
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    isNaN(Number(value)) ||
    Number(value) === Number.POSITIVE_INFINITY
  )
    return (0).toFixed(decimalFinal);
  if (decimalFinal === 0) return parseInt(value).toLocaleString();
  const numFormat = new BigNumber(value).toFixed(
    decimalFinal || 2,
    BigNumber.ROUND_DOWN
  );
  return numFormat.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const formatRoundDown = (value: any, decimal: number) => {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    isNaN(Number(value))
  )
    return "";
  const numFormat = new BigNumber(value).toFixed(
    decimal >= 0 ? decimal : 2,
    BigNumber.ROUND_DOWN
  );
  return numFormat.toString();
};

export const formatIntBalance = (
  num?: string | number,
  decimal = 4,
  fillZero = 0
) => {
  if (!num) return "0";
  let balanceSplit = String(num).split(".");

  balanceSplit[1] =
    balanceSplit.length > 1 ? balanceSplit[1].slice(0, decimal) : "0";
  num = new BigNumber(`${balanceSplit[0]}.${balanceSplit[1]}`).toFixed();
  balanceSplit = String(num).split(".");

  if (balanceSplit.length === 1 || balanceSplit[1] === "0") {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fillZero,
    });

    return formatter.format(Number(balanceSplit[0]) || 0);
  } else {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
    });
    return `${formatter.format(Number(balanceSplit[0]))}.${balanceSplit[1]}`;
  }
};
