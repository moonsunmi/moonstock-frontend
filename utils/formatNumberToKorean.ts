export const formatNumberToKorean = (number: number | string) => {
  const numType = typeof number === "string" ? parseFloat(number) : number;
  return isNaN(numType) ? "" : new Intl.NumberFormat("ko-kr").format(numType);
};
