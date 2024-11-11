import useSWR from 'swr'
import {useSelector} from '@/store/store'

const useGetHoldings = () => {
  const {userInfo} = useSelector(state => state.auth)

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    ['/api/users/holdings', userInfo.id],
    {fallbackData: {holdings: []}}
  )
  return {data, error, isLoading, mutate}
}

export default useGetHoldings
