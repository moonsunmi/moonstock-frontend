'use client'

import {useEffect, useMemo, useState} from 'react'
import {Button, Paragraph} from '@/browser/components/UI'
import {Menu, MenuItem} from '@mui/material'
import {getDateFormat, formatNumber} from '@/common/utils'
import useTrading from '@/common/hooks/api/useTrading'
import useTradeDialog from '@/stores/useTradeDialogStore'
import classNames from 'classnames'
import MatchingDialog from '@/common/dialog/MatchDialog'

const TradingPage = ({ticker}: {ticker: string}) => {
  const {tradings, stock, error} = useTrading(ticker)
  const {openDialog} = useTradeDialog()

  const [sortBy, setSortBy] = useState<'price' | 'date'>('price')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null)
  const [matchTransactions, setMatchTransactions] = useState<ITransaction[]>([])

  const [pendingType, setPendingType] = useState<TransactionType>(null)

  const [mode, setMode] = useState<'edit' | 'match'>('match')
  const [openMatching, setOpenMatching] = useState<boolean>(false)

  const handleRowClick = (
    // e: React.MouseEvent<HTMLElement>,
    transaction: ITransaction
  ) => {
    if (mode === 'edit') {
      setSelectedTransaction(transaction)
    } else {
      // todo. toggle 형태로.
      setMatchTransactions(prev => [...prev, transaction])
    }
  }

  const sortedTradings = useMemo(() => {
    const sorted = [...tradings]
    return sortBy === 'price'
      ? sorted.sort((a, b) => b.price - a.price)
      : sorted.sort(
          (a, b) =>
            new Date(b.tradeAt).getTime() - new Date(a.tradeAt).getTime()
        )
  }, [tradings, sortBy])

  const handleCreate = (type: TransactionType) => {
    openDialog('create')
  }

  const handleUpdate = () => {
    if (selectedTransaction) {
      openDialog('update', selectedTransaction)
      handleCloseMenu()
    }
  }

  const handleDelete = () => {
    if (selectedTransaction) {
      openDialog('delete', selectedTransaction)
      handleCloseMenu()
    }
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedTransaction(null)
  }

  const handleCloseMatching = () => {
    setMatchTransactions([])
    setOpenMatching(false)
  }

  const columns = [
    '매수 날짜',
    '매수 금액',
    '매수 개수',
    '매도 날짜',
    '매도 금액',
    '매도 개수'
  ]

  const getRow = (transaction: ITransaction) => {
    const isBuy = transaction.type === 'BUY'

    const buyCells = isBuy
      ? [
          getDateFormat(transaction.tradeAt, 'yy.MM.dd'),
          formatNumber(transaction.price),
          formatNumber(transaction.quantity)
        ]
      : ['', '', '']

    const sellCells = !isBuy
      ? [
          getDateFormat(transaction.tradeAt, 'yy.MM.dd'),
          formatNumber(transaction.price),
          formatNumber(transaction.quantity)
        ]
      : ['', '', '']

    return (
      <tr key={transaction.id} className="border-b">
        {/* 매수 셀 그룹 */}
        <td colSpan={3} className="p-0">
          <div
            className={classNames(
              'flex divide-x divide-gray-300',
              isBuy
                ? 'bg-red-50 hover:bg-red-100 cursor-pointer'
                : 'cursor-default'
            )}
            // {...clickHandlers}
            onClick={() => handleRowClick(transaction)}>
            {buyCells.map((cell, i) => (
              <div key={i} className="flex-1 px-4 py-2 text-center">
                {cell}
              </div>
            ))}
          </div>
        </td>

        {/* 매도 셀 그룹 */}
        <td colSpan={3} className="p-0">
          <div
            className={classNames(
              'flex divide-x divide-gray-300',
              !isBuy
                ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer'
                : 'cursor-default'
            )}
            // {...clickHandlers}
            onClick={() => handleRowClick(transaction)}>
            {sellCells.map((cell, i) => (
              <div key={i} className="flex-1 px-4 py-2 text-center">
                {cell}
              </div>
            ))}
          </div>
        </td>
      </tr>
    )
  }

  useEffect(() => {
    if (matchTransactions?.length === 2) setOpenMatching(true)
  }, [matchTransactions])

  if (error) {
    return <div>오류가 발생했습니다. 나중에 다시 시도해 주세요.</div>
  }

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <Paragraph variant="title">
            {`${stock?.name}(${stock?.ticker})`}
          </Paragraph>
          <div className="flex gap-2">
            <Button
              onClick={() => setSortBy('price')}
              variant={sortBy === 'price' ? 'solid' : 'text'}>
              가격순
            </Button>
            <Button
              onClick={() => setSortBy('date')}
              variant={sortBy === 'date' ? 'solid' : 'text'}>
              날짜순
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              disabled={mode === 'match'}
              onClick={() => setMode('match')}>
              매칭모드
            </Button>
            <Button disabled={mode === 'edit'} onClick={() => setMode('edit')}>
              수정모드
            </Button>
          </div>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-2 text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{sortedTradings.map(getRow)}</tbody>
        </table>

        <div className="flex justify-center gap-4">
          <Button onClick={() => handleCreate('BUY')} color="error">
            매수 추가
          </Button>
          <Button onClick={() => handleCreate('SELL')} color="primary">
            매도 추가
          </Button>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        disableAutoFocusItem>
        <MenuItem onClick={handleUpdate}>수정하기</MenuItem>
        <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
      </Menu>

      <MatchingDialog
        open={openMatching}
        transactions={matchTransactions}
        onClose={handleCloseMatching}
        onConfirm={() => {
          setOpenMatching(false)
          setMatchTransactions([])
        }}
      />
    </>
  )
}

export default TradingPage
