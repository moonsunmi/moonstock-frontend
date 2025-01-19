import {Button, Paragraph} from '@/browser/components/UI'
import {DialogAction, Dialog} from '@/browser/components/UI/Dialog'
import axiosInstance from '@/common/lib/axios'
import useSWRMutation from 'swr/mutation'

interface DeleteDialogProps {
  onClose: () => void
  transaction: ITransaction
}

const DeleteDialog = ({onClose, transaction}: DeleteDialogProps) => {
  const url = `/api/transactions/${transaction.type.toLowerCase()}/${
    transaction.id
  }`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method: 'delete',
        // data: formData, << 삭제
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  return (
    <Dialog open={true} onClose={onClose} title={'삭제'}>
      <Paragraph>다음의 거래를 삭제하시겠습니까?</Paragraph>
      <ul>
        <li>{`${transaction.createdAt}`}</li>
        <li>{`${transaction.price}원`}</li>
        <li>{`${transaction.quantity}개`}</li>
      </ul>
      <DialogAction>
        <Button onClick={onClose}>취소</Button>
        <Button>삭제</Button>
      </DialogAction>
    </Dialog>
  )
}
export default DeleteDialog
