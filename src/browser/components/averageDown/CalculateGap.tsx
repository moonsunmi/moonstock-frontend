import {memo} from 'react'

import {formatNumToKR} from '@/common/utils/formatNumber'

type CalculateGapProps = {
  before: number | ''
  after: number | ''
}

const valueChangeIndicator = {
  even: {symbol: '-', color: 'gray'},
  decrease: {symbol: '↓', color: 'blue'},
  increase: {symbol: '↑', color: 'red'}
}

const getChangeType = (gap: number) =>
  gap === 0
    ? valueChangeIndicator.even
    : gap > 0
    ? valueChangeIndicator.decrease
    : valueChangeIndicator.increase

const CalculateGap = memo(({before, after}: CalculateGapProps) => {
  const gap = Number(before) - Number(after)
  const symbolStyle = getChangeType(gap)

  const amount = gap === 0 ? '변화 없음' : `${formatNumToKR(Math.abs(gap))} `

  return (
    <div>
      ({amount}
      {symbolStyle.symbol})
    </div>
  )
})

CalculateGap.displayName = 'CalculateGap'

export default CalculateGap
