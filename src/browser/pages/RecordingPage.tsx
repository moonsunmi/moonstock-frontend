'use client'

// Hooks
import useDoneTransactions from '@/common/hooks/fetch/useDoneTransactions'
import {Paragraph} from '../components/UI'
import {formatNumber, getDateFormat} from '@/common/utils'

const RecordingPage = ({ticker}: {ticker: string}) => {
  const {transactions, total, stock, error, isLoading, mutate} =
    useDoneTransactions(ticker)

  return (
    <>
      <div className="w-full">
        <Header stock={stock} total={total} />
        <Titles />
        {error && <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>}
        {!error && (
          <div className="">
            {transactions.map(transaction => {
              return <Transaction transaction={transaction} />
            })}
          </div>
        )}
      </div>
    </>
  )
}

const Header = ({stock, total}) => {
  return (
    <div className="flex justify-between align-bottom">
      <div className="h-full bg-gray-200 w-fit">
        <Paragraph variant="header">{`${stock?.name}(${stock?.ticker})`}</Paragraph>
      </div>
      <div>
        <Paragraph>누적 수익: {formatNumber(total?.profit)}원</Paragraph>
      </div>
    </div>
  )
}

const Titles = () => {
  return (
    <div className="flex w-full bg-primary-100">
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매수일
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매도일
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매수가격
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매도가격
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        수량
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매수금액
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        매도금액
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        주당 수익
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        총 수익
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        투자일
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        수익률
      </Paragraph>
      <Paragraph variant="subtitle" className="w-1/12 text-right">
        연환산
      </Paragraph>
    </div>
  )
}

const Transaction = ({transaction}: {transaction: IRecording}) => {
  return (
    <div className="flex border border-t-primary-900">
      <Paragraph className="w-1/12 text-right">
        {getDateFormat(transaction?.buyCreatedAt, 'yy.MM.dd')}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {getDateFormat(transaction?.sellCreatedAt, 'yy.MM.dd')}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.buyPrice)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.sellPrice)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.quantity)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.buyPrice * transaction?.quantity)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.sellPrice * transaction?.quantity)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.profit)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.profit * transaction?.quantity)}
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.duration)}일
      </Paragraph>
      <Paragraph className="w-1/12 text-right">
        {formatNumber(transaction?.rateOfProfit * 100)}%
      </Paragraph>
      <Paragraph className="w-1/12 text-right">기타 </Paragraph>
    </div>
  )
}

export default RecordingPage
