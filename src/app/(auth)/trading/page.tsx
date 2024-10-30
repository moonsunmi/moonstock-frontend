'use client'

import useSWR from 'swr'
// Components
import {ChangeEvent, useEffect, useState} from 'react'
import {getDateFormat} from '@/common/utils'
import {
  Button,
  Dialog as CustomDialog,
  Dialog_Transaction,
  Paragraph
} from '@/browser/components/UI'
// Utils
import {formatNumber} from '@/common/utils'

const TradingPage = () => {
  const [newOpen, setNewOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const {data, error, isLoading} = useSWR<{transactions: Transaction[]}>(
    '/api/users/transactions',
    {fallbackData: {transactions: []}}
  )

  const {transactions} = data

  const buys = transactions.filter(transaction => transaction.type === 'BUY')
  const sells = transactions.filter(transaction => transaction.type === 'SELL')

  const handleOnClick_NewTransact = index => {
    setNewOpen(true)
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
          <Paragraph type="subtitle" className="w-2/12 text-right">
            거래금액
          </Paragraph>
          <Paragraph type="subtitle" className="w-2/12 text-right">
            보유수량
          </Paragraph>
          <div className="w-2/12" />
        </div>
        <div className="">
          {buys.map((transaction, index) => {
            return (
              <div key={`buy-${index}`} className="flex border-t">
                <div className="w-2/12" />
                <Paragraph className="w-2/12">
                  {transaction?.stock?.name}
                </Paragraph>
                <Paragraph className="w-2/12">
                  {getDateFormat(transaction?.transactedAt, 'yyyy.MM.dd')}
                </Paragraph>
                <Paragraph className="w-2/12 text-right">
                  {formatNumber(transaction?.price)}
                </Paragraph>
                <Paragraph className="w-2/12 text-right">
                  {formatNumber(transaction?.quantity)}
                </Paragraph>
                <Button variant="text" className="w-2/12">
                  매도하기
                </Button>
              </div>
            )
          })}
          <div className="p-5 text-center border-t">
            <Button onClick={handleOnClick_NewTransact}>
              새 거래 등록하기
            </Button>
          </div>
          {sells.map((transaction, index) => {
            return (
              <div key={`sell-${index}`} className="flex border-t">
                <div className="w-2/12" />
                <Button variant="text" className="w-2/12">
                  매수하기
                </Button>
                <Paragraph className="w-2/12">
                  {transaction?.stock?.name}
                </Paragraph>
                <Paragraph className="w-2/12">
                  {getDateFormat(transaction?.transactedAt, 'yyyy.MM.dd')}
                </Paragraph>
                <Paragraph className="w-2/12 text-right">
                  {transaction?.price}
                </Paragraph>
                <Paragraph className="w-2/12 text-right">
                  {transaction?.quantity}
                </Paragraph>
              </div>
            )
          })}
        </div>
      </div>
      <Dialog_Transaction
        open={newOpen}
        onClose={() => setNewOpen(false)}
        defaultTicker={transactions[selectedIndex]?.stock?.ticker}
        type={transactions[selectedIndex]?.type === 'BUY' ? 'SELL' : 'BUY'}
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
