// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'

const request = {
  CREATE: {method: 'POST', url: '/api/users/transactions'},
  MATCH: {method: 'PUT', url: '/api/users/transactions/match'},
  UPDATE: {method: 'PUT', url: '/api/users/transactions'},
  DELETE: {method: 'DELETE', url: '/api/users/transactions'}
}

type Props = {
  // ticker: string
  requestType: RequestType | 'MATCH'
  matchIds?: string[]
  transaction?: ITransaction
}
const useTransactionMutation = ({
  // ticker,
  matchIds,
  requestType,
  transaction
}: Props) => {
  const {quantity, price, transactedAt, type, stockTicker} = transaction

  const formData = new FormData()
  formData.append('stockTicker', stockTicker)
  formData.append('quantity', quantity.toString())
  formData.append('type', type)
  formData.append('matchIds', JSON.stringify(matchIds))

  if (type === 'BUY') {
    formData.append('buyPrice', price.toString())
    formData.append('buyCreatedAt', new Date(transactedAt).toISOString())
  } else {
    formData.append('sellPrice', price.toString())
    formData.append('sellCreatedAt', new Date(transactedAt).toISOString())
  }

  const {url, method} = request[requestType] ?? {url: '', method: ''}

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
