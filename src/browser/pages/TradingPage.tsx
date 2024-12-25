'use client'

// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {TableHeader, TableRow} from '@/browser/components/UI/Table'
// Hooks
import useTradingTransactions from '@/common/hooks/api/useTradingTransactions'
// Etc
import {formatNumber, getDateFormat} from '@/common/utils'
import {useTypedDispatch} from '@/store/store'
import {createTransaction, matchTransaction} from '@/store/slices/dialogSlice'

const TradingPage = ({ticker}: {ticker: string}) => {
  const dispatch = useTypedDispatch()
  const {stock, buys, sells, error, isLoading} = useTradingTransactions(ticker)

  const columns: {
    key: keyof ITransaction | 'buyButton' | 'sellButton'
    header: string
    className?: string
    render?: (row: ITransaction) => React.ReactNode
  }[] = [
    {
      key: 'buyButton',
      header: '',
      render: row =>
        row?.type === 'SELL' ? (
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => dispatch(matchTransaction(row))}>
            매수하기
          </Button>
        ) : null,
      className: 'text-center'
    },
    {
      key: 'transactedAt',
      header: '거래일',
      render: row => getDateFormat(row.transactedAt, 'yy.MM.dd')
    },
    {
      key: 'price',
      header: '거래금액',
      render: row => formatNumber(row.price),
      className: 'text-right'
    },
    {
      key: 'quantity',
      header: '보유수량',
      render: row => formatNumber(row.quantity),
      className: 'text-right'
    },
    {
      key: 'sellButton',
      header: '',
      render: row =>
        row?.type === 'BUY' ? (
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => dispatch(matchTransaction(row))}>
            매도하기
          </Button>
        ) : null,
      className: 'text-center'
    }
  ]

  if (error) {
    return (
      <table>
        <TableHeader columns={columns} />
        <tbody>
          <tr>
            <td colSpan={columns.length}>
              오류가 발생했습니다. 나중에 다시 시도해 주세요.
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="w-full">
        <Paragraph variant="title">
          {`${stock?.name}(${stock?.ticker})`}
        </Paragraph>
        <table className="w-full">
          <TableHeader columns={columns} className="" />
          <tbody>
            {buys.map(buy => {
              return <TableRow key={buy.id} row={buy} columns={columns} />
            })}
            <tr>
              <td colSpan={columns.length} className="text-center">
                <Button onClick={() => dispatch(createTransaction())}>
                  새 거래 등록하기
                </Button>
              </td>
              {/* <TableCell
                colSpan={columns.length}
                className="text-center"
                render={
                  <Button onClick={handleCreateTransact}>
                    새 거래 등록하기
                  </Button>
                }></TableCell> */}
            </tr>
            {sells.map(sell => {
              return <TableRow key={sell.id} row={sell} columns={columns} />
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TradingPage
