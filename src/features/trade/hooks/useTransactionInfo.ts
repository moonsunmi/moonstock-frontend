import {useUserStore} from '@/stores/useUserStore'
import useSWR from 'swr'

const useTransactionInfo = (transactionId: string | null) => {
  const {userInfo} = useUserStore()

  const shouldFetch = !!transactionId && !!userInfo

  const {data, error, isLoading, mutate} = useSWR<{
    // stock: IStock // todo. stock을 가져와야 하나..?
    transaction: ITransaction // TODO. 타입을 적절한 이름으로 바꿔야 함.
  }>(shouldFetch ? [`/api/transactions/${transactionId}`, userInfo.id] : null, {
    fallbackData: {
      //   stock: null,
      transaction: null
    }
  })

  const transaction = data.transaction

  return {
    transaction,
    // stock,
    error,
    isLoading,
    mutate
  }
}

export default useTransactionInfo
