'use client'

import {useState} from 'react'
// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {TableHeader, TableRow} from '@/browser/components/UI/Table'
// Hooks
import useTrading from '@/common/hooks/api/useTrading'
// Etc
import {formatNumber, getDateFormat} from '@/common/utils'
import {Menu, MenuItem} from '@mui/material'
import {initTransaction} from '@/common/lib/initData'
import useTradeDialog from '@/stores/useTradeDialogStore'

const GAP_PERCENT = 0.05 // todo. api로

const TradingPage = ({ticker}: {ticker: string}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null)

  const {stock, tradings, error, isLoading} = useTrading(ticker)
  const {openDialog} = useTradeDialog()

  const handleBuy = () => {
    openDialog('create', {...initTransaction, stockTicker: ticker})
  }
  const handleUpdate = (row: ITransaction) => {
    openDialog('update', row)
  }
  const handleSell = (row: ITransaction) => {
    openDialog('create', row)
  }

  const handleDelete = () => {
    // openDialog('delete')
  }

  // const handleMoreClick = (
  //   event: React.MouseEvent<HTMLElement>,
  //   transaction: ITransaction
  // ) => {
  //   setAnchorEl(event.currentTarget)
  //   setSelectedTransaction(transaction)
  // }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTransaction(null)
  }

  const columns: {
    key: keyof ITransaction | 'updateButton' | 'more' | 'targetPrice'
    header: string
    className?: string
    render?: (row: ITransaction) => React.ReactNode
  }[] = [
    {
      key: 'tradeDate',
      header: '거래일',
      render: row => getDateFormat(row.tradeDate, 'yy.MM.dd')
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
      key: 'targetPrice',
      header: '목표 매도 가격',
      render: row => formatNumber(row.price * (1 + GAP_PERCENT)),
      className: 'text-right'
    },
    {
      key: 'updateButton',
      header: '',
      render: row => (
        <>
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => handleUpdate(row)}>
            수정하기
          </Button>
        </>
      ),
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
            {tradings.map(buy => {
              return <TableRow key={buy.id} row={buy} columns={columns} />
            })}
            <tr>
              <td colSpan={columns.length} className="text-center">
                <Paragraph>
                  목표 매수 가격:{' '}
                  {formatNumber(tradings?.at(-1)?.price * (1 - GAP_PERCENT))}
                </Paragraph>
                <Button onClick={handleBuy}>추가 매수하기</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableAutoFocusItem>
        <MenuItem
          onClick={() =>
            selectedTransaction && handleUpdate(selectedTransaction)
          }>
          수정하기
        </MenuItem>
        <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
      </Menu>
    </>
  )
}

export default TradingPage
