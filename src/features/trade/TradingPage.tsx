'use client'

import {useEffect, useMemo, useState} from 'react'
import {Button, Paragraph} from '@/components/ui'
import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import {getDateFormat, formatNumber} from '@/utils'
import useTrading from '@/features/trade/hooks/useTrading'
import useTradeDialog from '@/stores/useTradeDialogStore'
import classNames from 'classnames'
import MatchingDialog from '@/common/dialog/MatchDialog'
import {initTransaction} from '@/utils/initData'

const TradingPage = ({ticker}: {ticker: string}) => {
  const {tradings, stock, error} = useTrading(ticker)
  const {openDialog} = useTradeDialog()

  const [sortBy, setSortBy] = useState<'price' | 'date'>('price')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [matchTransactions, setMatchTransactions] = useState<ITrade[]>([])

  const [pendingType, setPendingType] = useState<TradeType>(null)

  const [mode, setMode] = useState<'edit' | 'match'>('match')
  const [openMatching, setOpenMatching] = useState<boolean>(false)

  const handleRowClick = (transaction: ITrade) => {
    if (mode === 'edit') {
      // setSelectedTransaction(transaction)
      openDialog('update', transaction)
    } else {
      setMatchTransactions(prev =>
        prev.find(t => t.id === transaction.id)
          ? prev.filter(t => t.id !== transaction.id)
          : [...prev, transaction]
      )
    }
  }

  const sortedTradings = useMemo(() => {
    const sorted = [...tradings]
    return sortBy === 'price'
      ? sorted.sort((a, b) => Number(b.price) - Number(a.price))
      : sorted.sort(
          (a, b) =>
            new Date(b.tradeAt).getTime() - new Date(a.tradeAt).getTime()
        )
  }, [tradings, sortBy])

  const handleCreate = (type: TradeType) => {
    openDialog('create', {...initTransaction, stockTicker: ticker})
  }

  // const handleUpdate = () => {
  //   if (selectedTransaction) {
  //     openDialog('update', selectedTransaction)
  //     handleCloseMenu()
  //   }
  // }

  // const handleDelete = () => {
  //   if (selectedTransaction) {
  //     openDialog('delete', selectedTransaction)
  //     handleCloseMenu()
  //   }
  // }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    // setSelectedTransaction(null)
  }

  const handleCloseMatching = () => {
    setMatchTransactions([])
    setOpenMatching(false)
  }

  const columns = ['매수일', '금액', '개수', '매도일', '금액', '개수']

  const getRow = (transaction: ITrade) => {
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
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'price' | 'date')}
            className="px-2 py-1 text-sm border rounded">
            <option value="price">가격순</option>
            <option value="date">날짜순</option>
          </select>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, val) => val && setMode(val)}
            size="small"
            color="primary">
            <ToggleButton value="match">매칭모드</ToggleButton>
            <ToggleButton value="edit">수정모드</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <table className="w-full text-sm border table-fixed">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={`${col}_${index}`}
                  className="w-1/6 px-4 py-2 text-center whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{sortedTradings.map(getRow)}</tbody>
        </table>

        <div className="flex justify-center gap-4">
          <Button onClick={() => handleCreate('BUY')} color="error">
            매매 기록 추가
          </Button>
        </div>
      </div>

      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        disableAutoFocusItem>
        <MenuItem onClick={handleUpdate}>수정하기</MenuItem>
        <MenuItem onClick={handleDelete}>삭제하기</MenuItem>
      </Menu> */}

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
