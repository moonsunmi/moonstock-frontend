import {useEffect, useState} from 'react'
// Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import {
  Button,
  Dialog as CustomDialog,
  Input,
  Paragraph
} from '@/browser/components/UI'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
import DatePicker from '@/browser/components/UI/DatePicker'
// Types
import {Dialog_CreateTransactionProps} from './index.d'
// Styles
import styles from './index.module.scss'

const Dialog_CreateTransaction = ({
  onClose,
  open
}: Dialog_CreateTransactionProps) => {
  const [{transactedAt, ticker, type, price, quantity}, setTransaction] =
    useState({
      ticker: '',
      transactedAt: null,
      type: '',
      price: '',
      quantity: ''
    })

  const postTransaction = useSWRMutation(
    '/api/users/transactions',
    (url, {arg}: {arg: any}) => {
      const {quantity, price, transactedAt} = arg

      const formData = new FormData()
      formData.append('stockTicker', ticker)
      formData.append('quantity', quantity)
      formData.append('price', price)
      formData.append('type', type)
      formData.append('transactedAt', transactedAt)
      // formData.append('matchedTransaction', matchedTransaction)

      return axiosInstance
        .post(url, formData, {withCredentials: false})
        .then(res => res.data)
    }
  )

  const handleOnChange = (e: any) => {
    setTransaction(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleOnChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, transactedAt: date}))
  }

  const handleOnTransact = () => {
    postTransaction.trigger({
      price,
      quantity,
      ticker,
      transactedAt,
      type
    })
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setTransaction({
        ticker: '',
        transactedAt: null,
        type: '',
        price: '',
        quantity: ''
      })
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} className={styles.container}>
      <DialogContent className={styles.content}>
        <div>
          <Input
            type="text"
            className="w-full"
            name="ticker"
            label="종목코드"
            value={ticker}
            onChange={handleOnChange}
          />
          <DatePicker
            value={transactedAt}
            onChange={date => handleOnChange_Date(date)}
          />
        </div>
        <div>
          <Input
            type="number"
            className="w-full"
            name="price"
            label="가격"
            value={price}
            onChange={handleOnChange}
          />
          <Input
            type="number"
            className="w-1/3"
            name="quantity"
            label="수량"
            value={quantity}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <RadioGroup
            row
            aria-labelledby="select-transaction-type"
            name="type"
            value={type}
            onChange={handleOnChange}>
            <FormControlLabel value="BUY" control={<Radio />} label="매수" />
            <FormControlLabel value="SELL" control={<Radio />} label="매도" />
          </RadioGroup>
        </div>
        <Paragraph>{type === 'BUY' ? '매수' : '매도'}하시겠습니까?</Paragraph>
      </DialogContent>
      <DialogActions className={styles.action}>
        <Button onClick={handleOnTransact}>
          {type === 'BUY' ? '매수' : '매도'}
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_CreateTransaction
