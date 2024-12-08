// API
import useSWRMutation from 'swr/mutation'
import axiosInstance from '@/common/lib/axios'
// Etc
import {oppositeType} from '@/common/utils/transactionUtils'

type Props = {
  ticker: string
  defaultTransaction?: ITransaction
}
const usePostTransactions = ({ticker, defaultTransaction}) => {
  const {data, trigger, error, isMutating} = useSWRMutation(
    '/api/users/transactions',
    (url, {arg}: {arg: ITransaction}) => {
      const {quantity, price, transactedAt, type} = arg

      const formData = new FormData()
      formData.append('stockTicker', ticker)
      formData.append('quantity', quantity.toString())
      formData.append('type', oppositeType(type))
      // type이 buy면, buyPrice, buyCreatedAt이 필수임. todo. 아래 것 수정되어야 함.
      formData.append('price', price.toString())
      formData.append('transactedAt', new Date(transactedAt).toISOString())
      if (defaultTransaction) {
        formData.append('matchedId', defaultTransaction.id)
      }

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
