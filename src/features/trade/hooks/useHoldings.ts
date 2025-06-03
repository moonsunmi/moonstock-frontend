import useSWR from 'swr'
import {useUserStore} from '@/stores/useUserStore'

const useHoldings = () => {
  const {userInfo} = useUserStore()

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    ['/api/users/holdings', userInfo.id],
    {fallbackData: {holdings: []}}
  )

  // useEffect(() => {
  //   dispatch(setHoldings(data.holdings))
  // }, [data.holdings])

  return {holdings: data.holdings, error, isLoading, mutate}
}

export default useHoldings
