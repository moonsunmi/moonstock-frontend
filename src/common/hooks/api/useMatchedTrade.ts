import {initStock} from '@/common/lib/initData'
import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'

const useMatchedTrade = ticker => {
  const {userInfo} = useUserStore()

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    matched: any[]
  }>([`/api/trade/${ticker}/matched`, userInfo.id], {
    fallbackData: {stock: initStock, matched: []}
  })

  const normalizedMatched: IMatchedTrade[] = data?.matched.map(match => ({
    ...match,
    matchAt: match.createdAt
  }))

  return {
    stock: data?.stock,
    matched: normalizedMatched,
    error,
    isLoading,
    mutate
  }
}

export default useMatchedTrade
