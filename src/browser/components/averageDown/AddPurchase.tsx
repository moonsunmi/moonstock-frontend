'use client'

import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// Components
import {Button, Card, TextField} from '@/browser/components/UI'
// Icons
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

export const AddPurchase = () => {
  const [transactions, setTransaction] = useState<ITransaction[]>([
    {id: uuidv4(), price: '', quantity: ''}
  ])

  const addTransaction = () => {
    setTransaction(prevState => [
      ...prevState,
      {id: uuidv4(), price: '', quantity: ''}
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
      <p>추가 매수</p>
      {transactions.map(transaction => {
        return (
          <>
            <hr className="pt-1 pb-1 h-1" />
            <div key={transaction.id}>
              <div className="flex gap-2">
                <TextField
                  className="w-1/3"
                  name="price"
                  placeholder="가격"
                  value={transaction.price}
                  onChange={e =>
                    handleOnChange(transaction.id, 'price', e.target.value)
                  }
                />
                <TextField
                  className="w-1/3"
                  name="quantity"
                  placeholder="수량"
                  value={transaction.quantity}
                  onChange={e =>
                    handleOnChange(transaction.id, 'quantity', e.target.value)
                  }
                />
                <TextField
                  className="w-1/3"
                  name="result"
                  placeholder="총합"
                  value={
                    Number(transaction.price) * Number(transaction.quantity)
                  }
                  readOnly
                />
                <RemoveCircleIcon
                  color="warning"
                  aria-label="Icon To Remove Additional Purchase Field"
                  onClick={() => handleRemove(transaction.id)}
                  fontSize="small"
                />
              </div>
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
