'use client'

import {Button, Paragraph} from '@/shared/ui'
import {DialogAction, Dialog, DialogContent} from '@/shared/ui/Dialog'
import axiosInstance from '@/lib/axios'
import useDeleteDialog from '@/features/trade/store/useDeleteDialogStore'
import useSWRMutation from 'swr/mutation'

const DeleteDialog = () => {
  const {isOpen, data: transaction, setData, closeDialog} = useDeleteDialog()

  const url = `/api/transactions/${transaction?.type?.toLowerCase()}/${
    transaction?.id
  }`

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITrade}) => {
      return axiosInstance(url, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
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
          <li>{`${transaction?.tradeAt}`}</li>
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
