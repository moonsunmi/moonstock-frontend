'use client'

import {ChangeEvent, Dispatch, HTMLAttributes, SetStateAction} from 'react'
import axiosInstance from '@/common/lib/axios'
import useSWRMutation from 'swr/mutation'
import {initTransaction} from '@/common/lib/initData'
import classes from './index.module.scss'

import {
  Button,
  DatePicker,
  DialogAction,
  DialogContent,
  Input
} from '@/browser/components/UI'
import useTradeDialog from '@/stores/useTradeDialogStore'
import StockAutocomplete from '@/browser/components/UI/StockAutocomplete'
import {Dialog, DialogTitle} from '@/browser/components/UI/Dialog'
import classNames from 'classnames'
import Radio from '@/browser/components/UI/Radio'
import DialogTransaction from '@/browser/components/UI/Dialog/DialogTransaction'

interface TradeDialogProps {
  stockList: IStock[]
}

const TradeDialog = ({stockList}: TradeDialogProps) => {
  const {
    isOpen,
    mode,
    data: defaultValue,
    setData,
    closeDialog
  } = useTradeDialog()

  const transaction = defaultValue ?? initTransaction
  const isCreate = mode === 'create'
  const url = isCreate
    ? `/api/trade/create`
    : `/api/trade/${transaction?.id}/update`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method: isCreate ? 'post' : 'put',
        data: arg,
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  const handleChangeStock = (stock: IStock) => {
    setData(prevState => ({...prevState, stockTicker: stock.ticker}))
  }
  const handleTransaction = () => {
    trigger(transaction)
    closeDialog()
  }

  if (!isOpen) return null

  return (
    <Dialog open={true} onClose={closeDialog}>
      <DialogTitle>매수 거래 기록</DialogTitle>
      <DialogContent>
        <StockAutocomplete
          defaultTicker={transaction.stockTicker}
          stockList={stockList}
          onSelect={stock => handleChangeStock(stock)}
        />
        <DialogTransaction transaction={transaction} setTransaction={setData} />
      </DialogContent>
      <DialogAction>
        <Button variant="outlined" onClick={closeDialog}>
          취소
        </Button>
        <Button onClick={handleTransaction}>매수</Button>
      </DialogAction>
    </Dialog>
  )
}
export default TradeDialog
