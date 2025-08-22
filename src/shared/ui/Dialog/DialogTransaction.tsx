'use client'

import {ChangeEvent, Dispatch, HTMLAttributes, SetStateAction} from 'react'
import {DatePicker, Input, Radio} from '@/shared/ui'
import classNames from 'classnames'

interface DialogTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transaction: ITrade
  setTransaction: Dispatch<SetStateAction<ITrade>>
}

const DialogTransaction = ({
  transaction,
  setTransaction,
  className = '',
  ...props
}: DialogTransactionProps) => {
  const handleChange_Transaction = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setTransaction((prevState: ITrade) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, tradeAt: date}))
  }

  return (
    <div className={classNames('flex flex-col gap-4', className)} {...props}>
      <div className="flex gap-4">
        <Radio
          name="type"
          value="BUY"
          checked={transaction?.type === 'BUY'}
          onChange={handleChange_Transaction}
          label="매수"
          customSize="sm"
        />
        <Radio
          name="type"
          value="SELL"
          checked={transaction?.type === 'SELL'}
          onChange={handleChange_Transaction}
          label="매도"
          customSize="sm"
        />
      </div>
      <DatePicker
        className="w-full"
        disableFuture
        value={
          transaction['tradeAt'] ? new Date(transaction['tradeAt']) : new Date()
        }
        onChange={date => handleChange_Date(date)}
      />
      <div className="flex gap-4">
        <Input
          type="number"
          className="w-1/2"
          name="price"
          label="가격"
          value={transaction?.price || ''}
          onChange={handleChange_Transaction}
        />
        <Input
          type="number"
          className="w-1/2"
          name="quantity"
          label="수량"
          value={transaction?.quantity || ''}
          onChange={handleChange_Transaction}
        />
      </div>
    </div>
  )
}
export default DialogTransaction
