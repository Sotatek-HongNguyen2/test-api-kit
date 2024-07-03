// import { useState, useEffect } from "react";

const formatNumber = (number: number): string => {
  const numberStr = number.toString();
  const parts = numberStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "00";
  console.log("decimalPart: ", decimalPart);
  if (integerPart === "0" && decimalPart === "00") return "0";
  decimalPart = decimalPart.substring(0, 2);
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${integerPart}.${decimalPart}`;
};

// const useFormattedNumber = (number: number): string => {
//   const [formattedNumber, setFormattedNumber] = useState<string>("");
//   useEffect(() => {
//     setFormattedNumber(formatNumber(number));
//   }, [number]);

//   return formattedNumber;
// };

export default formatNumber;
