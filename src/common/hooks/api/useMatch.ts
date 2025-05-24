import axiosInstance from '@/common/lib/axios'
import useSWRMutation from 'swr/mutation'

const matchTrade = async (
  url: string,
  {
    arg
  }: {arg: {buyTradeId: ITransaction['id']; sellTradeId: ITransaction['id']}}
) => {
  const res = await axiosInstance.post(url, arg)
  return res.data
}

const useMatchTrade = () => {
  return useSWRMutation('/api/trade/match', matchTrade)
}

export default useMatchTrade
