import {useUserStore} from '@/stores/useUserStore'
import {getTradeInfoKey} from '@/utils/swrKeys'
import useSWR from 'swr'

const useTradeInfo = (tradeId: string | null) => {
  const {userInfo} = useUserStore()

  const shouldFetch = !!tradeId && !!userInfo

  const {data, error, isLoading, mutate} = useSWR<{
    trade: ITrade
  }>(shouldFetch ? getTradeInfoKey(tradeId) : null)

  const trade = data?.trade

  return {
    trade,
    // stock,
    error,
    isLoading,
    mutate
  }
}

export default useTradeInfo
