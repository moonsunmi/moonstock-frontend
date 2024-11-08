import {ChangeEvent, useEffect, useState} from 'react'
// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
// Components
import {Dialog, DialogActions, DialogContent} from '@mui/material'
import {Button, Input, Paragraph} from '@/browser/components/UI'
// Etc
import classes from './index.module.scss'
import {Dialog_TransactionProps} from './index.d'

const Dialog_Holding = ({onClose, open}: Dialog_TransactionProps) => {
  const [ticker, setTicker] = useState<string>('')

  const postHolding = useSWRMutation(
    '/api/users/holding',
    (url, {arg}: {arg: string}) => {
      const formData = new FormData()
      formData.append('ticker', arg)

      return axiosInstance
        .post(url, formData, {withCredentials: false})
        .then(res => res.data)
    }
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value)
  }

  const handleOnTransact = () => {
    postHolding.trigger(ticker)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setTicker('')
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.content}>
        <Input
          type="text"
          className="w-1/2"
          name="ticker"
          label="종목코드"
          value={ticker}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={handleOnTransact}>등록</Button>
        <Button onClick={() => onClose()}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Dialog_Holding
