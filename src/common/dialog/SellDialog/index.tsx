import {useState} from 'react'
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
import {
  DialogAction,
  Dialog,
  DialogTransaction
} from '@/browser/components/UI/Dialog'
import {Button} from '@/browser/components/UI'
import useSellDialog from '@/stores/useSellDialogStore'

const SellDialog = () => {
  const {isOpen, data: transaction, setData, closeDialog} = useSellDialog()

  const url = `/api/transactions/${transaction?.id}/sell`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method: 'post',
        data: arg,
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  const handleTransaction = () => {
    trigger(transaction)
    closeDialog()
  }

  if (!isOpen || !transaction) return null

  return (
    <Dialog open={true} onClose={closeDialog} title={'매도 거래 기록'}>
      <DialogTransaction transaction={transaction} setTransaction={setData} />
      <DialogAction>
        <Button variant="outlined" onClick={closeDialog}>
          취소
        </Button>
        <Button onClick={handleTransaction}>매도</Button>
      </DialogAction>
    </Dialog>
  )
}
export default SellDialog
