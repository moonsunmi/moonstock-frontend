import {useUserStore} from '@/stores/useUserStore'
import {getTradeInfoKey} from '@/utils/swrKeys'
import useSWR from 'swr'

const useTradeInfo = (tradeId: string | null) => {
  const {userInfo} = useUserStore()

  const shouldFetch = !!tradeId && !!userInfo

  const {data, error, isLoading, mutate} = useSWR<{
    trade: ITrade // TODO. 타입을 적절한 이름으로 바꿔야 함.
  }>(shouldFetch ? getTradeInfoKey(tradeId) : null, {
    fallbackData: {
      //   stock: null,
      trade: null
    }
  })

  const trade = data.trade

  return {
    trade,
    // stock,
    error,
    isLoading,
    mutate
  }
}

export default useTradeInfo
