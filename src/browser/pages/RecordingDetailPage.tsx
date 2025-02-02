'use client'

import {useState} from 'react'
import useUpdateDialog from '@/stores/useUpdateDialogStore'
import useTransactionInfo from '@/common/hooks/api/useTransactionInfo'
import {formatNumber, getDateFormat} from '@/common/utils'
import {Button, Paragraph} from '@/browser/components/UI'
import {TableHeader, TableRow} from '@/browser/components/UI/Table'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {IconButton, Menu, MenuItem} from '@mui/material'

const RecordingDetailPage = ({id}: {id: string}) => {
  const {transaction, error, isLoading} = useTransactionInfo(id)
  const {openDialog} = useUpdateDialog()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedSell, setSelectedSell] = useState<any | null>(null)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading transaction.</p>
  if (!transaction) return <p>거래 정보가 없습니다.</p>

  console.log(transaction)

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    sellTransaction: any
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedSell(sellTransaction)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedSell(null)
  }

  // ✅ 매수 거래 컬럼 정의
  const buyColumns = [
    {
      key: 'buyCreatedAt',
      header: '매수일',
      render: () => getDateFormat(transaction.buyCreatedAt, 'yy.MM.dd')
    },
    {
      key: 'buyPrice',
      header: '매수가',
      render: () => formatNumber(transaction.buyPrice),
      className: 'text-right'
    },
    {
      key: 'quantity',
      header: '수량',
      render: () => formatNumber(transaction.quantity),
      className: 'text-right'
    },
    {
      key: 'profit',
      header: '수익',
      render: () => formatNumber(transaction.profit),
      className: 'text-right'
    }
  ]

  // ✅ 매도 거래 컬럼 정의
  const sellColumns = [
    {
      key: 'sellCreatedAt',
      header: '매도일',
      render: (row: any) => getDateFormat(row.sellCreatedAt, 'yy.MM.dd')
    },
    {
      key: 'sellPrice',
      header: '매도가',
      render: (row: any) => formatNumber(row.sellPrice),
      className: 'text-right'
    },
    {
      key: 'quantity',
      header: '매도 수량',
      render: (row: any) => formatNumber(row.quantity),
      className: 'text-right'
    },
    {
      key: 'more',
      header: '',
      render: (row: any) => (
        <IconButton onClick={event => handleMoreClick(event, row)}>
          <MoreVertIcon />
        </IconButton>
      )
    }
  ]

  return (
    <div className="w-full">
      <Paragraph variant="title">거래 상세</Paragraph>

      {/* 매수 거래 테이블 */}
      <table className="w-full mb-4">
        <TableHeader columns={buyColumns} />
        <tbody>
          <TableRow row={transaction} columns={buyColumns} />
        </tbody>
      </table>

      {/* 매수 수정 버튼 */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => {
            // openDialog('buy', transaction)
          }}>
          매수 거래 수정
        </Button>
      </div>

      {/* 매도 거래 테이블 */}
      <Paragraph variant="subtitle">매도 내역</Paragraph>
      {transaction.sellTransactions.length > 0 ? (
        <table className="w-full">
          <TableHeader columns={sellColumns} />
          <tbody>
            {transaction.sellTransactions.map(sell => (
              <TableRow key={sell.id} row={sell} columns={sellColumns} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">매도 내역이 없습니다.</p>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {selectedSell && (
          <>
            <MenuItem onClick={() => openDialog('sell', selectedSell)}>
              매도 수정
            </MenuItem>
            <MenuItem onClick={() => console.log('매도 삭제', selectedSell.id)}>
              매도 삭제
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

export default RecordingDetailPage
