'use client'

import {useState} from 'react'
// Redux
import {useTypedSelector} from '@/store/store'
// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {Dialog_Transaction} from '@/common/dialog'
// Hooks
import useTradingTransactions from '@/common/hooks/fetch/useTradingTransactions'
// Ects
import {formatNumber, getDateFormat} from '@/common/utils'

const TradingTickerPage = ({ticker}: {ticker: string}) => {
  const [linkOpen, setLinkOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const {stock, buys, sells, error, isLoading} = useTradingTransactions(ticker)

  const handleOnClick_CreateTransact = () => {
    setSelected(null)
    setLinkOpen(true)
  }
  const handleOnClick_LinkTransact = (transaction: ITransaction) => {
    setSelected(transaction)
    setLinkOpen(true)
  }

  return (
    <>
      <div className="w-full">
        <Paragraph variant="title">
          {`${stock?.name}(${stock?.ticker})`}
        </Paragraph>
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
                  onClick={() => handleOnClick_LinkTransact(transaction)}>
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
        defaultTicker={ticker}
        defaultTransaction={selected}
      />
    </>
  )
}

export default TradingTickerPage
