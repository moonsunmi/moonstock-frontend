'use client'

import {usePathname, useRouter} from 'next/navigation'
import {formatNumber, getDateFormat} from '@/utils'
import useMatchedTrade from '@/features/trade/hooks/useMatchedTrade'
import classNames from 'classnames'
import {Paragraph} from '../../components/ui'

const MatchedPage = ({ticker}: {ticker: string}) => {
  const router = useRouter()
  const path = usePathname()

  const {matched, stock, error, isLoading, mutate} = useMatchedTrade(ticker)

  const handleOnClick = (id: string) => {
    router.push(`${path}/${id}`)
  }

  return (
    <div className="w-full">
      <Paragraph variant="title" className="pb-4">
        {`${stock?.name}(${stock?.ticker})`}
      </Paragraph>
      <Titles />
      {error && <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>}
      {!error &&
        matched.map(transaction => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            handleOnClick={() => handleOnClick(transaction.id)}
          />
        ))}
    </div>
  )
}

const Titles = () => {
  const columns = [
    '매수일',
    '금액',
    '매도일',
    '금액',
    '개수',
    '총 수익',
    '수익률'
  ]
  return (
    <div className="grid grid-cols-8 px-4 py-2 text-sm font-medium text-right text-gray-700 bg-primary-100">
      {columns.map((col, i) => (
        <div key={i}>{col}</div>
      ))}
    </div>
  )
}

const Transaction = ({
  transaction,
  handleOnClick
}: {
  transaction: IMatchedTrade
  handleOnClick: (id: string) => void
}) => {
  const buy = transaction.buyTrade
  const sell = transaction.sellTrade
  const quantity = buy.quantity
  const buyAmount = buy.price * quantity
  const profitPerUnit = sell.price - buy.price
  const totalProfit = profitPerUnit * quantity
  const rateOfProfit = (totalProfit / buyAmount) * 100

  return (
    <div
      className={classNames(
        'grid grid-cols-8 items-center py-2 px-4 text-sm border-b hover:bg-gray-50 cursor-pointer',
        totalProfit >= 0 ? 'text-red-600' : 'text-blue-600'
      )}
      onClick={() => handleOnClick(transaction.id)}>
      <div className="text-right">{getDateFormat(buy.tradeAt, 'yy.MM.dd')}</div>
      <div className="text-right">{formatNumber(buy.price)}</div>
      <div className="text-right">
        {getDateFormat(sell.tradeAt, 'yy.MM.dd')}
      </div>
      <div className="text-right">{formatNumber(sell.price)}</div>
      <div className="text-right">{formatNumber(quantity)}</div>
      <div className="text-right">{formatNumber(totalProfit)}원</div>
      <div className="text-right">{formatNumber(rateOfProfit)}%</div>
    </div>
  )
}

export default MatchedPage
