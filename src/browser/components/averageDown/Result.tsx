'use client'

import {useHoldingsContext} from '@/common/context/HoldingsContext'
import useCalculatedInvestment from '@/common/hooks/useCalculatedInvestment'
import CalculateGap from './CalculateGap'

const Result = () => {
  const {holdings} = useHoldingsContext()
  // Currently using first holding for now, but planning to update for handling multiple holdings
  const holding = holdings[0]
  const {averagePrice, totalQuantity, investmentAmount} =
    useCalculatedInvestment()

  const isResultShow: boolean =
    holding.price === '' ||
    holding.quantity === '' ||
    holding.price === 0 ||
    holding.quantity === 0

  return (
    <div aria-label="Investment Report">
      {isResultShow ? (
        <p className="text-primary-950">보유 주식 정보를 입력해 주세요.</p>
      ) : (
        <>
          평균단가: <CalculateGap before={holding.price} after={averagePrice} />
          총 개수:{' '}
          <CalculateGap before={holding.quantity} after={totalQuantity} />총
          투자금:{' '}
          <CalculateGap
            before={Number(holding.price) * Number(holding.quantity)}
            after={investmentAmount}
          />
        </>
      )}
    </div>
  )
}

export default Result
