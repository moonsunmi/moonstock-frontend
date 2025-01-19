import {useState} from 'react'
import axiosInstance from '@/common/lib/axios'
import useSWRMutation from 'swr/mutation'
import {initTransaction} from '@/common/lib/initData'
import {
  DialogAction,
  Dialog,
  DialogTransaction
} from '@/browser/components/UI/Dialog'
import {Button} from '@/browser/components/UI'

interface BuyDialogProps {
  defaultValue?: ITransaction
  onClose: () => void
}

const BuyDialog = ({defaultValue, onClose}: BuyDialogProps) => {
  const url = `/api/transactions/buy`

  const [transaction, setTransaction] = useState<ITransaction>(
    defaultValue ?? initTransaction
  )

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
    onClose()
  }

  return (
    <Dialog open={true} onClose={onClose} title={'매수 거래 기록'}>
      <DialogTransaction
        transaction={transaction}
        setTransaction={setTransaction}
      />
      <DialogAction>
        <Button variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleTransaction}>매수</Button>
      </DialogAction>
    </Dialog>
  )
}
export default BuyDialog
