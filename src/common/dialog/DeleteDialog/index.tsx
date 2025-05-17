'use client'

import {Button, Paragraph} from '@/browser/components/UI'
import {
  DialogAction,
  Dialog,
  DialogContent
} from '@/browser/components/UI/Dialog'
import axiosInstance from '@/common/lib/axios'
import useDeleteDialog from '@/stores/useDeleteDialogStore'
import useSWRMutation from 'swr/mutation'

const DeleteDialog = () => {
  const {isOpen, data: transaction, setData, closeDialog} = useDeleteDialog()

  const url = `/api/transactions/${transaction?.type?.toLowerCase()}/${
    transaction?.id
  }`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method: 'delete',
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  if (!isOpen) return null

  return (
    <Dialog open={true} onClose={closeDialog} title={'삭제'}>
      <DialogContent>
        <Paragraph>다음의 거래를 삭제하시겠습니까?</Paragraph>
        <ul>
          <li>{`${transaction?.tradeDate}`}</li>
          <li>{`${transaction?.price}원`}</li>
          <li>{`${transaction?.quantity}개`}</li>
        </ul>
      </DialogContent>
      <DialogAction>
        <Button variant="outlined" onClick={closeDialog}>
          취소
        </Button>
        <Button>삭제</Button>
      </DialogAction>
    </Dialog>
  )
}
export default DeleteDialog
