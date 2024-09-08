export const formatNumber = (value: string | number) => {
  const numberValue =
    typeof value === 'number' ? value.toString() : value.replace(/,/g, '')

  if (isNaN(Number(numberValue))) return value.toString()

  return new Intl.NumberFormat().format(Number(numberValue))
}
