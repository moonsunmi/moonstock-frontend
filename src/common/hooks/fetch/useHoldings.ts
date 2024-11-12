import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const useHoldings = () => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    ['/api/users/holdings', userInfo.id],
    {fallbackData: {holdings: []}}
  )
  return {data, error, isLoading, mutate}
}

export default useHoldings
