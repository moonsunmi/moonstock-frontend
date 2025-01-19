import classNames from 'classnames'
import Card from '../Card'
import classes from './index.module.scss'
import {DatePicker, Input, Paragraph} from '@/browser/components/UI'
import {ChangeEvent, Dispatch, HTMLAttributes, SetStateAction} from 'react'

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const DialogContent = ({
  children,
  className = '',
  ...props
}: DialogContentProps) => {
  return (
    <div className={classNames('', className)} {...props}>
      {children}
    </div>
  )
}

interface DialogActionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const DialogAction = ({
  children,
  className = '',
  ...props
}: DialogActionProps) => {
  return (
    <div className={classNames(classes.action, className)} {...props}>
      {children}
    </div>
  )
}

interface DialogTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transaction: ITransaction
  setTransaction: Dispatch<SetStateAction<ITransaction>>
}

export const DialogTransaction = ({
  transaction,
  setTransaction,
  className = '',
  ...props
}: DialogTransactionProps) => {
  const handleChange_Transaction = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setTransaction(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, createdAt: date}))
  }

  return (
    <div className={classNames(classes.transaction, className)} {...props}>
      <Input
        type="text"
        className="w-1/2"
        name="stockTicker"
        label="종목코드"
        value={transaction['stockTicker']}
        onChange={handleChange_Transaction}
      />
      <DatePicker
        className="w-full"
        value={
          transaction['createdAt'] ? new Date(transaction['createdAt']) : null
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

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title: string
  className?: string
}

export const Dialog = ({
  open,
  onClose,
  title,
  children,
  className = '',
  ...props
}: DialogProps) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <Card
        className={classNames(classes.container, className)}
        onClick={e => {
          e.stopPropagation()
        }}
        {...props}>
        <div>{title}</div>
        {children}
      </Card>
    </div>
  )
}
