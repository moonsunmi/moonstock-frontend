import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'

const useMatchedTrade = ticker => {
  const {userInfo} = useUserStore()

  const {data, error, isLoading, mutate} = useSWR<{matched: any[]}>(
    [`/api/trade/${ticker}/matched`, userInfo.id],
    {fallbackData: {matched: []}}
  )

  const normalizedMatched: IMatchedTrade[] = data?.matched.map(match => ({
    ...match,
    matchAt: match.createdAt
  }))

  return {
    matched: normalizedMatched,
    error,
    isLoading,
    mutate
  }
}

export default useMatchedTrade
