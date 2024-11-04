// Components
import {Dialog, DialogActions, DialogContent} from '@mui/material'
import {
  Button,
  Dialog as CustomDialog,
  Input,
  Paragraph
} from '@/browser/components/UI'
import {Dialog_LinkTransactionProps} from './index.d'
import {useState} from 'react'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
import DatePicker from '@/browser/components/UI/DatePicker'

const Dialog_LinkTransaction = ({
  defaultQuantity,
  defaultPrice,
  onClose,
  open,
  defaultTicker,
  type
}: Dialog_LinkTransactionProps) => {
  const [{transactedAt, ticker, price, quantity}, setTransaction] = useState({
    ticker: defaultTicker,
    transactedAt: null,
    price: defaultPrice,
    quantity: defaultQuantity
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
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
            name="transactedAt"
            onChange={date => handleOnChange_Date(date)}
          />
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
        <Paragraph>{type === 'BUY' ? '매수' : '매도'}하시겠습니까?</Paragraph>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnTransact}>
          {type === 'BUY' ? '매수' : '매도'}
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_LinkTransaction
