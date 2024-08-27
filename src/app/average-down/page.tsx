'use client'
import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// Components
import {Modal} from '@mui/material'
import Result from '@/browser/components/averageDown/Result'
import Card from '@/browser/components/UI/Card'
import TextField from '@/browser/components/UI/texts/TextField'
import AdditionsProvider from '@/common/context/AdditionsProvider'
import HoldingsProvider from '@/common/context/HoldingsProvider'
import SearchPrice from '@/browser/components/averageDown/SearchPrice'
import Button from '@/browser/components/UI/Button'
// Icons
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import HoldingStocks from '@/browser/components/averageDown/HoldingStocks'

const AddPurchaseREAL = () => {
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
    <div className="flex flex-col gap-2">
      {transactions.map(transaction => {
        return (
          <Card key={transaction.id}>
            추가 매수
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
                value={Number(transaction.price) * Number(transaction.quantity)}
                readOnly
              />
              <RemoveCircleIcon
                color="warning"
                aria-label="Icon To Remove Additional Purchase Field"
                onClick={() => handleRemove(transaction.id)}
                fontSize="small"
              />
            </div>
          </Card>
        )
      })}
      <Button variant="outlined" onClick={addTransaction}>
        <AddCircleOutline />
        <span> 물타기 빈칸 추가하기</span>
      </Button>
    </div>
  )
}
const AverageDownPage = () => {
  const [openModal_searchPrice, setOpenModal_searchPrice] =
    useState<boolean>(false)

  // const [transaction, setTransaction] = useState<Transaction>({
  //   id: 'holding',
  //   price: '',
  //   quantity: ''
  // })

  // const handleOnChange = useCallback(
  //   (key: keyof Transaction, value: string) => {
  //     setTransaction(prevState => ({...prevState, [key]: value}))
  //   },
  //   [transaction]
  // )
  return (
    <HoldingsProvider>
      <AdditionsProvider>
        <div className="flex flex-col gap-3">
          <HoldingStocks />
          <AddPurchaseREAL />
          <Button onClick={() => setOpenModal_searchPrice(true)}>
            종목의 현재 가격 검색하기
          </Button>
          <Result />
        </div>
        <Modal
          open={openModal_searchPrice}
          onClose={() => setOpenModal_searchPrice(false)}>
          <div>
            <SearchPrice />
          </div>
        </Modal>
      </AdditionsProvider>
    </HoldingsProvider>
  )
}

export default AverageDownPage
