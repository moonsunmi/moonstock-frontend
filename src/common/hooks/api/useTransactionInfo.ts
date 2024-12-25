import useSWR from 'swr'
import {useTypedSelector} from '@/store/store'

const useTransactionInfo = (transactionId: string | null) => {
  const {userInfo} = useTypedSelector(state => state.auth)

  const shouldFetch = !!transactionId && !!userInfo

  const {data, error, isLoading, mutate} = useSWR<{
    // stock: IStock // todo. stock을 가져와야 하나..?
    transaction: IRecording // TODO. 타입을 적절한 이름으로 바꿔야 함.
  }>(
    shouldFetch
      ? [`/api/users/transactions/${transactionId}`, userInfo.id]
      : null,
    {
      fallbackData: {
        //   stock: null,
        transaction: null
      }
    }
  )

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
