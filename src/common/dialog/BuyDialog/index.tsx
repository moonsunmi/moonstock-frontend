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
  Input,
  Paragraph
} from '@/browser/components/UI'
import useBuyDialog from '@/stores/useBuyDialogStore'
import StockAutocomplete from '@/browser/components/UI/StockAutocomplete'
import {Dialog, DialogTitle} from '@/browser/components/UI/Dialog'
import classNames from 'classnames'

interface DialogTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transaction: ITransaction
  setTransaction: Dispatch<SetStateAction<ITransaction>>
}

const DialogTransaction = ({
  transaction,
  setTransaction,
  className = '',
  ...props
}: DialogTransactionProps) => {
  const handleChange_Transaction = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setTransaction((prevState: ITransaction) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, tradeAt: date}))
  }

  return (
    <div className={classNames(classes.transaction, className)} {...props}>
      <DatePicker
        className="w-full"
        disableFuture
        value={
          transaction['tradeAt'] ? new Date(transaction['tradeAt']) : new Date()
        }
        onChange={date => handleChange_Date(date)}
      />
      <div>
        <Input
          type="number"
          className="w-1/2"
          name="price"
          label="가격"
          value={transaction['price']}
          onChange={handleChange_Transaction}
        />
        <Input
          type="number"
          className="w-1/2"
          name="quantity"
          label="수량"
          value={transaction['quantity']}
          onChange={handleChange_Transaction}
        />
      </div>
    </div>
  )
}

const BuyDialog = () => {
  const {isOpen, data: defaultValue, setData, closeDialog} = useBuyDialog()

  const transaction = defaultValue ?? initTransaction
  const url = `/api/trade/create`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method: 'post',
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
        {defaultValue ? (
          <Paragraph>{defaultValue.stockTicker}</Paragraph>
        ) : (
          <StockAutocomplete onSelect={stock => handleChangeStock(stock)} />
        )}
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
export default BuyDialog
