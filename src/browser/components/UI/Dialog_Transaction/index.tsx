// Components
import {Dialog, DialogActions, DialogContent} from '@mui/material'
import {
  Button,
  Dialog as CustomDialog,
  Input,
  Paragraph
} from '@/browser/components/UI'
import {Dialog_TransactionProps} from './index.d'
import {useState} from 'react'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
import DatePicker from '../DatePicker'

const Dialog_Transaction = ({
  defaultQuantity,
  defaultPrice,
  onClose,
  open,
  defaultTicker,
  type
}: Dialog_TransactionProps) => {
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

  const handleOnChange = (key: string, value: any) => {
    setTransaction(prevState => ({...prevState, [key]: value}))
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
            onChange={e => handleOnChange('ticker', e.target.value)}
          />
          <DatePicker
            value={transactedAt}
            onChange={date => handleOnChange('transactedAt', date)}
          />
          <Input
            type="number"
            className="w-full"
            name="price"
            label="가격"
            value={price}
            onChange={e => handleOnChange('price', e.target.value)}
          />
          <Input
            type="number"
            className="w-1/3"
            name="quantity"
            label="수량"
            value={quantity}
            onChange={e => handleOnChange('quantity', e.target.value)}
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

export default Dialog_Transaction
