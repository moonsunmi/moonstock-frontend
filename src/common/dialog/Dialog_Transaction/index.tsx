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
import {Dialog_TransactionProps} from './index.d'
import {useEffect, useState} from 'react'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
import DatePicker from '@/browser/components/UI/DatePicker'
// Styles
import styles from './index.module.scss'
import {initTransaction} from '@/common/lib/initData'
import {oppositeType} from '@/common/utils/transactionUtils'

const Dialog_Transaction = ({
  defaultTransaction,
  onClose,
  open
}: Dialog_TransactionProps) => {
  const [transaction, setTransaction] = useState<ITransaction>(initTransaction)

  // todo. 새 거래일때 입력이 잘 되도록...
  console.log(!Boolean(defaultTransaction))
  const postTransaction = useSWRMutation(
    '/api/users/transactions',
    (url, {arg}: {arg: any}) => {
      const {ticker, quantity, price, transactedAt, type} = arg

      const formData = new FormData()
      formData.append('stockTicker', ticker)
      formData.append('quantity', quantity)
      formData.append('price', price)
      formData.append('type', oppositeType(type))
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
    postTransaction.trigger(transaction)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setTransaction(defaultTransaction || initTransaction)
    }
  }, [open, defaultTransaction])

  return (
    <Dialog open={open} onClose={onClose} className={styles.container}>
      <DialogContent className={styles.content}>
        <Input
          type="text"
          className="w-1/2"
          name="ticker"
          label="종목코드"
          value={transaction['stock']?.['ticker']}
          onChange={handleOnChange}
          disabled={Boolean(defaultTransaction)}
        />
        <DatePicker
          className="w-full"
          value={
            transaction['transactedAt']
              ? new Date(transaction['transactedAt'])
              : null
          }
          onChange={date => handleOnChange_Date(date)}
        />
        <div>
          <Input
            type="number"
            className="w-1/2"
            name="price"
            label="가격"
            value={transaction['price']}
            onChange={handleOnChange}
          />
          <Input
            type="number"
            className="w-1/2"
            name="quantity"
            label="수량"
            value={transaction['quantity']}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <RadioGroup
            row
            aria-labelledby="select-transaction-type"
            name="type"
            value={oppositeType(transaction['type'])}
            onChange={handleOnChange}>
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
      <DialogActions className={styles.action}>
        <Button onClick={handleOnTransact}>
          {oppositeType(transaction['type']) === 'BUY' ? '매수' : '매도'}
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_Transaction
