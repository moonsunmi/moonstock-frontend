'use client'

import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// Components
import {Button, Card, Input, Output} from '@/browser/components/UI'
// Icons
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

export const AddPurchase = () => {
  const [transactions, setTransaction] = useState<ITransaction[]>([
    {id: uuidv4(), price: 0, quantity: 0}
  ])

  const addTransaction = () => {
    setTransaction(prevState => [
      ...prevState,
      {id: uuidv4(), price: 0, quantity: 0}
    ])
  }

  const handleOnChange = (
    id: string,
    key: keyof ITransaction,
    value: string
  ) => {
    setTransaction(prevState =>
      prevState.map(transaction =>
        transaction.id === id ? {...transaction, [key]: value} : transaction
      )
    )
  }

  const handleRemove = (id: string) => {
    setTransaction(prevState =>
      prevState.filter(transaction => transaction.id !== id)
    )
  }

  return (
    <Card className="flex flex-col gap-2">
      <p className="text-primary-950">추가 매수</p>
      {transactions.map(transaction => {
        console.log(Number(transaction.price) * Number(transaction.quantity))

        return (
          <>
            <hr className="h-1 pt-2 pb-2 border-gray-300" />
            <div key={transaction.id}>
              <form className="flex gap-2">
                <Input
                  id="price"
                  type="number"
                  className="w-1/3"
                  name="price"
                  placeholder="가격"
                  value={transaction.price}
                  onChange={e =>
                    handleOnChange(transaction.id, 'price', e.target.value)
                  }
                />
                <Input
                  id="quantity"
                  type="number"
                  className="w-1/3"
                  name="quantity"
                  placeholder="수량"
                  value={transaction.quantity}
                  onChange={e =>
                    handleOnChange(transaction.id, 'quantity', e.target.value)
                  }
                />
                <Output
                  type="number"
                  className="w-1/3"
                  name="result"
                  placeholder="총합"
                  for="price quantity">
                  {Number(transaction.price) * Number(transaction.quantity)}
                </Output>
                <RemoveCircleIcon
                  className="text-primary-700"
                  aria-label="Icon To Remove Additional Purchase Field"
                  onClick={() => handleRemove(transaction.id)}
                  fontSize="small"
                />
              </form>
            </div>
          </>
        )
      })}
      <div className="h-1" />
      <Button variant="outlined" onClick={addTransaction}>
        <AddCircleOutline />
        물타기 빈칸 추가하기
      </Button>
    </Card>
  )
}
