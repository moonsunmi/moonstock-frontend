import axiosInstance from '@/lib/axios'
import useSWRMutation from 'swr/mutation'

const matchTrade = async (
  url: string,
  {arg}: {arg: {buyTradeId: ITrade['id']; sellTradeId: ITrade['id']}}
) => {
  const res = await axiosInstance.post(url, arg)
  return res.data
}

const usePostMatchTrade = () => {
  return useSWRMutation('/api/trade/match', matchTrade)
}

export default usePostMatchTrade
