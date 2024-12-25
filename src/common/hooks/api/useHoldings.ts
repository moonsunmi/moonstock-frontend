import {useEffect} from 'react'
import useSWR from 'swr'
import {useTypedDispatch, useTypedSelector} from '@/store/store'
import {setHoldings} from '@/store/slices/stockSlice'

const useHoldings = () => {
  const dispatch = useTypedDispatch()
  const {userInfo} = useTypedSelector(state => state.auth)

  const {data, error, isLoading, mutate} = useSWR<{holdings: IStock[]}>(
    ['/api/users/holdings', userInfo.id],
    {fallbackData: {holdings: []}}
  )

  useEffect(() => {
    dispatch(setHoldings(data.holdings))
  }, [data.holdings])

  return {holdings: data.holdings, error, isLoading, mutate}
}

export default useHoldings
