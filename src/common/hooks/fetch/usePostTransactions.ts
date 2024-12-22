// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
// Etc
import {oppositeType} from '@/common/utils/transactionUtils'

const request = {
  create: {method: 'POST', url: '/api/users/transactions'},
  match: {method: 'PUT', url: '/api/users/transactions/match'}
}

type Props = {
  ticker: string
  matchIds?: string[]
  transaction?: ITransaction
}
const usePostTransactions = ({ticker, matchIds, transaction}: Props) => {
  const {quantity, price, transactedAt, type} = transaction

  const formData = new FormData()
  formData.append('stockTicker', ticker)
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

  const {url, method} = request[matchIds.length === 0 ? 'create' : 'match']

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

export default usePostTransactions
