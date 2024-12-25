import {ChangeEvent, useEffect, useState} from 'react'
import {useSnackbar} from 'notistack'
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
// Hooks
import useGetHoldings from '@/common/hooks/api/useHoldings'
import usePostTransactions from '@/common/hooks/api/useTransactionMutation'
import useTradingTransactions from '@/common/hooks/api/useTradingTransactions'
// Etc
import classes from './index.module.scss'
import {Dialog_TransactionProps} from './index.d'
import {initTransaction} from '@/common/lib/initData'
import {oppositeType} from '@/common/utils/transactionUtils'

const Dialog_Transaction = ({
  open,
  targetTransaction, /// << match , update 둘 다 쓸 수 있도록 이름 수정.
  requestType,
  defaultTicker, // todo. 새거래 시, 티커가 필요하기는 함.
  onClose
}: Dialog_TransactionProps) => {
  const {enqueueSnackbar} = useSnackbar()

  const {mutate: tradingTransactionMutate} = useTradingTransactions(
    targetTransaction?.stockTicker
  )

  const [transaction, setTransaction] = useState<ITransaction>(
    targetTransaction
      ? {...targetTransaction, type: oppositeType(targetTransaction.type)}
      : initTransaction
  )

  const {
    trigger: postTransactionTrigger,
    error,
    isMutating
  } = usePostTransactions({
    requestType,
    matchIds: targetTransaction ? [targetTransaction?.id] : [], // todo 여러 id 전달할 수 있도록 수정
    transaction
  })

  const handleChange_Transaction = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

    setTransaction(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChange_Date = (date: any) => {
    setTransaction(prevState => ({...prevState, transactedAt: date}))
  }

  const handleOnTransact = async () => {
    try {
      await postTransactionTrigger(transaction, {
        onSuccess: async data => {
          try {
            // if (ticker === null) {
            //   await holdingMutate()
            // }
            await tradingTransactionMutate()
          } catch (error) {
            console.error('데이터를 업데이트 중 오류가 발생했습니다.', error)
          }
        },
        onError: error => {
          const {errorCode, message} = error

          if (errorCode === 'ERROR_CODE_STOCK_NOT_FOUND') {
            enqueueSnackbar('존재하지 않는 종목입니다.', {variant: 'error'})
          } else {
            enqueueSnackbar(message || '예상치 못한 오류가 발생했습니다.', {
              variant: 'error'
            })
            console.error(error)
          }
        }
      })
      onClose()
    } catch (e) {
      console.error('거래 처리 중 오류 발생:', e)
      enqueueSnackbar('거래 처리 중 오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    if (open) {
      // setTicker(defaultTicker ?? '')
      setTransaction(
        targetTransaction
          ? {...targetTransaction, type: oppositeType(targetTransaction.type)}
          : initTransaction
      )
    }
  }, [open, targetTransaction])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.content}>
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
            value={transaction['type']}
            onChange={handleChange_Transaction}>
            <FormControlLabel
              value="BUY"
              control={<Radio disabled={!!targetTransaction} />}
              label="매수"
            />
            <FormControlLabel
              value="SELL"
              control={<Radio disabled={!!targetTransaction} />}
              label="매도"
            />
          </RadioGroup>
        </div>
        <Paragraph>
          {transaction['type'] === 'BUY' ? '매수' : '매도'}
          하시겠습니까?
        </Paragraph>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={handleOnTransact} disabled={isMutating}>
          {transaction['type'] === 'BUY' ? '매수' : '매도'}
        </Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_Transaction
