'use client'

import {useState} from 'react'
// Components
import {Button, Paragraph} from '@/browser/components/UI'
import {TableHeader, TableRow} from '@/browser/components/UI/Table'
// Hooks
import useActiveTransactions from '@/common/hooks/api/useActiveTransactions'
import {useTransactionDialog} from '@/common/context/TransactionDialogProvider'
// Etc
import {formatNumber, getDateFormat} from '@/common/utils'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {IconButton, Menu, MenuItem} from '@mui/material'
import {initTransaction} from '@/common/lib/initData'

const TradingPage = ({ticker}: {ticker: string}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null)

  const {stock, buys, error, isLoading} = useActiveTransactions(ticker)
  const {openDialog} = useTransactionDialog()

  const handleBuy = () => {
    openDialog('buy', {...initTransaction, stockTicker: ticker})
  }
  const handleUpdate = () => {
    openDialog('update', selectedTransaction)
  }
  const handleSell = (row: ITransaction) => {
    openDialog('sell', row)
  }

  const handleDelete = () => {
    openDialog('delete')
  }

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    transaction: ITransaction
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedTransaction(transaction)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedTransaction(null)
  }

  const columns: {
    key: keyof ITransaction | 'sellButton' | 'more'
    header: string
    className?: string
    render?: (row: ITransaction) => React.ReactNode
  }[] = [
    {
      key: 'createdAt',
      header: '거래일',
      render: row => getDateFormat(row.createdAt, 'yy.MM.dd')
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
      render: row => (
        <>
          <Button
            variant="text"
            className="w-1/5"
            onClick={() => handleSell(row)}>
            매도하기
          </Button>
        </>
      ),
      className: 'text-center'
    },
    {
      key: 'more',
      header: '',
      render: row => (
        <IconButton onClick={event => handleMoreClick(event, row)}>
          <MoreVertIcon />
        </IconButton>
      )
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
                <Button onClick={handleBuy}>새 거래 등록하기</Button>
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
        <MenuItem onClick={handleUpdate}>수정하기</MenuItem>
        <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
      </Menu>
    </>
  )
}

export default TradingPage
