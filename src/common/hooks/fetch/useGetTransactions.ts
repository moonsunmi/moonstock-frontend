import useSWR from 'swr'
import {useSelector} from '@/store/store'

const useGetTransactions = ticker => {
  const {userInfo} = useSelector(state => state.auth)

  const {data, error, isLoading, mutate} = useSWR<{
    transactions: ITransaction[]
  }>([`/api/users/transactions/${ticker}`, userInfo.id], {
    fallbackData: {transactions: []}
  })
  return {data, error, isLoading, mutate}
}

export default useGetTransactions
