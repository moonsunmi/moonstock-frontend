// useMatchedDetailPage.ts
'use client'

import {useState, MouseEvent, useMemo} from 'react'
import useUpdateDialog from '@/features/trade/store/useUpdateDialogStore'
import useDeleteDialog from '@/features/trade/store/useDeleteDialogStore'
import {formatNumber, getDateFormat} from '@/utils'
import useTradeInfo from '@/features/trade/hooks/useTradeInfo'

export const useMatchedDetailPage = (id: string) => {
  const {trade, isLoading, error} = useTradeInfo(id)

  const {openDialog: openUpdateDialog} = useUpdateDialog()
  const {openDialog: openDeleteDialog} = useDeleteDialog()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedSell, setSelectedSell] = useState<any | null>(null)

  const openMenu = (e: MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(e.currentTarget)
    setSelectedSell(row)
  }
  const closeMenu = () => {
    setAnchorEl(null)
    setSelectedSell(null)
  }

  const buyColumns = useMemo(
    () => [
      {
        key: 'buyCreatedAt',
        header: '매수일',
        render: () => getDateFormat(trade?.tradeAt, 'yy.MM.dd')
      },
      {
        key: 'buyPrice',
        header: '매수가',
        render: () => formatNumber(trade?.price),
        className: 'text-right'
      },
      {
        key: 'quantity',
        header: '수량',
        render: () => formatNumber(trade?.quantity),
        className: 'text-right'
      }
    ],
    [trade]
  )

  const sellColumns = useMemo(
    () => [
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
        render: (row: any) => ({
          type: 'menu',
          onClick: (e: MouseEvent<HTMLElement>) => openMenu(e, row)
        })
      }
    ],
    []
  )

  return {
    trade,
    isLoading,
    error,
    buyColumns,
    sellColumns,
    anchorEl,
    closeMenu,
    selectedSell,
    openUpdateDialog,
    openDeleteDialog
  }
}
