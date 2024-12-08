// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
// Etc
import {oppositeType} from '@/common/utils/transactionUtils'

type Props = {
  ticker: string
  matchId?: string
  transaction?: ITransaction
}
const usePostTransactions = ({ticker, matchId, transaction}: Props) => {
  const {quantity, price, transactedAt, type} = transaction

  const formData = new FormData()
  formData.append('stockTicker', ticker)
  formData.append('quantity', quantity.toString())
  formData.append('type', oppositeType(type))

  if (oppositeType(type) === 'BUY') {
    formData.append('buyPrice', price.toString())
    formData.append('buyCreatedAt', new Date(transactedAt).toISOString())
  } else {
    formData.append('sellPrice', price.toString())
    formData.append('sellCreatedAt', new Date(transactedAt).toISOString())
  }

  if (matchId) {
    formData.append('matchedId', matchId)
  }

  const {data, trigger, error, isMutating} = useSWRMutation(
    '/api/users/transactions',
    (url, {arg}: {arg: ITransaction}) => {
      return axiosInstance
        .post(url, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: false
        })
        .then(res => res.data)
    }
  )

  return {trigger, isMutating, error}
}

export default usePostTransactions
