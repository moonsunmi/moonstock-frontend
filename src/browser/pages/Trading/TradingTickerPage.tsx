'use client'

import {useState} from 'react'
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

  // todo. 매수를 매도로 매칭해줘도, 다른 transactions로 추가되어 나오는 현상 수정해야 함.
  return (
    <>
      <div className="w-full">
        <Paragraph variant="title">
          {`${stock?.name}(${stock?.ticker})`}
        </Paragraph>
        <Titles />
        {error && <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>}
        <div className="">
          {buys?.length > 0 && (
            <BuyTransactions
              buys={buys}
              handleOnClick_LinkTransact={handleOnClick_LinkTransact}
            />
          )}
          <div className="p-5 text-center border-t">
            <Button onClick={handleOnClick_CreateTransact}>
              새 거래 등록하기
            </Button>
          </div>
          {sells?.length > 0 && (
            <SellTransactions
              sells={sells}
              handleOnClick_LinkTransact={handleOnClick_LinkTransact}
            />
          )}
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

const Titles = () => {
  return (
    <div className="flex w-full">
      <Blank />
      <Paragraph variant="subtitle" className="w-1/5">
        거래일
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/5 text-right">
        거래금액
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/5 text-right">
        보유수량
      </Paragraph>
      <Blank />
    </div>
  )
}

const BuyTransactions = ({buys, handleOnClick_LinkTransact}) => {
  return (
    <>
      {buys.map((transaction, index) => {
        return (
          <div key={`buy-${index}`} className="flex border-t">
            <Blank />
            <Transaction transaction={transaction} />
            <Button
              variant="text"
              className="w-1/5"
              onClick={() => handleOnClick_LinkTransact(transaction)}>
              매도하기
            </Button>
          </div>
        )
      })}
    </>
  )
}

const SellTransactions = ({sells, handleOnClick_LinkTransact}) => {
  return (
    <>
      {sells.map((transaction, index) => {
        return (
          <div key={`sell-${index}`} className="flex border-t">
            <Button
              variant="text"
              className="w-1/5"
              onClick={() => handleOnClick_LinkTransact(transaction)}>
              매수하기
            </Button>
            <Transaction transaction={transaction} />
            <Blank />
          </div>
        )
      })}
    </>
  )
}

const Transaction = ({transaction}) => {
  return (
    <>
      <Paragraph className="w-1/5">
        {getDateFormat(transaction?.transactedAt, 'yyyy.MM.dd')}
      </Paragraph>
      <Paragraph className="w-1/5 text-right">{transaction?.price}</Paragraph>
      <Paragraph className="w-1/5 text-right">
        {transaction?.quantity}
      </Paragraph>
    </>
  )
}

const Blank = () => {
  return <div className="w-1/5" />
}

export default TradingTickerPage
