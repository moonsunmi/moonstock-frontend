import {useUserStore} from '@/stores/useUserStore'
import {getTradingKey} from '@/utils/swrKeys'
import useSWR from 'swr'

const initStock = {ticker: '', name: '', market: ''}

const useTrading = ticker => {
  const {userInfo} = useUserStore()
  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    tradings: ITrade[]
  }>(shouldFetch ? getTradingKey(ticker, userInfo.defaultAccount?.id) : null, {
    fallbackData: {
      stock: initStock,
      tradings: []
    }
  })

  const stock = data?.stock ?? initStock
  const tradings = data?.tradings ?? []

  return {stock, tradings, error, isLoading, mutate}
}

export default useTrading
