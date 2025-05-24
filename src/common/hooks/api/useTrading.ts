import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'

const initStock = {ticker: '', name: '', market: ''}

const useTrading = ticker => {
  const {userInfo} = useUserStore()
  const shouldFetch = !!ticker && !!userInfo.id

  const {data, error, isLoading, mutate} = useSWR<{
    stock: IStock
    tradings: ITransaction[]
  }>(shouldFetch ? [`/api/trade/${ticker}/trading`, userInfo.id] : null, {
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
