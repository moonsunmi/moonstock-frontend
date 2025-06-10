'use client'

import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Button, Card, Input, Output, Paragraph} from '@/components/ui'
import {Modal} from '@mui/material'
import SearchPrice from '@/components/averageDown/SearchPrice'
import {RemoveCircle} from '@mui/icons-material'
import useCalculatedInvestment from '@/common/hooks/useCalculatedInvestment'
import {formatNumber} from '@/utils/format'

const AverageDownPage = () => {
  const [openModal_searchPrice, setOpenModal_searchPrice] =
    useState<boolean>(false)

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
    [holding]
  )

  return (
    <div className="flex flex-col w-full gap-3 p-4">
      <div className="flex">
        <Paragraph variant="title" className="w-full">
          보유 주식
        </Paragraph>
      </div>
      <hr className="h-1 pt-2 pb-2 border-secondary-300" />
      <Card className="flex w-full gap-2">
        <Input
          type="number"
          className="w-full"
          name="price"
          label="가격"
          value={holding.price || ''}
          onChange={e => handleOnChange_Holding('price', e.target.value)}
        />
        <Input
          type="number"
          className="w-1/3"
          name="quantity"
          label="수량"
          value={holding.quantity || ''}
          onChange={e => handleOnChange_Holding('quantity', e.target.value)}
        />
        <Output type="number" label="투자금" className="w-1/3">
          {Number(holding.price) * Number(holding.quantity)}
        </Output>
      </Card>
      <div className="flex">
        <Paragraph variant="title" className="w-full">
          추가 매수
        </Paragraph>
        <Button size="sm" onClick={addTransaction}>
          {/* <AddCircleOutline fontSize="small" /> */}
          물타기 빈칸 추가하기
        </Button>
      </div>
      <hr className="h-1 pt-2 pb-2 border-secondary-300" />
      <div className="flex flex-col gap-2">
        {transactions.map(transaction => {
          return (
            <Card key={transaction.id}>
              <form className="flex gap-2">
                <Input
                  id="price"
                  type="number"
                  className="w-1/3"
                  name="price"
                  label="가격"
                  value={transaction.price || ''}
                  onChange={e => handleOnChange_Transaction(transaction.id, e)}
                />
                <Input
                  id="quantity"
                  type="number"
                  className="w-1/3"
                  name="quantity"
                  label="수량"
                  value={transaction.quantity || ''}
                  onChange={e => handleOnChange_Transaction(transaction.id, e)}
                />
                <Output type="number" label="투자금" className="w-1/3">
                  {Number(transaction.price) * Number(transaction.quantity)}
                </Output>
                <RemoveCircle
                  className="text-primary-700"
                  aria-label="Icon To Remove Additional Purchase Field"
                  onClick={() => handleRemove(transaction.id)}
                  fontSize="small"
                />
              </form>
            </Card>
          )
        })}
      </div>
      <div aria-label="Investment Report">
        <hr className="h-1 pt-4 pb-2 border-secondary-300" />
        {isValid ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Card>
              <Paragraph variant="caption">평균 단가</Paragraph>
              <Paragraph variant="body">
                {formatNumber(averagePrice)}원
              </Paragraph>
            </Card>
            <Card>
              <Paragraph variant="caption">총 개수</Paragraph>
              <Paragraph variant="body">
                {formatNumber(totalQuantity)}개
              </Paragraph>
            </Card>
            <Card>
              <Paragraph variant="caption">총 투자금</Paragraph>
              <Paragraph variant="body">{formatNumber(totalPay)}원</Paragraph>
            </Card>
          </div>
        ) : (
          <Paragraph variant="body">보유 주식 정보를 입력해 주세요.</Paragraph>
        )}
      </div>
      <Modal
        open={openModal_searchPrice}
        onClose={() => setOpenModal_searchPrice(false)}>
        <div>
          <SearchPrice />
        </div>
      </Modal>
    </div>
  )
}

export default AverageDownPage
