import useSWR from 'swr'
import {useUserStore} from '@/stores/useUserStore'
import {getHoldingsKey} from '@/utils/swrKeys'

const useHoldings = () => {
  const {userInfo} = useUserStore()

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    getHoldingsKey(userInfo.id)
  )

  // useEffect(() => {
  //   dispatch(setHoldings(data.holdings))
  // }, [data.holdings])

  return {holdings: data?.holdings ?? [], error, isLoading, mutate}
}

export default useHoldings
