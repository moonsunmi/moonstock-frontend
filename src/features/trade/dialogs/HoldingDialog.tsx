import {ChangeEvent, useEffect, useState} from 'react'
// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/lib/axios'
// Components
import {Dialog, DialogActions, DialogContent} from '@mui/material'
import {Button, Input} from '@/shared/ui'

export interface HoldingDialogProps {
  defaultTransaction?: ITrade
  onClose: () => void
  open: boolean
}

const HoldingDialog = ({onClose, open}: HoldingDialogProps) => {
  const [ticker, setTicker] = useState<string>('')

  const postHolding = useSWRMutation(
    '/api/users/holding',
    (url, {arg}: {arg: string}) => {
      return axiosInstance
        .post(url, arg, {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        })
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
      <DialogContent className="flex flex-col gap-4 px-8 py-16 w-80">
        <Input
          type="text"
          className="w-1/2"
          name="ticker"
          label="종목코드"
          value={ticker}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className="p-8">
        <Button onClick={handleOnTransact}>등록</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default HoldingDialog
