import {useRouter} from 'next/router'
import useTransactionInfo from '@/common/hooks/api/useTransactionInfo'

// detailpage 다른 곳으로 옮겨야 하나아... 404 에러 남.
const RecordingDetailPage = () => {
  const router = useRouter()
  const {transactionId} = router.query

  const {transaction, error, isLoading} = useTransactionInfo(
    transactionId as string
  )

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading transaction.</p>

  return (
    <div>
      <h1>Transaction Detail</h1>
      <p>Buy Price: {transaction.buyPrice}</p>
      <p>Sell Price: {transaction.sellPrice}</p>
      <p>Quantity: {transaction.quantity}</p>
      <p>Profit: {transaction.profit}</p>
    </div>
  )
}

export default RecordingDetailPage
