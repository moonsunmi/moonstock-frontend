export const formatNumToKR = (value: number | string, fixed: number = 2) => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  const fixedNumber = Number(number.toFixed(fixed));
  return isNaN(fixedNumber)
    ? ""
    : new Intl.NumberFormat("ko-kr").format(fixedNumber);
};
