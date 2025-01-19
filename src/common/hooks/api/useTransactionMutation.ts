// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'

const request = {
  CREATE: {method: 'POST', url: '/api/transactions'},
  UPDATE: (id: string) => ({
    method: 'PUT',
    url: `/api/transactions/${id}`
  })
}

type Props = {
  requestType: RequestType | 'MATCH'
  transaction?: ITransaction
}
const useTransactionMutation = ({requestType, transaction}: Props) => {
  const {id, quantity, price, transactedAt, type, stockTicker} = transaction

  console.log(transaction)

  //// 투두. 폼데이터 형태 다 바꿔야 함.

  const formData = new FormData()
  formData.append('stockTicker', stockTicker)
  formData.append('quantity', quantity?.toString())
  formData.append('type', type)
  formData.append('matchIds', JSON.stringify([id]))

  if (type === 'BUY') {
    formData.append('buyPrice', price?.toString())
    formData.append('buyCreatedAt', new Date(transactedAt).toISOString())
  } else {
    formData.append('sellPrice', price?.toString())
    formData.append('sellCreatedAt', new Date(transactedAt).toISOString())
  }

  const {url, method} =
    requestType === 'UPDATE' ? request[requestType](id) : request[requestType]

  const {data, trigger, error, isMutating} = useSWRMutation(
    url,
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance(url, {
        method,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: false
      }).then(res => res.data)
    }
  )

  return {trigger, isMutating, error}
}

export default useTransactionMutation
