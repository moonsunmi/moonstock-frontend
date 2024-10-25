'use client'

import useSWR from 'swr'
// Components
import {ChangeEvent, useEffect, useState} from 'react'
import {getDateFormat} from '@/common/utils'
import {
  Button,
  Dialog as CustomDialog,
  Dialog_Transaction,
  Input,
  Paragraph
} from '@/browser/components/UI'
// Utils
import {formatNumber} from '@/common/utils'

type Transaction = {
  name: string
  type: 'BUY' | 'SELL'
  transactionAt: string
  price: number
  quantity: number
}

const TradingPage = () => {
  const [buyOpen, setBuyOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const transactions: Transaction[] = [
    {
      name: '삼성전자',
      type: 'BUY',
      transactionAt: '2024-02-02',
      price: 30000,
      quantity: 20
    },
    {
      name: '삼성전자',
      type: 'SELL',
      transactionAt: '2024-09-09',
      price: 20000,
      quantity: 50
    }
  ]

  const buys = transactions.filter(transaction => transaction.type === 'BUY')
  const sells = transactions.filter(transaction => transaction.type === 'SELL')

  const handleOnClick_Buy = index => {
    setBuyOpen(true)
    setSelectedIndex(index)
  }

  return (
    <>
      <div className="w-full">
        <div className="flex w-full">
          <div className="w-2/12" />
          <Paragraph type="subtitle" className="w-2/12">
            종목명
          </Paragraph>
          <Paragraph type="subtitle" className="w-2/12">
            거래일
          </Paragraph>
          <Paragraph type="subtitle" className="w-2/12">
            거래금액
          </Paragraph>
          <Paragraph type="subtitle" className="w-2/12">
            보유수량
          </Paragraph>
          <div className="w-2/12" />
        </div>
        <div className="">
          {buys.map((transaction, index) => {
            return (
              <div key={`buy-${index}`} className="flex border-t">
                <Button variant="text" className="w-2/12">
                  매도하기
                </Button>
                <Paragraph className="w-2/12">{transaction.name}</Paragraph>
                <Paragraph className="w-2/12">
                  {transaction.transactionAt}
                </Paragraph>
                <Paragraph className="w-2/12">
                  {formatNumber(transaction.price)}
                </Paragraph>
                <Paragraph className="w-2/12">
                  {formatNumber(transaction.quantity)}
                </Paragraph>
              </div>
            )
          })}
          <div className="p-5 text-center border-t">
            <Button>새 거래 등록하기</Button>
          </div>
          {sells.map((transaction, index) => {
            return (
              <div key={`sell-${index}`} className="flex border-t">
                <div className="w-2/12" />
                <Paragraph className="w-2/12">{transaction.name}</Paragraph>
                <Paragraph className="w-2/12">
                  {transaction.transactionAt}
                </Paragraph>
                <Paragraph className="w-2/12">{transaction.price}</Paragraph>
                <Paragraph className="w-2/12">{transaction.quantity}</Paragraph>
                <Button
                  variant="text"
                  className="w-2/12"
                  onClick={() => handleOnClick_Buy(index)}>
                  매수하기
                </Button>
              </div>
            )
          })}
        </div>
      </div>
      <Dialog_Transaction
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
        defaultPrice={transactions[selectedIndex]?.price}
        defaultQuantity={transactions[selectedIndex]?.quantity}
      />
      {/* <CustomDialog
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
        title=""
        content={`매수`}
        action="추가"
        cancel="취소"
        onAction={() => setBuyOpen(false)}
        onCancel={() => setBuyOpen(false)}
      /> */}
    </>
  )
}

export default TradingPage
