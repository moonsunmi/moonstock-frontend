import {initStock} from '@/utils/initData'
import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'
import {getMatchedTradesKey} from '@/utils/swrKeys'

const useMatchedTrades = ticker => {
  const {userInfo} = useUserStore()

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    matched: any[]
  }>(getMatchedTradesKey(ticker, userInfo.id))

  const normalizedMatched: IMatchedTrade[] = (data?.matched ?? []).map(
    match => ({
      ...match,
      matchAt: match.createdAt
    })
  )

  return {
    stock: data?.stock,
    matched: normalizedMatched,
    error,
    isLoading,
    mutate
  }
}

export default useMatchedTrades
