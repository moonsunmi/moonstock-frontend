'use client'

import {useCallback, useState} from 'react'

import Card from '../UI/Card'
import TextField from '../UI/texts/TextField'

const HoldingStocks = () => {
  const [transaction, setTransaction] = useState<ITransaction>({
    id: 'holding',
    price: '',
    quantity: ''
  })

  const handleOnChange = useCallback(
    (key: keyof ITransaction, value: string) => {
      setTransaction(prevState => ({...prevState, [key]: value}))
    },
    [transaction]
  )
  return (
    <Card>
      보유 주식
      <div className="flex gap-2">
        <TextField
          className="w-1/3"
          name="price"
          placeholder="가격"
          value={transaction.price}
          onChange={e => handleOnChange('price', e.target.value)}
        />
        <TextField
          className="w-1/3"
          name="quantity"
          placeholder="수량"
          value={transaction.quantity}
          onChange={e => handleOnChange('quantity', e.target.value)}
        />
        <TextField
          className="w-1/3"
          name="result"
          placeholder="총합"
          value={Number(transaction.price) * Number(transaction.quantity)}
          readOnly
        />
      </div>
    </Card>
  )
}
export default HoldingStocks
