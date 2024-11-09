'use client'

import useSWR from 'swr'
// Components
import {useState} from 'react'
import {getDateFormat} from '@/common/utils'
import {
  Button,
  Dialog as CustomDialog,
  Paragraph
} from '@/browser/components/UI'
// Utils
import {formatNumber} from '@/common/utils'
import {Dialog_Transaction} from '@/common/dialog'

const TradingTickerPage = ({ticker}: {ticker: string}) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const {data, error, isLoading} = useSWR<{transactions: ITransaction[]}>(
    `/api/users/transactions/${ticker}`,
    {fallbackData: {transactions: []}}
  )

  const {transactions} = data

  const buys = transactions.filter(transaction => transaction.type === 'BUY')
  const sells = transactions.filter(transaction => transaction.type === 'SELL')

  const handleOnClick_CreateTransact = () => {
    setSelectedIndex(null)
    setLinkOpen(true)
  }
  const handleOnClick_LinkTransact = index => {
    setSelectedIndex(index)
    setLinkOpen(true)
  }

  return (
    <>
      <div className="w-full">
        <Paragraph variant="title">{ticker}</Paragraph>
        <div className="flex w-full">
          <div className="w-1/5" />
          <Paragraph variant="subtitle" className="w-1/5">
            거래일
          </Paragraph>
          <Paragraph variant="subtitle" className="w-1/5 text-right">
            거래금액
          </Paragraph>
          <Paragraph variant="subtitle" className="w-1/5 text-right">
            보유수량
          </Paragraph>
          <div className="w-1/5" />
        </div>
        <div className="">
          {buys.map((transaction, index) => {
            return (
              <div key={`buy-${index}`} className="flex border-t">
                <div className="w-1/5" />
                <Paragraph className="w-1/5">
                  {getDateFormat(transaction?.transactedAt, 'yyyy.MM.dd')}
                </Paragraph>
                <Paragraph className="w-1/5 text-right">
                  {formatNumber(transaction?.price)}
                </Paragraph>
                <Paragraph className="w-1/5 text-right">
                  {formatNumber(transaction?.quantity)}
                </Paragraph>
                <Button
                  variant="text"
                  className="w-1/5"
                  onClick={() => handleOnClick_LinkTransact(index)}>
                  매도하기
                </Button>
              </div>
            )
          })}
          <div className="p-5 text-center border-t">
            <Button onClick={handleOnClick_CreateTransact}>
              새 거래 등록하기
            </Button>
          </div>
          {sells.map((transaction, index) => {
            return (
              <div key={`sell-${index}`} className="flex border-t">
                <Button variant="text" className="w-1/5">
                  매수하기
                </Button>
                <Paragraph className="w-1/5">
                  {getDateFormat(transaction?.transactedAt, 'yyyy.MM.dd')}
                </Paragraph>
                <Paragraph className="w-1/5 text-right">
                  {transaction?.price}
                </Paragraph>
                <Paragraph className="w-1/5 text-right">
                  {transaction?.quantity}
                </Paragraph>
                <div className="w-1/5" />
              </div>
            )
          })}
        </div>
      </div>
      <Dialog_Transaction
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        ticker={ticker}
        defaultTransaction={selectedIndex ? transactions[selectedIndex] : null}
      />
    </>
  )
}

export default TradingTickerPage
