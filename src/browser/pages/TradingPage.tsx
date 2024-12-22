'use client'

// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {Dialog_Transaction} from '@/common/dialog'
// Hooks
import useMakeTransaction from '@/common/hooks/etc/useTransactionDialog'
import useTradingTransactions from '@/common/hooks/fetch/useTradingTransactions'
// Etc
import {getDateFormat} from '@/common/utils'
import {TableHeader, TableRow} from '../components/UI/Table'

const TradingPage = ({ticker}: {ticker: string}) => {
  const {state, handleCloseDialog, handleCreateTransact, handleLinkTransact} =
    useMakeTransaction()

  const {stock, buys, sells, error, isLoading} = useTradingTransactions(ticker)

  const columns: {
    key: keyof ITransaction | 'buyButton' | 'sellButton'
    header: string
    className: string
    render?: (row: ITransaction) => React.ReactNode
  }[] = [
    {
      key: 'buyButton',
      header: '',
      className: 'w-1/5',
      render: row =>
        row?.type === 'SELL' ? (
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => handleLinkTransact(row)}>
            매수하기
          </Button>
        ) : null
    },
    {key: 'transactedAt', header: '거래일', className: 'w-1/5'},
    {key: 'price', header: '거래금액', className: 'w-1/5'},
    {key: 'quantity', header: '보유수량', className: 'w-1/5'},
    {
      key: 'sellButton',
      header: '',
      className: 'w-1/5',
      render: row =>
        row?.type === 'BUY' ? (
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => handleLinkTransact(row)}>
            매도하기
          </Button>
        ) : null
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
          <TableHeader columns={columns} />
          <tbody>
            {buys.map(buy => {
              return <TableRow key={buy.id} row={buy} columns={columns} />
            })}
            <tr>
              <td colSpan={columns.length}>
                <Button onClick={handleCreateTransact}>새 거래 등록하기</Button>
              </td>
            </tr>
            {sells.map(sell => {
              return <TableRow key={sell.id} row={sell} columns={columns} />
            })}
          </tbody>
        </table>
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

export default TradingPage
