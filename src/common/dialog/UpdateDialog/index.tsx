// import axiosInstance from '@/common/lib/axios'
// import useSWRMutation from 'swr/mutation'
// import {initTransaction} from '@/common/lib/initData'
// import {
//   DialogAction,
//   Dialog,
//   DialogTransaction
// } from '@/browser/components/UI/Dialog/Dialog'
// import {Button} from '@/browser/components/UI'
// import useUpdateDialog from '@/stores/useUpdateDialogStore'

// const UpdateDialog = () => {
//   const {
//     isOpen,
//     data: transaction,
//     type,
//     setData,
//     closeDialog
//   } = useUpdateDialog()

//   const url = `/api/transactions/${type}/${transaction?.id}`

//   const {data, trigger, error, isMutating} = useSWRMutation(
//     url,
//     (url, {arg}: {arg: ITransaction}) => {
//       console.log(arg)
//       return axiosInstance(url, {
//         method: 'put',
//         data: arg,
//         headers: {'Content-Type': 'multipart/form-data'},
//         withCredentials: false
//       }).then(res => res.data)
//     }
//   )

//   const handleTransaction = () => {
//     trigger(transaction)
//     closeDialog()
//   }

//   if (!isOpen) return null

//   return (
//     <Dialog open={true} onClose={closeDialog} title={'매수 거래 수정하기'}>
//       <DialogTransaction transaction={transaction} setTransaction={setData} />
//       <DialogAction>
//         <Button variant="outlined" onClick={closeDialog}>
//           취소
//         </Button>
//         <Button onClick={handleTransaction}>수정</Button>
//       </DialogAction>
//     </Dialog>
//   )
// }
// export default UpdateDialog
