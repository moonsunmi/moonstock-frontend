'use client'

import {useReducer, useState} from 'react'
// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {Dialog_Transaction} from '@/common/dialog'
// Hooks
import useMakeTransaction from '@/common/hooks/etc/useTransactionDialog'
import useTradingTransactions from '@/common/hooks/fetch/useTradingTransactions'
// Etc
import {formatNumber, getDateFormat} from '@/common/utils'

const TradingPage = ({ticker}: {ticker: string}) => {
  const {state, handleCloseDialog, handleCreateTransact, handleLinkTransact} =
    useMakeTransaction()

  const {stock, buys, sells, error, isLoading} = useTradingTransactions(ticker)

  // todo. 매수를 매도로 매칭해줘도, 다른 transactions로 추가되어 나오는 현상 수정해야 함.
  return (
    <>
      <div className="w-full">
        <Paragraph variant="title">
          {`${stock?.name}(${stock?.ticker})`}
        </Paragraph>
        <Titles />
        {error && <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>}
        {!error && (
          <div className="">
            {buys?.length > 0 && (
              <BuyTransactions
                buys={buys}
                handleLinkTransact={handleLinkTransact}
              />
            )}
            <div className="p-5 text-center border-t">
              <Button onClick={handleCreateTransact}>새 거래 등록하기</Button>
            </div>
            {sells?.length > 0 && (
              <SellTransactions
                sells={sells}
                handleLinkTransact={handleLinkTransact}
              />
            )}
          </div>
        )}
      </div>
      <Dialog_Transaction
        open={state.dialogOpen}
        onClose={handleCloseDialog}
        defaultTicker={ticker}
        matchTransaction={state.selectedTransaction}
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

const BuyTransactions = ({buys, handleLinkTransact}) => {
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
              onClick={() => handleLinkTransact(transaction)}>
              매도하기
            </Button>
          </div>
        )
      })}
    </>
  )
}

const SellTransactions = ({sells, handleLinkTransact}) => {
  return (
    <>
      {sells.map((transaction, index) => {
        return (
          <div key={`sell-${index}`} className="flex border-t">
            <Button
              variant="text"
              className="w-1/5"
              onClick={() => handleLinkTransact(transaction)}>
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

const Transaction = ({transaction}: {transaction: ITransaction}) => {
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

export default TradingPage
