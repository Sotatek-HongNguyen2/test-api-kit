// import { useState, useEffect } from "react";

import BigNumber from "bignumber.js";

// const formatNumber = (number: number): string => {
//   const numberStr = number.toString();
//   const parts = numberStr.split(".");
//   let integerPart = parts[0];
//   let decimalPart = parts[1] || "00";
//   if (integerPart === "0" && decimalPart === "00") return "0";
//   decimalPart = decimalPart.substring(0, 3);
//   integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return `${integerPart}.${decimalPart}`;
// };

const formatNumber = (number: number): string => {
  const bigNumber = new BigNumber(number);

  if (bigNumber.isGreaterThan(0) && bigNumber.isLessThan(0.001))
    return "< 0.001";

  const suffixes = ["", "M", "B", "T", "q", "Q", "s", "S"];
  let suffixIndex = 0;
  let displayNumber = bigNumber;

  while (
    displayNumber.isGreaterThanOrEqualTo(1000000) &&
    suffixIndex < suffixes.length - 1
  ) {
    displayNumber = displayNumber.dividedBy(1000000);
    suffixIndex++;
  }

  displayNumber = displayNumber.decimalPlaces(3);

  const numberStr = displayNumber.toString();
  const parts = numberStr.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] || "";

  if (suffixIndex === 0) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return decimalPart
    ? `${integerPart}.${decimalPart}${suffixes[suffixIndex]}`
    : `${integerPart}${suffixes[suffixIndex]}`;
};

// const useFormattedNumber = (number: number): string => {
//   const [formattedNumber, setFormattedNumber] = useState<string>("");
//   useEffect(() => {
//     setFormattedNumber(formatNumber(number));
//   }, [number]);

//   return formattedNumber;
// };

export default formatNumber;
