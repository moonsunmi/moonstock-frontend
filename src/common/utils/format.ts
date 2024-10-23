export const formatNumber = (value: string | number) => {
  const numberValue =
    typeof value === 'number' ? value.toString() : value.replace(/,/g, '')

  if (isNaN(Number(numberValue))) return value.toString()

  return new Intl.NumberFormat().format(Number(numberValue))
}

export const getDateFormat = (value: Date | null, format: string) => {
  if (value === null) {
    return ''
  }
  const date = new Date(value)

  const year = String(date.getFullYear())
  const month = ('0' + (1 + date.getMonth())).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hour = ('0' + date.getHours()).slice(-2)
  const minute = ('0' + date.getMinutes()).slice(-2)
  const second = ('0' + date.getSeconds()).slice(-2)

  format = format.replace('yyyy', year)
  format = format.replace('yy', year.slice(2))
  format = format.replace('MM', month)
  format = format.replace('dd', day)
  format = format.replace('hh', hour)
  format = format.replace('mm', minute)
  format = format.replace('ss', second)
  return format
}
