import useSWR from 'swr'
import axios from 'axios'

const useHoldings = () => {
  const {data, error, isLoading, isValidating} = useSWR(
    `http://localhost:4000/users/holdings`,
    url => axios.get(url, {withCredentials: true}).then(res => res.data)
  )
  // todo. data 가공하여
  console.log(data)
  return {data, error, isLoading, isValidating}
}

export default useHoldings
