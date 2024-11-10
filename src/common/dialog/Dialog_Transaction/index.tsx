import {ChangeEvent, useEffect, useState} from 'react'

import {useSnackbar} from 'notistack'
// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
// Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import {Button, Input, Paragraph} from '@/browser/components/UI'
import DatePicker from '@/browser/components/UI/DatePicker'
// Etc
import classes from './index.module.scss'
import {Dialog_TransactionProps} from './index.d'
import {initTransaction} from '@/common/lib/initData'
import {oppositeType} from '@/common/utils/transactionUtils'

const Dialog_Transaction = ({
  open,
  defaultTransaction,
  defaultTicker,
  onClose
}: Dialog_TransactionProps) => {
  const {enqueueSnackbar} = useSnackbar()

  const [ticker, setTicker] = useState('')
  const [transaction, setTransaction] = useState<ITransaction>(initTransaction)

  const postTransaction = useSWRMutation(
    '/api/users/transactions',
    (url, {arg}: {arg: ITransaction}) => {
      const {quantity, price, transactedAt, type} = arg

      const formData = new FormData()
      formData.append('stockTicker', ticker)
      formData.append('quantity', quantity.toString())
      formData.append('price', price.toString())
      formData.append('type', oppositeType(type))
      formData.append('transactedAt', new Date(transactedAt).toISOString())
      if (defaultTransaction) {
        formData.append('matchedId', defaultTransaction.id)
      }

      return axiosInstance
        .post(url, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: false
        })
        .then(res => res.data)
    }
  )

  const handleChange_Ticker = (e: ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value)
  }
  const handleChange_Transaction = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    setTransaction(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, transactedAt: date}))
  }

  const handleOnTransact = () => {
    postTransaction.trigger(transaction)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setTicker(defaultTicker || '')
      setTransaction(defaultTransaction || initTransaction)
    }
  }, [open, defaultTransaction])

  useEffect(() => {
    if (postTransaction.error) {
      const {errorCode} = postTransaction.error

      if (errorCode === 'ERROR_CODE_STOCK_NOT_FOUND') {
        enqueueSnackbar('존재하지 않는 종목입니다.', {variant: 'error'})
      } else {
        console.error(postTransaction.error)
      }
    }
  }, [postTransaction.error])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.content}>
        <Input
          type="text"
          className="w-1/2"
          name="ticker"
          label="종목코드"
          value={ticker}
          onChange={handleChange_Ticker}
        />
        <DatePicker
          className="w-full"
          value={
            transaction['transactedAt']
              ? new Date(transaction['transactedAt'])
              : null
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
        <div>
          <RadioGroup
            row
            aria-labelledby="select-transaction-type"
            name="type"
            value={oppositeType(transaction['type'])}
            onChange={handleChange_Transaction}>
            <FormControlLabel
              value="BUY"
              control={<Radio disabled={Boolean(defaultTransaction)} />}
              label="매수"
            />
            <FormControlLabel
              value="SELL"
              control={<Radio disabled={Boolean(defaultTransaction)} />}
              label="매도"
            />
          </RadioGroup>
        </div>
        <Paragraph>
          {oppositeType(transaction['type']) === 'BUY' ? '매수' : '매도'}
          하시겠습니까?
        </Paragraph>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          onClick={handleOnTransact}
          disabled={postTransaction.isMutating}>
          {oppositeType(transaction['type']) === 'BUY' ? '매수' : '매도'}
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_Transaction
