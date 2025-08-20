'use client'

import useCalculatedInvestment from '@/common/hooks/useCalculatedInvestment'
import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

const useAverageDown = () => {
  const [holding, setHolding] = useState<ISimpleTrade>({
    id: 'holding',
    price: 0,
    quantity: 0
  })
  const [transactions, setTransactions] = useState<ISimpleTrade[]>([
    {id: uuidv4(), price: 0, quantity: 0}
  ])

  const {averagePrice, totalQuantity, totalPay, isValid} =
    useCalculatedInvestment(holding, transactions)

  const addTransaction = () => {
    setTransactions(prevState => [
      ...prevState,
      {id: uuidv4(), price: 0, quantity: 0}
    ])
  }

  const handleRemove = (id: string) => {
    setTransactions(prevState =>
      prevState.filter(transaction => transaction.id !== id)
    )
  }

  const handleOnChange_Transaction = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target

    setTransactions(prevState =>
      prevState.map(transaction =>
        transaction.id === id
          ? {...transaction, [name]: Number(value)}
          : transaction
      )
    )
  }

  const handleOnChange_Holding = useCallback(
    (key: keyof ITrade, value: string) => {
      setHolding(prevState => ({...prevState, [key]: Number(value)}))
    },
    []
  )

  return {
    holding,
    transactions,
    averagePrice,
    totalQuantity,
    totalPay,
    isValid,
    addTransaction,
    handleRemove,
    handleOnChange_Transaction,
    handleOnChange_Holding
  }
}
export default useAverageDown
