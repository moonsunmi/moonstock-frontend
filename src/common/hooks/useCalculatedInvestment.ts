import {useMemo} from 'react'

const useCalculate = (
  start: ITransaction | ITransaction[],
  end: ITransaction | ITransaction[]
) => {
  const calculateTotal = (transactions: ITransaction[]) => {
    return transactions.reduce(
      (acc, current) => {
        acc.price += current.price
        acc.quantity += current.quantity
        acc.pay += current.price * current.quantity
        return acc
      },
      {price: 0, quantity: 0, pay: 0}
    )
  }

  const totalStart = useMemo(() => {
    const startArray = Array.isArray(start) ? start : [start]
    return calculateTotal(startArray)
  }, [start])
  const totalEnd = useMemo(() => {
    const endArray = Array.isArray(end) ? end : [end]
    return calculateTotal(endArray)
  }, [end])

  const result = useMemo(() => {
    const totalQuantity = totalStart.quantity + totalEnd.quantity
    const totalPrice = totalStart.price + totalEnd.price
    const totalPay = totalStart.pay + totalEnd.pay
    const priceGap = totalEnd.price - totalStart.price
    const quantityGap = totalEnd.quantity - totalStart.quantity
    const averagePrice = totalPay / totalQuantity

    const isValid = totalQuantity !== 0

    return {
      averagePrice,
      priceGap,
      quantityGap,
      totalQuantity,
      totalPrice,
      totalPay,
      isValid
    }
  }, [totalStart, totalEnd])

  return result
}

export default useCalculate
