import useSWR from 'swr'
import axios from 'axios'

const useHoldings = () => {
  const {data, error, isLoading, isValidating} = useSWR(
    `http://localhost:4000/users/holdings`,
    url => axios.get(url, {withCredentials: true}).then(res => res.data)
  )
  return {data: data?.holdings || [], error, isLoading, isValidating}
}

export default useHoldings
