// Hooks
import useGetHoldings from '@/common/hooks/fetch/useHoldings'
import useDoneTransactions from '@/common/hooks/fetch/useDoneTransactions'

const RecordingPage = ({ticker}: {ticker: string}) => {
  const {mutate: transactionMutate} = useDoneTransactions(ticker)

  return <></>
}
export default RecordingPage
