'use client'

import {Button} from '../components/UI'
import useTransactionInfo from '@/common/hooks/api/useTransactionInfo'

const RecordingDetailPage = ({id}: {id: string}) => {
  const {transaction, error, isLoading} = useTransactionInfo(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading transaction.</p>

  return (
    <>
      <div>
        <div>
          <h1>Transaction Detail</h1>
          <p>Buy Price: {transaction.buyPrice}</p>
          <p>Sell Price: {transaction.sellPrice}</p>
          <p>Quantity: {transaction.quantity}</p>
          <p>Profit: {transaction.profit}</p>
        </div>
        <div>
          <Button onClick={() => {}}>수정</Button>
          <Button onClick={() => {}}>삭제</Button>
        </div>
      </div>
    </>
  )
}

export default RecordingDetailPage
