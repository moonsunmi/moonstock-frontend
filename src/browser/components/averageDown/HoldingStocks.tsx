'use client'

import {useCallback, useState} from 'react'

import {Button, Card, Input} from '../UI'
import {Modal} from '@mui/material'
import SearchPrice from './SearchPrice'

const HoldingStocks = () => {
  const [openModal_searchPrice, setOpenModal_searchPrice] =
    useState<boolean>(false)

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
    <>
      <Card>
        <p className="text-primary-950">보유 주식</p>
        <div className="flex gap-2">
          <Input
            type="number"
            className="w-1/3"
            name="price"
            placeholder="가격"
            value={transaction.price}
            onChange={e => handleOnChange('price', e.target.value)}
          />
          <Input
            type="number"
            className="w-1/3"
            name="quantity"
            placeholder="수량"
            value={transaction.quantity}
            onChange={e => handleOnChange('quantity', e.target.value)}
          />
          <Input
            type="number"
            className="w-1/3"
            name="result"
            placeholder="총합"
            value={Number(transaction.price) * Number(transaction.quantity)}
            readOnly
          />
        </div>
        <Button size="sm" onClick={() => setOpenModal_searchPrice(true)}>
          현재 가격 입력할 종목 찾기
        </Button>
      </Card>
      <Modal
        open={openModal_searchPrice}
        onClose={() => setOpenModal_searchPrice(false)}>
        <div>
          <SearchPrice />
        </div>
      </Modal>
    </>
  )
}
export default HoldingStocks
