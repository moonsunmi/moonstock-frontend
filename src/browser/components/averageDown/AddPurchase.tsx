'use client'

import {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
// Redux
import {useSelector} from '@/store/store'
// Components
import {Button, Card, Input, Output, Paragraph} from '@/browser/components/UI'
import {Modal, TextField} from '@mui/material'
import SearchPrice from './SearchPrice'
// Icons
import {AddCircleOutline, RemoveCircle} from '@mui/icons-material'
// Hooks
import useCalculatedInvestment from '@/common/hooks/useCalculatedInvestment'
// Utils
import {formatNumber} from '@/common/utils'

export const AddPurchase = () => {
  const {userInfo} = useSelector(state => state.auth)
  const [openModal_searchPrice, setOpenModal_searchPrice] =
    useState<boolean>(false)

  const [holding, setHolding] = useState<ITransaction>({
    id: 'holding',
    price: 0,
    quantity: 0
  })
  const [transactions, setTransactions] = useState<ITransaction[]>([
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
    key: keyof ITransaction,
    value: string
  ) => {
    setTransactions(prevState =>
      prevState.map(transaction =>
        transaction.id === id
          ? {...transaction, [key]: Number(value)}
          : transaction
      )
    )
  }

  const handleOnChange_Holding = useCallback(
    (key: keyof ITransaction, value: string) => {
      setHolding(prevState => ({...prevState, [key]: Number(value)}))
    },
    [holding]
  )

  return (
    <>
      <Paragraph>
        {userInfo['id'] !== null && `${userInfo.name}님 환영합니다.`}
      </Paragraph>
      <div className="flex">
        <Paragraph type="title" className="w-full">
          보유 주식
        </Paragraph>
        <div className="flex gap-2">
          <Button size="sm">보유 주식 불러오기</Button>
          <Button size="sm" onClick={() => setOpenModal_searchPrice(true)}>
            현재 가격 입력할 종목 찾기
          </Button>
        </div>
      </div>
      <hr className="h-1 pt-2 pb-2 border-secondary-300" />
      <Card className="flex w-full gap-2">
        <Input
          type="number"
          className="w-full"
          name="price"
          label="가격"
          value={holding.price}
          onChange={e => handleOnChange_Holding('price', e.target.value)}
        />
        <Input
          type="number"
          className="w-1/3"
          name="quantity"
          label="수량"
          value={holding.quantity}
          onChange={e => handleOnChange_Holding('quantity', e.target.value)}
        />
        <Output type="number" label="투자금" className="w-1/3">
          {Number(holding.price) * Number(holding.quantity)}
        </Output>
      </Card>
      <div className="flex">
        <Paragraph type="title" className="w-full">
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
                  onChange={e =>
                    handleOnChange_Transaction(
                      transaction.id,
                      'price',
                      e.target.value
                    )
                  }
                />
                <Input
                  id="quantity"
                  type="number"
                  className="w-1/3"
                  name="quantity"
                  label="수량"
                  value={transaction.quantity}
                  onChange={e =>
                    handleOnChange_Transaction(
                      transaction.id,
                      'quantity',
                      e.target.value
                    )
                  }
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
        <Paragraph type="title" className="w-full">
          물타기 결과
        </Paragraph>
        <hr className="h-1 pt-2 pb-2 border-secondary-300" />
        {isValid ? (
          <div className="flex flex-row gap-3">
            <Card className="w-1/3">
              <Paragraph type="caption">평균 단가</Paragraph>
              <Paragraph type="body">{formatNumber(averagePrice)}원</Paragraph>
            </Card>
            <Card className="w-1/3">
              <Paragraph type="caption">총 개수</Paragraph>
              <Paragraph type="body">{formatNumber(totalQuantity)}개</Paragraph>
            </Card>
            <Card className="w-1/3">
              <Paragraph type="caption">총 투자금</Paragraph>
              <Paragraph type="body">{formatNumber(totalPay)}원</Paragraph>
            </Card>
          </div>
        ) : (
          <Paragraph type="body">보유 주식 정보를 입력해 주세요.</Paragraph>
        )}
      </div>
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
